'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const menuItems = [
  { label: '🏠 Dashboard', href: '/admin/dashboard' },
  { label: '📚 Courses', href: '/admin/courses' },
  { label: '👨‍🎓 Students', href: '/admin/students' },
  { label: '⚙️ Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold text-green-700">
          Junior Creator 🚀
        </div>
        <nav className="mt-10">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-2.5 px-4 rounded transition ${
                pathname.startsWith(item.href)
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-green-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
