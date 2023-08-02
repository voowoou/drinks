import React from "react";

export default function SearchBar() {
    return (
        <form>
            <input type="search" name="search-field"></input>
            <input type="submit" name="search-button" value="SEARCH"></input>
        </form>
    );
}