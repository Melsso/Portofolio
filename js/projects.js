/* ============================================================
   PROJECTS DATA
   ------------------------------------------------------------

   Fields:
     id          - unique short slug (used internally)
     name        - project title
     status      - short badge text, e.g. "Deployed", "Complete"
     tagline     - one short line shown on the card
     description - longer paragraph shown in the modal
     tech        - array of tech-stack tag strings
     github      - link to the repo
     live        - optional live URL (omit if none)
     video       - optional demo video (omit or leave "" if none).
                   Supported:
                     - a YouTube link (watch, youtu.be, shorts):
                       embedded player. Upload as "Unlisted".
                     - a path to a file in this repo, e.g.
                       "videos/lad-demo.mp4": native <video> player.
                   GitHub user-attachments links do NOT work here: they
                   only resolve inside github.com.
                   Projects with a video get a "Demo" badge on the card
                   and the player appears in the modal.
     image       - optional path to a real screenshot, e.g.
                   "img/projects/hang.png". If the file is missing
                   or this is omitted, the generated diagram below
                   is used automatically instead - nothing breaks.
     diagram     - { nodes: [...], edges: [...] } describing a
                   simple architecture flow for this project.
                   Nodes sit on a 4-column x 3-row grid:
                     col: 0-3 (left to right)
                     row: 'top' | 'mid' | 'bottom'
   ============================================================ */

