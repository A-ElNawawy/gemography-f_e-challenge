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
    //Check if response has items & add them to items array
    if(data.items){
      if(me.state.items.length === 0){
        me.setState(
          (state) =>({
            items: state.items.concat(data.items)
          })
        );
      }else{
        //To Prevent duplication of data
        if(me.state.items[0].full_name !== data.items[0].full_name){
          me.setState(
            (state) =>({
              items: state.items.concat(data.items)
            })
          );
        }
      }
    // if we have error
    }else if(data.message) {
      me.setState({message: data.message});
    }
    me.setState({loading: false});
  });
}

/*
** loadMore Function to increment the pageNo App state and Fetch Data From github [ Accepts Parameters]
** Parameters:
** me = The ( This ) Keyword
*/
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

/*
** listenToScrolling Function is monitoring if user reach the end of repos list, if so, it calls loadMore Function but throw dampEvent Function [ Accepts Parameters]
** Parameters:
** me = The ( This ) Keyword
*/
function listenToScrolling(me) {
  let windowInnerHeight = window.innerHeight; // user screen hight
  let bodyHeight = document.body.clientHeight; // the overall body hight ( increases with more repos loading )
  let scrolled = document.documentElement.scrollTop; // how much user scrolled the document
  if (scrolled > bodyHeight - windowInnerHeight) { // that means that user reached the end of page
    if(me.state.message == "") { // if we have a message, that means we have error, so don't fetch data till user refresh the page
      dampEvent(me);
    }
  }
}

/*
** dampEvent Function:
** if we call loadMore function directly from listenToScrolling function, we will get a massive amount of fetches which will make  an error in server
** so, just we get the event for one time, we want to lock the listener till the fetch ends
** and this is the dampEvent function
** [ Accepts Parameters]
** Parameters:
** me = The ( This ) Keyword
*/
function dampEvent(me) {
  if(!me.lock /* lock must be declared out of this function, and can't be a state */){
    me.lock = true; // scrolling will not affect loadMore for one second
    setTimeout(function () {
      //===================================
      loadMore(me);
      //===================================
      me.lock = false; // we can receive another event now
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