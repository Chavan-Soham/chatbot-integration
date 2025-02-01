import React, {useState, useEffect} from "react";
import 'survey-core/defaultV2.min.css';
import { Survey } from "survey-react-ui";
import { Model } from "survey-react-ui";
import { LayeredDark } from "survey-core/themes";
import { Button,Snackbar, Alert, CircularProgress } from "@mui/material";
import { Google } from "@mui/icons-material";
import '../styles/registration-form.css'
import { useNavigate } from "react-router";
import { passwordStrength } from "check-password-strength";

const formElements = {
    pages: [{
        elements: [{
            name: "Username",
            title: "Enter your username",
            type: "text"
        }, {
            name: "Email",
            title: "Enter your company email",
            type: "text",
            inputType: "email"
        }, {
            name: "Password",
            title: "Enter your password",
            type: "text",
            inputType: "password"
        }]
    }]
};
export default function RegistrationPage() {
    const navigate = useNavigate()
    const formRender = new Model(formElements)
    formRender.applyTheme(LayeredDark)
    formRender.showCompleteButton = false
    formRender.showCompletedPage = false

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Handle Registration
    const handleRegister = () => {
        const formData = formRender.data;

        // Validate form fields
        if (!formData.Username || !formData.Email || !formData.Password) {
            setSnackbarMessage("Please fill all fields!");
            setSnackbarOpen(true);
            return;
        }

        // Check password strength
        const strength = passwordStrength(formData.Password).value; // Returns "Too weak", "Weak", "Medium", or "Strong"

        if (strength === "Too weak" || strength === "Weak") {
            setSnackbarMessage(`Password strength is ${strength}. Please use a stronger password.`);
            setSnackbarOpen(true);
            return;
        }

        // Show loading spinner before navigating
        setLoading(true);
        setTimeout(() => {
            navigate("/setup-organization", { state: { userData: formData } });
        }, 2000);
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <Survey model={formRender} />
                {loading ? (
                    <CircularProgress color="secondary" />
                ) : (
                    <>
                        <button className="register-btn" onClick={handleRegister}>Register</button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<Google />}
                            sx={{ marginTop: 2 }}
                            onClick={handleRegister}
                        >
                            Continue with Google
                        </Button>
                    </>
                )}
            </div>

            {/* Snackbar Notification */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity="error">{snackbarMessage}</Alert>
            </Snackbar>
        </div>
    );
}