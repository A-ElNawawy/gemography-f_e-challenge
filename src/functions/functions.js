function getDays(date1){
  let date2 = new Date();
  date1 = new Date(date1);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export {
  getDays,
}