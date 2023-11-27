import React, { useState, useEffect } from "react";
import styles from "./CocktailInfo.module.css";

function CocktailImg({img}) {
    return (
        <div className={styles.cocktailImg}>
        <img src={img} alt="A cocktail thumbnail" />
        </div>
    );
};

function Recipe({drink}) {
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
};

function RandomCocktailImg({randomImg}) {
  return (
      <div className={styles.cocktailImg}>
      <img src={randomImg} alt="A random cocktail thumbnail" />
      </div>
  );
};

function RandomRecipe({randomDrink}) {
  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 15; i++) {
      const ingrName = `strIngredient${i}`;
      const ingrMeasure = `strMeasure${i}`;
      if (randomDrink[ingrName] && randomDrink[ingrMeasure]) {
      ingredients.push(randomDrink[ingrName]);
      measures.push(randomDrink[ingrMeasure]);
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
          <h2>{randomDrink.strDrink}</h2>
      </div>
      <div className={styles.cocktailIngredients}>
          <h3>INGREDIENTS</h3>
          <ul>{ingredientList}</ul>
      </div>
      <div className={styles.cocktailGlass}>
          <h3>GLASS</h3>
          <p>{randomDrink.strGlass}</p>
      </div>
      <div className={styles.cocktailInstructions}>
          <h3>INSTRUCTIONS</h3>
          <p>{randomDrink.strInstructions}</p>
      </div>
      </div>
  );
};

export default function CocktailInfo({searchText}) {
    const [drink, setDrink] = useState(null);
    const [randomDrink, setRandomDrink] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Поиск коктейля
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

    // Случайный коктейль
    //useEffect(() => {
    

    //fetchRandom();    
    //}, [isClicked]);

    const fetchRandom = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        if (response.ok) {
          const jsonResponse = await response.json();
          const newDrink = jsonResponse.drinks ? jsonResponse.drinks[0] : null;
          setRandomDrink(newDrink);
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
          console.log(error);
      }
    }

    const handleClick = () => {
        fetchRandom();
        setIsClicked(!isClicked);
    };

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
        
        <div>
            <button className={styles.button} onClick={handleClick}>
              GET A RANDOM ONE
            </button>
            <div className={styles.cocktailInfo}>
              {randomDrink && (
                <>
                  <RandomCocktailImg randomImg={randomDrink.strDrinkThumb} />
                  <RandomRecipe randomDrink={randomDrink} />
                </>
              )}
            </div>
        </div>
      </div>
    );
};