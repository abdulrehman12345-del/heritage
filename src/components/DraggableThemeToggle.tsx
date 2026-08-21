import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Move } from 'lucide-react';

interface DraggableThemeToggleProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const DraggableThemeToggle: React.FC<DraggableThemeToggleProps> = ({
  theme,
  onToggleTheme,
}) => {
  // Load saved position from localStorage or use default bottom-right
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('theme_toggle_pos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback if parsing fails
    }
    // Default position: 24px from right, 90px from bottom
    const initX = typeof window !== 'undefined' ? window.innerWidth - 80 : 300;
    const initY = typeof window !== 'undefined' ? window.innerHeight - 100 : 500;
    return { x: Math.max(16, initX), y: Math.max(80, initY) };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });
  const hasMovedRef = useRef(false);

  // Keep within screen bounds on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        const maxX = window.innerWidth - 65;
        const maxY = window.innerHeight - 65;
        const clampedX = Math.min(Math.max(16, prev.x), maxX);
        const clampedY = Math.min(Math.max(80, prev.y), maxY);
        return { x: clampedX, y: clampedY };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save position when it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme_toggle_pos', JSON.stringify(position));
    } catch {
      // ignore storage error
    }
  }, [position]);

  // Pointer / Touch drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasMovedRef.current = true;
    }

    const maxX = window.innerWidth - 65;
    const maxY = window.innerHeight - 65;
    const newX = Math.min(Math.max(16, dragStartRef.current.posX + deltaX), maxX);
    const newY = Math.min(Math.max(80, dragStartRef.current.posY + deltaY), maxY);

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore pointer capture release error
    }

    // If it was a quick click without dragging, toggle theme
    if (!hasMovedRef.current) {
      onToggleTheme();
    }
  };

  return (
    <div
      id="floating-theme-toggle"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      title={theme === 'dark' ? 'Switch to Day Mode (Drag to reposition)' : 'Switch to Night Mode (Drag to reposition)'}
      className={`group select-none flex items-center gap-1.5 p-2 rounded-full cursor-grab active:cursor-grabbing transition-shadow duration-200 border shadow-2xl ${
        theme === 'dark'
          ? 'bg-[#1F2328]/95 text-[#FFE270] border-[#B68D40]/60 shadow-black/80 hover:border-[#FFE270]'
          : 'bg-[#FAF8F5]/95 text-[#A76B3F] border-[#B68D40]/40 shadow-stone-900/20 hover:border-[#B68D40]'
      } backdrop-blur-md`}
    >
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#B68D40]/15">
        {theme === 'dark' ? (
          <Moon className="w-5 h-5 text-[#FFE270] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="w-5 h-5 text-[#B68D40] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
        )}
      </div>

      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-1 hidden sm:inline-block">
        {theme === 'dark' ? 'Night' : 'Day'}
      </span>

      <div className="opacity-40 group-hover:opacity-100 transition-opacity p-0.5" title="Drag to reposition">
        <Move className="w-3.5 h-3.5 text-current" />
      </div>
    </div>
  );
};
