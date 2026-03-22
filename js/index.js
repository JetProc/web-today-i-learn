import { pageContent } from "./content-data.js";

const STORAGE_KEY = "tilEntries";

const elements = {
  navLogo: document.querySelector("#nav-logo"),
  profileImage: document.querySelector("#profile-image"),
  profileNickname: document.querySelector("#profile-nickname"),
  profileTagline: document.querySelector("#profile-tagline"),
  introContent: document.querySelector("#intro-content"),
  infoTableBody: document.querySelector("#info-table-body"),
  gallerySubtitle: document.querySelector("#gallery-subtitle"),
  galleryGrid: document.querySelector("#gallery-grid"),
  worksList: document.querySelector("#works-list"),
  tilForm: document.querySelector("#til-form"),
  tilDate: document.querySelector("#til-date"),
  tilTitle: document.querySelector("#til-title"),
  tilContent: document.querySelector("#til-content"),
  tilList: document.querySelector("#til-list"),
  footerCopy: document.querySelector("#footer-copy"),
};

let tilEntries = loadTilEntries();

renderPage();
bindEvents();

function renderPage() {
  renderSiteCopy();
  renderProfile();
  renderIntro();
  renderInfoTable();
  renderGallery();
  renderWorks();
  renderTilEntries(tilEntries);
  applyTodayDate();
}

function bindEvents() {
  elements.tilForm.addEventListener("submit", handleTilSubmit);
  elements.tilForm.addEventListener("reset", handleTilReset);
}

function renderSiteCopy() {
  elements.navLogo.textContent = withFallback(
    pageContent.site.brandName,
    "My Archive",
  );
  elements.footerCopy.textContent = withFallback(
    pageContent.site.footerText,
    "© 2026 My Archive.",
  );
}

function renderProfile() {
  const profileImage = createImage(pageContent.profile.image);

  elements.profileImage.replaceChildren(profileImage);
  elements.profileNickname.textContent = withFallback(
    pageContent.profile.nickname,
    "닉네임",
  );
  elements.profileTagline.textContent = withFallback(
    pageContent.profile.tagline,
    "한 줄 소개를 입력해주세요.",
  );
}

function renderIntro() {
  const fragment = document.createDocumentFragment();

  pageContent.intro.paragraphs.forEach((paragraphText) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = withFallback(
      paragraphText,
      "소개 문장을 입력해주세요.",
    );
    fragment.append(paragraph);
  });

  const linkParagraph = document.createElement("p");
  linkParagraph.append(
    document.createTextNode(
      withFallback(pageContent.intro.linksPrefix, "더 자세한 기록은 "),
    ),
  );

  pageContent.intro.links.forEach((linkData, index) => {
    const link = document.createElement("a");
    link.href = linkData.href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = withFallback(linkData.label, "링크");
    linkParagraph.append(link);

    if (index < pageContent.intro.links.length - 1) {
      linkParagraph.append(document.createTextNode(", "));
    }
  });

  linkParagraph.append(
    document.createTextNode(
      withFallback(pageContent.intro.linksSuffix, "에서 확인할 수 있습니다."),
    ),
  );
  fragment.append(linkParagraph);

  elements.introContent.replaceChildren(fragment);
}

function renderInfoTable() {
  const fragment = document.createDocumentFragment();

  pageContent.infoTable.forEach((item) => {
    const row = document.createElement("tr");
    const header = document.createElement("th");
    const value = document.createElement("td");

    header.scope = "row";
    header.textContent = withFallback(item.label, "항목");
    value.textContent = withFallback(item.value, "내용을 입력해주세요.");

    row.append(header, value);
    fragment.append(row);
  });

  elements.infoTableBody.replaceChildren(fragment);
}

function renderGallery() {
  const fragment = document.createDocumentFragment();

  elements.gallerySubtitle.textContent = withFallback(
    pageContent.gallery.subtitle,
    "갤러리 설명을 입력해주세요.",
  );

  pageContent.gallery.items.forEach((item) => {
    const figure = document.createElement("figure");
    const image = createImage(item.image);
    const caption = document.createElement("figcaption");

    figure.className = "gallery-item";
    caption.textContent = withFallback(item.caption, "갤러리 항목");

    figure.append(image, caption);
    fragment.append(figure);
  });

  elements.galleryGrid.replaceChildren(fragment);
}

