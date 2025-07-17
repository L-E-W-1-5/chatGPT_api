import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react'; //, useRef, useEffect
import EmailForm from '../EmailForm/EmailForm.jsx';
import {UseFetch} from '../Hooks/useFetch.jsx';
import { LoadingDots } from '../LoadingDots/LoadingDots.jsx';


const InputForm = () => {

    const { answer, setAnswer, setQuestion, loading } = UseFetch({}); 

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();

    const [maximised, setMaximised] = useState(false);
    


    const handleSubmit = (data) => {

        data.preventDefault();

        if(question1){

            fetchResources();

        }else{

            alert("No Question Asked")
        }
    }

    const fetchResources = () => {


        setQuestion(answer ? {

            "endpoint": 'api',
            "question": question1,
            "previous_id": answer.response_id

        } : {

            "endpoint": 'api',
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

    const handleMaximisedWindow = () => {

        setMaximised(current => !current);
    } 

    



    return (

        <div className="form-container">

           {loading &&
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>
           }
                

            <form className="form-layout" onSubmit={handleSubmit}>

                

                <div className="textbox-areas">

                     <button className={maximised ? "maximise-answer-button maximised-max-button" : "maximise-answer-button"} disabled={loading} type="button" onClick={handleMaximisedWindow}>[]</button>

                    <textarea className={maximised ? "maximised textarea" : "answer-text textarea"} readOnly value={answer ? `${answer.payload}` : "answer will appear here.."}></textarea>        
           
                    <textarea className="question-text textarea" disabled={loading} placeholder='ask question here...' onKeyUp={handleKeyPress} value={question1} onChange={(e) => {setQuestion1(e.target.value)}}></textarea>
                    
                </div>

                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">ask</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={emailForm}>send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={clearForm}>clear</button>

                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={answer ? answer.payload : {}}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;

