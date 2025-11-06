import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GENRE_MAP } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SeasonNavigation from '../components/SeasonNavigation';
import './ShowDetailPage.css';

/**
 * Renders the detail page for a specific show.
 * Fetches show data based on the 'showId' from the URL.
 *
 * @returns {JSX.Element} The ShowDetailPage component.
 */
const ShowDetailPage = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        if (!res.ok) {
          throw new Error(`Show not found (ID: ${showId})`);
        }
        const data = await res.json();
        setShow(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (showId) {
      fetchShowDetails();
    }
  }, [showId]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  if (!show) {
    return <ErrorMessage message="Could not find show details." />;
  }

  const genres = show.genres || [];
  const seasons = show.seasons || [];
  const totalEpisodes = seasons.reduce((acc, season) => acc + season.episodes.length, 0);

  // --- FIX: Logic to handle genre display based on data type ---
  const renderableGenres = Array.isArray(genres)
    ? genres.map(genre => {
        // If genre is a number (from homepage preview), look it up in GENRE_MAP
        if (typeof genre === 'number') {
          return GENRE_MAP[genre] || 'Unknown';
        } 
        // If genre is a string (from detail API), use the string directly
        return genre;
      })
    : [];
  // --- END FIX ---

  return (
    <div className="show-detail-container">
      <Link to="/" className="back-link">&larr; Back to all shows</Link>

      <div className="show-header-grid">
        <img src={show.image} alt={show.title} className="show-image-large" />
        <div className="show-info">
          <h1 className="show-title">{show.title}</h1>
          <p className="show-description">{show.description}</p>
          <div className="show-meta">
            <div className="meta-item">
              <strong>Genres</strong>
              <div className="genre-tags">
                {/* Use the new renderableGenres array */}
                {renderableGenres.map((name, index) => ( 
                  <span key={index} className="genre-tag">
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="meta-item">
              <strong>Last Updated</strong>
              <span>{show.updated ? formatDate(show.updated) : 'N/A'}</span>
            </div>
            <div className="meta-item">
              <strong>Total Seasons</strong>
              <span>{seasons.length}</span>
            </div>
            <div className="meta-item">
              <strong>Total Episodes</strong>
              <span>{totalEpisodes} Episodes</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="current-season-title">Current Season</h2>
      
      {seasons.length > 0 ? (
        <SeasonNavigation seasons={seasons} />
      ) : (
        <p>No season information available for this show.</p>
      )}
    </div>
  );
};

export default ShowDetailPage;