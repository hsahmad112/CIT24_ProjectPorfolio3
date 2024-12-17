//Used when no other URL params is present (Ratings, bookmarks, etc.)
export function Pagination(page, pageSize){
    return "?page=" + page + "&pageSize=" + pageSize;
}


export function PaginationForSearch(page, pageSize){
    return "&page=" + page + "&pageSize=" + pageSize;
}