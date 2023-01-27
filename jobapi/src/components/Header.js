import React from "react";


class Header extends React.Component {
    


  render() {
   
    return (
        <div className="header">
        <div className="headerText">
          <h1>Job Board</h1>
          <p>
            Find your dream job or post an available position in your company
          </p>
        </div>
        <div className="buttons">
          <button className="headerBtn" onClick={this.props.handleLoadForm}>Post a job</button>
          <button className="headerBtn" onClick={this.props.handleLoadBrowse}>Browse jobs</button>
        </div>
      </div>
    );
  }
}

export default Header;