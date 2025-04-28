const axios = require('axios');

function getportfolio(portfolioArray) {
    const portfolioName = portfolioArray.map(portfolio => {
        return portfolio.name;
    });
    return portfolioName;
}

async function getDevpostHackathon(){
    const devpost_hackathon_api_online = `https://devpost.com/api/hackathons?challenge_type[]=online&page=1`;
    const devpost_hackathon_api_inperson = `https://devpost.com/api/hackathons?challenge_type[]=in-person&page=1`;
    const { data:onlineData } = await axios.get(devpost_hackathon_api_online);
    const { data:inpersonData } = await axios.get(devpost_hackathon_api_inperson);

    // console.log(onlineData, inpersonData);

    const totalData = [...onlineData.hackathons, ...inpersonData.hackathons];

    const hackathons = totalData.map(hackathon => ({
        thumbnail: hackathon.thumbnail_url,
        title: hackathon.name,
        organizer: hackathon.organization_name,
        submissionPeriod : hackathon.submission_period_dates,
        location : hackathon.displayed_location.location,
        prize : hackathon.prize_amount,
        participants: hackathon.registrations_count,
        portfolio : getportfolio(hackathon.themes),
        url: hackathon.url,
        platform: 'Devpost',
    }));

    return hackathons;
}

module.exports = getDevpostHackathon;