package uz.pdp.appreactspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uz.pdp.appreactspring.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
}
