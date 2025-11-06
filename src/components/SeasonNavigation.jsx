import React, { useState } from 'react';
import './SeasonNavigation.css';

/**
 * A component to display season information and a list of episodes.
 * It allows the user to switch between seasons using a dropdown.
 *
 * @param {object} props
 * @param {Array<object>} props.seasons - The array of season objects for the show.
 * @returns {JSX.Element} The SeasonNavigation component.
 */
const SeasonNavigation = ({ seasons }) => {
  const safeSeasons = seasons && Array.isArray(seasons) ? seasons : [];
  
  // State to track the currently selected season index. 
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(safeSeasons.length > 0 ? 0 : -1); 

  const handleSeasonChange = (event) => {
    setSelectedSeasonIndex(Number(event.target.value));
  };

  const currentSeason = safeSeasons[selectedSeasonIndex];

  if (safeSeasons.length === 0 || !currentSeason) {
    return <p>This show currently has no detailed season or episode information.</p>;
  }

  const currentEpisodes = currentSeason.episodes && Array.isArray(currentSeason.episodes) ? currentSeason.episodes : [];


  return (
    <div className="season-navigation">
      <div className="season-header">
        <h2 className="season-title">
          {/* FIX 1: Display just the title, which already contains "Season X" */}
          {currentSeason.title}
        </h2>
        <select
          className="season-select"
          value={selectedSeasonIndex}
          onChange={handleSeasonChange}
          name="season-select"
          id="season-select"
        >
          {safeSeasons.map((season, index) => (
            <option key={index} value={index}>
              {/* FIX 2: Display just the title in the dropdown */}
              {season.title}
            </option>
          ))}
        </select>
      </div>

      <div className="episode-list">
        {currentEpisodes.length > 0 ? (
          currentEpisodes.map((episode) => (
            <div key={episode.episode} className="episode-card">
              <img src={currentSeason.image} alt={currentSeason.title} className="episode-image" />
              <div className="episode-content">
                <h3 className="episode-title">
                  {episode.episode}. {episode.title}
                </h3>
                <p className="episode-description">{episode.description || ''}</p>
                <div className="episode-meta">
                  <a href={episode.file} target="_blank" rel="noopener noreferrer" className="episode-play-btn">
                    Play Episode
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No episodes found for this season.</p>
        )}
      </div>
    </div>
  );
};

export default SeasonNavigation;