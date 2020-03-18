export class HttpHelper {
    constructor(baseUrl, apiKey) {
        console.log(apiKey);
        this.baseUrl = baseUrl + '?apikey=' + apiKey;
    }

    async findAll(queryParams) {
        try {
            const res = await fetch(`${this.baseUrl}${
                queryParams.reduce((p, c) => p + '&' + c.key + '=' + c.val, '')
                }`);
            return await res.json();
        } catch (err) {
            return new Promise((_, rej) => rej(err));
        }
    }

    async findOne(id) {
        try {
            const res = await fetch(`${this.baseUrl}&id=${id}`);
            return await res.json();
        } catch (err) {
            return new Promise((_, rej) => rej(err));
        }
    }
}