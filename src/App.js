import React, { useState } from "react";

import Header from './Header';
import SearchBar from "./SearchBar";
import CoctailInfo from "./CoctailInfo";
import Footer from "./Footer";

export default function App() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (searchText) => {
      // Обработка searchText или передача его в другой компонент
      setSearchText(searchText);
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CoctailInfo searchText={searchText}/>
      <Footer />
    </>
  );
};