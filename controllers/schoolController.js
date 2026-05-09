const { createSchool, getAllSchools } = require('../models/schoolModel');

/**
 * Haversine formula — calculates the great-circle distance (in km)
 * between two geographic coordinates.
 *
 * @param {number} lat1 - Latitude of point A
 * @param {number} lon1 - Longitude of point A
 * @param {number} lat2 - Latitude of point B
 * @param {number} lon2 - Longitude of point B
 * @returns {number} Distance in kilometres
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ─── POST /addSchool ───────────────────────────────────────────────────────────
/**
 * Add a new school to the database.
 */
const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const school = await createSchool({
      name: name.trim(),
      address: address.trim(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: school,
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET /listSchools ─────────────────────────────────────────────────────────
/**
 * Fetch all schools sorted by distance from the provided coordinates.
 */
const listSchools = async (req, res, next) => {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    const schools = await getAllSchools();

    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: parseFloat(
        haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(4)
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: 'Schools fetched and sorted by proximity',
      count: schoolsWithDistance.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: schoolsWithDistance,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addSchool, listSchools };
