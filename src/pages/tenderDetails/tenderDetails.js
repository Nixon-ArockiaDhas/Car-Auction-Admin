import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Divider, Button, Grid2, Card, CardContent } from "../../MaterialComponents";
import "./tenderDetails.css";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCar } from "../../slices/tenderSlice";

export default function TenderDetails() {
    const links = [{ label: "Tenders", href: "/tenders" }];
    const current = { label: "Tender Details" };
    const [carDetails, setCarDetails] = useState([]);
    const [hoverCard, setHoverCard] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const tender = useSelector((state) => state.tenders.selectedTender);

    useEffect(() => {
        if (tender) {
            setCarDetails(tender.cars);
        }
    }, [tender]);

    const openCarDetails = (car) => {
        navigate('/tenders/tenderDetail/carDetail');
        dispatch(setSelectedCar(car))
    }

    const getStatusDisplay = (status) => {
        switch (status) {
            case 'live':
                return { text: 'Live', className: 'live' };
            case 'finished':
                return { text: 'Finished', className: 'finished' };
            case 'cancelled':
                return { text: 'Cancelled', className: 'cancelled' };
            default:
                return { text: 'Upcoming', className: 'upcoming' };
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="xxl" className="contentContainer">
                <div className="topHeading">
                    <h1>Tenders</h1>
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
                                    {tender.tender_name}
                                    <span className={`tenderStatus ${getStatusDisplay(tender.status).className}`}>
                                        {getStatusDisplay(tender.status).text}
                                    </span> </h3>
                                <p className="subText">{tender.location}</p>
                            </div>
                        </div>
                        <div className="detailsButtons">
                            <Button variant="contained" className="donwloadButton">
                                <img
                                    src="/images/download.svg"
                                    className="buttonIcon"
                                    alt="download"
                                />
                                Download
                            </Button>
                            <Divider orientation="vertical" sx={{ height: "2.5rem" }} />
                            <Button variant="contained" className="editButton">
                                <img
                                    src="/images/icons/edit.svg"
                                    className="buttonIcon"
                                    alt="edit"
                                />
                                Edit
                            </Button>
                            <Button variant="outlined" className="deleteButton">
                                <img
                                    src="/images/icons/delete.svg"
                                    className="buttonIcon"
                                    alt="delete"
                                />
                                Delete
                            </Button>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Grid2 container spacing={2} className="details">

                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Tender Id</p>
                            <h5 className="subText1">{tender.tender_id}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />

                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Occurs Date and Time</p>
                            <h5 className="subText1">{tender.date_time}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />

                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Ends Date and Time</p>
                            <h5 className="subText1">{tender.date_time}</h5>
                        </div>
                    </Grid2>
                    <Container maxWidth="xxl" className="cardContainer">
                        <div>
                            {carDetails.map((car) => (
                                <Card className="card" key={car.id}
                                    onMouseEnter={() => setHoverCard(car.id)}
                                    onMouseLeave={() => setHoverCard(null)}
                                    hover >
                                    <CardContent>
                                        <Grid2 container spacing={2}>
                                            <Grid2 item size={3}>
                                                <div className="imageDiv">
                                                    <img className="carImage" src="/images/car.png" />
                                                    <p className="carName">{car.car}</p>
                                                </div>
                                            </Grid2>
                                            <Grid2 item size={2}>
                                                <div className="detailsDiv">
                                                    <p className="detailsHeading">Chassis Number</p>
                                                    <h5 className="detailsSubText">{car.chassis}</h5>
                                                </div>
                                            </Grid2>
                                            <Grid2 item size={1.5}>
                                                <div className="detailsDiv">
                                                    <p className="detailsHeading">Car Color</p>
                                                    <h5 className="detailsSubText">{car.color}</h5>
                                                </div>
                                            </Grid2>

                                            <Grid2 item size={1.5}>
                                                <div className="detailsDiv">
                                                    <p className="detailsHeading">Base Price</p>
                                                    <h5 className="detailsSubText">₹ {car.base_price}</h5>
                                                </div>
                                            </Grid2>

                                            <Grid2 item size={1.5}>
                                                <div className="detailsDiv">
                                                    <p className="detailsHeading">EMD Price</p>
                                                    <h5 className="detailsSubText">₹ {car.emd_price}</h5>
                                                </div>
                                            </Grid2>

                                            <Grid2 item size={1.5}>
                                                <div className="detailsDiv">
                                                    <p className="detailsHeading">No of EMD Paid</p>
                                                    <h5 className="detailsSubText">{car.emd_paid}</h5>
                                                </div>
                                            </Grid2>

                                            <Grid2 item size={1} sx={{ display: "flex", alignItems: "center" }}>
                                                {hoverCard === car.id && (
                                                    <Button className="cardView" onClick={() => { openCarDetails(car) }}>
                                                        <img className="viewButtonIcon" src="/images/icons/view.svg" />
                                                        View
                                                    </Button>
                                                )}
                                            </Grid2>
                                        </Grid2>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </Container>
                </div>
            </Container>
        </>
    );
}
