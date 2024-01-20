/* function floatToHex(value: number): string {
  return `0x${value.toString(16)}`;
} */

// function floatToHex(float: number) {
//   let floatInt = new Float32Array(1);
//   let intBytes = new Uint8Array(floatInt.buffer);
//   floatInt[0] = float;
//   let hexBytes = Array.from(intBytes).map((b) => b.toString(16).slice(-2));
//   return "0x" + hexBytes.join("");
// }

function floatToHexBigInt(num: number) {
  const bigIntNum = BigInt(Math.round(num * Math.pow(2, 53)));
  return `0x${bigIntNum.toString(16)}`;
}
function bigIntToHex(value: BigInt): string {
  return "0x0" + value.toString(16);
}

function floatToBytes(num: number) {
    const buffer = Buffer.alloc(4);
    buffer.writeFloatBE(num, 0);
    return Array.from(buffer);
}

function bytesToHex(bytes: any[]) {
    return bytes.map((byte: { toString: (arg0: number) => string; }) => byte.toString(16).padStart(2, '0')).join('');
}

function floatToHex(num: any) {
    const bytes = floatToBytes(num);
    return bytesToHex(bytes);
}

export { floatToHex, floatToHexBigInt, bigIntToHex };
