import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;

export function GetAllTitles(){
    //return (await axios.get(baseApiUrl+ "titles/")).data.entities;
    
    let page = Math.floor(Math.random() * 100);
    let pageSize = Math.floor(Math.random() * 10 + 7);
    return fetch(baseApiUrl + "titles?page=" + page + "&pageSize=" + pageSize).then(res => res.json());
    // return (await axios.get(baseApiUrl + "titles?page=" + page + "&pageSize=" + pageSize)).data.entities;
}

export async function GetTitle(id){
    return fetch(baseApiUrl + "titles/"+ id).then(res => res.json());

    //return (await axios.post(baseApiUrl + id)).data;
}