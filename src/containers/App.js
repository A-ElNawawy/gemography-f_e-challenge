import React from 'react';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Loading from '../components/Loading';
import { getDays, getData, getDateOf } from "../includes/functions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [<Loading>loading...</Loading>]
    };
  }

  componentDidMount() {
    let date = getDateOf(30);
    let pageNo = 1;
    let per_page = 100;
    getData(
      'https://api.github.com/search/repositories?q=created:>'+date
      +'&page='+pageNo
      +'&per_page='+per_page
      +'&sort=stars&order=desc'
    )
    .then(response => {
      this.setState({
        data: response
      });
    });
  }

  render(){
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
    }else{
      list = this.state.data
    }
    return (
      <div className="App">
        <Container>
          {
            list
          }
        </Container>
      </div>
    )
  }
}

export default App;