const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const buttonCopy = document.getElementById("copyToClipboard");

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();
  resultInput.value = "";
  resultInput.classList.remove("error");
  buttonCopy.innerText = "Copy";
  buttonCopy.classList.remove("success");
});

input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (ev.key === "Enter") {
    calculate();
    buttonCopy.innerText = "Copy";
  }
});

document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  resultInput.value = "ERROR, tu é doidé?";
  resultInput.classList.add("error");

  const value = eval(input.value);

  resultInput.value = value;
  resultInput.classList.remove("error");
}

document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f3f7fb");
    root.style.setProperty("--border-color", "#888");
    root.style.setProperty("--font-color", "#000");
    root.style.setProperty("--primary-color", "#00b846");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      buttonCopy.innerText = "Copied!";
      buttonCopy.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      buttonCopy.innerText = "Copy";
      buttonCopy.classList.remove("success");
    }
  });
