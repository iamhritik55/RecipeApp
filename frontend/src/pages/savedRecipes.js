import React, { useEffect, useState } from "react";
import { useGetUserID } from "../util/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
import { resolvePath ,Link} from "react-router-dom";

function RecipeContent({ content }) {
  const parsedContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const elements = doc.body.childNodes;

    return Array.from(elements).map((element, index) => {
      if (element.nodeType === Node.TEXT_NODE) {
        return <span key={index}>{element.textContent}</span>;
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        return React.createElement(
          element.tagName.toLowerCase(),
          { key: index, href: element.href },
          element.textContent
        );
      }
      return null;
    });
  };

  return <div>{parsedContent()}</div>;
}

export const SavedRecipes = () => {
  console.log("inside saved recipes")
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipe/`,
          { 
            headers: { authorization:"Bearer "+cookies.access_token },
          }
        );
        console.log(response.data);
        setSavedRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  function RecipeDeleteButton({ id }) {
    
    const handleDelete = () => {
       axios.delete(`http://localhost:5000/api/recipe/${id}`,{ 
        headers: { authorization:"Bearer "+cookies.access_token },
      })
        .then(response => {
          setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== response.data.id))
          console.log('Recipe deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting recipe:', error);
        });
    };
  
    return (
      <button onClick={handleDelete}>Delete</button>
    );
  }
  return (
    <div>
    <h1>Saved Recipes</h1>
    <ul>
      {savedRecipes.slice().reverse().map((recipe) => (
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} />
            <div className="button-group">
              <RecipeDeleteButton id={recipe.id} />
              <button>
                <Link to={`/more-details/${recipe.id}`}>More Details</Link>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};
