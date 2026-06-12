<template>
  <div class="test-exam-container" v-if="sessionLoaded">
    <!-- Fullscreen Gate Overlay -->
    <div class="fullscreen-gate-overlay" v-if="!isFullscreenActive">
      <div class="gate-card">
        <div class="gate-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            <path d="M10 21v-6a2 2 0 0 0-2-2H2"/>
            <path d="M14 3v6a2 2 0 0 0 2 2h6"/>
          </svg>
        </div>
        <h3>To'liq ekran rejimi talab qilinadi</h3>
        <p>Testni boshlash yoki davom ettirish uchun brauzeringizni to'liq ekran rejimiga o'tkazishingiz kerak. Bu test jarayonining shaffofligini ta'minlash uchun zarur.</p>
        <button @click="enterFullscreen" class="btn-enter-fullscreen">To'liq ekranga o'tish</button>
      </div>
    </div>

    <!-- Focus Gate Overlay -->
    <div class="focus-gate-overlay" v-if="isFullscreenActive && !isWindowFocused">
      <div class="focus-card">
        <div class="focus-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>Oyna fokusi yo'qotildi</h3>
        <p>Test vaqtida boshqa dasturlarga yoki oynalarga o'tish taqiqlanadi! Davom etish uchun ushbu oynaga bosing.</p>
        <button @click="refocusWindow" class="btn-refocus">Ekranga qaytish</button>
      </div>
    </div>

    <!-- Top Progress & Status Bar -->
    <header class="exam-header">
      <div class="header-inner container">
        <div class="student-info">
          <h2>{{ studentName }}</h2>
          <span class="session-badge">Oxford Placement Test</span>
        </div>

        <!-- Horizontal Steps Progress System -->
        <div class="steps-progress-system">
          <div
            v-for="step in progressSteps"
            :key="step.number"
            class="step-item"
            :class="{
              'active-step': currentStepNum === step.number,
              'completed-step': currentStepNum > step.number,
            }"
          >
            <div class="step-bubble">{{ step.number }}</div>
            <span class="step-label">{{ step.label }}</span>
          </div>
        </div>

        <div
          class="timer-card"
          :class="{ 'timer-warning': remainingSeconds < 300 }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span class="timer-digits">{{ formatTime(remainingSeconds) }}</span>
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="exam-workspace container">
      <!-- Left sidebar: Sections list & Question numbers -->
      <aside class="exam-sidebar">
        <div class="sections-nav">
          <button
            v-for="section in visibleSections"
            :key="section.key"
            @click="activeSection = section.key"
            class="section-tab"
            :class="{ 'active-tab': activeSection === section.key }"
          >
            {{ section.title }}
            <span class="badge-count"
              >{{ getSectionAnsweredCount(section.key) }} /
              {{ getSectionTotalCount(section.key) }}</span
            >
          </button>
        </div>

        <hr class="divider" />

        <div class="questions-grid">
          <h4>Questions List</h4>
          <div class="grid-buttons">
            <button
              v-for="(q, idx) in sortedQuestions"
              :key="q._id"
              @click="jumpToQuestion(idx)"
              class="q-nav-btn"
              :class="{
                'active-q': currentQuestionIndex === idx,
                'answered-q': hasAnswer(q._id),
              }"
            >
              {{ idx + 1 }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Center content: Question display -->
      <main class="question-canvas">
        <div class="question-box" v-if="currentQuestion">
          <div class="question-header">
            <span class="category-badge"
              >{{ currentQuestion.category }} Level</span
            >
            <span class="q-number"
              >Question {{ currentQuestionIndex + 1 }} of
              {{ totalQuestions }}</span
            >
          </div>

          <!-- Split Reading Passage -->
          <div
            v-if="
              currentQuestion.section === 'reading' && currentQuestion.passage
            "
            class="reading-split"
          >
            <div class="passage-panel">
              <h5>Reading Passage</h5>
              <p class="passage-text">{{ currentQuestion.passage }}</p>
            </div>
            <div class="question-panel">
              <h3 class="question-text">{{ currentQuestion.text }}</h3>
              <div class="answers-wrapper">
                <div
                  v-if="currentQuestion.type === 'single'"
                  class="options-list"
                >
                  <label
                    v-for="opt in currentQuestion.options"
                    :key="opt"
                    class="option-item"
                    :class="{
                      'selected-opt': isSelected(currentQuestion._id, opt),
                    }"
                  >
                    <input
                      type="radio"
                      :name="currentQuestion._id"
                      :value="opt"
                      :checked="isSelected(currentQuestion._id, opt)"
                      @change="selectSingle(currentQuestion._id, opt)"
                    />
                    <span>{{ opt }}</span>
                  </label>
                </div>
                <div
                  v-else-if="currentQuestion.type === 'multiple'"
                  class="options-list"
                >
                  <label
                    v-for="opt in currentQuestion.options"
                    :key="opt"
                    class="option-item"
                    :class="{
                      'selected-opt': isSelected(currentQuestion._id, opt),
                    }"
                  >
                    <input
                      type="checkbox"
                      :value="opt"
                      :checked="isSelected(currentQuestion._id, opt)"
                      @change="selectMultiple(currentQuestion._id, opt)"
                    />
                    <span>{{ opt }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Standard Question Display (Grammar, Vocab, Mistakes, Make a sentence, Listening, Writing, Essay) -->
          <div v-else class="standard-display">
            <!-- Listening Audio Player -->
            <div
              v-if="
                currentQuestion.section === 'listening' &&
                currentQuestion.audioUrl
              "
              class="listening-player-card"
            >
              <p>
                🔊 Listen to the audio instruction below before answering
                (Limit: {{ maxAudioPlays }} plays):
              </p>
              <div class="custom-audio-controls">
                <audio
                  ref="audioPlayer"
                  controls
                  :src="currentQuestion.audioUrl"
                  class="audio-element"
                  @play="onAudioPlay"
                ></audio>
                <div class="play-stats-badge">
                  Plays: <strong>{{ audioPlayCount }}</strong> /
                  {{ maxAudioPlays }}
                </div>
              </div>
            </div>

            <h3 class="question-text">{{ currentQuestion.text }}</h3>

            <div class="answers-wrapper">
              <!-- Single Choice (Grammar & Vocab) -->
              <div
                v-if="currentQuestion.type === 'single'"
                class="options-list"
              >
                <label
                  v-for="opt in currentQuestion.options"
                  :key="opt"
                  class="option-item"
                  :class="{
                    'selected-opt': isSelected(currentQuestion._id, opt),
                  }"
                >
                  <input
                    type="radio"
                    :name="currentQuestion._id"
                    :value="opt"
                    :checked="isSelected(currentQuestion._id, opt)"
                    @change="selectSingle(currentQuestion._id, opt)"
                  />
                  <span>{{ opt }}</span>
                </label>
              </div>

              <!-- Multiple Choice -->
              <div
                v-else-if="currentQuestion.type === 'multiple'"
                class="options-list"
              >
                <label
                  v-for="opt in currentQuestion.options"
                  :key="opt"
                  class="option-item"
                  :class="{
                    'selected-opt': isSelected(currentQuestion._id, opt),
                  }"
                >
                  <input
                    type="checkbox"
                    :value="opt"
                    :checked="isSelected(currentQuestion._id, opt)"
                    @change="selectMultiple(currentQuestion._id, opt)"
                  />
                  <span>{{ opt }}</span>
                </label>
              </div>

              <!-- Standard text entry (Mistake corrections / sentences) -->
              <div
                v-else-if="
                  currentQuestion.type === 'text' &&
                  currentQuestion.section !== 'writing' &&
                  currentQuestion.section !== 'essay'
                "
                class="text-answer-input"
              >
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  :value="getTextAnswer(currentQuestion._id)"
                  @input="
                    saveTextAnswer(currentQuestion._id, $event.target.value)
                  "
                  class="text-input-field"
                />
              </div>

              <!-- Writing & Essay Rich text area with live word counting -->
              <div
                v-else-if="
                  currentQuestion.section === 'writing' ||
                  currentQuestion.section === 'essay'
                "
                class="rich-writing-container"
              >
                <textarea
                  class="premium-textarea"
                  rows="8"
                  :placeholder="
                    currentQuestion.section === 'writing'
                      ? 'Write your response here (50-70 words)...'
                      : 'Write your essay here (150-250 words)...'
                  "
                  :value="getTextAnswer(currentQuestion._id)"
                  @input="
                    saveTextAnswer(currentQuestion._id, $event.target.value)
                  "
                ></textarea>

                <div class="word-counter-footer">
                  <span
                    class="count-badge"
                    :class="
                      getWordCountClass(
                        currentQuestion.section,
                        getTextAnswer(currentQuestion._id),
                      )
                    "
                  >
                    Word Count:
                    <strong>{{
                      getWordCount(getTextAnswer(currentQuestion._id))
                    }}</strong>
                    words
                  </span>
                  <span class="target-range">
                    Target:
                    <strong>{{
                      currentQuestion.section === "writing"
                        ? "50-70"
                        : "150-250"
                    }}</strong>
                    words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="navigation-bar">
          <button
            @click="prevQuestion"
            :disabled="
              currentQuestionIndex === 0 &&
              visibleSections.length > 0 &&
              activeSection === visibleSections[0].key
            "
            class="btn-secondary"
          >
            Previous
          </button>
          <button
            @click="showQuitModal = true"
            class="btn-quit"
            title="Test juda qiyin — to'xtash"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Too Difficult
          </button>
          <button v-if="hasNext" @click="nextQuestion" class="btn-primary">
            Next
          </button>
          <button
            v-else
            @click="confirmSubmit"
            class="btn-submit-exam"
            :disabled="submitting"
          >
            <span v-if="!submitting">Submit Exam</span>
            <span v-else>Grading exam...</span>
          </button>
        </div>
      </main>
    </div>

    <!-- Warnings Banner -->
    <div v-if="warnings > 0" class="anti-cheat-alert">
      <div class="alert-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span
          >Anti-Cheat Warning: Tab switching detected. Warning
          <strong>{{ warnings }}</strong> / 3. Exceeding 3 switches will
          auto-submit.</span
        >
      </div>
    </div>

    <!-- Quit / Too Difficult Modal -->
    <div
      v-if="showQuitModal"
      class="quit-modal-overlay"
      @click.self="showQuitModal = false"
    >
      <div class="quit-modal-card">
        <div class="quit-modal-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3>Test juda qiyinmi?</h3>
        <p>
          Hozirgi javoblaringiz asosida sizga
          <strong>daraja tavsiyasi</strong> beriladi. Test yakunlanadi va
          natijalar sahifasiga o'tasiz.
        </p>
        <p class="quit-answered-count">
          Javob berilgan: <strong>{{ answeredCount }}</strong> /
          {{ totalQuestions }} savol
        </p>
        <div class="quit-modal-actions">
          <button @click="showQuitModal = false" class="btn-quit-cancel">
            Testni davom ettirish
          </button>
          <button
            @click="handleQuit"
            class="btn-quit-confirm"
            :disabled="submitting"
          >
            <span v-if="!submitting">Ha, testni yakunlayman</span>
            <span v-else>Yuborilmoqda...</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Admin Approval Modal -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

