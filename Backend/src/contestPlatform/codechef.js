const axios = require("axios");


function getTimeInSeconds(time){
  const date = new Date(time);
  return date / 1000;
}

function getDurationInSeconds(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Check if both dates are valid
  if (isNaN(start) || isNaN(end)) {
    throw new Error("Invalid date format");
  }

  return (end - start) / 1000;
}

const extractContests = (rawContests = []) =>
  rawContests.map((contest) => ({
    platform: "CodeChef",
    title: contest.contest_name,
    code: contest.contest_code,
    startTime: getTimeInSeconds(contest.contest_start_date_iso),
    endTime: getTimeInSeconds(contest.contest_end_date_iso),
    duration: getDurationInSeconds(contest.contest_start_date_iso, contest.contest_end_date_iso),
    url: `https://www.codechef.com/${contest.contest_code}`,
  }));

  

const getCodechefContests = async () => {

        const CODECHEF_CONTEST_API =
        "https://api.allorigins.win/raw?url=https%3A%2F%2Fwww.codechef.com%2Fapi%2Flist%2Fcontests%2Fall%3Fsort_by%3DSTART%26sorting_order%3Dasc%26offset%3D0%26mode%3Dall";
  
        const  { data } = await axios.get(CODECHEF_CONTEST_API);


        const upcoming = extractContests(data.future_contests);
        const ongoing = extractContests(data.present_contests);
        const past = extractContests(data.past_contests);

        const result = [...upcoming, ...ongoing , ...past];
        return result;    

};

module.exports = getCodechefContests;
