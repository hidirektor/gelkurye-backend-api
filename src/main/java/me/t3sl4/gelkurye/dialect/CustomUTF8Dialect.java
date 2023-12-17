package me.t3sl4.gelkurye.dialect;

import org.hibernate.dialect.MySQL8Dialect;

public class CustomUTF8Dialect extends MySQL8Dialect {

    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    }
}
