package uz.pdp.appreactspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uz.pdp.appreactspring.model.Book;
import uz.pdp.appreactspring.service.IService;

@SpringBootApplication
public class AppReactSpringApplication implements CommandLineRunner {

    @Autowired
    private IService<Book> bookService;

    public static void main(String[] args) {
        SpringApplication.run(AppReactSpringApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

//            for (int i = 1; i <= 100; i++) {
//                Book book = new Book();
//                book.setTitle("Spring Microservices in Action " + i);
//                book.setAuthor("John Carnell " + i);
//                book.setCoverPhotoURL(
//                        "https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
//                book.setIsbnNumber(1617293989);
//                book.setPrice(2776+ i);
//                bookService.saveOrUpdate(book);
//            }

    }
}
