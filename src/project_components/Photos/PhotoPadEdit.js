import React, {Component} from 'react';
import PhotoPadToast from "./PhotoPadToast";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faImages, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getPhoto, updatePhoto} from "../services/index";

class PhotoPadEdit extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.accessErrorShow = false;
        this.photoChanged = this.photoChanged.bind(this);
        this.updatePhoto = this.updatePhoto.bind(this);
    }

    initialState = {
        photoId:'', ph_name:'', location:'', ph_captured:''
    };

    componentDidMount() {
        const photoId = +this.props.match.params.photoId;
        if (photoId) {
            this.retrieveById(photoId);
        }
    };

    retrieveById = (photoId) => {
        this.props.getPhoto(photoId);
        setTimeout(() => {
            let photo = this.props.photoObj.photos;
            if (photo != null) {
                this.setState({
                    photoId: photo.photoId,
                    ph_name: photo.photoName,
                    location: photo.photoLocation,
                    ph_captured: photo.photoCapturedBy
                });
            }
        },1500);
    };

    photoCollection = () => {
        return this.props.history.push("/gallery");
    };

    updatePhoto = event => {
        event.preventDefault();
        const bodyInfo = new FormData();

        bodyInfo.append("photoId", this.state.photoId);
        bodyInfo.append("pName", this.state.ph_name);
        bodyInfo.append("pLocation", this.state.location);
        bodyInfo.append("pCaptured", this.state.ph_captured);
        bodyInfo.append("email", localStorage.userEmail);

        this.props.updatePhoto(bodyInfo);
        setTimeout(() => {
            if (this.props.updatedPhotoObj.error === '') {
                this.setState({ "show": true, "method": "post" });
                console.log(this.props);
                setTimeout(() => this.setState({"show": false}), 3000);
                this.setState(this.initialState);
                setTimeout(() => this.photoCollection(), 3000);
            } else {
                this.setState({"show": false});
                this.setState({"accessErrorShow" : true, "method":"post"});
                setTimeout(() => this.setState({"accessErrorShow": false}), 4000);
            }
        }, 1500);
    }

    photoChanged = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    photoGallery = () => {
        return this.props.history.push("/gallery");
    };

    clearAllFields = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {ph_name, location, ph_captured} = this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block": "none"}}>
                    <PhotoPadToast show={this.state.show} message={"Photo updated, you can now share it with the group."} type={"success"}/>
                </div>
                <div style={{"display": this.state.accessErrorShow ? "block": "none"}}>
                    <PhotoPadToast show={this.state.accessErrorShow} message={"Access Required, please consult with the owner."} type={"ad"}/>
                </div>
                <Card className={"border border-white bg-white text-dark"}>
                    <CardHeader><FontAwesomeIcon icon={faPlusSquare}/> Update a Photo</CardHeader>
                    <Form onReset={this.clearAllFields} onSubmit={this.updatePhoto} id={"photoEditForm"}>
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} controlId="formGridPhotoName">
                                    <Form.Label>Photo Name</Form.Label>
                                    <Form.Control type="text" name="ph_name" value={ph_name} onChange={this.photoChanged} required autoComplete="off" placeholder="Enter name of photo date" className={"bg-white text-dark"} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLocation">
                                    <Form.Label>Photo Location</Form.Label>
                                    <Form.Control type="text" name="location" value={location} onChange={this.photoChanged} required autoComplete="off" placeholder="Enter name of city" className={"bg-white text-dark"} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridCaptured">
                                    <Form.Label>Capture By?</Form.Label>
                                    <Form.Control required type="text" name="ph_captured" value={ph_captured} onChange={this.photoChanged} autoComplete="off" placeholder="Enter name of person" className={"bg-white text-dark"} />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign":"right" }}>
                            <Button size="md" type="reset" variant="info" onClick={this.clearAllFields}>
                                <FontAwesomeIcon icon={faUndo}/> Clear
                            </Button>{' '}
                            <Button size="md" type="button" variant="primary" onClick={this.photoCollection.bind()}>
                                <FontAwesomeIcon icon={faImages}/> Photo Collection
                            </Button>{' '}
                            <Button size="md" type="submit" variant="success" disabled={this.state.location.length === 0 || this.state.ph_captured.length === 0 || this.state.ph_name.length === 0} onClick={this.updatePhoto}>
                                <FontAwesomeIcon icon={faEdit}/> Update Photo
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        updatedPhotoObj: state.photo,
        photoObj: state.photo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updatePhoto: (photo) => dispatch(updatePhoto(photo)),
        getPhoto: (photoId) => dispatch(getPhoto(photoId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPadEdit);