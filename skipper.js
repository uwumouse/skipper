/**
 * 
 * @param {string | HTMLVideoElement} vid - a video element that will be watched for skips
 * @param { { start: number, end: number }[] } skipPoints - an array of intervals that are needed to be skipped
 */
export default function skipper(vid, skipPoints) {
    return new Promise((res, rej) => {
        if (typeof vid == "string") {
            vid = document.querySelector(vid);
    
            if (!vid) rej(new Error(`Element with identifier ${vid} not found.`));
        }

        if (!vid || typeof vid != "object" && vid?.nodeName != "VIDEO") {
            return rej(new Error("Invalid element. Expected type: VIDEO"));
        }
        // Current part that are going to be skipped
        let currentSkipIntreval = 0;
        const skipInterval = setInterval(() => {
            if (vid.ended || currentSkipIntreval >= skipPoints.length) {
                clearInterval(skipInterval);
                return res()
            }

            const { start, end }  = skipPoints[currentSkipIntreval]; 

            if (vid.currentTime >= start) {
                vid.currentTime = end;
            }

            if (vid.currentTime >= end) {
                currentSkipIntreval++;
                return;
            }
        }, 1000);
    });
}