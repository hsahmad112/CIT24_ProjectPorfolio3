import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetTitle } from "../Service/TitleService";

export default function DetailedTitle({id}) {

  const [detailedTitle, setDetailedTitle] = useState(null);
  const title = useParams(id); //?!
  console.log(title.id);
  useEffect(()=>{

    const fetchData = async () => {
      try {
        setDetailedTitle(await GetTitle(title.id))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // fetch title by title id
  }, [id])

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
  if(detailedTitle){

    console.log(detailedTitle)

    return(
      <div>
        {detailedTitle.id}
        im a detailed title
        <img src={detailedTitle.posterUrl}></img>
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
}
