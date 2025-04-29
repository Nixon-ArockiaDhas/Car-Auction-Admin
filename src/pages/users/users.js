import React, { useState, useEffect } from "react";
import { Container, Divider, Grid2, Button } from "../../MaterialComponents";
import Footer from "../../components/footer/footer";
import FormTextField from "../../components/textfield/textfield";
import Navbar from "../../components/navbar/navbar";
import DataTable from "../../components/table/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSelectedUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [localUsers, setLocalUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const user = localStorage.getItem('role');
    const roles = new Set(['superadmin', 'admin']);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (users.length > 0) {
            console.log("users", localUsers);
            setLocalUsers(users);
            console.log("user role-->" ,user)
        }
    }, [users]);

    const filterUsers = localUsers.filter((user) => {
        return (
            String(user.user_id).includes(searchText) ||
            user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase()) ||
            user.mobile_number.toLowerCase().includes(searchText.toLowerCase()) ||
            user.state.toLowerCase().includes(searchText.toLowerCase()) ||
            user.city.toLowerCase().includes(searchText.toLowerCase()) ||
            user.role.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const ViewUser = (row) => {
        navigate('/users/userDetails');
        dispatch(setSelectedUser(row));
    };

    const newUser = () => {
        navigate('/users/newUsers')
    }

    return (
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <h1>Users</h1>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">Overall Users</h3>
                            <p className="subText">Display the Users which are all available</p>
                        </div>
                        {user && roles.has(user) && (
                        <Button variant="contained" onClick={newUser} className="newTenderButton"><img src="images/icons/add.svg" alt="addIcon" /> New User</Button>
                        )}
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField
                                label="search"
                                type="search"
                                value={searchText}
                                onChange={(value) => setSearchText(value)} />
                        </Grid2>
                    </Grid2>
                    <DataTable
                        dataList={filterUsers}
                        view={ViewUser}
                    />
                </div>
            </Container>
            <Footer />
        </>
    );
}