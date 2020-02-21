import React from 'react';
import Header from './components/header/Header';
import Main from "./components/main-content/Main";
import Footer from "./components/footer/Footer.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
