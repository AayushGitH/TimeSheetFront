import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signupapi } from '../services/home_service';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const Signupdemo = () => {
    const navigate=useNavigate();

    const [data, setData] = useState({
      empName: '',
      empEmail: '',
      role: '',
      password: '',
      empDepart: '',
      address: ''
    })
  
    useEffect(() => {
      // console.log(data)
    }, [data])
  
    //Dynamic Setting the values
    const handleChange = (event, property) => {
      setData({ ...data, [property]: event.target.value })
    }
  
    //reset form data
    const resetData = () => {
      setData({
        empName: null,
        empEmail: null,
        role: null,
        password: null,
        empDepart:null,
        address: null
      })
      // setError({
      //   errors: error,
      //   isError: false
      // })
    }
  
    //submit form function
    const submitForm = (event) => {
      event.preventDefault()
  
  
      //call server api to send data
      signupapi(data).then((resp) => {
        // console.log(resp);
        console.log("Success to register");
        toast.success("User is registered successfully. I.D.=" + resp.empId)
        setData({
          empName: '',
          empEmail: '',
          role: '',
          password: '',
          empDepart: '',
          address: ''
        })
        navigate("/login")
        // return <Navigate to={"/login"}/>
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data.message);
        if(error.response.data.message)
        {
          toast.error(error.response.data.message)
        }
        // else
        // if(error.response)
        // {
        //   toast.error(error.response)
        // }
        else
        {
          toast.error("Something went wrong on server")
        }
        console.log("Error in register");
  
        //handle Error in proper way
        setError({
          errors: error,
          isError: true
        })
      })
    }
  
    const [error, setError] = useState({
      errors: {},
      isError: false
    })
  
     
    return (
      <div>
        <>
  
          <Container className="mb-4">
            <Row className="mt-3">
              <Col sm={{ size: 6, offset: 3 }}>
                    {/* <pre>{JSON.stringify(data,undefined,2)}</pre> */}
                <Card >
                  <CardHeader className="text-center">
                    <h3> SignUp Here !!</h3>
                  </CardHeader>
                  <CardBody>
                    {/* creating form */}
                    <Form onSubmit={submitForm}>
                      {/* Name field */}
                      <FormGroup>
                        <Label for="name">Enter Employee Name</Label>
                        <Input
                          type="text"
                          placeholder="Enter name here"
                          id="name"
                          onChange={(e) => handleChange(e, "empName")}
                          value={data.empName}
                          invalid={error.errors?.response?.data?.empName ? true : false}
                          required
                        />
  
                        <FormFeedback>
                          {error.errors?.response?.data?.empName}
                        </FormFeedback>
                      </FormGroup>
  
                      {/* email field */}
                      <FormGroup>
                        <Label for="email">Enter Email</Label>
                        <Input
                          type="email"
                          placeholder="Enter here"
                          id="email"
                          onChange={(e) => handleChange(e, "empEmail")}
                          value={data.empEmail}
                          invalid={
                            error.errors?.response?.data?.empEmail ? true : false
                          }
                          required
                        />
  
                        <FormFeedback>
                          {error.errors?.response?.data?.empEmail}
                        </FormFeedback>
                      </FormGroup>
  
                      {/* password field */}
                      <FormGroup>
                        <Label for="employee-password">Enter password</Label>
                        <Input
                          type="password"
                          placeholder="Enter here"
                          id="employee-password"
                          onChange={(e) => handleChange(e, "password")}
                          value={data.password}
                          invalid={
                            error.errors?.response?.data?.password ? true : false
                          }
                          required
                        />
  
                        <FormFeedback>
                          {error.errors?.response?.data?.password}
                        </FormFeedback>
                      </FormGroup>
  
                      {/* Role field */}
                      <FormGroup>
                        <Label for="role">Select Role of Employee</Label>
                        <Input type="select" name="select" id="selectRole" onChange={(e) => handleChange(e, 'role')} value={data.role} invalid={
                          error.errors?.response?.data?.role ? true : false
                        } >
                          <option value="">Select your role</option>
                          <option value="EMPLOYEE">Employee</option>
                          <option value="ADMIN">Admin</option>
                        </Input>
  
                        <FormFeedback>
                          {error.errors?.response?.data?.role}
                        </FormFeedback>
                      </FormGroup>
  
                      {/* Address field */}
                      <FormGroup>
                        <Label for="address">Enter Employee Address </Label>
                        <Input
                          type="text"
                          placeholder="Enter address here"
                          id="adress"
                          onChange={(e) => handleChange(e, "address")}
                          value={data.address}
                          invalid={
                            error.errors?.response?.data?.address ? true : false
                          }
                          required
                        />
                        <FormFeedback>
                          {error.errors?.response?.data?.address}
                        </FormFeedback>
                      </FormGroup>
  
                      {/* Role field */}
                      <FormGroup>
                        <Label for="role">Select Department of Employee</Label>
                        <Input type="select" name="selectDept" id="selectDepartment" onChange={(e) => handleChange(e, 'empDepart')} value={data.empDepart} invalid={
                          error.errors?.response?.data?.empDepart ? true : false
                        }>
                          <option value="">Select your Department</option>
                          <option value="I.T." >I.T.</option>
                          <option value="H.R.">H.R.</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finance">Finance</option>
                        </Input>
  
                        <FormFeedback>
                          {error.errors?.response?.data?.empDepart}
                        </FormFeedback>
                      </FormGroup>
  
                      <Container className="text-center">
                        <Button color="primary">
                          Register
                        </Button>
                        <Button
                          onClick={resetData}
                          color="secondary"
                          type="reset"
                          className="ms-2"
                        >
                          Reset
                        </Button>
                      </Container>
                      <Container className="text-center">
                        <div className="text-center">
                          <Link to="/login" type="button" className="text-center mt-4 btn btn-outline-dark">Have already an account?</Link>
                        </div>
                      </Container>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      </div>
    )
  }

export default Signupdemo
