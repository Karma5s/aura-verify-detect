
import React, { useEffect, useState } from 'react';

interface WaveformVisualizationProps {
  isActive: boolean;
}

export const WaveformVisualization: React.FC<WaveformVisualizationProps> = ({ isActive }) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prevBars => 
        prevBars.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex items-center justify-center space-x-1 h-16">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full transition-all duration-100"
          style={{
            width: '3px',
            height: `${Math.max(4, height * 0.6)}px`,
            opacity: isActive ? 0.8 : 0.3,
          }}
        />
      ))}
    </div>
  );
};
