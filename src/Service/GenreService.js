const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;

export async function GetGenres() {
    const response = await fetch(baseApiUrl + "genres");
    return response.json();
}
