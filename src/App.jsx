import React, { useState, useEffect } from "react";
import KirrakInvitation from './KirrakInvitationScene';
import kirrakBg from './assets/img.jpeg';

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a small delay for the "Movie Intro" feel
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#000' 
    }}>
      
      {/* --- ANIMATED LOADING SCREEN --- */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          transition: 'opacity 1s ease-in-out',
        }}>
          <h1 style={{ 
            color: '#FFD700', 
            letterSpacing: '10px', 
            animation: 'pulse 2s infinite',
            fontFamily: 'serif'
          }}>
            KIRRAK PARTY
          </h1>
          <p style={{ color: '#555', marginTop: '10px', letterSpacing: '2px' }}>
            PREPARING THE STAGE...
          </p>
          <style>{`
            @keyframes pulse {
              0% { opacity: 0.3; transform: scale(0.95); }
              50% { opacity: 1; transform: scale(1); }
              100% { opacity: 0.3; transform: scale(0.95); }
            }
          `}</style>
        </div>
      )}

      {/* LAYER 1: The Blurred Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url(${kirrakBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        filter: 'blur(25px) brightness(0.2)', 
        transform: 'scale(1.1)', 
        zIndex: 0
      }} />

      {/* LAYER 2: The Full Poster */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${kirrakBg})`, 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 1,
        opacity: 0.6 
      }} />

      {/* LAYER 3: The 3D Invitation Canvas */}
      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, 
        width: '100%', height: '100%', 
        zIndex: 2,
        opacity: loading ? 0 : 1,
        transition: 'opacity 2s ease-in'
      }}>
        <KirrakInvitation />
      </div>

    </div>
  )
};

export default App;