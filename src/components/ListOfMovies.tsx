type DisplayMoviesProps = {
  movies: Movie[]
}

type Movie = {
  id: string
  name: string
  overview: string
}

const ListOfMovies = ({ movies }: DisplayMoviesProps) => {

  return (
    <>
    {movies.map((movie: Movie) => (
      <div key={movie.id}>
        <h3>{movie.name}</h3>
      </div>
    ))}
    </>
  );  

};

export default ListOfMovies;