function renderWorks() {
  const fragment = document.createDocumentFragment();

  pageContent.works.forEach((work) => {
    const listItem = document.createElement("li");
    const article = document.createElement("article");
    const thumbnailWrapper = document.createElement("div");
    const body = document.createElement("div");
    const info = document.createElement("div");
    const category = document.createElement("p");
    const title = document.createElement("h3");
    const summary = createWorkSummary(work);

    article.className = "work-card";
    thumbnailWrapper.className = "work-thumbnail";
    body.className = "work-body";
    info.className = "work-info";
    category.className = "work-category";

    thumbnailWrapper.append(createImage(work.image));
    category.textContent = withFallback(work.category, "작품 분류");
    title.textContent = withFallback(work.title, "작품 제목을 입력해주세요.");

    info.append(category, title, summary);
    body.append(info);

    if (work.video) {
      body.append(createVideoEmbed(work.video));
    }

    article.append(thumbnailWrapper, body);
    listItem.append(article);
    fragment.append(listItem);
  });

  elements.worksList.replaceChildren(fragment);
}

function createWorkSummary(work) {
  const summaryWrapper = document.createElement("div");
  const summaryParagraphs = Array.isArray(work.summaryParagraphs)
    ? work.summaryParagraphs
    : [work.summary];

  summaryWrapper.className = "work-summary";

  summaryParagraphs.forEach((paragraphText) => {
    const paragraph = document.createElement("p");

    paragraph.textContent = withFallback(
      paragraphText,
      "작품에 대한 설명을 입력해주세요.",
    );
    summaryWrapper.append(paragraph);
  });

  return summaryWrapper;
}

function renderTilEntries(entries) {
  if (entries.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "til-empty";
    emptyState.textContent =
      "아직 기록된 TIL이 없습니다. 오늘 배운 내용을 첫 번째 항목으로 남겨보세요.";
    elements.tilList.replaceChildren(emptyState);
    return;
  }

  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const article = document.createElement("article");
    const time = document.createElement("time");
    const title = document.createElement("h3");
    const content = document.createElement("p");

    article.className = "til-item";
    time.dateTime = entry.date;
    time.textContent = withFallback(entry.date, "날짜 미정");
    title.textContent = withFallback(entry.title, "제목을 입력해주세요.");
    content.textContent = withFallback(
      entry.content,
      "배운 내용을 입력해주세요.",
    );

    article.append(time, title, content);
    fragment.append(article);
  });

  elements.tilList.replaceChildren(fragment);
}

function handleTilSubmit(event) {
  event.preventDefault();

  const newEntry = {
    id: `til-${Date.now()}`,
    date: elements.tilDate.value.trim(),
    title: elements.tilTitle.value.trim(),
    content: elements.tilContent.value.trim(),
  };

  tilEntries = [newEntry, ...tilEntries];
  saveTilEntries(tilEntries);
  renderTilEntries(tilEntries);
  elements.tilForm.reset();
  applyTodayDate();
  elements.tilTitle.focus();
}

function handleTilReset() {
  window.setTimeout(applyTodayDate, 0);
}

function loadTilEntries() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return cloneSeedEntries();
    }

    const parsedEntries = JSON.parse(storedValue);

    if (!Array.isArray(parsedEntries)) {
      return cloneSeedEntries();
    }

    return parsedEntries;
  } catch (error) {
    return cloneSeedEntries();
  }
}

function saveTilEntries(entries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function cloneSeedEntries() {
  return pageContent.tilSeed.map((entry) => ({ ...entry }));
}

function applyTodayDate() {
  if (!elements.tilDate.value) {
    elements.tilDate.value = new Date().toISOString().slice(0, 10);
  }
}

function createImage(imageData) {
  const image = document.createElement("img");

  image.src = imageData.src;
  image.alt = withFallback(imageData.alt, "이미지");

  if (imageData.fallbackSrc) {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";
      image.src = imageData.fallbackSrc;
    });
  }

  return image;
}

function createVideoEmbed(videoData) {
  const wrapper = document.createElement("div");
  const iframe = document.createElement("iframe");

  wrapper.className = "work-video";
  iframe.src = videoData.src;
  iframe.title = videoData.title;
  iframe.loading = "lazy";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;

  wrapper.append(iframe);

  return wrapper;
}

function withFallback(value, fallback) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return fallback;
  }

  return trimmedValue;
}
