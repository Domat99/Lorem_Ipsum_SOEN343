package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.review;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery.Delivery;
import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.delivery.DeliveryRepo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepo reviewRepository;

    @Autowired
    private DeliveryRepo deliveryRepository;

    @PostMapping("/create")
    public ResponseEntity<String> addReview(@RequestParam ObjectId deliveryId, @RequestParam double rating, @RequestParam String description) {
        Delivery delivery = deliveryRepository.findById(deliveryId).orElse(null);
        if (delivery == null) {
            return ResponseEntity.badRequest().body("Delivery not found");
        }

        if (reviewRepository.findByDeliveryId(deliveryId) != null) {
            return ResponseEntity.badRequest().body("Review already exists for this delivery");
        }

        Review review = new Review();
        review.setId(new ObjectId());
        review.setDeliveryId(deliveryId);
        review.setRating(rating);
        review.setDescription(description);

        reviewRepository.save(review);

        return ResponseEntity.ok("Review added successfully");
    }

    @GetMapping("/get/{deliveryId}")
    public ResponseEntity<Review> getReview(@PathVariable ObjectId deliveryId) {
        Review review = reviewRepository.findByDeliveryId(deliveryId);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(review);
    }

    @GetMapping("/exists/{deliveryId}")
    public boolean checkIfReviewExists(@PathVariable ObjectId deliveryId) {
        return reviewRepository.findByDeliveryId(deliveryId) != null;
    }
}

