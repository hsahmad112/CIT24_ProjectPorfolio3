import { GetHeader } from "../Store/Store";
import { Pagination } from "../Helpers/URLHelper";

const baseApiUrl = process.env.REACT_APP_BASE_API_LINK;

// ** Title Bookmark Service: **

export async function IsTitleBookmarked(id, setIsBookmarked, headers) {
    try{
        const response = await fetch(baseApiUrl + "bookmarks/title/" + id, {headers});
        
        switch (response.status) {
            case 401:
                console.log("Unauthorized/ Not Logged in");
                return false;
            case 200:
                setIsBookmarked(true);
                return true;
            case 404:
                console.log("Current user does not have this title bookmarked");
                setIsBookmarked(false);
                return false;
        }
    
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }
}

export async function GetTitleBookmarks(queryParams){
    let headers = GetHeader();
    try {
        const response = await fetch(baseApiUrl + "bookmarks/title" + Pagination(queryParams.page, queryParams.pageSize), {headers});
        
        
        if (!response.ok) {
            throw new Error (response.status);
        }
        const data = await response.json();
        return {success: true, data};

    } catch (error) {
        console.error("Error fetching data:", error);
        return {success: false, message: error.message};
    }
    
}

export async function GetTitleBookmarksById(id, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/title/" + id, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } 
    catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function CreateTitleBookmarksById(titleId, annotation, setIsBookmarked, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/title", {
            method: "POST",
            headers: (headers),
            body: JSON.stringify({"titleId": titleId, "annotation" :annotation})
        });

        switch (response.status) {
            case 400:
                console.log("bad request");
                return false;
            case 401:
                console.log("Unauthorized/ Not Logged in. Implement a case here that stops the code here in this case");
                return false;
            case 200:
                setIsBookmarked(true);
                return true;
            default:
                console.log("unknown status code");
                return false; 
        }
        
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }
    
}

export async function UpdateTitleBookmark(titleId, headers, annotation){ //if it fails, check bodys non object value status
    try {
        const response = await fetch(baseApiUrl + "bookmarks/title/" + titleId, {method: "PUT",  body: JSON.stringify({"annotation" : annotation}), headers: (headers)});
        
        switch (response.status) {
            case 400:
                console.log("bad request");
                return false;
            case 401:
                console.log("Unauthorized/ Not Logged in.");
                return false;
            case 204:
                console.log("Updated bookmark on " + titleId + " with annotation for current user");
                return true;
            case 404:
                console.log("Current user does not have this title " +  titleId + " bookmarked");
                return false;
            default:
                console.log("unknown status code", response.status);
                return false; 
        }
        
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return false;
    }
    
}

export async function DeleteTitleBookmarksById(titleId, setIsBookmarked, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/title/" + titleId, {
            method: "DELETE",
            headers: (headers)
        });

        switch (response.status) {
            case 401:
                console.log("Unauthorized/ Not Logged in");
                return false;
            case 204:
                setIsBookmarked(false);
                return true;
            case 404: //should this case even be possible?
                console.log("Current user does not have this title " + titleId + " bookmarked");
                return false;
        }
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }   
}

// ** Person Bookmark Service: **

export async function IsPersonBookmarked(id, setIsBookmarked, headers) {
    try{
        const response = await fetch(baseApiUrl + "bookmarks/person/" + id, {headers});
        
        switch (response.status) {
            case 401:
                console.log("Unauthorized/ Not Logged in");
                return false;
            case 200:
                setIsBookmarked(true);
                return true;
            case 404:
                console.log("Current user does not have this title bookmarked");
                setIsBookmarked(false);
                return false;
        }
    
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }
}

export async function GetPersonBookmarks(queryParams){
    let headers = GetHeader();
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person" + Pagination(queryParams.page, queryParams.pageSize), {headers});

        if(!response.ok){
            throw new Error (response.status);
        }
        const data = await response.json();
        
        return {success: true, data};
    }
    catch(error){   
        return {success: false, message: error.message};
    }     
    
}

export async function GetPersonBookmarksById(id, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/" + id, {headers});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

export async function CreatePersonBookmarksById(personId, annotation, setIsBookmarked, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person", {
            method: "POST",
            headers: (headers),
            body: JSON.stringify({"personId": personId, "annotation" :annotation})
        });
    
        switch (response.status) {
            case 400:
                console.log("bad request");
                return false;
            case 401:
                console.log("Unauthorized/ Not Logged in. Implement a case here that stops the code here in this case");
                return false;
            case 200:
                setIsBookmarked(true);
                return true;
            default:
                console.log("unknown status code");
                return false; 
        }
        
    }
    catch (error) {
        console.error("Error fetching data:");
        return false;
    }
    
}

export async function UpdatePersonBookmark(personId, headers, annotation){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/" + personId, {
            method: "PUT",
            headers: (headers),
            body: JSON.stringify({"personId": personId, "annotation" :annotation})
        });
           
        switch (response.status) {
            case 400:
                console.log("bad request");
                return false;
            case 401:
                console.log("Unauthorized/ Not Logged in.");
                return false;
            case 204:
                console.log("Updated bookmark on " + personId + " with annotation for current user");
                return true;
            case 404: //should this case even be possible?
                console.log("Current user does not have this person " +  personId + " bookmarked");
                return false;
            default:
                console.log("unknown status code", response.status);
                return false; 
        }
        
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return false;
    }
    
}

export async function DeletePersonBookmarksById(personId, setIsBookmarked, headers){
    try {
        const response = await fetch(baseApiUrl + "bookmarks/person/" + personId, {
            method: "DELETE",
            headers: (headers)
        });

        switch (response.status) {
            case 401:
                console.log("Unauthorized/ Not Logged in");
                return false;
            case 204:
                setIsBookmarked(false);
                return true;
            case 404: //should this case even be possible?
                console.log("Current user does not have this person " + personId + " bookmarked");
                return false;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

