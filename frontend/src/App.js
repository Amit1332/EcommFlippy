import {Routes,Route} from 'react-router-dom'
import React from 'react'
import './App.css'
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';




function App() {

  return <>
      <Header/>  
      <Routes>
      <Route exact path="/" element={<Home />} />       
      </Routes>


      <Footer/>
      </>
  
}
 
export default App;
