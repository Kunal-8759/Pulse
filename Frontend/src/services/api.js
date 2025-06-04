import axios from 'axios';

export const fetchContests = async(page,limit,status,platforms) => {
  const res = await axios.get(`http://localhost:5000/api/contests?page=${page}&limit=${limit}&status=${status}&platforms=${platforms}`);
  return res.data;
};

export const fetchHackathons = async()=>{
  return await axios.get('http://localhost:5000/api/hackathons');
}

export const getGitHubHeatmap = async(username) =>{
  const data = await axios.get(`http://localhost:5000/api/heatmap/github/${username}`);
  return data;
}

export const getLeetCodeData = async(username) =>{
  return await axios.get(`http://localhost:5000/api/heatmap/leetcode/${username}`);
}

export const getDailyProblem= async()=>{
  return await axios.get('http://localhost:5000/api/heatmap/dailyProblem');
}

export const getLeetcodeActivity = async(username) => {
  return await axios.get(`http://localhost:5000/leetcode/${username}`);
}

export const getGithubActivity = async(username) => {
  return await axios.get(`http://localhost:5000/github/${username}`);
}

