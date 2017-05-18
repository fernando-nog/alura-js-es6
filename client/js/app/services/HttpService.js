class HttpService {

    _hasdleErrors(res){
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url){

        return fetch(url)
            .then(res => this._hasdleErrors(res))
            .then(res => res.json());
    }
}