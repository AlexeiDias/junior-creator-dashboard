'use client';

interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  emoji: string;
  bgColor: string;
}

export default function DashboardStatsCard({
  title,
  value,
  emoji,
  bgColor,
}: DashboardStatsCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow text-white ${bgColor}`}>
      <h2 className="text-lg font-bold mb-2">{emoji} {title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
