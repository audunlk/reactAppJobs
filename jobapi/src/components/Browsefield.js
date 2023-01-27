/* import React from "react";

class BrowseField extends React.Component{
    
    render(){
        const filteredJobs = this.props.jobs.filter((job) => {
            return job.title.toLowerCase().includes(this.props.search.toLowerCase());
            });
            
        return(
            <div className="browseField">
        <div className="browseJobContainer">
        <input className="inputfield" type="text" placeholder="Search for a job and press enter" onChange={this.props.handleSearchChange}/>
          {this.props.isLoading ? (
            <p>Loading...</p>
          ) : 
          filteredJobs.map((job) => (
            <div className="browseJobCard">
              <div className="browseJobTitle">
                <h3>{job.title}</h3>
              </div>
              <div className="browseJobFooter">
               <p>{job.createdAt}</p>
                <h4>{job.company}</h4>
              </div>
            </div>
          ))}
         </div>
      </div>
        )
    }
}

export default BrowseField;
 */