import "./App.css";
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import { Otro } from "./components/Otro";

export function App() {
    const { fact, refreshFact } = useCatFact();
    const { imageUrl } = useCatImage({ fact });

    const handleClick = async () => {
        refreshFact();
    };
    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new fact</button>
            {fact && <p title="factText">{fact}</p>}
            {!fact && <p>CARGANDO...</p>}
            {imageUrl && (
                <img
                    title="imagen"
                    src={imageUrl}
                    alt={`Image extracted from API after post three words from fact: ${fact}`}
                ></img>
            )}
            {/* <section>
                {fact && <p>{fact}</p>}
                {!fact && <p>CARGANDO...</p>}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={`Image extracted from API after post three words from fact: ${fact}`}
                    ></img>
                )}
            </section> */}
            <Otro />
        </main>
    );
}
