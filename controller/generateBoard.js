async function generateRandomBoard() {
    const getRandomChar = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*';
        return characters.charAt(Math.floor(Math.random() * characters.length));
    };
    try {
        let randomString = '';
        for (let i = 0; i < 16; i++) {
        randomString += getRandomChar();
      }
      console.log(randomString);
      return randomString;
    } catch (error) {
      throw new Error('Failed to generate random string');
    }
  }

module.exports = { generateRandomBoard };

