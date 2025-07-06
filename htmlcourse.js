let lessons = [];
let currentIndex = 0;

fetch('html.json')
  .then(res => res.json())
  .then(data => {
    lessons = data;
    showLesson();
  });

function showLesson() {
const lesson = lessons[currentIndex];
document.getElementById('lesson-title').textContent = lesson.title;
document.getElementById('lesson-content').textContent = lesson.content;

document.getElementById('quiz-section').style.display = "block";
document.getElementById('quiz-question').textContent = lesson.quiz.question;

const optionDiv = document.getElementById('quiz-options');
optionDiv.innerHTML = '';

lesson.quiz.options.forEach(option => {
const radio = document.createElement('input');
radio.type = "radio";
radio.name = "quiz";
radio.value = option;

const label = document.createElement('label');
label.textContent = option;
label.style.display = "block";
label.prepend(radio);

optionDiv.appendChild(label);
});

document.getElementById('quiz-result').textContent = "";
}

function submitAnswer(){
const selected = document.querySelector('input[name="quiz"]:checked');
if (!selected) return alert("Please First Select Any Answer")

const answer = lessons[currentIndex].quiz.answer;
const result = document.getElementById('quiz-result');

if (selected.value === answer) {
result.textContent = "✅ Correct!";
result.style.color = "green";
} else {
result.textContent = ❌ Incorrect. Correct answer: is ${answer};
result.style.color = "red";
}
}

function nextLesson(){
if (currentIndex < lessons.length - 1) {
currentIndex++;
showLesson();
}
}

function prevLesson() {
if (currentIndex > 0) {
currentIndex--;
showLesson();
}
}

// Theme toggle
const toggleBtn = document.getElementById("toggle-theme");

// Check saved preference
if (localStorage.getItem("theme") === "dark") {
document.body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");

// Save preference
if (document.body.classList.contains("dark")) {
localStorage.setItem("theme", "dark");
} else {
localStorage.setItem("theme", "light");
}
});

let htmlEditor =
CodeMirror.fromTextArea(document.getElementById('html'), {
mode: "htmlmixed",
lineNumbers: true,
theme: "dracula"
});

function runCode() {
const html = htmlEditor.getValue();
const iframe = document.getElementById("preview");
const errorBox = document.getElementById("error");

try {
errorBox.style.display = "none";
iframe.srcdoc = html;
} catch (error) {
errorBox.style.display = "block";
errorBox.textContent = ⚠️ ${error.message};
}
}

// Theme toggle button
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");
});

// Mobile Run Code / Back to Lesson toggle
const runCodeToggleBtn = document.getElementById('run-code-toggle');
const containersSection = document.querySelector('.containers');

runCodeToggleBtn.addEventListener('click', () => {
if (containersSection.classList.contains('show-editor')) {
// Switch back to lesson view
containersSection.classList.remove('show-editor');
runCodeToggleBtn.textContent = "Run Code";
} else {
// Switch to editor view
containersSection.classList.add('show-editor');
runCodeToggleBtn.textContent = "Back to Lesson";
}
});