const dotenv = require("dotenv");

dotenv.config();

module.exports={
    PORT : process.env.PORT || 5000,
    GITHUB_TOKEN : process.env.GITHUB_TOKEN
}