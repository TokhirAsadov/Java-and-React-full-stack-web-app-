
import './App.css';
import NavigationBar from "./component/NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import WebComponent from "./component/WebComponent";
import Footer from "./component/Footer";
import BookCreateAndUpdateUseFunctionComponent from "./component/BookCreateAndUpdateUseFunctionComponent";
import BookList from "./component/BookList";
import UserList from "./component/UserList";


function App() {

  return (
    <Router>
        <NavigationBar />
        <Container>
            <Row>
                <Col lg={12} className={"marginTop"}>
                    <Routes>
                        <Route path="/" exact element={ <WebComponent /> } />
                        <Route path="/book/add" element={ <BookCreateAndUpdateUseFunctionComponent /> } />
                        <Route path="/book/edit/:bookID" element={ <BookCreateAndUpdateUseFunctionComponent /> } />
                        <Route path="/book/list" element={ <BookList />} />
                        <Route path="/user/list" element={ <UserList />} />
                    </Routes>
                </Col>
            </Row>
        </Container>
        <Footer />
    </Router>
  );
}

export default App;
