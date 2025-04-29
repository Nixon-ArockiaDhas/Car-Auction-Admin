import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2, IconButton } from "../../MaterialComponents";
import FormTextField from "../../components/textfield/textfield";
import Footer from "../../components/footer/footer";
import './tenderCRUD.css';
import CustomBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import DynamicForms from "../../components/dynamicForms/dynamicForms";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export default function NewTender() {
    const navigate = useNavigate();
    const links = [{ label: 'Tenders', href: '/tenders' }];
    const current = { label: 'New Tender' };
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedData, setParsedData] = useState({});

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUpload = () => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const dataJson = XLSX.utils.sheet_to_json(worksheet);
                setParsedData(dataJson);
            } catch (error) {
                console.error("Error parsing Excel file:", error);
            }
        };
        reader.onerror = () => {
        };
        reader.readAsArrayBuffer(selectedFile);
    };

    const goBack = () => {
        navigate(-1); 
      };

    return (
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <div className="topHeading">
                    <h1>Tenders</h1><CustomBreadcrumbs links={links} current={current} />
                </div>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">New Tender</h3>
                            <p className="subText">Fill the below form to make a new tender</p>
                        </div>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <h4 className="formHeading1">1.Basic Details</h4>
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField
                                label="Bank Name"
                                list="hello"
                                id="hello"
                            />
                            <datalist id="hello">
                            <option value="Chrome">chrome</option>
                            </datalist>
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                label="Tender Name"
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                type="date"
                                label="Tender Occurs Date"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                label="Tender Occurs Time"
                                type="time"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                type="date"
                                label="Tender Occurs Date"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                label="Tender Occurs Time"
                                type="time"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <FormTextField
                                label="Select Bank"
                                select
                            />
                        </Grid2>

                    </Grid2>
                    <h4 className="formHeading1">2.Car Details</h4>
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <Button
                                className="uploadButton"
                                component="label"
                                role={undefined}
                                variant="outlined"
                                onChange={handleFileChange}
                                tabIndex={-1}
                            > Click to upload
                                <input
                                    type="file"
                                    onChange={(event) => console.log(event.target.files)}
                                    hidden
                                />
                                <img style={{ marginLeft: "10rem" }} src="/images/icons/Paperclip.svg" />
                            </Button>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ mt: 3, mb: 3 }}>
                        <p className="dividerText"> or add manually </p>
                    </Divider>
                    <DynamicForms fileData={parsedData} />
                    <div className="buttonDiv">
                        <Button variant="outlined" onClick={goBack} className="discardButton" >
                            Discard
                        </Button>
                        <Button variant="contained" className="createButton">
                            Create Tender
                        </Button>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

