import React, {useState, createContext, useContext} from 'react';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import {Form, FormGroup, Label, Input} from 'reactstrap';

import Api from '../../utils/Api';

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
            alert("Your registration is successful. You can now login.")
            toggle();
        }).catch(error => {
            setError("Please provide valid credentials!");
        });
    };

    return (
        <div>
            <Button color="success" onClick={toggle}>Sign Up</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Registration</ModalHeader>
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
                    <Button color="primary" onClick={() => submitSignUpForm()}>Register</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LoginModal;