import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Container } from "../../MaterialComponents";

export default function Reports() {
    return (
        <><Navbar/>
        <Container  maxWidth="xxl" className="contentContainer">
             <h1>Reports</h1>
        </Container> 
        </>
    );
}