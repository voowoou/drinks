// SearchBar.js
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import dice from "./dice.png";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState(""); // Состояние для хранения текста

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() !== "") {
      onSearch(searchText);
    }
  };

  const handleRandomClick = () => {
    onSearch("random");
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formDiv}>
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
      <button type="button" className={styles.button} onClick={handleRandomClick}>
        <img src={dice} alt="Get a random recipe button" />
      </button>
    </form>
  );
}
