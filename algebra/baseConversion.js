/**
 *
 * @param {number} decimal
 * @param {number} base base value <= 62
 */
function baseConversion(decimal, base) {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const result = [];
  while (decimal > 0) {
    result.push(chars[decimal % base]);
    decimal = Math.floor(decimal / base);
  }

  return result.reverse().join('');
}

function main() {
  console.log(
    '> ',
    baseConversion(Number(process.argv[2]), Number(process.argv[3]))
  );
}

main();
