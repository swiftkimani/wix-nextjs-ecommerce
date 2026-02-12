"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  totalProducts: number;
  totalCategories: number;
  totalSlides: number;
  totalRevenue: number;
  recentProducts: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image1: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <div className="admin-topbar">
          <h2>Dashboard</h2>
          <div className="admin-topbar-actions">
            <span className="admin-topbar-badge">● Live</span>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-stats-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="admin-stat-card admin-animate-in" style={{ height: 140 }}>
                <div style={{ background: 'var(--admin-surface-2)', height: 20, borderRadius: 8, width: '60%', marginBottom: 12 }} />
                <div style={{ background: 'var(--admin-surface-2)', height: 32, borderRadius: 8, width: '40%' }} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin-topbar">
        <h2>Dashboard</h2>
        <div className="admin-topbar-actions">
          <span className="admin-topbar-badge">● Live</span>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card admin-animate-in admin-stagger-1">
            <div className="stat-icon">📦</div>
            <div className="stat-label">Total Products</div>
            <div className="stat-value">{stats?.totalProducts || 0}</div>
          </div>

          <div className="admin-stat-card admin-animate-in admin-stagger-2">
            <div className="stat-icon">🏷️</div>
            <div className="stat-label">Categories</div>
            <div className="stat-value">{stats?.totalCategories || 0}</div>
          </div>

          <div className="admin-stat-card admin-animate-in admin-stagger-3">
            <div className="stat-icon">🖼️</div>
            <div className="stat-label">Hero Slides</div>
            <div className="stat-value">{stats?.totalSlides || 0}</div>
          </div>

          <div className="admin-stat-card admin-animate-in admin-stagger-4">
            <div className="stat-icon">💰</div>
            <div className="stat-label">Catalog Value</div>
            <div className="stat-value">
              Ksh {(stats?.totalRevenue || 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <Link href="/products" className="admin-btn admin-btn-primary">
            📦 Manage Products
          </Link>
          <Link href="/categories" className="admin-btn admin-btn-secondary">
            🏷️ Manage Categories
          </Link>
          <Link href="/slides" className="admin-btn admin-btn-secondary">
            🖼️ Manage Slides
          </Link>
        </div>

        {/* Recent Products Table */}
        <div className="admin-table-container admin-animate-in">
          <div className="admin-table-header">
            <h3>Recent Products</h3>
            <Link href="/products" className="admin-btn admin-btn-sm admin-btn-secondary">
              View All →
            </Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        {product.image1 && (
                          <img
                            src={product.image1}
                            alt={product.name}
                            className="product-thumb" // ERROR: Duplicate attribute? No, wait. Step 474 lines 137-141. It had className="product-thumb". I should be careful.
                          />
                        )}
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-desc">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>
                        {product.currency} {product.price.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-info">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <Link
                        href="/products"
                        className="admin-btn admin-btn-sm admin-btn-secondary"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="admin-empty">
                      <div className="empty-icon">📦</div>
                      <p>No products yet. Add your first product!</p>
                      <Link href="/products" className="admin-btn admin-btn-primary admin-btn-sm">
                        + Add Product
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
