package me.t3sl4.gelkurye.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "UserFiles",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "userName")
        })
public class UserFiles {
    @Id
    @NotBlank
    @Size(max = 60)
    private String userName;

    @NotBlank
    @Size(max = 90)
    private String profilePhoto;

    @Size(max = 90)
    private String licenseFront;

    @Size(max = 90)
    private String licenseBack;

    public UserFiles() {

    }
}
