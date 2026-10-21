
/*
  RUDVED.EV WEBSITE SETTINGS

  Replace the placeholder with your WhatsApp number.
  Use country code + number, without +, spaces or dashes.
  Example format for India: 919876543210
*/
const WHATSAPP_NUMBER = "918355958942";

document.addEventListener("DOMContentLoaded", () => {
  // Automatically update the copyright year.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation menu.
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Filter products by category.
  const filterButtons = document.querySelectorAll(".filter");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      productCards.forEach((card) => {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // Reveal sections when they enter the viewport.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Check whether the WhatsApp number has been configured.
  function hasValidWhatsAppNumber() {
    return /^\d{10,15}$/.test(WHATSAPP_NUMBER);
  }

  function openWhatsApp(message) {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "Please add your real WhatsApp number in script.js first.\n\n" +
        'Replace "918355958942" with your country code and phone number.'
      );
      return;
    }

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Set a default WhatsApp message on contact links.
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = hasValidWhatsAppNumber()
      ? "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
          "Hello RUDVED.EV, I would like to know more about your forklift sales, rentals and services."
        )
      : "#contact";

    link.addEventListener("click", (event) => {
      event.preventDefault();

      openWhatsApp(
        "Hello RUDVED.EV, I would like to know more about your forklift sales, rentals and services."
      );
    });
  });

  // Select a product in the enquiry form.
  document.querySelectorAll(".enquire-product").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product;
      const interest = document.getElementById("interest");

      const matchingOption = [...interest.options].find((option) =>
        option.text.toLowerCase().includes(productName.toLowerCase())
      );

      if (matchingOption) {
        interest.value = matchingOption.value;
      } else if (productName === "Electric Forklift") {
        interest.value = "Electric forklift";
      } else if (productName === "Diesel Forklift") {
        interest.value = "Diesel forklift";
      } else if (productName === "Warehouse Equipment") {
        interest.value = "Warehouse equipment";
      }

      document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Turn the enquiry form into a prefilled WhatsApp message.
  const enquiryForm = document.getElementById("enquiryForm");

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(enquiryForm);

    const name = formData.get("name").trim();
    const company = formData.get("company").trim();
    const phone = formData.get("phone").trim();
    const interest = formData.get("interest");
    const message = formData.get("message").trim();

    const enquiryMessage = [
      "Hello RUDVED.EV!",
      "",
      "I would like to enquire about your forklift solutions.",
      "",
      "Name: " + name,
      "Company: " + (company || "Not provided"),
      "Phone: " + phone,
      "Requirement: " + interest,
      "Additional details: " + (message || "Not provided"),
      "",
      "Please contact me regarding availability and pricing."
    ].join("\n");

    openWhatsApp(enquiryMessage);
  });
});
