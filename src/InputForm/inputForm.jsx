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
    


    //const answerboxRef = useRef(null)


    // useEffect(() => {
    //     if(answerboxRef.current) {
    //          console.log(answerboxRef.current)
    //         answerboxRef.current.scrollTop = answerboxRef.current.scrollHeight;
    //         console.log(answerboxRef.current.scrollTop)
    //     }
    // }, [answer])



    const onSubmit = (data) => {

        data.preventDefault();

        console.log(answer);

        if(question1){

        fetchResources();

        }else{

            alert("No Question Asked")
        }
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

        setAnswer({

            "payload": "",
            "success": answer.success,
            "response_id": answer.response_id
        });

        setQuestion1("");
    }


    // const handleTextScroll = () => {

    //    // const scrollText = document.getElementsByClassName('answer-text');

    //     // console.log(scrollText[0].scrollHeight)
    //     // console.log(scrollText.scrollTop, scrollText[0].scrollHeight)

    //     // scrollText.scrollTop = scrollText[0].scrollHeight;

    //     // console.log(scrollText.scrollTop, scrollText[0].scrollHeight)

    //     console.log(answerboxRef.current.scrollTop, answerboxRef.current.scrollHeight)

    //    // answerboxRef.current.scrollTop = answerboxRef.current.scrollHeight;

    //    answerboxRef.current.scrollTop = 100;

    //     console.log(answerboxRef.current.scrollTop)
    // }


    return (

        <div className="input-container">

           {!loading &&
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>
           }
                

            <form className="form-layout" onSubmit={onSubmit}>

                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">Ask</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={emailForm}>Send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={clearForm}>Clear</button>

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

