//data transfer object
class chatDTO {
  #author;
  #texto;
  #date;

  get author() {
    return this.#author;
  }

  set author(value) {
    this.#author = value;
  }

  get texto() {
    return this.#texto;
  }

  set texto(value) {
    this.#texto = value;
  }

  get date() {
    return this.#date;
  }

  set date(value) {
    this.#date = value;
  }
}

module.exports = chatDTO;
