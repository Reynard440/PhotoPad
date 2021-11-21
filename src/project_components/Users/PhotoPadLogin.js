import React, {Component} from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {authenticateUser} from "../services/index";
import PhotoPadToast from "../Photos/PhotoPadToast";

class PhotoPadLogin extends Component {
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state.loggedIn = false;
        this.state.invalidShow = false
        this.detailsChange = this.detailsChange.bind(this);
    }

    initialState = {
        email:'', password:'', error:''
    };

    detailsChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    validateUser = () => {
        const bodyInfo = new URLSearchParams();
        bodyInfo.append("email", this.state.email);
        bodyInfo.append("UserHashPassword", this.state.password);

        this.props.authenticateUser(bodyInfo);
        setTimeout(() => {
            if (this.props.auth.isLoggedIn === true) {
                this.setState({"loggedIn": true});
                setTimeout(() => {this.setState({"loggedIn": false});return this.props.history.push("/");}, 3000);
            } else {
                this.resetPhotoPadLoginForm();
                this.setState({ "error": "Invalid Email and Password" });
                this.setState({ "invalidShow": true });
                setTimeout(() => { this.setState({ "invalidShow": false });}, 3000);
            }
        }, 500);
        this.resetPhotoPadLoginForm();
    };

    resetPhotoPadLoginForm = () => {
      this.setState(() => this.initialState);
    };

    render() {
        const {email, password, error} = this.state;
        return (
            <div>
                <div style={{ "display": this.state.loggedIn ? "block" : "none" }}>
                    <PhotoPadToast show={this.state.loggedIn} message={"Successful Login."} type={"success"}/>
                </div>
                <div style={{ "display": this.state.invalidShow ? "block" : "none" }}>
                    <PhotoPadToast show={this.state.invalidShow} message={error} type={"danger"}/>
                </div>
                <Row className="justify-content-sm-center">
                    <Col lg={5}>
                        <Card className={"border border-white bg-white text-dark"}>
                            <Card.Header>
                                <FontAwesomeIcon icon={faSignInAlt}/>  Login
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.validateUser} onReset={this.resetPhotoPadLoginForm}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" value={email} onChange={this.detailsChange} className={"bg-white text-dark"} placeholder="Enter email here" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" value={password} onChange={this.detailsChange} className={"bg-white text-dark"} placeholder="Enter password here" />
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="md" type="button" variant="info" onClick={this.resetPhotoPadLoginForm}>
                                    <FontAwesomeIcon icon={faUndo}/>  Reset
                                </Button> {' '}
                                <Button size="md" type="button" variant="success" onClick={this.validateUser.bind()} disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPadLogin);