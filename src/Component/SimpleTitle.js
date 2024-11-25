import Carousel from 'react-bootstrap/Carousel';

export default function SimpleTitle({titleData}) {

    const total = titleData.genresList.map().count;

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
          {titleData.genresList && <p>Genre: {titleData.genresList.map((genre, index) => { return (total === index ? genre : genre + ", ")})}</p> }
          
        </Carousel.Caption>
      </Carousel.Item>      
    );
}