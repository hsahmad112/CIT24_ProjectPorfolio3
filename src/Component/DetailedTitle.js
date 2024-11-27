import { useParams } from "react-router";


export default function DetailedTitle({id}) {

  const title = useParams(id); //?!


  
  // function DisplayGenre(genres){
  //   let genresString = "";
  //   let total = genres.length;
  //     for (let index = 0; index < genres.length; index++) {
  
  //       if(total === 1){
  //         genresString += genres[index];
  //         break;
  //       }
  //       if(index === total - 1){
  //         genresString += " and " + genres[index];
  //         break;
  //       }
  //       genresString += genres[index] + ", ";
  //     }

  //     return genresString;
  // }

    return(
      <div>
        im a detailed title
      </div>


        // placeholder 
      // <div key={title.url} className="ClickableOnHover">
      //   <div>
      //     <p>{title.primaryTitle} ({title.startYear && <>{title.startYear}</>})</p>
      //   </div>
      //   <img src={title.posterUrl} text="First slide" width="150" height="210"/>
      //   <div>
      //     <p>{DisplayGenre(title.genresList)}</p>
      //   </div>
      // </div> 
    );
}
