const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export const getRandomFact = async () => {
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
    const data = await res.json();
    const { fact } = data;
    return fact;
};

export const getCatRandomImage = async (fact) =>{
    const firstWord = fact.split(" ", 3).join(" ");
       return fetch(
            `https://cataas.com/cat/says/${firstWord}?size=50&color=red`
        ).then((response) => {
            const { url } = response;
            return(url)
        });
}