import React, { useState } from "react";
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-react-ui";
import { Model } from "survey-react-ui";
import { LayeredLight } from "survey-core/themes";
import { useNavigate } from "react-router";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import "../styles/verification.css";

const formElements = {
    pages: [
        {
            elements: [
                {
                    name: "Verify code",
                    type: "text",
                    inputType: "number",
                    isRequired: true, // Make the field required
                },
            ],
        },
    ],
};

export default function EmailVerification() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const formRender = new Model(formElements);
    formRender.applyTheme(LayeredLight);
    formRender.showCompleteButton = false;
    formRender.showCompletedPage = false;

    const handleVerificationDone = () => {
        const formData = formRender.data;

        // Check if verification code is entered
        if (!formData["Verify code"]) {
            setError("Please enter the verification code.");
            return;
        }

        setLoading(true); // Show spinner

        // Simulating API verification delay
        setTimeout(() => {
            setLoading(false);
            navigate("/scraped-page");
        }, 2000);
    };

    return (
        <div className="verify-container">
            <div className="verify-form-container">
                <Survey model={formRender} />
                <Button
                    className="verify-btn"
                    onClick={handleVerificationDone}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
                </Button>
                {/* Error Snackbar */}
                <Snackbar
                    open={Boolean(error)}
                    autoHideDuration={3000}
                    onClose={() => setError("")}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={() => setError("")} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}
