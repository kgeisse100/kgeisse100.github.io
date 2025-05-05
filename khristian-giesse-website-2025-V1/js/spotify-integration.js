/**
 * Spotify Integration for Khristian Giesse Website
 * This file enhances the Spotify embed functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Spotify embed
    initSpotifyEmbed();
});

/**
 * Initialize and enhance Spotify embed functionality
 */
function initSpotifyEmbed() {
    const spotifyContainer = document.querySelector('.spotify-container');
    
    // Check if Spotify container exists
    if (!spotifyContainer) return;
    
    // Add loading state
    spotifyContainer.classList.add('loading');
    
    // Listen for iframe load event
    const spotifyIframe = spotifyContainer.querySelector('iframe');
    if (spotifyIframe) {
        spotifyIframe.addEventListener('load', function() {
            // Remove loading state when iframe is loaded
            spotifyContainer.classList.remove('loading');
            spotifyContainer.classList.add('loaded');
            
            // Add success message to console
            console.log('Spotify playlist loaded successfully');
        });
        
        // Add error handling
        spotifyIframe.addEventListener('error', function() {
            console.error('Failed to load Spotify playlist');
            spotifyContainer.classList.remove('loading');
            spotifyContainer.classList.add('error');
            
            // Add fallback message
            const fallbackMsg = document.createElement('p');
            fallbackMsg.className = 'spotify-fallback';
            fallbackMsg.textContent = 'Unable to load Spotify playlist. Please check your connection or visit Khristian\'s Spotify profile directly.';
            
            // Add direct link to Spotify
            const spotifyLink = document.createElement('a');
            spotifyLink.href = 'https://open.spotify.com/artist/ARTIST_ID_HERE'; // Replace with actual artist ID
            spotifyLink.textContent = 'Visit Spotify Profile';
            spotifyLink.className = 'spotify-fallback-link';
            spotifyLink.target = '_blank';
            
            fallbackMsg.appendChild(document.createElement('br'));
            fallbackMsg.appendChild(spotifyLink);
            
            // Replace iframe with fallback message
            spotifyContainer.innerHTML = '';
            spotifyContainer.appendChild(fallbackMsg);
        });
    }
}

/**
 * Function to update Spotify playlist
 * This can be used in the future to change playlists dynamically
 * @param {string} playlistId - The Spotify playlist ID
 */
function updateSpotifyPlaylist(playlistId) {
    const spotifyIframe = document.querySelector('.spotify-container iframe');
    if (spotifyIframe) {
        const baseUrl = 'https://open.spotify.com/embed/playlist/';
        spotifyIframe.src = baseUrl + playlistId;
    }
}
