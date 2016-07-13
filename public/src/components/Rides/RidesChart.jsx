import React from 'react';
import Recharts from 'recharts';

export default class RidesChart extends React.Component {
    render(){
        console.log(Recharts);
        return (
            <LineChart width={500} height={300} data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
        );
    }
}