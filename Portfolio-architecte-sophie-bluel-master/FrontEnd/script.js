let works = [];
let categories = [];
const topBarContainer = document.querySelector(".top-bar-container");
const projectTitleContainer = document.querySelector(
  ".project-title-container"
);
const modalContainer = document.querySelector(".modal-container");

const getCategories = async () => {
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      categories = data;
      displayCategories();
    });
};

const getWorks = async () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      works = data;
      displayWorks(0);
    });
};

const builder = async () => {
  await getCategories();
  await getWorks();
};

builder();

const displayCategories = () => {
  categories.push({
    id: 0,
    name: "Tous",
  });
  categories.sort((a, b) => a.id - b.id);
  const filtre = document.querySelector(".filtre");
  filtre.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    if (categories[i].id === 0) {
      button.className = "btn-filtre-active button-filter";
    } else {
      button.className = "btn-filtre button-filter";
    }

    button.addEventListener("click", () => displayWorks(categories[i].id));
    button.innerHTML = categories[i].name;
    filtre.appendChild(button);
  }
};

const displayWorks = (categoryId) => {
  console.log(categoryId);
  const buttonFilter = document.getElementsByClassName("button-filter");

  // Update button classes based on selected category
  for (let i = 0; i < buttonFilter.length; i++) {
    if (i === categoryId) {
      buttonFilter[i].className = "btn-filtre-active button-filter";
    } else {
      buttonFilter[i].className = "btn-filtre button-filter";
    }
  }

  // Clear the main gallery
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  // Filter works based on category
  let worksList = [];
  if (categoryId === 0) {
    worksList = works;
  } else {
    worksList = works.filter((work) => work.categoryId === categoryId);
  }

  // Populate the main gallery with images
  worksList.forEach((work) => {
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    gallery.appendChild(imgElement);
  });
};

const token = localStorage.getItem("token");

const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
};

const generateModalFirstContent = () => {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";

  const title = document.createElement("h2");
  title.innerHTML = "Galerie photo";

  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";

  const button = document.createElement("button");
  button.innerHTML = "Ajouter une photo";
  button.addEventListener("click", generateModalSecondContent);

  modal.appendChild(title);

  const gallery = document.createElement("div");
  gallery.className = "gallery-modal";
  works.forEach((work) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.addEventListener("click", () => {
      imgContainer.remove();
      e;
    });

    imgContainer.appendChild(imgElement);
    imgContainer.appendChild(trashIcon);
    gallery.appendChild(imgContainer);
  });

  const xMark = document.createElement("i");
  xMark.className = "fa-solid fa-xmark xMark";
  xMark.addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.remove();
    }
  });
  buttonBar.appendChild(button);
  modal.appendChild(gallery);
  modal.appendChild(xMark);
  modal.appendChild(buttonBar);
};
const generateModalSecondContent = () => {
  const modal = document.querySelector(".modal");
  modal.innerHTML = "";
  const title = document.createElement("h2");
  title.innerHTML = "Ajout photo";
  const xMark = document.createElement("i");
  xMark.className = "fa-solid fa-xmark xMark";
  xMark.addEventListener("click", () => {
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.remove();
    }
  });
  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";
  const button = document.createElement("button");
  button.innerHTML = "Valider";
  buttonBar.appendChild(button);
  button.addEventListener("click", generateModalFirstContent);
  modal.appendChild(title);
  modal.appendChild(xMark);

  modal.appendChild(buttonBar);
};

const generateModal = () => {
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  const modal = document.createElement("div");

  modal.className = "modal";
  modalContent.appendChild(modal);

  modalContainer.appendChild(modalContent);
  generateModalFirstContent();
};

if (token) {
  const topBar = document.createElement("div");
  topBar.className = "top-bar";
  const iconTopBar = document.createElement("i");
  iconTopBar.className = "fa-regular fa-pen-to-square";
  const text = document.createElement("span");
  text.innerHTML = "Mode édition";
  topBar.appendChild(iconTopBar);
  topBar.appendChild(text);
  topBarContainer.appendChild(topBar);

  const authButton = document.querySelector(".auth-button");
  authButton.innerHTML = "";
  const logoutButton = document.createElement("a");
  logoutButton.innerHTML = "logout";
  logoutButton.addEventListener("click", logoutUser);
  authButton.appendChild(logoutButton);

  const editButton = document.createElement("a");
  const buttonText = document.createElement("span");
  const icon = document.createElement("i");
  icon.className = "fa-regular fa-pen-to-square icon";
  buttonText.innerHTML = "Modifier";
  editButton.appendChild(icon);
  editButton.appendChild(buttonText);
  editButton.addEventListener("click", generateModal);
  projectTitleContainer.appendChild(editButton);
}
