package me.t3sl4.gelkurye.models;

import org.springframework.lang.Nullable;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 90)
  private String nameSurname;

  @NotBlank
  @Size(max = 30)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 20)
  private String phone;

  @NotBlank
  @Size(max = 120)
  private String password;

  @Nullable
  @Size(max = 256)
  private String trendyolAPI;

  @Nullable
  @Size(max = 256)
  private String trendyolSecret;

  @Nullable
  @Size(max = 256)
  private String yemekSepetiID;

  @Nullable
  @Size(max = 256)
  private String yemekSepetiAPI;

  @Nullable
  @Size(max = 256)
  private String getirID;

  @Nullable
  @Size(max = 256)
  private String getirAPI;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  public User(String nameSurname, String userName, String eMail, String phone, String password) {
    this.nameSurname = nameSurname;
    this.username = userName;
    this.email = eMail;
    this.phone = phone;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNameSurname() {
    return nameSurname;
  }

  public void setNameSurname(String nameSurname) {
    this.nameSurname = nameSurname;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Nullable
  public String getTrendyolAPI() {
    return trendyolAPI;
  }

  public void setTrendyolAPI(@Nullable String trendyolAPI) {
    this.trendyolAPI = trendyolAPI;
  }

  @Nullable
  public String getTrendyolSecret() {
    return trendyolSecret;
  }

  public void setTrendyolSecret(@Nullable String trendyolSecret) {
    this.trendyolSecret = trendyolSecret;
  }

  @Nullable
  public String getYemekSepetiID() {
    return yemekSepetiID;
  }

  public void setYemekSepetiID(@Nullable String yemekSepetiID) {
    this.yemekSepetiID = yemekSepetiID;
  }

  @Nullable
  public String getYemekSepetiAPI() {
    return yemekSepetiAPI;
  }

  public void setYemekSepetiAPI(@Nullable String yemekSepetiAPI) {
    this.yemekSepetiAPI = yemekSepetiAPI;
  }

  @Nullable
  public String getGetirID() {
    return getirID;
  }

  public void setGetirID(@Nullable String getirID) {
    this.getirID = getirID;
  }

  @Nullable
  public String getGetirAPI() {
    return getirAPI;
  }

  public void setGetirAPI(@Nullable String getirAPI) {
    this.getirAPI = getirAPI;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}
