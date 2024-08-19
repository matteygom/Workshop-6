package pl.coderslab.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.domain.Category;
import pl.coderslab.charity.domain.Donation;
import pl.coderslab.charity.domain.Institution;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c")
    List<Category> findAllCategories();


    // TO SAMO - DEFAULTOWA METODA ROBI TO SAMO
    @Override
    List<Category> findAll();
}
