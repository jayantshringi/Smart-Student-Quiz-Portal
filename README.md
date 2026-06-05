# Smart Student Quiz Portal

A clean, responsive, and elegant client-side examination portal designed for students to take multi-question quizzes. Built using semantic HTML5, pure CSS3, and vanilla JavaScript, it features a modern and distraction-free user interface.

## 🚀 Features

- **Candidate Verification:** Secure verification card that captures the student's name and roll number before starting the exam.
- **Rule Dashboard:** Structured instructions page detailing questions, timers, marking schemes, and safety notifications.
- **Dynamic Quiz Interface:**
  - Standard pagination controls (Previous/Next) with disabled states.
  - Interactive multiple-choice option tiles with micro-interactions and selected state highlights.
  - Rounded visual progress bar tracking current question index.
  - Active countdown timer box that turns red and alerts the user if time is running out.
- **Auto-Submit Guard:** Automatically submits the examination environment when the timer reaches `00:00` to prevent over-time answers.
- **Detailed Result Summary:**
  - Displays student details (Name & Roll Number).
  - Dynamic score ring gauge showing the percentage mark (colored according to score range).
  - Clean stats cards classifying the number of Correct, Wrong, and Skipped questions.
  - Personalized performance appraisal message based on results.
  - Option to instantly retake the quiz.

## 📂 Project Structure

The project is structured with a modular, single-page architecture:
- **[index.html](file:///d:/bytXL/MERN/Smart%20Student%20Quiz%20Portal/index.html)** - Holds the semantic HTML5 structure, cards, inputs, and results breakdown fields.
- **[style.css](file:///d:/bytXL/MERN/Smart%20Student%20Quiz%20Portal/style.css)** - Design system variables, responsive typography using *Plus Jakarta Sans*, component configurations, transitions, and performance outcome classes.
- **[script.js](file:///d:/bytXL/MERN/Smart%20Student%20Quiz%20Portal/script.js)** - Frontend controller handling the question bank, countdown interval timer, DOM rendering of choice inputs, pagination index updates, and outcome metrics calculation.

## 🛠️ Technologies Used

- **HTML5:** Semantic layouts and structural tagging.
- **CSS3:** Custom properties (CSS variables), CSS gradients (conic-gradients for result percentage ring), flexbox positioning, and CSS keyframe animations.
- **JavaScript (ES6):** Vanilla JS DOM manipulation, class toggling, runtime variable scopes, and CSS property mutation.
- **Google Fonts:** Plus Jakarta Sans.

## 🏃 How to Run the Project

1. Download or clone this repository to your local machine.
2. Open the project folder: `cd: Smart Student Quiz Portal` run `index.html` File on any Browser
3. Double-click **[index.html](file:///d:/bytXL/MERN/Smart%20Student%20Quiz%20Portal/index.html)**, or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, etc.).
4. Input credentials to begin testing!
