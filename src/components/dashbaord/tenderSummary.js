import React from "react";
import { Grid2, Card } from "../../MaterialComponents";
import './dashboardComponent.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

export default function TenderSummary() {
    const data = [
        { name: 'April', uv: 58, pv: 24, amt: 24 },
        { name: 'May', uv: 62, pv: 13.98, amt: 22.1 },
        { name: 'June', uv: 47, pv: 98, amt: 22.9 },
        { name: 'July', uv: 32.6, pv: 39.08, amt: 20 },
        { name: 'August', uv: 51.6, pv: 48, amt: 21.81 },
        { name: 'September', uv: 52.6, pv: 38, amt: 25 },
        { name: 'October', uv: 75, pv: 43, amt: 21 },
        { name: 'November', uv: 42.6, pv: 45, amt: 22 },
        { name: 'December', uv: 48, pv: 46, amt: 23 },
        { name: 'January', uv: 56, pv: 47, amt: 24 },
        { name: 'February', uv: 38, pv: 48, amt: 25 },
        { name: 'March', uv: 16, pv: 49, amt: 26 },
    ];

    return (
        <>
            <Grid2 container>
                <Card className="summary">
                    <p className="dashboardSubHeading">Tenders</p>
                    <ResponsiveContainer height={360} className="areaChart">
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="splitColor" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#00D1E9" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#00D1E9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />

                            <XAxis dataKey="name" tick={{ fill: '#778490', fontSize: 13 }} />

                            <YAxis domain={[0, 100]} tick={{ fill: '#778490', fontSize: 13 }} />
                            
                            <Tooltip
                                contentStyle={{ backgroundColor: '#112233', borderColor: '#112233', color: '#A2AFBC', borderRadius: '0.5rem', fontWeight: '500' }}
                                itemStyle={{ color: '#fff', fontWeight: '600' }}
                            />
                            <Area type="monotone" dataKey="uv" stroke="#00D1E9" strokeWidth={2} fill="url(#splitColor)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
            </Grid2>
        </>
    )
}
