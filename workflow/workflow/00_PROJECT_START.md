# 00 — Project Start

## Goal

Prepare the repository and confirm the project constraints before writing UI code.

## Codex actions

1. Read all files in this workflow pack.
2. Create a new git repository if one does not already exist.
3. Create branch:
   `feat/piranti-landing-v1`
4. Copy the supplied logo into:
   `public/brand/piranti-travel-logo.png`
5. Create `.editorconfig`, `.gitignore`, and `.env.example`.
6. Do not add secrets to git.
7. Record tool versions in `docs/BUILD_ENV.md`.

## Suggested versions

Use current stable releases compatible with Node 22 LTS.

Expected tools:
- Node.js 22
- npm
- Astro
- Tailwind CSS
- Docker Engine
- Docker Compose plugin

## Deliverable

A clean repository ready for application bootstrap.

## Exit criteria

- Git repo exists.
- Logo is in `public/brand/`.
- `.env.example` exists.
- No source code has hardcoded phone numbers or analytics IDs.
