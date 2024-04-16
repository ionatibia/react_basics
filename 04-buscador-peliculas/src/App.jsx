/* Para validar se puede usar No controlado por React que lo haremos con Javascript y DOM pero la validación va con el submit.
 La forma controlada es con useState y se puede pre validar y validar después de cambiar estado pero renderiza continuamente */
/* El use ref para un formulario grande no tiene sentido, demasiados useRef 
 Lo lógico es usar ref si cada vez que renderiza tiene que mantener el valor*/
import "./App.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
    const [sort, setSort] = useState(false);
    const { search, updateSearch, searchError } = useSearch();
    const { movies, getMovies, loading, error } = useMovies({ search, sort });
    /* const inputRef = useRef(); */
    /* const handleSubmit = (event) => {
        event.preventDefault()
        const value = inputRef.current.value;
    } */
    const debounceGetMovies = useCallback(
        debounce((search) => {
            getMovies({ search });
        }, 300),
        []
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        getMovies({ search });
        /* const fields = new window.FormData(event.target);
        const query = fields.get('query') */
        /* const fields = Object.fromEntries(new window.FormData(event.target)); */
    };
    const handleSort = () => {
        setSort(!sort);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        updateSearch(value);
        debounceGetMovies(value);
    };

    return (
        <>
            <div className="page">
                <header>
                    <h1>Buscador de películas</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            onChange={handleChange}
                            name="query"
                            type="text"
                            value={search}
                            style={{
                                border: "1px solid transparent",
                                borderColor: searchError
                                    ? "red"
                                    : "transparent",
                            }}
                            placeholder="Avengers, Star Wars, The Matrix, ..."
                        />
                        <input
                            type="checkbox"
                            onChange={handleSort}
                            checked={sort}
                        />
                        <button type="submit">Buscar</button>
                    </form>
                    {searchError && (
                        <p style={{ color: "red" }}>{searchError}</p>
                    )}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </header>
                <main>
                    {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
                </main>
            </div>
        </>
    );
}

export default App;
