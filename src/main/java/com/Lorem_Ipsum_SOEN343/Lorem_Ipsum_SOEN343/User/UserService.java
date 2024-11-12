package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.User;

import com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.security.SecurityConfig;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public User createUser(User user) {

        user.setPassword(SecurityConfig.getInstance().hashPassword(user.getPassword()));
        return userRepository.save(user);

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public User updateUser(ObjectId id, User userDetails) throws Exception {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("User not found"));

        user.setName(userDetails.getName());
        user.setPassword(SecurityConfig.getInstance().hashPassword(userDetails.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(ObjectId id) {
        userRepository.deleteById(id);
    }

    public User signIn(String email, String password) {
        User user = userRepository.findByEmail(email);
        String hashedPassword;

        hashedPassword = SecurityConfig.getInstance().hashPassword(password);

        if (user != null && user.getPassword().equals(hashedPassword)) {
            return user;
        } else {
            return null;
        }

    }
}
