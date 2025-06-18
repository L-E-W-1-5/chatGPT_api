import './EmailForm.css';
import {useState} from 'react';

const EmailForm = ({emailVisibility, answer}) => {

    
    const [inputs, setInputs] = useState({});



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
    }

    const sendMail = (event) => {
        event.preventDefault();     //TODO: Create the fetch to send mail.
        console.log(inputs);
    }

    const pasteAnswer = () => {
        setInputs(values => ({...values, ["text"]: `${inputs["text"] ? inputs["text"] : ""}${answer}`}));
    }

    const clearFields = () => {
        setInputs({});
    }

    return (
        <div className="email-container">

            <h1>EMAIL</h1>

            <form className="email-form" onSubmit={sendMail}>

                <div className="email-form-item">
                <label className="email-label">To:</label>
                    <input className="email-input" type="text" name="recipient" placeholder='enter recipient email address here..' value={inputs["recipient"] ? inputs["recipient"] : ""} onChange={handleChange}></input>
                </div>

                <div className="email-form-item">
                <label className="email-label">Subject: </label>
                    <input className="email-input" type="text" name="subject" placeholder='enter subject here' value={inputs["subject"] ? inputs["subject"] : ""} onChange={handleChange}></input>
                </div>

                
                    <textarea className="textarea email-textarea" name="text" value={inputs["text"] ? inputs["text"] : ""} onChange={handleChange}></textarea>
                

                <div className="email-form-buttons">
                    <button className="email-form-button" onClick={pasteAnswer}>Paste Answer</button>
                    <button className="email-form-button" type="submit">Send</button>
                    <button className="email-form-button" onClick={clearFields}>Clear</button>
                </div>

            </form>

            <button className="email-form-close" onClick={() => {emailVisibility(false)}}>Close</button>

        </div>
    )
}

export default EmailForm;

// value={cleared ? "" : answer ? answer : ""}