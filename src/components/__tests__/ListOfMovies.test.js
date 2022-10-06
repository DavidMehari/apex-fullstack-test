import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListOfMovies from "../ListOfMovies";

const demoMovies = [
  {
    id: '12345abc',
    name: 'Demo Movie',
    overview: 'Demo description',
    score: 3.532,
    poster: { tiny: 'https://demo.url/tiny', large: 'https://demo.url/large' },
  },
  {
    id: '67890xyz',
    name: 'Demo Movie 2',
    overview: 'Demo description 2',
    score: 1.5,
    poster: { tiny: 'https://demo.url/tiny2', large: 'https://demo.url/large2' },
  },
]

const mocksetselectedMovie = jest.fn();

describe('Testing ListOfMovies component', () => {

  it('should render list of movies with movie data', async () => {
  
    render(<ListOfMovies movies={demoMovies} />);
    
    expect(screen.getByTestId('list-of-movies')).toBeInTheDocument();
    
    expect(screen.getByRole('heading', {
      name: demoMovies[0].name
    })).toBeInTheDocument()
    expect(screen.getByRole('img', {
      name: demoMovies[0].name + ' poster'
    })).toBeInTheDocument()
    expect(screen.getByRole('heading', {
      name: /rating: 3\.5/i
    })).toBeInTheDocument()
    
    expect(screen.getByRole('heading', {
      name: demoMovies[1].name
    })).toBeInTheDocument()
    expect(screen.getByRole('img', {
      name: demoMovies[1].name + ' poster'
    })).toBeInTheDocument()
    expect(screen.getByRole('heading', {
      name: /rating: 1\.5/i
    })).toBeInTheDocument()

  });
  
  it('should select a movie by clicking it\'s title', async () => {
  
    render(<ListOfMovies movies={demoMovies} setselectedMovie={mocksetselectedMovie} />);
    
    userEvent.click(screen.getByRole('heading', {
      name: demoMovies[0].name
    }))

    expect(mocksetselectedMovie).toBeCalledWith({
      id: '12345abc',
      name: 'Demo Movie',
      overview: 'Demo description',
      score: 3.532,
      poster: { tiny: 'https://demo.url/tiny', large: 'https://demo.url/large' },
    });
    
    userEvent.click(screen.getByRole('heading', {
      name: demoMovies[1].name
    }))

    expect(mocksetselectedMovie).toBeCalledWith({
      id: '67890xyz',
      name: 'Demo Movie 2',
      overview: 'Demo description 2',
      score: 1.5,
      poster: { tiny: 'https://demo.url/tiny2', large: 'https://demo.url/large2' },
    });
  });
});
