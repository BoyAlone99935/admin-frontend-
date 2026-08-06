import "../../styles/dashboard.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

function CreateCelebrity() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    bio: "",
    category: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });
  const { setLoading } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));

    formData.append("profileImage", profileImage);
    formData.append("coverImage", coverImage);

    const response = await fetch(
      "https://fan-platform-backend.onrender.com/api/celebrities/create-celebrity",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      setLoading(false);
      throw new Error("Failed to create celebrity");
    }

    const data = await response.json();

    console.log("Celebrity created:", data);
    setLoading(false);
    navigate("/admin/dashboard");
  } catch (error) {
    console.error("Error creating celebrity:", error.message);
    setLoading(false);
  }
};
  return (
    <div className="celeb-page">
      <form className="celeb-form-card" onSubmit={handleSubmit}>
        <h2>Create Celebrity</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="slug" placeholder="Slug" onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" onChange={handleChange} />

        <input name="category" placeholder="Category" onChange={handleChange} />

        <div className="row">
          <input name="instagram" placeholder="Instagram" onChange={handleChange} />
          <input name="twitter" placeholder="Twitter" onChange={handleChange} />
        </div>

        <input name="youtube" placeholder="YouTube" onChange={handleChange} />

        <div className="file">
          <label>Profile Image</label>
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
        </div>

        <div className="file">
          <label>Cover Image</label>
          <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>

        <button type="submit">Create Celebrity</button>
      </form>
    </div>
  );
}

export default CreateCelebrity;