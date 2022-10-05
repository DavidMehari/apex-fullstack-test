export type Movie = {
  id: string;
  name: string;
  overview: string;
  score: number;
  poster: { tiny: string, large: string };
};