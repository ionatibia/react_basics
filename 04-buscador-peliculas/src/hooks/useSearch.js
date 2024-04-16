import { useState, useEffect, useRef } from "react";
export function useSearch() {
    const [search, updateSearch] = useState("");
    const [searchError, setError] = useState(null);
    const isFirstInput = useRef(true)

    useEffect(() => {
        if(isFirstInput.current){
            isFirstInput.current = search === ''
            return
        }
        if (search === "") {
            setError("No se puede buscar una película sin texto");
            return;
        }
        if (search.startsWith(" ")) {
            setError(
                "No se puede buscar una película si empieza con un espacio"
            );
            return;
        }
        if (search.match(/^\d+$/)) {
            setError("No se puede buscar una película con un número");
            return;
        }
        if (search.length < 3) {
            setError("No se puede buscar una película con solo 3 caracteres");
            return;
        }

        setError(null);
    }, [search]);

    return { search, updateSearch, searchError };
}