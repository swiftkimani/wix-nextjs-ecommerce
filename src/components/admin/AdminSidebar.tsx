"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/products", label: "Products", icon: "📦" },
  { href: "/categories", label: "Categories", icon: "🏷️" },
  { href: "/slides", label: "Slides", icon: "🖼️" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <div className="logo-icon">L</div>
        <h1>LAMA ADMIN</h1>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-nav-item ${isActive(item.href) ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link
          href="http://localhost:3000"
          className="admin-nav-item"
          target="_blank"
          rel="noopener"
        >
          <span className="nav-icon">🌐</span>
          View Store
        </Link>
      </div>
    </aside>
  );
}
