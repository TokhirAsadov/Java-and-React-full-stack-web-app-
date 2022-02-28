package uz.pdp.appreactspring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.pdp.appreactspring.model.Book;
import uz.pdp.appreactspring.repository.BookRepository;
import uz.pdp.appreactspring.service.IService;

import java.util.*;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private IService<Book> bookIService;

    @RequestMapping(value = "/search/{searchText}",method = RequestMethod.GET)
    public ResponseEntity<Page<Book>> getFindAll(Pageable pageable,@PathVariable String searchText){
        return new ResponseEntity<>(bookIService.findAll(pageable,searchText),HttpStatus.OK);
    }

    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public ResponseEntity<Page<Book>> getAllBooks(int pageNumber, int pageSize, String sortBy, String sortDir){
        return new ResponseEntity<>(bookIService.findAll(
                PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ?
                                Sort.by(sortBy).ascending() :
                                Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @RequestMapping(value = "/list/{id}",method = RequestMethod.GET)
    public ResponseEntity<Book> getBookByID(@PathVariable Long id){
        return new ResponseEntity<>(bookIService.findById(id).get(),HttpStatus.OK);
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public ResponseEntity<Book> saveBook(@RequestBody Book book){
       return new ResponseEntity<>(bookIService.saveOrUpdate(book),HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<String> deletedBook(@PathVariable Long id){
        return new ResponseEntity<>(bookIService.deleteById(id),HttpStatus.OK);
    }

    @RequestMapping(value = "/edit",method = RequestMethod.PUT)
    public ResponseEntity<Book> editBook(@RequestBody Book book){
        return new ResponseEntity<>(bookIService.saveOrUpdate(book),HttpStatus.OK);
    }

    @RequestMapping(value = "languages",method = RequestMethod.GET)
    public ResponseEntity<Set<String>> findAllLanguages(){
        return new ResponseEntity<>(
                new TreeSet<>(Arrays.asList("Uzbek","English","Russia","French","German")),
                HttpStatus.OK);
    }

    @RequestMapping(value = "genres",method = RequestMethod.GET)
    public ResponseEntity<Set<String>> findAllGenres(){
        return new ResponseEntity<>(
                new TreeSet<>(Arrays.asList("Drama","History","Technology","Romance","Science","Horror")),
                HttpStatus.OK);
    }
}
