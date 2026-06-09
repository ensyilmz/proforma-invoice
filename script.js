/* =========================================
   PREMIUM PROFORMA ENGINE - FINAL
========================================= */

const STORAGE_KEY = "premium_proforma_data";

/* =========================================
   ELEMENTS
========================================= */

const logoInput = document.getElementById("logoInput");

const invoiceNo = document.getElementById("invoiceNo");
const invoiceDate = document.getElementById("invoiceDate");
const validUntil = document.getElementById("validUntil");
const currency = document.getElementById("currency");

const sellerInfo = document.getElementById("sellerInfo");
const buyerInfo = document.getElementById("buyerInfo");

const vatEnabled = document.getElementById("vatEnabled");
const vatRate = document.getElementById("vatRate");

const depositEnabled = document.getElementById("depositEnabled");
const depositAmount = document.getElementById("depositAmount");

const discountType = document.getElementById("discountType");
const discountValue = document.getElementById("discountValue");

const invoiceNote = document.getElementById("invoiceNote");
const generalInfo = document.getElementById("generalInfo");
const website = document.getElementById("website");
const preparedBy = document.getElementById("preparedBy");
const showBankInfo = document.getElementById("showBankInfo");

const bankName = document.getElementById("bankName");
const bankHolder = document.getElementById("bankHolder");
const bankBranch = document.getElementById("bankBranch");
const bankSwift = document.getElementById("bankSwift");
const bankAccountNo = document.getElementById("bankAccountNo");
const bankIban1 = document.getElementById("bankIban1");
const bankIban2 = document.getElementById("bankIban2");
const bankIban3 = document.getElementById("bankIban3");


const addProductBtn = document.getElementById("addProductBtn");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const productFormList = document.getElementById("productFormList");
const expenseFormList = document.getElementById("expenseFormList");

const invoicePreview = document.getElementById("invoicePreview");

const productTemplate = document.getElementById("productFormTemplate");
const expenseTemplate = document.getElementById("expenseFormTemplate");

const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const downloadPdfBtnTop = document.getElementById("downloadPdfBtnTop");
const clearStorageBtn = document.getElementById("clearStorageBtn");

/* =========================================
   DATA
========================================= */

let products = [];
let expenses = [];
let logoData = "";

/* =========================================
   INIT
========================================= */

window.addEventListener("DOMContentLoaded", () => {

  loadStorage();

  bindInputs();

  renderProducts();
  renderExpenses();

  updatePreview();

});

/* =========================================
   INPUTS
========================================= */

function bindInputs(){

  [
    invoiceNo,
    invoiceDate,
    validUntil,
    currency,
    sellerInfo,
    buyerInfo,
    vatEnabled,
    vatRate,
    depositEnabled,
    depositAmount,
    invoiceNote,
    generalInfo,
    website,
    preparedBy,
    showBankInfo,
    bankName,
    bankHolder,
    bankBranch,
    bankSwift,
    bankAccountNo,
    bankIban1,
    bankIban2,
    bankIban3,
    discountType,
discountValue
  ].forEach(input => {

    input.addEventListener("input", () => {

      updatePreview();
      saveStorage();

    });

  });

}
  showBankInfo.addEventListener("change", () => {
    updatePreview();
    saveStorage();
  });

/* =========================================
   LOGO
========================================= */

logoInput.addEventListener("change", e => {

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(event){

    logoData = event.target.result;

    updatePreview();
    saveStorage();

  };

  reader.readAsDataURL(file);

});

/* =========================================
   PRODUCT ADD
========================================= */

addProductBtn.addEventListener("click", () => {

products.push({
    image:"",
    name:"",
    desc:"",
    brand:"",
    origin:"",
    qty:1,
    price:0
});

  renderProducts();
  updatePreview();
  saveStorage();

});

/* =========================================
   EXPENSE ADD
========================================= */

addExpenseBtn.addEventListener("click", () => {

  expenses.push({
    name:"",
    amount:0
  });

  renderExpenses();
  updatePreview();
  saveStorage();

});

