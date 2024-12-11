import { Card, Button} from 'react-bootstrap';
import { useNavigate } from "react-router";

export default function TitleProfile(title){

    const navigate = useNavigate();
     
    return(
        <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/title/" + title.data.titleId)}>
            <Card.Body>
                <Card.Title> {title.data.titlePrimaryTitle} </Card.Title>
                <Card.Text> {title.data.annotation} </Card.Text>
                <Button variant="primary">Go to title</Button>
            </Card.Body>
        </Card>
    );
    
}