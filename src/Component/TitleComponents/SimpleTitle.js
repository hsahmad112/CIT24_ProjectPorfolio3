import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Card, Placeholder } from 'react-bootstrap';
import { useUser } from "../../Store/store";

export default function SimpleTitle(title, navigate) {
  
  const { user, login, logout } = useUser();

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

  // function GoToDetailedTitlePage(){
  //   // should be a page, and use routing as we will learn
  //   console.log("go to url: " + title.url);
  //   navigate("/title/" + title.id)
  // }
  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //           IMDB rating: {title.averageRating}
  //   </Tooltip>
  // );

    return(
      <Carousel.Item interval={5000} key={title.url} className='ClickableOnHover' onClick={()=> navigate("/title/" + title.id)}>
          <img src={title.posterUrl} text="First slide" width="300" height="420"/>
          <Carousel.Caption>
          <h5>{title.primaryTitle}</h5>
          {title.startYear && <p>Release year: {title.startYear}</p> }
          <p>Genres: {DisplayGenre(title.genresList)}</p>
          {user}
          </Carousel.Caption>
        </Carousel.Item>   
    );
}

// export default function SimpleTitle({title}) {

//   function DisplayGenre(genres){
//     let genresString = "";
//     let total = genres.length;
//       for (let index = 0; index < genres.length; index++) {
  
//         if(total === 1){
//           genresString += genres[index];
//           break;
//         }
//         if(index === total - 1){
//           genresString += " and " + genres[index];
//           break;
//         }
//         genresString += genres[index] + ", ";
//       }

//       return genresString;
//   }

//   function GoToDetailedTitlePage(){
//     // should be a page, and use routing as we will learn
//     console.log("go to url: " + title.url);
//   }
//   const renderTooltip = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//             IMDB rating: {title.averageRating}
//     </Tooltip>
//   );

//   // the placeholder doesn't really work, it's just a stand in if no image
//   // is found, which isn't what you would want for the scenario

//   // the col is sometimes bigger than expected, making the onclick and onhover
//   // be messed up 

//   // it should be cards and not columns...

//   // maybe make tooltip on hover

//     return(
//       // <Col key={title.url} className="ClickableOnHover" onClick={() => GoToDetailedTitlePage()} >
//       //   <div className="finite-box">
//       //     <p>{title.primaryTitle} ({title.startYear && <>{title.startYear}</>})</p>
//       //   </div>
//       //   {!title.posterUrl && 
//       //        <Placeholder as="p" animation="glow">
//       //         <Placeholder style={{ width: "100%" }} />
//       //      </Placeholder>
//       //      }
//       //   <img src={title.posterUrl} loading="lazy" width="150" height="210"
//       //   alt={title.primaryTitle}
//       //   />
//       //   <div className="finite-box" >
//       //     <p>{DisplayGenre(title.genresList)}</p>
//       //   </div>
//       // </Col> 

//       <>
  
//   <OverlayTrigger
//       placement="top"
//       overlay={renderTooltip}
//     >
//     <Card bg="transparent" className="" onClick={() => GoToDetailedTitlePage()}>
//         <Card.Title>
//           <div className="finite-box" >
//             <p>{title.primaryTitle} ({title.startYear && <>{title.startYear}</>})</p>
//           </div>
//         </Card.Title>
//       <Card.Img variant="bottom" className="card-img" src={title.posterUrl} alt={title.primaryTitle} />
//       <Card.Body>
//         <Card.Text className="finite-box">
//           {DisplayGenre(title.genresList)}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//     </OverlayTrigger>
//       </>
//     );
// }
