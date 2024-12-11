import Carousel from 'react-bootstrap/Carousel';

export default function SimpleTitle(title, navigate) {
  
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
    <Carousel.Item interval={5000} key={title.url} className='ClickableOnHover' onClick={()=> navigate("/title/" + title.id)}>
        <img src={title.posterUrl} text="First slide" width="300" height="420"/>
        <Carousel.Caption>
          <h5>{title.primaryTitle}</h5>
          {title.startYear && <p>Release year: {title.startYear}</p> }
          <p>Genres: {DisplayGenre(title.genresList)}</p>
        </Carousel.Caption>
    </Carousel.Item>   
  );

}