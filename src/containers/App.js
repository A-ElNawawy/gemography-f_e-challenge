import React from 'react';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Loading from '../components/Loading';
import {
  getDays,
   getData,
   getDateOf,
   loadMore,
   addString
  } from "../includes/functions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    getData(
      this,
      this.state.date,
      this.pageNo,
      this.state.per_page
    );
    loadMore(this);
  }

  render(){
    /*
    let me = this;
    //window.onscroll = function() {myFunction(me)};
    function myFunction(me) {
      let scrollRatio = document.documentElement.scrollTop / document.body.clientHeight;
      if (scrollRatio > .8) {
        document.getElementById("App").style.backgroundColor = "red";
        //console.log(me);
        //loadMore(me);
      } else {
        document.getElementById("App").style.backgroundColor = "white";
      }
    }
*/
    console.log(this.state.data);
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
            this.state.loading?
              <Loading>loading.....</Loading>
            :
              <div>
                {
                  list
                }
                <button
                  onClick={
                    () => {
                      loadMore(this);
                    }
                  }
                >Load more</button>
                <button
                
                >Add String to Array</button>
              </div>
          }
        </Container>
      </div>
    )
  }
}

export default App;