export type Movie = {
  id: string;
  name: string;
  overview: string;
  score: number;
  poster: { tiny: string, large: string };
};

export type TmdbQueryResult = {
  id: number
  overview: string 
  poster_path: string
  title: string
  vote_average: number
}