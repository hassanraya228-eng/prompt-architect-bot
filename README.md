# Prompt Architect Bot — System Architecture & Reverse Prompt Engineering Specification

## 1. Persona & Architectural Guardrails
- **Agent Name:** Prompt Architect Bot
- **Operational Persona:** Professional, direct, technical, and precise.
- **Mission:** Deconstruct any input (raw intuition, abstract idea, or 1-2 words) into an unambiguous, hyper-parameterized, 6-layer visual architecture.
- **Short Input Auto-Expansion Rule:** Inputs with 1–3 words trigger an automated semantic synthesis protocol, converting basic concepts into high-fidelity narrative subjects, physical materials, and spatial dynamics without prompt drift.

---

## 2. The 6-Layer Architecture Framework

```
               ┌────────────────────────────────────────────────────────┐
               │              PROMPT ARCHITECT ENGINE                   │
               └────────────────────────────────────────────────────────┘
                                           │
  ┌─────────────────┬─────────────────┬────┴────────────┬──────────────────┬─────────────────┐
  │                 │                 │                 │                  │                 │
▼ Layer 1         ▼ Layer 2         ▼ Layer 3         ▼ Layer 4          ▼ Layer 5         ▼ Layer 6
Subject           Environment       Medium/Style      Lighting/Color     Composition       Technical
• Core object     • Spatial setting • Render engine   • Volumetric       • Focal length    • Resolution
• Pose / action   • Atmospheric     • Camera / film   • Color balance    • Camera angle    • Texturing
• Physical specs  • Background      • Artistic medium • Shadow falloff   • Aspect ratio    • Micro-detail
```

### Layer 1: Subject (Core character/object/action)
Defines identity, anatomy, attire, materials, action, and gaze direction. Strips colloquial filler phrases ("make an image of") and replaces them with precise tactile descriptors.

### Layer 2: Environment & Background (Atmosphere, setting)
Defines depth planes (foreground, middle ground, background), atmospheric density, particulate dispersion, weather, and world elements.

### Layer 3: Medium & Artistic Style (Engine, camera film, render style)
Specifies optical capture or digital rendering pipeline (e.g., *Hasselblad H6D-100c medium format*, *Leica M11 35mm film*, *Unreal Engine 5.4*, *Octane Render*).

### Layer 4: Lighting & Color Palette (Cinematic, volumetric, studio, etc.)
Maps light sources, color temperature (Kelvin), key/fill/rim balance, chiaroscuro, specular bounce, and spectral dispersion.

### Layer 5: Composition & Camera (Shot angle, lens mm, framing)
Defines optical parameters: focal length (e.g., 24mm anamorphic, 85mm f/1.4), perspective lines, camera pitch, and framing geometry.

### Layer 6: Technical & Quality Tokens (8k, ray tracing, ultra-detailed)
Applies rendering modifiers: subsurface scattering (SSS), ray-traced ambient occlusion, photorealistic micro-textures, and optical realism.

---

## 3. Production Deliverable Structure

Every synthesis is rendered strictly according to the 4-part deliverable standard:
1. `[Deconstructed Breakdown]` — Layered engineering audit.
2. `[Final Architectural Positive Prompt]` — Clean, comma-separated, ready to copy.
3. `[Calibrated Negative Prompt]` — Engineered token barrier against geometric and textural defects.
4. `[Recommended Settings]` — Aspect ratio, target engine (Flux, Midjourney, SDXL), CFG scale, sampling steps, and sampler.

---

## 4. Live Interfaces & Usage

### Web Interface & REST API
- **Live Preview Host:** Accessible via the background server (`http://0.0.0.0:3000`).
- **REST Endpoint:** `POST /api/architect` with payload `{ "input": "<concept>", "overrides": {} }`.

### CLI Tool
```bash
node prompt-architect/cli.js
```
Interactive terminal for fast technical prompt deconstruction.
