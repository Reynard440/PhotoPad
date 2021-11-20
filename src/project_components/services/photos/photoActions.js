import {GET_PHOTO_FAILURE, GET_PHOTO_REQUEST, GET_PHOTO_SUCCESS} from './photoTypes';
import axios from 'axios';

export const getPhotos = () => {
    return dispatch => {
        dispatch(getPhotosRequest());
        axios.get("http://photomemories.us-east-1.elasticbeanstalk.com/v1/c2/loadAllPhotosOfUser/"+localStorage.userEmail+"/",
            {
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": localStorage.access_key
                }
            })
            .then(res => {
                dispatch(getPhotoSuccess(res.data.cargo));
            })
            .catch(err => {
                dispatch(getPhotoFailure(err.message));
                return 404;
            });
    };
};

const getPhotosRequest = () => {
    return {
        type: GET_PHOTO_REQUEST
    };
};

const getPhotoSuccess = photo => {
    return {
        type: GET_PHOTO_SUCCESS,
        payload: photo
    };
};

const getPhotoFailure = error => {
    return {
        type: GET_PHOTO_FAILURE,
        payload: error
    };
};