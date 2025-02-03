import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function App() {
  // page 0: initial; page 1: yay page; page 2: reasons page
  const [page, setPage] = useState(0);
  const [noBtnPos, setNoBtnPos] = useState({ left: "60%", top: "10%" });

  // When "Yes" is clicked, move to the yay page (page 1)
  const handleYesClick = () => {
    setPage(1);
  };

  // On hover, move the "No" button to a random spot that doesn’t overlap the "Yes" button.
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

  // Yay page: fireworks, background music, and yay message with a "Click this" button to go to reasons page.
  if (page === 1) {
    return (
      <div style={styles.fireworksPage}>
        <MusicPlayer />
        <FireworksDisplay />
        <div style={styles.yayMessage}>
          <h2 style={{ margin: "0 0 1rem", color: "#e75480" }}>YAY!!!</h2>
          <p style={{ color: "#d81b60", fontWeight: "bold" }}>
            Thank you for being my Valentine! ❤️
          </p>
          <button style={styles.nextButton} onClick={() => setPage(2)}>
            Click this
          </button>
        </div>
      </div>
    );
  }

  // Reasons page: displays 10 reasons with background animations and side flower animations.
  if (page === 2) {
    return <ReasonsPage />;
  }

  // Initial page with teddy bear and buttons.
  return (
    <div style={styles.page}>
      {/* Inline keyframes for initial animations */}
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

      {/* Floating hearts on the initial page */}
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
          <button style={styles.yesButton} onClick={handleYesClick}>
            Yes
          </button>
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

// MusicPlayer: plays background music when rendered.
function MusicPlayer() {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Music playback failed:", error);
      });
    }
  }, []);
  return <audio ref={audioRef} src="/assets/valentine-music.mp3" loop />;
}

// FireworksDisplay: uses canvas-confetti for a fireworks effect.
function FireworksDisplay() {
  useEffect(() => {
    const duration = 10 * 1000; // 10 seconds
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
      colors: ["#ff4757", "#ffa502", "#2ed573", "#1e90ff", "#3742fa"],
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);
  return null;
}

// ReasonsPage: displays 10 reasons with background animations and side flower animations.
function ReasonsPage() {
  const reasons = [
    "You have the most beautiful smile",
    "I love your personality",
    "Admittedly, you're pretty funny (me >> tho 🥱)",
    "You make normal moments special",
    "You're Sooo pretty 💕"
  ];

  return (
    <div style={styles.reasonsPage}>
      {/* Render drifting background icons (outside the content container) */}
      <BackgroundAnimations />
      {/* Render side flower animations on left and right */}
      {/* Define fadeIn keyframes for the reason items */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      {/* Reasons content sits in its own container with higher z-index */}
      <div style={styles.reasonsContent}>
        <h1 style={styles.reasonsTitle}>5 Reasons Why I Like You</h1>
        <ul style={styles.reasonsList}>
          {reasons.map((reason, index) => (
            <li
              key={index}
              style={{
                ...styles.reasonItem,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// BackgroundAnimations: renders animated icons drifting across the background.
function BackgroundAnimations() {
  const icons = ["💖", "✨", "💫", "💘", "❤️", "🌟", "💕"];
  const items = [];
  for (let i = 0; i < 20; i++) {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const animationDelay = Math.random() * 5;
    const animationDuration = 8 + Math.random() * 4; // between 8 and 12 seconds
    items.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: `${top}%`,
          fontSize: `${1.5 + Math.random() * 2}rem`,
          opacity: 0,
          animation: `drift ${animationDuration}s ease-in-out ${animationDelay}s infinite`,
        }}
      >
        {icon}
      </div>
    );
  }
  return (
    <>
      <style>
        {`
          @keyframes drift {
            0% { opacity: 0; transform: translateY(0) scale(0.8); }
            50% { opacity: 1; transform: translateY(-20px) scale(1); }
            100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
          }
        `}
      </style>
      <div style={styles.backgroundContainer}>{items}</div>
    </>
  );
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
    height: "150px",
  },
  yesButton: {
    position: "absolute",
    left: "30%",
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
  nextButton: {
    marginTop: "1rem",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#d81b60",
    color: "#fff",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  reasonsPage: {
    position: "relative",
    zIndex: 2,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
  },
  reasonsContent: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  reasonsTitle: {
    fontSize: "2.5rem",
    color: "#e75480",
    marginBottom: "1rem",
  },
  reasonsList: {
    listStyle: "none",
    padding: 0,
  },
  reasonItem: {
    fontSize: "1.5rem",
    color: "#d81b60",
    marginBottom: "1rem",
    opacity: 0,
    animation: "fadeIn 0.8s ease forwards",
  },
  backgroundContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  leftFlower: {
    position: "absolute",
    left: "5%",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
  },
  rightFlower: {
    position: "absolute",
    right: "5%",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 5,
  },
};
