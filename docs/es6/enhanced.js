function getCourse(name, price, free) {
  return {
    name,
    price,
    free,
    showInfo() {
      console.log(`${name}-${price}-${free}`);
    },
  };
}
let myCourse = getCourse("Javascript", 50, false);
console.log(myCourse);
