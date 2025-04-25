'use client';

import { useEffect, useState } from 'react';
import BadgeModal from './BadgeModal';

const BADGES = [
  { xp: 50, label: "Junior Coder 🧑‍💻" },
  { xp: 100, label: "Web Warrior 🌐" },
  { xp: 150, label: "AI Explorer 🤖" },
];

export default function XPTracker() {
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState<string | null>(null);

  useEffect(() => {
    const storedXP = parseInt(localStorage.getItem('xp') || '0');
    setXp(storedXP);

    const earnedBadges = BADGES.filter(b => storedXP >= b.xp).map(b => b.label);
    const previousBadges = JSON.parse(localStorage.getItem('badges') || '[]');

    

    // Detect new badge
    const newOnes = earnedBadges.filter(b => !previousBadges.includes(b));
    if (newOnes.length > 0) {
      setNewBadge(newOnes[0]); // 🎉 Show the first new one
      localStorage.setItem('badges', JSON.stringify(earnedBadges));
    }

    setBadges(earnedBadges);
  }, []);

  const completedLessons = Object.keys(localStorage)
  .filter((key) => key.startsWith('completed-') && localStorage.getItem(key) === 'true').length;

  return (
    <div className="mt-10 p-4 bg-white rounded shadow relative">
      <h2 className="text-xl font-bold text-gray-800 mb-2">🏆 XP Progress</h2>

      <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${Math.min(xp, 200) / 2}%` }}
        ></div>
      </div>

      <p className="mb-4 text-gray-800 font-medium">Current XP: {xp} pts</p>

      <h3 className="font-semibold text-gray-800 mb-2">Unlocked Badges:</h3>
      <ul className="list-disc ml-6 text-gray-700">
        {badges.length > 0 ? (
          badges.map((badge, idx) => <li key={idx}>{badge}</li>)
        ) : (
          <li>No badges yet! 🚀</li>
          
        )}
      </ul>
      <p className="text-gray-700 mt-4">
  ✅ Lessons Completed: <strong>{completedLessons}</strong>
</p>


      <BadgeModal newBadge={newBadge} onClose={() => setNewBadge(null)} />
    </div>
  );
}
