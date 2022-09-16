"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinutesToHoursString = void 0;
function convertMinutesToHoursString(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}`;
}
exports.convertMinutesToHoursString = convertMinutesToHoursString;
