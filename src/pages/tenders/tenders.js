import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2 } from "../../MaterialComponents";
import './tenders.css';
import FormTextField from "../../components/textfield/textfield";
import { useDispatch,useSelector } from "react-redux";
import { fetchTenders, setSelectedTender } from "../../slices/tenderSlice";
import DataTable from "../../components/table/table";
import Footer from "../../components/footer/footer";
import { useNavigate  } from "react-router-dom";


export default function Tenders() {
    const dispatch = useDispatch();
    const {tenders,loading,error} = useSelector((state) => state.tenders);
    const [localTenders, setLocalTenders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchTenders());
    },[dispatch]);

    useEffect(() => {
        if(tenders.length > 0){
            console.log("Tenders",localTenders);
            setLocalTenders(tenders);
        }
    }, [tenders]);

    const filterTenders = localTenders.filter((tender) => {
        return (
          tender.tender_id.toLowerCase().includes(searchText.toLowerCase()) ||
          tender.bank_name.toLowerCase().includes(searchText.toLowerCase()) ||
          tender.tender_name.toLowerCase().includes(searchText.toLowerCase()) ||
          tender.location.toLowerCase().includes(searchText.toLowerCase())
        );
      });

      const NewTender = ()=>{
        navigate('/tenders/newTender')
      };
      
      const ViewTender = (row)=>{
        navigate('/tenders/tenderDetail');
        dispatch(setSelectedTender(row));
      };

    return (
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <h1>Tenders</h1>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">Overall Tenders</h3>
                            <p className="subText">Display the tenders which are all available</p>
                        </div>
                        <Button variant="contained" onClick={NewTender} className="newTenderButton"><img src="images/icons/add.svg" alt="addIcon" /> New Tender</Button>
                    </div>
                    <Divider sx={{ mt: 3 }} className="divider" />
                    <Grid2 container spacing={2} className="tenderGrid">
                        <Grid2 size={3}>
                            <FormTextField
                                label="search"
                                type="search"
                                value={searchText}
                                onChange={(value) => setSearchText(value)}                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <FormTextField
                                type="date"
                                label="From Date"
                                slotProps={{
                                    inputLabel: {
                                      shrink: true,
                                    },
                                  }}
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <FormTextField
                                type="date"
                                label="To Date"
                                slotProps={{
                                    inputLabel: {
                                      shrink: true,
                                    },
                                  }}
                            />
                        </Grid2>
                    </Grid2>
                    <DataTable 
                    dataList={filterTenders}
                    view={ViewTender}
                    />
                </div>
            </Container>
            <Footer />
        </>
    );
}