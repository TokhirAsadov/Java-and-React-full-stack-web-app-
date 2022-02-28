package uz.pdp.appreactspring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Book {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String coverPhotoURL;

    @Column(nullable = false)
    private Integer isbnNumber;

    @Column(nullable = false)
    private String language;

    private String genre;

    public Book(String title, String author, Integer price, String coverPhotoURL, Integer isbnNumber, String language, String genre) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.coverPhotoURL = coverPhotoURL;
        this.isbnNumber = isbnNumber;
        this.language = language;
        this.genre = genre;
    }
}
