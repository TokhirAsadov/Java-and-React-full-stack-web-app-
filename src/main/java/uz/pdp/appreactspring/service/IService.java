package uz.pdp.appreactspring.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;

public interface IService<T> {
    Page<T> findAll(Pageable pageable,String searchText);

    Page<T> findAll(Pageable pageable);

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);
}
