let modal = document.getElementById("modalId");
let previewImage = document.getElementById("previewImage");
let modalContent = document.getElementById("modalContent");
let remainingCounter = document.getElementById("remainingCounter");
const moreAboutBlog = document.getElementById("moreAboutBlog");
let charCount = 1;

let blogForm = document.getElementById("blogForm");
let blogTitle = document.getElementById("blogTitle");
let blogCategory = document.getElementById("blogCategory");
let blogDescrption = document.getElementById("blogDescrption");
let addBlogButton = document.getElementById("addBlogButton");
let formError = document.getElementById("formError");
let saveButton = document.getElementById("saveButton");
let blogList = document.getElementById("blogList");
let hiddenId = document.getElementById("hiddenId");
let blogs = [];

let getCurrentDateTime = () => {
  let currentDateTime = new Date();
  return (
    currentDateTime.getDate() +
    "/" +
    currentDateTime.getMonth() +
    "/" +
    currentDateTime.getFullYear() +
    " " +
    currentDateTime.getHours() +
    ":" +
    currentDateTime.getMinutes()
  );
};

saveButton.addEventListener("click", e => {
  if (blogFormValidator() && saveButton.value === "SAVE") {
    let newBlog = createBlogObjectHandler();

    if (blogs.length === 0 && parseBlogs() === null) {
      blogs.push(newBlog);
      localStorage.setItem("blogItems", JSON.stringify(blogs));
    } else {
      let allBlogs = parseBlogs();
      allBlogs.push(newBlog);
      localStorage.setItem("blogItems", JSON.stringify(allBlogs));
    }
    functionsCaller();
  } else if (saveButton.value === "UPDATE" && blogFormValidator()) {
    updateBlogHadler(+hiddenId.innerText);
    functionsCaller();
    saveButton.value = "SAVE";
  }
});

let functionsCaller = () => {
  toggleModal();
  blogForm.reset();
  loadBlogHandler();
};

let parseBlogs = () =>
  JSON.parse(localStorage.getItem("blogItems")) !== null ||
  typeof JSON.parse(localStorage.getItem("blogItems")) === "undefined"
    ? JSON.parse(localStorage.getItem("blogItems"))
    : null;

let blogFormValidator = () => {
  let formErrorText = "";
  let errorCounter = 1;
  let hasError = false;
  if (blogCategory.value === "none") {
    formErrorText += `<b>${errorCounter++}.</b> Please select blog category.<br>`;
    hasError = true;
  }
  if (blogTitle.value.length < 5) {
    formErrorText += `<b>${errorCounter++}.</b> Blog title must greater than 5 characters. <br>`;
    hasError = true;
  }
  if (blogDescrption.value.length < 30 || blogDescrption.value.length > 200) {
    formErrorText += `<b>${errorCounter++}.</b> Blog description must greater than 30 or less than 200 characters. <br>`;
    hasError = true;
  }
  hasError ? (formError.innerHTML = formErrorText) : (formError.innerHTML = "");
  return hasError ? false : true;
};

blogForm.onsubmit = e => e.preventDefault();

blogDescrption.addEventListener("keyup", () => {
  blogDescrptionRemainingCounterHandler();
});

addBlogButton.addEventListener("click", e => toggleModal());
modal.addEventListener("click", e => toggleModal());
modalContent.addEventListener("click", e => toggleModal());

let modalIsShow = false;

let toggleModal = () => {
  modalIsShow = !modalIsShow;
  modalIsShow
    ? (modal.style.display = "block")
    : (modal.style.display = "none");
};

window.addEventListener("load", () => {
  loadBlogHandler();
});

let templBuilderHandler = blog => `
  <div class="blogs" id="${blog.id}">
    <div class="about-blog">
      <h4>Category: ${blog.category}</h4>
    </div>
    <div class="description">
      <h3> ${blog.title}</h3>
      <p> ${blog.description}</p>
    </div>
    <div class="blog-actions">
      <button onclick="populateBlogFormHandler(${blog.id})">
        Edit
      </button>
      <button onclick="deleteBlogHandler(${blog.id})">
        Delete
      </button>
      <button onclick="aboutBlogHandler(${blog.id})">
        About
      </button>
    </div>
  </div>
`;

