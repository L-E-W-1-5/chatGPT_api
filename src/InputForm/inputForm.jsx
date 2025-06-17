import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react';
import EmailForm from '../EmailForm/EmailForm.jsx';
import {UseFetch} from '../Hooks/useFetch.jsx';


const InputForm = () => {

    const { answer, setAnswer, setQuestion } = UseFetch();

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();

    

    const onSubmit = (data) => {

        data.preventDefault();

        setQuestion(question1);

    }

    const emailForm = () => {
        setEmailVisibility(true);
    }

    const clearForm = () => {
        setAnswer("");
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
                    
                    <textarea className="answer-text textarea" value={answer}></textarea>
          
                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;