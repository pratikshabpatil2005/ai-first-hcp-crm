

import { useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function AI() {

    const [prompt, setPrompt] = useState("");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);


    const askAI = async () => {

        if (!prompt) {
            alert("Enter your question");
            return;
        }

        setLoading(true);

        try {

            const res = await api.post("/ai/chat", {
                prompt: prompt
            });

            setResponse(res.data.response);

        } catch (error) {

            console.error(error);

            setResponse("Unable to get AI response.");

        }

        setLoading(false);

    };


    return (

        <MainLayout>

            <h1>AI Assistant</h1>

            <textarea
                rows="8"
                style={{
                    width: "100%",
                    padding: "10px"
                }}
                placeholder="Ask anything..."
                value={prompt}
                onChange={(e) =>
                    setPrompt(e.target.value)
                }
            />

            <br />
            <br />

            <button onClick={askAI}>
                Ask AI
            </button>

            <br />
            <br />

            {
                loading ?

                    <h3>Generating response...</h3>

                    :

                    <div
                        style={{
                            background: "#f5f5f5",
                            padding: "20px",
                            borderRadius: "10px",
                            whiteSpace: "pre-wrap"
                        }}
                    >

                        {response}

                    </div>

            }

        </MainLayout>

    );

}

export default AI;