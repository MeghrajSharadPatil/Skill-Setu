import React, { useState, useEffect } from "react";
import { QuizQuestion, TrainingMaterialPreset, QuizResult } from "../types";
import { 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  FileCheck,
  Printer,
  ChevronRight,
  AlertCircle,
  GraduationCap,
  TrendingUp,
  Target
} from "lucide-react";
import { IGOTCourse } from "../types";

interface AssessmentEngineProps {
  presets: TrainingMaterialPreset[];
  courses?: IGOTCourse[];
  onCompetencyGain: (competencyName: string, scoreGained: number) => void;
  onAllocateCourses?: (competencyTag: string, scorePercentage: number) => void;
  onNavigateToPathways?: (keyword?: string) => void;
  language: "en" | "hi";
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  presets,
  courses = [],
  onCompetencyGain,
  onAllocateCourses,
  onNavigateToPathways,
  language,
}) => {
  // Step in assessment workflow: 'setup' | 'taking' | 'results'
  const [stage, setStage] = useState<"setup" | "taking" | "results">("setup");
  const [selectedPreset, setSelectedPreset] = useState<TrainingMaterialPreset>(presets[0]);
  const [customText, setCustomText] = useState<string>("");
  const [activeTabSource, setActiveTabSource] = useState<"presets" | "custom">("presets");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Generation parameters
  const [difficulty, setDifficulty] = useState<"Foundational" | "Intermediate" | "Advanced">("Intermediate");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(300); // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Results state
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [competencyUpdated, setCompetencyUpdated] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (stage !== "taking" || !isTimerRunning) return;

    if (timeLeftSeconds <= 0) {
      handleSubmitQuiz();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, isTimerRunning, timeLeftSeconds]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCustomText(text);
        setActiveTabSource("custom");
      }
    };
    reader.readAsText(file);
  };

  // Generate Questions from Material
  const handleGenerateAssessment = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    const sourceContent = activeTabSource === "presets" ? selectedPreset.excerpt : customText;
    const sourceTopic = activeTabSource === "presets" ? selectedPreset.title : (uploadedFileName || "Uploaded Training Material");
    const domain = activeTabSource === "presets" ? selectedPreset.domain : "Statistical Competencies";

    try {
      const response = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: sourceContent,
          topic: sourceTopic,
          domain,
          difficulty,
          count: questionCount,
        }),
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setUserAnswers({});
        setCurrentQIndex(0);
        setTimeLeftSeconds(questionCount * 60); // 1 minute per question
        setIsTimerRunning(true);
        setCompetencyUpdated(false);
        setStage("taking");
      } else {
        setErrorMsg("Failed to generate questions. Please try again or select a preset.");
      }
    } catch (err: any) {
      console.error("Error generating quiz:", err);
      setErrorMsg("An error occurred during assessment generation. Check network connection.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit and grade quiz
  const handleSubmitQuiz = () => {
    setIsTimerRunning(false);
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct += 1;
      }
    });

    const percentage = Math.round((correct / questions.length) * 100);
    const timeSpent = questionCount * 60 - timeLeftSeconds;

    const result: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers: correct,
      scorePercentage: percentage,
      passed: percentage >= 70,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      competencyGainTag: questions[0]?.competencyTag || "Statistical Competencies",
      feedback:
        percentage >= 80
          ? "Outstanding! You demonstrated mastery of core MoSPI guidelines and technical methodologies."
          : percentage >= 70
          ? "Good Performance. You met the qualification benchmark, but should review explanations for incorrect items."
          : "Remediation Recommended. Target foundational modules on iGOT Karmayogi before retaking.",
    };

    setQuizResult(result);
    setStage("results");
    if (onAllocateCourses) {
      onAllocateCourses(result.competencyGainTag, percentage);
    }
  };

  // Sync score with competency profile
  const handleApplyCompetencyBoost = () => {
    if (!quizResult || competencyUpdated) return;
    // Boost level by 0.3 - 0.5 depending on score
    const boost = quizResult.scorePercentage >= 80 ? 0.4 : 0.2;
    onCompetencyGain(quizResult.competencyGainTag, boost);
    setCompetencyUpdated(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div className="space-y-6">
      {/* 1. Assessment Header */}
      <div className="bg-gradient-to-r from-[#0B4F9C] to-[#1e5898] text-white rounded-xl shadow-xs p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              Large Language Model Engine
            </span>
            <span className="text-xs text-blue-200">NSSTA & MoSPI Assessment Standards</span>
          </div>
          <h2 className="text-xl font-extrabold">
            {language === "hi"
              ? "एआई संचालित बुद्धिमान मूल्यांकन एवं क्विज़ इंजन"
              : "AI-Powered Intelligent Assessment & MCQ Engine"}
          </h2>
          <p className="text-xs text-blue-100 max-w-2xl mt-1">
            Automatically generate objective MCQs, case scenarios, and quizzes from uploaded circulars, NSS manual
            methodologies, and SNA compendiums with instant grading and official guideline references.
          </p>
        </div>

        {stage !== "setup" && (
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setStage("setup");
            }}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-lg border border-white/20 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Assessment
          </button>
        )}
      </div>

      {/* STAGE 1: SETUP & CONTENT UPLOAD */}
      {stage === "setup" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-5">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                1. Select or Upload Official Learning Material
              </h3>
              <p className="text-xs text-slate-500">
                Choose from verified MoSPI/NSSTA curriculum documents, or upload custom training notes/PDFs.
              </p>
            </div>

            {/* Source Tab Toggle */}
            <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
              <button
                onClick={() => setActiveTabSource("presets")}
                className={`pb-2.5 border-b-2 transition ${
                  activeTabSource === "presets"
                    ? "border-[#0B4F9C] text-[#0B4F9C]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Official MoSPI / NSSTA Presets ({presets.length})
              </button>
              <button
                onClick={() => setActiveTabSource("custom")}
                className={`pb-2.5 border-b-2 transition ${
                  activeTabSource === "custom"
                    ? "border-[#0B4F9C] text-[#0B4F9C]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Upload File or Paste Training Content
              </button>
            </div>

            {/* Source Tab 1: Presets */}
            {activeTabSource === "presets" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {presets.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      selectedPreset.id === preset.id
                        ? "border-[#0B4F9C] bg-blue-50/40 ring-2 ring-[#0B4F9C]/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold text-[#0B4F9C] uppercase">
                          {preset.domain.split(" ")[0]}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {preset.wordCount} words
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 leading-snug">{preset.title}</h4>
                      <div className="text-[11px] text-slate-500 mt-1">{preset.subtitle}</div>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-2 font-mono truncate">
                      Source: {preset.sourceDoc}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Source Tab 2: Custom upload */
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 hover:border-[#0B4F9C] rounded-xl p-6 text-center transition bg-slate-50/50">
                  <Upload className="w-8 h-8 text-[#0B4F9C] mx-auto mb-2" />
                  <div className="text-xs font-bold text-slate-800">
                    Drag and drop official training circular, syllabus, or PDF notes
                  </div>
                  <div className="text-[11px] text-slate-500 mb-3">Supports .txt, .pdf, .docx, .md files</div>
                  <label className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition shadow-2xs inline-block">
                    Browse Document
                    <input
                      type="file"
                      accept=".txt,.md,.doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFileName && (
                    <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" />
                      Uploaded: {uploadedFileName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Paste Text / Training Excerpt directly:
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Paste statistical survey methodology, formula, national accounts guidelines, or policy circular text here..."
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Preview of active excerpt */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block mb-1">
                Target Material Preview ({activeTabSource === "presets" ? selectedPreset.title : "Custom Content"}):
              </span>
              <p className="text-slate-600 line-clamp-3 italic">
                "{activeTabSource === "presets" ? selectedPreset.excerpt : (customText || "No content entered yet.")}"
              </p>
            </div>

            {/* 2. Assessment Generation Parameters */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Question Count</label>
                <div className="flex gap-2">
                  {[3, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                        questionCount === num
                          ? "bg-[#0B4F9C] text-white border-[#0B4F9C]"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {num} MCQs
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e: any) => setDifficulty(e.target.value)}
                  className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
                >
                  <option value="Foundational">Foundational (Concepts & Defs)</option>
                  <option value="Intermediate">Intermediate (Applied Official Practice)</option>
                  <option value="Advanced">Advanced (Case Scenarios & Formulation)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Assessment Engine</label>
                <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg flex items-center justify-between">
                  <span>Gemini 3.8 Flash + MoSPI Bank</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                {errorMsg}
              </div>
            )}

            {/* Launch Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleGenerateAssessment}
                disabled={isGenerating}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                    Extracting Concepts & Generating MCQs...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    Generate AI Assessment & Launch Quiz →
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: TAKING THE TEST */}
      {stage === "taking" && questions.length > 0 && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          {/* Active test top bar */}
          <div className="bg-[#0B4F9C] text-white px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                Question {currentQIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-blue-100 hidden sm:inline">
                Competency: {questions[currentQIndex]?.competencyTag}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-blue-900/70 border border-blue-400/30 px-3 py-1 rounded-lg text-xs font-mono font-bold">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Time Remaining: {formatTime(timeLeftSeconds)}</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Question navigator bubbles */}
            <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-100">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQIndex(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    currentQIndex === i
                      ? "bg-[#0B4F9C] text-white ring-2 ring-blue-300"
                      : userAnswers[i] !== undefined
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                  {questions[currentQIndex]?.difficulty || "Intermediate"}
                </span>
                <span>Select the single most accurate option according to official guidelines:</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-relaxed">
                {questions[currentQIndex]?.question}
              </h3>
            </div>

            {/* 4 Options */}
            <div className="space-y-3">
              {questions[currentQIndex]?.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQIndex] === optIdx;
                const optionLetters = ["A", "B", "C", "D"];

                return (
                  <div
                    key={optIdx}
                    onClick={() => setUserAnswers({ ...userAnswers, [currentQIndex]: optIdx })}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center space-x-3 ${
                      isSelected
                        ? "border-[#0B4F9C] bg-blue-50/50 ring-2 ring-[#0B4F9C]/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isSelected
                          ? "bg-[#0B4F9C] text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {optionLetters[optIdx]}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-normal">{opt}</span>
                  </div>
                );
              })}
            </div>

            {/* Navigation and Submit footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                disabled={currentQIndex === 0}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 disabled:opacity-30"
              >
                ← Previous Question
              </button>

              <div className="flex items-center space-x-2">
                {currentQIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(currentQIndex + 1)}
                    className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Assessment for Evaluation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: RESULTS, DETAILED EXPLANATIONS & COMPETENCY BOOST */}
      {stage === "results" && quizResult && (
        <div className="space-y-6">
          {/* Result Score Banner */}
          <div
            className={`rounded-xl p-6 text-white shadow-md border ${
              quizResult.passed
                ? "bg-gradient-to-r from-emerald-700 to-teal-800 border-emerald-600"
                : "bg-gradient-to-r from-rose-700 to-red-800 border-rose-600"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black">
                  {quizResult.scorePercentage}%
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                      {quizResult.passed ? "Assessment Qualified" : "Needs Revision"}
                    </span>
                    <span className="text-xs text-white/80">{quizResult.completedAt}</span>
                  </div>
                  <h3 className="text-xl font-extrabold mt-0.5">
                    {quizResult.correctAnswers} of {quizResult.totalQuestions} Questions Correct
                  </h3>
                  <p className="text-xs text-white/90 mt-1 max-w-xl">{quizResult.feedback}</p>
                </div>
              </div>

              {/* Action: Update Competency */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleApplyCompetencyBoost}
                  disabled={competencyUpdated}
                  className={`text-xs font-extrabold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer ${
                    competencyUpdated
                      ? "bg-white/30 text-white cursor-not-allowed"
                      : "bg-amber-400 hover:bg-amber-300 text-slate-950"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  {competencyUpdated
                    ? "Competency Score Updated (+0.4 Level) ✓"
                    : "Sync Score to My Competency Profile"}
                </button>
              </div>
            </div>
          </div>

          {/* 3. AI-Driven Competency Gap Analysis & iGOT Course Allocation */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#0B4F9C] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded flex items-center gap-1">
                    <Target className="w-3 h-3 text-amber-300" />
                    Automatic Competency Gap Diagnosis
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Domain: {quizResult.competencyGainTag}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Identified Competency Gap & Allocated iGOT Karmayogi Courses
                </h3>
              </div>

              {onNavigateToPathways && (
                <button
                  onClick={() => onNavigateToPathways(quizResult.competencyGainTag)}
                  className="text-xs font-bold text-[#0B4F9C] hover:text-[#083a75] flex items-center gap-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition self-start sm:self-auto"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  View All in iGOT Catalog <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Gap Analysis Summary Box */}
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              quizResult.passed ? "bg-emerald-50/50 border-emerald-200" : "bg-amber-50/60 border-amber-200"
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    quizResult.passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {quizResult.passed ? "Proficiency Level Met: Intermediate/Advanced" : "Skill Gap Detected: Remediation Required"}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    Score: {quizResult.scorePercentage}% ({quizResult.correctAnswers}/{quizResult.totalQuestions})
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {quizResult.passed
                    ? `You demonstrated solid command of ${quizResult.competencyGainTag}. To reach the next cadre benchmark, specialized advanced modules have been allocated to your profile below.`
                    : `Your score (${quizResult.scorePercentage}%) indicates foundational concept gaps in ${quizResult.competencyGainTag}. iGOT Karmayogi curriculum modules have been automatically allocated to bridge these gaps.`}
                </p>
              </div>

              <div className="bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs shrink-0 text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Allocated Modules</div>
                <div className="text-lg font-black text-[#0B4F9C]">
                  {courses.filter(c => c.isAllocated).length || 2} Courses
                </div>
              </div>
            </div>

            {/* List of Allocated Courses */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#0B4F9C]" />
                Assigned Learning Path Based on Your Quiz Performance:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses
                  .filter((c) => {
                    if (c.isAllocated) return true;
                    // Fallback matching by competency tag
                    return c.competencyMapped.some(
                      (m) =>
                        m.toLowerCase().includes(quizResult.competencyGainTag.toLowerCase()) ||
                        quizResult.competencyGainTag.toLowerCase().includes(m.toLowerCase())
                    );
                  })
                  .slice(0, 4)
                  .map((course) => (
                    <div
                      key={course.id}
                      className="p-3.5 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/40 to-indigo-50/20 flex flex-col justify-between space-y-2.5 hover:shadow-xs transition"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-[#0B4F9C] bg-white border border-blue-200 px-2 py-0.5 rounded">
                            {course.courseCode}
                          </span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-extrabold px-1.5 py-0.5 rounded">
                            Auto-Allocated
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 leading-snug">
                          {course.title}
                        </h5>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {course.durationHours} hrs
                          </span>
                          <span>• {course.level}</span>
                        </div>
                        {onNavigateToPathways ? (
                          <button
                            onClick={() => onNavigateToPathways(course.courseCode)}
                            className="text-[#0B4F9C] hover:underline font-bold flex items-center gap-0.5"
                          >
                            Start Course <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Detailed Question Review with Official Explanations */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Comprehensive Concept Explanations & Reference Standards
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed pedagogical rationale for every question, grounded in MoSPI manuals.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="text-xs font-bold text-slate-700 hover:text-[#0B4F9C] flex items-center gap-1.5 border border-slate-200 px-3 py-1.5 rounded-lg"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save Assessment
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.correctIndex;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-4 rounded-xl border text-xs space-y-3 ${
                      isCorrect ? "bg-emerald-50/20 border-emerald-200" : "bg-rose-50/20 border-rose-200"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isCorrect ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">{q.competencyTag}</span>
                      </div>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                          isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <div className="font-bold text-sm text-slate-900 leading-snug">{q.question}</div>

                    {/* Options list showing user selection and correct mark */}
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const wasChosen = userAnswer === optIdx;
                        const isRightAnswer = q.correctIndex === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                              isRightAnswer
                                ? "bg-emerald-50 border-emerald-300 font-semibold text-emerald-950"
                                : wasChosen
                                ? "bg-rose-50 border-rose-300 text-rose-900"
                                : "bg-slate-50/50 border-slate-200 text-slate-600"
                            }`}
                          >
                            <span>{opt}</span>
                            {isRightAnswer && (
                              <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer
                              </span>
                            )}
                            {wasChosen && !isRightAnswer && (
                              <span className="text-rose-700 font-bold flex items-center gap-1 text-[11px]">
                                <XCircle className="w-3.5 h-3.5" /> Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-slate-800 space-y-1">
                      <span className="font-bold text-[#0B4F9C] flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-[#0B4F9C]" />
                        Official Explanation & MoSPI Methodology Reference:
                      </span>
                      <p className="leading-relaxed text-slate-700">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
              <button
                onClick={() => setStage("setup")}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                ← Take Another Assessment
              </button>

              {onNavigateToPathways && (
                <button
                  onClick={() => onNavigateToPathways(quizResult.competencyGainTag)}
                  className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  View & Enroll in Allocated iGOT Courses →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
