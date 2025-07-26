import { useState, useEffect, useRef } from "react";


//Production
const url = 'https://chatgpt-backend-6uyd.onrender.com'     

//TODO: dont forget to keep changing this for dev.

//Dev
//const url = 'http://localhost:3000';


export function UseFetch ()  {
                  
    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState({});   

    const [loading, setLoading] = useState(false);

    const abortControllerRef = useRef(null);
  

    useEffect(() => {

        const handleFetch = async () => {   

            try{

                setLoading(true);

                const controller = new AbortController();

                abortControllerRef.current = controller;

                const response = await fetch(`${url}/${question.endpoint}`, { 

                    signal: controller.signal,

                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({ "data": question })
        
                })

                if(!response.ok){

                    const errData = await response.json();

                    console.log('backend error', errData);

                    alert(`error: ${errData.message || 'unknown error occured'}`);

                    return;

                }

                const answer = await response.json();

                setAnswer(answer);


            }catch (err){

                if(err.name === 'AbortError'){

                    console.log('fetch aborted')
                    
                    alert('Aborted');

                }else{

                    console.error('network parsing error', err);

                    alert('an unexpected error occured', err);
                };

            }finally {

                setLoading(false);

                setQuestion({});
            }  
        };

    
    if (question.endpoint && question.question && question != {}) handleFetch();

    return () => {

        if (abortControllerRef.current) {

            abortControllerRef.current.abort();

            console.log('cleanup function');
        };

    };
   
    }, [question] );


    const handleStop = () => {

        if(abortControllerRef.current){

            abortControllerRef.current.abort();
             
        };

    };


    return {

        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion,
        loading: loading,
        handleStop: handleStop
    };

}




//  try{

//                 setLoading(true);

//                 await fetch(`${url}/${question.endpoint}`, { 

//                     method: "POST",

//                     headers: { "Content-Type": "application/json" },

//                     body: JSON.stringify({ "data": question })
        
//                 })

//                 .then(reply => reply.json())

//                 .then(answer => setAnswer(answer))

//                 .catch((err) => console.log(err));

//             }catch (err){

//                 alert(err);

//             }finally {
//                 setLoading(false);

//                 setQuestion({});
//             }