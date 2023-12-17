package me.t3sl4.gelkurye;

import me.t3sl4.gelkurye.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GelKuryeApplication {
	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
    SpringApplication.run(GelKuryeApplication.class, args);
	}

	@Bean
	public CommandLineRunner initRoles() {
		return args -> roleRepository.initRoles();
	}
}
