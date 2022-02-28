import {Card, Table, Button, InputGroup, FormControl} from "react-bootstrap";
import React, {Component} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers,faStepBackward,faFastBackward,faStepForward,faFastForward} from "@fortawesome/free-solid-svg-icons";
import "../App.css"

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            usersPerPage: 5
        }
    }

    componentDidMount() {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then( res => this.setState( {users: res.data}));
    }

    changePage = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        })
    }

    firstPage = () => {
        if (this.state.currentPage > 1){
            this.setState({
                currentPage:1
            })
        }
    }

    prevPage = () => {
        if (this.state.currentPage > 1){
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
            })
        }
    }

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    render() {
        const { users, currentPage, usersPerPage } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex,lastIndex);
        const totalPages = users.length / usersPerPage;


        return (
            <div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header><FontAwesomeIcon icon={faUsers} /> User List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"dark"}>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Address</td>
                                    <td>Created</td>
                                    <td>Balance</td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ?
                                    <tr>
                                        <td colSpan={6}>No Users Available</td>
                                    </tr> :
                                    currentUsers.map((user,index) =>(
                                        <tr key={index}>
                                            <td>{user.first}{" "}{user.last}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.created}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {users.length === 0 ? null :
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