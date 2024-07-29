import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";
import AnimatedBackground from "../assets/animated-bg.svg";

const questions = [
  "Welches Emoji beschreibt gerade deine Stimmung?",
  "Was war eines deiner Highlights der letzten Zeit?",
  "Gibt es etwas, das dich die letzte Zeit besonders beschäftigt hat?",
  "Was hat dir in der letzten Zeit eine besondere Freude bereitet?",
  "Welche Herausforderung hast du in letzter Zeit gemeistert?",
  "Welches Lied würde jetzt am besten zu deiner Laune passen?",
  "Welche/n Serie oder Film hast du in letzter Zeit geschaut?",
  "Wenn du wählen könntest, welches Tier wärst du am liebsten?",
  "Was möchtest du heute erreichen?",
  "Wofür bist du heute besonders dankbar?",
  "Welches kleine Ding würde dein tägliches Leben vereinfachen?",
  "Hast du im Homeoffice einen extra eingerichteten Ort?",
  "Bist du eine Nachteule oder Lerche?",
  "Duschen, morgens oder abends?",
  "Die Zombieapokalypse bricht aus, wie gehst damit um?",
  "Was wäre dein Einlaufmusik, wenn du ein Wrestler wärst?",
  "Was ist eines der Ratschläge, die du beherzigst?",
  "Popcorn --> süß oder salzig?",
  "Welches Gericht kochst du am liebsten und warum?",
  "Wie würdest du deinen idealen Arbeitstag beschreiben?",
  "Welche Trends oder Entwicklungen verfolgst du momentan besonders interessiert?",
  "Gibt es eine besondere Tradition oder ein Ritual, das du pflegst?",
  "Wie lautet dein ultimativer Geheimtipp für Produktivität?",
  "Was ist die merkwürdigste oder originellste Geschenkidee, die du je erhalten hast?",
  "Was ist dein geheimer Trick, um dich in schwierigen Situationen zu beruhigen?",
  "Welches exotische Essen möchtest du unbedingt mal probieren?",
  "Wenn du für einen Tag unsichtbar sein könntest, was würdest du tun?"


];

// Fragen mischen
const shuffleArray = (array: string[]): string[] => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const CheckInGenerator: React.FC = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const handleNext = () => {
    setDirection("forward");
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShuffledQuestions(shuffleArray(questions));
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    setDirection("backward");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const props = useSpring({
    opacity: 1,
    transform: `translateX(0)`,
    from: {
      opacity: 0,
      transform: direction === "forward" ? `translateX(100%)` : `translateX(-100%)`,
    },
    reset: true,
    config: {
      tension: 210,
      friction: 20,
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={AnimatedBackground}
        alt="Animated Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton onClick={handlePrevious} sx={{ color: "#000" }}>
            <ArrowBack />
          </IconButton>
          <animated.div style={props}>
            <Typography variant="h5" component="div" sx={{ mx: 2 }}>
              {shuffledQuestions[currentQuestionIndex]}
            </Typography>
          </animated.div>
          <IconButton onClick={handleNext} sx={{ color: "#000" }}>
            <ArrowForward />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#302B27",
            "&:hover": {
              backgroundColor: "#7B7B7B",
            },
          }}
          onClick={handleNext}
        >
          Andere Frage
        </Button>
      </Container>
    </Box>
  );
};

export default CheckInGenerator;
