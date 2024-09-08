import { useEffect, useRef, useState } from 'react';
import { Arrow, Ceil, Direction } from './types';
import { initialSnake, initialField, initialApple, generateRandomCoordinate, fieldLen, selectColor } from './contsants';

function App() {
  const [snake, setSnake] = useState(initialSnake);
  const [isGameOver, setIsGameOver] = useState(false);
  const fieldRef = useRef(initialField);
  const appleRef = useRef(initialApple);
  const directionRef = useRef(Direction.Right);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case Arrow.Down:
          if (directionRef.current === Direction.Up) {
            break;
          }
          directionRef.current = Direction.Down;
          break;
        case Arrow.Up:
          if (directionRef.current === Direction.Down) {
            break;
          }
          directionRef.current = Direction.Up;
          break;
        case Arrow.Left:
          if (directionRef.current === Direction.Right) {
            break;
          }
          directionRef.current = Direction.Left;
          break;
        case Arrow.Right:
          if (directionRef.current === Direction.Left) {
            break;
          }
          directionRef.current = Direction.Right;
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    const handleMove = () => {
      const setSnakeCoords = (numX: number, numY: number) => {
        setSnake(s => {
          const newHeadX = s[s.length-1][0] + numX;
          const newHeadY = s[s.length-1][1] + numY;

          console.log(newHeadX, newHeadY)

          if (newHeadX === appleRef.current[0] && newHeadY === appleRef.current[1]) {
            const newSnake = [...s, [newHeadX, newHeadY]];
            appleRef.current = generateRandomCoordinate(newSnake);
            return newSnake;
          }

          if (newHeadX < 0 || newHeadY < 0 || newHeadX === fieldLen || newHeadY === fieldLen) {
            setIsGameOver(true);
            return s;
          }

          for (let snakeCeil of s) {
            if (snakeCeil[0] === newHeadX && snakeCeil[1] === newHeadY) {
              setIsGameOver(true);
              return s;
            }
          }

          return [...s.slice(1), [newHeadX, newHeadY]]
        });
      }

      switch (directionRef.current) {
        case Direction.Up:
          setSnakeCoords(-1, 0);
          break;
        case Direction.Down:
          setSnakeCoords(1, 0);
          break;
        case Direction.Left:
          setSnakeCoords(0, -1);
          break;
        case Direction.Right:
          setSnakeCoords(0, 1);
          break;
      }
    }

    const timer = setInterval(handleMove, 250);

    return () => {
      clearInterval(timer);
    }
  }, []);

  fieldRef.current = fieldRef.current.map((row, rowIndex) => {
    return row.map((_, columnIndex) => {
      if (rowIndex === appleRef.current[0] && columnIndex === appleRef.current[1]) {
        return Ceil.Apple;
      }

      for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] === rowIndex && snake[i][1] === columnIndex) {
          if (i === snake.length - 1) {
            return Ceil.Head;
          }

          return Ceil.Body;
        }
      }

      return Ceil.Empty;
    })
  });

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {isGameOver && <div className='font-bold text-9xl absolute z-10 top-0'>GAME OVER</div>}
      <div className='grid grid-cols-15 aspect-square h-[70vh]'>
        {fieldRef.current.map((row, rowIndex) => {
          return row.map((ceil, columnIndex) => {
            return <div key={`${rowIndex} ${columnIndex}`} className={`border-2 bg-${selectColor(ceil)}`} />
          })
        })}
      </div>
    </div>
  );
}

export default App;