let populateBlogFormHandler = id => {
  toggleModal();
  hiddenId.innerText = id;
  blogDescrptionRemainingCounterHandler();
  let allBlogs = parseBlogs();
  let singleBlog = allBlogs.find(x => x.id == id);

  for (let i = 0; i < blogCategory.options.length; i++) {
    if (singleBlog.category === blogCategory.options[i].value) {
      blogCategory.options[i].selected = true;
    }
  }
  blogTitle.value = singleBlog.title;
  blogDescrption.value = singleBlog.description;
  blogDescrptionRemainingCounterHandler();
  saveButton.value = "UPDATE";
};

let updateBlogHadler = id => {
  let blogObj = createBlogObjectHandler();
  let allBlogs = parseBlogs();
  let singleBlog = allBlogs.find(x => x.id === id);
  singleBlog.title = blogObj.title;
  singleBlog.category = blogObj.category;
  singleBlog.description = blogObj.description;
  singleBlog.author = blogObj.author;
  singleBlog.authorId = blogObj.authorId;
  singleBlog.time = getCurrentDateTime();
  saveButton.value = "UPDATE";
  localStorage.setItem("blogItems", JSON.stringify(allBlogs));
};

let setBlogData = allBlogs => {
  localStorage.setItem("blogItems", JSON.stringify(allBlogs));
  console.log("Updated");
};

let createBlogObjectHandler = () => {
  return {
    id: Math.ceil(Math.random() * 9999),
    category: blogCategory.value,
    title: blogTitle.value,
    description: blogDescrption.value,
    author: sessionStorage.getItem("userName"),
    authorId: sessionStorage.getItem("userId"),
    time: getCurrentDateTime()
  };
};

let blogDescrptionRemainingCounterHandler = () => {
  remainingCounter.innerText = 200;
  remainingCounter.innerText =
    +remainingCounter.innerText - blogDescrption.value.length;

  if (blogDescrption.value.length > 200) {
    blogDescrption.style.border = "1px solid red";
    remainingCounter.innerText = 0;
  } else {
    blogDescrption.style.border = "none";
  }
};

let deleteBlogHandler = id => {
  if (confirm("Want to delete?")) {
    let allBlogs = parseBlogs();
    allBlogs.splice(allBlogs.map(x => x.id).indexOf(id), 1);
    localStorage.setItem("blogItems", JSON.stringify(allBlogs));
    loadBlogHandler();
  }
};

let loadBlogHandler = () => {
  let allBlogs = parseBlogs().reverse();
  blogList.innerHTML = "";
  for (let blogIndex in allBlogs) {
    blogList.innerHTML += templBuilderHandler(allBlogs[blogIndex]);
  }
};

let aboutBlogHandler = id => {
  moreAboutBlog.innerHTML = aboutBlogTemplateHandler(getSingleBlog(id));
  moreAboutBlog.classList.add("active");
};

let aboutBlogWrapperStyles = `padding: 50px;line-height: 55px;font-size: 1.5em;`;
let aboutBlogTemplateHandler = blogDesc => `
<div style="${aboutBlogWrapperStyles}">
  <button id="aboutBlogCloserId" onclick="aboutBlogCloser()">&times;</button>
  <h2>Blog Category: ${blogDesc.category}</h2>
  <h3>Blog Title: ${blogDesc.title}</h3>
  <h5>Created By: ${blogDesc.author}</h5>
  <h5>Creation Time: ${blogDesc.time}</h5>
</div>

`;

let aboutBlogCloser = () => moreAboutBlog.classList.remove("active");

let getSingleBlog = id => {
  let allBlogs = parseBlogs();
  return allBlogs.find(x => x.id === id);
};

let blogHeader = document.getElementById("blogHeader");
let stickyTop =
  document.getElementById("header").offsetHeight +
  document.getElementsByClassName("banner")[0].offsetHeight -
  blogHeader.offsetHeight +
  "px";
console.log(stickyTop);
let blogHeaderStyles = `display: flex;
                        position: sticky;
                        top: ${stickyTop};
                        background: #1E1E1E;
                        justify-content: center`;
blogHeader.style = blogHeaderStyles;