const router = useRouter();
const sessionLoaded = ref(false);

// Exam Session Data
const leadId = ref("");
const testResultId = ref("");
const questions = ref([]);
const answers = ref({}); // Format: { questionId: [selectedAnswers] }
const timeSpent = ref(0);
const warnings = ref(0);
const studentName = ref("Student");

const activeSection = ref("grammar");
const currentQuestionIndex = ref(0);
const remainingSeconds = ref(3600); // Default 60 minutes in seconds
const timerInterval = ref(null);
const submitting = ref(false);
const showQuitModal = ref(false);
const isFullscreenActive = ref(false);
const isWindowFocused = ref(true);

// Audio elements replay trackers
const audioPlayCount = ref(0);
const maxAudioPlays = 2;
const currentPlayingAudioId = ref("");

const sections = ref([
  { key: "grammar", title: "Grammar" },
  { key: "vocabulary", title: "Vocabulary" },
  { key: "mistake", title: "Correct Mistake" },
  { key: "sentence", title: "Make Sentence" },
  { key: "reading", title: "Reading" },
  { key: "listening", title: "Listening" },
  { key: "writing", title: "Writing" },
  { key: "essay", title: "Essay (Optional)" },
]);

// Visible sections list based on question counts
const visibleSections = computed(() => {
  return sections.value.filter((s) => getSectionTotalCount(s.key) > 0);
});

