import { skipper } from "../skipper.js";

const vid = document.getElementById("vid");


// This will be a callback when all skipable parts will be skipped
const skips = skipper("#vid", [{ start: 2, end: 18 }]);

skips.then(() => {
    document.getElementById("alert").innerText = "You skipped annoyning intro!";
});