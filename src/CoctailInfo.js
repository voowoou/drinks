import React from "react";
import { useState, useEffect } from 'react';

function CoctailImg({img}) {
    return (
        <img src={img} alt="A coctail thumbnail"></img>
    );
}

function Recipe() {
    return (
        <div>
            <div>
                <span>INGRIDIENTS</span>
            </div>
            <div>
                <span>GLASS</span>
            </div>
            <div>
                <span>INSTRUCTIONS</span>
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
                    <Recipe />
                </>
            )}
        </div>
    );
}