import { useState, useEffect } from 'react';
import { Movie } from '../types/types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { queryWikiAPI } from '../helpers/wikiQuery';
import Loading from './Loading';
import { queryTmdbApi } from '../helpers/tmdbQuery';

type MovieDetailsProps = {
  movie: Movie;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListOFMovies: React.Dispatch<React.SetStateAction<Movie[] | null>>
};

const MovieDetails = ({ movie, open, setOpen, setListOFMovies }: MovieDetailsProps) => {
  const [wikiSummary, setWikiSummary] = useState('');
  const [wikiLink, setWikiLink] = useState<string | null>(null);

  useEffect(() => {
    queryWikiAPI(movie.name).then((result) => {
      setWikiSummary(result.summary);
      setWikiLink(result.url);
    });
  }, [movie]);
  
  const handleClose = () => {
    setOpen(false);
  };

  const getRelatedMovies = async (movieId: string) => {
    const result = await queryTmdbApi(movieId);
    if (result.status === 'ok') setListOFMovies(result.relatedMovies!)
    handleClose();
    window.scrollTo(0, 0);
  }

  return (
    <>
      {wikiSummary ? (
        <Dialog maxWidth="md" open={open} onClose={handleClose} data-testid="movie-details">
          <DialogTitle variant="h4" align="center" component="h2">
            {movie.name}
          </DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }} component="nav" >
            <Button
              disabled={!wikiLink}
              href={wikiLink!}
              target="_blank"
              rel="noopener"
              variant="text"
            >
              Wikipedia
            </Button>
            <Button
              href={`https://www.themoviedb.org/movie/${movie.id}`}
              target="_blank"
              rel="noopener"
              variant="text"
            >
              TMDB
            </Button>
            <Button
              onClick={() => getRelatedMovies(movie.id)}
              variant="contained"
            >
              Related
            </Button>
          </Box>
          <DialogContent sx={{ display: 'flex', gap: 2, flexDirection: {xs: 'column', sm: 'row'} }}>
            <Box
              component="img"
              sx={{
                width: {xs: '100%', sm: '50%'},
                maxWidth: { sm: 300},
                objectFit: 'contain',
              }}
              src={
                movie.poster
                  ? movie.poster.large
                  : 'https://placehold.co/500x750?text=No+poster+available'
              }
              alt={`${movie.name} poster`}
            />
            <Box component="article">
              <Typography variant="h6">Wikipedia summary:</Typography>
              <Typography variant="body2" component="p">
                {wikiSummary}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Loading open />
      )}
    </>
  );
};

export default MovieDetails;
