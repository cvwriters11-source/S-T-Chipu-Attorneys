(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  var areas = [
    ["medical", "negligen", "malpract", "hospital", "services.html#medical-negligence"],
    ["raf", "road", "accident", "fund", "services.html#raf"],
    ["family", "divorce", "maintenance", "marriage", "services.html#family-divorce"],
    ["property", "estate", "convey", "eviction", "bond", "services.html#real-estate"],
    ["criminal", "bail", "charge", "services.html#criminal"],
    ["admin", "review", "tender", "municip", "services.html#administrative"],
    ["arrest", "detention", "police", "services.html#unlawful-arrest"],
    ["labour", "labor", "dismissal", "ccma", "employment", "services.html#labour"],
    ["litigation", "dispute", "summons", "debt", "services.html#litigation"],
    ["contact", "phone", "address", "contact.html"],
    ["about", "about.html"]
  ];

  var search = document.querySelector(".search");
  if (search) {
    search.addEventListener("submit", function (event) {
      event.preventDefault();
      var q = (new FormData(search).get("q") || "").toString().toLowerCase().trim();
      if (!q) return;
      var i, j, hit = "services.html";
      for (i = 0; i < areas.length; i++) {
        for (j = 0; j < areas[i].length - 1; j++) {
          if (q.indexOf(areas[i][j]) !== -1) {
            hit = areas[i][areas[i].length - 1];
            i = areas.length;
            break;
          }
        }
      }
      window.location.href = hit;
    });
  }

  var select = document.querySelector("#matter");
  if (select) {
    var requested = new URLSearchParams(window.location.search).get("matter");
    if (requested) {
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value === requested) select.value = requested;
      });
    }
  }

  var form = document.querySelector("#enquiry");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var trap = form.querySelector("[name='company_website']");
      if (trap && trap.value) return;
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var matter = data.get("matter");
      var body = [
        "Consultation enquiry from the S T Chipu Attorneys website",
        "",
        "Name: " + data.get("name"),
        "Phone: " + data.get("phone"),
        "Email: " + data.get("email"),
        "Matter: " + matter,
        "",
        "Message:",
        data.get("message")
      ].join("\n");
      var status = document.querySelector("#form-status");
      if (status) {
        status.hidden = false;
        status.textContent = "Your email application should open with this enquiry. If it does not, call 015 291 2125 or write to info@chipuattorneys.co.za. This message does not appoint the firm.";
      }
      window.location.href = "mailto:info@chipuattorneys.co.za?subject=" +
        encodeURIComponent("Consultation enquiry — " + matter) +
        "&body=" + encodeURIComponent(body);
    });
  }

  var top = document.querySelector(".to-top");
  if (top) {
    var onScroll = function () {
      top.hidden = window.scrollY < 400;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
