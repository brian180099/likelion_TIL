document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://randomuser.me/api/?results=";

  let lions = [];
  let lastRequest = null;
  let isLoading = false;

  const cardGrid = document.querySelector("#cardGrid");
  const detailList = document.querySelector("#detailList");
  const totalCount = document.querySelector("#totalCount");
  const statusText = document.querySelector("#statusText");
  const retryBtn = document.querySelector("#retryBtn");
  const emptyText = document.querySelector("#emptyText");

  const toggleFormBtn = document.querySelector("#toggleFormBtn");
  const deleteLastBtn = document.querySelector("#deleteLastBtn");
  const addRandomOneBtn = document.querySelector("#addRandomOneBtn");
  const addRandomFiveBtn = document.querySelector("#addRandomFiveBtn");
  const refreshAllBtn = document.querySelector("#refreshAllBtn");

  const partFilter = document.querySelector("#partFilter");
  const sortSelect = document.querySelector("#sortSelect");
  const searchInput = document.querySelector("#searchInput");

  const formArea = document.querySelector("#formArea");
  const nameInput = document.querySelector("#nameInput");
  const partInput = document.querySelector("#partInput");
  const skillsInput = document.querySelector("#skillsInput");
  const summaryInput = document.querySelector("#summaryInput");
  const introInput = document.querySelector("#introInput");
  const emailInput = document.querySelector("#emailInput");
  const phoneInput = document.querySelector("#phoneInput");
  const websiteInput = document.querySelector("#websiteInput");
  const messageInput = document.querySelector("#messageInput");

  const fillRandomBtn = document.querySelector("#fillRandomBtn");
  const submitBtn = document.querySelector("#submitBtn");
  const cancelBtn = document.querySelector("#cancelBtn");

  const asyncButtons = [addRandomOneBtn, addRandomFiveBtn, refreshAllBtn, fillRandomBtn];

  initFromHTML();
  render();

  toggleFormBtn.addEventListener("click", function () {
    formArea.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", function () {
    formArea.classList.add("hidden");
  });

  submitBtn.addEventListener("click", function () {
    const newLion = {
      id: Date.now(),
      order: Date.now(),
      fixed: false,
      name: nameInput.value.trim(),
      part: partInput.value,
      skills: skillsInput.value.trim(),
      summary: summaryInput.value.trim(),
      intro: introInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      website: websiteInput.value.trim(),
      message: messageInput.value.trim(),
      image: getDefaultImage(partInput.value),
      badge: getBadgeFromSkills(skillsInput.value)
    };

    if (newLion.name === "") {
      alert("이름을 입력해 주세요.");
      return;
    }

    lions.push(newLion);
    clearForm();
    formArea.classList.add("hidden");
    render();
  });

  deleteLastBtn.addEventListener("click", function () {
    if (lions.length === 0) return;

    lions.pop();
    render();
  });

  addRandomOneBtn.addEventListener("click", function () {
    lastRequest = function () {
      return addRandomLions(1);
    };

    lastRequest();
  });

  addRandomFiveBtn.addEventListener("click", function () {
    lastRequest = function () {
      return addRandomLions(5);
    };

    lastRequest();
  });

  refreshAllBtn.addEventListener("click", function () {
    lastRequest = function () {
      return refreshAllLions();
    };

    lastRequest();
  });

  retryBtn.addEventListener("click", function () {
    if (lastRequest) {
      lastRequest();
    }
  });

  fillRandomBtn.addEventListener("click", function () {
    lastRequest = function () {
      return fillFormWithRandomData();
    };

    lastRequest();
  });

  partFilter.addEventListener("change", render);
  sortSelect.addEventListener("change", render);
  searchInput.addEventListener("input", render);

  function initFromHTML() {
    const initialCards = document.querySelectorAll(".lion-card.initial");

    initialCards.forEach(function (card, index) {
      const name = card.querySelector("h3").textContent;
      const part = card.querySelector(".part").textContent;
      const summary = card.querySelector(".summary").textContent;
      const image = card.querySelector("img").src;
      const badge = card.querySelector(".badge").textContent;

      const skills = card.querySelector("[data-skills]").textContent;
      const intro = card.querySelector("[data-intro]").textContent;
      const email = card.querySelector("[data-email]").textContent;
      const phone = card.querySelector("[data-phone]").textContent;
      const website = card.querySelector("[data-website]").textContent;
      const message = card.querySelector("[data-message]").textContent;

      lions.push({
        id: Date.now() + index,
        order: index,
        fixed: card.dataset.fixed === "true",
        name,
        part,
        skills,
        summary,
        intro,
        email,
        phone,
        website,
        message,
        image,
        badge
      });
    });
  }

  function render() {
    totalCount.textContent = `총 ${lions.length}명`;

    let visibleLions = [...lions];

    const selectedPart = partFilter.value;
    const keyword = searchInput.value.trim().toLowerCase();
    const sortType = sortSelect.value;

    if (selectedPart !== "all") {
      visibleLions = visibleLions.filter(function (lion) {
        return lion.part === selectedPart;
      });
    }

    if (keyword !== "") {
      visibleLions = visibleLions.filter(function (lion) {
        return lion.name.toLowerCase().includes(keyword);
      });
    }

    if (sortType === "newest") {
      visibleLions.sort(function (a, b) {
        return b.order - a.order;
      });
    }

    if (sortType === "name") {
      visibleLions.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }

    cardGrid.innerHTML = "";
    detailList.innerHTML = "";

    if (visibleLions.length === 0) {
      emptyText.classList.remove("hidden");
      return;
    }

    emptyText.classList.add("hidden");

    visibleLions.forEach(function (lion) {
      cardGrid.appendChild(createCard(lion));
      detailList.appendChild(createDetailCard(lion));
    });
  }

  function createCard(lion) {
    const card = document.createElement("article");
    card.className = "lion-card";

    card.innerHTML = `
      <img src="${lion.image}" alt="${lion.name}" />
      <span class="badge">${lion.badge}</span>
      <h3>${lion.name}</h3>
      <p class="part">${lion.part}</p>
      <p class="summary">${lion.summary}</p>
    `;

    return card;
  }

  function createDetailCard(lion) {
    const detailCard = document.createElement("article");
    detailCard.className = "detail-card";

    detailCard.innerHTML = `
      <h3>${lion.name}</h3>
      <p><strong>파트:</strong> ${lion.part}</p>
      <p><strong>관심 기술:</strong> ${lion.skills}</p>
      <p><strong>자기소개:</strong> ${lion.intro}</p>
      <p><strong>Email:</strong> ${lion.email}</p>
      <p><strong>Phone:</strong> ${lion.phone}</p>
      <p><strong>Website:</strong> ${lion.website}</p>
      <p><strong>한 마디:</strong> ${lion.message}</p>
    `;

    return detailCard;
  }

  async function addRandomLions(count) {
    try {
      setLoading(true);
      setStatus("불러오는 중...");

      const users = await fetchRandomUsers(count);
      const newLions = users.map(function (user, index) {
        return convertUserToLion(user, index);
      });

      lions = lions.concat(newLions);

      setStatus("완료!");
      render();

      setTimeout(function () {
        setStatus("준비 완료");
      }, 1000);
    } catch (error) {
      setFail(error);
    } finally {
      setLoading(false);
    }
  }

  async function refreshAllLions() {
    try {
      setLoading(true);
      setStatus("불러오는 중...");

      const fixedLions = lions.filter(function (lion) {
        return lion.fixed === true;
      });

      const newCount = lions.length - fixedLions.length;
      const users = await fetchRandomUsers(newCount);

      const newLions = users.map(function (user, index) {
        return convertUserToLion(user, index);
      });

      lions = fixedLions.concat(newLions);

      setStatus("완료!");
      render();

      setTimeout(function () {
        setStatus("준비 완료");
      }, 1000);
    } catch (error) {
      setFail(error);
    } finally {
      setLoading(false);
    }
  }

  async function fillFormWithRandomData() {
    try {
      setLoading(true);
      setStatus("불러오는 중...");

      const users = await fetchRandomUsers(1);
      const lion = convertUserToLion(users[0], 0);

      nameInput.value = lion.name;
      partInput.value = lion.part;
      skillsInput.value = lion.skills;
      summaryInput.value = lion.summary;
      introInput.value = lion.intro;
      emailInput.value = lion.email;
      phoneInput.value = lion.phone;
      websiteInput.value = lion.website;
      messageInput.value = lion.message;

      formArea.classList.remove("hidden");

      setStatus("완료!");

      setTimeout(function () {
        setStatus("준비 완료");
      }, 1000);
    } catch (error) {
      setFail(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRandomUsers(count) {
    const response = await fetch(`${API_URL}${count}&nat=us,gb,ca,au,nz`);

    if (!response.ok) {
      throw new Error("서버 응답에 문제가 있습니다.");
    }

    const data = await response.json();
    return data.results;
  }

  function convertUserToLion(user, index) {
    const part = getRandomPart();
    const skills = getSkillsByPart(part);

    return {
      id: Date.now() + index,
      order: Date.now() + index,
      fixed: false,
      name: `${user.name.first} ${user.name.last}`,
      part,
      skills,
      summary: `${part} · ${user.location.country} ${user.location.city}에서 합류했어요!`,
      intro: `외부 API에서 fetch로 불러온 데이터를 map으로 변환해 명단에 추가했습니다. ${part} 파트에서 함께 성장하고 싶습니다.`,
      email: user.email,
      phone: user.phone,
      website: `https://example.com/${user.login.username}`,
      message: "데이터가 바뀌면 UI도 바뀐다!",
      image: user.picture.large,
      badge: getBadgeFromSkills(skills)
    };
  }

  function setLoading(value) {
    isLoading = value;

    asyncButtons.forEach(function (button) {
      button.disabled = isLoading;
    });

    retryBtn.classList.add("hidden");
  }

  function setStatus(message) {
    statusText.textContent = message;
  }

  function setFail(error) {
    statusText.textContent = `불러오기 실패: ${error.message}`;
    retryBtn.classList.remove("hidden");
  }

  function getRandomPart() {
    const parts = ["Frontend", "Backend", "Design"];
    const randomIndex = Math.floor(Math.random() * parts.length);
    return parts[randomIndex];
  }

  function getSkillsByPart(part) {
    if (part === "Frontend") {
      return "JavaScript, React, HTML/CSS";
    }

    if (part === "Backend") {
      return "Node.js, Express, API";
    }

    return "Figma, Design System, UX";
  }

  function getBadgeFromSkills(skills) {
    return skills.split(",")[0].trim();
  }

  function getDefaultImage(part) {
    if (part === "Frontend") {
      return "https://randomuser.me/api/portraits/men/75.jpg";
    }

    if (part === "Backend") {
      return "https://randomuser.me/api/portraits/men/41.jpg";
    }

    return "https://randomuser.me/api/portraits/women/44.jpg";
  }

  function clearForm() {
    nameInput.value = "";
    skillsInput.value = "";
    summaryInput.value = "";
    introInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    websiteInput.value = "";
    messageInput.value = "";
  }
});