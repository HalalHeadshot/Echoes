# Memory Model (Mongoose + GeoJSON)

This file defines a MongoDB schema for storing memories with geographical coordinates using GeoJSON format and a 2dsphere index for efficient geospatial queries.

```js
const mongoose = require('mongoose');


const memorySchema = new mongoose.Schema({
   //userId reference of User model is set in backend in create memory route from cookies , req.user._id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    address: { type: String, required: true }
  },
  photoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 2dsphere index for geospatial queries
memorySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Memory', memorySchema);

/*
------------------------------------------------------------
GeoJSON Explained
------------------------------------------------------------
GeoJSON is a standard JSON format for representing geographical data.

A Point in GeoJSON looks like this:
{
  "type": "Point",
  "coordinates": [longitude, latitude]
}

- "type": Always "Point" for single coordinate locations.
- "coordinates": Must be in [longitude, latitude] order (not lat, lng).


So, in Mongoose, we represent it like this:
--------------------------------------------------------------------------------
|   GeoJSON Key     |    	Mongoose Definition                                |
--------------------------------------------------------------------------------
|     "type"        |       	type: { type: String, enum: ['Point'] }        |
|  "coordinates"    |         coordinates: { type: [Number] }                  |
--------------------------------------------------------------------------------
MongoDB understands this GeoJSON structure for geospatial operations such as:
- $near
- $geoWithin
- $geoIntersects

------------------------------------------------------------
Why Use a 2dsphere Index
------------------------------------------------------------
memorySchema.index({ location: '2dsphere' });

Without a 2dsphere index:
- MongoDB doesn’t know that 'location' contains geographical data.
- Queries like $near or $geoWithin won’t work properly.
- MongoDB would scan every document manually, making searches slow.

With a 2dsphere index:
- MongoDB can calculate distances between coordinates efficiently.
- Enables precise queries such as:
    - "Find all memories within 5 km of this point."
    - "Show memories closest to the current user."
- Optimized for Earth’s spherical geometry (not flat coordinates).

------------------------------------------------------------
Example: Finding Nearby Memories
------------------------------------------------------------
const nearby = await Memory.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [77.5946, 12.9716] // [longitude, latitude]
      },
      $maxDistance: 5000 // in meters
    }
  }
});

This query returns all memories within 5 km of the given location,
sorted by proximity (nearest first).

------------------------------------------------------------
Example Memory Document
------------------------------------------------------------
{
  "_id": "671fabc123...",
  "userId": "671e9876...",
  "title": "Trip to Goa",
  "description": "Sunset at the beach",
  "location": {
    "type": "Point",
    "coordinates": [73.8567, 15.2993],
    "address": "Goa, India"
  },
  "photoUrl": "https://example.com/photo.jpg",
  "createdAt": "2025-10-26T12:00:00Z"
}

------------------------------------------------------------
Summary
------------------------------------------------------------
Field                    | Description
------------------------------------------------------------
location.type            | Identifies GeoJSON Point type
location.coordinates     | Stores [longitude, latitude]
2dsphere index           | Enables fast geospatial queries
$near                    | Finds nearby memories efficiently
address                  | Human-readable text for coordinates
------------------------------------------------------------
*/
