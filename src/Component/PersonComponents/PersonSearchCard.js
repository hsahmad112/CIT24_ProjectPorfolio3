import { useEffect, useState } from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { GetPersonBackdrop } from '../../Service/PersonService';
import { useNavigate } from "react-router"; 
import { displayYears } from '../../Helpers/HelperFunctions';

export default function PersonSearchCard ({person}){
    const [backdropUrl, setBackdropUrl] = useState("./no-image.jpg");
    const imageUrl = process.env.REACT_APP_TMDB_API_IMAGE_LINK;  
    const navigate = useNavigate();

    useEffect(()=>{
        async function getBackdrop(){
           // console.log("personid: " + person.personId)
            const res = (await GetPersonBackdrop(person.personId));
            if(res?.profile_path) {
                setBackdropUrl(res.profile_path);
                console.log(imageUrl + backdropUrl);
            }
        } 
        getBackdrop();
    }, [person]);

    return (
    <div>
        <Card className='pointer-on-hover' style={{ width: '100%', padding: '10px', margin: "2px", height: '200px'}}
            onClick={() => navigate("../person/"  + person.personId)}>
            <div className="col-md-4" style={{width: '100%', height: '100%'}}>
                <img className='personSearchCard' src={backdropUrl === "./no-image.jpg" ? backdropUrl : imageUrl + backdropUrl}></img>
                <CardTitle className='card-text'>{person.primaryName} {displayYears(person.birthYear, person?.deathYear)}</CardTitle>
            </div>
        </Card>
    </div>  
    );
}