// Steps indicator definitions
const progressSteps = computed(() => {
  const steps = [{ number: 1, label: "Info" }];
  let stepNum = 2;
  sections.value.forEach((sec) => {
    if (getSectionTotalCount(sec.key) > 0) {
      steps.push({ number: stepNum++, label: sec.title, key: sec.key });
    }
  });
  steps.push({ number: stepNum, label: "Results" });
  return steps;
});

const currentStepNum = computed(() => {
  const step = progressSteps.value.find((s) => s.key === activeSection.value);
  return step ? step.number : 1;
});

// Load session
onMounted(async () => {
  const sessionStr = localStorage.getItem("placement_session");
  if (!sessionStr) {
    router.push("/test");
    return;
  }

  const session = JSON.parse(sessionStr);
  leadId.value = session.leadId;
  testResultId.value = session.testResultId;
  questions.value = session.questions;
  warnings.value = session.warnings || 0;
  timeSpent.value = session.timeSpent || 0;

  // Pre-load current student name
  try {
    const res = await api
      .get(`placement/resume/${encodeURIComponent(session.leadId)}`)
      .catch(() => {});
    if (res && res.data) {
      studentName.value = res.data.name;
    }
  } catch (err) {}

  // Parse existing answers if any
  if (session.answers && Array.isArray(session.answers)) {
    const answerMap = {};
    session.answers.forEach((a) => {
      answerMap[a.questionId] = a.selectedAnswers;
    });
    answers.value = answerMap;
  }

  // Load timer settings
  try {
    const settingsRes = await api.get("settings");
    const timerSetting = settingsRes.data.find(
      (s) => s.key === "placement_test_timer",
    );
    if (timerSetting && timerSetting.value) {
      const minutesLimit = parseInt(timerSetting.value);
      remainingSeconds.value = minutesLimit * 60 - timeSpent.value;
    }
  } catch (err) {
    console.error("Failed to retrieve timer settings:", err);
  }

  sessionLoaded.value = true;

  // Initialize first visible section based on questions loaded
  const firstVisible = sections.value.find(
    (s) => getSectionTotalCount(s.key) > 0,
  );
  if (firstVisible) {
    activeSection.value = firstVisible.key;
  }

  // Start timer ticking
  startTimer();

  // Fullscreen checking
  checkFullscreen();
  document.addEventListener("fullscreenchange", checkFullscreen);
  document.addEventListener("webkitfullscreenchange", checkFullscreen);
  document.addEventListener("mozfullscreenchange", checkFullscreen);
  document.addEventListener("MSFullscreenChange", checkFullscreen);

  // Window focus/blur tracking
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("focus", handleWindowFocus);

  // Anti-cheat event listeners (no copy/paste/right-click)
  document.addEventListener("contextmenu", preventCheat);
  document.addEventListener("copy", preventCheat);
  document.addEventListener("cut", preventCheat);
  document.addEventListener("paste", preventCheat);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("beforeunload", preventRefresh);
});

