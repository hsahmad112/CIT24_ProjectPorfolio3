export function DisplayYears(startYear, endYear){
    if(!startYear && !endYear) return "";

    if(!endYear){
      return "(" + startYear + ")";
    }
    return "(" + startYear + "-" + endYear + ")";
}

export function DisplayRatingCount(ratingCount){
  if(!ratingCount) return "";
  if(ratingCount > 1000){
    return Math.round(ratingCount/1000) + "k"; //abbriviates 1000s to "k" for readability 
  }
  return ratingCount;
}