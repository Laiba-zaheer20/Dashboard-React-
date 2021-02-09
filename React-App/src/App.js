import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Dashboard from  './Components/dashboard'
class App extends Component{
  render(){
  return (
    <div className="App">
    <Dashboard />
    </div>
  );
  }
}

export default App;