onUnmounted(() => {
  clearInterval(timerInterval.value);
  document.removeEventListener("fullscreenchange", checkFullscreen);
  document.removeEventListener("webkitfullscreenchange", checkFullscreen);
  document.removeEventListener("mozfullscreenchange", checkFullscreen);
  document.removeEventListener("MSFullscreenChange", checkFullscreen);

  window.removeEventListener("blur", handleWindowBlur);
  window.removeEventListener("focus", handleWindowFocus);

  document.removeEventListener("contextmenu", preventCheat);
  document.removeEventListener("copy", preventCheat);
  document.removeEventListener("cut", preventCheat);
  document.removeEventListener("paste", preventCheat);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("beforeunload", preventRefresh);
});

// Filter and sort questions for current active section
const sortedQuestions = computed(() => {
  return questions.value.filter((q) => q.section === activeSection.value);
});

// Current question selected
const currentQuestion = computed(() => {
  return sortedQuestions.value[currentQuestionIndex.value] || null;
});

// Total questions
const totalQuestions = computed(() => questions.value.length);

// Count total answered questions
const answeredCount = computed(() => {
  return Object.keys(answers.value).filter(
    (key) =>
      answers.value[key] &&
      answers.value[key].length > 0 &&
      answers.value[key][0] !== "",
  ).length;
});

