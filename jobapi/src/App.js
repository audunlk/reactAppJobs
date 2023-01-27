import React from "react";
import Header from "./components/Header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      search: "",
      isLoading: true,
      showForm: false,
      showBrowse: true,
   
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:4444/jobs");
    const data = await response.json();
    this.setState({ jobs: data });
    this.setState({ isLoading: false });
    this.setState({ showForm: false });
  
  }

  handleSearchChange = (event) => {
    const searchValue = event.target.value;
    this.setState({ search: searchValue });
  };

  handleLoadBrowse = () => {
    this.setState({ showBrowse: true, showForm: false });
    console.log("browse state " + this.state.showBrowse);
  };

  handleLoadForm = () => {
    this.setState({ showForm: true, showBrowse: false });
    console.log("form state " + this.state.showForm);
  };

  handleLoadCard = (event) => {
    this.setState({ showJobCard: true, showBrowse: false, showForm: false });
    const id = event.target.id;
    console.log(id)
    this.setState({ jobsInfoId: id });
  };

  handlePostForm = (event) => {
    const title = event.target.title.value;
    const description = event.target.description.value;
    const email = event.target.email.value;
    const company = event.target.company.value;
    const homepage = event.target.email.value;
    if (!title || !description || !email) {
      alert("Please fill out a title, description, email");
      return;
    }

    const newJob = {
      title,
      description,
      email,
      company,
      homepage,
    };

    fetch("http://localhost:4444/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          jobs: [...this.state.jobs, data],
          
        });
      });
    
  };

  handleClearInput = (event) => {
    event.target.title.value = "";
    event.target.description.value = "";
    event.target.email.value = "";
    event.target.company.value = "";
    event.target.homepage.value = "";
    console.log(`
    ${this.state}`)
  };

  render() {
    const filteredJobs = !this.state.search
      ? this.state.jobs
      : this.state.jobs.filter((job) =>
          job.title.toLowerCase().includes(this.state.search.toLowerCase())
        );

    const filteredJob = this.state.jobs.filter((job) => {
      return job.id.toString().includes(this.state.jobsInfoId);
      
    });


    switch (true) {
      case this.state.showBrowse:
        return (
          /* BROWSER START */
          <div className="App">
            <Header
              handleLoadBrowse={this.handleLoadBrowse.bind}
              handleLoadForm={this.handleLoadForm}
             
            />
            <div className="browseField">
              <div className="browseJobContainer" >
                <input
                  className="inputfield"
                  type="text"
                  placeholder="Search for a job and press enter"
                  onChange={this.handleSearchChange.bind(this)}
                />
                {this.state.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  filteredJobs.map((job, i) => (
                    <div className="browseJobCard" onClick={this.handleLoadCard} id={job.id} key={i}>
                      <div className="browseJobTitle">
                        <h3>{job.title}</h3>
                      </div>
                      <div className="browseJobFooter">
                        <p>{job.createdAt}</p>
                        <h4>{job.company}</h4>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
        /* BROWSER END */
      case this.state.showForm:
        return (
          /* FORM START */
          <div className="App">
            <Header
              handleLoadBrowse={this.handleLoadBrowse}
              handleLoadForm={this.handleLoadForm}
            />
            <div className="formContainer">
              <div className="form">
                <form onSubmit={this.handlePostForm}>
                  <input type="text" name="title" placeholder="Title" />
                  <input
                    className="descriptionArea"
                    type="text"
                    name="description"
                    placeholder="Description"
                  />
                  <input type="text" name="email" placeholder="Email" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company(optional)"
                  />
                  <input
                    type="text"
                    name="homepage"
                    placeholder="Homepage(optional)"
                  />
                  <button type="submit" onClick={this.handleClearInput} >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
          /* FORM END */
        );
        case this.state.showJobCard:
          return (
            /* CARD START */
            <div className="App">
              <Header
                handleLoadBrowse={this.handleLoadBrowse}
                handleLoadForm={this.handleLoadForm}
              />
              <div className="browseField">
                <div className="cardContainer">
                  <div className="card">
                    {filteredJob.map((job, i) => (
                      <div className="cardJob" key={i}>
                        <div className="cardJobTitle">
                          <h3>{job.title}</h3>
                        </div>
                        <div className="cardContent">
                          <div className="cardLeft">
                            <p>{job.createdAt}</p>
                            <p>{job.company}</p>
                            <p>{job.homepage}</p>
                          </div>
                          <div className="cardJobDescription">
                            <p>{job.description}</p>
                          </div>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            /* CARD END */
          );
      default:
        return;
    }
  }
}

export default App;
