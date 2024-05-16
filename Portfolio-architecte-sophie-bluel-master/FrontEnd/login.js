// Assurez-vous que cette ligne est nécessaire, sinon supprimez-la
// const { response } = require("../Backend/app");

const formButton = document.querySelector(".form-button");
const token = localStorage.getItem("token")

if (token) {
    window.location.href= "./index.html"
}
const loginUser = async (e) => {
  e.preventDefault();
  
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  
  if (!emailInput.value || !passwordInput.value) {
    alert("Veuillez renseigner votre Email et votre mot de passe");
    return;
  }
  
  const body = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const data = await response.json();
      localStorage.setItem("token",data.token)
      window.location.href= "./index.html" 
    } else {
      
      
      alert("Vos identifiants sont incorrects");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};

formButton.addEventListener("click", loginUser);


