import './ImageForm.css';
import { useState, useEffect } from 'react';
import { UseFetch } from '../Hooks/useFetch';
import { LoadingDots } from '../LoadingDots/LoadingDots';
import EmailForm from '../EmailForm/EmailForm.jsx';


const ImageForm = ({setRequestType}) => {

    //TODO: have the img tag showing when there is a valid answer.payload (a url) redux?
    // Create the endpoint for the image search.


    const [imageDescription, setImageDescription] = useState('');

    const { answer, setAnswer, setQuestion, loading, handleStop } = UseFetch({});
    
    const [emailVisibility, setEmailVisibility] = useState(false);

    const [storedImage, setStoredImage] = useState('');

    const [showHide, setShowHide] = useState(false);

    

    useEffect(() => {

        const storedImage = localStorage.getItem('image');

        const storedImageDescription = localStorage.getItem('imageDescription');

        if(storedImage){

            setStoredImage(storedImage);
        };

        if(storedImageDescription){

            setImageDescription(storedImageDescription);
        };

    }, []);


    useEffect(() => {

        if(answer?.payload){

            setShowHide(true);
        }

    }, [answer]);


    useEffect(() => {

        const data = answer?.payload;

        if(data){

            localStorage.setItem('image', data);
        };

        if(imageDescription){

            localStorage.setItem('imageDescription', imageDescription);
        }

    }, [answer, imageDescription]);



    const handleSubmit = (data) => {

        data.preventDefault();

        if(imageDescription){

            handleFetch();
        
        }else{

            alert('No Image Description Provided');
        };
    };


    const handleFetch = () => {

        setAnswer({
            "payload": "",
            "success": false,
            "response_id": answer?.response_id
        });

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

        setAnswer({

            "payload": "",
            "success": false,
            "response_id": answer?.response_id
        });

        setQuestion('');
        
        setImageDescription('');

        setStoredImage('')

        localStorage.removeItem('image');

        localStorage.removeItem('imageDescription');
    };

    
    const handleSend = () => {
        
        setEmailVisibility(true);
    };


    const handleKeyPress = (event) => {

        if (event.key === 'Enter'){
            
            if(event.shiftKey){

                return;

            }else{

                event.preventDefault();

                handleFetch();
            };
        };
    };


    const closeImage = () => {

        setShowHide(false);
    }


    const changeForm = () => {

        setRequestType(current => !current);
    }


    

    return (


        <div className="form-container">

            {loading &&           

                    <div className="loading-container">

                        <h3>Thinking..</h3>

                        <LoadingDots></LoadingDots>

                        <button className="stop-fetch-button" onClick={handleStop}>cancel</button>

                    </div>
                                                 
            }

            

            <form onSubmit={handleSubmit} className="image-form-layout">

                <h1 className="form-titles">Create Image</h1>

                <div className="image-prompt-container">

                    <button className="show-hide-button" style={{display: !storedImage && !answer?.payload && "none"}} type="button" onClick={() => setShowHide(true)}>show</button>

                    <textarea className="image-prompt-textbox textarea" disabled={loading} value={imageDescription} onChange={(e) => {setImageDescription(e.target.value)}} onKeyDown={handleKeyPress}></textarea>

                </div>

                <div className="form-buttons">

                    <button className="form-button button-style" disabled={loading} type="submit">create</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={handleSend}>send</button>
                    <button className="form-button button-style" disabled={loading} type="button" onClick={handleClear}>clear</button>  
                
                </div>

                <div className="form-buttons">

                    <button className="form-button button-style change-form-button" type="button" onClick={changeForm}>ask question</button>
                
                </div>

                {showHide && (() => {

                    if(!answer?.payload && !storedImage){

                        alert("No Image Available");

                        setShowHide(false);

                        return null;
                    }
                    
                    return(

                    <div className="image-container">

                        <div className="image-buttons">

                            <button className="image-button" type="button" onClick={closeImage}>close</button>
                        
                        </div>
            
                        <img className="returned-image" src={null} alt="Image Timed Out."/>

                    </div>
                    )
                
                })()}

              {/* answer?.payload ? answer.payload : storedImage */}


            </form>
            
              {emailVisibility && <EmailForm emailVisibility={setEmailVisibility} answer={answer?.payload ? answer?.payload : storedImage}></EmailForm>}

        </div>
    )
}

export default ImageForm;

