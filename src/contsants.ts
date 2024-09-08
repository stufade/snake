import { Ceil } from "./types";

export const fieldLen = 15;
export const initialField: Ceil[][] = Array.from({ length: fieldLen }, () => Array(fieldLen).fill(Ceil.Empty));

export const generateRandomCoordinate = (occupiedCoordinates: number[][]) => {
  function isOccupied(coordinate: number[], occupiedCoordinates: number[][]) {
    return occupiedCoordinates.some(
      oc => oc[0] === coordinate[0] && oc[1] === coordinate[1]
    );
  }

  let newCoordinate;
  do {
    const x = Math.floor(Math.random() * (fieldLen));
    const y = Math.floor(Math.random() * (fieldLen));
    
    newCoordinate = [x, y];
  } while (isOccupied(newCoordinate, occupiedCoordinates));

  return newCoordinate;
}

export const initialSnake = [[(fieldLen - 1) / 2, 1], [(fieldLen - 1) / 2, 2], [(fieldLen - 1) / 2, 3]];
export const initialApple = [(fieldLen - 1) / 2, (fieldLen - 1) / 2];

export const selectColor = (ceil: Ceil) => {
  switch (ceil) {
    case Ceil.Apple:
      return 'red-900'
    case Ceil.Body:
    case Ceil.Head:
      return 'black'
    default:
      return 'transparent'
  }
}
