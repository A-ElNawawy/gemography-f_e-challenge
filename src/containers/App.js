import React from 'react';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Message from '../components/Message';
import {
  getDays,
  getData,
  getDateOf,
  loadMore,
  listenToScrolling
  } from "../includes/functions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coding: true, // just for testing
      loading: false,
      items: [], // array of all repos we get from server
      message: "", // error message we get from server
      date: getDateOf(30), // number of days we want to go back to get repos
      pageNo: 1, // page number we will send to github
      per_page: 100 // number of repos we want per page
    };
  }

  componentDidMount() {
    if(!this.state.coding){ // just for testing
      getData(
        this,
        this.state.date,
        this.pageNo,
        this.state.per_page
      );
      loadMore(this);
    }
  }

  lock = false; // this variable to be used in dampEvent function to prevent multi requests
  render(){
    let me = this;
    if(!this.state.loading){ // if we are loading data from server, don't listen to scrolling
      window.addEventListener("scroll", () => {listenToScrolling(me)});
    }
    let list = []; // array that will contain all CardSidePic components
    let items = this.state.items;
    let message = this.state.message;
    if (items){
      for(let repo of items){
        list.push(
          <CardSidePic
            key={repo.id}
            img={repo.owner.avatar_url}
            alt="Avatar"
            repoName={repo.name}
            description={repo.description}
            starsNo={repo.stargazers_count}
            issuesNo={repo.open_issues_count}
            ownerName={repo.owner.login}
            timeInterval={getDays(repo.created_at)}
          ></CardSidePic>
        );
      }
    }
    return (
      <div id="App" className="App">
        <Container>
          {list}
          {
            message.includes("API rate limit exceeded for") ?
              <Message>You Exceeded The API Rate Limit, Please Wait A While Then Refresh Your Page</Message>
            :
              null
          }
          {
            this.state.loading?
              <Message>loading...</Message>
            :
              null
          }
        </Container>
      </div>
    )
  }
}

export default App;