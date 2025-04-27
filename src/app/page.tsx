'use client';

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/admin/dashboard'); // 🔥 Always land on the real Admin Dashboard
  return null; // You must return something, even if redirect immediately
}
