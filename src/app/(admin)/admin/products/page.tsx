"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image1: string;
  image2: string;
  url: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    currency: "Ksh",
    image1: "",
    image2: "",
    url: "/test",
    featured: true,
  });

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      currency: "Ksh",
      image1: "",
      image2: "",
      url: "/test",
      featured: true,
    });
    setEditingProduct(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      currency: product.currency,
      image1: product.image1,
      image2: product.image2,
      url: product.url,
      featured: product.featured,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      showToast("Name and price are required", "error");
      return;
    }

    if (editingProduct) {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (res.ok) {
        showToast("Product updated successfully!");
        fetchProducts();
      }
    } else {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (res.ok) {
        showToast("Product created successfully!");
        fetchProducts();
      }
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Product deleted!");
      fetchProducts();
    }
    setDeleteId(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="admin-topbar">
        <h2>Products</h2>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-badge">{products.length} items</span>
        </div>
      </div>

      <div className="admin-content">
        {/* Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div className="admin-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="admin-btn admin-btn-primary" onClick={openCreateModal}>
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Added</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: 40 }}>
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="admin-empty">
                      <div className="empty-icon">📦</div>
                      <p>{search ? "No products match your search" : "No products yet"}</p>
                      {!search && (
                        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openCreateModal}>
                          + Add Product
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        {product.image1 && (
                          <img
                            src={product.image1}
                            alt={product.name}
                            className="product-thumb"
                          />
                        )}
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-desc">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      {product.currency} {product.price.toLocaleString()}
                    </td>
                    <td>
                      <span className={`admin-badge ${product.featured ? "admin-badge-success" : "admin-badge-warning"}`}>
                        {product.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-info">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-secondary"
                          onClick={() => openEditModal(product)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-sm admin-btn-danger"
                          onClick={() => setDeleteId(product.id)}
                        >
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
              <button className="admin-btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Product Name *</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Wireless Headphones"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <input
                  className="admin-input"
                  placeholder="Brief product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="admin-form-group">
                  <label>Price *</label>
                  <input
                    className="admin-input"
                    type="number"
                    placeholder="4500"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Currency</label>
                  <input
                    className="admin-input"
                    placeholder="Ksh"
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Image URL (Primary)</label>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.image1}
                  onChange={(e) => setForm({ ...form, image1: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Image URL (Hover)</label>
                <input
                  className="admin-input"
                  placeholder="https://..."
                  value={form.image2}
                  onChange={(e) => setForm({ ...form, image2: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label>Product Link</label>
                <input
                  className="admin-input"
                  placeholder="/product-slug"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
              </div>
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Featured Product
              </label>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="admin-btn admin-btn-primary" onClick={handleSubmit}>
                {editingProduct ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button className="admin-btn-icon" onClick={() => setDeleteId(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <p className="admin-confirm-text">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="admin-btn admin-btn-danger" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type === "error" ? "admin-toast-error" : "admin-toast-success"}`}>
          {toast.type === "error" ? "❌" : "✅"} {toast.message}
        </div>
      )}
    </>
  );
}