/* =========================================
   PRODUCT FORMS
========================================= */

function renderProducts(){

  productFormList.innerHTML = "";

  products.forEach((product,index) => {

    const clone = productTemplate.content.cloneNode(true);

   const imageInput = clone.querySelector(".product-image-input");
const nameInput = clone.querySelector(".product-name-input");
const descInput = clone.querySelector(".product-desc-input");

const brandInput = clone.querySelector(".product-brand-input");
const originInput = clone.querySelector(".product-origin-input");

const qtyInput = clone.querySelector(".product-qty-input");
const priceInput = clone.querySelector(".product-price-input");

    const removeBtn = clone.querySelector(".remove-product-btn");

    nameInput.value = product.name;
    descInput.value = product.desc;
    brandInput.value = product.brand || "";
originInput.value = product.origin || "";
    qtyInput.value = product.qty;
    priceInput.value = product.price;

    imageInput.addEventListener("change", e => {

      const file = e.target.files[0];

      if(!file) return;

      const reader = new FileReader();

      reader.onload = function(event){

        products[index].image = event.target.result;

        updatePreview();
        saveStorage();

      };

      reader.readAsDataURL(file);

    });

    nameInput.addEventListener("input", e => {
      products[index].name = e.target.value;
      updatePreview();
      saveStorage();
    });

    descInput.addEventListener("input", e => {
      products[index].desc = e.target.value;
      updatePreview();
      saveStorage();
    });

    brandInput.addEventListener("input", e => {
    products[index].brand = e.target.value;
    updatePreview();
    saveStorage();
});

originInput.addEventListener("input", e => {
    products[index].origin = e.target.value;
    updatePreview();
    saveStorage();
});

    qtyInput.addEventListener("input", e => {
      products[index].qty = Number(e.target.value);
      updatePreview();
      saveStorage();
    });

    priceInput.addEventListener("input", e => {
      products[index].price = Number(e.target.value);
      updatePreview();
      saveStorage();
    });

    removeBtn.addEventListener("click", () => {

      products.splice(index,1);

      renderProducts();
      updatePreview();
      saveStorage();

    });

    productFormList.appendChild(clone);

  });

}

/* =========================================
   EXPENSE FORMS
========================================= */

function renderExpenses(){

  expenseFormList.innerHTML = "";

  expenses.forEach((expense,index) => {

    const clone = expenseTemplate.content.cloneNode(true);

    const nameInput = clone.querySelector(".expense-name-input");
    const amountInput = clone.querySelector(".expense-price-input");
    const removeBtn = clone.querySelector(".remove-expense-btn");

    nameInput.value = expense.name;
    amountInput.value = expense.amount;

    nameInput.addEventListener("input", e => {
      expenses[index].name = e.target.value;
      updatePreview();
      saveStorage();
    });

    amountInput.addEventListener("input", e => {
      expenses[index].amount = Number(e.target.value);
      updatePreview();
      saveStorage();
    });

    removeBtn.addEventListener("click", () => {

      expenses.splice(index,1);

      renderExpenses();
      updatePreview();
      saveStorage();

    });

    expenseFormList.appendChild(clone);

  });

}

/* =========================================
   PREVIEW
========================================= */

function updatePreview(){
  buildPages();
}

/* =========================================
   BUILD PAGES
========================================= */

