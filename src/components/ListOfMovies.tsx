import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Movie } from '../types/types';

type ListOfMoviesProps = {
  movies: Movie[];
  setselectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
};

const ListOfMovies = ({ movies, setselectedMovie }: ListOfMoviesProps) => {
  return (
    <Box component="section" data-testid="list-of-movies">
      {movies.map((movie: Movie) => (
        <Card component="article" sx={{ display: 'flex', my: 2 }} key={movie.id}>
          <CardMedia
            component="img"
            sx={{ height: 100, width: 67 }}
            image={
              movie.poster
                ? movie.poster.tiny
                : 'https://placehold.co/134x200?text=No+poster+available'
            }
            alt={`${movie.name} poster`}
          />
          <CardContent>
            <Typography variant="h5" component="h2" onClick={() => setselectedMovie(movie)} sx={{ cursor: 'pointer' }}>
              {movie.name}
            </Typography>
            <Typography variant="subtitle2" component="h3">
              Rating: { movie.score % 1 ? movie.score.toFixed(1) : movie.score}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ListOfMovies;
