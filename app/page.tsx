"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import {
  AnswersMap,
  buildUserAnswers,
  createShuffledOptionsMap,
} from "@/lib/answers";
import {
  flattenSections,
  getQuestionPosition,
  groupQuestionsBySection,
  loadQuestions,
} from "@/lib/csvParser";
import { getSectionProgress } from "@/lib/sections";
import {
  calculateSectionScores,
  calculateTotalScore,
} from "@/lib/scoring";
import type { AppScreen, Question } from "@/lib/types";

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>("home");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<AnswersMap>({});
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<
    Record<number, string[]>
  >({});

  const preloadQuestions = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const loaded = await loadQuestions();
      const grouped = groupQuestionsBySection(loaded);
      setQuestions(flattenSections(grouped));
    } catch {
      setLoadError(
        "No s'han pogut carregar les preguntes. Comprova que questions.csv existeix."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    preloadQuestions();
  }, [preloadQuestions]);

  const position = useMemo(() => {
    if (questions.length === 0) {
      return { sectionName: "", questionInSection: 0, totalInSection: 0 };
    }
    return getQuestionPosition(questions, currentIndex);
  }, [questions, currentIndex]);

  const sectionProgress = useMemo(
    () => getSectionProgress(questions, currentIndex),
    [questions, currentIndex]
  );

  const userAnswers = useMemo(
    () => buildUserAnswers(questions, answersMap),
    [questions, answersMap]
  );

  const handleStart = () => {
    if (questions.length === 0) {
      preloadQuestions();
      return;
    }
    setCurrentIndex(0);
    setAnswersMap({});
    setShuffledOptionsMap(createShuffledOptionsMap(questions));
    setScreen("quiz");
  };

  const handleSelectAnswer = (answer: string | null) => {
    setAnswersMap((prev) => {
      if (answer === null) {
        const { [currentIndex]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [currentIndex]: answer };
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(questions.length - 1, index + 1));
  };

  const handleFinish = () => {
    setScreen("results");
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswersMap({});
    setShuffledOptionsMap({});
    setScreen("home");
  };

  if (screen === "quiz" && questions[currentIndex]) {
    const selectedAnswer = answersMap[currentIndex];

    return (
      <QuizScreen
        question={questions[currentIndex]}
        options={shuffledOptionsMap[currentIndex] ?? []}
        sectionName={position.sectionName}
        questionInSection={position.questionInSection}
        totalInSection={position.totalInSection}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        sectionProgress={sectionProgress}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFinish={handleFinish}
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
      />
    );
  }

  if (screen === "results") {
    return (
      <ResultsScreen
        totalScore={calculateTotalScore(userAnswers)}
        sectionScores={calculateSectionScores(userAnswers)}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <HomeScreen
      onStart={handleStart}
      loading={loading}
      error={loadError}
    />
  );
}
