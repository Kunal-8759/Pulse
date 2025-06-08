/* eslint-disable no-case-declarations */
import { useMemo, useState } from "react";
import HackathonCard from "../../components/Hackathon/HackathonCard";
import HackathonSort from "../../components/Hackathon/HackathonSort";
import "./Hackathon.css"; // 
import { useHackathons } from "../../components/Hackathon/useHacktathonsHook";

const Hackathon = () => {
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortOption, setSortOption] = useState("relevance");

  const {
    data: hackathons = [],
    isLoading,
    isError,
    error
  } = useHackathons();

  const sortedHackathons = useMemo(() => {
    // First filter the hackathons
    const filteredHackathons = hackathons.filter(hackathon => {
      if (locationFilter === "all") return true;
      if (locationFilter === "online" && hackathon.location === "Online") return true;
      if (locationFilter === "in-person" && hackathon.location !== "Online") return true;
      return false;
    });

    // Then sort the filtered results
    return [...filteredHackathons].sort((a, b) => {
      switch (sortOption) {
        case "prize":
          const prizeA = parseInt(a.prize.replace(/[^0-9]/g, "")) || 0;
          const prizeB = parseInt(b.prize.replace(/[^0-9]/g, "")) || 0;
          return prizeB - prizeA;
        case "recent":
          return hackathons.indexOf(b) - hackathons.indexOf(a);
        case "deadline":
          const dateA = new Date(a.submissionPeriod.split(" - ")[1] || a.submissionPeriod);
          const dateB = new Date(b.submissionPeriod.split(" - ")[1] || b.submissionPeriod);
          return dateA - dateB;
        default:
          return 0;
      }
    });
  }, [hackathons, locationFilter, sortOption]);

  return (
    <>
      <div className="hackathon-header">
        <h1 className="hackathon-title">Hackathons</h1>
        <p className="hackathon-description">
          Explore hackathons from multiple platforms
        </p>
      </div>
      <HackathonSort
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="hackathon-grid">

      {isError ? (
        <p>Error loading hackathons: {error?.message}</p>
      ) : isLoading ? (
        <p>Loading hackathons...</p>
      ) : (
        sortedHackathons.map((hackathon, index) => (
          <HackathonCard
            key={index}
            thumbnail={hackathon.thumbnail}
            title={hackathon.title}
            organizer={hackathon.organizer}
            submissionPeriod={hackathon.submissionPeriod}
            location={hackathon.location}
            prize={hackathon.prize}
            participants={hackathon.participants}
            portfolio={hackathon.portfolio}
            url={hackathon.url}
            platform={hackathon.platform}
          />
        ))
      )}
    </div >
    </>
  );
};

export default Hackathon;