// Watcher to reset index and audio play count when switching questions or sections
watch(activeSection, () => {
  currentQuestionIndex.value = 0;
  audioPlayCount.value = 0;
});

watch(currentQuestion, (newQ) => {
  if (newQ && newQ.section === "listening") {
    audioPlayCount.value = 0;
  }
});

// Helper methods for answers checking
const hasAnswer = (qId) => {
  return (
    answers.value[qId] &&
    answers.value[qId].length > 0 &&
    answers.value[qId][0] !== ""
  );
};

const isSelected = (qId, option) => {
  return answers.value[qId] && answers.value[qId].includes(option);
};

const getTextAnswer = (qId) => {
  return answers.value[qId] ? answers.value[qId][0] || "" : "";
};

// Section metrics
const getSectionTotalCount = (secKey) => {
  return questions.value.filter((q) => q.section === secKey).length;
};

const getSectionAnsweredCount = (secKey) => {
  const secQuestions = questions.value
    .filter((q) => q.section === secKey)
    .map((q) => q._id);
  return Object.keys(answers.value).filter(
    (qId) =>
      secQuestions.includes(qId) &&
      answers.value[qId].length > 0 &&
      answers.value[qId][0] !== "",
  ).length;
};

// Word counting helpers
const getWordCount = (text) => {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
};

const getWordCountClass = (section, text) => {
  const count = getWordCount(text);
  if (section === "writing") {
    if (count >= 50 && count <= 70) return "count-perfect";
    if (count > 0 && (count < 50 || count > 70)) return "count-warning";
  } else if (section === "essay") {
    if (count >= 150 && count <= 250) return "count-perfect";
    if (count > 0 && (count < 150 || count > 250)) return "count-warning";
  }
  return "count-none";
};

// Replay limit check
const onAudioPlay = (event) => {
  if (audioPlayCount.value >= maxAudioPlays) {
    event.target.pause();
    alert(
      `You have already listened to this audio instructions ${maxAudioPlays} times. Playing is locked.`,
    );
  } else {
    audioPlayCount.value++;
  }
};

// Navigation checks
const hasNext = computed(() => {
  // Check if there are more questions in the current section
  if (currentQuestionIndex.value < sortedQuestions.value.length - 1)
    return true;
  // Check if there are more sections after this one
  const currentSectionIdx = visibleSections.value.findIndex(
    (s) => s.key === activeSection.value,
  );
  return currentSectionIdx < visibleSections.value.length - 1;
});

// User Actions
const jumpToQuestion = (idx) => {
  currentQuestionIndex.value = idx;
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < sortedQuestions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    // Jump to the first question of the next visible section
    const currentSectionIdx = visibleSections.value.findIndex(
      (s) => s.key === activeSection.value,
    );
    if (currentSectionIdx < visibleSections.value.length - 1) {
      activeSection.value = visibleSections.value[currentSectionIdx + 1].key;
      currentQuestionIndex.value = 0;
    }
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  } else {
    // Jump to the last question of the previous visible section
    const currentSectionIdx = visibleSections.value.findIndex(
      (s) => s.key === activeSection.value,
    );
    if (currentSectionIdx > 0) {
      activeSection.value = visibleSections.value[currentSectionIdx - 1].key;
      currentQuestionIndex.value =
        getSectionTotalCount(activeSection.value) - 1;
    }
  }
};

