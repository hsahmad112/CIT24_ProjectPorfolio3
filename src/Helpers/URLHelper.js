export function Pagination(page, pageSize){
    return "?page=" + page + "&pageSize=" + pageSize;
}

export function PaginationForSearch(page, pageSize){
    return "&page=" + page + "&pageSize=" + pageSize;
}