const express = require("express")
const fetchLeetCodeContests = require("../contestPlatform/leetcode")
const getCodechefContests = require("../contestPlatform/codechef")
const getCodeforcesContests = require("../contestPlatform/codeforces")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 9
    const platforms = req.query.platforms ? req.query.platforms.split(",") : ["LeetCode", "Codeforces", "CodeChef"]
    const status = req.query.status || "All"

    // Fetch contests from all platforms
    const leetcode = await fetchLeetCodeContests()
    const codeforces = await getCodeforcesContests()
    const codechef = await getCodechefContests()  

    let allContests = [...leetcode, ...codeforces, ...codechef]

    // Filter by platforms
    if (platforms.length > 0 && !platforms.includes("All")) {
      allContests = allContests.filter((contest) => platforms.includes(contest.platform))
    }

    const now = Math.floor(Date.now() / 1000)

    // Separate contests by status
    const ongoingContests = []
    const upcomingContests = []
    const pastContests = []

    for (const contest of allContests) {
      const endTime = contest.startTime + contest.duration

      if (now < contest.startTime) {
        upcomingContests.push(contest)
      } else if (now >= contest.startTime && now <= endTime) {
        ongoingContests.push(contest)
      } else {
        pastContests.push(contest)
      }
    }

    // Sort each category
    upcomingContests.sort((a, b) => a.startTime - b.startTime)
    ongoingContests.sort((a, b) => a.startTime - b.startTime)
    pastContests.sort((a, b) => b.startTime - a.startTime)

    // Filter by status
    let filteredContests = []
    switch (status) {
      case "Upcoming":
        filteredContests = upcomingContests
        break
      case "Ongoing":
        filteredContests = ongoingContests
        break
      case "Past":
        filteredContests = pastContests
        break
      case "All":
      default:
        filteredContests = [...ongoingContests, ...upcomingContests, ...pastContests]
        break
    }

    // Pagination
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedContests = filteredContests.slice(start, end)
    const hasMore = end < filteredContests.length

    console.log(`Returning ${paginatedContests.length} contests for page ${page}, status: ${status}`)
    console.log({
      contests: paginatedContests,
      currentPage: page,
      hasMore: hasMore,
      // totalContests: filteredContests.length,
      // status: status,
      // platforms: platforms,
    });

    res.json({
      contests: paginatedContests,
      currentPage: page,
      hasMore: hasMore,
      // totalContests: filteredContests.length,
      // status: status,
      // platforms: platforms,
    })
  } catch (error) {
    throw new Error("Unable to Fetch the Contest , Please try again Later");
    console.error("Error fetching contests:", error.message)
    res.status(500).json({ message: "Failed to fetch contests" })
  }
})

module.exports = router
