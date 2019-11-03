import React, {useState, useEffect, useContext} from 'react';

import NavBar from '../navBar';

import './Favorites.scss';

import Api from '../../utils/Api';
import {Toast} from "toaster-js";
import "toaster-js/default.scss";

import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';

// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useDispatch, useSelector} from "react-redux";


const Favorites = () => {
    // const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const authenticationData = useSelector(state => state.authenticationData );

    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        let result = await Api.get("/favorites", {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

        setFavorites(result.data.result)
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const removeFavorite = async (product) => {
        console.log(localStorage.getItem('token'));
        await Api.delete('/favorites/' + product.id + '.json', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
            }
        ).then(response => {
            setFavorites(favorites.filter(item => item.id !== product.id))
            new Toast("You have successfully removed this product as favorite");
        }).catch(error => {
            new Toast(error);
        });
    };

    return (
       
        <Container fluid={true}>
         <NavBar />
            <Row>
                <Col sm="12" lg="12">
                  <div className="favorite-title">Your favorite Item(s)</div>

                    {favorites.map((product) => (
                      <Col lg="3" key={product.id} className="float-left" style={{padding: '.5rem'}}>
                        <div>
                            <Card>
															{product.image ?
																(<CardImg top height="400px" src={product.image} alt="Card image cap"/>) : null}
                                  <CardBody className="card-body">
                                    <CardTitle className="card-title">{product.title.slice(0, 60)}</CardTitle>
                                      <CardSubtitle>Price: £{product.price}</CardSubtitle>
                                            <CardText>Favorited {product.num_favorers} times </CardText>
                                            <Button className="remove-btn" onClick={() => removeFavorite(product)}>Remove</Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    )
};

export default Favorites;