import './EmailForm.css';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import {useState} from 'react';



//Production
const url = 'https://chatgpt-backend-6uyd.onrender.com' 

//TODO: change from dev to prod

//Dev
//const url = "http://localhost:3000";



const EmailForm = ({emailVisibility, answer}) => {

    
    const [inputs, setInputs] = useState({});

    const [loading, setLoading] = useState(false);

//TODO: Can create an alert box, maybe hidden, to accept a persons own sign in credentials (email, password, provider) and use them to send an email from their own account.

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }


    const sendMail = (event) => {

        event.preventDefault();     
        console.log(inputs);

        handleEmailSend();
    }


    const handleEmailSend = async () => {

        setLoading(true);

        console.log(inputs)

        if(!inputs.subject || !inputs.recipient || !inputs.text) {

            setLoading(false);

            return alert("Necessary Fields Not Entered")
        }

        try{

            const res = await fetch(`${url}/email`, {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(inputs)

            })

            .then(res => res.json())

            .then(res => res.success === false ? alert(res.payload) : alert("Email Sent!"))

            .then(res => console.log(res))

            .catch(err => console.log(err))


            if (res) console.log(res);

        }catch(err){

            console.log(err);

        }finally{

            setLoading(false);
        }
    }


    const pasteAnswer = () => {

        console.log(answer)

        if(Object.keys(answer).length){

        setInputs(values => ({...values, ["text"]: `${inputs["text"] ? inputs["text"] : ""}${answer}`}));
        };
    }


    const clearFields = () => {

        setInputs({});
    }



    return (
        <div className="email-container">

            {loading &&
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>
            }

            <h1>Send Mail</h1>

            <form className="email-form" onSubmit={sendMail}>

                <div className="email-form-item">
                <label className="email-label">To:</label>
                    <input className="email-input" disabled={loading} type="text" name="recipient" placeholder='email address of recipient' value={inputs["recipient"] ? inputs["recipient"] : ""} onChange={handleChange}></input>
                </div>

                <div className="email-form-item">
                <label className="email-label">Subject: </label>
                    <input className="email-input" disabled={loading} type="text" name="subject" placeholder='enter subject here' value={inputs["subject"] ? inputs["subject"] : ""} onChange={handleChange}></input>
                </div>

                
                <textarea className="textarea email-textarea" disabled={loading} name="text" value={inputs["text"] ? inputs["text"] : ""} onChange={handleChange}></textarea>
                

                <div className="email-form-buttons">
                    <button className="email-form-button button-style" disabled={loading} type="button" onClick={pasteAnswer}>Paste</button>
                    <button className="email-form-button button-style" disabled={loading} type="submit">Send</button>
                    <button className="email-form-button button-style" disabled={loading} type="button" onClick={clearFields}>Clear</button>
                </div>

                <button className="email-form-close button-style" disabled={loading} type="button" onClick={() => {emailVisibility(false)}}>Close</button>

            </form>

            <div className="quick-height">

            </div>

        </div>
    )
}

export default EmailForm;

