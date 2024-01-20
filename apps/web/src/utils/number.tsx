/* function floatToHex(value: number): string {
  return `0x${value.toString(16)}`;
} */

function floatToHex(float: number) {
  let floatInt = new Float32Array(1);
  let intBytes = new Uint8Array(floatInt.buffer);
  floatInt[0] = float;
  let hexBytes = Array.from(intBytes).map((b) =>
    ("00" + b.toString(16)).slice(-2),
  );
  return "0x" + hexBytes.join("");
}

export { floatToHex };
