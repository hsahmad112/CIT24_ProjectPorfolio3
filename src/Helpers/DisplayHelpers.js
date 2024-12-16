export function DisplayYears(startYear, endYear){
    if(!startYear && !endYear) return "";

    if(!endYear){
      return "(" + startYear + ")";
    }
    return "(" + startYear + "-" + endYear + ")";
}

export function DisplayRatingCount(ratingCount){
  // console.log(ratingCount);
  if(!ratingCount) return "";
  if(ratingCount > 1000){
    return Math.round(ratingCount/1000) + "k";
  }
  return ratingCount;
}