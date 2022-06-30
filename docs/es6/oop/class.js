class Student {
  constructor(code, name, year) {
    this.code = code;
    this.name = name;
    this.year = year;
  }
  showInfo() {
    console.log(`${this.code} - ${this.name} - ${this.year}`);
  }
  getYear() {
    const date = new Date();
    const year = date.getFullYear();
    const age = year - this.year;
    console.log(age);
  }
}
let lePhucThanh = new Student("SV001", "Le Phuc Thanh", 2002);
lePhucThanh.getYear();
