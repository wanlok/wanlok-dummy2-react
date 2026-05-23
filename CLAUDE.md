# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite)
npm run build     # production build
npm run lint      # ESLint (zero warnings allowed)
npm run preview   # preview production build
```

## Architecture

React 18 + Vite project. Entry point is `src/main.jsx`, which renders `<App />`.

**Components:**
- `FloorPlan.jsx` — Three.js scene that loads a 3D model from `/models/model.fbx` (served from `public/`). Uses `useRef` to mount the WebGL canvas into a div. Supports OBJ and FBX formats via `getLoader()`. OrbitControls for camera interaction.
- `FloorPlan2.jsx` (exported as `Dummy2`) — Three.js ocean/sky scene. Uses Three.js `Water`, `Sky`, animated bouncing cube, `Stats` overlay, and `lil-gui` controls for sky/water parameters. Water normals texture loaded from `assets/waternormals.jpg`.
- `GitHubUser.jsx` — fetches and displays a GitHub user profile via the public GitHub API.
- `App.jsx` — minimal placeholder component, not currently used.

**Three.js pattern:** Each scene component uses `useRef` to get a DOM node, then initializes renderer/scene/camera inside `useEffect(fn, [])`. The canvas is appended to `divRef.current`. Cleanup (event listeners, renderer dispose) is returned from the effect.

**Styling:** `main.css` sets `body { margin: 0 }` for full-bleed canvas. `App.css` is minimal.

**Static assets:** 3D model files go in `public/models/`. Texture assets go in `public/assets/` or `src/assets/`.
