import Header from './Header/Header.jsx';
import InputForm from './InputForm/inputForm.jsx';
import Footer from './Footer/Footer.jsx';
import ImageForm from './ImageForm/ImageForm.jsx';
import { useState, useEffect } from 'react';


import './App.css';

function App() {

const [requestType, setRequestType] = useState(() => {
        
      const savedState = localStorage.getItem('formVisible');

      if(savedState === null){

         return true;

      }else{

        return savedState === 'true';
      };
  });


useEffect(() => {

  localStorage.setItem('formVisible', requestType);

}, [requestType]);

  return (

    <div className="main-container">

      <Header requestType={requestType} setRequestType={setRequestType}></Header>

      {requestType === true && 
      <InputForm requestType={requestType} setRequestType={setRequestType}></InputForm>
      }

      {requestType === false && 
      <ImageForm setRequestType={setRequestType}></ImageForm>
      }

      <Footer></Footer>
      

    </div>

  );
}

export default App
