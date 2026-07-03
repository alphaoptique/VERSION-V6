function isPdf(url) {
  if (!url) return false;

  return (
    url.includes(".pdf") ||
    url.includes("application/pdf") ||
    url.includes("attid=") || // Gmail attachments
    url.includes("view=att")
  );
}

// Interception clics classiques
document.addEventListener("click", (e) => {
  let el = e.target;

  while (el && el.tagName !== "A") {
    el = el.parentElement;
  }

  if (!el) return;

  const url = el.href || el.getAttribute("data-href");

  if (!url || !isPdf(url)) return;

  console.log("Smart PDF detected:", url);

  e.preventDefault();
  e.stopPropagation();

  window.open(url, "_blank");
}, true);

// Gmail / pages dynamiques (scan léger)
setTimeout(() => {
  const links = document.querySelectorAll("a, button");

  links.forEach(el => {
    const url = el.href || el.getAttribute("data-href");

    if (url && isPdf(url)) {
      el.style.cursor = "pointer";
    }
  });
}, 2000);
