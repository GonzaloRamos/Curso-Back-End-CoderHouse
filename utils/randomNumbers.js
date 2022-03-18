const generateRandomNumbers = (quantity) => {
  const resp = {};
  for (let index = 0; index <= quantity; index++) {
    let key = Math.floor(Math.random() * quantity) + 1;
    const initialCount = 0;
    if (Object.hasOwnProperty.call(resp, key)) {
      resp[key] += 1;
    } else {
      resp[key] = initialCount;
    }
  }
  return resp;
};

process.on("message", (data) => {
  const calculo = generateRandomNumbers(data);
  process.send(calculo);
});

module.exports = generateRandomNumbers;
