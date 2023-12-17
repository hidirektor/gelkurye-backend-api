package me.t3sl4.gelkurye.payload.request;

import org.springframework.lang.Nullable;

import java.util.Set;

import javax.persistence.Column;
import javax.validation.constraints.*;

public class SignupRequest {

  @NotBlank
  @Size(max = 90)
  @Column(columnDefinition = "VARCHAR(255) COLLATE utf8_general_ci")
  private String nameSurname;

  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 20)
  private String phone;

  private String role;

  @NotBlank
  @Size(min = 6, max = 40)
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

  public String getUsername() {
    return username;
  }

  public void setUsername(String userName) {
    this.username = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String eMail) {
    this.email = eMail;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getRole() {
    return this.role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getNameSurname() {
    return nameSurname;
  }

  public void setNameSurname(String nameSurname) {
    this.nameSurname = nameSurname;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
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
}