const PROJECTS = [
  {
    id: "lad",
    name: "LAD",
    status: "Flagship",
    tagline: "A fully local AI assistant with a tool-calling agent. No external model API.",
    description:
      "A personal, locally hosted ChatGPT/Claude-style chat app built with FastAPI, React, Postgres/pgvector, and Ollama, with no external LLM API. Chats run in a lighter chat mode or a larger agent mode. Both use an MCP-based tool-calling loop (each tool is its own stdio MCP server) with web search and cross-chat semantic memory recall over rolling conversation summaries. Agent mode adds a sandboxed shell and file uploads. The sandbox is an offline, credential-free container on an internal Docker network, running as non-root with dropped capabilities and CPU, memory and process limits, and the API only accepts requests from nginx. Replies stream over SSE. Dockerized behind nginx with a single startup script, and tested with pytest (including real Postgres via testcontainers), Vitest and MSW, with GitHub Actions CI running ruff, mypy, oxlint and tsc.",
    tech: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "pgvector", "Ollama", "MCP", "SSE", "Docker Compose", "Nginx", "GitHub Actions"],
    github: "https://github.com/Melsso/lad",
    video: "https://youtu.be/II_nyNPche0",
    diagram: {
      nodes: [
        { id: "browser", col: 0, row: "mid", label: "Browser" },
        { id: "nginx", col: 1, row: "mid", label: "Nginx", accent: "cyan" },
        { id: "api", col: 2, row: "mid", label: "FastAPI", accent: "gold" },
        { id: "tools", col: 2, row: "bottom", label: "MCP Tools", accent: "gold" },
        { id: "ollama", col: 3, row: "top", label: "Ollama (host)", accent: "gold" },
        { id: "pg", col: 3, row: "mid", label: "Postgres pgvector", accent: "cyan" },
        { id: "sandbox", col: 3, row: "bottom", label: "Sandbox" }
      ],
      edges: [
        { from: "browser", to: "nginx" },
        { from: "nginx", to: "api" },
        { from: "api", to: "pg" },
        { from: "api", to: "ollama" },
        { from: "api", to: "tools" },
        { from: "tools", to: "pg" },
        { from: "tools", to: "sandbox" }
      ]
    }
  },
  {
    id: "hang",
    name: "Hang",
    status: "Complete",
    tagline: "A real-time social/dating platform built to scale horizontally.",
    description:
      "A social dating platform where users register with email/password or Google OAuth, edit profiles with images stored in S3-compatible storage, swipe on other users, and chat after a mutual match. Real-time messaging runs on WebSockets with typing indicators, read receipts and cursor-based pagination. Redis Pub/Sub propagates events across multiple stateless FastAPI instances behind Nginx, with per-user rate limiting, Prometheus metrics and Grafana dashboards. Load tested end to end through Nginx with zero dropped messages at up to 2,000 concurrent WebSocket connections, a test that also exposed and led to a fix for a database-session leak. Built with FastAPI, PostgreSQL, React and TypeScript, Dockerized, with GitHub Actions CI running ruff, mypy and tests against real Postgres and Redis containers.",
    tech: ["Python", "FastAPI", "WebSockets", "Redis Pub/Sub", "PostgreSQL", "NGINX", "Docker", "React", "CI"],
    github: "https://github.com/Melsso/hang",
    video: "https://youtu.be/8g7I-qDYjDA",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Browser" },
        { id: "lb", col: 1, row: "mid", label: "NGINX LB", accent: "cyan" },
        { id: "api1", col: 2, row: "top", label: "API #1", accent: "gold" },
        { id: "api2", col: 2, row: "bottom", label: "API #2", accent: "gold" },
        { id: "redis", col: 3, row: "mid", label: "Redis Pub/Sub", accent: "cyan" }
      ],
      edges: [
        { from: "client", to: "lb" },
        { from: "lb", to: "api1" },
        { from: "lb", to: "api2" },
        { from: "api1", to: "redis" },
        { from: "api2", to: "redis" }
      ]
    }
  },
  {
    id: "durden",
    name: "Durden",
    status: "Deployed",
    tagline: "An object detection API, containerized and shipped to Cloud Run.",
    description:
      "An object detection API built with FastAPI and Ultralytics YOLO. Clients upload an image and get back labels, confidence scores, bounding boxes and inference time, with optional per-request model selection across multiple loaded YOLO models. Models load in a background task at startup, so the service reports readiness through `/health` and `/status` and returns 503 on `/predict` until they are ready. Ships with a dependency-free web UI (HTML/CSS/JS with canvas overlays and a confidence slider). CPU-only PyTorch Docker image, with GitHub Actions CI running ruff and pytest, publishing to GHCR and deploying to Google Cloud Run via workload identity federation.",
    tech: ["Python", "FastAPI", "YOLO", "Docker", "Google Cloud Run", "GitHub Actions", "CI/CD"],
    github: "https://github.com/Melsso/durden",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Browser" },
        { id: "api", col: 2, row: "mid", label: "FastAPI", accent: "gold" },
        { id: "detector", col: 3, row: "mid", label: "Detector Service", accent: "gold" },
        { id: "models", col: 3, row: "top", label: "YOLO Models", accent: "gold" },
        { id: "ci", col: 0, row: "bottom", label: "GH Actions" },
        { id: "ghcr", col: 1, row: "bottom", label: "GHCR" },
        { id: "run", col: 2, row: "bottom", label: "Cloud Run", accent: "cyan" }
      ],
      edges: [
        { from: "client", to: "api" },
        { from: "api", to: "detector" },
        { from: "detector", to: "models" },
        { from: "ci", to: "ghcr", dashed: true },
        { from: "ghcr", to: "run", dashed: true },
        { from: "run", to: "api", dashed: true }
      ]
    }
  },
  {
    id: "sentinel",
    name: "Sentinel",
    status: "Complete",
    tagline: "An authentication service with rotating refresh tokens and full audit logging.",
    description:
      "A self-contained authentication service built with FastAPI, Postgres, and Redis. Covers registration, email verification, login, password reset and change, and account deletion with Argon2 hashing. Access tokens are tied to sessions and die the moment a session is revoked, while atomic refresh-token rotation with reuse detection revokes the whole session if a token is replayed. Abuse protection includes Lua-backed rate limiting, per-IP account lockout, enumeration-resistant responses, and trusted-proxy handling. Adds session management, hashed-email audit logs, and background email delivery with retries. Dockerized, with CI running ruff, mypy, pytest against real Redis, pip-audit, and an end-to-end smoke test on the Compose stack.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "GitHub Actions", "ruff", "mypy", "pytest", "CI"],
    github: "https://github.com/Melsso/sentinel",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "api", col: 1, row: "mid", label: "Auth API", accent: "gold" },
        { id: "purge", col: 1, row: "top", label: "Session Purge" },
        { id: "log", col: 1, row: "bottom", label: "Audit Log" },
        { id: "pg", col: 2, row: "top", label: "Postgres", accent: "cyan" },
        { id: "redis", col: 2, row: "mid", label: "Redis", accent: "cyan" },
        { id: "email", col: 2, row: "bottom", label: "Email Tasks", accent: "gold" },
        { id: "smtp", col: 3, row: "bottom", label: "SMTP" }
      ],
      edges: [
        { from: "client", to: "api" },
        { from: "api", to: "pg" },
        { from: "api", to: "redis" },
        { from: "api", to: "email" },
        { from: "email", to: "smtp" },
        { from: "api", to: "log", dashed: true },
        { from: "purge", to: "pg", dashed: true }
      ]
    }
  },
  {
    id: "queue-task-manager",
    name: "Queue Task Manager",
    status: "Complete",
    tagline: "An async task queue with worker registration, retries, and heartbeats.",
    description:
      "An asynchronous task queue built with FastAPI and SQLAlchemy: a broker plus workers that register capabilities, long-poll for tasks, and report results. Features priorities with optional aging, named queues, capability-based routing, retries with exponential backoff, timeouts, idempotency keys, and fencing tokens so a stale worker can never overwrite a newer attempt. Heartbeats and recovery loops handle dead workers and lost assignments with at-least-once delivery. Runs on SQLite or PostgreSQL (`FOR UPDATE SKIP LOCKED`), with async and sync Python clients, a Prometheus `/metrics` endpoint, and separate client and worker credentials. Dockerized, with CI running the suite on both databases, including a multi-process claim test.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "Distributed Workers", "Async", "CI"],
    github: "https://github.com/Melsso/queue-task-manager",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "broker", col: 1, row: "mid", label: "Broker API", accent: "gold" },
        { id: "db", col: 2, row: "mid", label: "SQLite / Postgres", accent: "cyan" },
        { id: "reaper", col: 2, row: "top", label: "Reaper Loop" },
        { id: "w1", col: 0, row: "bottom", label: "Worker #1", accent: "gold" },
        { id: "w2", col: 1, row: "bottom", label: "Worker #2", accent: "gold" }
      ],
      edges: [
        { from: "client", to: "broker" },
        { from: "broker", to: "db" },
        { from: "reaper", to: "db", dashed: true },
        { from: "w1", to: "broker" },
        { from: "w2", to: "broker" }
      ]
    }
  },
  {
    id: "rate-limiter",
    name: "Rate Limiter",
    status: "Complete",
    tagline: "An async rate-limiting library with three strategies and atomic Redis ops.",
    description:
      "An asynchronous rate limiting library for FastAPI backed by Redis, supporting Fixed Window, Sliding Window, and Token Bucket algorithms. Atomic Lua scripts keep limits exact under concurrency, and it plugs in as a route decorator, dependency, or pure ASGI middleware. Supports weighted request costs, per-tier limits, IPv6-aware client identification, and custom 429 responses. Handles Redis outages with a circuit breaker and an in-memory fallback limiter, and works with Redis, Valkey, and Redis Cluster. Fully typed and tested with pytest against real Redis containers, with GitHub Actions CI running ruff, mypy, and a version matrix across Redis 5 to 8, Valkey, and a 3-master cluster.",
    tech: ["Python", "FastAPI", "Redis", "Lua", "pytest-benchmark", "CI"],
    github: "https://github.com/Melsso/rate-limiter",
    diagram: {
      nodes: [
        { id: "app", col: 0, row: "mid", label: "FastAPI App" },
        { id: "mw", col: 1, row: "top", label: "Middleware", accent: "gold" },
        { id: "dep", col: 1, row: "mid", label: "Dependency", accent: "gold" },
        { id: "deco", col: 1, row: "bottom", label: "Decorator", accent: "gold" },
        { id: "guard", col: 2, row: "mid", label: "Guard", accent: "gold" },
        { id: "algos", col: 3, row: "top", label: "Algorithms", accent: "gold" },
        { id: "redis", col: 3, row: "mid", label: "Redis + Lua", accent: "cyan" },
        { id: "fallback", col: 3, row: "bottom", label: "Memory Fallback" }
      ],
      edges: [
        { from: "app", to: "mw" },
        { from: "app", to: "dep" },
        { from: "app", to: "deco" },
        { from: "mw", to: "guard" },
        { from: "dep", to: "guard" },
        { from: "deco", to: "guard" },
        { from: "guard", to: "algos" },
        { from: "algos", to: "redis" },
        { from: "guard", to: "fallback", dashed: true }
      ]
    }
  },
  {
    id: "mini-cache",
    name: "Mini Cache",
    status: "Complete",
    tagline: "A Redis-wire-compatible cache with replication and consistent-hash sharding.",
    description:
      "A Redis-wire-compatible (RESP2) cache server built from scratch in Python/asyncio with no runtime dependencies, usable with `redis-cli` and standard Redis clients. Supports TTL expiry, `maxmemory` with LRU eviction, password auth, and client limits, plus AOF persistence with group-committed fsync, crash-safe torn-tail repair, and background log rewrite. Primary/replica replication uses per-replica queues so a slow replica never stalls the primary, with heartbeat-based failure detection and auto-reconnect. A client-side consistent-hashing router adds connection pooling, pipelining, and timeouts across shards. Deployable as a multi-shard cluster with Docker Compose and tested over real sockets in CI with pytest, ruff, and mypy.",
    tech: ["Python", "asyncio", "RESP2", "Consistent Hashing", "Docker Compose"],
    github: "https://github.com/Melsso/mini_cache",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Cluster Client" },
        { id: "ring", col: 1, row: "mid", label: "Hash Ring", accent: "gold" },
        { id: "s1", col: 2, row: "top", label: "Shard 1", accent: "cyan" },
        { id: "s2", col: 2, row: "mid", label: "Shard 2", accent: "cyan" },
        { id: "s3", col: 2, row: "bottom", label: "Shard 3", accent: "cyan" },
        { id: "replica", col: 3, row: "top", label: "Replica" },
        { id: "aof", col: 3, row: "mid", label: "AOF Log" }
      ],
      edges: [
        { from: "client", to: "ring" },
        { from: "ring", to: "s1" },
        { from: "ring", to: "s2" },
        { from: "ring", to: "s3" },
        { from: "s1", to: "replica", dashed: true },
        { from: "s1", to: "aof", dashed: true }
      ]
    }
  },
  {
    id: "search-engine",
    name: "Search Engine",
    status: "Complete",
    tagline: "A vector database built from scratch, benchmarking brute-force vs. HNSW.",
    description:
      "A vector database built from scratch in Python: exact brute-force search as a correctness baseline, a multi-layer HNSW index implementing the paper's diversity-preserving neighbor-selection heuristic, named collections with their own dimension, metric and index backend, exact-match metadata filtering, and atomic JSON snapshot persistence. Exposed through a FastAPI HTTP layer and deployable with Docker Compose. Benchmarked honestly: a first fixed-`ef_search` run looked like an 81x speedup but hid recall collapsing to 59%, so the real comparison tunes `ef_search` to hold about 95% recall, where HNSW is 1.7x faster at 1,000 vectors and 10.6x faster at 80,000, with a steep build-time cost (144s vs 0.08s). Tested with pytest (HNSW recall measured against brute force, the API through real HTTP requests), with ruff and mypy in CI.",
    tech: ["Python", "FastAPI", "HNSW", "Vector Search", "Docker", "CI"],
    github: "https://github.com/Melsso/search-engine",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "api", col: 1, row: "mid", label: "FastAPI", accent: "gold" },
        { id: "hnsw", col: 2, row: "top", label: "HNSW Index", accent: "gold" },
        { id: "brute", col: 2, row: "bottom", label: "Brute Force" },
        { id: "disk", col: 3, row: "mid", label: "Disk", accent: "cyan" }
      ],
      edges: [
        { from: "client", to: "api" },
        { from: "api", to: "hnsw" },
        { from: "api", to: "brute" },
        { from: "hnsw", to: "disk", dashed: true },
        { from: "brute", to: "disk", dashed: true }
      ]
    }
  },
];