function buildPages(){

  invoicePreview.innerHTML = "";

  let subtotal = 0;

  products.forEach(product => {
    subtotal += (product.qty || 0) * (product.price || 0);
  });

  let expenseTotal = 0;

  expenses.forEach(expense => {
    expenseTotal += Number(expense.amount || 0);
  });

  let vatTotal = 0;

let discountAmount = 0;

if (discountType.value === "percent") {

  discountAmount =
    (subtotal + expenseTotal + vatTotal) *
    (Number(discountValue.value || 0) / 100);

}

if (discountType.value === "fixed") {

  discountAmount =
    Number(discountValue.value || 0);

}
const discountedSubtotal =
  subtotal +
  expenseTotal -
  discountAmount;

if (vatEnabled.checked) {

  vatTotal =
    discountedSubtotal *
    (Number(vatRate.value) / 100);

}

const deposit = depositEnabled.checked
  ? Number(depositAmount.value || 0)
  : 0;

const grandTotal =
  discountedSubtotal +
  vatTotal -
  deposit;

  const FIRST_PAGE_LIMIT = 9;
  const OTHER_PAGE_LIMIT = 8;

  let pages = [];

  pages.push({
    products: products.slice(0,FIRST_PAGE_LIMIT),
    isFirst:true,
    isLast:false
  });

  const remainingProducts = products.slice(FIRST_PAGE_LIMIT);

  for(let i = 0; i < remainingProducts.length; i += OTHER_PAGE_LIMIT){

    pages.push({
      products: remainingProducts.slice(i,i + OTHER_PAGE_LIMIT),
      isFirst:false,
      isLast:false
    });

  }

  pages[pages.length - 1].isLast = true;

  pages.forEach((pageData,index) => {

    if(pageData.products.length === 0 && !pageData.isFirst){
  return;
}

    const page = document.createElement("article");

    page.className = "invoice-page";

    if(pageData.isFirst){

      page.innerHTML += `

      <header class="invoice-header">

        <div class="brand-area">

          <div class="logo-placeholder">
            ${logoData ? `<img src="${logoData}" alt="">` : `LOGO`}
          </div>

          <div>
            <h2>PROFORMA<br>FATURA</h2>
            <p>Teklif / Ön Bilgilendirme Belgesi</p>
          </div>

        </div>

        <div class="invoice-meta">

          <div>
            <span>Proforma No</span>
            <strong>${invoiceNo.value || "PRF-2026-001"}</strong>
          </div>

          <div>
            <span>Tarih</span>
            <strong>${invoiceDate.value || "-"}</strong>
          </div>

          <div>
            <span>Geçerlilik Tarihi</span>
            <strong>${validUntil.value || "-"}</strong>
          </div>

        </div>

      </header>

      <section class="party-grid">

        <div class="party-card">
          <h3>Satıcı Bilgileri</h3>
          <p>${sellerInfo.value || "Satıcı bilgileri."}</p>
        </div>

        <div class="party-card">
          <h3>Alıcı Bilgileri</h3>
          <p>${buyerInfo.value || "Alıcı bilgileri."}</p>
        </div>

      </section>

      `;

    }

    page.innerHTML += `

    <section class="product-table-wrap">

      <div class="product-table-head">
    <span>Ürün Görseli ve Bilgisi</span>
    <span>Marka</span>
    <span>Menşei</span>
    <span>Miktar</span>
    <span>Birim Fiyat</span>
    <span>Toplam</span>
</div>

      <div class="product-table-body page-products"></div>

    </section>

    `;

    if(pageData.isLast){

      page.innerHTML += `

      <section class="note-total-grid">

        <div class="note-box">
          <h3>Teklif Notları</h3>
          <p>${invoiceNote.value || "Not alanı."}</p>
        </div>

        <div class="total-box">

          <div class="total-row">
            <span>Ara Toplam</span>
            <strong>${formatMoney(subtotal)}</strong>
          </div>

          ${expenses.map(expense => `
            <div class="total-row">
              <span>${expense.name}</span>
              <strong>${formatMoney(expense.amount)}</strong>
            </div>
          `).join("")}

          ${discountAmount > 0 ? `
  <div class="total-row">
    <span>
      ${
        discountType.value === "percent"
        ? `İskonto (%${discountValue.value})`
        : `İskonto`
      }
    </span>
    <strong>
      - ${formatMoney(discountAmount)}
    </strong>
  </div>
` : ``}

          ${vatEnabled.checked ? `
            <div class="total-row">
<span>KDV (%${vatRate.value})</span>
              <strong>${formatMoney(vatTotal)}</strong>
            </div>
          ` : ``}

          ${depositEnabled.checked ? `
            <div class="total-row">
              <span>Kaparo Alındı</span>
              <strong>- ${formatMoney(deposit)}</strong>
            </div>
          ` : ``}

          <div class="total-row grand-total">
            <span>Genel Toplam</span>
            <strong>${formatMoney(grandTotal)}</strong>
          </div>

        </div>

      </section>

      <section class="info-bank-grid">

        <div class="info-box">
          <h3>Genel Bilgilendirme</h3>
          <div class="general-info-list">
${
  (generalInfo.value || "")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => `
      <div class="general-info-item">
        ${line}
      </div>
    `)
    .join("")
}
</div>
        </div>

        ${showBankInfo.checked ? `
        <div class="info-box bank-preview-box">

          <h3>Banka Bilgileri</h3>

          <div class="bank-grid">

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon"></div>
                <strong>Banka</strong>
              </div>
              <p>${bankName.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon"></div>
                <strong>Hesap Adı</strong>
              </div>
              <p>${bankHolder.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon"></div>
                <strong>Şube</strong>
              </div>
              <p>${bankBranch.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon"></div>
                <strong>Swift</strong>
              </div>
              <p>${bankSwift.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon">₺</div>
                <strong>IBAN ₺</strong>
              </div>
              <p>${bankIban1.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon">$</div>
                <strong>IBAN $</strong>
              </div>
              <p>${bankIban2.value || "-"}</p>
            </div>

            <div class="bank-card">
              <div class="bank-card-top">
                <div class="bank-preview-icon">€</div>
                <strong>IBAN €</strong>
              </div>
              <p>${bankIban3.value || "-"}</p>
            </div>

          </div>

        </div>
        ` : ""}

      </section>

      `;

    }

    page.innerHTML += `

    <div class="signature-box">

  <div class="signature-title">
    Teklif Hazırlayan
  </div>

  <div class="signature-name">
    ${preparedBy.value || "-"}
  </div>

  <div class="signature-line"></div>

  <div class="signature-label">
    İmza
  </div>

</div>

    <footer class="invoice-footer">
<span>
Bu belge elektronik ortamda hazırlanmıştır.
</span>

<span class="footer-site">
${website.value || ""}
</span>
      <span>Proforma Teklif Belgesidir</span>
    </footer>

    `;

    invoicePreview.appendChild(page);

    const container = page.querySelector(".page-products");

    pageData.products.forEach(product => {
      container.appendChild(createProductRow(product));
    });

  });

}

/* =========================================
   PRODUCT ROW
========================================= */

function createProductRow(product){

  const row = document.createElement("div");

  row.className = "product-row";

  const total =
  (product.qty || 0) *
  (product.price || 0);

  row.innerHTML = `

  <div class="product-info">

    <div class="product-image">
      ${product.image ? `<img src="${product.image}" alt="">` : ``}
    </div>

    <div class="product-text">
<h4>${product.name || "Ürün Adı"}</h4>

<p>${product.desc || "Ürün açıklaması."}</p>
    </div>

  </div>
<div class="product-cell">
    ${product.brand || "-"}
</div>

<div class="product-cell">
    ${product.origin || "-"}
</div>
  <div class="product-cell">
    ${product.qty || 0}
  </div>

  <div class="product-cell">
    ${formatMoney(product.price || 0)}
  </div>

  <div class="product-cell">
    ${formatMoney(total)}
  </div>

  `;

  return row;

}

function formatMoney(value){

  return `${currency.value}${Number(value).toLocaleString("tr-TR",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  })}`;

}

function saveStorage(){

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    logoData,
    invoiceNo:invoiceNo.value,
    invoiceDate:invoiceDate.value,
    validUntil:validUntil.value,
    currency:currency.value,
    sellerInfo:sellerInfo.value,
    buyerInfo:buyerInfo.value,
    vatEnabled:vatEnabled.checked,
    vatRate:vatRate.value,
    depositEnabled:depositEnabled.checked,
    depositAmount:depositAmount.value,
    invoiceNote:invoiceNote.value,
    generalInfo:generalInfo.value,
    website:website.value,
    preparedBy:preparedBy.value,
showBankInfo:showBankInfo.checked,
    bankName:bankName.value,
    bankHolder:bankHolder.value,
    bankBranch:bankBranch.value,
    bankSwift:bankSwift.value,
    bankAccountNo:bankAccountNo.value,
    bankIban1:bankIban1.value,
    bankIban2:bankIban2.value,
    bankIban3:bankIban3.value,
    products,
    expenses
  }));

}

function loadStorage(){

  const saved = localStorage.getItem(STORAGE_KEY);

  if(!saved) return;

  const data = JSON.parse(saved);

  logoData = data.logoData || "";

  invoiceNo.value = data.invoiceNo || "";
  invoiceDate.value = data.invoiceDate || "";
  validUntil.value = data.validUntil || "";
  currency.value = data.currency || "₺";

  sellerInfo.value = data.sellerInfo || "";
  buyerInfo.value = data.buyerInfo || "";

  vatEnabled.checked = data.vatEnabled || false;
  vatRate.value = data.vatRate || "20";

  depositEnabled.checked = data.depositEnabled || false;
  depositAmount.value = data.depositAmount || "";



  invoiceNote.value = data.invoiceNote || "";
  generalInfo.value = data.generalInfo || "";

  website.value = data.website || "";
preparedBy.value = data.preparedBy || "";
showBankInfo.checked = data.showBankInfo !== false;

  bankName.value = data.bankName || "";
  bankHolder.value = data.bankHolder || "";
  bankBranch.value = data.bankBranch || "";
  bankSwift.value = data.bankSwift || "";
  bankAccountNo.value = data.bankAccountNo || "";
  bankIban1.value = data.bankIban1 || "";
  bankIban2.value = data.bankIban2 || "";
  bankIban3.value = data.bankIban3 || "";

  products = data.products || [];
  expenses = data.expenses || [];

}

clearStorageBtn.addEventListener("click", () => {

  const confirmClear = confirm("Tüm veriler silinsin mi?");

  if(!confirmClear) return;

  localStorage.removeItem(STORAGE_KEY);

  location.reload();

});

downloadPdfBtn.addEventListener("click", downloadPDF);
downloadPdfBtnTop.addEventListener("click", downloadPDF);

function downloadPDF(){

  const opt = {

    margin:0,

    filename:`${invoiceNo.value || "proforma"}.pdf`,

    image:{
      type:"jpeg",
      quality:1
    },

    html2canvas:{
      scale:2,
      useCORS:true
    },

    jsPDF:{
      unit:"mm",
      format:"a4",
      orientation:"portrait"
    }

  };

  html2pdf()
  .set(opt)
  .from(invoicePreview)
  .save();

}
loginBtn.addEventListener("click", async () => {

  loginBtn.classList.add("loading");
  loginBtn.innerText = "Giriş yapılıyor...";

  try {

    await signInWithEmailAndPassword(
      auth,
      authEmail.value,
      authPassword.value
    );

    authMessage.style.color = "lightgreen";
    authMessage.textContent = "Giriş başarılı ✓";

    setTimeout(() => {
      loginBtn.classList.remove("loading");
      loginBtn.innerText = "Giriş Yap";
    }, 800);

  } catch (error) {

    authMessage.style.color = "red";
    authMessage.textContent = error.message;

    loginBtn.classList.remove("loading");
    loginBtn.innerText = "Giriş Yap";

  }

});
onAuthStateChanged(auth, (user) => {

  const authScreen = document.getElementById("authScreen");
  const appContent = document.getElementById("appContent");

  if(user){

    // LOGIN KAPANIR (ANİMASYONLU)
    authScreen.classList.add("fade-out");

    setTimeout(() => {
      authScreen.style.display = "none";

      appContent.style.display = "flex";
      appContent.classList.add("fade-in");

    }, 400);

  } else {

    appContent.style.display = "none";

    authScreen.style.display = "flex";
    authScreen.classList.remove("fade-out");

  }

});