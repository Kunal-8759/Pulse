import axios from 'axios';

export const fetchContests = () => {
  return axios.get('http://localhost:5000/api/contests');
};

export const fetchHackathons = ()=>{
  return axios.get('http://localhost:5000/api/hackathons');
}

export const getGitHubHeatmap =  (username) =>{
  const data =axios.get(`http://localhost:5000/api/heatmap/github/${username}`);
  console.log("GitHub Heatmap Data:", data);
  return data;
}

export const getLeetCodeData =  (username) =>{
  return axios.get(`http://localhost:5000/api/heatmap/leetcode/${username}`);
}

export const getDailyProblem= ()=>{
  return axios.get('http://localhost:5000/api/heatmap/dailyProblem');
}

export const getLeetcodeActivity = (username) => {
  return axios.get(`http://localhost:5000/leetcode/${username}`);
}

export const getGithubActivity = (username) => {
  return axios.get(`http://localhost:5000/github/${username}`);
}

