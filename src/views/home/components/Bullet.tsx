import React, { useEffect, useRef } from 'react';

interface BulletProps {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

const Bullet: React.FC<BulletProps> = ({ x, y, direction }) => {
  const bulletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bulletRef.current) {
      bulletRef.current.style.left = `${x}px`;
      bulletRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  return (
    <div
      ref={bulletRef}
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        transition: 'left 0.1s, top 0.1s',
      }}
    />
  );
};

export default Bullet;