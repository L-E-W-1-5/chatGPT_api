import { useState, useEffect } from "react";

const url = 'http://localhost:3000'


const useFetch = () => {
                    // props will be the question sent with each fetch request

    const [answer, setAnswer] = useState();

    const [question, setQuestion] = useState();


  

    useEffect((answer) => {

        const handleFetch = async () => {

        await fetch(url, {

            method: "POST",

            headers: {"Content-Type": "application/json"},

            body: JSON.stringify({"question": question})
        })

        .then(reply => reply.json())

        .then(answer => setAnswer(answer));

        console.log(answer);

       // const reply = await res.json();

       // setAnswer(reply);

    }

    if (question) handleFetch();
        
    }, [question] )



    return {
        answer: answer,
        setAnswer: setAnswer,
        setQuestion: setQuestion
    };

}

//export default useFetch;