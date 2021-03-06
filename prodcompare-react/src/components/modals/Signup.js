import React, {useState} from 'react';

import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {Form, FormGroup, Label, Input} from 'reactstrap';


import {Toast} from "toaster-js";
import "toaster-js/default.scss";

import Api from '../../utils/Api';

import './Modals.scss';

const LoginModal = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState();

    const toggle = () => {
        setEmail('');
        setPassword('');
        setModal(!modal);
    };

    const submitSignUpForm = async () => {
        let response = await Api.post('/users.json', {
                email: email,
                password: password
            }, {
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
        ).then(response => {
            new Toast("Your registration is successful. You can now login.");
            toggle();
        }).catch(error => {
            new Toast( `${error} - Please provide valid credentials` );
            // setError("Please provide valid credentials!");
        });
    };

    return (
        <div className="authentication">
            <div onClick={toggle}>Sign Up</div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
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
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <div className="modal-btn"  onClick={() => submitSignUpForm()}>Sign Up</div>{' '}
                    <div className="modal-btn"  onClick={toggle}>Cancel</div>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LoginModal;