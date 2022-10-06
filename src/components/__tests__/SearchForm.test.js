import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "../SearchForm";

describe('Testing SearchForm component', () => {

  it('should render SearchForm component with heading, textbox and button', async () => {
    render(<SearchForm getMovies={()=>{}}/>);
    
    expect(screen.getByRole('heading', {
      name: /looking for a movie\?/i
    })).toBeInTheDocument();
    expect(screen.getByRole('textbox', {
      name: /search/i
    })).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: /search/i
    })).toBeInTheDocument()
  });

  it('should change input value', () => {
    render(<SearchForm getMovies={()=>{}}/>);

    userEvent.type(screen.getByRole('textbox', {
      name: /search/i
    }), 'borat');
    
    expect(screen.getByRole('textbox', {
      name: /search/i
    }).value).toBe('borat');
  });

  it('should call getMovies when search button clicked', () => {
    const mockGetMovies = jest.fn();
    
    render(<SearchForm getMovies={mockGetMovies}/>);

    userEvent.type(screen.getByRole('textbox', {
      name: /search/i
    }), 'borat');
    
    userEvent.click(screen.getByRole('button', {
      name: /search/i
    }));

    expect(mockGetMovies).toHaveBeenCalledTimes(1);
    expect(mockGetMovies).toHaveBeenCalledWith({ variables: { searchQuery: 'borat' } });
  });
});
