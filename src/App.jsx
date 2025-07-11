import Header from './Header/Header.jsx';
import InputForm from './InputForm/inputForm.jsx';
import Footer from './Footer/Footer.jsx';
import ImageForm from './ImageForm/ImageForm.jsx';
import { useState } from 'react';


import './App.css';

function App() {

const [requestType, setRequestType] = useState(true);

  return (

    <div className="main-container">

      <Header setRequestType={setRequestType}></Header>

      {requestType === true && 
      <InputForm></InputForm>
      }

      {requestType === false && 
      <ImageForm></ImageForm>
      }

      <Footer></Footer>
      

    </div>

  );
}

export default App
