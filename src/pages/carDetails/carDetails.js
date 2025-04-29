import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Divider, Grid2 } from "../../MaterialComponents";
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { useSelector } from "react-redux";
import './carDetails.css'
import Footer from '../../components/footer/footer'

export default function CarDetails() {
    const links = [{ label: "Tenders", href: "/tenders" }, { label: "Tender Details", href: "/tenders/tenderDetail" }];
    const current = { label: "Car Details" };
    const [selectedCar, setSelectedCar] = useState([]);
    const carDetail = useSelector((state) => state.tenders.selectedCar)

    useEffect(() => {
        if (carDetail) {
            setSelectedCar(carDetail);
            console.log("==>>", carDetail)
        }
    }, [carDetail]);

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
                                className="carLogo"
                                src="/images/car.png"
                            />
                            <div className="headings">
                                <h3 className="heading">
                                    {selectedCar.car}</h3>
                            </div>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Grid2 container spacing={2} className="details">

                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Chassis Number</p>
                            <h5 className="subText1">{selectedCar.chassis}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Car Color</p>
                            <h5 className="subText1">{selectedCar.color}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Base Price</p>
                            <h5 className="subText1">₹ {selectedCar.base_price}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">EMD Price</p>
                            <h5 className="subText1">₹ {selectedCar.emd_price}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">No of EMD Paid</p>
                            <h5 className="subText1">{selectedCar.emd_paid}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">No of Quote Received</p>
                            <h5 className="subText1">{selectedCar.quote_recived}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Winning Quote</p>
                            <h5 className="subText1">₹ {selectedCar.winning_quote}</h5>
                        </div>
                        <Divider orientation="vertical" sx={{ height: "3rem" }} />
                        <div className="detailsDiv">
                            <p className="subHeading detailsHeading">Car Images</p>
                            <h5 className="subText1"></h5>
                        </div>
                    </Grid2>
                </div>
            </Container>
            <Footer />
        </>
    );
}
