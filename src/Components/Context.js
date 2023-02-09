import React, { useEffect, useState, useContext } from 'react';

export const apiKey = `http://www.omdbapi.com/?apikey=92839772`
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({
        show: "False",
        msg: ""
    })
    const [quary, setQuary] = useState('endgame');

    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false)
                setMovie(data.Search);
            } else {
                setIsError({
                    show: "True",
                    msg: data.Error
                });
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        let timer = setTimeout(() => {
            getMovies(`${apiKey}&s=${quary}`)
        }, 1500);
        return () => clearTimeout(timer)
    }, [quary])

    return <AppContext.Provider value={{ isLoading, isError, movie, quary, setQuary }}>{children}</AppContext.Provider>;
};
const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };