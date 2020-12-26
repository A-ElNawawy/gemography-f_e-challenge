import React from 'react';
import demoData from '../demoData/data';
import CardSidePic from '../components/CardSidePic';
import Container from '../components/Container';
import Loading from '../components/Loading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [<Loading>loading...</Loading>]
    };
  }

  render(){
    getData()
    .then( function(data){
      for(let repo of data.items){
        this.setState({
          list: new Date()
        });
        this.setState((state, props) => ({
          list: state.list.push(
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
          )
        }));
        //list.push(
        //  <CardSidePic
        //    key={repo.id}
        //    img={repo.owner.avatar_url}
        //    alt="Avatar"
        //    repoName={repo.name}
        //    description={repo.description}
        //    starsNo={repo.stargazers_count}
        //    issuesNo={repo.open_issues_count}
        //    ownerName={repo.owner.login}
        //    timeInterval={getDays(repo.created_at)}
        //  ></CardSidePic>
        //);
      }
    }else{
      list = this.state.data
    }
    return (
      <div className="App">
        <Container>
          {this.state.list}
        </Container>
      </div>
    )
  }
}

export default App;