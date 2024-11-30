import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { GetTitle } from '../Service/TitleService';

export default function Rating({...props}){
    let userId = props.userId;
    let titleId = props.titleId;
    let rating = props.rating;    
    //Later point, could get the createdAt and UpdateAt from prop?..
let titleNow;
   // let titleGetter = (GetTitle(titleId));
    const titleGrabber = async (titleId) => {
        titleNow = await (GetTitle(titleId));
    }

console.log(titleGrabber);
    return(
    <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" />
                <Card.Body>
                <Card.Title> {titleGrabber({titleId})} </Card.Title>
                <Card.Text> {} </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        );
}