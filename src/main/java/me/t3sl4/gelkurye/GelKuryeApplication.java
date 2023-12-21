package me.t3sl4.gelkurye;

import me.t3sl4.gelkurye.repository.RoleRepository;
import me.t3sl4.gelkurye.services.GetirService;
import me.t3sl4.gelkurye.services.TrendyolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class GelKuryeApplication {
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private TrendyolService getirService;

	public static void main(String[] args) {
    SpringApplication.run(GelKuryeApplication.class, args);
	}

	@Bean
	public CommandLineRunner initRoles() {
		return args -> roleRepository.initRoles();
	}

	@Scheduled(fixedRate = 5000) // 5 seconds
	public void fetchDataAndSave() {
		getirService.testReq();
	}
}
