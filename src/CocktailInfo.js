import React, { useState, useEffect } from "react";
import styles from "./CocktailInfo.module.css"

function CocktailImg({img}) {
    return (
        <img 
            src={img} 
            alt="A coctail thumbnail"
            className={styles.cocktailImg}
        >
        </img>
    );
}

function Recipe({drink}) {
    // Создаются пустые массивы, в которых будут храниться ингридиенты и их кол-во
    const ingredients = [];
    const measures = [];

    // Цикл, в котором у объекта drink каждое свойство strIngridient и strMeasure проверяется на true
    // Если true, то ингридиент и его количество заносятся в массивы выше
    for (let i=1; i<=15; i++) {
        const ingrName = `strIngredient${i}`;
        const ingrMeasure = `strMeasure${i}`;
        if (drink[ingrName] && drink[ingrMeasure]) {
            ingredients.push(drink[ingrName]);
            measures.push(drink[ingrMeasure]);
        }
    }
    
    // Рендеринг списка
    const ingridientList = ingredients.map(ingridient =>
        <li key={ingredients.indexOf(ingridient)}>
            {measures[ingredients.indexOf(ingridient)] + ' ' + ingridient}
        </li>
    )

    return (
        <div className={styles.cocktailRecipe}>
            <div className={styles.cocktailName}>
                <h2>{drink.strDrink}</h2>
            </div>
            <div className={styles.cocktailIngridients}>
                <h3>INGRIDIENTS</h3>
                <ul>{ingridientList}</ul>
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

export default function CocktailInfo({searchText}) {
    // Объявление стейта с данными о напитке
    const [drink, setDrink] = useState(null);

    // Хук useEffect для обработки асинхронной операции внутри функционального компонента
    useEffect(() => {
        // async...await функция с fetch-запросом к Api
        const fetchData = async () => {
            if (searchText !== false) {
                try {
                    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchText);
                    if (response.ok) {
                        // Передаём полученные данные в переменную. При этом метод .json() автоматически парсит JSON-объект
                        const jsonResponse = await response.json();
                        // Обновляем стейт на новые полученные данные
                        // При этом выбираем ключ "drinks" (.drinks) с массивом в качестве значения
                        // Выбираем первый элемент массива, т.е. первый напиток по запросу
                        setDrink(jsonResponse.drinks[0]);
                    } else {
                        // Если response.ok !== true, то выбрасывается ошибка
                        throw new Error('Request failed!');
                    }
                } catch (error) { 
                    // Тут также происходит обработка ошибок 
                    window.alert('There is no such drink in the database, or the input name is incorrect. Please try again with another request.');
                }
            }
        };

        fetchData();
    }, [searchText]);

    return (
        <div className={styles.cocktailInfo}>
            {drink && (
                <>
                    <CocktailImg img={drink.strDrinkThumb} />
                    <Recipe drink = {drink}/>
                </>
            )}
        </div>
    );
}