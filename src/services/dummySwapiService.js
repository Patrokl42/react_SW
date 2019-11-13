export default class DummySwapiService {
    _apiBase = 'https://swapi.co/api/';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }

        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`people`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`people/${11}/`);
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`planets/`);
        return res.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`planets/${11}/`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const res = await this.getResource(`starships/`);
        return res.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const starship = await this.getResource(`starships/${11}/`);
        return this._transformStarship(starship);
    };

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    };

    _transformPlanet = (planet) => {
        return{
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    };

    _transformStarship = (starship) => {
        return{
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    };

    _transformPerson = (person) => {
        return{
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            eyeColor: person.eye_color,
            birthYear: person.birth_year
        }
    };

    getPersonImage = ({ id }) => {
        return `${this._imageBase}/characters/${11}.jpg`
    };

    getStarshipImage = ({ id }) => {
        return `${this._imageBase}/starships/${11}.jpg`
    };

    getPlanetImage = ({ id }) => {
        return `${this._imageBase}/planets/${11}.jpg`
    };
}

const dummy = new DummySwapiService();