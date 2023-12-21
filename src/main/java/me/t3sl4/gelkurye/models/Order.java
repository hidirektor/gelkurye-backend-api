package me.t3sl4.gelkurye.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.security.Timestamp;

@Entity
@Table(name = "Orders",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "orderID")
        })
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @NotBlank
    @Size(max = 90)
    private String productName;

    @NotBlank
    @Size(max = 90)
    private String productShop;

    @NotBlank
    @Size(max = 90)
    private Timestamp orderDate;

    @NotBlank
    @Size(max = 50)
    private Long orderPrice;

    @NotBlank
    @Size(max = 70)
    private String clientName;

    @NotBlank
    @Size(max = 255)
    private String clientAddress;

    @NotBlank
    @Size(max = 12)
    private String clientPhone;

    @NotBlank
    @Size(max = 65)
    private String clientMail;

    public Order() {

    }

    public Order(Long orderID, String productName, String productShop, Timestamp orderDate, Long orderPrice, String clientName, String clientAddress, String clientPhone, String clientMail) {
        this.orderID = orderID;
        this.productName = productName;
        this.productShop = productShop;
        this.orderDate = orderDate;
        this.orderPrice = orderPrice;
        this.clientName = clientName;
        this.clientAddress = clientAddress;
        this.clientPhone = clientPhone;
        this.clientMail = clientMail;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductShop() {
        return productShop;
    }

    public void setProductShop(String productShop) {
        this.productShop = productShop;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public Long getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(Long orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

    public String getClientMail() {
        return clientMail;
    }

    public void setClientMail(String clientMail) {
        this.clientMail = clientMail;
    }
}
