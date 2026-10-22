"use client";
import { useState, useEffect } from "react";

interface StarRatingProps {
  audiobookSlug: string;
}

// Ratings are only stored in this browser (localStorage) — there is no shared
// ratings database. So we show only the visitor's own rating: no average, no
// "N listeners ne rate kiya" and no AggregateRating schema. (Those used to be
// seeded with made-up numbers, which Google treats as fake reviews.)

function getStorageKey(slug: string) {
  return `rating_${slug}`;
}

function loadUserRating(slug: string): number {
  try {
    const stored = localStorage.getItem(getStorageKey(slug));
    if (stored) return Number(JSON.parse(stored).userRating) || 0;
  } catch {}
  return 0;
}

function saveUserRating(slug: string, userRating: number) {
  try {
    localStorage.setItem(getStorageKey(slug), JSON.stringify({ userRating }));
  } catch {}
}

export default function StarRating({ audiobookSlug }: StarRatingProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hover, setHover] = useState(0);
  const [justRated, setJustRated] = useState(false);

  useEffect(() => {
    setUserRating(loadUserRating(audiobookSlug));
  }, [audiobookSlug]);

  if (userRating === null) return null;

  const hasRated = userRating > 0;

  const handleRate = (stars: number) => {
    if (hasRated) return; // Already rated
    setUserRating(stars);
    saveUserRating(audiobookSlug, stars);
    setJustRated(true);
    setTimeout(() => setJustRated(false), 3000);
  };

  const renderStar = (index: number) => {
    const active = index <= (hasRated ? userRating : hover);
    return (
      <button
        key={index}
        onClick={() => handleRate(index)}
        onMouseEnter={() => !hasRated && setHover(index)}
        onMouseLeave={() => setHover(0)}
        disabled={hasRated}
        className={`text-2xl transition-transform ${!hasRated ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
        aria-label={`${index} star`}
      >
        <span style={{ color: active ? "#F59E0B" : "#D1D5DB" }}>★</span>
      </button>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-4">⭐ Rate This Audiobook</h3>

      {!hasRated ? (
        <div>
          <p className="text-gray-600 text-sm mb-3 font-medium">Aap rate karein:</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
          </div>
          {hover > 0 && (
            <p className="text-gray-500 text-xs mt-2">
              {["", "Bahut Bekar", "Bekar", "Theek Hai", "Achha", "Bahut Achha!"][hover]}
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => renderStar(i))}
          </div>
          {justRated ? (
            <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <p className="text-green-700 text-sm font-medium">
                Aapne {userRating} star diya — shukriya!
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Aapne {userRating} star diya ✓</p>
          )}
        </div>
      )}
    </div>
  );
}
