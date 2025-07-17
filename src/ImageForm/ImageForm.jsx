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
            "success": false,
            "response_id": answer.response_id
        })

        setQuestion('');
        
        setImageDescription('');

        alert('URL Saved To Clipboard');
    }

    
    const handleSend = () => {
        
        setEmailVisibility(true);
    }


    const handleKeyPress = (e) => {

        if(e.key === 'Enter') handleFetch();
    }


    const handleDownload = () => {

        if(answer.payload){

            const link = document.createElement('a');

            link.href = answer.payload;

            link.download = 'luluGPT-image.jpg';


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        } 
    }





    

    return (


        <div className="form-container">

            {loading && 
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>}

            

            <form onSubmit={handleSubmit} className="image-form-layout">

                <h1 className="form-titles">Create Image</h1>

                <textarea className="image-prompt-textbox textarea" value={imageDescription} onChange={(e) => {setImageDescription(e.target.value)}} onKeyUp={handleKeyPress}></textarea>

                

                <div className="form-buttons">

                    <button className="form-button button-style" type="submit">create</button>
                    <button className="form-button button-style" type="button" onClick={handleClear}>clear</button>
                    <button className="form-button button-style" type="button" onClick={handleSend}>send</button>
                
                </div>

                {answer?.success &&
                
                <div className="image-container">

                    <div className="image-buttons">
                        <button className="button-style" type="button" onClick={handleClear}>close</button>
                        <button className="button-style" type="button" onClick={handleDownload}>url</button>
                    </div>
            
                    <img className="returned-image" src={answer.payload} alt="image failed to generate"/>

                </div>
                
                }

              


            </form>
            
              {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={url ? url : {}}></EmailForm>}

        </div>
    )
}

export default ImageForm;