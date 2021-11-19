import React, {Component} from 'react';
import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEdit, faImages, faSave, faShareSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {deletePhoto, getPhotos} from "../services";
import {connect} from "react-redux";
import PhotoPadToast from "./PhotoPadToast";

class PhotoPadGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            deleteGalleryError: false,
            show: false
        };
    }

    componentDidMount() {
        this.props.getPhotos();
    }

    deletePhoto = (photoId, photoLink) => {
        this.props.deletePhoto(photoLink, photoId);
        setTimeout(() => {
            if (this.props.deletedPhotoObj.error === '') {
                this.setState({"show": true});
                setTimeout(() => this.setState({"show": false}), 3000);
                this.props.getPhotos();
            }else {
                this.setState({"show": false});
                if (this.props.deletedPhotoObj.error !== '') {
                    this.setState({"deleteGalleryError" : true, "method":"post"});
                    setTimeout(() => this.setState({"deleteGalleryError": false}), 4000);
                }
            }
        }, 1500);
    };

    downloadPhoto = (photoLink) => {
        window.open("http://localhost:8095/v1/c4/downloadPhoto/" + localStorage.userEmail + "/"+photoLink);
    };

    viewPhoto = (photoLink) => {
        window.open("http://localhost:8095/v1/c4/displayPhoto/" + localStorage.userEmail + "/" + photoLink + "/");
    }

    render() {
        const photoData = this.props.photoData;
        const photos = photoData.photos;
        return (
            <div>
                <div style={{"display": this.state.show ? "block": "none"}}>
                    <PhotoPadToast show={this.state.show} message={"Photo deleted successfully."} type={"success"}/>
                </div>
                <div style={{"display": this.state.deleteGalleryError ? "block": "none"}}>
                    <PhotoPadToast show={this.state.deleteGalleryError} message={"Access Required, please consult with the owner."} type={"ad"}/>
                </div>
                <div className={"galleryMain"}>
                    <Card className={"border border-dark bg-white text-dark galleryCard"}>
                        <CardHeader className={"bg-white text-dark"} style={{textAlign: 'left'}}><FontAwesomeIcon icon={faImages}/> Your Gallery of Photos {'  '}
                            <Link to={"add"} className="btn btn-sm btn-outline-primary float-end" ><FontAwesomeIcon icon={faSave}/> Add Photo</Link>
                        </CardHeader>
                        {photoData.photos.length === 0 || this.state.photos.confirmation === true ?
                            <Card.Body>
                                No Current Photos To Display for: {localStorage.userEmail}
                            </Card.Body> :
                            <Card.Body>
                                <div>
                                    {photos.map((photo) => (
                                        <div key={photo.photoId} className={"grouping"}>
                                            <Card>
                                                <CardHeader className="bg-light">
                                                    <div className={"divText"}><strong>ID:</strong> {photo.photoId}</div>
                                                </CardHeader>
                                                <Card.Img src={`http://localhost:8095/v1/c4/displayPhoto/` + localStorage.userEmail + `/` + photo.photoLink + `/`}
                                                    className={"containerImage"} style={{"objectFit":"contain"}} alt={"default"} onClick={this.viewPhoto.bind(this, photo.photoLink)}/>
                                                <Card.Body className={"bg-light"}>
                                                    <div className={"divText"}><strong>Name:</strong>
                                                        <div className="float-end">
                                                            {photo.photoName}
                                                        </div>
                                                    </div>
                                                    <div className={"divText"}><strong>Captured By:</strong>
                                                        <div className="float-end">
                                                            {photo.photoCapturedBy}
                                                        </div>
                                                    </div>
                                                    <div className={"divText"}><strong>Format:</strong>
                                                        <div className="float-end">
                                                            {photo.photoFormat}
                                                        </div>
                                                    </div>
                                                    <div className={"divText"}><strong>Location:</strong>
                                                        <div className="float-end">
                                                            {photo.photoLocation}
                                                        </div>
                                                    </div>
                                                    <div className={"buttons"} >
                                                        <Link to={"edit/" + photo.photoId} className="btn btn-sm btn-outline-warning"><FontAwesomeIcon icon={faEdit} />Edit</Link>{ ' ' }
                                                        <Link to={"share/" + photo.photoId} className="btn btn-sm btn-outline-info"><FontAwesomeIcon icon={faShareSquare} />Share</Link> { ' ' }
                                                        <Button size="sm" variant="outline-danger" onClick={this.deletePhoto.bind(this, photo.photoLink, photo.photoId)}><FontAwesomeIcon icon={faTrash}/>Delete</Button>
                                                    </div>
                                                    <div className={"buttons"}>
                                                        <Button size="sm" variant="outline-success" onClick={this.downloadPhoto.bind(this, photo.photoLink)}><FontAwesomeIcon icon={faDownload} />Download</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        }
                    </Card>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        photoData: state.photos,
        deletedPhotoObj: state.photo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPhotos: (email) => dispatch(getPhotos(email)),
        deletePhoto: (photoId, photoLink) => dispatch(deletePhoto(photoId, photoLink))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPadGallery);