export class Movie {
    imdbID = "";
    Title = "";
    Year = "";
    Type = "";
    Poster = "";
    /**
     * 
     * @param {Movie} movie 
     */
    constructor(movie) {
        Object.keys(movie).forEach(key => this[key] = movie[key]);
    }
}