import { render, screen, waitFor } from "@testing-library/react";
import MovieDetails from "../MovieDetails";
import userEvent from "@testing-library/user-event";

const demoMovie = {
  id: '12345abc',
  name: 'Demo Movie',
  overview: 'Demo description',
  score: 3.532,
  poster: { tiny: 'https://demo.url/tiny', large: 'https://demo.url/large' },
}

const mockSetOpen = jest.fn();
const mockSetListOfMovies = jest.fn();
window.scrollTo = jest.fn();

describe('Testing MovieDetails component', () => {

  it('should render MovieDetails component with title, img, buttons and text', async () => {
  
    render(<MovieDetails movie={demoMovie} open/>);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', {
        name: demoMovie.name
      })).toBeInTheDocument();
    });
    expect(screen.getByRole('img', {
      name: demoMovie.name + ' poster'
    })).toBeInTheDocument()
    expect(screen.getByRole('heading', {
      name: /wikipedia summary:/i
    })).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: /wikipedia/i
    })).toBeInTheDocument()
    expect(screen.getByRole('link', {
      name: /tmdb/i
    })).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: /related/i
    })).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: /close/i
    })).toBeInTheDocument()

  });

  it('should disappear on close button click', async () => {
    
    render(<MovieDetails movie={demoMovie} open setOpen={mockSetOpen}/>);

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /close/i
      })).toBeInTheDocument()
    });

    userEvent.click(screen.getByRole('button', {
        name: /close/i
    }));
    
    expect(mockSetOpen).toBeCalledWith(false)
  });
  
  it('should disappear on related button click', async () => {
  
    render(<MovieDetails movie={demoMovie} open setOpen={mockSetOpen} setListOFMovies={mockSetListOfMovies}/>);

    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /related/i
      })).toBeInTheDocument()
    });

    userEvent.click(screen.getByRole('button', {
        name: /related/i
    }));
    
    await waitFor(() => {
      expect(mockSetOpen).toBeCalledWith(false)
    })
  });
});
