"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindNearByWorkers = void 0;
// * Find nearby workers using the Haversine formula
// const FindNearByWorkers = (coords: CoordsTypes, workerData: workerDetailsWithlatlon[]) => {
const FindNearByWorkers = (coords, workerData) => {
    // * Haversine distance calculation
    function haversineDistance(lat1, lon1, lat2, lon2) {
        const toRadians = (degree) => (degree * Math.PI) / 180;
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }
    // * Extract target coordinates from input
    const targetLatitude = coords === null || coords === void 0 ? void 0 : coords.latitude;
    const targetLongitude = coords === null || coords === void 0 ? void 0 : coords.longitude;
    const maxDistance = 25; // Distance in km
    // * Filter workers by distance
    const nearbyWorkers = workerData === null || workerData === void 0 ? void 0 : workerData.filter((worker) => {
        if (!(worker === null || worker === void 0 ? void 0 : worker.latitude) || !(worker === null || worker === void 0 ? void 0 : worker.longitude))
            return false; // Check if worker coordinates are valid
        const distance = haversineDistance(11.0128646, 76.9654417, worker === null || worker === void 0 ? void 0 : worker.latitude, worker === null || worker === void 0 ? void 0 : worker.longitude);
        // console.log("Distance to worker:", distance, "km");
        return distance <= maxDistance; // Only include workers within 25km
    });
    // console.log('Nearby Workers:', nearbyWorkers); 
    return nearbyWorkers;
};
exports.FindNearByWorkers = FindNearByWorkers;
