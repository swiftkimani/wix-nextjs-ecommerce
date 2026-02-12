"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    image: "",
    slug: "",
  });

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setForm({ name: "", image: "", slug: "" });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setForm({ name: cat.name, image: cat.image, slug: cat.slug });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name) {
      showToast("Name is required", "error");
      return;
    }

    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");

    if (editingCategory) {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        showToast("Category updated!");
        fetchCategories();
      }
    } else {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        showToast("Category created!");
        fetchCategories();
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Category deleted!");
      fetchCategories();
    }
    setDeleteId(null);
  };

  return (
    <>
      <div className="admin-topbar">
        <h2>Categories</h2>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-badge">{categories.length} categories</span>
        </div>
      </div>

      <div className="admin-content">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button className="admin-btn admin-btn-primary" onClick={openCreateModal}>
            + Add Category
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Slug</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", padding: 40 }}>Loading...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <div className="admin-empty">
                      <div className="empty-icon">🏷️</div>
                      <p>No categories yet</p>
                      <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openCreateModal}>
                        + Add Category
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <div className="product-cell">
                        {cat.image && (
                          <img src={cat.image} alt={cat.name} className="product-thumb" />
                        )}
                        <div className="product-name">{cat.name}</div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-info">{cat.slug}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openEditModal(cat)}>
                          ✏️ Edit
                        </button>
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => setDeleteId(cat.id)}>
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
              <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
              <button className="admin-btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Category Name *</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Electronics"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Image URL</label>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Slug (auto-generated if empty)</label>
                <input
                  className="admin-input"
                  placeholder="electronics"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>
                {editingCategory ? "Save Changes" : "Create Category"}
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
              <p className="admin-confirm-text">Delete this category? This cannot be undone.</p>
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
