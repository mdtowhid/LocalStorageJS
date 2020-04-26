let loginButton = document.getElementById("loginButton");
let signupButton = document.getElementById("signupButton");
let email = document.getElementById("email");
let nameId = document.getElementById("nameId");
let password = document.getElementById("password");
let userInformations = [];
let successErrorLoginSignUp = document.getElementById("successError");

if (loginButton !== null) {
  loginButton.addEventListener("click", e => {
    let model = {
      email: email.value,
      password: password.value
    };
    console.log(model);
    let styles =
      "color: white;border: 1px solid #007ACC;box-shadow: 0 0 5px #1E1E1E; margin-top:10px;text-shadow: 1px 3px 10px red;";
    if (isExistUser(model)) {
      createUserSessions();
      window.location.href = "http://127.0.0.1:5500/pages/todolist/todo.html";
    } else {
      successErrorLoginSignUpHandler(
        "Given information is error.",
        styles,
        "error"
      );
      return false;
    }
    successErrorLoginSignUpHandler("Please fill the form.", styles, "error");
  });
}

let successErrorLoginSignUpHandler = (innerHtml, styles, status) => {
  successErrorLoginSignUp.classList.add("active");
  if (status === "error") {
    successErrorLoginSignUp.innerHTML = innerHtml;
    successErrorLoginSignUp.style.cssText = styles;
  } else {
    successErrorLoginSignUp.innerHTML = innerHtml;
    successErrorLoginSignUp.style.cssText = styles;
  }
  setTimeout(() => {
    successErrorLoginSignUp.classList.remove("active");
  }, 3000);
};

let isExistUser = model => {
  let user = getUserInformationHandler();
  if (model !== null) {
    if (model.email === user[1] && model.password === user[3]) {
      return true;
    }
    return false;
  }
  console.log("Model null");
};

if (signupButton !== null) {
  signupButton.addEventListener("click", e => {
    let model = createUserObject();
    let styles =
      "color: white;border: 1px solid #007ACC;box-shadow: 0 0 5px #1E1E1E; margin-top:10px;text-shadow: 1px 1px 5px red;";
    if (model !== null) {
      if (saveUserInformationHandler(model)) {
        successErrorLoginSignUpHandler(
          "Account created successfully.",
          styles,
          "error"
        );
      }
      return;
    }
    successErrorLoginSignUpHandler(
      "Please provide informations.<br> So that we can create an account for you.",
      styles,
      "error"
    );
  });
}

let createUserObject = () => {
  if (validator()) {
    return {
      id: Math.ceil(Math.random() * 9989),
      email: email.value,
      name: nameId.value,
      password: password.value
    };
  }
  return null;
};

let saveUserInformationHandler = userObject => {
  if (validator()) {
    userInformations.push(userObject.id);
    userInformations.push(userObject.email);
    userInformations.push(userObject.name);
    userInformations.push(userObject.password);
    localStorage.setItem("UserInformations", JSON.stringify(userInformations));
    return true;
  } else {
    console.log("values can't be empty");
  }
};

let validator = () =>
  nameId.value.length > 0 && email.value.length > 0 && password.value.length > 0
    ? true
    : false;

let getUserInformationHandler = () => {
  let user = JSON.parse(localStorage.getItem("UserInformations"));
  return user != null ? user : null;
};

let createUserSessions = () => {
  let user = getUserInformationHandler();
  sessionStorage.setItem("userId", user[0]);
  sessionStorage.setItem("userEmail", user[1]);
  sessionStorage.setItem("userName", user[2]);
  sessionStorage.setItem("userPassword", user[3]);
};