// Selection changes
const selectSingle = (qId, option) => {
  answers.value[qId] = [option];
  autosaveAnswer(qId, [option]);
};

const selectMultiple = (qId, option) => {
  if (!answers.value[qId]) {
    answers.value[qId] = [];
  }
  const index = answers.value[qId].indexOf(option);
  if (index > -1) {
    answers.value[qId].splice(index, 1);
  } else {
    answers.value[qId].push(option);
  }
  autosaveAnswer(qId, answers.value[qId]);
};

// Debounce for text input typing
let typingTimeout = null;
const saveTextAnswer = (qId, value) => {
  answers.value[qId] = [value];

  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    autosaveAnswer(qId, [value]);
  }, 1000);
};

// API Call for Autosaving Answer
const autosaveAnswer = async (qId, selected) => {
  try {
    await api.post("placement/save-answer", {
      testResultId: testResultId.value,
      questionId: qId,
      selectedAnswers: selected,
      timeSpent: timeSpent.value,
      warnings: warnings.value,
    });

    // Sync local storage
    const session = JSON.parse(localStorage.getItem("placement_session"));
    const localAnswers = session.answers || [];
    const existIdx = localAnswers.findIndex((a) => a.questionId === qId);
    if (existIdx > -1) {
      localAnswers[existIdx].selectedAnswers = selected;
    } else {
      localAnswers.push({ questionId: qId, selectedAnswers: selected });
    }
    session.answers = localAnswers;
    localStorage.setItem("placement_session", JSON.stringify(session));
  } catch (err) {
    console.error("Failed to autosave answer:", err);
  }
};

// Timer Ticking
const startTimer = () => {
  timerInterval.value = setInterval(() => {
    timeSpent.value++;
    remainingSeconds.value--;

    if (remainingSeconds.value <= 0) {
      clearInterval(timerInterval.value);
      submitExam(true); // Auto-submit when time is up
    }
  }, 1000);
};

