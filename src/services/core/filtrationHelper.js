export class Filter {
    _filtrationMethods = {
        fullMatch: (el, match) => el.toLocaleLowerCase() === match.toLocaleLowerCase(),
        startWith: (el, match) => el.toLocaleLowerCase().startWith(match.toLocaleLowerCase()),
        contains: (el, match) => el.toLocaleLowerCase().indexOf(match.toLocaleLowerCase()) !== -1,
    };

    /**
     * 
     * @param {enum(fullMatch, startWith, contains)} method 
     * @param {string} match 
     * @param {string} key 
     * @param {string} query 
     */
    constructor(method, match, key, query) {
        this.filtrationMethod = this._filtrationMethods[method];
        this.match = match;
        this.key = key;
        this.query = query ? query : match;
    }

    toQueryParams() {
        return { key: this.query, val: this.match };
    }
};