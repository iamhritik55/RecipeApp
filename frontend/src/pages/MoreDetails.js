import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

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
  
export function MoreDetails() {
  const {id}=useParams(); 
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=4b0d0ffa57214d48bb73501e8b6aaadb`
        );
        setRecipeData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>{recipeData.title}</h1>
      <img src={recipeData.image} alt={recipeData.title} />
      <h2>Summary</h2>
      <p><RecipeContent content={recipeData.summary} /></p>
      <h2>Ingredients:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {recipeData.extendedIngredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount}</td>
              <td>{ingredient.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Instructions:</h2>
      <ol>
        {recipeData.analyzedInstructions.map((instruction, index) => (
          <li key={index}>
            <h3>Instruction {index + 1}</h3>
            <ol>
              {instruction.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step.step}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <h2>Nutrition:</h2>
      <table className="table.nutrition">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {recipeData.nutrition.nutrients.map((nutrient) => (
            <tr key={nutrient.name}>
              <td>{nutrient.name}</td>
              <td>{nutrient.amount}</td>
              <td>{nutrient.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
