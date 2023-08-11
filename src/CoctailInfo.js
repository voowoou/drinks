import React from "react";
import { useState, useEffect } from 'react';

function CoctailImg({img}) {
    return (
        <img src={img} alt="A coctail thumbnail"></img>
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
        <div>
            <div>
                <span>NAME</span>
                <p>{drink.strDrink}</p>
            </div>
            <div>
                <span>INGRIDIENTS</span>
                <ul>{ingridientList}</ul>
            </div>
            <div>
                <span>GLASS</span>
                <p>{drink.strGlass}</p>
            </div>
            <div>
                <span>INSTRUCTIONS</span>
                <p>{drink.strInstructions}</p>
            </div>
        </div>
    );
}

export default function CoctailInfo({searchText}) {
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
        <div>
            {drink && (
                <>
                    <CoctailImg img={drink.strDrinkThumb} />
                    <Recipe drink = {drink}/>
                </>
            )}
        </div>
    );
}