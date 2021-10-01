import { Point } from "geojson";

export default function createDataPoint(gpsLocations){
    const _gpsLocations: Point = {
        type: 'Point',
        coordinates: [gpsLocations[0], gpsLocations[1]],
    };
    return _gpsLocations
}