package com.Lorem_Ipsum_SOEN343.Lorem_Ipsum_SOEN343.packages;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageRepo extends MongoRepository<Packages, ObjectId> {
}
