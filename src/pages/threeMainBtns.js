import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, Paper, TextField, Snackbar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material"
import { IconButton } from "@mui/material";
import { Facebook, WhatsApp, Instagram, Twitter } from "@mui/icons-material";
import Confetti from "react-confetti";

export default function ChatbotIntegration() {
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [integrationStep, setIntegrationStep] = useState(null)
    const [email, setEmail] = useState("")
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const socialLinks = {
        "facebook":"www.facebook.com",
        "twitter": "www.twitter.com" ,
        "instagram": "www.instagram.com",
        "whatsapp": "www.whatsapp.com",

    }
    const handleTestIntegration = () => {
        
        setIntegrationStep("loading");
        setTimeout(() => {
            const success = Math.random() > 0.3;
            setIntegrationStep(success ? "success" : "failure")
        }, 2000)
    };

    return (
        <Box sx={{ textAlign: "center", padding: 4, backgroundColor: "#f5f5f5", height: "100vh" }}>
            <Typography variant="h4" gutterBottom>Chatbot Integration & Testing</Typography>

            <Button variant="contained" color="secondary" sx={{ margin: 2 }} onClick={() => setChatbotOpen(true)}>
                Test Chatbot
            </Button>


            <Button variant="contained" color="primary" sx={{ margin: 2 }} onClick={() => setIntegrationStep("instructions")}>
                Integrate on your Website
            </Button>


            <Button variant="contained" color="success" sx={{ margin: 2 }} onClick={handleTestIntegration}>
                Test Integration
            </Button>


            <Modal open={chatbotOpen} onClose={() => setChatbotOpen(false)}>
                <Box sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "white", padding: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1">Chatbot</Typography>
                    <Typography variant="body2">This is a dummy chatbot integration.</Typography>
                    <Button size="small" onClick={() => setChatbotOpen(false)}>Close</Button>
                </Box>
            </Modal>


            {integrationStep === "instructions" && (
                <Paper sx={{ padding: 3, marginTop: 3 }}>
                    <Typography variant="h6">Integrate Chatbot</Typography>
                    <Typography>
                        Copy and paste the following code inside the <code>&lt;head&gt;</code> of your website:
                    </Typography>
                    <Paper sx={{ padding: 1, backgroundColor: "#eee", fontFamily: "monospace", marginTop: 1 }}>
                        &lt;script src="https://dummy-chatbot.js"&gt;&lt;/script&gt;
                    </Paper>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>Or send instructions via email:</Typography>
                    <TextField label="Developer's Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginY: 1 }} />
                    <Button variant="contained" onClick={() => setSnackbarOpen(true)}>Send Email</Button>
                </Paper>
            )}


            {integrationStep === "loading" && <CircularProgress sx={{ marginTop: 3 }} />}


            {integrationStep === "success" && (
                <Paper sx={{ padding: 3, marginTop: 3, textAlign: "center" }}>
                    <Confetti />
                    <CheckCircleOutline color="success" sx={{ fontSize: 50 }} />
                    <Typography variant="h5" color="success">Integration Successful! 🎉</Typography>
                    <Button variant="contained" color="primary" sx={{ margin: 1 }}>Explore Admin Panel</Button>
                    <Button variant="contained" color="secondary" sx={{ margin: 1 }}>Start Talking to Chatbot</Button>
                </Paper>
            )}


            {integrationStep === "failure" && (
                <Paper sx={{ padding: 3, marginTop: 3, textAlign: "center" }}>
                    <ErrorOutline color="error" sx={{ fontSize: 50 }} />
                    <Typography variant="h5" color="error">Integration Not Detected ❌</Typography>
                    <Typography>Please make sure the chatbot script is added to your website.</Typography>
                    <Button variant="contained" color="warning" sx={{ marginTop: 1 }} onClick={() => setIntegrationStep("instructions")}>
                        View Instructions Again
                    </Button>
                </Paper>
            )}


            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Instructions sent to developer!"
            />

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, gap: 2 }}>
                {Object.entries(socialLinks).map(([key, link]) => (
                    <IconButton key={key} href={link} target="_blank" rel="noopener noreferrer" sx={{ cursor: "pointer" }}>
                        {key === "facebook" && <Facebook color="primary" />}
                        {key === "twitter" && <Twitter color="primary" />}
                        {key === "instagram" && <Instagram sx={{ color: "#E4405F" }} />}
                        {key === "whatsapp" && <WhatsApp sx={{ color: "#25D366" }} />}
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}