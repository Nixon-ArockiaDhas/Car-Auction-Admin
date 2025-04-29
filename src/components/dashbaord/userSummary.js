import React, { useEffect } from "react";
import { Grid2, Card, CircularProgress } from "../../MaterialComponents";
import './dashboardComponent.css'
import { fetchUserCountData } from "../../slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserSummary() {

    const dispatch = useDispatch();
    const { userCount, loading } = useSelector((state) => state.dashboard);

    const iconMap = {
        totalUsers: './images/icons/totalUsers.svg',
        activeUsers: './images/icons/activeUsers.svg',
        inactiveUsers: './images/icons/inactiveUsers.svg',
    };

    useEffect(() => {
        dispatch(fetchUserCountData());
    }, [dispatch]);

    function formatKey(key) {
        return key.replace(/([A-Z])/g, ' $1').trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return (
        <>
            <Grid2 container rowSpacing={2} size={12}>
                {
                    Object.keys(userCount).map((key, index) => (
                        <Card key={index} className="summary">
                            {loading ? (<CircularProgress />) : (
                                <> <img className="dashboardIcon" src={iconMap[key]} />
                                    <div>
                                        <p className="dashboardHeading">{formatKey(key)}</p>
                                        <h3 className="dashboardCount">{userCount[key]}</h3>
                                    </div></>
                            )}
                        </Card>
                    ))
                }
            </Grid2>
        </>
    )
}
