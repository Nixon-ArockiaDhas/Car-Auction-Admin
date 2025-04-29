import React, { useState, useEffect } from "react";
import "./newUsers.css";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2, } from "../../MaterialComponents";
import FormTextField from "../../components/textfield/textfield";
import Footer from "../../components/footer/footer";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostalData } from '../../slices/pincodeSlice';
import { showSnackbar } from "../../slices/snackbarSlice";
import { userRoles, status } from "../../utility/dropdownValues";
import { handleSubmit } from "../../handlers/userFormHandlers";

export default function NewUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.selectedUser);
    const { postOffices, loading, error } = useSelector((state) => state.postal);
    const links = [{ label: 'Users', href: '/users' }];
    const current = { label: 'New User' };
    const editUser = {label:'Edit User'}
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [alternateMobile, setAlternateMobile] = useState('');
    const [userRole, setUserRole] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [password, setPassword] = useState('');
    const BUYER = 'buyer';
    const location = useLocation();
    const { edit } = location.state || {};
    const [buttonLoading, setButtonLoading] = useState(false);
    const userList = userRoles.map((role) =>({ label: role.label, value: role.value }));
    const statusList = status.map((sts)=>({label: sts.label, value:sts.value}));

    useEffect(() => {
        if (user && edit) {
            const roleValue = userRoles.find(option => option.value === user.role);
            const statusValue = status.find(option => option.value === user.status);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setMobileNumber(user.mobile_number);
            setUserRole(roleValue.value);
            setAlternateMobile(user.alternate_number)
            setAadharNumber(user.aadhar);
            setPanNumber(user.pan);
            setPincode(user.pincode);
            setCity(user.city);
            setState(user.state);
            setUserStatus(statusValue.value);
        }
    }, [user]);

    useEffect(() => {
        if (pincode.length === 6) {
            console.log("Dispatching fetchPostalData for pincode:", pincode);
            dispatch(fetchPostalData(pincode));
        }
    }, [pincode, dispatch]);

    useEffect(() => {
        if (postOffices.length > 0) {
            dispatch(
                showSnackbar({
                    message: 'Pincode found successfully', severity: 'success',
                })
            );
            const firstPostOffice = postOffices[0];
            const circle = firstPostOffice.Circle;
            const district = firstPostOffice.District;
            setState(circle);
            setCity(district);
        }else if(postOffices.length === 0 && pincode.length === 6){
            dispatch(
                showSnackbar({
                    message: 'Pincode not found. Please enter a valid pincode',  severity: 'error',
                })
            );
        }
    }, [postOffices]);
    
    const goBack = () => {
        navigate(-1);
    };

    const handleFormSubmit = async (e) => {
        setButtonLoading(true);
        const userDetails = {
            user_id: user?.user_id || '', first_name: firstName, last_name: lastName, email: email, 
            password: password || '', mobile_number: mobileNumber, alternate_number: alternateMobile || '', 
            pincode: pincode, city: city, state: state, pan: panNumber || '', aadhar: aadharNumber || '', 
            role: userRole, status: userStatus || ''
        };    
        await handleSubmit(e, dispatch, userDetails, edit, user._id, goBack);
        setButtonLoading(false);
    };
    

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <div className="topHeading">
                    <h1>Users</h1> <CustomBreadcrumbs links={links} current={edit ? editUser: current} />
                </div>
                <div className="contentBody newSaleCalendarBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">{edit ? "Edit User" : "New User"}</h3>
                            <p className="subText">{edit ? "Update the fields to revise the existing user." : "Fill the below form to create a new user"}</p>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <h4 className="formHeading1">1.Basic Details</h4>
                    <Grid2 container spacing={2} className="tenderGrid">
                        
                        <Grid2 size={3}>
                            <FormTextField label="First Name" value={firstName} onChange={(value) => setFirstName(value)} />
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="Last Name" value={lastName} onChange={(value) => setLastName(value)} />
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="Email ID" value={email} onChange={(value) => setEmail(value)} validateEmail />
                        </Grid2>

                        {edit && (
                            <Grid2 size={3}>
                                <FormTextField label="Change Password" validatePassword value={password} type="password"
                                    onChange={(value) => setPassword(value)} />
                            </Grid2>
                        )}

                        <Grid2 size={3}>
                            <FormTextField label="Contact Number" value={mobileNumber} onChange={(value) => setMobileNumber(value)} validateNumber />
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="Alternate Contact Number" value={alternateMobile} onChange={(value) => setAlternateMobile(value)} validateNumber/>
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="Pin Code" value={pincode} onChange={(value) => setPincode(value)} />
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="Town/City" disabled value={city} onChange={(value) => setCity(value)} />
                        </Grid2>

                        <Grid2 size={3}>
                            <FormTextField label="State" disabled value={state} onChange={(value) => setState(value)} />
                        </Grid2>

                        {edit && (
                            <Grid2 size={3}>
                                <FormTextField label="User Status" select={true} value={userStatus} options={statusList}
                                    onChange={(value) => setUserStatus(value)} />
                            </Grid2>
                        )}
                    </Grid2>
                    <h4 className="formHeading1">2.User Role</h4>
                    <Grid2 container spacing={2} className="tenderGrid">

                        <Grid2 size={3}>
                            <FormTextField label="User Role" select={true} options={userList} value={userRole}
                                onChange={(value) => setUserRole(value)} />
                        </Grid2>

                        {userRole === BUYER && (
                            <>
                                <Grid2 size={3}>
                                    <FormTextField label="Pan Number" value={panNumber} validatePAN onChange={(value) => setPanNumber(value)} />
                                </Grid2>

                                <Grid2 size={3}>
                                    <FormTextField label="Aadhar Number" value={aadharNumber} validateAadhaar onChange={(value) => setAadharNumber(value)} />
                                </Grid2>

                                <Grid2 size={3}>
                                    <FormTextField label="OTP" disabled />
                                </Grid2>

                                <Grid2 size={3} sx={{ display: "flex", alignItems: "center" }}>
                                    <Button className="saleCalendarUpload " component="label" role={undefined} variant="outlined" tabIndex={-1}
                                    > Click to upload Any Government Id
                                        <input
                                            type="file" hidden
                                            onChange={(event) => console.log(event.target.files)} />
                                        <img style={{ marginLeft: "8rem" }} src="/images/icons/Paperclip.svg" />
                                    </Button>
                                </Grid2></>
                        )}
                    </Grid2>
                    <div className="saleCalendarButtonDiv">
                        <Button variant="outlined" onClick={goBack} className="discardButton" > Discard </Button>
                        <Button variant="contained" loading={buttonLoading} loadingPosition="start" className="createButton" onClick={handleFormSubmit}>
                         {edit ? "Update User" : "Create New User"}
                        </Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}