const formatTime = (secs) => {
  if (secs < 0) return "00:00";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

// Fullscreen Control Handlers
const checkFullscreen = () => {
  isFullscreenActive.value = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

const enterFullscreen = () => {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch((err) => console.log("Fullscreen request failed:", err));
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
};

// Window Focus Control Handlers
const handleWindowBlur = () => {
  isWindowFocused.value = false;
};

const handleWindowFocus = () => {
  isWindowFocused.value = true;
};

const refocusWindow = () => {
  window.focus();
  isWindowFocused.value = true;
};

const preventCheat = (e) => {
  e.preventDefault();
};

// Anti-Cheat Handlers
const handleVisibilityChange = async () => {
  if (document.hidden) {
    warnings.value++;

    // Sync in DB
    try {
      await api.post("placement/save-answer", {
        testResultId: testResultId.value,
        warnings: warnings.value,
      });
    } catch (err) {}

    if (warnings.value >= 3) {
      alert(
        "Maximum tab switches exceeded. Your test is being auto-submitted.",
      );
      submitExam(true);
    } else {
      alert(
        `Warning: Switching tabs is not allowed. Warning count: ${warnings.value} / 3.`,
      );
    }
  }
};

const preventRefresh = (e) => {
  e.preventDefault();
  e.returnValue =
    "Are you sure you want to refresh? You might lose active session details.";
};

// Exam Submissions
const confirmSubmit = () => {
  submitExam(false);
};

const handleQuit = () => {
  showQuitModal.value = false;
  submitExam(false);
};

const submitExam = async (isAuto = false) => {
  if (submitting.value) return;
  submitting.value = true;
  clearInterval(timerInterval.value);

  try {
    const res = await api.post("placement/submit", {
      testResultId: testResultId.value,
      timeSpent: timeSpent.value,
      warnings: warnings.value,
    });

    // Remove local storage
    localStorage.removeItem("placement_session");

    // Exit fullscreen programmatically when test is submitted
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (fsErr) {
      console.log("Exit fullscreen failed:", fsErr);
    }

    // Redirect to results passing score, level, and feedback
    localStorage.setItem("placement_result_cache", JSON.stringify(res.data));
    router.push("/test/result");
  } catch (err) {
    alert("Failed to submit test. Please contact support.");
    console.error(err);
    submitting.value = false;
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.fullscreen-gate-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.focus-gate-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.focus-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  max-width: 480px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: scaleUp 0.3s ease;
  box-sizing: border-box;
}

.focus-icon {
  color: #ef4444;
  margin-bottom: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.focus-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

.focus-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-refocus {
  background: #ef4444;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  transition: all 0.2s;
}

.btn-refocus:hover {
  background: #dc2626;
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.gate-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  max-width: 480px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: scaleUp 0.3s ease;
  box-sizing: border-box;
}

.gate-icon {
  color: #6366f1;
  margin-bottom: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.gate-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
}

.gate-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.btn-enter-fullscreen {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all 0.2s;
}

.btn-enter-fullscreen:hover {
  background: #4f46e5;
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.test-exam-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding-top: 0;
  background: #f8fafc;
}

.exam-header {
  background: white;
  border-bottom: 1.5px solid #cbd5e1;
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.student-info h2 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.session-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #059669;
  background: #d1fae5;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
}

.exam-progress {
  flex: 1;
  max-width: 450px;
}

.progress-info {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.35rem;
}

.progress-bar-bg {
  height: 8px;
  background: #e2e8f0;
  border-radius: 99px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: #6366f1;
  border-radius: 99px;
  transition: width 0.4s ease;
}

.timer-card {
  background: #f1f5f9;
  color: #1e293b;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
}

.timer-card svg {
  color: #6366f1;
}

.timer-warning {
  background: #fee2e2;
  color: #ef4444;
  animation: pulse-border 1.5s infinite;
}

.timer-warning svg {
  color: #ef4444;
}

.timer-digits {
  font-size: 1.15rem;
  font-family: monospace;
}

@keyframes pulse-border {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

/* Workspace Layout */
.exam-workspace {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: 2rem;
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 3rem;
  height: calc(100vh - 80px);
  overflow: hidden;
  box-sizing: border-box;
}

.exam-sidebar {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  border: 1.5px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}

.sections-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  font-weight: 700;
  text-align: left;
  border: 1px solid transparent;
}

.section-tab:hover {
  background: #f8fafc;
  color: #6366f1;
}

.active-tab {
  background: #e0e7ff;
  color: #4f46e5;
}

.badge-count {
  font-size: 0.75rem;
  background: white;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.divider {
  border: none;
  border-top: 1.5px solid #e2e8f0;
}

.questions-grid h4 {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 1rem;
}

.grid-buttons {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

.q-nav-btn {
  height: 38px;
  width: 38px;
  border-radius: 8px;
  background: white;
  border: 1.5px solid #cbd5e1;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-nav-btn:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.answered-q {
  background: #cbd5e1;
  border-color: #cbd5e1;
  color: #1e293b;
}

.active-q {
  background: #6366f1 !important;
  border-color: #6366f1 !important;
  color: white !important;
}

/* Question panel canvas */
.question-canvas {
  background: white;
  border-radius: 24px;
  border: 1.5px solid #cbd5e1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-width: 0;
  box-sizing: border-box;
}

.question-box {
  padding: 2.5rem;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 1rem;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #6366f1;
  background: #e0e7ff;
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
}

.q-number {
  color: #64748b;
  font-weight: 600;
  font-size: 0.95rem;
}

.question-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 2rem;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

/* Reading Split passsge styles */
.reading-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
  height: 100%;
  box-sizing: border-box;
}

.passage-panel {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow-y: auto;
  max-height: 350px;
  box-sizing: border-box;
}

.passage-panel h5 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #334155;
  font-weight: 700;
}

.passage-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Audio Player */
.listening-player-card {
  background: #f0f7ff;
  border: 1px solid #bfdbfe;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.listening-player-card p {
  font-size: 0.9rem;
  color: #1e40af;
  font-weight: 700;
}

.audio-element {
  width: 100%;
}

/* Options renderer */
.options-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1.5px solid #cbd5e1;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  min-width: 0;
}

.option-item input {
  accent-color: #6366f1;
  scale: 1.2;
  flex-shrink: 0;
}

.option-item span {
  flex: 1;
  min-width: 0;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.selected-opt {
  border-color: #6366f1;
  background: #f5f3ff;
  color: #4f46e5;
}

.text-input-field {
  width: 100%;
  padding: 1rem;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
}

.text-input-field:focus {
  border-color: #6366f1;
}

/* Navigation footer bar */
.navigation-bar {
  padding: 1.5rem 2.5rem;
  background: #f8fafc;
  border-top: 1.5px solid #cbd5e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-secondary {
  border: 1.5px solid #cbd5e1;
  color: #475569;
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  font-weight: 700;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #6366f1;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  font-weight: 700;
}

.btn-submit-exam {
  background: #10b981;
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  font-weight: 700;
}

/* Anti-Cheat Warning Alert */
.anti-cheat-alert {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #ef4444;
  color: white;
  padding: 0.85rem 1.5rem;
  border-radius: 99px;
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
  z-index: 2000;
  display: flex;
  align-items: center;
  animation: shake 0.5s ease;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;
}

@keyframes shake {
  0%, 100% { transform: translateX(-50%); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-52%); }
  20%, 40%, 60%, 80% { transform: translateX(-48%); }
}

@media (max-width: 992px) {
  .exam-workspace {
    grid-template-columns: 1fr;
    height: auto;
    overflow-y: auto;
  }
  .exam-sidebar {
    height: auto;
  }
  .reading-split {
    grid-template-columns: 1fr;
  }
}

/* Progress Steps System */
.steps-progress-system {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  max-width: 700px;
  margin: 0 1.5rem;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}
.step-bubble {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.3s ease;
}
.step-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  display: inline;
}
.active-step {
  opacity: 1;
}
.active-step .step-bubble {
  background: #0f172a;
  color: white;
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.2);
}
.active-step .step-label {
  color: #0f172a;
  font-weight: 700;
}
.completed-step {
  opacity: 0.8;
}
.completed-step .step-bubble {
  background: #10b981;
  color: white;
}
.completed-step .step-label {
  color: #10b981;
}

/* Audio limits and play badge */
.custom-audio-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
}
.play-stats-badge {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

/* Writing and Essay textarea templates */
.rich-writing-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}
.premium-textarea {
  width: 100%;
  padding: 1.25rem;
  border: 2px solid #cbd5e1;
  border-radius: 16px;
  font-size: 1.05rem;
  font-family: inherit;
  line-height: 1.6;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}
