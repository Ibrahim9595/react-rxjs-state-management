import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Movie } from '../models/movie';

/**
 * TODO: 
 * 1- A way to merge old data with new data
 * 2- select an element
 * 3- ui
 */

export class Store {
    /** 
     * @type {HttpHelper} 
     * @access private
    */
    _http;

    /**
     *  @type {BehaviorSubject<Movie[]>} 
     * @access private
     */
    _data = new BehaviorSubject({ loading: false, data: [] });

    /** 
     * @type {BehaviorSubject<Filter[]>} 
     * @access private
     */
    _filters = new BehaviorSubject([]);
    
    _page = 1;

    /**
     * 
     * @param {HttpHelper} http 
     */
    constructor(http) {
        this._http = http;
        this.uiData = combineLatest(
            this._data,
            this._filters.pipe(
                debounceTime(500),
                map(filters => {
                    this._find(filters);
                    return filters;
                }),
            )
        ).pipe(
            map(([data, filters]) => ({
                data: data.data.filter(d =>
                    filters.every(filter =>
                        filter.filtrationMethod(d[filter.key], filter.match))),
                loading: data.loading,
            })
            ),
        );
    }

    /**
     * @param {Filter[]} filters 
     */
    setFilters(filters) {
        this._filters.next(filters);
    }

    loadMore() {
        this.page++;
        this._find(this._filters.value);
    }

    /**
     * @param {Filter[]} filters 
     * @access private
     */
    async _find(filters) {
        this._data.next({ ...this._data.value, loading: true })
        try {
            const data = await this._http.findAll(
                [...filters.map(filter => filter.toQueryParams()), { key: 'page', val: this.page }]
            );
            this._data.next({ loading: false, data: (data.Search || []).map(el => new Movie(el)) });
        } catch (error) {
            alert(error);
        }
    }
}