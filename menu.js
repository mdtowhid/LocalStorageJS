let menu = `
<header>
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/pages/auth/login.html">Log In</a>
            </li>
            <li>
                <a href="/pages/auth/signup.html">sign Up</a>
            </li>
        </ul>
    </nav>
</header>
`;

let loggedInMenu = `
<header>
    <nav>
        <ul>
            <li>
                <a href="/pages/index.html">Home</a>
            </li>
            <li>
                <a href="/pages/todoList/todo.html">Todo</a>
            </li>
            <li>
                <a href="/pages/blog/blogs.html">Blogs</a>
            </li>
            <li class="user-info-button" style="position: absolute; right: 120px">
                <a onclick="userInfoHandler()" href="javascript:void(0)">User</a>
            </li>
            <li class="logout-button">
                <a onclick="logOutHandler()" href="javascript:void(0)">Log Out</a>
            </li>
        </ul>
    </nav>
</header>
`;

let isShowUserInfo = false;

let userInfoHandler = () => {
  isShowUserInfo = !isShowUserInfo;
  let userWrapper = document.getElementById("userWrapper");
  isShowUserInfo
    ? userWrapper.classList.add("active")
    : userWrapper.classList.remove("active");
};

if (
  sessionStorage.getItem("userEmail") !== null &&
  sessionStorage.getItem("userPassword") !== null
) {
  document.getElementById("header").innerHTML = loggedInMenu;
} else {
  document.getElementById("header").innerHTML = menu;
}

let logOutHandler = () => {
  sessionStorage.clear();
  location.href = "http://127.0.0.1:5500/";
};

let activeMenuHandler = () => {
  let ulAnchorList = document.querySelectorAll("ul li a");
  for (let i = 0; i < ulAnchorList.length; i++) {
    let url = "http://127.0.0.1:5500" + ulAnchorList[i].getAttribute("href");
    if (location.href === url) {
      ulAnchorList[i].parentElement.classList.add("active");
    }
  }
};

window.addEventListener("load", activeMenuHandler());
