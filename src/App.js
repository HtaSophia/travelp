import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Button from './components/shared/Button/Button';

function App() {
  return (<>
  <Navbar username='name'/>
  <Footer/>
  <Button text='button'/>
  
  </>);
}

export default App;
