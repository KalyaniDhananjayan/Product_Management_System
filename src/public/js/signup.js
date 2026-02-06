// Redirect if already logged in
const existingToken = localStorage.getItem("token");
if (existingToken) window.location.href = "/products";

const form = document.getElementById("signupForm");
const errorEl = document.getElementById("signupError");
const signupBtn = document.getElementById("signupBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.innerText = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  // Basic validations
  if (!email) {
    errorEl.innerText = "Email is required.";
    return;
  }
  if (password.length < 6) {
    errorEl.innerText = "Password must be at least 6 characters.";
    return;
  }
  if (password !== confirm) {
    errorEl.innerText = "Passwords do not match.";
    return;
  }

  signupBtn.disabled = true;

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.token) {
      // store token and redirect to products
      localStorage.setItem('token', data.token);
      window.location.href = '/products';
    } else {
      errorEl.innerText = data.message || "Signup failed";
      signupBtn.disabled = false;
    }
  } catch (err) {
    errorEl.innerText = "Network error, try again.";
    signupBtn.disabled = false;
  }
});
