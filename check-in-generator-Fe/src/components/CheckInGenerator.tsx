import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
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

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShuffledQuestions(shuffleArray(questions));
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

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
          objectFit: "cover", // Ensure the SVG covers the whole area
          zIndex: 0, // Ensure it is behind other content
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
          zIndex: 1, // Ensure it is above the background
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
          <Typography variant="h5" component="div" sx={{ mx: 2 }}>
            {shuffledQuestions[currentQuestionIndex]}
          </Typography>
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
