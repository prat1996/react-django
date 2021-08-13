import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { Grid } from "semantic-ui-react";
import { env } from "./../environment/environment"
import axios from 'axios'

export default function InsuranceList() {
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(
            env.url + 'analysis/?search=All',
        );
        setData(result.data);

    }, []);

    function handleChange(e) {
        axios.get(
            env.url + 'analysis/?search=' + e.target.value,
        ).then((result) => {
            setData(result.data);
        })
    }



    return (
        <>

            <Grid>
                <Grid.Column floated="right" width={4}>
                    <select onChange={(e) => { handleChange(e) }} className="ui dropdown ht-5">
                        <option value="All">All Regions</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                    </select>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={1}>

                </Grid.Column>
                <Grid.Column width={14}>
                    <Chart
                        width={'100%'}
                        height={'580px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Month', 'Sales'],
                            ['Jan', data.Jan],
                            ['Feb', data.Feb],
                            ['Mar', data.Mar],
                            ['Apr', data.Apr],
                            ['May', data.May],
                            ['June', data.June],
                            ['July', data.July],
                            ['Aug', data.Aug],
                            ['Sep', data.Sept],
                            ['Oct', data.Oct],
                            ['Nov', data.Nov],
                            ['Dec', data.Dec],
                        ]}

                        options={{
                            chart: {
                                title: 'Insurance Sales',
                                subtitle: 'Sales, Expenses, and Profit: Jan-Dec',
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </Grid.Column>
                <Grid.Column width={1}>

                </Grid.Column>
            </Grid>
        </>
    );
}

