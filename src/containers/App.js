import React from 'react';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Message from '../components/Message';
import {
  getDays,
   getData,
   getDateOf,
   loadMore,
   listenToScrolling,
   dampEvent
  } from "../includes/functions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coding: false /*true*//*false*/,
      loading: false,
      data: {},
      items: [],
      message: "",
      date: getDateOf(30),
      pageNo: 1,
      per_page: 30
    };
  }

  componentDidMount() {
    if(!this.state.coding){
      getData(
        this,
        this.state.date,
        this.pageNo,
        this.state.per_page
      );
      loadMore(this);
    }
  }

  lock = false;
  render(){
    let me = this;
    if(!this.state.loading){
      window.addEventListener("scroll", () => {dampEvent(me)});
    }
    let list = [];
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
              <Message>You Exceeded The API Rate Limit, Please Wait A While Then Refresh Your Page or Scroll Again</Message>
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