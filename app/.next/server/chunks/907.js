"use strict";
exports.id = 907;
exports.ids = [907];
exports.modules = {

/***/ 6907:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ib": () => (/* binding */ isDatePublicHoliday),
/* harmony export */   "vA": () => (/* binding */ prefetchPublicHolidays)
/* harmony export */ });
/* unused harmony export fetchPublicHolidaysForYear */
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1492);
/* harmony import */ var _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7211);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__]);
([firebase_firestore__WEBPACK_IMPORTED_MODULE_0__, _firebaseConfig__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// app/src/utils/publicHolidays.js

 // Assuming your firebase db export is named 'db'
// Frontend cache for public holidays
const publicHolidaysCache = new Map(); // Stores holidays by year e.g. {2024: [{date: "2024-01-01", name: "New Year's Day"}, ...]}
/**
 * Fetches public holidays for a given year directly from Firestore.
 * Results are cached to avoid redundant calls.
 * @param {number | string} year The year for which to fetch public holidays.
 * @returns {Promise<Array<{date: string, name: string}>>} A promise that resolves to an array of holiday objects.
 */ const fetchPublicHolidaysForYear = async (year)=>{
    const yearStr = String(year);
    if (publicHolidaysCache.has(yearStr)) {
        return publicHolidaysCache.get(yearStr);
    }
    try {
        console.log(`Fetching public holidays for ${yearStr} directly from Firestore...`);
        const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.doc)(_firebaseConfig__WEBPACK_IMPORTED_MODULE_1__.db, "public_holidays", yearStr); // Corrected collection name
        const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__.getDoc)(docRef);
        if (docSnap.exists()) {
            // Assuming 'singapore' is the key under which holidays are stored, as per backend logic
            const holidays = docSnap.data().singapore || []; // Corrected data access
            publicHolidaysCache.set(yearStr, holidays);
            console.log(`Successfully fetched and cached ${holidays.length} holidays for ${yearStr} from Firestore.`);
            return holidays;
        } else {
            console.log(`No public holiday document found for ${yearStr} in Firestore.`);
            publicHolidaysCache.set(yearStr, []); // Cache empty array if doc doesn't exist
            return [];
        }
    } catch (error) {
        console.error(`Error fetching public holidays for ${yearStr} from Firestore:`, error);
        // Cache an empty array on error to prevent repeated failed calls for the same year during a session
        publicHolidaysCache.set(yearStr, []);
        return []; // Return empty array on error
    }
};
/**
 * Checks if a given date is a public holiday.
 * It fetches the holidays for the date's year from Firestore if not already cached.
 * @param {Date | string} dateInput The date to check (Date object or "YYYY-MM-DD" string).
 * @returns {Promise<boolean>} True if the date is a public holiday, false otherwise.
 */ const isDatePublicHoliday = async (dateInput)=>{
    let dateObj;
    let dateStr;
    if (typeof dateInput === "string") {
        // Validate YYYY-MM-DD format somewhat
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
            // Try to parse it if it's a different but valid date string format
            const parsedDate = new Date(dateInput);
            if (isNaN(parsedDate.getTime())) {
                console.error("Invalid date string provided to isDatePublicHoliday:", dateInput);
                return false;
            }
            dateObj = parsedDate;
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            dateStr = `${year}-${month}-${day}`;
        } else {
            dateStr = dateInput;
            dateObj = new Date(dateInput); // Assumes UTC if no timezone, or local depending on browser
            // Adjust for potential timezone issues by ensuring we use parts from the string
            const parts = dateInput.split("-");
            dateObj = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
        }
    } else if (dateInput instanceof Date) {
        dateObj = dateInput;
        // Format Date object to "YYYY-MM-DD" string using UTC to avoid timezone shifts
        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(dateObj.getUTCDate()).padStart(2, "0");
        dateStr = `${year}-${month}-${day}`;
    } else {
        console.error("Invalid dateInput provided to isDatePublicHoliday. Must be a Date object or a valid date string.");
        return false;
    }
    const year = dateObj.getUTCFullYear(); // Use UTC year
    try {
        const holidaysForYear = await fetchPublicHolidaysForYear(year);
        if (!Array.isArray(holidaysForYear)) {
            console.error(`Expected an array of holidays for ${year}, but got:`, holidaysForYear);
            return false;
        }
        return holidaysForYear.some((holiday)=>holiday.date === dateStr);
    } catch (error) {
        console.error(`Error checking if ${dateStr} is a public holiday:`, error);
        return false;
    }
};
/**
 * Pre-fetches public holidays for a given list of years to populate the cache.
 * @param {Array<number | string>} years Array of years to pre-fetch.
 */ const prefetchPublicHolidays = async (years)=>{
    const fetchPromises = years.map((year)=>fetchPublicHolidaysForYear(String(year)));
    try {
        await Promise.all(fetchPromises);
        console.log("Successfully prefetched public holidays from Firestore for years:", years.join(", "));
    } catch (error) {
        console.error("Error prefetching public holidays from Firestore:", error);
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;