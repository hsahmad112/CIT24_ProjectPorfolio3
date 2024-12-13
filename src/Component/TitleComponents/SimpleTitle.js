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
      className='carousel-card'
      border={keyID === 2 ? '2px solid yellow' : null}
      style={{
        height: keyID === 2 ? '400px' : "350px",
        width:  keyID === 2 ?'20rem' : '18rem', // Consistent width
        margin: '10px',
        padding: '0px',
        border: keyID === 2 ? '4px solid #d8c303' : '4px solid transparent',
        backgroundColor: keyID === 2 ? "#d8c303" : "white",
        color: keyID === 2 ? "white" : "black" }}>
      <Card.Img
        variant="top"
        className='arosel-img'
        style={{
          width: '100%',
          objectFit: 'cover', // Ensures image covers and crops
        }}
        src={title?.posterUrl ? title.posterUrl : "./no-image.jpg"}
        onClick={() => navigate("/title/" + title.id)} />

      <Card.Footer style={{ fontSize: "10px", height: '100%' }}>
        { title.startYear && (<p style={{ fontSize: "12px" }}>Release year: {title.startYear}</p>) }
        <p style={{ fontSize: "12px" }}>Genres: {DisplayGenre(title.genresList)}</p>
      </Card.Footer>
    </Card>
  );

}
