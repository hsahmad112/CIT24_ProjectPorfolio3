# To Do
## Frontend
- Removing Title/Person Bookmarks in Watchlist only removes the photo, not the rest of the Watchlist element. 
- SearchPreview: function LoadMore, somewhat poor usage of states - reconsider usage
- SearchResult: FetchData og AdvancedSearch, should be moved to helper functions 
- Login:  When Error message appears it extends the username and password forms 
- UserSetting – setToastInfo should be replaced with our Toaster componenet 
- Homepage – if no image¨found, it should correct “No image.jpg”  
- Advanced Search – Sport can only be chosen if initial state is changed. 
- DetailedTitles – Title sometimes overshadows rating. limit word length in frontend.
- AdvancedSearch UI is not informative enough, hard to understand what you are sorting after  

## Backend

## DB
- 

# Doing
## Frontend
- 
## Backend
- 
## DB
- 


# Done
## Frontend
- Fix in Homepage.js: Carousel element should pull backdrop photos from The movie data base. Use TitleId from our DB, and api guide (https://developer.themoviedb.org/reference/collection-images)
  
- SignUp done! :D
## Backend
- Create search for title and person ✅ 
Wrong status code(500) when searching for title by id with an id that doesn't exist
  Should return 404 NotFound ✅ 
- Perform checks on UserController.cs method Post(): Password has to be a certain length and not allowed to be empty space. Name is not allowed to be empty spaces. ✅ 
- changed TitleSearchResultDTO & TitleSearchResultTempTable - added field: StartYear, EndYear and OriginalTitle. Also added entities in context.

## DB


# Nice to have

- Use salted and encrypted passwords in DB.
- Create a function in the db and backend that can retrieve a distinct list of types that the frontend can use in Navigation>Dropdown.Menu
