import './InputForm.css';


const InputForm = () => {


    return (
        <div className="input-container">

            <h3>Ask Question</h3>

            <div className="question-box">
                <textarea className="question-text"></textarea>
            </div>

            <div className="answer-box">
                <textarea className="answer-text"></textarea>
            </div>
        </div>
    );


}

export default InputForm;