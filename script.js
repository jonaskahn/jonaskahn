/* humble terminal — one screen, auto-advancing, no dependencies */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const out = $('#out');
  const form = $('#form');
  const input = $('#cmd');
  const suggest = $('#suggest');
  const autoBtn = $('#autoBtn');
  if (!out || !form || !input) return;

  out.setAttribute('aria-live', 'polite');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- content: each command renders one page ---------- */
  const PAGES = {
    whoami: () => `
      <p class="name">jonas — software engineer</p>
      <p class="rule">─────────────</p>
      <p>builds AI systems and the plumbing around them:<br>agents, RAG pipelines, orchestration.</p>
      <p class="dim">backend roots in java, kotlin, spring. today mostly python,<br>typescript, and whatever the plumbing needs.</p>
      <p class="links"><a href="https://me.ifelse.one" target="_blank" rel="noopener">blog</a> · <a href="https://github.com/jonaskahn" target="_blank" rel="noopener">github</a></p>`,
    projects: () => `
      <ul class="list">
        <li><a href="https://github.com/jonaskahn/asktube" target="_blank" rel="noopener">asktube/</a><span>youtube summarizer and QA with RAG — runs fully local</span></li>
        <li><a href="https://github.com/jonaskahn/unofficial-livecounts-api" target="_blank" rel="noopener">livecounts/</a><span>live counts api for tiktok, youtube, twitter, twitch</span></li>
        <li><a href="https://github.com/jonaskahn/EasyKey" target="_blank" rel="noopener">easykey/</a><span>vietnamese input switcher for macOS, native swift</span></li>
        <li><span class="n">cadence/</span><span>multi-agent AI orchestration platform — private for now</span></li>
        <li><span class="n">tools/</span><span><a href="https://github.com/jonaskahn/maestro" target="_blank" rel="noopener">maestro</a>, <a href="https://github.com/ifelsedotonestd/lens" target="_blank" rel="noopener">lens</a>, <a href="https://github.com/jonaskahn/switchy" target="_blank" rel="noopener">switchy</a> — small utilities</span></li>
        <li><a href="https://github.com/jonaskahn/nomad-consul-vaul-in-production" target="_blank" rel="noopener">notes/</a><span>running nomad, consul and vault in production</span></li>
      </ul>`,
    stack: () => `
      <ul class="list">
        <li><span class="n">mostly</span><span>python · typescript/node · java/kotlin/spring</span></li>
        <li><span class="n">sometimes</span><span>vue · go · php/laravel · flutter</span></li>
        <li><span class="n">learning</span><span>swift</span></li>
        <li><span class="n">around</span><span>linux · docker · ci/cd · nomad/consul/vault</span></li>
      </ul>
      <p class="dim">focus: agents, RAG, orchestration — and the plumbing.</p>`,
    contact: () => `
      <p><a href="https://me.ifelse.one" target="_blank" rel="noopener">blog</a> — me.ifelse.one<br>
         <a href="https://github.com/jonaskahn" target="_blank" rel="noopener">github</a> — @jonaskahn</p>
      <p class="dim">no talks, no circuit. longer thoughts live on the blog.</p>`,
    help: () => `
      <p class="dim">commands:</p>
      <ul class="list">
        <li><span class="n">whoami</span><span>who this is</span></li>
        <li><span class="n">projects</span><span>things built and shipped</span></li>
        <li><span class="n">stack</span><span>languages, tools, focus</span></li>
        <li><span class="n">contact</span><span>where to find me</span></li>
        <li><span class="n">auto</span><span>resume the automatic tour</span></li>
        <li><span class="n">clear</span><span>clear the screen</span></li>
      </ul>`,
  };

  const TOUR = ['whoami', 'projects', 'stack', 'contact'];

  /* ---------- state ---------- */
  let autoOn = true;
  let tourIdx = 0;
  let timer = null;
  const HOLD = 11000;

  const setAuto = (on) => {
    autoOn = on;
    autoBtn.setAttribute('aria-pressed', String(on));
    autoBtn.textContent = on ? '● auto' : '○ auto';
  };

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const echo = (cmd) =>
    `<p class="cmd-echo"><span class="ps">guest@616:~$</span> ${esc(cmd)}</p>`;

  function render(cmd, { scroll = true } = {}) {
    const key = cmd.toLowerCase().split(/\s+/)[0];
    if (key === 'clear') { out.innerHTML = ''; return; }
    suggest.querySelectorAll('button').forEach((b) => b.classList.remove('exec'));
    const page = PAGES[key];
    if (page) out.innerHTML = echo(key) + page();
    // unknown command → small notice, then help
    else out.innerHTML = echo(cmd) + `<p class="notice">not found: ${esc(key)}</p>` + PAGES.help();
    if (scroll) out.scrollTop = 0;
  }

  function nextTick() {
    clearTimeout(timer);
    if (!autoOn) return;
    timer = setTimeout(() => {
      if (!autoOn) return;
      render(TOUR[tourIdx % TOUR.length]);
      tourIdx++;
      nextTick();
    }, HOLD);
  }

  function pauseAuto() {
    if (!autoOn) return;
    setAuto(false);
    clearTimeout(timer);
  }

  function resumeAuto() {
    setAuto(true);
    render(TOUR[tourIdx % TOUR.length]);
    tourIdx++;
    nextTick();
  }

  /* ---------- input & suggestions ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    input.value = '';
    const key = raw.toLowerCase().split(/\s+/)[0];
    if (key === 'auto') { resumeAuto(); return; }
    if (key === ':q!' || key === 'exit' || key === 'quit') {
      pauseAuto();
      out.innerHTML = echo(raw) + `<p class="dim">this is a website. there is no leaving. ( ﾟヮﾟ)</p>`;
      return;
    }
    if (key === 'tea') {
      pauseAuto();
      out.innerHTML = echo(raw) + `<p class="dim">brewing… hp +50.</p>`;
      return;
    }
    pauseAuto();
    render(raw);
  });

  suggest.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cmd]');
    if (!btn) return;
    const cmd = btn.dataset.cmd;
    if (cmd === 'auto') { resumeAuto(); return; }
    pauseAuto();
    render(cmd);
    suggest.querySelectorAll('button').forEach((b) => b.classList.toggle('exec', b === btn));
    input.focus();
  });

  autoBtn.addEventListener('click', () => (autoOn ? pauseAuto() : resumeAuto()));

  // typing anything pauses the tour — user takes over.
  // Tab completes command names from the suggestion list.
  const CMDS = ['whoami', 'projects', 'stack', 'contact', 'help', 'auto', 'clear'];
  input.addEventListener('keydown', (e) => {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') pauseAuto();
    if (e.key === 'Tab') {
      e.preventDefault();
      pauseAuto();
      const v = input.value.trim().toLowerCase();
      if (!v) { input.value = CMDS[0]; return; }
      const hit = CMDS.find((c) => c.startsWith(v));
      if (hit) input.value = hit;
    }
  });

  /* ---------- start: default command runs itself ---------- */
  render(TOUR[0]);
  tourIdx = 1;
  nextTick();
})();
