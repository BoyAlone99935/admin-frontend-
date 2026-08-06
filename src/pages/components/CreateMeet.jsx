import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


// TODO: confirm this matches where meetAndGreetRoutes is actually mounted
const API_BASE = "http://localhost:3000/api/v1/meet-and-greets";

const initialLocation = {
  name: "",
  address: "",
  city: "",
  country: "",
};

const CreateMeet = () => {
  // NOTE: assumes a route like /admin/create-meet/:id — adjust the key
  // below if your route param is named differently
  const { id: celebrityId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    capacity: "",
    date: "",
    duration: "",
  });

  const [location, setLocation] = useState(initialLocation);
  const [perks, setPerks] = useState([]);
  const [perkInput, setPerkInput] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);

    // reset so picking the same file again in a later session still fires onChange
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
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

      payload.append("celebrity", celebrityId);
      payload.append("title", formData.title);
      payload.append("type", formData.type);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("capacity", formData.capacity);
      payload.append("date", formData.date);
      payload.append("duration", formData.duration);

      // sent as JSON — see note in controller about parsing this
      payload.append("location", JSON.stringify(location));

      perks.forEach((perk) => payload.append("perks", perk));

      images.forEach((file) => payload.append("images", file));

      const res = await fetch(API_BASE, {
        method: "POST",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create meet & greet");
      }

      navigate(-1);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="create-meet">

      <div className="create-meet-header">
        <button type="button" className="back-link" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M12.5 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <h1>Create Meet &amp; Greet</h1>
        <p>Set up a new meet &amp; greet experience for this celebrity.</p>
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
                placeholder="e.g. VIP Backstage Experience"
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
                placeholder="What's included in this experience?"
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
                placeholder="0.00"
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
                placeholder="e.g. 50"
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
              <label>Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                min="0"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 30"
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
                placeholder="e.g. The Grand Hall"
              />
            </div>

            <div className="form-field">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={location.address}
                onChange={handleLocationChange}
                placeholder="Street address"
              />
            </div>

            <div className="form-field">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={location.city}
                onChange={handleLocationChange}
                placeholder="e.g. Toronto"
              />
            </div>

            <div className="form-field">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={location.country}
                onChange={handleLocationChange}
                placeholder="e.g. Canada"
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

          <label className="image-upload-dropzone">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              hidden
            />
            <span>Click to upload images, or drag and drop</span>
          </label>

          {imagePreviews.length > 0 && (
            <div className="image-preview-grid">
              {imagePreviews.map((src, i) => (
                <div className="image-preview" key={src}>
                  <img src={src} alt={`Preview ${i + 1}`} />
                  <button type="button" onClick={() => removeImage(i)} aria-label="Remove image">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Creating..." : "Create Meet & Greet"}
          </button>
        </div>

      </form>

    </section>
  );
};

export default CreateMeet;