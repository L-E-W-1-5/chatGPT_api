import { useState } from "react";

const url = 'http://localhost:3000'


const useFetch = (props) => {
                    // props will be the question sent with each fetch request

    const [answer, setAnswer] = useState();


    const handleFetch = async () => {

        const res = await fetch(url, {
            method: "POST",

            headers: {"Content-Type"},

            body: JSON.stringify({"question": props.question})
        });

        const reply = await res.json();

        console.log(reply);

        setAnswer(reply);

    }

    return answer;


}

export default useFetch;