import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function Form({ onSubmit }) {
    const [searchText, setSearchText] = useState(""); // Состояние для хранения текста

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(searchText); // Вызываем переданный колбэк и передаем текст
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value); // Обновляем состояние текста при вводе
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                type="text" 
                name="search-field" 
                placeholder="margarita"
                value={searchText} // Привязываем значение инпута к состоянию
                onChange={handleInputChange} // Обработчик изменения текста
                className={styles.field}
            />
            <input 
                type="submit" 
                name="search-button" 
                value="SEARCH"
                className={styles.submit}
            />
        </form>
    );    
}

export default function SearchBar({onSearch}) {
    const handleFormSubmit = (searchText) => {
        // Здесь можно обработать переданный текст (например, передать его в другой компонент)
        onSearch(searchText); // Передаем searchText в родительский компонент
    };

    return <Form 
                onSubmit={handleFormSubmit}
            />;
}