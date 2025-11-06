import React from 'react';

/**
 * Displays a styled error message. If the message is generic ("Failed to fetch"),
 * it provides additional troubleshooting tips.
 *
 * @param {object} props
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The error message component.
 */
const ErrorMessage = ({ message }) => {
  const isGenericFetchError = message && message.includes('Failed to fetch');

  return (
    <div style={{ 
      color: '#c0392b', 
      backgroundColor: '#fde9e7', 
      border: '1px solid #c0392b',
      padding: '1.5rem', 
      margin: '2rem auto',
      borderRadius: '8px', 
      maxWidth: '600px',
      textAlign: 'left'
    }}>
      <strong style={{ fontSize: '1.1rem' }}>
        {isGenericFetchError ? 'Network Connection Error' : 'An Error Occurred'}
      </strong> 
      <p style={{ marginTop: '0.5rem', marginBottom: '0' }}>
        {message}
      </p>

      {isGenericFetchError && (
        <div style={{ marginTop: '1rem', borderTop: '1px dashed #c0392b', paddingTop: '1rem' }}>
          <p style={{ fontWeight: '600', margin: '0 0 0.5rem 0' }}>
            Troubleshooting Tips:
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li>Check your **Internet connection**.</li>
            <li>The external **Podcast API may be temporarily unavailable**.</li>
            <li>If using a VPN or proxy, try disabling it.</li>
            <li>Try refreshing the page in a few minutes.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;