const DIAGRAM_W = 386;
const DIAGRAM_H = 200;
const COL_X = [8, 100, 200, 300];
const ROW_Y = { top: 16, mid: 80, bottom: 144 };
const NODE_W = 78;
const NODE_H = 40;

function nodeBox(node) {
  return {
    x: COL_X[node.col],
    y: ROW_Y[node.row],
    w: NODE_W,
    h: NODE_H
  };
}

function anchorPoints(fromBox, toBox, fromNode, toNode) {
  if (toNode.col > fromNode.col) {
    return {
      from: { x: fromBox.x + fromBox.w, y: fromBox.y + fromBox.h / 2 },
      to: { x: toBox.x, y: toBox.y + toBox.h / 2 }
    };
  }
  if (toNode.col === fromNode.col && ROW_Y[toNode.row] > ROW_Y[fromNode.row]) {
    return {
      from: { x: fromBox.x + fromBox.w / 2, y: fromBox.y + fromBox.h },
      to: { x: toBox.x + toBox.w / 2, y: toBox.y }
    };
  }
  return {
    from: { x: fromBox.x + fromBox.w / 2, y: fromBox.y },
    to: { x: toBox.x + toBox.w / 2, y: toBox.y + toBox.h }
  };
}

const ACCENT_COLORS = {
  gold: "var(--proj-gold)",
  cyan: "var(--proj-cyan)",
  neutral: "var(--proj-neutral)"
};

