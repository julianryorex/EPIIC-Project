import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom"

import Header from './components/header/Header';
import Main from "./components/main-content/Main";
import Footer from "./components/footer/footer";
import About from "./About.js";
import Contact from "./Contact.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
      <BrowserRouter>
        <div>
          <Header />
            <Switch>
            <Route path="/Main" component={Main}/>
            <Route path="/About" component={About}/>
            <Route path="/Contact" component={Contact}/>
           </Switch>
        </div> 
      </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
