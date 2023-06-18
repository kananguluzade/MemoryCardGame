import { marvel_characters } from "./data.js";
export const randomCards = () => {
    marvel_characters.sort(() => Math.random() - 0.5);
    return marvel_characters;
  };