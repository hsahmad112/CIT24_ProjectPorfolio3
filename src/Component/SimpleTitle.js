import Carousel from 'react-bootstrap/Carousel';

export default function SimpleTitle({titleData}) {


    return(
   
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={titleData.posterUrl}
          //alt="First slide"
        />
        <Carousel.Caption>
          <h5>{titleData.primaryTitle}</h5>
          {titleData.startYear && <p>Release year: {titleData.startYear}</p> }
          {titleData.genresList && <p>Genre: {titleData.genresList.map((genre, index) => { titleData.genresList.lenght === index ? genre : genre + ", "})}</p> }
          
        </Carousel.Caption>
      </Carousel.Item>
      
    );
}