// Smart Student Portal JS
document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // Utility Helper
  // ==========================================
  const showMessage = (element, text, type) => {
    element.className = `message-box active ${type}`;
    element.innerHTML = text;
  };

  // ==========================================
  // Task 1: Student Registration Form[cite: 2]
  // ==========================================
  const regForm = document.getElementById("registrationForm");
  const regOutput = document.getElementById("regOutput");

  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById("fullName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const age = parseInt(document.getElementById("age").value, 10);
    const email = document.getElementById("email").value.trim();
    const track = document.getElementById("track").value;

    if (!fullName || !studentId || !email || !track || isNaN(age)) {
      showMessage(regOutput, "Please fill in all registration fields.", "error");
      return;
    }

    if (age < 16) {
      showMessage(regOutput, "Registration rejected: Student age must be at least 16.", "error");
      return;
    }

    showMessage(regOutput, `Welcome, <strong>${fullName}</strong>! You have successfully registered for the <strong>${track}</strong> track (ID: ${studentId}).`, "success");
  });

  // ==========================================
  // Task 2: Grade Calculator[cite: 2]
  // ==========================================
  const gradeForm = document.getElementById("gradeForm");
  const gradeOutput = document.getElementById("gradeOutput");

  gradeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const m1 = parseFloat(document.getElementById("mark1").value);
    const m2 = parseFloat(document.getElementById("mark2").value);
    const m3 = parseFloat(document.getElementById("mark3").value);

    if (isNaN(m1) || isNaN(m2) || isNaN(m3)) {
      showMessage(gradeOutput, "Please enter numerical marks for all 3 subjects.", "error");
      return;
    }

    if ([m1, m2, m3].some(m => m < 0 || m > 100)) {
      showMessage(gradeOutput, "Invalid Marks! All scores must be between 0 and 100.", "error");
      return;
    }

    const total = m1 + m2 + m3;
    const average = total / 3;
    let grade = "";

    if (average >= 90) grade = "A";
    else if (average >= 80) grade = "B";
    else if (average >= 70) grade = "C";
    else if (average >= 60) grade = "D";
    else grade = "F";

    const isPass = average >= 60;
    const bonusMsg = grade === "A" ? "<br><strong>Excellent Work!</strong>" : "";
    const statusText = isPass ? "<span style='color:#4ade80;'>Pass</span>" : "<span style='color:#f87171;'>Fail</span>";

    showMessage(
      gradeOutput,
      `Total Marks: ${total}/300<br>Average: ${average.toFixed(2)}%<br>Grade: <strong>${grade}</strong> | Status: ${statusText}${bonusMsg}`,
      isPass ? "success" : "error"
    );
  });

  // ==========================================
  // Task 3: Smart Discount Calculator[cite: 2]
  // ==========================================
  const discountForm = document.getElementById("discountForm");
  const discountOutput = document.getElementById("discountOutput");

  discountForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pName = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const qty = parseInt(document.getElementById("productQty").value, 10);
    const discountPct = parseFloat(document.getElementById("discountPct").value);

    if (!pName || isNaN(price) || isNaN(qty) || isNaN(discountPct)) {
      showMessage(discountOutput, "Please fill out all shopping parameters accurately.", "error");
      return;
    }

    if (price < 0) {
      showMessage(discountOutput, "Price cannot be negative.", "error");
      return;
    }

    if (qty < 1) {
      showMessage(discountOutput, "Quantity must be at least 1.", "error");
      return;
    }

    if (discountPct < 0 || discountPct > 100) {
      showMessage(discountOutput, "Discount percentage must be between 0% and 100%.", "error");
      return;
    }

    const subtotal = price * qty;
    const discountAmt = subtotal * (discountPct / 100);
    const finalPrice = subtotal - discountAmt;

    showMessage(
      discountOutput,
      `<strong>Product:</strong> ${pName}<br>
       <strong>Subtotal:</strong> ${subtotal.toFixed(2)} EGP<br>
       <strong>Discount (${discountPct}%):</strong> ${discountAmt.toFixed(2)} EGP<br>
       <strong>Final Price:</strong> ${finalPrice.toFixed(2)} EGP`,
      "info"
    );
  });

  // ==========================================
  // Task 4: Interactive Counter[cite: 3]
  // ==========================================
  let count = 0;
  const counterVal = document.getElementById("counterValue");
  const counterMsg = document.getElementById("counterMsg");

  const updateCounter = () => {
    counterVal.textContent = count;
    if (count === 10) {
      showMessage(counterMsg, "Goal Achieved! You reached 10!", "success");
    } else {
      showMessage(counterMsg, `Current Value: ${count}`, "info");
    }
  };

  document.getElementById("btnInc").addEventListener("click", () => {
    count++;
    updateCounter();
  });

  document.getElementById("btnDec").addEventListener("click", () => {
    if (count > 0) {
      count--;
      updateCounter();
    }
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    count = 0;
    updateCounter();
  });

  updateCounter();

  // ==========================================
  // Task 5: Temperature Converter[cite: 3]
  // ==========================================
  const tempInput = document.getElementById("tempInput");
  const tempOutput = document.getElementById("tempOutput");

  document.getElementById("btnCtoF").addEventListener("click", () => {
    const val = parseFloat(tempInput.value);
    if (isNaN(val)) {
      showMessage(tempOutput, "Please enter a valid numerical temperature.", "error");
      return;
    }
    const fahrenheit = (val * 9 / 5) + 32;
    showMessage(tempOutput, `${val}°C = <strong>${fahrenheit.toFixed(2)}°F</strong>`, "success");
  });

  document.getElementById("btnFtoC").addEventListener("click", () => {
    const val = parseFloat(tempInput.value);
    if (isNaN(val)) {
      showMessage(tempOutput, "Please enter a valid numerical temperature.", "error");
      return;
    }
    const celsius = (val - 32) * 5 / 9;
    showMessage(tempOutput, `${val}°F = <strong>${celsius.toFixed(2)}°C</strong>`, "success");
  });

  // ==========================================
  // Task 6: Mini Quiz Application[cite: 3]
  // ==========================================
  const quizQuestions = [
    {
      q: "1. What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyperlink and Text Management Language"
      ],
      answer: 0
    },
    {
      q: "2. Which CSS property changes text color?",
      options: ["text-color", "color", "font-color"],
      answer: 1
    },
    {
      q: "3. How do you declare a constant variable in JavaScript?",
      options: ["var", "let", "const"],
      answer: 2
    },
    {
      q: "4. Which HTML element is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>"],
      answer: 2
    },
    {
      q: "5. Which array method creates a new array filtered by condition?",
      options: ["filter()", "map()", "forEach()"],
      answer: 0
    }
  ];

  const quizContainer = document.getElementById("quizContainer");
  const quizForm = document.getElementById("quizForm");
  const quizOutput = document.getElementById("quizOutput");

  // Render Quiz Questions
  quizQuestions.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-question";

    const title = document.createElement("p");
    title.textContent = item.q;
    qDiv.appendChild(title);

    item.options.forEach((opt, optIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question_${index}`;
      radio.value = optIndex;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      qDiv.appendChild(label);
    });

    quizContainer.appendChild(qDiv);
  });

  // Quiz Form Handler
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let score = 0;
    let allAnswered = true;

    quizQuestions.forEach((item, index) => {
      const selected = document.querySelector(`input[name="question_${index}"]:checked`);
      if (!selected) {
        allAnswered = false;
      } else if (parseInt(selected.value, 10) === item.answer) {
        score++;
      }
    });

    if (!allAnswered) {
      showMessage(quizOutput, "Please answer all 5 questions before submitting.", "error");
      return;
    }

    let feedback = "";
    if (score === 5) feedback = "Perfect Score! Excellent Work!";
    else if (score >= 3) feedback = "Good Job! Solid Knowledge.";
    else feedback = "Keep Learning and Try Again!";

    showMessage(quizOutput, `Score: <strong>${score} / 5</strong><br>Feedback: ${feedback}`, "success");
  });
});