package com.bidkart.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private Long userId;
    private double amount;
}