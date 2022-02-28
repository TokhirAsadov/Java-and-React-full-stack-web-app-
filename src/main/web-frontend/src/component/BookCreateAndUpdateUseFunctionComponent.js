import React, {useEffect, useState} from 'react';
import {Route, useParams,useNavigate  } from 'react-router-dom';
import "../App.css"
import axios from "axios";
import MyToast from "./MyToast";
import {Button, Card, Col, Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList, faPlusSquare, faSave, faUndo ,faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const BookCreateAndUpdateUseFunctionComponent = () => {

  const  [id,setId] = useState( '');
  const  [title,setTitle] = useState("");
  const  [author,setAuthor] = useState("");
  const  [price,setPrice] = useState("");
  const  [isbnNumber,setIsbnNumber] = useState("");
  const  [coverPhotoURL,setCoverPhotoURL] = useState("");
  const  [language,setLanguage] = useState("");
  const  [genre,setGenre] = useState("");

  const [show,setShow] = useState(false);
  const [myMethod,setMyMethod] = useState( '');

  const [languages, setLanguages] = useState(["Select Language"]);
  const [genres, setGenres] = useState(["Select Genre"]);

  const [error,setError] = useState(false);



  const initialState = {
    id:'',
    title:'',
    author:'',
    price:'',
    isbnNumber:'',
    coverPhotoURL:'',
    language: "",
    genre: "",
  }

  const resetBook = () => {
     setId(initialState.id);
     setTitle(initialState.title);
     setAuthor(initialState.author);
     setPrice(initialState.price);
     setIsbnNumber(initialState.isbnNumber);
     setCoverPhotoURL(initialState.coverPhotoURL);
     setLanguage(initialState.language);
     setGenre(initialState.genre);
  }

  const  {bookID} = useParams();

  useEffect(() => {
    console.log(bookID)
    if(bookID){
      findBookById(bookID);
    }
    // setTimeout(()=>findAllLanguages(),100);
    // setTimeout(()=>findAllGenres(),100);
    findAllLanguages();
    findAllGenres();
    console.log(languages);
    console.log(genres);
  },[])

  const findAllLanguages = () => {
    axios.get("http://localhost:8080/book/languages")
        .then(res => res.data)
        .then(data => {
          data.map(lan => languages.push(lan));
        })
  }
  const findAllGenres = () => {
    axios.get("http://localhost:8080/book/genres")
        .then(res => res.data)
        .then(data => {
          setGenres(genres.concat(data.map(gen=>gen)));
              // data.map(gen=> genres.push(gen));
            // setGenres(
            //     [{value:"", display:"Select Genre"}]
            //         .concat(data.map(genre => {
            //             return {value:genre,display:genre}
            //         }))
            //)
        })
  }

  const findBookById = (bookID) => {
    axios.get("http://localhost:8080/book/list/"+ bookID)
        .then(response => {
          if ( response.data != null ){
            setId(response.data.id);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setCoverPhotoURL(response.data.coverPhotoURL);
            setIsbnNumber(response.data.isbnNumber);
            setLanguage(response.data.language);
            setGenre(response.data.genre)
          }
        })
        .catch(error => {
          console.log(error);
        })
  }


  const submitBook = (e) => {
    e.preventDefault();

    const book = {
      title:  title,
      author: author,
      price:  price,
      coverPhotoURL:  coverPhotoURL,
      isbnNumber:  isbnNumber,
      language:  language,
      genre: genre
    }



    if (genre !== "Select Genre" && genre !== null) {
      if (language !== "Select Language" && language !== null){
        axios.post("http://localhost:8080/book/save", book)
            .then(response => {
              if (response.data == null) {
                setShow(false);
              } else {
                setShow(true);
                setMyMethod("post");
                setTimeout(() => setShow(false), 3000);
                setTimeout(()=> navigate("/book/list"),3000);

                // setTimeout(()=> this.bookList(),3000);
              }
            });
        resetBook();
      }else{
        setError(true);
        setTimeout(()=>setError(false),3000);
      }
    }else{
      setError(true);
      setTimeout(()=>setError(false),3000);
    }

  }

  const navigate = useNavigate();

  const updateBook = (e) => {
    e.preventDefault();

    const book = {
      id: id,
      title:  title,
      author: author,
      price:  price,
      coverPhotoURL:  coverPhotoURL,
      isbnNumber:  isbnNumber,
      language:  language,
      genre: genre
    }

    console.log(book);
    if (genre !== "Select Genre" && genre !== null) {
      if (language !== "Select Language" && language !== null){
        axios.put("http://localhost:8080/book/edit", book)
            .then(response => {
              if (response.data == null) {
                setShow(false);
              } else {
                setShow(true);
                setMyMethod("put");
                setTimeout(() => setShow(false), 3000);
                setTimeout(() => navigate("/book/list"), 3000);
              }
            });
        resetBook();
      }else{
        setError(true);
        setTimeout(()=>setError(false),3000);
      }
    }else{
      setError(true);
      setTimeout(()=>setError(false),3000);
    }
  }


  return(
      <div>
          <div style={{"display":show ? "block" : "none"}}>
            <MyToast show = {show} message={ myMethod === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type={"success"} />
          </div>
        <div style={{"display":error ? "block" : "none"}}>
          <MyToast error = {error} message={"Please Select Language or Genre."} type={"danger"} />
        </div>
          <Card className="border border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> { id ? "Update Book" : "Add Book" }
            </Card.Header>
            <Form onReset={resetBook} onSubmit={ id ? updateBook : submitBook} id={"bookFormId"}>
              <Card.Body>
                <div className={"twoRow"}>
                  <div>
                    <Form.Group  controlId={"formGridTitle"}>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                          autoComplete={"off"} required type="text"
                          name="title" value={title}
                          onChange={event => setTitle(event.target.value)}
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
                          onChange={event => setAuthor(event.target.value)}
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
                          onChange={event => setPrice(event.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Enter Book Price" />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId={"formGridCoverPhotoURL"}>
                      <Form.Label>Photo</Form.Label>
                      <Form.Control
                          required autoComplete={"off"}
                          type="text" name={"coverPhotoURL"} value={ coverPhotoURL}
                          onChange={event => setCoverPhotoURL(event.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Enter Book Cover Photo URL" />
                    </Form.Group>
                  </div>
                </div>

                <div className={"twoRow"}>
                  <div>
                    <Form.Group controlId={"formGridISBNNumber"}>
                      <Form.Label>ISBN Number</Form.Label>
                      <Form.Control
                          required type="number" name={"isbnNumber"}
                          value={isbnNumber}  onChange={event => setIsbnNumber(event.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Enter Book ISBN Number" />
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId={"formGridISBNNumber"}>
                      <Form.Label>Genre</Form.Label>
                      <Form.Select
                          required /*as={"select"}*/ name={"genre"}
                          value={genre}  onChange={event => setGenre(event.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Enter Book Genre Number">
                        {/*<option value="default" key={"default"}></option>*/}
                      {
                        genres.map(gen =>
                            <option key={gen} value={gen}>
                              {gen}
                            </option>
                        )
                      }
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group controlId={"formGridLanguage"}>
                      <Form.Label>Language</Form.Label>
                      <Form.Select
                          required autoComplete={"off"}
                          as={"select"} name={"language"} value={language}
                          onChange={event => setLanguage(event.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Enter Book Language" >
                        {/*<option value="default" key={"default"}></option>*/}
                        {
                          languages.map(lan =>
                              <option key={lan} value={lan}>
                                {lan}
                              </option>
                          )
                        }
                      </Form.Select>

                    </Form.Group>
                  </div>
                </div>

              </Card.Body>
              <Card.Footer style={{textAlign:"right"}}>
                <Button size={"sm"} variant="success" type="submit">
                  <FontAwesomeIcon icon={ id ? faEdit : faSave} /> { id ? "Update" : "Save" }
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
export default BookCreateAndUpdateUseFunctionComponent;
