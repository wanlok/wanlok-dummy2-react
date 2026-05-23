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

`App.jsx` imports `App.css` (which sets `body { margin: 0 }`). The component is currently a blank slate — add new components here.
