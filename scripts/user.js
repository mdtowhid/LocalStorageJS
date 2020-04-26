const u = JSON.parse(localStorage.getItem("UserInformations"));
if (u !== null && typeof u !== "undefined") {
  const t = `
    <div id="userWrapper">
      <p style="display: none">${u[0]}</p>
      <h2>User Name: ${u[2]}</h2>
      <p><b>Email: ${u[1]}</b></p>
    </div>
  `;

  document.getElementById("userInformations").innerHTML = t;
}
