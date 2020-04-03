import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Header from './components/header/Header';
import Main from "./components/main-content/Main";
import Footer from "./components/footer/footer";
import About from "./About";
import Contact from "./Contact";
import Error from "./Error";
import Chart from "./components/Chart/Chart";
//import Chart from "./components/Chart/notChart";
import './App.css';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <div>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/About" component={About}/>
              <Route path="/Contact" component={Contact}/>
              <Route path="/Chart" component={Chart}/>
              <Route path="/Error" component={Error} /> {/* placeholder for now*/}
           </Switch>
        </div> 
      </BrowserRouter>
      <footer>
        <Footer />
      </footer>
      
    </div>
  );
}

export default App;
