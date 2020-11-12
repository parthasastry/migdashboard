import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import NavBar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Dashboard from './components/dashboard/Dashboard';
import Search from './components/admin/Search';
import AddInventory from './components/admin/AddInventory';
import EditInventory from './components/admin/EditInventory';
import About from './components/About';
import Footer from './components/layout/Footer';

const App = () => {

  //Initialize Materialize JS
  useEffect(() => {
    M.AutoInit();
  });


  return (
    <Router>
      <div className="App">
        <NavBar />
        
        <AddInventory />

        <Switch>
          <Route exact path='/'>
              <Home />
          </Route>
          <Route exact path='/dashboard'>
              <Dashboard />
          </Route>
          <Route exact path='/search'>
              <Search />
          </Route>
          <Route exact path='/about'>
              <About />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
