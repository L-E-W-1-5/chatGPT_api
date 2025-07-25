import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState, useEffect} from 'react'; //, useRef, useEffect
import EmailForm from '../EmailForm/EmailForm.jsx';
import {UseFetch} from '../Hooks/useFetch.jsx';
import { LoadingDots } from '../LoadingDots/LoadingDots.jsx';


const InputForm = ({setRequestType}) => {

    const { answer, setAnswer, setQuestion, loading, handleStop } = UseFetch({}); 

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();

    const [maximised, setMaximised] = useState(false);

    const [text, setText] = useState('');


    useEffect (() => {

        const storedAnswer = localStorage.getItem('answer');

        const storedQuestion = localStorage.getItem('question');

        if(storedAnswer){

            setText(storedAnswer);
        };

        if(storedQuestion){

            setQuestion1(storedQuestion);
        };
        


    }, []);
    

    const handleSubmit = (data) => {

        data.preventDefault();

        if(question1){

            fetchResources();

        }else{

            alert("No Question Asked")
        };
    };


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
    };


    const emailForm = () => {

        setEmailVisibility(true);
    };


    const handleKeyPress = (event) => {

        if (event.key === 'Enter') fetchResources();
    };


    const clearForm = () => {
        console.log(question1, text);

        setAnswer({

            "payload": "",
            "success": false,
            "response_id": answer?.response_id
        });

        setQuestion1('');

        setText({});

        localStorage.removeItem('answer');
        
        localStorage.removeItem('question');
    };


    const changeForm = () => {

        const data = answer?.payload;

        if(data) {

            localStorage.setItem('answer', data);
        };

        if(question1) {

            localStorage.setItem('question', question1);
        };

        setRequestType(current => !current);
    };


    const handleMaximisedWindow = () => {

        setMaximised(current => !current);
    };




    return (

        <div className="form-container">

           {loading &&           

                    <div className="loading-container">

                        <LoadingDots></LoadingDots>

                        <button className="stop-fetch-button" onClick={handleStop}>stop</button>

                    </div>
                                                 
            }
                

            <form className="form-layout" onSubmit={handleSubmit}>

                

                <div className="textbox-areas">

                     <button className={maximised ? "maximise-answer-button maximised-max-button" : "maximise-answer-button"} disabled={loading} type="button" onClick={handleMaximisedWindow}></button>

                    <textarea className={maximised ? "maximised textarea" : "answer-text textarea"} readOnly placeholder='answer will appear here...' value={answer ? `${answer.payload}` : text}></textarea>        
           
                    <textarea className="question-text textarea" disabled={loading} placeholder='ask question here...' onKeyUp={handleKeyPress} value={question1} onChange={(e) => {setQuestion1(e.target.value)}}></textarea>
                    
                </div>

                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">ask</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={emailForm}>send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={clearForm}>clear</button>

                </div>

                <div className="form-buttons">

                    <button className="form-button button-style change-form-button" type="button" onClick={changeForm}>image generation</button>
               
                </div>


            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={answer ? answer.payload : text}></EmailForm>}

        </div>

        
        
        
    );


};

export default InputForm;

