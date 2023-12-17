package me.t3sl4.gelkurye.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import me.t3sl4.gelkurye.models.ERole;
import me.t3sl4.gelkurye.models.Role;
import me.t3sl4.gelkurye.models.User;
import me.t3sl4.gelkurye.payload.request.LoginRequest;
import me.t3sl4.gelkurye.payload.request.SignupRequest;
import me.t3sl4.gelkurye.payload.response.JwtResponse;
import me.t3sl4.gelkurye.payload.response.MessageResponse;
import me.t3sl4.gelkurye.repository.RoleRepository;
import me.t3sl4.gelkurye.repository.UserRepository;
import me.t3sl4.gelkurye.security.jwt.JwtUtils;
import me.t3sl4.gelkurye.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Error: Email is already in use!"));
    }

    System.out.println("asdasdfasdas");
    System.out.println(signUpRequest.getUsername());

    //signup
    User user = new User(signUpRequest.getNameSurname(),
            signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            signUpRequest.getPhone(),
            encoder.encode(signUpRequest.getPassword()));
    if(signUpRequest.getTrendyolAPI() != null) {
      user.setTrendyolAPI(signUpRequest.getTrendyolAPI());
      user.setTrendyolSecret(signUpRequest.getTrendyolSecret());
    }

    if(signUpRequest.getYemekSepetiID() != null) {
      user.setYemekSepetiID(signUpRequest.getYemekSepetiID());
      user.setYemekSepetiAPI(signUpRequest.getYemekSepetiAPI());
    }

    if(signUpRequest.getGetirID() != null) {
      user.setGetirID(signUpRequest.getGetirID());
      user.setGetirAPI(signUpRequest.getGetirAPI());
    }

    String strRole = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRole == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      switch (strRole) {
        case "shop":
          Role adminRole = roleRepository.findByName(ERole.ROLE_SHOP)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(adminRole);

          break;
        case "sysop":
          Role modRole = roleRepository.findByName(ERole.ROLE_SYSOP)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(modRole);

          break;
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
      }
    }

    user.setRoles(roles);

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
