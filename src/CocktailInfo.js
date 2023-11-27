// CocktailInfo.js
import React, { useState, useEffect } from "react";
import styles from "./CocktailInfo.module.css";
import dice from "./dice.png";

function RandomCoctail() {
  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  
  useEffect(() => {
    const fetchRandom = async () => {
      if (isClicked === true) {
        try {
          const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
          if (response.ok) {
            const jsonResponse = await response.json();
            const newDrink = jsonResponse.drinks ? jsonResponse.drinks[0] : null;
    
            if (newDrink) {
              setDrink(newDrink);
              setNotFound(false);
            } else {
              if (searchPerformed) {
                setNotFound(true);
              }
            }
          } else {
            throw new Error('Request failed!');
          }
        } catch (error) {
          if (searchPerformed) {
            console.error('An error occurred during the request. Please try again.');
          }
        }
      }
    }

    fetchRandom();    
  }, [isClicked])

  return(
    <div>
      <button onClick={handleClick}>
        <img 
          src={dice} 
          alt="Dice for random coctail"
        / >
      </button>
      <CocktailImg />
    </div>
  );
}

function CocktailImg({ img }) {
  return (
    <div className={styles.cocktailImg}>
      <img src={img} alt="A cocktail thumbnail" />
    </div>
  );
}

function Recipe({ drink }) {
  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 15; i++) {
    const ingrName = `strIngredient${i}`;
    const ingrMeasure = `strMeasure${i}`;
    if (drink[ingrName] && drink[ingrMeasure]) {
      ingredients.push(drink[ingrName]);
      measures.push(drink[ingrMeasure]);
    }
  }

  const ingredientList = ingredients.map((ingredient, index) => (
    <li key={index}>
      {measures[index] + ' ' + ingredient}
    </li>
  ));

  return (
    <div className={styles.cocktailRecipe}>
      <div className={styles.cocktailName}>
        <h2>{drink.strDrink}</h2>
      </div>
      <div className={styles.cocktailIngredients}>
        <h3>INGREDIENTS</h3>
        <ul>{ingredientList}</ul>
      </div>
      <div className={styles.cocktailGlass}>
        <h3>GLASS</h3>
        <p>{drink.strGlass}</p>
      </div>
      <div className={styles.cocktailInstructions}>
        <h3>INSTRUCTIONS</h3>
        <p>{drink.strInstructions}</p>
      </div>
    </div>
  );
}

export default function CocktailInfo({ searchText }) {
    const [drink, setDrink] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          let apiUrl;
  
          if (searchText === 'random') {
            apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
          } else if (searchText.trim() !== "") {
            apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
          }
  
          if (apiUrl) {
            const response = await fetch(apiUrl);
            if (response.ok) {
              const jsonResponse = await response.json();
              const newDrink = jsonResponse.drinks ? jsonResponse.drinks[0] : null;
  
              if (newDrink) {
                setDrink(newDrink);
                setNotFound(false);
              } else {
                if (searchPerformed) {
                  setNotFound(true);
                }
              }
            } else {
              throw new Error('Request failed!');
            }
          }
        } catch (error) {
          if (searchPerformed) {
            console.error('An error occurred during the request. Please try again.');
          }
        }
      };

      if (searchPerformed) {
        fetchData();
      } else {
        setSearchPerformed(true);
      }
    }, [searchText, searchPerformed]);
  
    return (
      <div>
        <div className={styles.cocktailInfo}>
          {notFound ? (
              <p className={styles.p}>
                  No such drink in the database, or the input name is incorrect.
                  Please try again with another request.
              </p>
          ) : (
            <>
              {drink && (
                <>
                  <CocktailImg img={drink.strDrinkThumb} />
                  <Recipe drink={drink} />
                </>
              )}
            </>
          )}
        </div>
        <RandomCoctail isClicked={isClicked} setIsClicked={setIsClicked} />
      </div>
    );
  }
  