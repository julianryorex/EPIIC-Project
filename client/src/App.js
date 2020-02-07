import React from 'react';
import Header from './components/header/Header';
import Main from "./components/main-content/Main";
import Footer from "./components/footer/Footer.js";
import Clock from "./components/clock/Clock.js"
// import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <Main />
        <Footer />
        <Clock />
        <p>Work in Progress by: Julian, Michaela, and Norman.</p>
      </div>
    </div>
  );
}

export default App;
