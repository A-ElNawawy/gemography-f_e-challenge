import React from 'react';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Loading from '../components/Loading';
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
      coding: true /*true*//*false*/,
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

  render(){
    let me = this;
    if(!this.state.loading){
      window.addEventListener("scroll", () => {listenToScrolling(me)});
    }
    let list = [];
    let items = this.state.data.items? this.state.data.items : null;
    let message = this.state.data.message? this.state.data.message : null;
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
    }else if(message){
      list = [message];
    }
    return (
      <div id="App" className="App">
        <Container>
          {
            list
          }
          {
            this.state.loading?
              <Loading>loading.....</Loading>
            :
              null
          }
        </Container>
      </div>
    )
  }
}

export default App;