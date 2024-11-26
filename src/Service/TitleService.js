import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;

export async function GetAllTitles(){
    //return (await axios.get(baseApiUrl+ "titles/")).data.entities;
    let page = Math.floor(Math.random() * 100);
    let pageSize = Math.floor(Math.random() * 10 + 7);
    return (await axios.get(baseApiUrl+ "titles?page=" + page + "&pageSize=" + pageSize)).data.entities;
}