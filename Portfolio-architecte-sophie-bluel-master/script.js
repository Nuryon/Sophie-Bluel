let works = [];
let categories = [];

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

  // Clear the modal gallery
  const galleryModal = document.querySelector(".gallery-modal");
  galleryModal.innerHTML = "";

  // Populate the modal gallery with images
  worksList.forEach((work) => {
    const imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    galleryModal.appendChild(imgElement);
  });
};



const token = localStorage.getItem("token")

const logoutUser =() =>{
  localStorage.removeItem("token")
  window.location.href= "./index.html"
}
if (token){
  const authButton = document.querySelector(".auth-button");
  authButton.innerHTML = ""
  const logoutButton = document.createElement("a")
  logoutButton.innerHTML ="logout"
  logoutButton.addEventListener("click", logoutUser)
  authButton.appendChild(logoutButton)
}

