import './ImageForm.css';
import { useState } from 'react';
import { UseFetch } from '../Hooks/useFetch';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import EmailForm from '../EmailForm/EmailForm.jsx';


const ImageForm = () => {

    //TODO: have the img tag showing when there is a valid answer.payload (a url) redux?
    // Create the endpoint for the image search.

    const [url, setUrl] = useState(''); 

    const [imageDescription, setImageDescription] = useState('');

    const { answer, setAnswer, setQuestion, loading } = UseFetch({});
    
    const [emailVisibility, setEmailVisibility] = useState(false);


    const handleSubmit = (data) => {

        data.preventDefault();

        console.log(imageDescription);

        if(imageDescription){

            handleFetch();
        
        }else{

            alert('No Image Description Provided');
        }
    }


    const handleFetch = () => {

        setQuestion(answer ? {

            "endpoint": 'image',
            "question": imageDescription,
            "previous_id": answer.response_id

        } : {

            "endpoint": 'image',
            "question": imageDescription,
            "previous_id": null

        });

    }


    const handleClear = () => {
        
        setUrl(answer.payload);

        setAnswer({

            "payload": "",
            "success": answer.success,
            "response_id": answer.response_id
        })

        setQuestion('');
        
        setImageDescription('');
    }
    
    const handleSend = () => {
        
        setEmailVisibility(true);
    }


    

    return (


        <div className="form-container">

            {loading && 
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>}

            

            <form onSubmit={handleSubmit} className="image-form-layout">

                <h1 className="form-titles">Create Image</h1>

                <textarea className="image-prompt-textbox textarea" value={imageDescription} onChange={(e) => {setImageDescription(e.target.value)}}></textarea>

                

                <div className="form-buttons">

                    <button className="form-button button-style" type="submit">create</button>
                    <button className="form-button button-style" type="button" onClick={handleClear}>clear</button>
                    <button className="form-button button-style" type="button" onClick={handleSend}>send</button>
                
                </div>

                {answer?.payload &&
                
                <div className="image-container">
            
                    <img className="returned-image" src={answer.payload} alt="image failed to generate" onClick={handleClear}/>

                </div>
                
                }


            </form>
            
              {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={url ? url : {}}></EmailForm>}

        </div>
    )
}

export default ImageForm;