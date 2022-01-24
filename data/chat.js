const fs = require("fs").promises;

class Chat {
  constructor() {
    this.chatMsj = [];
  }

  async addMessage(message) {
    try {
      this.chatMsj.push(message);
      await fs.writeFile("./data/chatMsj.json", JSON.stringify(this.chatMsj));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMessage() {
    try {
      const chatStored = await fs.readFile("./data/chatMsj.json", "utf-8");

      this.chatMsj = JSON.parse(chatStored);
      return this.chatMsj;
    } catch (error) {
      await fs.writeFile("./data/chatMsj.json", JSON.stringify(this.chatMsj));
      throw new Error(error);
    }
  }
}
module.exports = Chat;
