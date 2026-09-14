import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const API_BASE = "https://fan-platform-backend-1.onrender.com/api/v1/meet-and-greets/get";

const toDatetimeLocal = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const ManageMeet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    capacity: "",
    date: "",
    duration: "",
    isActive: true,
  });

  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
  });

  const [perks, setPerks] = useState([]);
  const [perkInput, setPerkInput] = useState("");

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);

  // ---- fetch existing meet & greet ----
  useEffect(() => {
    const fetchMeetAndGreet = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load meet & greet");
        }

        const mg = data.meetAndGreet;

        setFormData({
          title: mg.title || "",
          type: mg.type || "",
          description: mg.description || "",
          price: mg.price ?? "",
          capacity: mg.capacity ?? "",
          date: toDatetimeLocal(mg.date),
          duration: mg.duration || "",
          isActive: mg.isActive ?? true,
        });

        setLocation({
          name: mg.location?.name || "",
          address: mg.location?.address || "",
          city: mg.location?.city || "",
          country: mg.location?.country || "",
        });

        setPerks(mg.perks || []);
        setExistingImages(mg.images || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMeetAndGreet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const addPerk = () => {
    const trimmed = perkInput.trim();
    if (!trimmed) return;
    setPerks((prev) => [...prev, trimmed]);
    setPerkInput("");
  };

  const handlePerkKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPerk();
    }
  };

  const removePerk = (index) => {
    setPerks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setNewImages((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);

    e.target.value = "";
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.type ||
      !formData.price ||
      !formData.capacity ||
      !formData.date ||
      !location.name ||
      !location.city ||
      !location.country ||
      !location.address
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("type", formData.type);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("capacity", formData.capacity);
      payload.append("date", formData.date);
      payload.append("duration", formData.duration);
      payload.append("isActive", formData.isActive);

      payload.append("location", JSON.stringify(location));

      perks.forEach((perk) => payload.append("perks", perk));

      // only sent if the user picked new files — backend replaces the
      // whole images array when files are present, keeps existing ones
      // untouched otherwise
      newImages.forEach((file) => payload.append("images", file));

      const res = await fetch(`https://fan-platform-backend-1.onrender.com/api/v1/meet-and-greets/${id}`, {
        method: "PATCH",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update meet & greet");
      }

      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this meet & greet? This can't be undone."
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete meet & greet");
      }

      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="mg-manage-loading">Loading...</div>;
  }

  return (
    <section className="create-meet">

      <div className="create-meet-header">
        <button type="button" className="back-link" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M12.5 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="manage-meet-title-row">
          <div>
            <h1>Manage Meet &amp; Greet</h1>
            <p>Update the details or remove this experience.</p>
          </div>

          <label className="active-switch">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            <span className="switch-track">
              <span className="switch-thumb" />
            </span>
            {formData.isActive ? "Active" : "Inactive"}
          </label>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <form className="create-meet-form" onSubmit={handleSubmit}>

        <div className="form-section">
          <h2>Basic Details</h2>

          <div className="form-grid">

            <div className="form-field">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Type *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select type</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            <div className="form-field form-field-full">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="form-field">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Capacity *</label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Date &amp; Time *</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 30 mins"
              />
            </div>

          </div>
        </div>

        <div className="form-section">
          <h2>Location</h2>

          <div className="form-grid">

            <div className="form-field">
              <label>Venue Name *</label>
              <input
                type="text"
                name="name"
                value={location.name}
                onChange={handleLocationChange}
              />
            </div>

            <div className="form-field">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={location.address}
                onChange={handleLocationChange}
              />
            </div>

            <div className="form-field">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={location.city}
                onChange={handleLocationChange}
              />
            </div>

            <div className="form-field">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={location.country}
                onChange={handleLocationChange}
              />
            </div>

          </div>
        </div>

        <div className="form-section">
          <h2>Perks</h2>

          <div className="perk-input-row">
            <input
              type="text"
              value={perkInput}
              onChange={(e) => setPerkInput(e.target.value)}
              onKeyDown={handlePerkKeyDown}
              placeholder="e.g. Signed poster — press Enter to add"
            />
            <button type="button" onClick={addPerk} className="add-perk-btn">
              Add
            </button>
          </div>

          {perks.length > 0 && (
            <div className="perk-chips">
              {perks.map((perk, i) => (
                <span className="perk-chip" key={`${perk}-${i}`}>
                  {perk}
                  <button type="button" onClick={() => removePerk(i)} aria-label={`Remove ${perk}`}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>Images</h2>

          {existingImages.length > 0 && newImages.length === 0 && (
            <>
              <p className="mg-images-note">Current images</p>
              <div className="image-preview-grid">
                {existingImages.map((src) => (
                  <div className="image-preview" key={src}>
                    <img src={src} alt="Current" />
                  </div>
                ))}
              </div>
            </>
          )}

          <label className="image-upload-dropzone">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              hidden
            />
            <span>
              Click to upload new images
              {existingImages.length > 0 && " (replaces all current images)"}
            </span>
          </label>

          {newImagePreviews.length > 0 && (
            <>
              <p className="mg-images-note">New images (will replace the current ones on save)</p>
              <div className="image-preview-grid">
                {newImagePreviews.map((src, i) => (
                  <div className="image-preview" key={src}>
                    <img src={src} alt={`New ${i + 1}`} />
                    <button type="button" onClick={() => removeNewImage(i)} aria-label="Remove image">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="form-actions manage-meet-actions">
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

          <div className="manage-meet-actions-right">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

      </form>

    </section>
  );
};

export default ManageMeet;