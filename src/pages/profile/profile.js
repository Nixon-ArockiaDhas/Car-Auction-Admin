import React, { useEffect, useState } from "react";
import './profile.css';
import Navbar from "../../components/navbar/navbar";
import { Container, Divider, Button, Grid2 } from "../../MaterialComponents";
import Footer from "../../components/footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { changePassowrd, fetchUsers } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import FormTextField from "../../components/textfield/textfield";
import { showSnackbar } from "../../slices/snackbarSlice";

export default function Profile() {
    const dispatch = useDispatch();
    const BUYER = 'buyer';
    const { users } = useSelector((state) => state.users);
    const LOGINED_USER = localStorage.getItem('userEmail');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [passwordFlag, setPsswordFlag] = useState(false);
    const [oldPassword, setOldPasword] = useState('');
    const [newPassword, setNewPasword] = useState('');
    const [confirmPassword, setConfirmPasword] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users) {
            console.log(LOGINED_USER);
            const profile = users.find((user) => user.email === LOGINED_USER);
            setUser(profile);
            console.log("logged in User--->", user);
        }
    }, [users]);

    const userRole = (role) => {
        if (!role) {
            return 'User';
        }
        if (role === 'superadmin') {
            return 'Super Admin';
        }
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const goBack = () => {
        navigate(-1);
        setPsswordFlag(false);
    };
    const discardBtn = () => {
        setPsswordFlag(false);
    }

    const passwordChange = () => {
        setPsswordFlag(true);
    }

    useEffect(() => {
        if (newPassword !== confirmPassword) {
            setError(true);
            setErrorText('Password does not match');
        } else {
            setError(false);
            setErrorText('');
        }
    }, [confirmPassword]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const userObjectId = user._id;
        setButtonLoading(true);
        const password = {
            password: oldPassword,
            newPassword: newPassword
        }; try {
            const action = changePassowrd({ id: userObjectId, password: password });
            await dispatch(action).unwrap();
            dispatch(showSnackbar({ message: 'Password Changed Successfully', severity: 'success' }));
            setButtonLoading(false);
            setPsswordFlag(false);
        } catch (error) {
            dispatch(showSnackbar({ message: 'An error occurred. Please try again.', severity: 'error' }));
            setButtonLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer">
                <div className="topHeading">
                    <h1>Profile</h1>
                </div>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headingDiv">
                            <img className="bankLogo" src="/images/avatar.png" />
                            <div className="headings">
                                <h3 className="heading">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <p className="subText">{userRole(user.role)}</p>
                            </div>
                        </div>
                        <div className="detailsButtons" >
                            <Button variant="contained" className="editButton" onClick={passwordChange}>
                                <img src="/images/icons/lock.svg" className="buttonIcon" alt="edit" />
                                Change Password
                            </Button>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Container maxWidth="xxl" className="tabConatiner profileContainer">
                        <Grid2 container rowSpacing={3} columnSpacing={4} className="userDetailDiv">
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">User ID</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.user_id}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">Email Address</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.email}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">Contact Number</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.mobile_number}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">Alternate Number</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.alternate_number ? user.alternate_number : '-'}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">City/Town</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.city}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">State</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.state}</strong></Grid2>
                            </Grid2>
                            <Grid2 size={4} sx={{ display: "flex" }}>
                                <Grid2 size={6}> <p className="userKey">Pin Code</p></Grid2>
                                <Grid2 size={6}><strong className="userValue">{user.pincode}</strong></Grid2>
                            </Grid2>
                            {user.role === BUYER && (
                                <>
                                    <Grid2 size={4} sx={{ display: "flex" }}>
                                        <Grid2 size={6}> <p className="userKey">PAN Number</p></Grid2>
                                        <Grid2 size={6}><strong className="userValue">{user.pan}</strong></Grid2>
                                    </Grid2>
                                    <Grid2 size={4} sx={{ display: "flex" }}>
                                        <Grid2 size={6}> <p className="userKey">Aadhar Number</p></Grid2>
                                        <Grid2 size={6}><strong className="userValue">{user.aadhar}</strong></Grid2>
                                    </Grid2>
                                    <Grid2 size={4} sx={{ display: "flex" }}>
                                        <Grid2 size={6}> <p className="userKey">Document</p></Grid2>
                                        <Grid2 size={6}><strong className="userValue">-</strong></Grid2>
                                    </Grid2> </>
                            )}
                        </Grid2>
                    </Container>
                    {passwordFlag ? (
                        <> <h4 className="formHeading1">Change Password</h4>
                            <Grid2 container spacing={2} className="tenderGrid">

                                <Grid2 size={3}>
                                    <FormTextField label="Old Password" type='password' value={oldPassword} onChange={(value) => setOldPasword(value)} />
                                </Grid2>

                                <Grid2 size={3}>
                                    <FormTextField label="New Password" type='password' value={newPassword} onChange={(value) => setNewPasword(value)} validatePassword />
                                </Grid2>

                                <Grid2 size={3}>
                                    <FormTextField label="Confrim Password" type='password' helperText={errorText} error={error} value={confirmPassword} onChange={(value) => setConfirmPasword(value)} />
                                </Grid2>
                            </Grid2>
                            <div className="profilePageButton">
                                <Button variant="outlined" onClick={discardBtn} className="discardButton" > Discard </Button>
                                <Button variant="contained" loading={buttonLoading} loadingPosition="start" onClick={handleSubmit} className="createButton">
                                    Change Password
                                </Button>
                            </div> </>
                    ) : (
                        <div className="detailsPageButton">
                            <Button variant="outlined" onClick={goBack} className="discardButton" > Back </Button>
                        </div>
                    )}
                </div>
            </Container>
            <div className="">
                <Footer />
            </div>
        </>
    )
}