import { useState, useEffect } from "react";


//Production
const url = 'https://chatgpt-backend-6uyd.onrender.com'     

//TODO: dont forget to keep changing this for dev.

//Dev
//const url = 'http://localhost:3000';


export function UseFetch ()  {
                  
    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState({});   //TODO: change this to request, setRequest

    const [loading, setLoading] = useState(false);

    const [endPoint, setEndpoint] = useState('');
  

    useEffect((answer) => {


        const handleFetch = async () => {   

            setLoading(true);


            try{
                await fetch(`${url}/${endPoint}`, { 

                    method: "POST",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({ "data": question })
        
                })

                .then(reply => reply.json())

                .then(answer => setAnswer(answer))

                .then(console.log(answer))

                .catch((err) => console.log(err));

            }catch (err){

                alert('error fetching request');
                console.log(err);

            }finally {
                setLoading(false);
                //setQuestion({});
            }

          
        }

    
    if (question.question && endPoint) handleFetch();
   
    }, [question, endPoint] )


    return {

        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion,
        loading: loading,
        setEndpoint: setEndpoint
    };

}