import { useState, useEffect } from "react";

//const url = 'https://chatgpt-backend-6uyd.onrender.com'

const url = 'http://localhost:3000';


export function UseFetch ()  {
                    // props will be the question sent with each fetch request

    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState("");

    //const [previousId, setPreviousId] = useState("");


  

    useEffect((answer) => {

        const handleFetch = async () => {

            await fetch(`${url}`, { ///api

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    "content": [
                        {
                            "question":question
                        },
                        {
                            "id": "answer"
                        }]
                    // "previous_id": answer.response_id
                })
        
            })

            .then(reply => reply.json())

            .then(answer => setAnswer(answer))

            .then(console.log(answer))

            .catch((err) => console.log(err));

        }


    if (question != "") handleFetch();

   
        
    }, [question] )



    return {
        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion
    };

}

//export default useFetch;