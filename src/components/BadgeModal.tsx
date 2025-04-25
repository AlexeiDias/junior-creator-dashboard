'use client';

import { useEffect, useState } from 'react';

interface BadgeModalProps {
  newBadge: string | null;
  onClose: () => void;
}

export default function BadgeModal({ newBadge, onClose }: BadgeModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (newBadge) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        onClose();
      }, 4000); // auto-close in 4 seconds
    }
  }, [newBadge, onClose]);

  if (!visible || !newBadge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80 animate-bounce">
        <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Badge Unlocked!</h2>
        <p className="text-xl">{newBadge}</p>
      </div>
    </div>
  );
}
