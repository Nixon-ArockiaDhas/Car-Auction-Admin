import React, { useEffect } from "react";
import { Grid2, Card, CircularProgress, Tooltip } from "../../MaterialComponents";
import './dashboardComponent.css';
import { fetchSaleCalendarCountData } from "../../slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SaleCalendarSummary() {
    const dispatch = useDispatch();
    const { saleCalendarCount, loading } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchSaleCalendarCountData());
        console.log("SaleCalendarCount", saleCalendarCount);
    }, [dispatch]);

    const total = parseInt(saleCalendarCount.total) || 1; // Avoid division by zero
    const data = [
        { name: 'Ongoing', value: Number(parseInt(saleCalendarCount.ongoing) / total) * 100, fill: '#7DA3FF', count: saleCalendarCount.ongoing },
        { name: 'Upcoming', value: Number(parseInt(saleCalendarCount.upcoming) / total) * 100, fill: '#27DFEE', count: saleCalendarCount.upcoming },
        { name: 'Completed', value: Number(parseInt(saleCalendarCount.completed) / total) * 100, fill: '#27AE60', count: saleCalendarCount.completed },
    ];

    console.log("Data--->", data);

    if (loading) {
        return (
            <Grid2 container>
                <Card className="summary">
                    <CircularProgress />
                </Card>
            </Grid2>
        );
    }

    return (
        <>
            <Grid2 container>
                <Card className="summary">
                    <img className="dashboardIcon" src="./images/icons/saleCalendarIcon.svg" alt="Sale Calendar Icon" />
                    <div className="saleCalenderDiv">
                        <div>
                            <p className="dashboardHeading">Overall Sale Calendar</p>
                            <h3 className="dashboardCount">{saleCalendarCount.total}</h3>
                        </div>
                        <div className="saleCalenderDiv2">
                            {data.map((item, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '2rem' }}>
                                    <div>
                                        <p className="dashboardHeading">{item.name}</p>
                                        <h3 className="dashboardCount">{item.count}</h3>
                                    </div>
                                    <Tooltip title={`${item.value.toFixed(0)}%`} arrow>
                                        <div style={{ position: 'relative' }}>

                                            <CircularProgress variant="determinate" value={100}
                                                className="circular-progress-background" thickness={6} 
                                            />

                                            <CircularProgress variant="determinate" value={item.value}
                                                className="circular-progress-foreground" thickness={6}  sx={{color:item.fill}} />
                                        </div>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </Grid2>
        </>
    );
}
