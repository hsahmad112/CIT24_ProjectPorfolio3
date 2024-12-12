import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';

export default function SimpleTitle({title, navigate, keyID}) {
  
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
    border={keyID === 2 ? '2px solid yellow' : null}
    style={{
      height: '400px',
      width: '18rem', // Consistent width
      margin: '10px',
      padding: '0px',
      backgroundColor: keyID === 2 ? "#d8c303" : "white",
      color: keyID === 2 ? "white" : "black",
    }}
  >
    <Card.Img
      variant="top"
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover', // Ensures image covers and crops
        border: keyID === 2 ? '4px solid yellow' : '4px solid transparent'
      }}
      src={title?.posterUrl ? title.posterUrl : "./no-image.jpg"}
      onClick={() => navigate("/title/" + title.id)}
    />

    <Card.Footer style={{ fontSize: "10px", height: '100%' }}>
      {title.startYear && (
        <p style={{ fontSize: "12px" }}>Release year: {title.startYear}</p>
      )}
      <p style={{ fontSize: "12px" }}>Genres: {DisplayGenre(title.genresList)}</p>
    </Card.Footer>
  </Card>
  );

}
