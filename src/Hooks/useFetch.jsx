import { useState, useEffect } from "react";


//Production
const url = 'https://chatgpt-backend-6uyd.onrender.com'     

//TODO: dont forget to keep changing this for dev.

//Dev
//const url = 'http://localhost:3000';


export function UseFetch ()  {
                  
    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState({});
  

    useEffect((answer) => {

        const handleFetch = async () => {   //TODO: change to /api for production

            await fetch(`${url}/api`, { ///api

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ "data": question })
        
            })

            .then(reply => reply.json())

            .then(answer => setAnswer(answer))

            .then(console.log(answer))

            .catch((err) => console.log(err));
        }

    if (question.question) handleFetch();
        
    }, [question] )


    return {
        
        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion
    };

}