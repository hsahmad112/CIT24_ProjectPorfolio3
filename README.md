# To Do
## Frontend
- Complete routing in App.cs by adding components: Login, Signup, Settings, Profile, WatchList, Ratings.
- Add components unrelated to routing: AdvancedSearch, Rate, Bookmark
- Fix in Homepage.js: Carousel element needs a separate element (textbox?) with slightly darker but transparent background so text can appear readable.
- signup bug - can login when signup with email that exists!
- watchlist bug - gets all details from tmdb - only should get image
- Cookie bug - check for 401 unauthorized response for ANY request. then set cookies to expire in the past
- clear cache when logging out

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

## DB


# Nice to have

- Use salted and encrypted passwords in DB.
- Create a function in the db and backend that can retrieve a distinct list of types that the frontend can use in Navigation>Dropdown.Menu
