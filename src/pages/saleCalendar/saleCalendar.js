import React, { useState, useEffect, } from "react";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2 } from "../../MaterialComponents";
import './saleCalendar.css';
import FormTextField from "../../components/textfield/textfield";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleCalendar, deleteSaleCalendar } from "../../slices/saleCalenderSlice";
import DataTable from "../../components/table/table";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../slices/snackbarSlice";
import Footer from "../../components/footer/footer";

export default function SaleCalendar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { saleCalendar } = useSelector((state) => state.saleCalendar);
    const [localSaleCalender, setLocalSaleCalender] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const role = localStorage.getItem("role");

    useEffect(() => {
        dispatch(fetchSaleCalendar());
    }, [dispatch]);

    useEffect(() => {
        if (saleCalendar.length > 0) {
            console.log("Sale Calender Page -->", saleCalendar);
            setLocalSaleCalender(saleCalendar);
        }
    }, [saleCalendar])

    const filterSaleCalendar = localSaleCalender.filter((saleCalendar) => {
        const occursDate = new Date(saleCalendar.occurs_date_and_time);
        const [day, month, year] = selectedDate.split('/');
        const selected = selectedDate ? new Date(`${year}-${month}-${day}`) : null;
        return (
            (
                (saleCalendar.seller_name && saleCalendar.seller_name.toLowerCase().includes(searchText.toLowerCase())) ||
                (saleCalendar.location && saleCalendar.location.toLowerCase().includes(searchText.toLowerCase())) ||
                (saleCalendar.tender_id && saleCalendar.tender_id.toString().includes(searchText))
            ) &&
            (!selected || (!isNaN(occursDate.getTime()) && occursDate.toDateString() === selected.toDateString()))
        );
    });

    const newSaleCalendar = () => {
        navigate('/saleCalender/newSaleCalendar');
    }

    const handleDeleteSaleCalendar = (id) => {
        if (window.confirm(`Are you sure you want to delete this Sale Calendar?`)) {
            const action = deleteSaleCalendar(id);
            dispatch(action).unwrap()
                .then(() => {
                    dispatch(
                        showSnackbar({
                            message: "Sale Calendar deleted successfully!",
                            severity: "success"
                        }));
                })
                .catch((error) => {
                    dispatch(
                        showSnackbar({
                            message: `Error deleting Sale Calendar: ${error.message}`,
                            severity: "error"
                        }));
                });
        }
    };

    const handleClear = () => {
        setSelectedDate('');
        setLocalSaleCalender(saleCalendar);
    }

    return (
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <h1>Sale Calendar</h1>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">Upcomming Tenders</h3>
                            <p className="subText">Display the upcoming tenders</p>
                        </div>
                        { (role === 'superadmin' || role === 'admin')  && (
                            <Button variant="contained" onClick={newSaleCalendar} className="newTenderButton"><img src="images/icons/add.svg" alt="addIcon" /> New Sale Calendar</Button>

                        )}
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField label="search" type="search" value={searchText}
                                onChange={(value) => setSearchText(value)} />
                        </Grid2>
                        <Grid2 size={2}>
                            <FormTextField type="date" label="Select Date" value={selectedDate} onChange={(value) => setSelectedDate(value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Grid2>
                        {selectedDate && (
                            <Grid2 alignItems={"center"} display={"flex"}>
                                <Button onClick={handleClear} color="error" >Clear</Button>
                            </Grid2>
                        )}
                    </Grid2>
                    <DataTable
                        dataList={filterSaleCalendar}
                        download={true}
                        deleteRow={handleDeleteSaleCalendar}
                    />
                </div>
            </Container>
            <Footer />
        </>
    )
}