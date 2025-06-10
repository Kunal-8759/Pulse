import Skelton from "../Skelton/CustomSkelton";

const DailyProblem = ({ problem, dailyProblemError, isLoading }) => {
  return (
    <>
      {dailyProblemError ? (
        { dailyProblemError }
      ) : (
        <div>
          <h1 className="leetcode-card-title">LeetCode Problem of the Day</h1>
          <p className="leetcode-card-subtitle">Daily coding challenge</p>

          {
            isLoading ?
              (
                <div className="!space-y-4">
                  <div className="!flex !items-center !justify-between">
                    <Skelton className="!h-6 !w-3/4" />
                    <Skelton className="!h-4 !w-16" />
                  </div>
                  <Skelton className="!h-20 !w-full" />
                  <div className="!flex !gap-2">
                    <Skelton className="!h-6 !w-16" />
                    <Skelton className="!h-6 !w-16" />
                  </div>
                  <Skelton className="!h-10 !w-full" />
                </div>
              ) :
              (<>
                <div className="leetcode-problem-header">
                  <h2 className="leetcode-problem-title">{problem.title}</h2>
                  <div className="leetcode-problem-info">
                    <div
                      className={`difficulty-tag   difficulty-tag-${problem.difficulty}`}
                    >
                      {problem.difficulty}
                    </div>
                    <div className="acceptance-tag">{problem.acRate}</div>
                  </div>
                </div>

                <p className="problem-id">
                  Problem #{problem.frontendId} - Today's LeetCode Challenge
                </p>

                <div className="topic-tags">
                  {problem.topicTags.map((tag, index) => (
                    <div key={index} className="topic-tag">
                      {tag}
                    </div>
                  ))}
                </div>

                <a href={problem.link} target="_blank" className="solve-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-code h-4 w-4"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  Solve Problem
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-external-link h-3 w-3 ml-1"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </>)
          }


        </div>
      )}
    </>
  );
};
export default DailyProblem;
