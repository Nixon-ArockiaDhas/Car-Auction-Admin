import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Divider, Button, IconButton, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from "../../MaterialComponents";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunity, setStateList } from "../../slices/communitySlice";
import DynamicTabs from '../../components/tabBar/tabBar';
import "./communityDetails.css"
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../slices/snackbarSlice";

export default function CommunityDetails() {
    const links = [{ label: "Community Management", href: "/community" }];
    const current = { label: "Community Details" };
    const community = useSelector((state) => state.community.selectedCommunity);
    const [stateNames, setStateNames] = useState([]);
    const navigate = useNavigate();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (community) {
            setStateNames(community.state_names);
            console.log("selected community state name--->", community.state_names);
            setStateList(stateNames);
        }
    }, [community]);

    const goBack = () => {
        navigate(-1);
    };

    const handleDeleteCommunity = async (communityId) => {
        setDeleteLoading(true);
        if (window.confirm(`Are you sure you want to delete this Community?`)) {
            dispatch(deleteCommunity(communityId))
            dispatch(
                showSnackbar({
                    message: "Community Deleted Succesfully",
                    severity: "success"
                })
            )
            setDeleteLoading(false);
            navigate(-1);
        }
    }

    const tabs = stateNames.map(item => ({
        label: item.name,
        content: (
            <>
                <Container maxWidth="xxl" className="tabConatiner">
                    <div>
                        {item.district_names.map(district => (
                            <Accordion className="customAccordian">
                                <AccordionSummary expandIcon={<img src="/images/icons/down.svg" />} aria-controls="panel1-content" id="panel1-header"  >
                                    <div className="accordianHeader">
                                        <img alt="location svg" className="location" src="/images/icons/location.svg" />
                                        <h4 className="districtName">{district.name}</h4>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider sx={{ mb: 4 }} className="divider" />
                                    <div className="locationList">
                                        {district.locations && district.locations.map(location => (
                                            <div key={location.location_id} className="locationDiv">
                                                <p className="locationName">{location.location_name}</p>
                                                {/* <IconButton sx={{ padding: "0" }}><img alt="delete svg" src="/images/icons/delete.svg" /> </IconButton> */}
                                            </div>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </Container>
            </>
        )
    }));


    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer">
                <div className="topHeading">
                    <h1>Community Management</h1>
                    <CustomBreadcrumbs links={links} current={current} />
                </div>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headingDiv">
                            <img alt="logo"
                                className="bankLogo"
                                src="https://cdn.iconscout.com/icon/free/png-256/free-bank-emoji-icon-download-in-svg-png-gif-file-formats--money-saving-building-travel-places-twemoji-pack-holidays-icons-30720.png"
                            />
                            <div className="headings">
                                <h3 className="heading">
                                    {community.seller_name}
                                </h3>
                                <p className="subText">Seller</p>
                            </div>
                        </div>
                        <div className="detailsButtons">
                            <Button variant="outlined" onClick={() => { handleDeleteCommunity(community._id) }} className="deleteButton">
                                {deleteLoading ? (<CircularProgress className="circleProgressDelete" />) : (
                               <>    <img
                                        src="/images/icons/delete.svg"
                                        className="buttonIcon"
                                        alt="delete"
                                    />
                                 Delete </> 
                                )}
                            </Button>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <DynamicTabs tabs={tabs} />
                    <div className="detailsPageButton">
                        <Button variant="outlined" onClick={goBack} className="discardButton" > Back </Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    )
}