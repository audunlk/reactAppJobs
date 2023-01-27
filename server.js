/**
 * Import the express library
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Create an express app
 */
const app = express();

/**
 * Support cross-origin requests
 */
app.use(cors());

/**
 * Support JSON and form-data POST bodies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Serve all requests for static assets
 * from the /public folder
 *
 * This is where we will serve the client
 * JavaScript, CSS and other assets like images
 */
app.use(express.static('public'));

/**
 * Create job board data
 */
let dateObj = new Date().toDateString()

const jobs = [
  {
    id: '1',
    createdAt: dateObj,
    title: "Junior JavaScript Developer",
    email: "jobs@unicorn.com",
    company: "Unicorn Labs",
    homepage: "www.unicorn.com",
    description: "Are you our next star? We're looking for someone to help us transform our business and build our new solutions"
  },
  {
    id: '2',
    createdAt: dateObj,
    title: "Senior Backend Developer",
    email: "jobs@wiggle.com",
    company: "Wiggle Inc",
    homepage: "www.wiggle.com",
    description: "Come work for us - we're awesome!"
  },
  {
    id: '3',
    createdAt: dateObj,
    title: "Data Scientist",
    email: "jobs@nosebook.com",
    company: "Nosebook",
    homepage: "www.nosebook.com",
    description: "Come work for us - we're awesome!"
  },
  {
    id: '4',
    createdAt: dateObj,
    title: "Lead Designer",
    email: "jobs@mediocregames.com",
    company: "Mediocre Games",
    homepage: "www.mediocregames.com",
    description: "Come work for us - we're awesome!"
  }
];

function getJobs() {
  return jobs;
}

function getJobById(id) {
  return jobs.find((job) => job.id == id);
}

function addJob(job) {
  const newJob = {
    id: Date.now(),
    createdAt: new Date().toDateString(),
    title: job.title,
    email: job.email,
    company: job.company,
    homepage: job.homepage,
    description: job.description,
  };

  jobs.push(newJob);
  return newJob;
}

function updateJob(updatedJob) {
  const indexOfJob = jobs.findIndex((job) => job.id == updatedJob.id);
  jobs.splice(indexOfJob, 1, updatedJob);
  return updatedJob;
}

function deleteJobById(id) {
  const indexOfJob = jobs.findIndex((job) => job.id == id);
  jobs.splice(indexOfJob, 1);
}

/**
 * REST endpoint for our jobs resource
 */
app.get('/jobs/:id', function (req, res) {
  const { id } = req.params;
  const selectedJob = getJobById(id);

  if (!selectedJob) {
    return res.status(404).send({ message: 'Unknown job id' });
  }

  res.send(selectedJob);
});

app.get('/jobs', function (req, res) {
  const jobs = getJobs();
  res.send(jobs);
});

app.post('/jobs', function (req, res) {
  const {
    title,
    email,
    homepage,
    company,
    description
  } = req.body;

  const newJob = addJob({
    title,
    email,
    homepage,
    company,
    description
  });

  res.send(newJob);
});

app.put('/jobs/:id', function (req, res) {
  const {
    id,
    title,
    email,
    homepage,
    company,
    description
  } = req.body;

  const updatedJob = updateJob({
    id,
    title,
    email,
    homepage,
    company,
    description
  });

  res.send(updatedJob);
});

app.delete('/jobs/:id', function (req, res) {
  const { id } = req.params;
  deleteJobById(id);
  res.send({ id });
});

/**
 * Attach the app to a port
 * so that we can access it
 */
app.listen(4444, () => {
  console.log('Job board api running on port http://localhost:4444');
});
