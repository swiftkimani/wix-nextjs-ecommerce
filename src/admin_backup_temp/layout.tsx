import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin-globals.css";
import AdminSidebar from "./components/AdminSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard | LAMA Store",
  description: "Manage your e-commerce store",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="admin-root">
          <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
