"use client";

export default function AdminSettingsPage() {
  return (
    <>
      <div className="admin-topbar">
        <h2>Settings</h2>
      </div>

      <div className="admin-content">
        <div className="admin-table-container" style={{ maxWidth: 640 }}>
          <div className="admin-table-header">
            <h3>Store Settings</h3>
          </div>
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="admin-form-group">
              <label>Store Name</label>
              <input
                className="admin-input"
                defaultValue="LAMA"
                placeholder="Your store name"
              />
            </div>
            <div className="admin-form-group">
              <label>Contact Email</label>
              <input
                className="admin-input"
                defaultValue="test@gmail.com"
                placeholder="admin@store.com"
              />
            </div>
            <div className="admin-form-group">
              <label>Currency</label>
              <input
                className="admin-input"
                defaultValue="Ksh"
                placeholder="KSh"
              />
            </div>
            <div className="admin-form-group">
              <label>Store Region</label>
              <input
                className="admin-input"
                defaultValue="Kenya | English"
                placeholder="Country | Language"
              />
            </div>
            <div style={{ paddingTop: 8 }}>
              <button className="admin-btn admin-btn-primary">
                Save Settings
              </button>
            </div>
            <p style={{ fontSize: 13, color: "var(--admin-text-muted)", marginTop: 8 }}>
              ℹ️ Settings functionality coming soon. This is a placeholder for future store configuration.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
