import React, { useState, useEffect } from "react";
import FormTextField from "../../components/textfield/textfield";
import { Container, Grid2, FormControlLabel, Checkbox, Button, Stack, CircularProgress } from "../../MaterialComponents";
import './login.css'
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../slices/snackbarSlice";
import { loginUser } from "../../slices/authSlice";
import { useSelector } from 'react-redux';
import { resetSidebar } from "../../slices/sidebarSlice";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            dispatch(showSnackbar({ message: 'Email & Password Required', severity: 'warning' }));
            return;
        }
        try {
            const result = await dispatch(loginUser({ email: email, password: password })).unwrap();
            if (result?.token) {
                dispatch(resetSidebar());
                dispatch(showSnackbar({ message: 'Login Successful', severity: 'success' }));
                navigate('/dashboard');
                if (rememberMe) {
                    localStorage.setItem("rememberedEmail", email);
                    localStorage.setItem("rememberedPassword", password);
                } else {
                    localStorage.removeItem("rememberedEmail");
                    localStorage.removeItem("rememberedPassword");
                }
            } else {
                dispatch(showSnackbar({ message: result, severity: 'error' }));
            }
        } catch (error) {
            dispatch(showSnackbar({ message: "user not found", severity: 'error' }));
            console.log(error);
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const savedPassword = localStorage.getItem("rememberedPassword");
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="background">
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, xl: 1 }}>
                    <img className="logo" src='images/company-logo.svg' alt="logo" />
                </Grid2>
                <Grid2 size={{ xs: 12, xl: 11 }}>
                    <p className="applicationName">E-Tender Application</p>
                </Grid2>
            </Grid2>

            <Grid2 container className="loginContent" >
                {/* <Grid2 size={{xs: 12, xl: 6}} >
                    <img className="loginimage" src="images/login_image.svg" />
                </Grid2> */}
                <Grid2 size={{ xs: 12, xl: 12 }} className="form" alignItems={"center"} justifyContent={"space-between"} flexDirection={"column"}>
                    <Container maxWidth={"md"} className="loginForm">
                        <h3 className="loginHeading" >Login</h3>
                        <p className="loginHelptext" >Please enter your registered email and
                            password to access your profile</p>
                        <FormTextField
                            label="Username"
                            value={email}
                            onChange={(value) => setEmail(value)}
                            validateEmail
                        />
                        <FormTextField
                            label="Password"
                            value={password}
                            onChange={(value => setPassword(value))}
                            type="password"
                        />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <FormControlLabel className="checkbox" control={<Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                sx={{
                                    color: "#778490",
                                    '&.Mui-checked': {
                                        color: "#FB4848",
                                    },
                                }}
                            />} label="Remember Me" />
                            <a className="forgotPassword" href="#">Forgot Password?</a>
                        </Stack>
                        <Button onClick={handleSubmit}
                            className="loginButton"
                            size="large"
                            variant="contained"
                            fullWidth disabled={loading}
                        >{loading ? (<CircularProgress className="circleProgress" />) : ("Login")}</Button>
                    </Container>
                </Grid2>
            </Grid2>
            <Footer />
        </div>
    )
}
