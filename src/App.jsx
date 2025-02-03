import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [showYay, setShowYay] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ left: "60%", top: "10%" });

  // When "Yes" is clicked, show the fireworks and yay message
  const handleYesClick = () => {
    setShowYay(true);
  };

  // On hover, move the "No" button to a random spot that doesn’t overlap the "Yes" button
  const handleNoHover = () => {
    const marginX = 10; // minimum allowed difference in percentage for X
    const marginY = 10; // minimum allowed difference in percentage for Y
    let randomX, randomY;
    let attempts = 0;
    // The "Yes" button is positioned at left 30% and top 10% inside the buttonsWrapper.
    do {
      randomX = Math.floor(Math.random() * 80); // range: 0-80%
      randomY = Math.floor(Math.random() * 60); // range: 0-60%
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(randomX - 30) < marginX &&
      Math.abs(randomY - 10) < marginY
    );
    setNoBtnPos({ left: `${randomX}%`, top: `${randomY}%` });
  };

  // If "Yes" has been clicked, replace the page with the fireworks view and yay message.
  if (showYay) {
    return (
      <div style={styles.fireworksPage}>
        <FireworksDisplay />
        <div style={styles.yayMessage}>
          <h2 style={{ margin: "0 0 1rem", color: "#e75480" }}>YAY!!!</h2>
          <p style={{ color: "#d81b60", fontWeight: "bold" }}>
            Thank you for being my Valentine! ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Inline keyframes for animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes floatHeart {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            50% { transform: translateY(-200px) scale(1.2); opacity: 1; }
            100% { transform: translateY(-400px) scale(1); opacity: 0; }
          }
        `}
      </style>

      {/* Floating hearts */}
      <div style={{ ...styles.heart, top: "60%", left: "30%", animationDelay: "0s" }}>❤️</div>
      <div style={{ ...styles.heart, top: "70%", left: "50%", animationDelay: "1s" }}>💗</div>
      <div style={{ ...styles.heart, top: "75%", left: "70%", animationDelay: "2s" }}>💖</div>
      <div style={{ ...styles.heart, top: "80%", left: "20%", animationDelay: "3s" }}>💓</div>

      <div style={styles.container}>
        <h1 style={styles.title}>Will you be my Valentine?</h1>

        {/* Teddy bear */}
        <div style={styles.teddyContainer}>
          <img src="/assets/bear.jpg" alt="Cute Teddy" style={styles.teddyImage} />
        </div>

        {/* Button wrapper */}
        <div style={styles.buttonsWrapper}>
          {/* "Yes" button */}
          <button style={styles.yesButton} onClick={handleYesClick}>
            Yes
          </button>

          {/* "No" button (dodges the cursor) */}
          <button
            style={{ ...styles.noButton, left: noBtnPos.left, top: noBtnPos.top }}
            onMouseOver={handleNoHover}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// FireworksDisplay uses canvas-confetti to create a full-page fireworks effect.
function FireworksDisplay() {
  useEffect(() => {
    const duration = 10 * 1000; // fireworks last for 10 seconds
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
      colors: ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#3742fa']
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      // Fire confetti from random positions
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);
  return null; // No DOM element needed—confetti fires on its own.
}

// Inline style objects (no external CSS required)
const styles = {
  page: {
    margin: 0,
    padding: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#fff9f9",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  container: {
    textAlign: "center",
    position: "relative",
    width: "80vw",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#e75480",
    margin: "1rem 0",
  },
  teddyContainer: {
    width: "200px",
    margin: "0 auto",
    animation: "float 3s ease-in-out infinite",
  },
  teddyImage: {
    width: "100%",
    pointerEvents: "none",
  },
  buttonsWrapper: {
    marginTop: "2rem",
    position: "relative",
    width: "100%",
    height: "150px", // Provides enough space for the "No" button to move around
  },
  yesButton: {
    position: "absolute",
    left: "30%", // extra padding from the "No" button
    top: "10%",
    fontSize: "1.2rem",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#ffe4e1",
    color: "#d81b60",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  noButton: {
    position: "absolute",
    fontSize: "1.2rem",
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#ffe4e1",
    color: "#d81b60",
    fontWeight: "bold",
    transition: "transform 0.3s",
  },
  heart: {
    position: "absolute",
    fontSize: "2rem",
    animation: "floatHeart 5s infinite ease-in",
    opacity: 0.8,
  },
  yayMessage: {
    position: "relative",
    zIndex: 999,
    backgroundColor: "#ffe4e1",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    marginTop: "20px",
  },
  fireworksPage: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff9f9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};
