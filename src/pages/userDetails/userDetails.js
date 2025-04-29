import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Divider, Button, Grid2 } from "../../MaterialComponents";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import DynamicTabs from '../../components/tabBar/tabBar';
import "./userDetails.css"
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../slices/userSlice";
import { showSnackbar } from "../../slices/snackbarSlice";

export default function UserDetails() {
    const links = [{ label: "Users", href: "/users" }];
    const current = { label: "User Details" };
    const user = useSelector((state) => state.users.selectedUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const BUYER = 'buyer';
    const roles = new Set(['superadmin', 'admin']);
    const LOGINED_USER = localStorage.getItem('role');

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'active':
                return { text: 'Active', className: 'finished' };
            default:
                return { text: 'Inactive', className: 'cancelled' };
        }
    };

    const userRole = (role) => {
        if (role === 'superadmin') {
            return 'Super Admin';
        }
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const UserDetails = () => <div>
        <Container maxWidth="xxl" className="tabConatiner">
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
    </div>

    const tabs = [
        { label: 'Basic Details', content: <UserDetails /> },
        { label: 'Tender History', content: "" },
        { label: 'Payment History', content: "" },
    ];

    const editUser = () => {
        navigate('/users/newUsers', { state: { edit: true } });
    }

    const handleDeleteUser = async (userId) => {
        if (window.confirm(`Are you sure you want to delete this user?`)) {
            dispatch(deleteUser(userId))
            dispatch(
                showSnackbar({
                    message: "User Deleted Succesfully",
                    severity: "success"
                })
            )
            navigate(-1);
        }
    };
    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer">
                <div className="topHeading">
                    <h1>Users</h1>
                    <CustomBreadcrumbs links={links} current={current} />
                </div>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headingDiv">
                            <img
                                className="bankLogo"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-bank-emoji-icon-download-in-svg-png-gif-file-formats--money-saving-building-travel-places-twemoji-pack-holidays-icons-30720.png"
                            />
                            <div className="headings">
                                <h3 className="heading">
                                    {user.first_name} {user.last_name}
                                    <span className={`tenderStatus ${getStatusDisplay(user.status).className}`}>
                                        {getStatusDisplay(user.status).text}
                                    </span>
                                </h3>
                                <p className="subText">{userRole(user.role)}</p>
                            </div>
                        </div>
                        {LOGINED_USER && roles.has(LOGINED_USER) && (
                            <div className="detailsButtons">
                                <Button variant="contained" onClick={editUser} className="editButton">
                                    <img src="/images/icons/edit.svg" className="buttonIcon" alt="edit" />
                                    Edit
                                </Button>
                                <Button variant="outlined" onClick={() => { handleDeleteUser(user._id) }} className="deleteButton">
                                    <img src="/images/icons/delete.svg" className="buttonIcon" alt="delete" />
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <DynamicTabs tabs={tabs} />
                    <div className="detailsPageButton">
                        <Button variant="outlined" onClick={goBack} className="discardButton" > Back </Button>
                    </div>
                </div>
            </Container>
            <div >
                <Footer />
            </div>
        </>
    )
}