import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';

export default function SimpleTitle({title, navigate}) {
  
  function DisplayGenre(genres){
    let genresString = "";
    let total = genres.length;

    for (let index = 0; index < genres.length; index++) {

      if(total === 1){
        genresString += genres[index];
        break;
      }
      if(index === total - 1){
        genresString += " and " + genres[index];
        break;
      }
      genresString += genres[index] + ", ";
    }

    return genresString;
  }

  return(
    <Card
      style={{ 
        width: '16rem', 
        margin: '10px', 
        padding: '0px',
        // backgroundColor: key === 2 ? "black" : "white",
        // color: key === 2 ? "white" : "black"
      }}
      onClick={()=> navigate("/title/" + title.id)}>
        <Card.Img 
          width="300"
          height="220" 
          variant="top" 
          src={ title?.posterUrl !== null ?  title.posterUrl : "./no-image.jpg"}/>
  
        <Card.Footer>
        {title.startYear && <>Release year: {title.startYear}</> }
        <p>Genres: {DisplayGenre(title.genresList)}</p>
        </Card.Footer>
      </Card>
  );

}
