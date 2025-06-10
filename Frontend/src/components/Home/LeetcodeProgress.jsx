import Skelton from "../Skelton/CustomSkelton";

const LeetcodeProgress = ({ data, error, isLoading }) => {
  console.log("data in the leetcode Progress", data);
  console.log("error in the leetcode progress", error);
  return (
    <>
      <h3 className="progress-title">Your LeetCode Progress</h3>

      {

        isLoading ?
          (<div className="!space-y-3 !mt-8">
            <Skelton className="!h-4 !w-full !mb-4" />
            <Skelton className="!h-4 !w-full !mb-4" />
            <Skelton className="!h-4 !w-full !mb-4" />
            <Skelton className="!h-4 !w-full !mb-4" />
          </div>) :

          (
            <>
              {error ? (
                <div className="caution">Kindly update your LeetCode Profile</div>
              ) : (
                <>
                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="Total">Total</span>
                      <span className="progress-count">
                        {data.totalSolved} / {data.total}
                      </span>
                    </div>
                    <div className="progress-bar-leetcode">
                      <div
                        className="progress-fill total"
                        style={{ width: `${(data.totalSolved / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="Easy">Easy</span>
                      <span className="progress-count">
                        {data.easySolved} / {data.easyTotal}
                      </span>
                    </div>
                    <div className="progress-bar-leetcode">
                      <div
                        className="progress-fill easy"
                        style={{
                          width: `${(data.easySolved / data.easyTotal) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="Medium">Medium</span>
                      <span className="progress-count">
                        {data.mediumSolved} / {data.mediumTotal}
                      </span>
                    </div>
                    <div className="progress-bar-leetcode">
                      <div
                        className="progress-fill medium"
                        style={{
                          width: `${(data.mediumSolved / data.mediumTotal) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="progress-item">
                    <div className="progress-label">
                      <span className="Hard">Hard</span>
                      <span className="progress-count">
                        {data.hardSolved} / {data.hardTotal}
                      </span>
                    </div>
                    <div className="progress-bar-leetcode">
                      <div
                        className="progress-fill hard"
                        style={{
                          width: `${(data.hardSolved / data.hardTotal) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              )}

            </>
          )

      }


    </>
  );
};

export default LeetcodeProgress;
