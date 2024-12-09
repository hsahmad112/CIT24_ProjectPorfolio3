export function displayYears(startYear, endYear){
    if(!startYear && !endYear) return "";

    if(!endYear){
      return "(" + startYear + ")";
    }
    return "(" + startYear + "-" + endYear + ")";
}

export function displayRatingCount(ratingCount){
  // console.log(ratingCount);
  if(!ratingCount) return "";
  if(ratingCount > 1000){
    return Math.round(ratingCount/1000) + "k";
  }
  return ratingCount;
}