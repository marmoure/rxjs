const blue = "color:#f4f4f4;";
const red = "color:pink;";

function logColor(val, color) {
    console.log(`%c${val}`,color);
}

export const logRed = (v) => logColor(v,red)
export const logBlue = (v) => logColor(v,blue);