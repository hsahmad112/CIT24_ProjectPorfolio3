import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function Rating({...props}){

    const {titleId, primaryTitle, posterUrl, rating} = props;

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate("/title/" + titleId);
    }

    return( //Component used to display users' rated titles, in Rating page
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" onClick = {posterUrl ? onClickHandler : undefined} src={posterUrl || "./no-image.jpg"} alt={primaryTitle}/> 
            <Card.Body>
                <Card.Title style = {primaryTitle ? {cursor: 'pointer'}: {color: 'red'}} onClick ={primaryTitle ? onClickHandler : undefined}>{primaryTitle || "Loading..."}</Card.Title> {/* Like with the img, Title of movie is only clickable when loaded */}
                <Card.Text> {`Rating: ${rating}` || "Rating not loaded"} </Card.Text>
            </Card.Body>
        </Card>   
    );
}