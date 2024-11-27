import { useState } from "react";

const QuerySBT = () => {
    const [ownerAddress, setOwnerAddress] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const contractId = "63c2d445-30ea-4ebd-9f97-01afa293f0dc"; // Your contract ID
        const url = `https://gateway-api.kalp.studio/v1/contract/kalp/query/${contractId}/QuerySBT`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    owner: ownerAddress,
                    tokenId: tokenId,
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error querying SBT:", error);
            setResult({ error: "Something went wrong!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Query Certificate Details</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Owner Address:</label>
                    <input
                        type="text"
                        value={ownerAddress}
                        onChange={(e) => setOwnerAddress(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Token ID:</label>
                    <input
                        type="text"
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Loading..." : "Query SBT"}
                </button>
            </form>
            {result && (
                <div style={styles.result}>
                    <h3>Query Result:</h3>
                    <pre style={styles.pre}>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "5px",
        color: "#555",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
        transition: "border-color 0.3s",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    result: {
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    pre: {
        backgroundColor: "#333",
        color: "#fff",
        padding: "15px",
        borderRadius: "4px",
        overflowX: "auto",
    },
};

export default QuerySBT;
