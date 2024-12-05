import { useEffect, useState } from 'react';
import { Card, CardTitle } from 'react-bootstrap';

export default function TitleSearchCard ({title}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  

    useEffect(()=>{
        async function getBackdrop(){
            //console.log("titleid: " + title.titleId)
            //const res = (await GetTitleBackdrop(title.titleId));
            //if(res?.profile_path) setBackdropUrl(res.profile_path);
        } 
        getBackdrop();
    }, [title]);

    return (
        <Card style={{width: '48%', margin: '10px', height: '200px'}}>
            <div className="col-md-4 debug" style={{height: '100%', width: '100%'}}>
                <img className='personSearchCard' src={title.posterUrl !== null ? title.posterUrl : "./no-image.jpg"} />
                <CardTitle>{title.primaryTitle}</CardTitle>
            </div>
        </Card>
   
    );
}