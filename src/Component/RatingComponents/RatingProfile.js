import {Button, Row, Col, Card, CardTitle} from 'react-bootstrap'

export default function RatingProfile({title, navigate}){
    
   // const navigate = useNavigate();

    return (

        
         
          <Card className='pointer-on-hover' bg="transparent" style={{height: "500px"}}
              onClick={() => navigate("../title/"  + title.titleId)}>
              <div className="col-xs-1" style={{width: '100%', height: '100%'}}>
                  <img className='titleRatingCard' src={title.posterUrl !== "" ? title.posterUrl : "./no-image.jpg"} />
                  <CardTitle className='card-text'>{title.primaryTitle}</CardTitle>
                  <Card.Text> {`Rating: ${title.rating}` || "Rating not loaded"} </Card.Text>
              </div>
          </Card>
            
        
    );
}