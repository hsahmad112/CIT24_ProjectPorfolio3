import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;


export async function GetAllTitles(){
    return (await axios.get(baseApiUrl+ "titles/")).data.entities;
    
}