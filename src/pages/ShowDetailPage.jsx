import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SeasonNavigation from '../components/SeasonNavigation';
import { GENRE_MAP } from '../utils/constants';
import './ShowDetailPage.css';

/**
 * Renders the detailed view for a single podcast show.
 * It fetches the show's data based on the 'showId' from the URL parameter
 * and displays its description, seasons, and a list of episodes.
 *
 * @returns {JSX.Element} The ShowDetailPage component.
 */
const ShowDetailPage = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null); // Tracks the currently viewed season

  // Effect to fetch show details when the component mounts or showId changes
  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!res.ok) throw new Error('Failed to fetch show details');
        const data = await res.json();
        
        // Ensure genres is always an array (handles different API responses)
        const genres = Array.isArray(data.genres)
          ? data.genres
          : (data.genres ? String(data.genres).split(',').map(Number) : []);
        
        setShow({ ...data, genres });
        
        // Automatically select the first season (season 1) by default
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0].season);
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShowDetails();
  }, [showId]); // Dependency array ensures this re-runs if the showId changes

  // --- Render logic ---

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!show) return <ErrorMessage message="Show not found." />;

  // Find the full data object for the currently selected season
  const seasonData = show.seasons.find(
    (s) => s.season === selectedSeason
  );

  // Helper logic to render genre names correctly
  const renderableGenres = show.genres.map((id) => GENRE_MAP[id] || 'Unknown');

  return (
    <main className="show-detail-page">
      <Link to="/" className="back-link">
        &larr; Back to all shows
      </Link>

      {/* --- Show Header Section --- */}
      <div className="show-header-card">
        <img src={show.image} alt={`${show.title} cover`} className="show-image-main" />
        <div className="show-header-content">
          <h1 className="show-title-main">{show.title}</h1>
          <p className="show-description">{show.description}</p>
          
          {/* Metadata Grid */}
          <div className="show-meta-grid">
            <div>
              <strong>Genres</strong>
              <p>{renderableGenres.join(', ')}</p>
            </div>
            <div>
              <strong>Total Seasons</strong>
              <p>{show.seasons.length}</p>
            </div>
            <div>
              <strong>Last Updated</strong>
              <p>{new Date(show.updated).toLocaleDateString()}</p>
            </div>
            <div>
              <strong>Total Episodes</strong>
              <p>{show.seasons.reduce((acc, s) => acc + s.episodes.length, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Season & Episode List Section --- */}
      <div className="season-section">
        {/* Season Selector Component */}
        <SeasonNavigation
          seasons={show.seasons}
          selectedSeason={selectedSeason}
          onSeasonSelect={setSelectedSeason}
        />
        
        {/* Episode List */}
        <div className="episode-list">
          {!seasonData ? (
            <p>No season selected or data available.</p>
          ) : (
            // Map over the episodes of the selected season
            seasonData.episodes.map((episode) => (
              <div key={episode.episode} className="episode-card">
                <img src={seasonData.image} alt="Season cover" className="episode-image" />
                <div className="episode-content">
                  <h4 className="episode-title">{episode.episode}. {episode.title}</h4>
                  <p className="episode-description">{episode.description}</p>
                  <audio controls className="episode-audio-player">
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default ShowDetailPage;