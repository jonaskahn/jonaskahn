/* resume terminal — section navigation, print, theme preview, no dependencies */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const out = $("#resume-out");
  const form = $("#form");
  const input = $("#cmd");
  const suggest = $("#suggest");
  const status = $("#status");
  const toggle = $("#themeToggle");
  if (!out || !form || !input || !suggest || !status || !toggle) return;

  document.documentElement.classList.add("enhanced");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SECTIONS = ["summary", "experience", "skills", "education"];
  const CMDS = [...SECTIONS, "print", "print dark", "help", "home"];
  let flashTimer = null;
  let darkPrint = false;

  function setStatus(msg = "") {
    status.textContent = msg;
  }

  function clearExec() {
    suggest
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("exec"));
  }

  function goSection(name) {
    const section = document.getElementById(name);
    if (!section) return false;
    const block = section.closest(".resume-section") || section;
    block.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    clearTimeout(flashTimer);
    out.querySelectorAll(".resume-section.target").forEach((el) => {
      el.classList.remove("target");
    });
    // restart the highlight even when the section is already targeted
    void block.offsetWidth;
    block.classList.add("target");
    flashTimer = setTimeout(() => block.classList.remove("target"), 1600);
    setStatus(`→ ${name}`);
    return true;
  }

  function goHome() {
    setStatus("→ home");
    window.location.href = "index.html";
  }

  function printSheet(dark) {
    darkPrint = Boolean(dark);
    document.body.classList.toggle("print-dark", darkPrint);
    setStatus(darkPrint ? "printing dark sheet…" : "printing light sheet…");
    const cleanup = () => {
      document.body.classList.remove("print-dark");
      darkPrint = false;
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    // let the status paint before the blocking print dialog
    setTimeout(() => window.print(), 50);
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (SECTIONS.includes(cmd)) {
      goSection(cmd);
      return;
    }
    if (cmd === "home") {
      goHome();
      return;
    }
    if (cmd === "print") {
      printSheet(false);
      return;
    }
    if (cmd === "print dark") {
      printSheet(true);
      return;
    }
    if (cmd === "help") {
      setStatus(`commands: ${CMDS.join(" · ")}`);
      return;
    }
    setStatus(`not found: ${cmd}. try help.`);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = input.value;
    input.value = "";
    run(raw);
  });

  suggest.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cmd]");
    if (!btn) return;
    clearExec();
    btn.classList.add("exec");
    run(btn.dataset.cmd);
    input.focus({ preventScroll: true });
  });

  toggle.addEventListener("click", () => {
    const on = !document.body.classList.contains("light");
    document.body.classList.toggle("light", on);
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "dark terminal" : "light paper";
    setStatus(on ? "light paper preview" : "dark terminal");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const v = input.value.trim().toLowerCase();
    if (!v) {
      input.value = CMDS[0];
      return;
    }
    const hit = CMDS.find((c) => c.startsWith(v));
    if (hit) input.value = hit;
  });

  // expose a tiny seam for verification without changing the page behavior
  window.resumeTerminal = { run, printSheet, goSection, commands: CMDS };
})();
