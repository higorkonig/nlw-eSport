"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHoursStringToMinutes = void 0;
function convertHoursStringToMinutes(time) {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minutes;
    return timeInMinutes;
}
exports.convertHoursStringToMinutes = convertHoursStringToMinutes;
