import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Grid2 } from "../../MaterialComponents";
import UserSummary from "../../components/dashbaord/userSummary";
import SaleCalendarSummary from "../../components/dashbaord/saleCalendarSummary";
import TenderSummary from "../../components/dashbaord/tenderSummary";
import Footer from "../../components/footer/footer";

export default function Dashboard() {
    const role = localStorage.getItem("role");
    let value = '';

    if (role) {
        if (role === 'superadmin' || role === 'admin') {
            value = 10.5;
        } else {
            value = 12;
        }
    }

    return (
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer">
                <h1>Dashboard</h1>
                <Grid2 container rowSpacing={2} columnSpacing={2}>
                    <Grid2 size={value} container direction="column" columnSpacing={2}>
                        <SaleCalendarSummary />
                        <TenderSummary />
                    </Grid2>
                    {
                        (role === 'superadmin' || role === 'admin') && (
                            <Grid2 size={1.5}>
                                <UserSummary />
                            </Grid2>
                        )
                    }
                </Grid2>
            </Container>
            <div className="pageFooter" >
                <Footer />
            </div>
        </>
    );
}