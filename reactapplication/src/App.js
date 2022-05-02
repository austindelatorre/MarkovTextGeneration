import React, {useState} from 'react';
import Textbox from "./components/textbox.js";
import Header from "./components/header.js";
import About from "./components/about.js"
import Footer from "./components/footer.js"
import css from "./App.module.css";
import dict from "./backend/dict.json";

function App() {
  const data = JSON.parse(JSON.stringify(dict));
  return (
    <div className = {css.container}>
      <Header/>
      <main className = {css.content}>
        <Textbox data = {data}/>
        <About/>
        <footer>
          <Footer/>
        </footer>
      </main>
    </div>
  );
}

export default App;
