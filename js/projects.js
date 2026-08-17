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
     featured    - true = shown as a large tile at the top
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
    id: "hang",
    name: "Hang",
    status: "Flagship",
    tagline: "A real-time social/dating platform built to scale horizontally.",
    description:
      "A social dating platform where users create accounts, swipe on profiles, and chat in real time. Built to support horizontally scaled WebSocket servers, with Redis Pub/Sub propagating events across instances and NGINX load balancing traffic between them. My most complete project end to end.",
    tech: ["Python", "FastAPI", "WebSockets", "Redis Pub/Sub", "PostgreSQL", "NGINX", "Docker", "React", "CI"],
    github: "https://github.com/Melsso/hang",
    featured: true,
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
      "An object detection API built with FastAPI and YOLO, supporting multiple models, structured predictions, and asynchronous model loading. Containerized and deployed on Google Cloud Run, with a GitHub Actions pipeline handling testing, image publishing, and deployment automatically.",
    tech: ["Python", "FastAPI", "YOLO", "Docker", "Google Cloud Run", "GitHub Actions", "CI/CD"],
    github: "https://github.com/Melsso/durden",
    featured: true,
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "api", col: 1, row: "mid", label: "FastAPI", accent: "gold" },
        { id: "yolo", col: 2, row: "mid", label: "YOLO Model", accent: "gold" },
        { id: "run", col: 3, row: "mid", label: "Cloud Run", accent: "cyan" },
        { id: "ci", col: 3, row: "top", label: "GH Actions" }
      ],
      edges: [
        { from: "client", to: "api" },
        { from: "api", to: "yolo" },
        { from: "yolo", to: "run" },
        { from: "ci", to: "run", dashed: true }
      ]
    }
  },
  {
    id: "sentinel",
    name: "Sentinel",
    status: "Complete",
    tagline: "An authentication service with rotating refresh tokens and full audit logging.",
    description:
      "An authentication service built with FastAPI, Postgres, and Redis. Handles registration, email verification, login with rotating refresh tokens, password reset, and account deletion, with rate limiting, structured audit logging, and CORS/security headers baked in. Fully Dockerized, with a GitHub Actions CI pipeline running ruff, mypy, pytest, and pip-audit.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "GitHub Actions", "ruff", "mypy", "pytest", "CI"],
    github: "https://github.com/Melsso/sentinel",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "auth", col: 1, row: "mid", label: "Auth API", accent: "gold" },
        { id: "pg", col: 2, row: "top", label: "Postgres", accent: "cyan" },
        { id: "redis", col: 2, row: "bottom", label: "Redis", accent: "cyan" },
        { id: "log", col: 3, row: "mid", label: "Audit Log" }
      ],
      edges: [
        { from: "client", to: "auth" },
        { from: "auth", to: "pg" },
        { from: "auth", to: "redis" },
        { from: "auth", to: "log", dashed: true }
      ]
    }
  },
  {
    id: "queue-task-manager",
    name: "Queue Task Manager",
    status: "Complete",
    tagline: "An async task queue with worker registration, retries, and heartbeats.",
    description:
      "An asynchronous task queue system built with FastAPI, SQLAlchemy, and distributed workers. Workers register capabilities, receive tasks from a broker, execute jobs asynchronously, and report results, with support for task prioritization, retries, heartbeats, and full end-to-end task lifecycle management.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "Distributed Workers", "Async", "CI"],
    github: "https://github.com/Melsso/queue-task-manager",
    diagram: {
      nodes: [
        { id: "producer", col: 0, row: "mid", label: "Producer" },
        { id: "broker", col: 1, row: "mid", label: "Broker", accent: "gold" },
        { id: "worker1", col: 2, row: "top", label: "Worker #1", accent: "gold" },
        { id: "worker2", col: 2, row: "bottom", label: "Worker #2", accent: "gold" },
        { id: "db", col: 3, row: "mid", label: "Result DB", accent: "cyan" }
      ],
      edges: [
        { from: "producer", to: "broker" },
        { from: "broker", to: "worker1" },
        { from: "broker", to: "worker2" },
        { from: "worker1", to: "db" },
        { from: "worker2", to: "db" }
      ]
    }
  },
  {
    id: "rate-limiter",
    name: "Rate Limiter",
    status: "Complete",
    tagline: "An async rate-limiting library with three strategies and atomic Redis ops.",
    description:
      "An asynchronous Python rate limiting library built with FastAPI and Redis, supporting Fixed Window, Sliding Window, and Token Bucket algorithms. Uses Lua scripts for atomic Redis operations, includes FastAPI middleware and route decorators for seamless integration, exposes standard rate-limit response headers, and is fully tested with pytest, ruff, mypy, GitHub Actions CI, and pytest-benchmark.",
    tech: ["Python", "FastAPI", "Redis", "Lua", "pytest-benchmark", "CI"],
    github: "https://github.com/Melsso/rate-limiter",
    diagram: {
      nodes: [
        { id: "request", col: 0, row: "mid", label: "Request" },
        { id: "mw", col: 1, row: "mid", label: "Middleware", accent: "gold" },
        { id: "redis", col: 2, row: "mid", label: "Redis + Lua", accent: "cyan" },
        { id: "response", col: 3, row: "mid", label: "Allow / Deny" }
      ],
      edges: [
        { from: "request", to: "mw" },
        { from: "mw", to: "redis" },
        { from: "redis", to: "response" }
      ]
    }
  },
  
  {
    id: "search-engine",
    name: "Search Engine",
    status: "Complete",
    tagline: "A vector database built from scratch, benchmarking brute-force vs. HNSW.",
    description:
      "A vector database built from scratch in Python: brute-force and HNSW approximate search, named collections with metadata filtering, disk persistence, a FastAPI HTTP layer, Docker deployment, and CI - with real benchmarking work showing where HNSW actually beats brute force and what it costs to get there.",
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
  {
    id: "mini-cache",
    name: "Mini Cache",
    status: "Complete",
    tagline: "A Redis-wire-compatible cache with replication and consistent-hash sharding.",
    description:
      "A distributed, Redis-wire-compatible (RESP2) key-value cache built from scratch in Python/asyncio. Supports TTL-based expiry, AOF persistence, primary/replica replication with heartbeat-based failover detection, and client-side consistent-hashing sharding across multiple nodes. Deployable via Docker Compose as a multi-shard cluster.",
    tech: ["Python", "asyncio", "RESP2", "Consistent Hashing", "Docker Compose"],
    github: "https://github.com/Melsso/mini_cache",
    diagram: {
      nodes: [
        { id: "client", col: 0, row: "mid", label: "Client" },
        { id: "router", col: 1, row: "mid", label: "Hash Ring", accent: "gold" },
        { id: "primary", col: 2, row: "top", label: "Primary", accent: "cyan" },
        { id: "replica", col: 2, row: "bottom", label: "Replica", accent: "cyan" },
        { id: "aof", col: 3, row: "top", label: "AOF Log" }
      ],
      edges: [
        { from: "client", to: "router" },
        { from: "router", to: "primary" },
        { from: "primary", to: "replica", dashed: true },
        { from: "primary", to: "aof", dashed: true }
      ]
    }
  },
  {
    id: "transcendence",
    name: "Transcendence",
    status: "Complete",
    tagline: "A real-time multiplayer Pong platform with tournaments and live chat.",
    description:
      "A gaming platform built around Pong, where users create accounts, edit profiles, play games, host tournaments, and chat in real time. Built with Django, PostgreSQL, and a JS/HTML/Bootstrap frontend, using Redis, Daphne, and WebSockets for real-time gameplay and chat, all deployed with Docker Compose.",
    tech: ["Django", "PostgreSQL", "Daphne", "WebSocket", "Redis", "Docker Compose"],
    github: "https://github.com/Melsso/Transcendence",
    diagram: {
      nodes: [
        { id: "browser", col: 0, row: "mid", label: "Browser" },
        { id: "rest", col: 1, row: "top", label: "Django REST", accent: "gold" },
        { id: "ws", col: 1, row: "bottom", label: "Daphne WS", accent: "gold" },
        { id: "pg", col: 2, row: "top", label: "Postgres", accent: "cyan" },
        { id: "redis", col: 2, row: "bottom", label: "Redis", accent: "cyan" }
      ],
      edges: [
        { from: "browser", to: "rest" },
        { from: "browser", to: "ws" },
        { from: "rest", to: "pg" },
        { from: "ws", to: "redis" }
      ]
    }
  }
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

/* ============================================================
   CARD + MODAL RENDERING
   ============================================================ */

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
  return `
    <article class="project-card ${project.featured ? "project-card--featured" : ""}" data-project-id="${project.id}" tabindex="0" role="button" aria-haspopup="dialog">
      ${visualHTML(project)}
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="project-card__status">${project.status}</span>
        </div>
        <h3 class="project-card__name">${project.name}</h3>
        <p class="project-card__tagline">${project.tagline}</p>
        <div class="project-card__tags">${tagsHTML(project.tech, project.featured ? 6 : 4)}</div>
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

  grid.innerHTML = PROJECTS.map(cardHTML).join("");

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