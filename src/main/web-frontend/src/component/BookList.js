import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCancel,
    faEdit,
    faFastBackward,
    faFastForward,
    faList, faSearch,
    faStepBackward,
    faStepForward, faTimes,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import {Link} from "react-router-dom";
import "../App.css"

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage: 1,
            booksPerPage: 5,
            totalPages: 0,
            totalElements: 0,
            sortToggle: true,
            search: ""

        }
    }

    sortData = () => {
        this.setState(state => ({
            sortToggle : !state.sortToggle
        }));
        this.findAllBooks(this.state.currentPage);
    }

    componentDidMount() {
        this.findAllBooks(this.state.currentPage);
    }

    findAllBooks(currentPage){
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        fetch("http://localhost:8080/book/list?pageNumber="+(currentPage-1)+
            "&pageSize="+this.state.booksPerPage+"&sortBy=price&sortDir="+sortDir)
            .then(res => res.json())
            .then( book => this.setState({
                books: book.content,
                totalPages: book.totalPages,
                totalElements: book.totalElements,
                currentPage: book.number + 1
            }));
    }

   /* componentDidMount() {
        axios.get("http://localhost:8080/book/list")
            .then( res => this.setState({ books: res.data }));
    }*/

    agreeAdmenDeleteBook = (bookId) => {
        axios.get("http://localhost:8080/book/list/"+ bookId)
            .then(response => {
                if ( response.data != null ){
                    // const agree = ;
                    if (window.confirm("Do you agree to delete "+response.data.title+" book?")){
                        this.deleteBook(bookId);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8080/book/delete/"+bookId)
            .then(res => {
                if (res.data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        books: this.state.books.filter( book => book.id !== bookId)
                    })
                }
            })
    }

    changePage = (e) => {
        let targetPage = parseInt(e.target.value);
        if (this.state.search){
            this.searchData(targetPage);
        }else{
            this.findAllBooks(targetPage);
        }
        this.setState({
            [e.target.name]: targetPage
        })
    }


    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage){
            if (this.state.search){
                this.searchData(firstPage);
            }else{
                this.findAllBooks(firstPage);
            }
        }
    }

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage){
            if (this.state.search){
                this.searchData(this.state.currentPage - prevPage);
            }else{
                this.findAllBooks(this.state.currentPage - prevPage);
            }
        }
    }

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if (this.state.currentPage < condition){
            if (this.state.search){
                this.searchData(condition);
            }else{
                this.findAllBooks(condition);
            }
        }
    }

    nextPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if (this.state.currentPage < condition){
            if (this.state.search){
                this.searchData(this.state.currentPage + 1);
            }else{
                this.findAllBooks(this.state.currentPage + 1);
            }
        }
    }

    searchChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelSearch = () => {
        this.setState({
            "search": ""
        });
        this.findAllBooks(this.state.currentPage);
    }

    searchData = (currentPage) => {
        fetch("http://localhost:8080/book/search/"+this.state.search+"?page="+(currentPage-1)+"&size="+this.state.booksPerPage)
            .then(res => res.json())
            .then( book => this.setState({
                books: book.content,
                totalPages: book.totalPages,
                totalElements: book.totalElements,
                currentPage: book.number + 1
            }));
    }

    render() {
        const { currentPage,totalPages,books,search } = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message={"Book Deleted Successfully."} type={"danger"} />
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faList} /> Book List
                        <div style={{"float":"right"}}>
                            <InputGroup size={"sm"}>
                                <FormControl
                                    placeholder={"Search"}
                                    name={"search"} value={search}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}
                                />
                                <div>
                                    <Button
                                        size={"sm"} variant={"outline-info"}
                                        type={"button"} onClick={this.searchData}
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        variant={"outline-danger"}
                                        type={"button"}
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </div>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"dark"}>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th onClick={this.sortData}>
                                    Price
                                    <div className={ this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}></div>
                                </th>
                                <th>Language</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.books.length === 0 ?
                                    <tr align={"center"}>
                                        <td colSpan={6}>No Books Available...</td>
                                    </tr> :
                                    this.state.books.map((book) => (
                                        <tr key={book.id}>
                                            <td><Image src={book.coverPhotoURL} roundedCircle width={"25"} height={"25"}/>  {book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.isbnNumber}</td>
                                            <td>{book.price}</td>
                                            <td>{book.language}</td>
                                            <td>{book.genre}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"/book/edit/" + book.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>
                                                    {'  '}
                                                    <Button size={"sm"} variant={"outline-danger"} onClick={this.agreeAdmenDeleteBook.bind(this,book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {books.length === 0 ? null :
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size={"sm"}>

                                    <Button
                                        type={"button"} variant={"outline-info"}
                                        disabled={currentPage === 1}
                                        onClick={this.firstPage}
                                    >
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button
                                        type={"button"} variant={"outline-info"}
                                        disabled={currentPage === 1}
                                        onClick={this.prevPage}
                                    >
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>

                                    <FormControl className={"bg-dark pageNumCss"} name={"currentPage"} value={currentPage === NaN ? 1:currentPage}
                                                 onChange={this.changePage}
                                    />

                                    <Button
                                        type={"button"} variant={"outline-info"}
                                        disabled={currentPage === totalPages}
                                        onClick={this.nextPage}
                                    >
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button
                                        type={"button"} variant={"outline-info"}
                                        disabled={currentPage === totalPages}
                                        onClick={this.lastPage}
                                    >
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>

                                </InputGroup>
                            </div>
                        </Card.Footer>}
                </Card>
            </div>

        );
    }
}

export default BookList;