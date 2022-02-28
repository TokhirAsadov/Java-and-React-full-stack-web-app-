import "../App.css"
import axios from "axios";
import MyToast from "./MyToast";
import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


class Book extends Component {

    constructor(props) {
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.handleChange = this.handleChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
        this.resetBook = this.resetBook.bind(this);
    }

    initialState = {
        id:'',
        title:'',
        author:'',
        price:'',
        isbnNumber:'',
        coverPhotoURL:'',
        language: ''
    }


    componentDidMount() {
        const bookId=+this.props.match.params;
        if (bookId){
            axios.get("http://localhost:8080/book/list/"+bookId)
                .then(res => {

                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    resetBook = () => {
        this.setState(() => this.initialState);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitBook = (e) => {
        e.preventDefault();
        
        const book = {
            title: this.state.title,
            author:this.state.author,
            price: this.state.price,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            language: this.state.language
        }

        axios.post("http://localhost:8080/book/save", book)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                } else {
                    this.setState({"show":false});
                }
            });

       /* axios.post("http://localhost:8080/book/save", book)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                } else {
                    this.setState({"show":false});
                }
            });*/
        this.setState(this.initialState);
    }



    render() {

        const { title,price,author,isbnNumber, language,coverPhotoURL } = this.state;

        return (

            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={"Book Saved Successfully."} type={"success"} />
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare} /> Add Book
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitBook} id={"bookFormId"}>
                        <Card.Body>
                            <div className={"twoRow"}>
                                <div>
                                    <Form.Group  controlId={"formGridTitle"}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            autoComplete={"off"} required type="text"
                                            name="title" value={title}
                                            onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book Title" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group  controlId={"formGridAuthor"}>
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            required  autoComplete={"off"}
                                            type="text" name={"author"} value={author}
                                            onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book Author" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className={"twoRow"}>
                                <div>
                                    <Form.Group controlId={"formGridPrice"}>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            required autoComplete={"off"}
                                            type="number" name={"price"} value={price}
                                            onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book Price" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group controlId={"formGridLanguage"}>
                                        <Form.Label>Language</Form.Label>
                                        <Form.Control
                                            required autoComplete={"off"}
                                            type="text" name={"language"} value={language}
                                            onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book Language" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className={"twoRow"}>
                                <div>
                                    <Form.Group controlId={"formGridCoverPhotoURL"}>
                                        <Form.Label>Photo</Form.Label>
                                        <Form.Control
                                            required autoComplete={"off"}
                                            type="text" name={"coverPhotoURL"} value={ coverPhotoURL}
                                            onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book Cover Photo URL" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Form.Group controlId={"formGridISBNNumber"}>
                                        <Form.Label>ISBN Number</Form.Label>
                                        <Form.Control
                                            required type="number" name={"isbnNumber"}
                                            value={isbnNumber} onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Book ISBN Number" />
                                    </Form.Group>
                                </div>
                            </div>

                        </Card.Body>
                        <Card.Footer style={{textAlign:"right"}}>
                            <Button size={"sm"} variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> Submit
                            </Button>{'  '}
                            <Button className={"text-white"} size={"sm"} variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{'  '}
                            <Link to={"/book/list"}>
                                <Button className={"text-white"} size={"sm"} variant="info" type="button">
                                    <FontAwesomeIcon icon={faList} /> Book List
                                </Button>
                            </Link>

                        </Card.Footer>
                    </Form>
                </Card>
            </div>


        );
    }
}

export default Book;