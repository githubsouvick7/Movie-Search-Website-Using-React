import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { AppProvider, useGlobalContext } from './Context';
import { apiKey } from './Context';

const SingleMovie = () => {
    const { id } = useParams();
    console.log(id);

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState("");

    const getMovies = async (url) => {
        try {
            console.log(url)
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setIsLoading(false)
                setMovie(data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getMovies(`${apiKey}&i=${id}`)
    }, [id])

    if (isLoading) {
        return (
            <div className="movie-section">
                <div className="loading">Loading....</div>
            </div>
        )
    }

    return (
        <section className="movie-section">
            <div className="movie-card">
                <figure>
                    <img src={movie.Poster} alt="" />
                </figure>
                <div className="card-content">
                    <p className="title">{movie.Title}</p>
                    <p className=""></p>
                    <p className="card-text">{movie.Released}</p>
                    <p className="card-text">{movie.Genre}</p>
                    <p className="card-text">{movie.imdbRating} / 10</p>
                    <p className="card-text">{movie.Country}</p>
                    <NavLink to="/" className="back-btn">
                        Go Back
                    </NavLink>
                </div>
            </div>
        </section>
    );
}

export default SingleMovie
