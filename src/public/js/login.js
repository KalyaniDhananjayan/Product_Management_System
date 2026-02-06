// Redirect if already logged in
const existingToken = localStorage.getItem("token");
if (existingToken) window.location.href = "/products";

document.getElementById("loginForm")
  .addEventListener("submit", async (e) => {

  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json().catch(() => ({}));

  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "/products";
  } else {
    alert(data.message || "Login failed");
  }
});
