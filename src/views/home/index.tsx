import React, { useState, useEffect } from 'react';
import Tank from './components/Tanks';
import Bullet from './components/Bullet';

const Game: React.FC = () => {
  const [tankPosition, setTankPosition] = useState({ x: 100, y: 100 });
  const [tankDirection, setTankDirection] = useState<'up' | 'down' | 'left' | 'right'>('up');
  const [bullets, setBullets] = useState<{ x: number; y: number; direction: 'up' | 'down' | 'left' | 'right' }[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { x, y } = tankPosition;
      switch (e.key) {
        case 'ArrowUp':
          setTankDirection('up');
          setTankPosition({ x, y: y - 10 });
          break;
        case 'ArrowDown':
          setTankDirection('down');
          setTankPosition({ x, y: y + 10 });
          break;
        case 'ArrowLeft':
          setTankDirection('left');
          setTankPosition({ x: x - 10, y });
          break;
        case 'ArrowRight':
          setTankDirection('right');
          setTankPosition({ x: x + 10, y });
          break;
        case ' ':
          setBullets((prev) => [
            ...prev,
            { x: tankPosition.x + 15, y: tankPosition.y + 15, direction: tankDirection },
          ]);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tankPosition, tankDirection]);

  useEffect(() => {
    const moveBullets = () => {
      setBullets((prev) =>
        prev.map((bullet) => {
          let { x, y, direction } = bullet;
          switch (direction) {
            case 'up':
              y -= 5;
              break;
            case 'down':
              y += 5;
              break;
            case 'left':
              x -= 5;
              break;
            case 'right':
              x += 5;
              break;
            default:
              break;
          }
          return { x, y, direction };
        })
      );
    };

    const interval = setInterval(moveBullets, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black' }}>
      <Tank x={tankPosition.x} y={tankPosition.y} direction={tankDirection} />
      {bullets.map((bullet, index) => (
        <Bullet key={index} x={bullet.x} y={bullet.y} direction={bullet.direction} />
      ))}
    </div>
  );
};

export default Game;