function renderDiagramSVG(projectId, diagram) {
  const nodeMap = {};
  diagram.nodes.forEach((n) => (nodeMap[n.id] = n));

  const uid = "arrow-" + projectId;

  const edgesSVG = diagram.edges
    .map((edge) => {
      const fromNode = nodeMap[edge.from];
      const toNode = nodeMap[edge.to];
      const fromBox = nodeBox(fromNode);
      const toBox = nodeBox(toNode);
      const pts = anchorPoints(fromBox, toBox, fromNode, toNode);
      const dashed = edge.dashed ? 'stroke-dasharray="4 4"' : "";
      return `<line x1="${pts.from.x}" y1="${pts.from.y}" x2="${pts.to.x}" y2="${pts.to.y}" class="diagram-edge" ${dashed} marker-end="url(#${uid})"/>`;
    })
    .join("");

  const nodesSVG = diagram.nodes
    .map((node) => {
      const box = nodeBox(node);
      const accent = ACCENT_COLORS[node.accent] || ACCENT_COLORS.neutral;
      const cx = box.x + box.w / 2;
      const cy = box.y + box.h / 2;
      const words = node.label.split(" ");
      let lineA = node.label;
      let lineB = "";
      if (words.length > 1 && node.label.length > 10) {
        const mid = Math.ceil(words.length / 2);
        lineA = words.slice(0, mid).join(" ");
        lineB = words.slice(mid).join(" ");
      }
      const textY = lineB ? cy - 4 : cy;
      return `
        <rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="8" class="diagram-node" style="stroke:${accent}"/>
        <text x="${cx}" y="${textY}" class="diagram-label" text-anchor="middle" dominant-baseline="middle">${lineA}</text>
        ${lineB ? `<text x="${cx}" y="${cy + 12}" class="diagram-label" text-anchor="middle" dominant-baseline="middle">${lineB}</text>` : ""}
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 ${DIAGRAM_W} ${DIAGRAM_H}" xmlns="http://www.w3.org/2000/svg" class="project-diagram">
      <defs>
        <marker id="${uid}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L8,4 L0,8 z" class="diagram-arrowhead"/>
        </marker>
      </defs>
      ${edgesSVG}
      ${nodesSVG}
    </svg>
  `;
}

function videoHTML(url, projectName) {
  if (!url) return "";

  const title = `${projectName} demo video`;
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) {
    return `<iframe class="project-modal__video" src="https://www.youtube-nocookie.com/embed/${yt[1]}"
      title="${title}" loading="lazy" allowfullscreen
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>`;
  }

  return `<video class="project-modal__video" controls preload="metadata" playsinline src="${url}">
      <a href="${url}" target="_blank" rel="noopener">Watch the demo</a>
    </video>`;
}


function tagsHTML(tech, limit) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const extra = limit && tech.length > limit ? tech.length - limit : 0;
  let html = shown.map((t) => `<span class="tag">${t}</span>`).join("");
  if (extra) html += `<span class="tag tag--more">+${extra}</span>`;
  return html;
}

