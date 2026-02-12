"use client";

import { useEffect, useState } from "react";

interface Slide {
  id: string;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string;
}

const bgOptions = [
  { label: "Yellow → Pink", value: "bg-gradient-to-r from-yellow-50 to-pink-50" },
  { label: "Pink → Blue", value: "bg-gradient-to-r from-pink-50 to-blue-50" },
  { label: "Blue → Yellow", value: "bg-gradient-to-r from-blue-50 to-yellow-50" },
  { label: "Green → Teal", value: "bg-gradient-to-r from-green-50 to-teal-50" },
  { label: "Purple → Pink", value: "bg-gradient-to-r from-purple-50 to-pink-50" },
];

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    img: "",
    url: "/",
    bg: bgOptions[0].value,
  });

  const fetchSlides = () => {
    fetch("/api/slides")
      .then((res) => res.json())
      .then((data) => {
        setSlides(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setForm({ title: "", description: "", img: "", url: "/", bg: bgOptions[0].value });
    setEditingSlide(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (slide: Slide) => {
    setEditingSlide(slide);
    setForm({
      title: slide.title,
      description: slide.description,
      img: slide.img,
      url: slide.url,
      bg: slide.bg,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.title) {
      showToast("Title is required", "error");
      return;
    }

    if (editingSlide) {
      const res = await fetch(`/api/slides/${editingSlide.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast("Slide updated!");
        fetchSlides();
      }
    } else {
      const res = await fetch("/api/slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast("Slide created!");
        fetchSlides();
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/slides/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Slide deleted!");
      fetchSlides();
    }
    setDeleteId(null);
  };

  return (
    <>
      <div className="admin-topbar">
        <h2>Hero Slides</h2>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-badge">{slides.length} slides</span>
        </div>
      </div>

      <div className="admin-content">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button className="admin-btn admin-btn-primary" onClick={openCreateModal}>
            + Add Slide
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Slide</th>
                <th>Description</th>
                <th>Background</th>
                <th>Link</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 40 }}>Loading...</td>
                </tr>
              ) : slides.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-empty">
                      <div className="empty-icon">🖼️</div>
                      <p>No slides yet</p>
                      <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openCreateModal}>
                        + Add Slide
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                slides.map((slide) => (
                  <tr key={slide.id}>
                    <td>
                      <div className="product-cell">
                        {slide.img && (
                          <img src={slide.img} alt={slide.title} className="product-thumb" />
                        )}
                        <div className="product-name">{slide.title}</div>
                      </div>
                    </td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {slide.description}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-info" style={{ fontSize: 11 }}>
                        {bgOptions.find((o) => o.value === slide.bg)?.label || slide.bg}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-warning">{slide.url}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEditModal(slide)}>
                          ✏️ Edit
                        </button>
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteId(slide.id)}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingSlide ? "Edit Slide" : "Add New Slide"}</h3>
              <button className="admin-btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Title *</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Summer Sales Collections"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Sale! Upto 50% Off!"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Image URL</label>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Link URL</label>
                <input
                  className="admin-input"
                  placeholder="/"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Background Gradient</label>
                <select
                  className="admin-select"
                  value={form.bg}
                  onChange={(e) => setForm({ ...form, bg: e.target.value })}
                >
                  {bgOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>
                {editingSlide ? "Save Changes" : "Create Slide"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button className="admin-btn-icon" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-confirm-text">Delete this slide? This cannot be undone.</p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="admin-btn admin-btn-danger" onClick={handleDelete}>🗑️ Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`admin-toast ${toast.type === "error" ? "admin-toast-error" : "admin-toast-success"}`}>
          {toast.type === "error" ? "❌" : "✅"} {toast.message}
        </div>
      )}
    </>
  );
}
