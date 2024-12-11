import { Card } from 'react-bootstrap';     
import Placeholder from 'react-bootstrap/Placeholder';

export default function TitlePlaceholder(){
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/3/37/YouTube_loading_symbol_2_%28stable%29.gif" />
            <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
        );
    
};