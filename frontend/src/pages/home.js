import React, { useEffect, useState } from "react";
import { useGetUserID } from "../util/useGetUserID";
import { useCookies } from "react-cookie";
import axios from "axios";
import {MoreDetails} from "./moreDetails";
import { useNavigate , Link} from 'react-router-dom';

function SaveButton({ result }) {
  const [cookies, _] = useCookies(["access_token"]);
  const handleSave = () => {
    if(cookies.access_token!=""){
      axios.post(`http://localhost:5000/api/recipe/`,result,{ 
        headers: { authorization:"Bearer "+cookies.access_token },
      })
      .then(response => {
        // Handle successful save
        alert(result.name+" Recipe Saved")
        console.log('Result saved successfully!');
      })
      .catch(error => {
        // Handle error
        alert("Recipe is already saved");
        console.error('Error saving result:', error);
      });
    }
    else alert("You need to be logged in to save recipe")
  };
  
  return (
    <button onClick={handleSave}>Save</button>
  );
}

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const handleSelectionChange =async (e) => {
    console.log(e.target.value)
    setSelectedItem(e.target.value);
    e.preventDefault();
    if(e.target.value!=""){
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${e.target.value}&apiKey=bc1749a56ca24f19ab857ad313d10222`
      );
      const data = await response.json();
      const recipes = [];

      for (let i = 0; i < data.results.length; i++) {
        recipes.push({
          id: data.results[i].id,
          name: data.results[i].title,
          image: data.results[i].image
        });
      }
      // console.log("data.results ",data.results)
      setSearchResults(recipes);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }else setSearchResults([])
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if(searchQuery!=""){
    try {
      const response = await fetch(
        `https://api.spoonacular.com/food/search?query=${searchQuery}&apiKey=bc1749a56ca24f19ab857ad313d10222`
      );  
      const data = await response.json();
      setSearchResults(data.searchResults[0].results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }else setSearchResults([])
  };
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a keyword to search a recipe"
        />
        <button type="submit">Search</button>
        {/* <h1>Cuisine</h1> */}
        <select value={selectedItem} onChange={handleSelectionChange}>
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
        </select>
      </form>

      <h1>Search Results:</h1>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <div>{result.name}</div>
            <img src={result.image} alt={result.name} />
            <div className="button-group"><SaveButton result={result}/>
            <button> <Link to={`/more-details/${result.id}`}>More Details</Link> </button> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default Home;