function visualHTML(project) {
  const diagramSVG = renderDiagramSVG(project.id, project.diagram);
  if (project.image) {
    return `
      <div class="project-card__visual">
        <img src="${project.image}" alt="${project.name} screenshot" loading="lazy"
             onerror="this.remove(); this.nextElementSibling.classList.remove('is-hidden');">
        <div class="project-diagram-wrap is-hidden">${diagramSVG}</div>
      </div>
    `;
  }
  return `
    <div class="project-card__visual">
      <div class="project-diagram-wrap">${diagramSVG}</div>
    </div>
  `;
}

function cardHTML(project) {
  const demoBadge = project.video
    ? `<span class="project-card__demo">&#9654; Demo</span>`
    : "";
  return `
    <article class="project-card" data-project-id="${project.id}" tabindex="0" role="button" aria-haspopup="dialog">
      ${visualHTML(project)}
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="project-card__status">${project.status}</span>
          ${demoBadge}
        </div>
        <h3 class="project-card__name">${project.name}</h3>
        <p class="project-card__tagline">${project.tagline}</p>
        <div class="project-card__tags">${tagsHTML(project.tech, 4)}</div>
      </div>
    </article>
  `;
}

function modalContentHTML(project) {
  const diagramSVG = renderDiagramSVG(project.id + "-modal", project.diagram);
  const imageBlock = project.image
    ? `<img src="${project.image}" alt="${project.name} screenshot" class="project-modal__image"
           onerror="this.remove(); this.nextElementSibling.classList.remove('is-hidden');">`
    : "";
  return `
    <div class="project-modal__visual">
      ${imageBlock}
      <div class="project-diagram-wrap ${project.image ? "is-hidden" : ""}">${diagramSVG}</div>
    </div>
    <div class="project-modal__body">
      <span class="project-card__status">${project.status}</span>
      <h2>${project.name}</h2>
      <p class="project-modal__lede">${project.tagline}</p>
      <p class="project-modal__desc">${project.description}</p>
      ${videoHTML(project.video, project.name)}
      <div class="project-card__tags">${tagsHTML(project.tech)}</div>
      <div class="project-modal__links">
        <a href="${project.github}" target="_blank" rel="noopener" class="project-link">View on GitHub &rarr;</a>
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener" class="project-link project-link--live">Live demo &rarr;</a>` : ""}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("projects-grid");
  const modal = document.getElementById("project-modal");
  if (!grid || !modal) return;

  const total = PROJECTS.length;
  const mobileQuery = window.matchMedia("(max-width: 767px)");
  let start = 0;

  const nav = document.createElement("div");
  nav.className = "projects-nav";
  nav.innerHTML = `
    <button type="button" class="projects-nav__btn" data-dir="-1" aria-label="Previous projects">&#8249;</button>
    <span class="projects-nav__count" aria-hidden="true"></span>
    <button type="button" class="projects-nav__btn" data-dir="1" aria-label="Next projects">&#8250;</button>
  `;
  grid.insertAdjacentElement("afterend", nav);
  const count = nav.querySelector(".projects-nav__count");

  function perView() {
    return Math.min(total, mobileQuery.matches ? 1 : 2);
  }

  function render(animate) {
    const n = perView();
    const items = [];
    for (let i = 0; i < n; i++) items.push(PROJECTS[(start + i) % total]);
    const paint = function () {
      grid.innerHTML = items.map(cardHTML).join("");
      grid.classList.remove("is-fading");
    };
    count.textContent = items.map((p) => PROJECTS.indexOf(p) + 1).join(" & ") + " / " + total;
    nav.hidden = total <= n;
    if (animate) {
      grid.classList.add("is-fading");
      setTimeout(paint, 180);
    } else {
      paint();
    }
  }

  function step(dir) {
    start = (((start + dir * perView()) % total) + total) % total;
    render(true);
  }

  nav.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-dir]");
    if (btn) step(Number(btn.dataset.dir));
  });

  let touchX = null;
  grid.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  grid.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });

  mobileQuery.addEventListener("change", function () { render(false); });
  render(false);

  const modalContent = modal.querySelector(".project-modal__content");
  let lastFocused = null;

  function openModal(projectId) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;
    modalContent.innerHTML = modalContentHTML(project);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("project-modal-open");
    lastFocused = document.activeElement;
    modal.querySelector(".project-modal__close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("project-modal-open");
    modalContent.innerHTML = "";
    if (lastFocused) lastFocused.focus();
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".project-card");
    if (card) openModal(card.dataset.projectId);
  });

  grid.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".project-card");
      if (card) {
        e.preventDefault();
        openModal(card.dataset.projectId);
      }
    }
  });

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
});