import React, { useState, useEffect, useRef } from 'react';

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [keyword, agregarKeyword]= useState("")

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=action&apikey=7d3e171a")
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
		 console.log(data)
          setMovies(data.Search);
	
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }, []);

  useEffect(() => {
	if(keyword !== ""){
    fetch("http://www.omdbapi.com/?s=action&apikey=7d3e171a")
      .then(response => response.json())
      .then(data => {
        
		 console.log(data)

		let peliculasBuscadas= data.Search.filter(resultado=>{
			return resultado.Title.toLowerCase().includes(keyword.toLowerCase())
		 })
          setMovies(peliculasBuscadas);
	
        }
      )
      .catch(error => {
        console.error('Error: ', error);
      })};
  }, [keyword]);



/*    console.log(this.state.movies) */
	
      
	// Credenciales de API
	const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=7d3e171a'; // Intenta poner cualquier cosa antes para probar
const palabra= useRef()
  const submit = function(e){
        e.preventDefault()
	
       agregarKeyword(palabra.current.value.trim())

}
	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={ submit} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={palabra} type="text" className="form-control" name='busqueda'  />
								</div>
								<button    className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2"><p>Eyyyy... ¿PUSISTE TU APIKEY?</p></div>
			}
		</div>

		
	)
}

export default SearchMovies;
