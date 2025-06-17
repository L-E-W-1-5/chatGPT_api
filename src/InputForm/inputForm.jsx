import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react';
import EmailForm from '../EmailForm/EmailForm.jsx';
import useFetch from '../Fetch/Fetch.jsx';


const InputForm = () => {

    const [answer, setQuestion] = useFetch();

    const [answer1, setAnswer1] = useState();

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();

    const onSubmit = (data) => {
        data.preventDefault();
        console.log(question1); //TODO: create function to fetch from backend. 

        setQuestion(question1);
        setAnswer1(answer);
        //setAnswer("not working yet, but it will ;)")
    }

    const emailForm = () => {
        setEmailVisibility(true);
    }

    const clearForm = () => {
        setAnswer1("");
        setQuestion1("");
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
           
                    <textarea className="question-text textarea" placeholder='ask question here...' value={question1} onChange={(e) => {setQuestion1(e.target.value)}}></textarea>
                    
                    <textarea className="answer-text textarea" value={answer1}></textarea>
          
                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;