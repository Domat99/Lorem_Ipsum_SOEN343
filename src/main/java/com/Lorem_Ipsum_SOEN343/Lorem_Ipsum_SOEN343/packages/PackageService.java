package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PackageService {

    @Autowired
    private PackageRepo packageRepo;

    public Optional<Packages> getPackageById(ObjectId packageId) {
        return packageRepo.findById(packageId);
    }

}
