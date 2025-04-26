'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] }); // 👈 Move this outside the function!

export default function AdminHome() {
  return (
    <div className={`${inter.className} bg-gray-100 min-h-screen p-10`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to the Admin Panel! 🎯</h1>
      <p className="text-gray-800 text-lg">
        Please select an option from the sidebar to manage the Academy.
      </p>
    </div>
  );
}
