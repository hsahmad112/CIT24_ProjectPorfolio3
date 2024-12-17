import { Card, Button} from 'react-bootstrap';
import { useNavigate } from "react-router";

export default function PersonProfile(person){
    const navigate = useNavigate();

    return( //Person component rendered on Users' Profile page
        <Card style={{ width: '16rem', margin: '10px', padding: '0px'}}  onClick={()=> navigate("/person/" + person.data.personId)}>
            <Card.Body>
                <Card.Title> {person.data.personName} </Card.Title>
                <Card.Text> {person.data.annotation} </Card.Text>
                <Button variant="primary">Go to person</Button>
            </Card.Body>
        </Card>
    );
}