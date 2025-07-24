import './ImageForm.css';
import { useState, useEffect } from 'react';
import { UseFetch } from '../Hooks/useFetch';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import EmailForm from '../EmailForm/EmailForm.jsx';


const ImageForm = ({setRequestType}) => {

    //TODO: have the img tag showing when there is a valid answer.payload (a url) redux?
    // Create the endpoint for the image search.

    const [url, setUrl] = useState(''); 

    const [imageDescription, setImageDescription] = useState('');

    const { answer, setAnswer, setQuestion, loading } = UseFetch({});
    
    const [emailVisibility, setEmailVisibility] = useState(false);

    const [storedImage, setStoredImage] = useState('');


    useEffect(() => {

        const storedImage = localStorage.getItem('image');

        if(storedImage){

            setStoredImage(storedImage);
        };

    }, [])


    const handleSubmit = (data) => {

        data.preventDefault();

        if(imageDescription){

            handleFetch();
        
        }else{

            alert('No Image Description Provided');
        };
    };


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

    };


    const handleClear = () => {
        
        setUrl(answer?.payload);

        setAnswer({

            "payload": "",
            "success": false,
            "response_id": answer?.response_id
        });

        setQuestion('');
        
        setImageDescription('');

        alert('URL Saved To Clipboard');
    };

    
    const handleSend = () => {
        
        setEmailVisibility(true);
    };


    const handleKeyPress = (e) => {

        if(e.key === 'Enter') handleFetch();
    };


    const handleDownload = () => {

        if(answer.payload){

            const link = document.createElement('a');

            link.href = answer.payload;

            link.download = 'luluGPT-image.jpg';


            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        }; 
    };


    const changeForm = () => {

        console.log(storedImage);

        if(url){

            localStorage.setItem('image', url);
        };

        setRequestType(current => !current);
    }


    

    return (


        <div className="form-container">

            {loading && 
                <div className="loading-container">
                    <LoadingDots></LoadingDots>
                </div>}

            

            <form onSubmit={handleSubmit} className="image-form-layout">

                <h1 className="form-titles">Create Image</h1>



                <textarea className="image-prompt-textbox textarea" disabled={loading} value={imageDescription} onChange={(e) => {setImageDescription(e.target.value)}} onKeyUp={handleKeyPress}></textarea>



                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">create</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={handleSend}>send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={handleClear}>clear</button>  
                
                </div>

                <div className="form-buttons">

                    <button className="form-button button-style change-form-button" type="button" onClick={changeForm}>ask question</button>
                
                </div>

                {answer?.success &&
                
                <div className="image-container">

                    <div className="image-buttons">

                        <button className="image-button" type="button" onClick={handleDownload}>url</button>
                        <button className="image-button" type="button" onClick={handleClear}>close</button>
                        
                    </div>
            
                    <img className="returned-image" src={answer.payload? answer.payload : storedImage} alt="image failed to generate"/>

                </div>
                
                }

              


            </form>
            
              {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={url ? url : storedImage}></EmailForm>}

        </div>
    )
}

export default ImageForm;