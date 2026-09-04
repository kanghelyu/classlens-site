(function () {
  "use strict";

  const release = window.ClassLensRelease;

  if (!release) {
    return;
  }

  document.querySelectorAll("[data-release-field]").forEach((element) => {
    const field = element.dataset.releaseField;

    if (typeof release[field] === "string") {
      element.textContent = release[field];
    }
  });

  const downloadLink = document.querySelector("[data-release-download]");
  const notesLink = document.querySelector("[data-release-notes]");

  if (downloadLink) {
    if (release.apkUrl) {
      downloadLink.href = release.apkUrl;
      downloadLink.textContent = "Download APK";
      downloadLink.setAttribute("download", "");
    } else {
      downloadLink.removeAttribute("href");
      downloadLink.classList.add("is-disabled");
      downloadLink.setAttribute("aria-disabled", "true");
    }
  }

  if (notesLink) {
    if (release.releaseNotesUrl) {
      notesLink.href = release.releaseNotesUrl;
      notesLink.textContent = "Read release notes";
    } else {
      notesLink.removeAttribute("href");
      notesLink.classList.add("is-disabled");
      notesLink.setAttribute("aria-disabled", "true");
    }
  }
})();
