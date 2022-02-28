package uz.pdp.appreactspring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import uz.pdp.appreactspring.model.Book;

@Repository
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {

    @Query("from Book b " +
            "where " +
            "b.title=:searchText or " +
            "b.author=:searchText or " +
            "b.genre=:searchText or " +
            "b.language=:searchText " +
            "order by b.price desc ")
    Page<Book> findAllBooksForSearch(Pageable pageable,@Param("searchText") String searchText);
}
