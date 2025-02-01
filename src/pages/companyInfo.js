import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-react-ui";
import { Model } from "survey-react-ui";
import { ContrastDark } from "survey-core/themes";
import { Button, CircularProgress, Typography, Snackbar, Alert } from "@mui/material";
import "../styles/company-form.css";

const formElements = {
    pages: [
        {
            elements: [
                {
                    name: "Company URL",
                    title: "Enter your company URL",
                    type: "text",
                    inputType: "url",
                    isRequired: true,  // Makes this field mandatory
                },
                {
                    name: "Company Name",
                    title: "Your company name",
                    type: "text",
                    isRequired: true,
                },
                {
                    name: "Company Description",
                    title: "Enter your company description",
                    type: "text",
                    isRequired: true,
                },
            ],
        },
    ],
};

export default function SetupOrganization() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state?.userData || {}; // Retrieve user data from the previous page
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const formRender = new Model(formElements);
    formRender.applyTheme(ContrastDark);
    formRender.showCompletedPage = false;
    formRender.showCompleteButton = false;

    const handleProceed = () => {
        const formData = formRender.data;

        // Validate that all required fields are filled
        if (!formData["Company URL"] || !formData["Company Name"] || !formData["Company Description"]) {
            setError("Please fill out all company details before proceeding.");
            return;
        }

        setLoading(true); // Show spinner

        // Simulating API delay
        setTimeout(() => {
            setLoading(false);
            navigate("/verify-email", { state: { userData } });
        }, 2000);
    };

    return (
        <div className="container">
            <div className="background-panel">
                <div className="form-container">
                    <Typography variant="h5" className="greeting">
                        Hello, {userData.Username}!
                    </Typography>
                    <Survey model={formRender} />
                    <Button
                        className="proceed-button"
                        onClick={handleProceed}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Proceed"}
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
        </div>
    );
}
