import React,{ useState, useEffect } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import moment from 'moment';
import axios from 'axios'
import { env } from "./../environment/environment"

function EditInsurance({open,setOpen,data}) {

  function handleSubmit() {
    axios.post(
      env.url + 'view/',data
    ).then((result) => {
      setOpen(false)
    }
    )
  }

  return (
    
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header></Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Policy Id' value={data.policy_id} placeholder='Policy Id' />
          <Form.Input fluid label='Customer Id' value={data.customer_id} placeholder='Customer Id' />

        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Date of purchase' readOnly value={moment(data.date_of_purchase).format("ll")} placeholder='Date of purchase' />
          <Form.Input fluid label='Fule' value={data.fuel} placeholder='Fule' />

        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Veichel Segment' value={data.veichel_segment} placeholder='Veichel Segment' />
          <Form.Input fluid label='Premium' value={data.premium} max="1000000" placeholder='Premium' />

        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Body Injury Liability' value={data.bodily_injury_liability} placeholder='Body Injury Liability' />
          <Form.Input fluid label='Personal Injury' value={data.personal_injury_protection} placeholder='Personal Injury' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Property Damage Liability' value={data.property_damage_liability} placeholder='Property Damage Liability' />
          <Form.Input fluid label='Comprehensive' value={data.comprehensive} placeholder='Comprehensive' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Gender' value={data.customer_gender} placeholder='Gender' />
          <Form.Input fluid label='Income Group' value={data.customer_income_group} placeholder='Income Group' />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Region' value={data.customer_region} placeholder='Region' />
          <Form.Input fluid label='Marital status' value={data.customer_marital_status} placeholder='Marital status' />
        </Form.Group>
      </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          content="Update"
          labelPosition='right'
          icon='checkmark'
          onClick={() => handleSubmit()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EditInsurance