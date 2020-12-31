function getDays(date1){
  let today = new Date();
  date1 = new Date(date1);
  const diffTime = Math.abs(today - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getDateOf(noOfDaysBack){
  let date = new Date();
  date.setDate(date.getDate()-noOfDaysBack);
  date = GetFormattedDate(date);
  return(date);
}

function GetFormattedDate(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if(day < 10){
    day = "0" + day;
  }
  var year = date.getFullYear();
  return year + "-" + month + "-" + day;
}

async function getData(api) {
  let result = await fetch(api)
  .then(response => response.json());
  return result;
}

export {
  getDays,
  getData,
  getDateOf
}