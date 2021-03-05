/**
 * 
 * @param {string | HTMLVideoElement} vid - video element to be watcher for skips
 * @param { { start: number, end: number }[] } skipPoints - an array of points that are needed to be skipped
 */
export default function skipper(vid, skipPoints) {
    if (typeof vid == "string") {
        vid = document.querySelector(vid);

        if (!vid) throw new Error(`Element with identifier ${vid} not found.`);
    }
    if (typeof vid != "object" && vid.nodeName != "VIDEO") {
        throw new Error("Invalid element. Expected type: VIDEO");
    }

    return new Promise((res) => {
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