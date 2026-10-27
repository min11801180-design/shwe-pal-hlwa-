
"use strict";

// HTML elements
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const articleGrid = document.getElementById("articleGrid");
const filters = document.getElementById("filters");
const emptyMessage = document.getElementById("emptyMessage");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const articleDialog = document.getElementById("articleDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");

// Current category and search query
let activeCategory = "all";
let searchQuery = "";

// Filter and search articles
function updateArticles() {
  const cards = articleGrid.querySelectorAll(".article-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.dataset.title || "";
    const author = card.dataset.author || "";
    const content = card.dataset.content || "";

    const searchableText =
      `${title} ${author} ${content}`.toLocaleLowerCase();

    const matchesSearch =
      searchableText.includes(searchQuery.toLocaleLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      card.dataset.category === activeCategory;

    const visible = matchesSearch && matchesCategory;

    card.hidden = !visible;

    if (visible) {
      visibleCount++;
    }
  });

  emptyMessage.hidden = visibleCount !== 0;
}

// Search button
function searchArticles() {
  searchQuery = searchInput.value.trim();
  updateArticles();
}

searchButton.addEventListener("click", searchArticles);

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  updateArticles();
});

// Category filter buttons
filters.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  activeCategory = button.dataset.filter;

  filters.querySelectorAll(".filter-btn").forEach(item => {
    const isActive = item === button;

    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  updateArticles();
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "မီနူးပိတ်ရန်" : "မီနူးဖွင့်ရန်"
  );
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Sample article content
const articles = {
  "စာဖတ်ခြင်း၏ အလှတရား": `
စာဖတ်ခြင်း၏ အလှတရား

စာဖတ်ခြင်းသည် လူတစ်ယောက်၏ အသိပညာကို
တိုးပွားစေရုံသာမက အတွေးအခေါ်နှင့်
စိတ်ကူးစိတ်သန်းများကိုလည်း ဖွံ့ဖြိုးစေသည်။

စာအုပ်တစ်အုပ်ကို ဖတ်ရှုခြင်းအားဖြင့်
ကိုယ်တိုင်မကြုံဖူးသေးသော အတွေ့အကြုံများ၊
မသိရှိသေးသော အကြောင်းအရာများကို
လေ့လာသင်ယူနိုင်သည်။

စာဖတ်ခြင်းကို နေ့စဉ်အလေ့အကျင့်တစ်ခုအဖြစ်
မွေးမြူထားခြင်းသည် ဘဝတစ်လျှောက်လုံး
အသုံးဝင်မည့် အလေ့အကျင့်ကောင်းတစ်ခုဖြစ်သည်။
  `,

  "ကဗျာနှင့် ခံစားမှု": `
ကဗျာနှင့် ခံစားမှု

ကဗျာသည် စကားလုံးများဖြင့် ဖန်တီးထားသော
ခံစားမှုအနုပညာတစ်မျိုးဖြစ်သည်။

ကဗျာတစ်ပုဒ်တွင် ဝမ်းမြောက်ခြင်း၊
လွမ်းဆွတ်ခြင်း၊ မျှော်လင့်ခြင်းနှင့်
ဘဝအတွေ့အကြုံများကို တွေ့ရှိနိုင်သည်။

ကဗျာကို ဖတ်ရှုခြင်းသည် စိတ်ကူးဉာဏ်ကို
ဖွံ့ဖြိုးစေပြီး စကားလုံးများ၏ အလှတရားကို
နားလည်စေသည်။
  `,

  "အသိပညာနှင့် အနာဂတ်": `
အသိပညာနှင့် အနာဂတ်

အသိပညာသည် လူတစ်ယောက်၏ အနာဂတ်ကို
တည်ဆောက်ရာတွင် အရေးပါသော အခြေခံဖြစ်သည်။

လေ့လာသင်ယူခြင်းသည် ကျောင်းစာအုပ်များ
ဖတ်ရှုခြင်းတစ်ခုတည်းကိုသာ ဆိုလိုခြင်းမဟုတ်ပါ။
အတွေ့အကြုံများမှ သင်ယူခြင်း၊ မေးခွန်းများ
မေးမြန်းခြင်းနှင့် အချက်အလက်များကို
စဉ်းစားသုံးသပ်ခြင်းတို့လည်း ပါဝင်သည်။

သင်ယူမှုကို မရပ်တန့်ဘဲ ဆက်လက်ကြိုးစားခြင်းသည်
မိမိ၏ အနာဂတ်အတွက် အထောက်အကူဖြစ်စေသည်။
  `
};

// Open article in a reading dialog
articleGrid.addEventListener("click", event => {
  const button = event.target.closest(".read-btn");

  if (!button) return;

  const card = button.closest(".article-card");
  const title = card.dataset.title;

  dialogTitle.textContent = title;
  dialogContent.textContent =
    articles[title] || "ဤဆောင်းပါးအတွက် အကြောင်းအရာ မထည့်ရသေးပါ။";

  articleDialog.showModal();
});

// Close reading dialog
closeDialog.addEventListener("click", () => {
  articleDialog.close();
});

// Close when clicking outside the dialog
articleDialog.addEventListener("click", event => {
  if (event.target === articleDialog) {
    articleDialog.close();
  }
});

// Initial setup
filters.querySelectorAll(".filter-btn").forEach(button => {
  button.setAttribute(
    "aria-pressed",
    String(button.dataset.filter === "all")
  );
});

updateArticles();
