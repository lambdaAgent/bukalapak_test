import React, { Component } from 'react';
import $ from "jquery";
import Panel from "./panel";
import data from "../json/main.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data1: undefined, data2: undefined, data3:undefined, viewSub1: false, viewSub2: false}
  }
  componentWillMount(){
    fetch("http://localhost:8000/getMain")
    .then(res => res.json())
    .then(res => this.setState({data1: res}))
  }
  _fetchJson(obj){
    if(obj.sub && obj.sub !== null){
      fetchingJSON(obj.sub, this);
    }       
  }
  _fetchJson2(obj){
    if(obj.sub && obj.sub !== null){
      fetchingJSON2(obj.sub, this);
    }       
  }
  render() {
    const main = this.state.data1;
    return (
      <div className="App">
        
        <div className="container">
          <div className="col-md-4 col-sm-4">
            <Panel 
              data = {main}
              onClick={(sub) => this._fetchJson.call(this, sub)}
            />
          </div>
          <div className="col-md-4 col-sm-4">
            <Panel 
              data = {this.state.data2}
              onClick={(sub) => this._fetchJson2.call(this, sub)}
              closePanel={() => this.setState({data2: undefined}) }
            />
          </div>
         <div className="col-md-4 col-sm-4">
              <Panel 
                data = {this.state.data3}
                closePanel={() => this.setState({data3: undefined}) }
              />
            </div>
        </div>
      </div>
    );
  }
}

export default App;


function fetchingJSON(sub, React){
  var url = "http://localhost:8000/category?category=" + sub;
      fetch(url)
          .then(res => res.json())
          .then(res => {
            React.setState({
              data2: res,
            })
          })
}


function fetchingJSON2(sub, React){
  var url = "http://localhost:8000/category?category=" + sub;
      fetch(url)
          .then(res => res.json())
          .then(res => {
            React.setState({
              data3: res,
            })
          })
}

