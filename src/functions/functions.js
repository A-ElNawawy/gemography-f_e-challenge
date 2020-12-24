function getDays(date1){
  let date2 = new Date();
  date1 = new Date(date1);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

async function getData() {
  let result = await fetch('https://api.github.com/search/repositories?q=created:>2020-12-20&sort=stars&order=desc')
  .then(response => response.json());
  console.log(typeof result);
  console.log(result);
  return result;
}

//async function getText(file) {
//  let myObject = await fetch(file);
//  let myText = await myObject.text();
//  myDisplay(myText);
//}


export {
  getDays,
  getData
}