import { useState } from "react";
import axios from "axios";

function Prompt() {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await axios.post<{ response: string }>('http://localhost:5000/api', { prompt });
            console.log("API Response:", res.data);
            setResponse(res.data.response);
            console.log("Updated response state:", res.data.response);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to get MBTI type. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="prompt">
            <h2>Hi, I'm Percie.</h2>
            <p>Share facts about yourself, and get to know your MBTI type!</p>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="prompt-field">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="I'm a thinker who loves exploring ideas...."
                    />
                    <button type="submit" disabled={loading}>
                        <img src="src\assets\icon.png" alt="Send" style={{ width: '30px', height: '30px' }} />
                    </button>
                </div>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {response !== "" && (
                <div>
                    <h2>Your MBTI Type: </h2>
                    <p>{response || "No type predicted"}</p>
                </div>
            )}
        </div>
    );
}

export default Prompt;