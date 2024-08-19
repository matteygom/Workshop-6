package pl.coderslab.charity.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.coderslab.charity.domain.Institution;
import pl.coderslab.charity.repository.DonationRepository;
import pl.coderslab.charity.repository.InstitutionRepository;

import java.util.List;


@Controller
public class HomeController {

    private static final Logger logger = LoggerFactory.getLogger(InstitutionRepository.class);

    private final InstitutionRepository institutionRepository;
    private final DonationRepository donationRepository;

    public HomeController(InstitutionRepository institutionRepository, DonationRepository donationRepository) {
        this.institutionRepository = institutionRepository;
        this.donationRepository = donationRepository;
    }


    @ModelAttribute("institutions")
    public List<Institution> institutions() {
        return institutionRepository.findAll(Pageable.ofSize(4)).getContent();
    }

    @GetMapping("/")
    public String countDonationsAndQuantity(Model model) {
        Integer totalDonations = donationRepository.countAllDonations();
        model.addAttribute("totalDonations", totalDonations);
        Integer totalQuantity = donationRepository.sumTotalQuantity().orElse(0);
        model.addAttribute("totalQuantity", totalQuantity);

        //donationRepository.count(); METODA DEFAULTOWA COUNT JUZ ISTNIEJE !!!!
        return "index";
    }
}
