import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react';
import EmailForm from '../EmailForm/EmailForm.jsx';


const InputForm = () => {

    const [answer, setAnswer] = useState();

    const [emailVisibility, setEmailVisibility] = useState();

    const [question, setQuestion] = useState();

    const onSubmit = (data) => {
        data.preventDefault();
        console.log(question); //TODO: create function to fetch from backend. 

        setAnswer("not working yet, but it will ;)")
    }

    const emailForm = () => {
        setEmailVisibility(true);
    }

    const clearForm = () => {
        setAnswer("");
        setQuestion("");
    }


    return (

      

        <div className="input-container">

            <h3>Ask Question</h3>

            <form className="form-layout" onSubmit={onSubmit}>

                <div className="form-buttons">

                    <button className="form-button" type="submit">Ask</button>
                    <button className="form-button" type="button" onClick={emailForm}>Send</button>
                    <button className="form-button" type="button" onClick={clearForm}>Delete</button>

                </div>

                <div className="textbox-areas">
           
                    <textarea className="question-text textarea" placeholder='ask question here...' value={question} onChange={(e) => {setQuestion(e.target.value)}}></textarea>
                    
                    <textarea className="answer-text textarea" value={answer}></textarea>
          
                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;