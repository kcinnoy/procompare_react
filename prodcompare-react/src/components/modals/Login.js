import React, {useState} from 'react';

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Form, FormGroup, Label, Input} from 'reactstrap';

import Api from '../../utils/Api';

import './Modals.scss';

// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import { loginAction } from "../actions/login";

import {useDispatch} from "react-redux";

import {Toast} from "toaster-js";
import "toaster-js/default.scss";


const LoginModal = (props) => {
    // const [currentUser, token, setToken] = useContext(CurrentUserContext);
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [modal, setModal] = useState(false);
    const [authToken, setAuthToken] = useState();
    const [error, setError] = useState();

    const toggle = () => {
        setEmail('');
        setPassword('');
        setModal(!modal);
    };

    const submitLoginForm = () => {
			return dispatch(loginAction(email, password));
    };

    return (
        <div className="registration" >
            <div onClick={toggle}>Login</div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    {error ? (<h6>Error: {error}</h6>) : null}
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)}
                                   id="exampleEmail" placeholder="Type your email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                                   id="examplePassword" placeholder="Type your password"/>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox"/>{' '}
                                Remember
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="modal-btn" onClick={() => submitLoginForm()}>Login</div>{' '}
                    <div className="modal-btn" onClick={toggle}>Cancel</div>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LoginModal;