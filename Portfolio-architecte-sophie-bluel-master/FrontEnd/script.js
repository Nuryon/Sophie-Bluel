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

  for (let i = 0; i < buttonFilter.length; i++) {
    if (i === categoryId) {
      buttonFilter[i].className = "btn-filtre-active button-filter";
    } else {
      buttonFilter[i].className = "btn-filtre button-filter";
    }
  }

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  let worksList = [];
  if (categoryId === 0) {
    worksList = works;
  } else {
    worksList = works.filter((work) => work.categoryId === categoryId);
  }

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
  title.className = "modal-maintitle";
  const buttonBar = document.createElement("div");
  buttonBar.className = "button-bar";

  const button = document.createElement("button");
  button.innerHTML = "Ajouter une photo";
  button.classList.add("button-modal");
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
  title.classList.add("modal-maintitle");

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
  button.classList.add("button-modal");

  const pictureDiv = document.createElement("div");
  pictureDiv.className = "picture-div";

  const iconPicture = document.createElement("i");
  iconPicture.className = "fa-regular fa-image fa-5x ";

  const buttonModalSeconContent = document.createElement("button");
  const infoElement = document.createElement("p");
  infoElement.classList.add("info-element");
  infoElement.innerHTML = "jpg, png : 4mo max";

  const secondTitle = document.createElement("h2");
  secondTitle.innerHTML = "Titre";
  secondTitle.classList.add("modal-subtitle");

  const firstInput = document.createElement("input");
  firstInput.className = "modal-input";

  const thirdTitle = document.createElement("h2");
  thirdTitle.innerHTML = "Catégorie";
  thirdTitle.classList.add("modal-second-subtitle");

  const secondInput = document.createElement("input");
  secondInput.className = "modal-second-input";

  const dropdownIcon = document.createElement("i");
  dropdownIcon.className = "fa-solid fa-chevron-down";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "input-container";

  inputWrapper.appendChild(secondInput);
  inputWrapper.appendChild(dropdownIcon);

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-content";
  const link1 = document.createElement("a");
  link1.href = "#";
  link1.textContent = "Objets";
  const link2 = document.createElement("a");
  link2.href = "#";
  link2.textContent = "Appartements";
  const link3 = document.createElement("a");
  link3.href = "#";
  link3.textContent = "Hotels & restaurants";

  dropdownMenu.appendChild(link1);
  dropdownMenu.appendChild(link2);
  dropdownMenu.appendChild(link3);

  inputWrapper.appendChild(dropdownMenu);

  dropdownIcon.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  window.addEventListener("click", (e) => {
    if (!inputWrapper.contains(e.target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  buttonModalSeconContent.classList.add("button-modal-second");
  buttonModalSeconContent.innerHTML = "+ Ajouter photo";
  pictureDiv.appendChild(iconPicture);
  pictureDiv.appendChild(buttonModalSeconContent);
  pictureDiv.appendChild(infoElement);
  buttonBar.appendChild(button);
  button.addEventListener("click", generateModalFirstContent);

  modal.appendChild(title);
  modal.appendChild(xMark);
  modal.appendChild(pictureDiv);
  modal.appendChild(buttonBar);
  modal.appendChild(secondTitle);
  modal.appendChild(firstInput);
  modal.appendChild(thirdTitle);
  modal.appendChild(inputWrapper);
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
