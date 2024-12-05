import { useEffect, useState } from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { GetTitlePoster } from '../Service/TitleService';

export default function TitleSearchCard ({title}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  

    useEffect(()=>{
        async function getBackdrop(){
            //console.log("titleid: " + title.titleId)
            const res = (await GetTitlePoster(title.titleId));
            if(res !== null) setBackdropUrl(res);
        } 
        getBackdrop();
    }, [title]);

    return (
        <Card style={{width: '48%', margin: '10px', height: '200px'}}>
            <div className="col-md-4 debug" style={{height: '100%', width: '100%'}}>
                <img className='personSearchCard' src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></img>
                <CardTitle>{title.primaryTitle}</CardTitle>
            </div>
        </Card>
   
    );
}