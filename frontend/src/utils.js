export function persentDifference(a, b) {
    return (100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function toFixedPrice2 (sum) {
    return sum.toFixed(2)
}


