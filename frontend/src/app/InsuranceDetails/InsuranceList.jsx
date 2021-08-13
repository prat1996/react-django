import React, { useState, useEffect } from 'react';
import { Table, Grid, Search } from "semantic-ui-react";
import EditInsurance from './EditInsurance';
import moment from 'moment';
import axios from 'axios'
import { env } from "./../environment/environment"

export default function InsuranceList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false)
  const [policy, policyData] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(async () => {
    setLoading(true)
    const result = await axios(
      env.url + 'view',
    );
    setData(result.data);
    setLoading(false)
  }, []);

  function handleSearch(e) {
    setLoading(true)
    axios.get(
      env.url + 'view/?search=' + e.target.value,
    ).then((result) => {
      setData(result.data);
      setLoading(false)
    })
  }

  function editPolicy(data) {
    setOpen(true)
    policyData(data)
  }


  return (
    <>
      <EditInsurance open={open} setOpen={setOpen} data={policy} />

      <Grid>
        <Grid.Column only='computer' floated="right" computer={4}>
          <Search
            onSearchChange={(e) => handleSearch(e)}
            showNoResults={false}
            placeholder="Search..."
          />
        </Grid.Column>
      </Grid>
      <Grid className="scroll-table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Policy Id</Table.HeaderCell>
              <Table.HeaderCell>Customer Id</Table.HeaderCell>
              <Table.HeaderCell>Date of Purchase</Table.HeaderCell>
              <Table.HeaderCell>Fuel</Table.HeaderCell>
              <Table.HeaderCell>VEHICLE_SEGMENT</Table.HeaderCell>
              <Table.HeaderCell>Premium</Table.HeaderCell>
              <Table.HeaderCell>bodily injury liability</Table.HeaderCell>
              <Table.HeaderCell>personal injury</Table.HeaderCell>
              <Table.HeaderCell>property damage liability</Table.HeaderCell>
              <Table.HeaderCell>comprehensive</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Income</Table.HeaderCell>
              <Table.HeaderCell>Region</Table.HeaderCell>
              <Table.HeaderCell>Marital Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {data.map((data, key) => (
            <Table.Body key={key}>
              <Table.Row>
                <Table.Cell><i aria-hidden="true" onClick={() => editPolicy(data)} class="edit disabled icon"></i></Table.Cell>
                <Table.Cell>{data.policy_id}</Table.Cell>
                <Table.Cell>{data.customer_id}</Table.Cell>
                <Table.Cell>{moment(data.date_of_purchase).format("ll")}</Table.Cell>
                <Table.Cell>{data.fuel}</Table.Cell>
                <Table.Cell>{data.veichel_segment}</Table.Cell>
                <Table.Cell>{data.premium}</Table.Cell>
                <Table.Cell>{data.bodily_injury_liability == 0 ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>{data.personal_injury_protection == 0 ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>{data.property_damage_liability == 0 ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>{data.comprehensive == 0 ? "No" : "Yes"}</Table.Cell>
                <Table.Cell>{data.customer_gender}</Table.Cell>
                <Table.Cell>{data.customer_income_group}</Table.Cell>
                <Table.Cell>{data.customer_region}</Table.Cell>
                <Table.Cell>{data.customer_marital_status == 0 ? "Single" : "Married"}</Table.Cell>
              </Table.Row>
            </Table.Body>

          ))}

        </Table>
        {isLoading && <div class="ui active centered inline loader"></div>}
      </Grid>

    </>
  );
}

