import React, { useState, useEffect } from "react";
import "./newSaleCalendar.css";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2 } from "../../MaterialComponents";
import FormTextField from "../../components/textfield/textfield";
import Footer from "../../components/footer/footer";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAndUpdateDate } from "../../utility/dateUtlis";
import { showSnackbar } from "../../slices/snackbarSlice";
import { fetchCommunity } from "../../slices/communitySlice";
import { getSellerList, getStateList, getDistrictList, getLocationList } from "../../utility/locationUtils";
import { handleSaleCalenderSubmit } from "../../handlers/userFormHandlers";

export default function NewSaleCalendar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const links = [{ label: 'Sale Calendar', href: '/saleCalender' }];
    const current = { label: 'New Sale Calendar' };
    const { community } = useSelector((state) => state.community);
    const [sellerID, setSellerID] = useState('');
    const [stateID, setStateID] = useState('');
    const [districtID, setDistrictID] = useState('');
    const [locationID, setLocationID] = useState('');
    const [occurTime, setOccurTime] = useState(new Date().toTimeString().split(' ')[0].slice(0, 5) || '');
    const [occurDate, setOccurdate] = useState(new Date().toISOString().split('T')[0] || '');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0] || '');
    const [endTime, setEndTime] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const sellerList = getSellerList(community);
    const [stateList, setStateList] = useState(getStateList(community, sellerID));
    const [districtList, setDistrictList] = useState(getDistrictList(community, sellerID, stateID));
    const [locationList, setLocationList] = useState(getLocationList(community, sellerID, stateID, districtID));

    const [stateName, setStateName] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        dispatch(fetchCommunity());
    }, [dispatch]);

    useEffect(() => {
        setStateList(getStateList(community, sellerID));
        setDistrictList(getDistrictList(community, sellerID, stateID));
        setLocationList(getLocationList(community, sellerID, stateID, districtID));
    }, [sellerID, community, stateID, districtID]);

    useEffect(() => {
        const isFormIncomplete = !sellerID || !stateID || !districtID || !locationID || 
        !occurDate || !occurTime || !endDate || !endTime;

        setButtonDisabled(isFormIncomplete);
    }, [sellerID, stateID, districtID, locationID, occurDate, occurTime, endDate, endTime]);


    const goBack = () => {
        navigate(-1);
    };

    const validateEndTime = (occurDate, occurTime, endDate, endTime) => {
        if (!occurDate || !occurTime || !endDate || !endTime) {
            return true;
        }
        const startDateTime = new Date(`${occurDate}T${occurTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        if (endDateTime <= startDateTime) {
            return false;
        }
        return true;
    };

    const handleEndTimeChange = (value) => {
        setEndTime(value);
        if (!validateEndTime(occurDate, occurTime, endDate, value)) {
            dispatch(showSnackbar({ message: 'End Time should be greater than start Time', severity: 'error' }));
            setEndTime('');
        }
    };

    const saleCalenderSubmit = async (e) => {
        setButtonLoading(true);
        const saleCalenderData = {
            seller_name: sellerName, state: stateName, district: districtName, location: locationName,
            occurs_date_and_time: `${occurDate}T${occurTime}`, end_date_and_time: `${endDate}T${endTime}`,
        };
        await handleSaleCalenderSubmit(e, dispatch, saleCalenderData, goBack);
        setButtonLoading(false);
    }

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <div className="topHeading">
                    <h1>Sale Calendar</h1><CustomBreadcrumbs links={links} current={current} />
                </div>
                <div className="contentBody newSaleCalendarBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">New Sale Calendar</h3>
                            <p className="subText">Fill the below form to create a new sale Calendar</p>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <h4 className="formHeading1">1.Basic Details</h4>
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField label="Select Seller" select={true}  options={sellerList} value={sellerID}
                                onChange={(value) => {
                                    setSellerID(value);
                                    const selectedSeller = sellerList.find((seller) => seller.value === value);
                                    setSellerName(selectedSeller ? selectedSeller.label : '');
                                }} />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Choose State" select={true}  options={stateList} value={stateID}
                                onChange={(value) => {
                                    setStateID(value);
                                    const selectedState = stateList.find((state) => state.value === value);
                                    setStateName(selectedState ? selectedState.label : '');
                                }} />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Choose District" select={true}  options={districtList} value={districtID}
                                onChange={(value) => {
                                    setDistrictID(value);
                                    const selectedDistrict = districtList.find((district) => district.value === value);
                                    setDistrictName(selectedDistrict ? selectedDistrict.label : '');
                                }} />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Choose Location" select={true}  options={locationList} value={locationID}
                                onChange={(value) => {
                                    setLocationID(value);
                                    const selectedLocation = locationList.find((location) => location.value === value);
                                    setLocationName(selectedLocation ? selectedLocation.label : '');
                                }} />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField type="date" label="Tender Occurs Date" value={checkAndUpdateDate(occurDate)}
                                onChange={(value) => setOccurdate(value)} inputProps={{ min: new Date().toISOString().split('T')[0] }}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Tender Occurs Time" type="time" value={occurTime}
                                onChange={(value) => setOccurTime(value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField type="date" label="Tender Occurs Date" value={checkAndUpdateDate(endDate)}
                                onChange={(value) => setEndDate(value)} inputProps={{ min: occurDate }}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField label="Tender Occurs Time" type="time" value={endTime}
                                onChange={(value) => handleEndTimeChange(value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3} sx={{ display: "flex", alignItems: "center" }}>
                            <Button className="saleCalendarUpload " component="label" role={undefined} variant="outlined" tabIndex={-1} >
                                Click to upload Sale Calendar
                                <input type="file" onChange={(event) => console.log(event.target.files)} hidden />
                                <img style={{ marginLeft: "8rem" }} src="/images/icons/Paperclip.svg" />
                            </Button>
                        </Grid2>
                    </Grid2>
                    <div className="saleCalendarButtonDiv">
                        <Button variant="outlined" onClick={goBack} className="discardButton" >
                            Discard
                        </Button>
                        <Button variant="contained" loading={buttonLoading} disabled={buttonDisabled} loadingPosition="start" className="createButton" onClick={saleCalenderSubmit}>
                            Create Sale Calendar
                        </Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}
