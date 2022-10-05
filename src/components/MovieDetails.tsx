import { useState, useEffect } from 'react';
import { Movie } from '../helpers/types';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { queryWikiAPI } from '../helpers/wikiQuery';
import Loading from './Loading';

type MovieDetailsProps = {
  movie: Movie;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MovieDetails = ({ movie, open, setOpen }: MovieDetailsProps) => {
  const [wikiSummary, setWikiSummary] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    queryWikiAPI(movie.name).then((result) => setWikiSummary(result));
  }, [movie]);

  return (
    <>
      {wikiSummary ? (
        <Dialog maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle variant="h4" align="center">
            {movie.name}
          </DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            {
              
            }
            <Box
              component="img"
              sx={{
                width: '100%',
                objectFit: 'contain',
              }}
              src={
                movie.poster
                  ? movie.poster.large
                  : 'https://placehold.co/500x750?text=No+poster+available'
              }
              alt={`${movie.name} poster`}
            />
            <DialogContentText>
              <Typography variant="h6">Wikipedia summary:</Typography>
              <Typography variant="body2" component="p">
                {wikiSummary}
              </Typography>
            </DialogContentText>
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
