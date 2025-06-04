import axios from 'axios';

const Backend_URL = 'https://pulse-l0vz.onrender.com';

export const fetchContests = async(page,limit,status,platforms) => {
  const res = await axios.get(`${Backend_URL}/api/contests?page=${page}&limit=${limit}&status=${status}&platforms=${platforms}`);
  return res.data;
};

export const fetchHackathons = async()=>{
  return await axios.get(`${Backend_URL}/api/hackathons`);
}

export const getGitHubHeatmap = async(username) =>{
  const data = await axios.get(`${Backend_URL}api/heatmap/github/${username}`);
  return data;
}

export const getLeetCodeData = async(username) =>{
  return await axios.get(`${Backend_URL}/api/heatmap/leetcode/${username}`);
}

export const getDailyProblem= async()=>{
  return await axios.get(`${Backend_URL}/api/heatmap/dailyProblem`);
}

export const getLeetcodeActivity = async(username) => {
  return await axios.get(`${Backend_URL}/leetcode/${username}`);
}

export const getGithubActivity = async(username) => {
  return await axios.get(`${Backend_URL}/github/${username}`);
}

