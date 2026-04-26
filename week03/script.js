document.addEventListener("DOMContentLoaded", () => {
  const toggleFormBtn = document.querySelector("#toggleFormBtn");
  const deleteLastBtn = document.querySelector("#deleteLastBtn");
  const cancelBtn = document.querySelector("#cancelBtn");
  const formPanel = document.querySelector("#formPanel");
  const lionForm = document.querySelector("#lionForm");
  const countText = document.querySelector("#countText");
  const summaryList = document.querySelector("#summaryList");
  const detailList = document.querySelector("#detailList");

  const imagePool = [
    "https://picsum.photos/seed/newlion1/800/500",
    "https://picsum.photos/seed/newlion2/800/500",
    "https://picsum.photos/seed/newlion3/800/500",
    "https://picsum.photos/seed/newlion4/800/500"
  ];

  let lionList = [];

  initLionListFromHTML();
  renderAll();

  toggleFormBtn.addEventListener("click", () => {
    formPanel.classList.toggle("is-hidden");
  });

  cancelBtn.addEventListener("click", () => {
    closeFormAndReset();
  });

  deleteLastBtn.addEventListener("click", () => {
    if (lionList.length === 0) {
      return;
    }

    lionList.pop();
    renderAll();
  });

  lionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newLion = readFormData();

    lionList.push(newLion);
    renderAll();
    closeFormAndReset();
  });

  function initLionListFromHTML() {
    const seedCards = document.querySelectorAll(".seed-card");

    lionList = Array.from(seedCards).map((card) => {
      return {
        id: card.dataset.id,
        name: card.dataset.name,
        part: card.dataset.part,
        image: card.dataset.image,
        summary: card.dataset.summary,
        bio: card.dataset.bio,
        email: card.dataset.email,
        phone: card.dataset.phone,
        website: card.dataset.website,
        skills: splitSkills(card.dataset.skills),
        message: card.dataset.message,
        isMine: card.dataset.mine === "true"
      };
    });
  }

  function readFormData() {
    const formData = new FormData(lionForm);
    const skills = splitSkills(formData.get("skills"));
    const image = imagePool[lionList.length % imagePool.length];

    return {
      id: `lion-${Date.now()}`,
      name: formData.get("name").trim(),
      part: formData.get("part"),
      image: image,
      summary: formData.get("summary").trim(),
      bio: formData.get("bio").trim(),
      email: formData.get("email").trim(),
      phone: formData.get("phone").trim(),
      website: formData.get("website").trim(),
      skills: skills,
      message: formData.get("message").trim(),
      isMine: false
    };
  }

  function splitSkills(value) {
    return value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  }

  function renderAll() {
    renderCount();
    renderSummaryCards();
    renderDetailCards();
  }

  function renderCount() {
    countText.textContent = `총 ${lionList.length}명`;
  }

  function renderSummaryCards() {
    summaryList.innerHTML = "";

    lionList.forEach((lion) => {
      const card = document.createElement("article");

      if (lion.isMine) {
        card.className = "summary-card is-mine";
      } else {
        card.className = "summary-card";
      }

      card.innerHTML = `
        <div class="image-box">
          <img src="${escapeHTML(lion.image)}" alt="${escapeHTML(lion.name)} 프로필 이미지" />
          <span class="badge">${escapeHTML(lion.skills[0] || lion.part)}</span>
        </div>

        <div class="summary-body">
          <h3>${escapeHTML(lion.name)}</h3>
          <p class="part">${escapeHTML(lion.part)}</p>
          <p class="summary-text">${escapeHTML(lion.summary)}</p>
        </div>
      `;

      summaryList.appendChild(card);
    });
  }

  function renderDetailCards() {
    detailList.innerHTML = "";

    lionList.forEach((lion) => {
      const card = document.createElement("article");
      card.className = "detail-card";

      const skillItems = lion.skills
        .map((skill) => `<li>${escapeHTML(skill)}</li>`)
        .join("");

      card.innerHTML = `
        <h3>${escapeHTML(lion.name)}</h3>
        <p class="part">${escapeHTML(lion.part)}</p>
        <p class="club">LIKELION</p>

        <h4 class="detail-title">자기소개</h4>
        <p>${escapeHTML(lion.bio)}</p>

        <h4 class="detail-title">연락처</h4>
        <ul>
          <li>Email: ${escapeHTML(lion.email)}</li>
          <li>Phone: ${escapeHTML(lion.phone)}</li>
          <li>
            Website:
            <a href="${escapeHTML(lion.website)}" target="_blank">
              ${escapeHTML(lion.website)}
            </a>
          </li>
        </ul>

        <h4 class="detail-title">관심 기술</h4>
        <ul>
          ${skillItems}
        </ul>

        <h4 class="detail-title">한 마디</h4>
        <p>${escapeHTML(lion.message)}</p>
      `;

      detailList.appendChild(card);
    });
  }

  function validateForm() {
    const fieldNames = [
      "name",
      "skills",
      "summary",
      "bio",
      "email",
      "phone",
      "website",
      "message"
    ];

    let isValid = true;

    fieldNames.forEach((name) => {
      const input = lionForm.elements[name];
      const message = getErrorMessage(name, input.value.trim());

      showError(name, message);

      if (message) {
        isValid = false;
      }
    });

    return isValid;
  }

  function getErrorMessage(name, value) {
    if (!value) {
      return "이 입력란을 작성하세요.";
    }

    if (name === "skills" && splitSkills(value).length < 3) {
      return "관심 기술은 쉼표로 구분해서 3개 이상 입력하세요.";
    }

    if (name === "email" && !isValidEmail(value)) {
      return "올바른 이메일 형식으로 입력하세요.";
    }

    if (name === "phone" && !isValidPhone(value)) {
      return "전화번호는 숫자와 하이픈을 사용해 입력하세요.";
    }

    if (name === "website" && !isValidUrl(value)) {
      return "http:// 또는 https://로 시작하는 주소를 입력하세요.";
    }

    return "";
  }

  function showError(name, message) {
    const input = lionForm.elements[name];
    const error = lionForm.querySelector(`[data-error-for="${name}"]`);

    error.textContent = message;

    if (message) {
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    return /^[0-9\-\s+()]{8,20}$/.test(value);
  }

  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function closeFormAndReset() {
    lionForm.reset();
    clearErrors();
    formPanel.classList.add("is-hidden");
  }

  function clearErrors() {
    const errors = lionForm.querySelectorAll(".error-message");
    const inputs = lionForm.querySelectorAll("input, textarea");

    errors.forEach((error) => {
      error.textContent = "";
    });

    inputs.forEach((input) => {
      input.classList.remove("input-error");
    });
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});