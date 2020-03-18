import { HttpHelper } from "./core/httpHelper"
import { Store } from "./stores/Store";

export const HttpService = new HttpHelper('http://www.omdbapi.com/', '2fbea229') 
export const store = new Store(HttpService);
