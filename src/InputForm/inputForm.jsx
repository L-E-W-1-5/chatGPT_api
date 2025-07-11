import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react'; //, useRef, useEffect
import EmailForm from '../EmailForm/EmailForm.jsx';
import {UseFetch} from '../Hooks/useFetch.jsx';
import { LoadingDots } from '../LoadingDots/LoadingDots.jsx';


const InputForm = () => {

    const { answer, setAnswer, setQuestion, loading, setEndpoint } = UseFetch({}); 

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();
    


    const handleSubmit = (data) => {

        data.preventDefault();

        if(question1){

            fetchResources();

        }else{

            alert("No Question Asked")
        }
    }

    const fetchResources = () => {

        setEndpoint('api');

        setQuestion(answer ? {

            "question": question1,
            "previous_id": answer.response_id

        } : {

            "question": question1,
            "previous_id": null
        });  
    }


    const emailForm = () => {

        setEmailVisibility(true);
    }


    const handleKeyPress = (event) => {

        if (event.key === 'Enter') fetchResources();
    }


    const clearForm = () => {

        console.log(answer.payload)

        setAnswer({

            "payload": "",
            "success": answer.success,
            "response_id": answer.response_id
        });

        setQuestion1('');
    }



    return (

        <div className="form-container">

           {loading &&
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>
           }
                

            <form className="form-layout" onSubmit={handleSubmit}>

                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">Ask</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={emailForm}>Send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={clearForm}>Clear</button>

                </div>

                <div className="textbox-areas">

                    <textarea className="answer-text textarea" readOnly value={answer ? `${answer.payload}` : "answer will appear here.."}></textarea>        
           
                    <textarea className="question-text textarea" disabled={loading} placeholder='ask question here...' onKeyUp={handleKeyPress} value={question1} onChange={(e) => {setQuestion1(e.target.value)}}></textarea>
                    
                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={answer ? answer.payload : {}}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;

