import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {FetchData, AdvancedSearch}  from '../Pages/IMDB/SearchResult';
import {useUser} from "../Store/Store";
import {Button, Form, InputGroup, Dropdown, Col, Row} from 'react-bootstrap';
import {GetGenres} from '../Service/GenreService';

export default function SearchField(){

    const {searchType, setSearchType } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("Everything");
    const [placeholderText, setPlaceholderText] = useState("Search for Everything");
    const [chosenGenre, setChosenGenre] = useState(undefined);
    const [chosenStartYear, setChosenStartYear] = useState(undefined);
    const [chosenEndYear, setChosenEndYear] = useState(undefined);
    const [chosenRating, setChosenRating] = useState(undefined);
    const [genres, setGenres] = useState([]);

    let navigate = useNavigate();

    function handleQuery(e){
        setSearchQuery(e.target.value);
      }
    
    useEffect(()=>{
    const fetchData = async () => {
        try {
        setGenres(await GetGenres());
        } catch (error) {
        console.error('Error fetching data in Navigation:', error);
        }
    };

    fetchData();
    },[])
    
    function handleType(e){
        const newSelectedCategory = e.target.getAttribute('name');
        const newSelectedType = e.target.getAttribute('str');
        setSearchType(newSelectedType);
        setSearchCategory(newSelectedCategory);
        setPlaceholderText("Search for " + newSelectedCategory); 
    }

    async function handleSubmit(e){
        e.preventDefault();
        const body = 
        { id: null, 
            searchTerm: searchQuery, 
            page: '0', 
            pageSize: searchType === 'everything' ? '5' : '10',
            genreId: chosenGenre,
            startYear: chosenStartYear,
            endYear: chosenEndYear,
            rating: chosenRating
        };
    
        try {

            let result;
            if(chosenGenre !== undefined || chosenRating !== undefined || chosenStartYear !== undefined || chosenEndYear !== undefined){
            result = await AdvancedSearch(body);
            }
            else{
            result = await FetchData(searchType, body);
            navigate('/search', {
                state: {result, searchType, body },
            });
            }
            setChosenGenre(undefined);
            setChosenStartYear(undefined);
            setChosenEndYear(undefined);
            setChosenRating(undefined);
            
            //when we navigate to search, we "bring along" the current result (search result list).
            // inspiration -> https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
            //unsure if best option as url below informs to use redirect in actions and loaders instead but works.
            //https://api.reactrouter.com/v7/functions/react_router.useNavigate.html
            navigate('/search', {
            state: {result, searchType, body },
            });

        } catch (error) {
            console.error("Error in fetching of data, in Navigation.js", error);
        }
    }

    return (
        <Form inline="true" onSubmit={handleSubmit}>
        <Row>
          <Col md="auto"> 
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: (chosenGenre === undefined && chosenRating === undefined && chosenStartYear === undefined && chosenEndYear === undefined) ? "": "black"}} className='advanced-dropdown' variant="success">
                  <div style={{ color: "white" }}>Advanced Search</div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <label for="genres">Genres</label>
                  <select name="genres" onChange={(e) => setChosenGenre(e.target.value)}>
                    {genres?.map((item, index) =>
                      <option value={index + 1} key={item.name}>{item.name}</option>
                    )}
                  </select> 
                  <label for="rating">Rating</label>
                  <input onChange={(e) => setChosenRating(e.target.value)} type='number' placeholder='rating'></input>
                  <input onChange={(e) => setChosenStartYear(e.target.value)} type='number' placeholder='startYear'></input>
                  <input onChange={(e) => setChosenEndYear(e.target.value)} type='number' placeholder='endYear'></input>
                </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <InputGroup>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                {searchCategory}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick = {handleType} str="everything" name= "Everything" >Everything</Dropdown.Item>
                  <Dropdown.Item onClick = {handleType} str="titles" name= "Titles" >Title</Dropdown.Item>
                  <Dropdown.Item onClick = {handleType} str="persons" name="Persons">Person</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                placeholder={placeholderText}
                aria-label="Search Term"
                aria-describedby="nav-bar-search"     
                onChange= {handleQuery}
              />
              <Button type='submit'><i className="bi bi-search"></i></Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    );

}