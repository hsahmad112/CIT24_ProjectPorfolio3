import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export default function TitleSearchCard ({title}){
    // const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    // const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  

    // useEffect(()=>{
    //     async function getBackdrop(){
    //         //console.log("titleid: " + title.titleId)
    //         const res = (await GetTitleBackdrop(title.titleId));
    //         if(res?.profile_path) setBackdropUrl(res.profile_path);
    //     } 
    //     getBackdrop();
    // }, [title]);

    return (

        <Card style={{width: '100%', padding: '10px', height: '150px', margin: "10px"}}>
            <Card.Img
                src={title.url.posterUrl !== null ? title.url.posterUrl : "./no-image.jpg"} />{title.url}
        </Card>
   
    );
}