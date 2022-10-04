import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from '@mui/material/Backdrop';

const Loading = ({ open }: {open: boolean}) => {
  return (
    <Backdrop
      sx={{ color: '#fff' }}
      open={open}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};

export default Loading;
