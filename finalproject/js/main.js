const soniaDefaultProducts = [
  { name: "Áo Thun Xanh Da Trời SONIA", type: "Quần áo", price: 210000, img: "../images/sp01.jpg" },
  { name: "Quần Jean Ống Rộng Xanh Nhạt", type: "Quần áo", price: 390000, img: "../images/sp02.jpg" },
  { name: "Áo Khoác Denim Xanh Xám", type: "Quần áo", price: 520000, img: "../images/sp03.jpg" },
  { name: "Giày Sneaker Trắng SONIA", type: "Giày dép", price: 680000, img: "../images/sp04.jpg" },
  { name: "Áo Thun Xanh Pastel SONIA", type: "Phụ kiện", price: 225000, img: "../images/sp01.jpg" }
];

if (!localStorage.getItem("sonia_dotdot_v1")) {
  localStorage.setItem("sonia_products", JSON.stringify(soniaDefaultProducts));
  localStorage.setItem("sonia_dotdot_v1", "true");
}

function renderCard(p) {
  return `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}"/>
      <div class="product-meta">
        <div class="product-cat">${p.type}</div>
        <div class="product-title">${p.name}</div>
        <div class="product-price">${Number(p.price).toLocaleString()}đ</div>
      </div>
    </div>
  `;
}

function showProducts() {
  const products = JSON.parse(localStorage.getItem("sonia_products")) || soniaDefaultProducts;
  const homeEl = document.getElementById("homeProducts");
  const allEl = document.getElementById("allProducts");
  if (homeEl) homeEl.innerHTML = products.slice(0, 4).map(renderCard).join("");
  if (allEl) allEl.innerHTML = products.map(renderCard).join("");
}
showProducts();

const productForm = document.getElementById("productForm");
if (productForm) {
  productForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("sonia_products")) || [];
    products.push({
      name: document.getElementById("pName").value,
      type: document.getElementById("pType").value,
      price: document.getElementById("pPrice").value,
      img: document.getElementById("pImg").value
    });
    localStorage.setItem("sonia_products", JSON.stringify(products));
    showProducts();
    productForm.reset();
    alert("Đã lưu sản phẩm mới vào localStorage!");
  });
}

const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const feedbacks = JSON.parse(localStorage.getItem("sonia_feedbacks")) || [];
    feedbacks.push({
      name: document.getElementById("fbName").value,
      text: document.getElementById("fbText").value
    });
    localStorage.setItem("sonia_feedbacks", JSON.stringify(feedbacks));
    document.getElementById("fbStatus").innerText = "Cảm ơn bạn đã gửi góp ý cho SONIA!";
    feedbackForm.reset();
  });
}

const regForm = document.getElementById("regForm");
if (regForm) {
  regForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("sonia_users")) || [];
    users.push({
      user: document.getElementById("regUser").value,
      pass: document.getElementById("regPass").value
    });
    localStorage.setItem("sonia_users", JSON.stringify(users));
    document.getElementById("accStatus").innerText = "Đăng ký tài khoản SONIA thành công!";
    regForm.reset();
  });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("sonia_users")) || [];
    const u = document.getElementById("loginUser").value;
    const p = document.getElementById("loginPass").value;
    const ok = users.some(x => x.user === u && x.pass === p);
    document.getElementById("accStatus").innerText = ok ? `Đăng nhập thành công! Xin chào ${u}` : "Sai tên đăng nhập hoặc mật khẩu!";
  });
}

const changePassForm = document.getElementById("changePassForm");
if (changePassForm) {
  changePassForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("sonia_users")) || [];
    const u = document.getElementById("cpUser").value;
    const oldP = document.getElementById("oldPass").value;
    const newP = document.getElementById("newPass").value;
    const idx = users.findIndex(x => x.user === u && x.pass === oldP);
    if (idx !== -1) {
      users[idx].pass = newP;
      localStorage.setItem("sonia_users", JSON.stringify(users));
      document.getElementById("accStatus").innerText = "Đổi mật khẩu thành công!";
      changePassForm.reset();
    } else {
      document.getElementById("accStatus").innerText = "Tên đăng nhập hoặc mật khẩu cũ không đúng!";
    }
  });
}