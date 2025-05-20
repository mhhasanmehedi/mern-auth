export function generateTransactionId() {
  function generateRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const tran_id = `${generateRandomString(2)}${
    Math.floor(Math.random() * 90000) + 10000
  }${generateRandomString(3)}${Math.floor(Math.random() * 9000) + 1000}`;
  return tran_id;
}
