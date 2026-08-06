export default function BannerSection({
  bannerImage,
  setBannerImage,
  arenaOverview,
  setArenaOverview,
}) {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <h2>Event Media</h2>
        <p>
          Upload the event banner and the arena overview.
        </p>
      </div>

      <div className="media-grid">

        {/* Banner Image */}
        <div className="media-box">
          <h3>Event Banner</h3>

          {bannerImage ? (
            <img
              src={URL.createObjectURL(bannerImage)}
              alt="Banner Preview"
              className="banner-preview"
            />
          ) : (
            <div className="banner-placeholder">
              <span>📷</span>
              <p>No banner selected</p>
            </div>
          )}

          <label className="upload-btn">
            Choose Banner
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setBannerImage(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* Arena Overview */}
        <div className="media-box">
          <h3>Arena Overview</h3>

          {arenaOverview ? (
            <img
              src={URL.createObjectURL(arenaOverview)}
              alt="Arena Preview"
              className="banner-preview"
            />
          ) : (
            <div className="banner-placeholder">
              <span>🏟️</span>
              <p>No arena overview selected</p>
            </div>
          )}

          <label className="upload-btn">
            Choose Arena
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setArenaOverview(e.target.files[0])
              }
            />
          </label>
        </div>

      </div>
    </div>
  );
}