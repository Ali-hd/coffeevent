import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Card,Button, Form} from 'react-bootstrap'
import jwt from 'jsonwebtoken'
import AllEvents from '../AllEvents/AllEvents'
import Axios from 'axios'
export default class Profile extends Component {
    state = {
        data: [],
        token: '',
        specficData: null,
        edit: false
    }
    componentDidMount() {
        Axios.get('http://localhost:5100/events').then(data => {
            console.log(data.data);

            data= data.data


            
            data = data.filter((item)=> item.userId == this.state.token._id)

console.log(data);


            this.setState({
                data: data
            })
        })
        console.log(localStorage.usertoken && localStorage.usertoken != '')
        if (localStorage.usertoken) {
            var decoded = jwt.verify(localStorage.usertoken, 'secret')
            console.log(decoded);
            this.setState({ token: decoded.user })
        } else {
        }

    }
    showEvent = (eventData) => {
        this.setState({ specficData: eventData })
        console.log(eventData);
        
    }
    render() {
        // var allEvents = this.state.token.map((token, i) => {
        //     console.log()
        //     return <AllEvents token={this.state.token}/>
        // }
        // )
        return (
            <div className="myProfile">

                {this.state.specficData === null ?
                    <>
                        <h5 style={{ textAlign: 'center', padding: '30px 0 ' }}>
                            hello {this.state.token.name}
                        </h5>
                        <div>
                            <h3 style={{ textAlign: 'center' }}>Events that you created</h3>

                            <Row>
                                {this.state.data.map((data) => {
                                    return (
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs6 mb-6" id="Card-Margin" style={{ width: 'auto', }} onClick={() => this.showEvent(data)}>
                                            <Card style={{ width: '170px', border: 'none', marginTop: '60px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                <Card.Body class="text-left" style={{ width: '147px', height: '50px', margin: '0 auto' }}>
                                                    <Card.Title style={{ fontSize: '16px', textAlign: 'left', marginTop: '7px' }}>{data.name}</Card.Title>
                                                    <Card.Text style={{ fontSize: '13px' }}>
                                                        {data.description}
                                                        Starting Time: {data.startingTime}
                                                        Ending Time: {data.endingTime}
                                                    </Card.Text>
                                                </Card.Body>

                                            </Card>


                                        </div >)
                                })}
                            </Row>

                        </div>
                    </>
                    : <>


                        <div>

  
                <h3 > {this.state.specficData.name} </h3>

       <h3>         {this.state.specficData.description}<br/>
                                                        Starting Time: {this.state.specficData.startingTime}<br/>
                                                        Ending Time: {this.state.specficData.endingTime}
                    </h3  >
                        



                <h4>Edit</h4>

                <Form action={'http://localhost:5100/events/change/'+this.state.specficData._id} method="post">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Change Event Name</Form.Label>
    <Form.Control placeholder="Enter new name" name="name"/>


  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Change starting time</Form.Label>
    <Form.Control placeholder="X:XXAM" name="startingTime"/>
  </Form.Group>
  <Form.Label>Change ending time</Form.Label>
    <Form.Control  placeholder="X:XXPM" name="endingTime"/>
    <Form.Label>Change event capacity</Form.Label>
    <Form.Control placeholder="9999" name="capacity"/>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>


                        </div>
                    </>


                }
            </div>
        )
    }
}