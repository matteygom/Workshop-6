package pl.coderslab.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.domain.Category;
import pl.coderslab.charity.domain.Institution;

import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {


    @Query("SELECT i FROM Institution i")
    List<Institution> findAllInstitutions();

    @Override
    List<Institution> findAll();

}
