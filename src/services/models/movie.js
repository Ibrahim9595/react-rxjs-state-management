export class Movie {
    imdbID = "";
    Title = "";
    Year = "";
    Type = "";
    Poster = "";

    constructor(movie) {
        Object.keys(movie).forEach(key => this[key] = movie[key]);
    }
}