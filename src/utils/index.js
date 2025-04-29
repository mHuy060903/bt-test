import { HEIGHT_BOARD, POINT_SIZE, WITH_BOARD } from "../constants";

export const generateRandomPoints = () => {
  const top = Math.random() * (HEIGHT_BOARD - POINT_SIZE);
  const left = Math.random() * (WITH_BOARD - POINT_SIZE);
  return { top, left };
};
