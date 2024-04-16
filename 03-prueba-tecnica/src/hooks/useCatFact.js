import { useEffect,useState } from "react";
import { getRandomFact } from "../services/facts";

export const useCatFact = () => {
    const [fact, setfact] = useState();
    const refreshFact = () => {
        getRandomFact().then((newfact) => setfact(newfact));
    };
    useEffect(refreshFact, []);
    return { fact, refreshFact };
};