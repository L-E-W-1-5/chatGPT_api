import './EmailForm.css';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import {useState, useRef, useEffect} from 'react';



//Production
const url = 'https://chatgpt-backend-6uyd.onrender.com' 

//TODO: change from dev to prod

//Dev
//const url = "http://localhost:3000";



const EmailForm = ({emailVisibility, answer}) => {

    
    const [inputs, setInputs] = useState({});

    const [loading, setLoading] = useState(false);

    const abortControllerRef = useRef(null);

//TODO: Can create an alert box, maybe hidden, to accept a persons own sign in credentials (email, password, provider) and use them to send an email from their own account.


    useEffect(() => {

        const storedItem = localStorage.getItem('inputs');

        if(storedItem){

            const parsedItem = JSON.parse(storedItem);

            if(parsedItem.recipient){
                setInputs(values => ({...values, ['recipient']: parsedItem.recipient}))
            };

            if(parsedItem.text){
                setInputs(values => ({...values, ['text']: parsedItem.text}))
            };

            if(parsedItem.subject){
                setInputs(values => ({...values, ['subject']: parsedItem.subject}))
            }
            
        };

    }, [])


    useEffect(() => {

        localStorage.setItem('inputs', JSON.stringify(inputs));

    }, [inputs])


    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }


    const sendMail = (event) => {

        event.preventDefault();     

        handleEmailSend();
    }


    const handleEmailSend = async () => {

        setLoading(true);

        if(!inputs.subject || !inputs.recipient || !inputs.text) {

            setLoading(false);

            return alert("Necessary Fields Not Entered")
        }

        try{

            const controller = new AbortController();

            abortControllerRef.current = controller;

            const res = await fetch(`${url}/email`, {

                signal: controller.signal,

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(inputs)

            })

            .then(res => res.json())

            .then(res => res.success === false ? alert(res) : alert("Email Sent!"))

            .then(res => console.log(res))

            .catch(err => console.log(err))


            if (res) console.log(res);

        }catch(err){

            if(err.name === 'AbortError'){

                console.log('fetch aborted');

                alert('Aborted');
            }

            console.log(err);

        }finally{

            setLoading(false);
        }

        return () => {

            if (abortControllerRef.current) {

                abortControllerRef.current.abort();
            };

        };
    };


    const handleStop = () => {

        if(abortControllerRef.current){

            abortControllerRef.current.abort();

            alert('aborted');
        };
    };


    const pasteAnswer = () => {

        // if(Object.keys(answer).length){
        if(answer){

            setInputs(values => ({...values, ["text"]: `${inputs["text"] ? inputs["text"] : ""}${answer}`}));

        }else{

            alert('Nothing To Paste');
        }
    }


    const clearFields = () => {

        setInputs({});
    }



    return (
        <div className="absolute-container">
        <div className="form-container email-container">
        

            {loading &&           

                    <div className="loading-container">

                        <h3 className="loading-title">Sending..</h3>

                        <LoadingDots></LoadingDots>

                        <button className="stop-fetch-button" onClick={handleStop}>cancel</button>

                    </div>
                                                 
            }

            

            <form className="email-form" onSubmit={sendMail}>

                <h1 className="form-titles email-title">Send Mail</h1>

                <div className="email-form-item">

                <label className="email-label">To:</label>
                    <input className="email-input" disabled={loading} type="text" name="recipient" placeholder='email address of recipient' value={inputs["recipient"] ? inputs["recipient"] : ""} onChange={handleChange}></input>

                </div>

                <div className="email-form-item">

                <label className="email-label">Subject: </label>
                    <input className="email-input" disabled={loading} type="text" name="subject" placeholder='enter subject here' value={inputs["subject"] ? inputs["subject"] : ""} onChange={handleChange}></input>

                </div>
                
                <textarea className="textarea email-textarea" disabled={loading} name="text" value={inputs["text"] ? inputs["text"] : ""} onChange={handleChange}></textarea>
                
                <div className="form-buttons email-form-buttons">

                    <button className="form-button button-style" disabled={loading} type="button" onClick={pasteAnswer}>paste</button>
                    <button className="form-button button-style" disabled={loading} type="submit">send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={clearFields}>clear</button>
                    
                </div>

                <div className="email-close-div">
                    <button className="form-button button-style change-form-button email-form-close" disabled={loading} type="button" onClick={() => {emailVisibility(false)}}>close</button>
                </div>

            </form>

            <div className="quick-height">

            </div>

        </div>
        </div>
    )
}

export default EmailForm;

