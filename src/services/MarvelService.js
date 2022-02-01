
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=663b4a9becd98b0462ce0969a62eb013';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);           // чекаєм і отримуєм promise дані по запросу

        // Обробка ситуації з помилкою в запросі fetch
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();                // трансформ. в promise JS обєкт для подальшого викор.
    }

    getAllCharacters = async (offset = this._baseOffset) => {   // offset по замовчуванню якщо не передається
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    //! метод повертає обєкт від API тільки з потрібними полями
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'No data',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            key: char.id,
            comics: char.comics.items
        }
    }

}

//! провірка Сервісу http://prntscr.com/22qy9a6

export default MarvelService;