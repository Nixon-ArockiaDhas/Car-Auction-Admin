import React, { useState, useEffect } from "react";
import "./newCommunity.css";
import Navbar from "../../components/navbar/navbar";
import { Button, CircularProgress, Container, Divider, Grid2, IconButton } from "../../MaterialComponents";
import FormTextField from "../../components/textfield/textfield";
import Footer from "../../components/footer/footer";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../slices/userSlice";
import { states, districts } from "../../utility/stateDistricts";
import { useDispatch, useSelector } from "react-redux";
import { editCommunity } from "../../slices/communitySlice";
import { showSnackbar } from "../../slices/snackbarSlice";

export default function NewCommunity() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const links = [{ label: 'Community Management', href: '/community' }];
    const current = { label: 'New Community Management' };
    const [seller, setSeller] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [location, setLocation] = useState('');
    const [stateLists, setStateLists] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const { users } = useSelector((state) => state.users);
    const [sellerName, setSellerName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(true);

    const stateList = states.map((state) => ({ label: state, value: state }));
    const districtList = districts.filter(elem => elem.state === state);
    const currentDistrict = districtList?.map(elem => elem.dists);
    const dists = currentDistrict[0]?.map((dis) => ({ label: dis, value: dis }));
    const sellerList = sellerName.map((seller) => ({ label: seller, value: seller }))

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        const filteredNames = users
            .filter(user => user.role === 'seller')
            .map(user => `${user.first_name} ${user.last_name}`);
        setSellerName(filteredNames);
    }, [users]);

    const goBack = () => {
        navigate(-1);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && location.trim() !== '') {
            setLocationList([...locationList, location]);
            addLocation();
            setLocation('');
        }
    };

    const handleDelete = (index) => {
        const updatedLocations = locationList.filter((_, i) => i !== index);
        setLocationList(updatedLocations);
    };

    const addLocation = () => {
        let stateIndex = states.findIndex(s => s.name === state);
        if (stateIndex === -1) {
            stateLists.push({
                name: state,
                district_names: [
                    {
                        name: district,
                        locations: [{ location_name: location }]
                    }
                ]
            });
        } else {
            let districtIndex = states[stateIndex].district_names.findIndex(
                d => d.name === district
            );
            if (districtIndex === -1) {
                states[stateIndex].district_names.push({
                    name: district,
                    locations: [{ location_name: location }]
                });
            } else {
                states[stateIndex].district_names[districtIndex].locations.push({
                    location_name: location
                });
            }
        }
        setStateLists([...stateLists]);
        setLocation('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const seller_name = seller;
        const state_names = stateLists;
        try {
            const action = editCommunity({ seller_name, state_names });
            const response = await dispatch(action).unwrap();
            dispatch(
                showSnackbar({
                    message: response.message,
                    severity: response.status === 200 || 201 ? 'success' : 'error'
                })
            );
            setLoading(false);
            goBack();
        } catch (error) {
            console.error('Error during community creation/update:', error);
            setLoading(false);
            dispatch(
                showSnackbar({
                    message: 'Error Creating / Updating Community',
                    severity: 'warning'
                })
            );
        }
    };

    useEffect(() => {
        const isFormIncomplete = !seller || !stateList || !district || !locationList.length
        setDisable(isFormIncomplete);
    }, [seller, stateList, district, locationList]);

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <div className="topHeading">
                    <h1>Community Management</h1><CustomBreadcrumbs links={links} current={current} />
                </div>
                <div className="contentBody newSaleCalendarBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">New Community Management</h3>
                            <p className="subText">Fill the below form to create a new community</p>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <h4 className="formHeading1">1.Basic Details</h4>
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField label="Select Seller" select={true} options={sellerList} value={seller}
                                onChange={(value) => setSeller(value)}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Select State" value={state} select={true} options={stateList}
                                onChange={(value) => setState(value)}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Select District" select={true} options={dists} value={district}
                                onChange={(value) => setDistrict(value)}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Location" value={location} onChange={(value) => setLocation(value)} onKeyDown={handleKeyPress} />
                            {locationList && (
                                <ul className="locationList">
                                    {locationList.map((location, index) => (
                                        <p className="locationText" key={index}>
                                            {location}
                                            <IconButton className="locationDeleteButton" onClick={() => { handleDelete(index) }}>
                                                <img className="locationDelete" src="/images/icons/trash.svg" />
                                            </IconButton>
                                        </p>
                                    ))}
                                </ul>
                            )}
                        </Grid2>
                    </Grid2>
                    <div className="saleCalendarButtonDiv">
                        <Button variant="outlined" onClick={goBack} className="discardButton" >
                            Discard
                        </Button>
                        <Button variant="contained" disabled={disable} loading={loading} loadingPosition="start" onClick={handleSubmit} className="createButton">
                            Create Community
                        </Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}