.premium-textarea:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.1);
}
.word-counter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}
.count-badge {
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-weight: 600;
}
.count-perfect {
  background: #d1fae5;
  color: #065f46;
}
.count-warning {
  background: #fef3c7;
  color: #92400e;
}
.count-none {
  background: #f1f5f9;
  color: #475569;
}
.target-range {
  color: #64748b;
}

/* ── Quit / Too Difficult button ───────────────────────────── */
.btn-quit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff7ed;
  color: #c2410c;
  border: 1.5px solid #fed7aa;
  padding: 0.65rem 1.1rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quit:hover {
  background: #ffedd5;
  border-color: #fb923c;
  color: #9a3412;
}

/* ── Quit Confirmation Modal ───────────────────────────────── */
.quit-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(5px);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quit-modal-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.quit-modal-icon {
  width: 68px;
  height: 68px;
  background: #fff7ed;
  color: #ea580c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.quit-modal-card h3 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.quit-modal-card p {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.quit-answered-count {
  display: inline-block;
  background: #f1f5f9;
  color: #334155;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 0.75rem 0 1.75rem;
}

.quit-modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-quit-cancel {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-quit-cancel:hover {
  background: #e2e8f0;
}

.btn-quit-confirm {
  background: #ea580c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
}

.btn-quit-confirm:hover:not(:disabled) {
  background: #c2410c;
}

.btn-quit-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-confirm-submit:hover:not(:disabled) {
  background: #059669;
}

.btn-confirm-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
