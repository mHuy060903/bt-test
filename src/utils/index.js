import { HEIGHT_BOARD, POINT_SIZE, WITH_BOARD } from "../constants";

export const generateRandomPoints = () => {
  const top = Math.floor(Math.random() * (HEIGHT_BOARD - POINT_SIZE));
  const left = Math.floor(Math.random() * (WITH_BOARD - POINT_SIZE));
  const z_index = Math.floor(Math.random() * 1000);
  return { top, left, z_index };
};
