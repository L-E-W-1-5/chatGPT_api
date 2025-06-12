import './EmailForm.css';

const EmailForm = ({emailVisibility}) => {

    return (
        <div className="email-container">

            <h1>EMAIL</h1>

            <form className="email-form">

                <label>To:
                    <input type="text" placeholder='enter recipient email address here..'></input>
                </label>

                <label>Subject: 
                    <input type="text" placeholder='enter subject here'></input>
                </label>

                <label>
                    <textarea className="textarea" placeholder='write email here..'></textarea>
                </label>

            </form>

            <button onClick={() => {emailVisibility(false)}}>Close</button>

        </div>
    )
}

export default EmailForm;