import { useState, useEffect } from "react";

const url = 'http://localhost:3000'


export function UseFetch ()  {
                    // props will be the question sent with each fetch request

    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState("");


  

    useEffect((answer) => {

        const handleFetch = async () => {

            await fetch(url, {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({"question": question})
        
            })

            .then(reply => reply.json())

            .then(answer => setAnswer(answer))

            .then(console.log(answer))

            .catch((err) => console.log(err));

           // if (answer) console.log(answer);

        }

        /*const handleFetch = async() => {
        
        const res = await fetch(`${url}`, {

            method: "POST",

            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({"question": question})
        })
        let answer1 = await res.json();
        console.log(answer1)
        setAnswer(answer1)
        setQuestion("");
    }*/


if (question) console.log(question);


    if (question != "") handleFetch();
        
    }, [question] )



    return {
        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion
    };

}

//export default useFetch;