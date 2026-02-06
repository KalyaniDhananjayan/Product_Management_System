const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login";
}

// Logout handler
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      // Tell backend (optional) then clear token locally
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // ignore
      }
      localStorage.removeItem('token');
      window.location.href = '/login';
    });
  }
});
let editingId = null;

/* ---------- Load Products ---------- */
async function loadProducts() {
  const res = await fetch("/api/products", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) return;

  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    const li = document.createElement("li");

    const text = document.createTextNode(`${p.name} - ₹${p.price} (Qty: ${p.quantity}) `);
    li.appendChild(text);

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => editProduct(p.id, p.name, p.price, p.quantity));

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => deleteProduct(p.id));

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

/* ---------- Load Report ---------- */
async function loadReport() {
  const res = await fetch("/api/products/report", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) return;

  const report = await res.json();

  document.getElementById("totalProducts").innerText = report.totalProducts;
  document.getElementById("totalValue").innerText = report.totalInventoryValue;
}

/* ---------- Form Submit ---------- */
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (!name || Number.isNaN(price) || Number.isNaN(quantity)) {
    alert("Please enter valid product details");
    return;
  }

  const url = editingId ? `/api/products/${editingId}` : "/api/products";
  const method = editingId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, price, quantity })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.message || "Error saving product");
    return;
  }

  editingId = null;
  document.getElementById("submitBtn").innerText = "Add Product";
  document.getElementById("productForm").reset();

  await loadProducts();
  await loadReport();
});

/* ---------- Delete ---------- */
async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.message || "Error deleting product");
    return;
  }

  await loadProducts();
  await loadReport();
}

/* ---------- Edit ---------- */
function editProduct(id, name, price, quantity) {
  editingId = id;

  document.getElementById("name").value = name;
  document.getElementById("price").value = price;
  document.getElementById("quantity").value = quantity;
  document.getElementById("submitBtn").innerText = "Update Product";
}

window.editProduct = editProduct;

/* ---------- Initial Load ---------- */
loadProducts();
loadReport();
