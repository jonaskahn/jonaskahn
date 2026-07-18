<div align="center">

<img src="assets/header.svg" alt="JONAS" width="420"/>

**`▶ press start... i mean, only if you want to ◀`**

🌜 *Ein gebildeter Geist ist fokussierte Seele; Kaffee kann nicht mithalten, Wissen spielt die Hauptrolle*

<br/>

<img src="assets/profile.svg" alt="PLAYER PROFILE" width="720"/>

<img src="assets/skills.svg" alt="SKILL TREE" width="720"/>

<img src="assets/scores.svg" alt="HIGH SCORES" width="720"/>

<br/>

## `💾 CONTINUE?`

`[ YES ]` `[ IT'S OK IF NOT ]`

[![Website](https://img.shields.io/badge/🗺️_HUB_WORLD-jonaskahn.github.io/jonaskahn-E31B23?style=for-the-badge)](https://jonaskahn.github.io/jonaskahn/)
[![Blog](https://img.shields.io/badge/🌐_WORLD_1--1-me.ifelse.one-8B00FF?style=for-the-badge)](https://me.ifelse.one)
[![GitHub](https://img.shields.io/badge/🎮_PLAYER-jonaskahn-00C800?style=for-the-badge&logo=github)](https://github.com/jonaskahn)
[![Deploy GitHub Pages](https://github.com/jonaskahn/jonaskahn/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/jonaskahn/jonaskahn/actions/workflows/deploy-pages.yml)

![](https://komarev.com/ghpvc/?username=jonaskahn&color=green)

**`🪙 insert coin? (no pressure. tea is fine too.)`**

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/jonaskahn)

<img src="assets/footer.svg" alt="no game over, only respawn" width="720"/>

</div>

---

## `🗺️ HUB WORLD — jonaskahn.github.io/jonaskahn`

**Jonas Kahn** (`jonaskahn`) — builds **AI systems** and the plumbing around them: **agents, RAG pipelines, orchestration**, and the unglamorous infrastructure that keeps it all standing. Open source maker of [Cadence](https://github.com/jonaskahn/cadence) (multi-agent AI orchestration platform), [AskTube](https://github.com/jonaskahn/asktube) (AI-powered YouTube summarizer with RAG), [EasyKey](https://github.com/jonaskahn/EasyKey) (Vietnamese input switcher for macOS) and more.

This repo also hosts the personal site → **[jonaskahn.github.io/jonaskahn](https://jonaskahn.github.io/jonaskahn/)**

| File | Purpose |
| --- | --- |
| `index.html` | single-page portfolio, SEO-optimized (Open Graph, Twitter Card, JSON-LD, canonical) |
| `style.css` | all styles — black/white/red, Futura, scroll reveals |
| `script.js` | session uptime timer + IntersectionObserver reveals |
| `robots.txt` / `sitemap.xml` | crawler directives + sitemap |
| `.github/workflows/deploy-pages.yml` | CI — builds & deploys to GitHub Pages on every push to `main` |

**Deploy flow:** push to `main` → GitHub Actions copies site files to `dist/` → uploads Pages artifact → `actions/deploy-pages` publishes it. No `gh-pages` branch needed.
