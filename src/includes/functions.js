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







async function getData(me, date, pageNo, per_page) {
  me.setState({loading: true});
  let api = 'https://api.github.com/search/repositories?q=created:>'
  +date
  +'&page='+pageNo
  +'&per_page='+per_page
  +'&sort=stars&order=desc';
  await fetch(api)
  .then(response => response.json())
  .then(data => {
    if(data.items){
      if(me.state.items.length === 0){
        me.setState(
          (state) =>({
            items: state.items.concat(data.items)
          })
        );
      }else{
        if(me.state.items[0].full_name !== data.items[0].full_name){
          me.setState(
            (state) =>({
              items: state.items.concat(data.items)
            })
          );
        }
      }
    }else if(data.message) {
      me.setState({message: data.message});
    }else{
      console.log(data);
    }
    me.setState({loading: false});
  });
}

function loadMore(me) {
  me.setState((state) => ({
    pageNo: state.pageNo + 1
  }));
  getData(
    me,
    me.state.date,
    me.state.pageNo,
    me.state.per_page
  );
}

export {
  getDays,
  getData,
  getDateOf,
  loadMore,
  addString
}