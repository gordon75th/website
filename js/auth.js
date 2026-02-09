(() => {
  const PASSWORD = "change-me";
  const STORAGE_KEY = "site_auth_ok_v1";
  const BODY_LOCK_CLASS = "auth-locked";

  const isAuthed = () => localStorage.getItem(STORAGE_KEY) === "true";
  const setAuthed = () => localStorage.setItem(STORAGE_KEY, "true");

  const removeOverlay = () => {
    const overlay = document.getElementById("auth-overlay");
    if (overlay) overlay.remove();
    document.body.classList.remove(BODY_LOCK_CLASS);
  };

  const showOverlay = () => {
    if (document.getElementById("auth-overlay")) return;

    document.body.classList.add(BODY_LOCK_CLASS);

    const overlay = document.createElement("div");
    overlay.id = "auth-overlay";
    overlay.innerHTML = `
      <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <h1 id="auth-title">Private Site</h1>
        <p>Enter the password to continue.</p>
        <div class="auth-input-row">
          <input id="auth-input" type="password" placeholder="Password" autocomplete="current-password" />
          <button id="auth-submit" type="button">Unlock</button>
        </div>
        <p class="auth-error" id="auth-error" aria-live="polite"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector("#auth-input");
    const submit = overlay.querySelector("#auth-submit");
    const error = overlay.querySelector("#auth-error");

    const tryAuth = () => {
      if (input.value === PASSWORD) {
        setAuthed();
        removeOverlay();
      } else {
        error.textContent = "Incorrect password.";
        input.value = "";
        input.focus();
      }
    };

    submit.addEventListener("click", tryAuth);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryAuth();
    });

    input.focus();
  };

  const url = new URL(window.location.href);
  if (url.searchParams.has("logout")) {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!isAuthed()) showOverlay();
})();
