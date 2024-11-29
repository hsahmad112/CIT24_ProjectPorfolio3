const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;
const baseMovieURL_ById = process.env.REACT_APP_TMDB_API_IMAGE_BY_ID_LINK;

export function GetPersonBackdrop(id){ // This function does the exact same thing as the function in TitleService: GetTitleBackdrop(id)
    return fetch(baseMovieURL_ById + id + '?external_source=imdb_id&api_key=' + process.env.REACT_APP_TMDB_API_KEY)
    .then(res => res.json());
}

export async function GetPerson(id){
    return fetch(baseApiUrl + "persons/"+ id).then(res => res.json());
}