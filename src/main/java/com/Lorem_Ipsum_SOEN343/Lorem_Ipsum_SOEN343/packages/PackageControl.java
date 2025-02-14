package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/packages")
public class PackageControl {

    @Autowired
    private PackageService packageService;


    @GetMapping("/{id}")
    public Packages getPackageById(@PathVariable ObjectId id) {
        return packageService.getPackageById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
    }

}
