import { useState, useEffect } from "react";
const API_BASE = "https://fan-platform-backend.onrender.com/api/celebrities";

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const PerformanceVideos = ({ celebrityId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    venue: "",
    date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const res = await fetch(`${API_BASE}/${celebrityId}`);
        const data = await res.json();
        setVideos(data.celebrity?.performanceVideos || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (celebrityId) fetchCelebrity();
  }, [celebrityId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.url) {
      setError("Title and YouTube URL are required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/${celebrityId}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add video");
      }

      setVideos(data.performanceVideos);
      setFormData({ title: "", url: "", venue: "", date: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    const confirmed = window.confirm("Remove this video?");
    if (!confirmed) return;

    setRemovingId(videoId);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/${celebrityId}/videos/${videoId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove video");
      }

      setVideos(data.performanceVideos);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <section className="pv-section">

      <div className="pv-header">
        <h2>Performance Videos</h2>
        <p>Paste a YouTube link to add a live performance clip.</p>
      </div>

      {error && <div className="form-error">{error}</div>}

      <form className="pv-add-form" onSubmit={handleAddVideo}>

        <div className="pv-form-grid">

          <div className="form-field">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Live at Scotiabank Arena"
            />
          </div>

          <div className="form-field">
            <label>YouTube URL *</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="form-field">
            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="form-field">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

        </div>

        <button type="submit" className="pv-add-btn" disabled={submitting}>
          {submitting ? "Adding..." : "Add Video"}
        </button>

      </form>

      {loading ? (
        <div className="pv-loading">Loading videos...</div>
      ) : videos.length === 0 ? (
        <div className="pv-empty">
          <h3>No videos yet</h3>
          <p>Add one above to get started.</p>
        </div>
      ) : (
        <div className="pv-grid">
          {videos.map((video) => (
            <div className="pv-card" key={video._id}>

              <a
                href={`https://youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="pv-thumb"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                />
                <span className="pv-play-icon">▶</span>
              </a>

              <div className="pv-card-body">
                <h4>{video.title}</h4>
                {(video.venue || video.date) && (
                  <p className="pv-meta">
                    {video.venue}
                    {video.venue && video.date && " • "}
                    {formatDate(video.date)}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="pv-remove-btn"
                onClick={() => handleRemoveVideo(video._id)}
                disabled={removingId === video._id}
              >
                {removingId === video._id ? "Removing..." : "Remove"}
              </button>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};

export default PerformanceVideos;