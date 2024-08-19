package pl.coderslab.charity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.coderslab.charity.domain.Donation;

import java.util.Optional;

public interface DonationRepository extends JpaRepository<Donation,Long> {

    @Query(value = "SELECT COUNT(*) AS total_donations FROM donations", nativeQuery = true)
    Integer countAllDonations();

    @Query("SELECT SUM(d.quantity) FROM Donation d")
    Optional<Integer> sumTotalQuantity();


}
