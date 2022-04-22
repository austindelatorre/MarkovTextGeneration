import React from 'react';
import Textbox from "./components/textbox.js";
import Header from "./components/header.js";
import About from "./components/about.js"
import Footer from "./components/footer.js"
import css from "./App.module.css";

function App() {
  return (
    <div className = {css.container}>
      <Header/>
      <main className = {css.content}>
        <Textbox/>
        <About/>
        <footer>
          <Footer/>
        </footer>
      </main>
      
    </div>
  );
}

export default App;
