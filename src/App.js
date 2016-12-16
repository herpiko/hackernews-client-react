import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title : 'React',
    url : 'https://facebook.github.io/react/',
    auhtor: 'Jordan Walke',
    num_comments : 3,
    points : 3,
    objectId : 0,
  },
  {
    title : 'Redux',
    url : 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    points : 5,
    objectId: 1,
  }
];

function isSearched(query) {
  return function(item) {
    return !query || item.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list : list,
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({query : event.target.value}); 
  }
  
  render() {
    const title = 'Hackernews';
    const query = this.state.query;
    return (
      <div className="App">
        <Search value={query} onChange={this.onSearchChange}>
          Search : 
        </Search>
        <Table list={list} pattern={query} />
      </div>
    );
  }
}


// Component with state
/* class Search extends Component { */
/*   render() { */
/*     const { value, onChange, children } = this.props; */
/*     return ( */
/*       <form> */
/*         {children} <input type="text" value={value} onChange={onChange} /> */
/*       </form> */
/*     ) */
/*   } */
/* } */

// Funcitonal stateless component
const Search = function(props) {
  const {value, onChange, children} = props;
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange}/>
    </form>
  )
}

class Table extends Component {
  render(){
    const {list, pattern} = this.props;
    return (
      <div>
        { list.filter(isSearched(pattern)).map((item) => {
            return (
              <div key={item.objectId}>
                <span><a href={item.url}>{item.title}</a></span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
              </div>
            )
        }) }
      </div>
    )
  }
}

export default App;
