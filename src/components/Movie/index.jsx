import React from 'react';
import './index.css';

/**
 * 
 * @param {{data: Movie}} props
 */
export const MovieComponent = ({ data }) => (
    <div key={data.imdbID} className="movie-container">
        <h5 className="movie-year">{data.Year}</h5>
        <img
            className="movie-poster"
            src={data.Poster}
            alt="poster" />
        <h3 className="movie-title">{data.Title}</h3>
    </div>
);