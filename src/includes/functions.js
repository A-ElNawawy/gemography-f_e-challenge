/*
** getDays Function to Calculate Difference ( in days ) Between Today And a Given Date [ Accepts Parameters]
** Parameters:
** date = Date Which We Want to Calculate
*/
function getDays(date){
  let today = new Date();
  date = new Date(date);
  const diffTime = Math.abs(today - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/*
** getDateOf Function to Get The Date of a certain Day [ Accepts Parameters]
** Parameters:
** noOfDaysBack = Number of How many Days We Want to Go Back
*/
function getDateOf(noOfDaysBack){
  let date = new Date();
  date.setDate(date.getDate()-noOfDaysBack);
  date = GetFormattedDate(date);
  return(date);
}

/*
** GetFormattedDate Function to Format a Given Date in This Format (yyyy-mm-dd) [ Accepts Parameters]
** Parameters:
** date = Date to Be Formatted
*/
function GetFormattedDate(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if(day < 10){day = "0" + day;}
  var year = date.getFullYear();
  return year + "-" + month + "-" + day;
}

/*
** getData Function to Fetch Data From github [ Accepts Parameters]
** Parameters:
** me = The ( This ) Keyword
** date = Repos Will Be Searched in The Period Between It (date) And Today
** pageNo = Page Number ( to Paginate Between Pages Came From github )
** per_page = How Much Repos We Want Per Page (Max: 100)
*/
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

function listenToScrolling(me) {
  let windowInnerHeight = window.innerHeight;
  let bodyHeight = document.body.clientHeight;
  let scrolled = document.documentElement.scrollTop;
  if (scrolled > bodyHeight - windowInnerHeight) {
    me.setState({loading: true});
    loadMore(me);
  }
}

function dampEvent(me) {
  if(!me.lock){
    me.lock = true;
    setTimeout(function () {
      //===================================
      let windowInnerHeight = window.innerHeight;
      let bodyHeight = document.body.clientHeight;
      let scrolled = document.documentElement.scrollTop;
      if (scrolled > bodyHeight - windowInnerHeight) {
        me.setState({loading: true});
        loadMore(me);
      }
      //===================================
      me.lock = false;
    }, 1000)
  }
}

export {
  getDays,
  getData,
  getDateOf,
  loadMore,
  listenToScrolling,
  dampEvent
}