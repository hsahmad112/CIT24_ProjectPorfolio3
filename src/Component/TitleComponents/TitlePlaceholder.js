import { Card } from 'react-bootstrap';     
import Placeholder from 'react-bootstrap/Placeholder';

export default function TitlePlaceholder(){
    const spinningCircle = "https://upload.wikimedia.org/wikipedia/commons/3/37/YouTube_loading_symbol_2_%28stable%29.gif";
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={spinningCircle} />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    );
    
};