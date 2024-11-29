"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoCoding = void 0;
const axios_1 = __importDefault(require("axios"));
const GeoCoding = (workerData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(`Request reached Geocoding`)
    var _a;
    const { country, postalCode, state, city, streetAddress } = workerData;
    // * Construct the full address
    const fullAddress = `${city}, ${state}, ${postalCode}, ${country}`;
    const encodedAddress = encodeURIComponent(fullAddress);
    // * Construct the Nominatim API URL
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;
    try {
        const response = yield axios_1.default.get(apiUrl);
        if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const location = response === null || response === void 0 ? void 0 : response.data[0];
            // console.log(`Latitude: ${location?.lat}, Longitude: ${location?.lon}`);
            return location;
        }
        else {
            // console.error('No results found');
            return false;
        }
    }
    catch (error) {
        console.log(`Error from Geodecoding`, error);
    }
});
exports.GeoCoding = GeoCoding;
