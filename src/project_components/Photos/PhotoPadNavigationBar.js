import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../../logo.png';
import {Link} from 'react-router-dom';
import {faHome, faImages, faKey, faSignInAlt, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {logoutUser} from '../services/index';

class PhotoPadNavigationBar extends Component {
    logout = () => {
      this.props.logoutUser();
    };

    render() {
        const notLoggedInLinks = (
            <>
                <Nav>
                    <Link to={""} className="navbar-brand"><FontAwesomeIcon icon={faHome}/> Home</Link>
                </Nav>
                <Nav>
                    <Link to={"register"} className="navbar-brand"><FontAwesomeIcon icon={faKey}/> Register</Link>
                    <Link to={"login"} className="navbar-brand"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                </Nav>
            </>
        );
        const loggedInLinks = (
            <>
                <Nav>
                    <Link to={""} className="navbar-brand"><FontAwesomeIcon icon={faHome}/> { localStorage.userEmail }</Link>
                    <Link to={"gallery"} className="navbar-brand"><FontAwesomeIcon icon={faImages}/> Photo Collection</Link>
                </Nav>
                <Nav>
                    <Link to={"login"} className="navbar-brand" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                </Nav>
            </>
        );
        return (
            <Navbar style={{"backgroundColor": "#4f473e"}} variant="dark" expand="lg">
                <Container fluid>
                    <Link to={""} className="navbar-brand">
                        <img src={logo} height="20" width="100" style={{"marginLeft":"10px"}} alt={logo}/>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {this.props.auth.isLoggedIn ? loggedInLinks : notLoggedInLinks}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    };
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPadNavigationBar);