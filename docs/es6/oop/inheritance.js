class Person {
  constructor(name, year, ethnic) {
    this.name = name;
    this.year = year;
    this.ethnic = ethnic;
  }
  showInfo() {
    console.log(`${this.name}-${this.year}-${this.ethnic}`);
  }
}
class Student extends Person {
  constructor(name, year, ethnic, code) {
    super(name, year, ethnic);
    this.code = code;
  }
  showInfo() {
    console.log(`${this.name}-${this.year}-${this.ethnic}-${this.code}`);
  }
}
const Nguyen_Van_A = new Student("Le Phuc Thanh", 2002, "Kinh", "SV001");
Nguyen_Van_A.showInfo();
