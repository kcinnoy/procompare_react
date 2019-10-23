import React, {useState, useEffect, useContext} from 'react';
import Api from '../utils/Api';
import {Toast} from "toaster-js";
import "toaster-js/default.scss";

import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Favorites = () => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
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
            <Row>
                <Col sm="12" lg="12">
                    <center>
                    <h1>Your favorite(s)</h1>
                    </center>

                    {favorites.map((product) => (
                            <Col lg="3" key={product.id} className="float-left" style={{padding: '.5rem'}}>
                                <div>
                                    <Card>
                                        {product.image ? (
                                            <CardImg top height="400px" src={product.image} alt="Card image cap"/>
                                        ) : null}

                                        <CardBody>
                                            <CardTitle>{product.title.slice(0, 40)}</CardTitle>
                                            <CardSubtitle>Price: {product.price}</CardSubtitle>
                                            <CardText>Num Favorer: {product.num_favorers}</CardText>
                                            <Button onClick={() => removeFavorite(product)}>Remove From Favorite</Button>
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