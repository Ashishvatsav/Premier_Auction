package com.bidkart.controller;

import com.bidkart.model.*;
import com.bidkart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuctionController {

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private BidRepository bidRepo;

    // Add product
    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    // Get all products
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    // Place bid
    @PostMapping("/bid")
    public String placeBid(@RequestBody Bid bid) {

        List<Bid> bids = bidRepo.findByProductId(bid.getProductId());

        double maxBid = bids.stream()
                .mapToDouble(Bid::getAmount)
                .max()
                .orElse(0);

        if (bid.getAmount() <= maxBid) {
            return "Bid must be higher ❌";
        }

        bidRepo.save(bid);
        return "Bid placed successfully ✅";
    }
}