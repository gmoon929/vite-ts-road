import React, { useEffect, useRef } from 'react';

interface TankProps {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

const Tank: React.FC<TankProps> = ({ x, y, direction }) => {
  const tankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tankRef.current) {
      tankRef.current.style.left = `${x}px`;
      tankRef.current.style.top = `${y}px`;
      tankRef.current.style.transform = `rotate(${
        direction === 'up' ? 0 :
        direction === 'down' ? 180 :
        direction === 'left' ? -90 : 90
      }deg)`;
    }
  }, [x, y, direction]);

  return (
    <div
      ref={tankRef}
      style={{
        position: 'absolute',
        width: '40px',
        height: '40px',
        backgroundColor: 'green',
        transition: 'left 0.1s, top 0.1s',
      }}
    />
  );
};

export default Tank;