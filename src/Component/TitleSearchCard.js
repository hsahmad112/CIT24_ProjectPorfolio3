import { useEffect, useState } from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { GetTitlePoster } from '../Service/TitleService';
import { useNavigate } from "react-router"; 

export default function TitleSearchCard ({title}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  
    const navigate = useNavigate();

    // useEffect(()=>{
    //     async function getBackdrop(){
    //         const res = (await GetTitlePoster(title.titleId));
    //         if(res?.lenght > 0) setBackdropUrl(res);
    //     } 
    //     getBackdrop();
    // }, [title]);
    return (
        <Card className='pointer-on-hover'
            style={{width: '48%', margin: '5px', padding: '10px', height: '200px'}}
            onClick={()=> navigate("/title/" + title.titleId)}>
            <div className="col-md-4" style={{height: '100%', width: '100%'}}>
                {/* <img className='personSearchCard' src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl} /> */}
                <img className='personSearchCard' src={title.posterUrl !== "" ? title.posterUrl : "./no-image.jpg"} />
                <CardTitle className='card-text'>{title.primaryTitle}</CardTitle>
                {title.originalTitle !== title.primaryTitle &&
                   <CardTitle className='card-text less-opacity' style={{fontSize: "15px"}}>{title.originalTitle}</CardTitle>}  
            </div>
        </Card>
    );
}