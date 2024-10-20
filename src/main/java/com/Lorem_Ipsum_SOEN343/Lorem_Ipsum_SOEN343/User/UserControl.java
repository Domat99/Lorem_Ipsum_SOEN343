package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.User;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserControl {

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User newUser = userService.createUser(user);
        if(newUser != null){
            return new ResponseEntity<>(newUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.CONFLICT);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable ObjectId id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable ObjectId id, @RequestBody User user) {
        try {
            User updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable ObjectId id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<Map<String, Object>> signIn(@RequestParam String email, @RequestParam String password) {
        User user = userService.signIn(email,password);
        if (user != null){
            String cookieValue = ResponseCookie.from("userId", user.getId().toString())
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build()
                    .toString();

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, cookieValue);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("user", user);
            responseBody.put("userId", user.getId().toString());

            return ResponseEntity.ok().headers(headers).body(responseBody);

        }
        else
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }

}
