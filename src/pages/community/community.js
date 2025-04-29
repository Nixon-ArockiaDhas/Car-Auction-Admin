import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { Button, Container, Divider, Grid2 } from "../../MaterialComponents";
import FormTextField from "../../components/textfield/textfield";
import { useDispatch,useSelector } from "react-redux";
import DataTable from "../../components/table/table";
import Footer from "../../components/footer/footer";
import { useNavigate  } from "react-router-dom";
import {fetchCommunity, setSelectedCommunity} from '../../slices/communitySlice';

export default function Community(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [communityList, setCommunityList] = useState([]);
    const {community,loading,error} = useSelector((state)=>state.community);
    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        dispatch(fetchCommunity());
    },[dispatch]);

    useEffect(()=>{
        if(community.length>0){
            console.log("community page--->",community);
            setCommunityList(community);
        }
    },[community]);

    const filterCommunity = communityList.filter((community) => {
        return (
            community.seller_name && 
            community.seller_name.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    

      const newCommuity = ()=>{
        navigate('/community/newCommunity');
      }

      const viewCommunity=(row)=>{
        navigate('/community/communityDetails');
        dispatch(setSelectedCommunity(row));
      }

    return(
        <><Navbar />
            <Container maxWidth="xxl" className="contentContainer" >
                <h1>Community Management</h1>
                <div className="contentBody">
                    <div className="topContent">
                        <div className="headings">
                            <h3 className="heading">Locations</h3>
                            <p className="subText">Display the locations of the seller which are all available</p>
                        </div>
                        <Button variant="contained" onClick={newCommuity}  className="newTenderButton"><img src="images/icons/add.svg" alt="addIcon" /> New Community</Button>
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
                    </Grid2>
                    <DataTable 
                    dataList={filterCommunity}
                    view={viewCommunity}
                    />
                </div>
            </Container>
            <Footer />
        </>
    )
}