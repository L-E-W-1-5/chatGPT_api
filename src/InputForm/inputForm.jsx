import './InputForm.css';
import '../EmailForm/EmailForm.jsx';
import {useState} from 'react';
import EmailForm from '../EmailForm/EmailForm.jsx';
import {UseFetch} from '../Hooks/useFetch.jsx';


const InputForm = () => {

    const { answer, setAnswer, setQuestion } = UseFetch({});

    const [emailVisibility, setEmailVisibility] = useState();

    const [question1, setQuestion1] = useState();



    const onSubmit = (data) => {

        data.preventDefault();

        console.log(answer);

        fetchResources();

    }

    const fetchResources = () => {

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

        //const updatedObject = answer.filter(prop => prop.payload != "")

        //const newAnswer = {payload, ...answer};
        setAnswer({
            "payload": "",
            "success": answer.success,
            "response_id": answer.response_id
        });

        setQuestion1("");
    }


    return (

      

        <div className="input-container">

            <h3>Ask Question</h3>

            <form className="form-layout" onSubmit={onSubmit}>

                <div className="form-buttons">

                    <button className="form-button button-style" type="submit">Ask</button>
                    <button className="form-button button-style" type="button" onClick={emailForm}>Send</button>
                    <button className="form-button button-style" type="button" onClick={clearForm}>Delete</button>

                </div>

                <div className="textbox-areas">

                    <textarea className="answer-text textarea" readOnly value={answer ? `${answer.payload}` : "answer will appear here.."}></textarea>
           
                    <textarea className="question-text textarea" placeholder='ask question here...' onKeyUp={handleKeyPress} value={question1} onChange={(e) => {setQuestion1(e.target.value)}}></textarea>
                    
                </div>

            </form>

            {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={answer ? answer.payload : {}}></EmailForm>}

        </div>

        
        
        
    );


}

export default InputForm;


//`Still doesn't work yet asshole, but you typed ${answer.count} characters and "${answer.question}" is a shit question!`