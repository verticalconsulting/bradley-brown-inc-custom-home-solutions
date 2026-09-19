import React, { useState, useRef } from "react";
import { RefreshCw } from "lucide-react";

export default function PullToRefresh({ onRefresh, children }) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startYRef = useRef(0);
  const containerRef = useRef(null);
  const isRefreshingRef = useRef(false);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startYRef.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshingRef.current) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startYRef.current);
    setPullDistance(distance);
  };

  const handleTouchEnd = async () => {
    setIsPulling(false);

    if (pullDistance > 100 && !isRefreshingRef.current) {
      isRefreshingRef.current = true;
      await onRefresh();
      isRefreshingRef.current = false;
    }

    setPullDistance(0);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-auto"
    >
      {pullDistance > 0 && (
        <div
          className="sticky top-0 left-0 right-0 flex items-center justify-center bg-sky-50 border-b border-sky-200 transition-all"
          style={{ height: `${Math.min(pullDistance, 80)}px` }}
        >
          <RefreshCw
            className={`w-5 h-5 text-sky-400 ${
              pullDistance > 100 ? "animate-spin" : ""
            }`}
          />
        </div>
      )}
      {children}
    </div>
  );
}