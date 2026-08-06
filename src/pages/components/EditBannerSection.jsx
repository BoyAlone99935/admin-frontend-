export default function EditBannerSection({
  bannerImage,
  setBannerImage,
  arenaOverview,
  setArenaOverview,
}) {
  const handleBannerChange = (e) => {
    if (e.target.files.length > 0) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleArenaChange = (e) => {
    if (e.target.files.length > 0) {
      setArenaOverview(e.target.files[0]);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;

    return typeof image === "string"
      ? image
      : URL.createObjectURL(image);
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Event Images</h2>
        <p>
          Update the event banner and arena overview images.
        </p>
      </div>

      <div className="banner-grid">

        {/* Event Banner */}
        <div className="banner-upload">

          <h3>Event Banner</h3>

          {bannerImage ? (
            <img
              src={getImageSrc(bannerImage)}
              alt="Event Banner"
              className="banner-preview"
            />
          ) : (
            <div className="banner-placeholder">
              <span>📷</span>
              <p>No banner selected</p>
            </div>
          )}

          <label className="upload-btn">
            Change Banner
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleBannerChange}
            />
          </label>

        </div>

        {/* Arena Overview */}
        <div className="banner-upload">

          <h3>Arena Overview</h3>

          {arenaOverview ? (
            <img
              src={getImageSrc(arenaOverview)}
              alt="Arena Overview"
              className="banner-preview"
            />
          ) : (
            <div className="banner-placeholder">
              <span>🏟️</span>
              <p>No arena overview</p>
            </div>
          )}

          <label className="upload-btn">
            Change Arena
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleArenaChange}
            />
          </label>

        </div>

      </div>
    </div>
  );
}