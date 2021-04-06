/**
 * 
 * @param arr base64ArrayBuffer
 * @returns base64
 */

const toBase64 = (arr) =>
        btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''))


export default toBase64