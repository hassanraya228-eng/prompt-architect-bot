/**
 * Prompt Architect Core Engine
 * Deconstructs and reconstructs rough ideas / 1-2 words into a rigorous 6-layer architecture:
 * 1. Subject (Core character/object/action)
 * 2. Environment & Background (Atmosphere, setting)
 * 3. Medium & Artistic Style (Engine, camera film, render style)
 * 4. Lighting & Color Palette (Cinematic, volumetric, studio, etc.)
 * 5. Composition & Camera (Shot angle, lens mm, framing)
 * 6. Technical & Quality Tokens (8k, ray tracing, ultra-detailed)
 */

class PromptArchitectEngine {
  constructor() {
    this.name = "Prompt Architect Bot";
    this.persona = "Professional, direct, technical, and precise.";

    // Archetype and thematic knowledge base for reverse engineering
    this.archetypes = {
      cyberpunk: {
        keywords: ['cyber', 'neon', 'futuristic', 'hacker', 'cyborg', 'tokyo', 'android', 'mech', 'robot', 'blade runner', 'matrix', 'tech'],
        defaultMedium: "octane render, unreal engine 5.4, hyperrealistic 3D cinematic CGI",
        mediumOptions: ["Octane 3D Render", "35mm anamorphic film photography", "Unreal Engine 5.4 cinematic"],
        lighting: "dual-tone neon lighting (cyber cyan and hot magenta), wet street specular reflections, volumetric rim glow, moody diffusion",
        composition: "low-angle wide shot, 24mm anamorphic lens, deep perspective depth, dramatic bokeh, Dutch tilt tension",
        technical: "8k resolution, ray-traced ambient occlusion, subsurface scattering on synthetics, intricate hard-surface mechanical detail, chromatic aberration 0.1",
        negative: "blurry, low resolution, plastic skin, oversaturated clipping, deformed hands, missing fingers, amateur rendering, flat lighting, text watermarks, logo artifacts",
        aspectRatio: "21:9 (Cinematic Ultrawide)",
        model: "Flux.1 [Dev] / Midjourney v6.1",
        cfgScale: "3.5 (Flux) / 7.0 (SDXL)",
        steps: "30-40 steps, Euler Ancestral / Flow Match"
      },
      fantasy: {
        keywords: ['dragon', 'knight', 'wizard', 'magic', 'castle', 'elf', 'sorcerer', 'warrior', 'mythical', 'fairy', 'sword', 'gothic', 'ancient'],
        defaultMedium: "digital matte oil painting, masterwork oil on canvas, Frank Frazetta and Greg Rutkowski aesthetic fidelity",
        mediumOptions: ["Fine art digital matte painting", "Large format 4x5 film photograph", "Hyperrealistic cinematic dark fantasy render"],
        lighting: "ethereal golden hour volumetric god rays, bioluminescent ambient flora, mystical atmospheric fog, high dynamic range chiaroscuro",
        composition: "heroic low-angle three-quarters composition, 50mm f/1.4 prime lens, rule of thirds, grand scale atmospheric perspective",
        technical: "masterpiece quality, 8k uhd, photorealistic micro-textures, intricate ornate filigree, authentic cloth weave physics, volumetric particle dust",
        negative: "modern artifacts, plastic textures, oversaturated digital noise, mutated limbs, asymmetrical face, blurry backdrop, signature, watermark, cartoonish proportions",
        aspectRatio: "16:9 (Landscape) or 4:5 (Portrait)",
        model: "Midjourney v6.1 / SDXL 1.0",
        cfgScale: "6.5 - 7.5",
        steps: "35 steps, DPM++ 2M Karras"
      },
      sci_fi: {
        keywords: ['space', 'galaxy', 'astronaut', 'alien', 'spaceship', 'starship', 'mars', 'orbital', 'quantum', 'interstellar', 'cosmos'],
        defaultMedium: "IMAX 70mm scientific cinematography, RED V-Raptor 8K sensor capture, raw cinematic realism",
        mediumOptions: ["IMAX 70mm Film", "NASA documentary archival film", "Hard sci-fi Unreal Engine 5 render"],
        lighting: "stark vacuum harsh sunlight, Earthshine rim light, soft interior instrument control console glow, deep cosmic black shadow falloff",
        composition: "extreme wide environmental vista with intimate scale focal point, 18mm Zeiss Master Prime, balanced symmetrical framing",
        technical: "8k photorealism, accurate zero-gravity micro-debris, high fidelity thermal foil wrinkles, antireflective helmet visor coating with subtle bounce reflections",
        negative: "lowres, cartoon, fantasy magic effects, lens flares out of place, bad geometry, duplicated structures, jpeg compression, signature",
        aspectRatio: "2.39:1 (Anamorphic Cinema)",
        model: "Flux.1 [Pro] / SDXL Turbo",
        cfgScale: "3.0 (Flux) / 6.0 (SDXL)",
        steps: "28-35 steps"
      },
      portrait: {
        keywords: ['portrait', 'face', 'woman', 'man', 'girl', 'boy', 'person', 'model', 'eyes', 'headshot', 'elderly', 'monk', 'warrior portrait'],
        defaultMedium: "Hasselblad H6D-100c medium format studio photography, 100mm f/2.2 HC portrait lens",
        mediumOptions: ["Hasselblad Medium Format", "Kodak Portra 400 35mm Film", "Studio Wet Plate Collodion"],
        lighting: "Rembrandt key lighting with subtle silver reflector fill, delicate hair kicker rim light, soft catchlight in irises",
        composition: "tight close-up / bust framing, eye-level gaze, razor-thin depth of field, creamy creamy bokeh background separation",
        technical: "hyper-detailed skin pores, individual eyelash strands, natural dermis subsurface scattering, uncompressed 16-bit RAW dynamic range, photorealistic texture fidelity",
        negative: "airbrushed, porcelain plastic skin, mannequin face, crossed eyes, extra fingers, bad anatomy, mutated iris, over-smoothed makeup, oversaturated teeth",
        aspectRatio: "4:5 (Editorial) or 9:16 (Vertical)",
        model: "Flux.1 [Dev] / Midjourney v6.1 Photorealism",
        cfgScale: "3.5 (Flux) / 5.5 (SDXL)",
        steps: "30 steps"
      },
      nature: {
        keywords: ['nature', 'forest', 'mountain', 'lake', 'river', 'sunset', 'ocean', 'wildlife', 'animal', 'wolf', 'tiger', 'eagle', 'tree', 'landscape'],
        defaultMedium: "National Geographic 35mm wildlife documentary photography, Leica SL2 with 400mm f/2.8 telephoto lens",
        mediumOptions: ["National Geographic 35mm Film", "Large format landscape photography", "Bioluminescent nature CGI render"],
        lighting: "crepuscular rays piercing canopy, dewy morning golden hour backlighting, natural ambient atmospheric haze",
        composition: "wide environmental telephoto compression, eye-level wildlife posture, rule of thirds environmental framing",
        technical: "ultra-sharp focus on subject eyes, individual fur and feather barbule detail, organic water droplet reflections, 8k resolution, authentic motion freeze",
        negative: "cg look, plastic fur, taxidermy expression, oversaturated greens, blurry eyes, artifacts, watermark, cloned trees, unnatural anatomy",
        aspectRatio: "16:9 or 3:2 (Classic 35mm)",
        model: "Midjourney v6.1 / Flux.1 [Dev]",
        cfgScale: "4.0 (Flux) / 7.0 (SDXL)",
        steps: "32 steps"
      },
      architecture: {
        keywords: ['building', 'house', 'mansion', 'interior', 'room', 'cathedral', 'temple', 'architecture', 'minimalist', 'brutalist', 'villa'],
        defaultMedium: "Architectural Digest editorial photograph, Phase One XF IQ4 150MP, tilt-shift 24mm architectural lens",
        mediumOptions: ["Phase One Medium Format", "V-Ray Architectural Vis", "Minimalist Modernist 35mm"],
        lighting: "natural diffused daylight streaming through floor-to-ceiling glass, soft ambient bounce, linear shadow geometry, warm 3200k interior accents",
        composition: "two-point perspective, perfectly vertical structural lines, balanced symmetrical interior framing, clean negative space",
        technical: "ultra-precise material textures (poured concrete, brushed brass, natural walnut grain), zero distortion, 8k photorealistic architectural visualization",
        negative: "crooked lines, warped perspective, noisy grain, blown-out highlights, muddy shadows, repetitive furniture clones, watermark",
        aspectRatio: "16:9 (Exterior) or 4:3 (Interior)",
        model: "SDXL 1.0 / Flux.1 [Dev]",
        cfgScale: "4.0 (Flux) / 6.5 (SDXL)",
        steps: "35 steps"
      },
      street_urban: {
        keywords: ['street', 'city', 'urban', 'cafe', 'car', 'vintage', 'pedestrian', 'rain', 'night', 'subway', 'alley'],
        defaultMedium: "Leica M11 Rangefinder, 35mm Summilux-M f/1.4, Kodak Tri-X 400 / Portra 800 film stock emulsion",
        mediumOptions: ["Leica 35mm Street Documentary", "Cinematic Neo-Noir 35mm", "Moody Tokyo Street Photography"],
        lighting: "streetlamp amber glow, neon puddle reflections, atmospheric street steam, high contrast noir chiaroscuro",
        composition: "decisive moment candid street framing, 35mm street eye-level, foreground blurred pedestrian element for dynamic depth",
        technical: "organic film grain texture, natural halation around highlights, rich shadow detail, true optical bokeh, 8k resolution",
        negative: "artificial gloss, flat lighting, plastic figures, duplicated crowds, mutated limbs, cartoon style, bad signage lettering, watermark",
        aspectRatio: "3:2 or 16:9",
        model: "Flux.1 [Dev] / Midjourney v6.1",
        cfgScale: "3.5 (Flux) / 7.0 (SDXL)",
        steps: "30 steps"
      }
    };
  }

  detectCategory(rawInput) {
    const text = rawInput.toLowerCase();
    for (const [cat, data] of Object.entries(this.archetypes)) {
      if (data.keywords.some(k => text.includes(k))) {
        return cat;
      }
    }
    return 'general';
  }

  /**
   * Expands 1-2 words or short concepts into a rich narrative subject & environment
   */
  expandConcept(rawInput) {
    const trimmed = rawInput.trim();
    const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
    
    // Check if input is super short (1-3 words)
    const isShort = wordCount <= 3;
    return {
      isExpanded: isShort,
      originalText: trimmed,
      wordCount: wordCount
    };
  }

  /**
   * Reverse-engineers and deconstructs input into the rigorous 6-layer architecture
   */
  deconstruct(rawInput, overrides = {}) {
    const text = (rawInput || '').trim();
    if (!text) {
      throw new Error("Input concept cannot be empty. Please provide a rough concept or keyword.");
    }

    const { isExpanded } = this.expandConcept(text);
    const category = this.detectCategory(text);
    const archetype = this.archetypes[category] || this.archetypes.cyberpunk;

    // 1. Layer 1: Subject (Core character/object/action)
    let subject = "";
    if (isExpanded) {
      subject = this.generateExpandedSubject(text, category);
    } else {
      subject = this.extractAndRefineSubject(text);
    }

    // 2. Layer 2: Environment & Background (Atmosphere, setting)
    const environment = overrides.environment || this.generateEnvironment(text, category, subject);

    // 3. Layer 3: Medium & Artistic Style (Engine, camera film, render style)
    const medium = overrides.medium || archetype.defaultMedium;

    // 4. Layer 4: Lighting & Color Palette (Cinematic, volumetric, studio, etc.)
    const lighting = overrides.lighting || archetype.lighting;

    // 5. Layer 5: Composition & Camera (Shot angle, lens mm, framing)
    const composition = overrides.composition || archetype.composition;

    // 6. Layer 6: Technical & Quality Tokens (8k, ray tracing, ultra-detailed)
    const technical = overrides.technical || archetype.technical;

    // Calibrated Negative Prompt
    const negativePrompt = overrides.negative || this.generateCalibratedNegative(category, medium);

    // Recommended Settings
    const settings = {
      aspectRatio: overrides.aspectRatio || archetype.aspectRatio,
      recommendedModel: overrides.model || archetype.model,
      cfgScale: overrides.cfgScale || archetype.cfgScale,
      samplingSteps: archetype.steps,
      sampler: "Euler a / DPM++ 2M Karras (SDXL) | FlowMatch (Flux)"
    };

    // Construct final clean comma-separated positive prompt
    const architecturalPrompt = [
      subject,
      environment,
      medium,
      lighting,
      composition,
      technical
    ].map(s => s.trim().replace(/^,+|,+$/g, '')).filter(Boolean).join(", ");

    return {
      meta: {
        botName: this.name,
        persona: this.persona,
        input: text,
        wasAutoExpanded: isExpanded,
        detectedCategory: category,
        timestamp: new Date().toISOString()
      },
      layers: {
        subject: {
          label: "Layer 1: Subject (Core character/object/action)",
          content: subject
        },
        environment: {
          label: "Layer 2: Environment & Background (Atmosphere, setting)",
          content: environment
        },
        medium: {
          label: "Layer 3: Medium & Artistic Style (Engine, camera film, render style)",
          content: medium
        },
        lighting: {
          label: "Layer 4: Lighting & Color Palette (Cinematic, volumetric, studio, etc.)",
          content: lighting
        },
        composition: {
          label: "Layer 5: Composition & Camera (Shot angle, lens mm, framing)",
          content: composition
        },
        technical: {
          label: "Layer 6: Technical & Quality Tokens (8k, ray tracing, ultra-detailed)",
          content: technical
        }
      },
      finalPositivePrompt: architecturalPrompt,
      calibratedNegativePrompt: negativePrompt,
      recommendedSettings: settings
    };
  }

  generateExpandedSubject(shortText, category) {
    const lower = shortText.toLowerCase();

    // Specific famous short tokens
    if (lower === 'cat' || lower === 'a cat') {
      return "regal British Shorthair cat wearing an ornate renaissance velvet collar, amber eyes locked onto viewer, highly expressive micro-whiskers";
    }
    if (lower === 'cyberpunk' || lower === 'cyberpunk city') {
      return "augmented cybernetic ronin operative with glowing neural interface implants and weathered carbon-fiber tactical armor, holding an illuminated monomolecular blade";
    }
    if (lower === 'coffee' || lower === 'coffee cup') {
      return "artisanal ceramic espresso cup with intricate rosetta latte art on microfoam, rising aromatic steam ribbons caught in mid-air";
    }
    if (lower === 'astronaut') {
      return "seasoned deep-space astronaut in a weathered NASA extravehicular mobility suit, gold-mirrored visor reflecting an exploding nebula";
    }
    if (lower === 'dragon') {
      return "colossal ancient elder dragon with iridescent obsidian scales, serpentine horns, and glowing ember veins pulsing along its neck";
    }
    if (lower === 'car' || lower === 'sports car') {
      return "prototype hypercar with aerodynamic exposed carbon fiber chassis, active aerodynamic winglets, and glowing geometric LED tail assemblies";
    }

    // Category based expansion
    switch (category) {
      case 'cyberpunk':
        return `hyper-detailed cybernetic protagonist representing ${shortText}, outfitted with modular neural telemetry gear, tactile combat tech-wear, and glowing subcutaneous circuitry`;
      case 'fantasy':
        return `mythical sovereign figure embodying ${shortText}, clad in intricately etched mithril armor and flowing ceremonial silk cape with ancient runic sigils`;
      case 'portrait':
        return `compelling high-fashion portrait of an enigmatic subject (${shortText}), nuanced emotional gaze, sculpted facial features, and photorealistic skin subsurface texture`;
      case 'nature':
        return `majestic wildlife embodiment of ${shortText}, alert dynamic stance, pristine coat texture, captured in undisturbed primal authenticity`;
      case 'architecture':
        return `monumental parametric architectural installation of ${shortText}, featuring cantilevered sustainable timber and curved monolithic structural concrete`;
      case 'street_urban':
        return `solitary enigmatic figure interacting with ${shortText}, dressed in raw denim and utilitarian overcoat, paused mid-step`;
      case 'sci_fi':
        return `high-tech interplanetary explorer conducting critical telemetry on ${shortText}, equipped with advanced survival pressurized suit and modular field scanner`;
      default:
        return `striking, masterfully crafted centerpiece visualization of ${shortText}, exhibiting meticulous tactile surface details, authentic physical weight, and commanding presence`;
    }
  }

  extractAndRefineSubject(text) {
    // Clean up filler words like "make an image of", "prompt for", "a picture of"
    let cleaned = text
      .replace(/^(please\s+)?(generate|create|make|draw|render|show me|a picture of|an image of|a photo of|prompt for)\s+/i, '')
      .replace(/[.!?;]+$/, '');
    
    // Capitalize first letter and give precision punch
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  generateEnvironment(text, category, subject) {
    const lower = text.toLowerCase();
    
    // Context-specific environment overrides if mentioned in concept
    if (lower.includes('rain') || lower.includes('wet')) {
      return "monsoon-drenched urban environment, slick mirror-like asphalt with liquid light reflections, mist particles drifting through air, neon backlights";
    }
    if (lower.includes('burning') || lower.includes('fire') || lower.includes('kingdom')) {
      return "smoldering ruined citadel ridge overlooking an expansive burning medieval valley, ember dust storms, fiery crimson horizon, billowing dark smoke plumes";
    }
    if (lower.includes('desert') || lower.includes('dune')) {
      return "vast sweeping wind-carved desert dunes, ancient weathered monoliths emerging from sand, extreme mirage heat shimmer on distant horizon";
    }
    if (lower.includes('snow') || lower.includes('ice') || lower.includes('arctic')) {
      return "frozen sub-zero tundra expanse, jagged turquoise glacial crevasses, blustering diamond-dust snow flurry illuminated by low arctic sun";
    }

    switch (category) {
      case 'cyberpunk':
        return "dense neo-metropolis lower district, rain-slicked asphalt reflecting towering holographic advertisements, tangled overhead cable clusters, steam escaping sewer grates";
      case 'fantasy':
        return "mist-shrouded ancient redwood grove with bioluminescent ground moss, crumbling gothic arch ruins in deep background, floating spore particles";
      case 'portrait':
        return "minimalist tactile studio setting with hand-painted raw linen backdrop, subtle tonal gradient, soft spatial negative space";
      case 'nature':
        return "untamed alpine wilderness during first autumn frost, majestic snowcapped peaks reflected in a mirror-still glacial tarn";
      case 'architecture':
        return "lush secluded Scandinavian fjord cliffside, floor-to-ceiling glass framing turbulent waves and pine forests, seamless indoor-outdoor transition";
      case 'street_urban':
        return "narrow cobblestone alleyway in rainy nighttime Kyoto, traditional paper lanterns diffusing warm light across wet flagstones, distant blurred pedestrian silhouettes";
      case 'sci_fi':
        return "lunar observation outpost interior looking out through an expansive geodesic glass dome toward Saturn's rings and distant star clusters";
      default:
        return "atmospheric environment with layered foreground depth, nuanced middle-ground spatial narrative, and softly dissolved background haze";
    }
  }

  generateCalibratedNegative(category, medium) {
    const baseline = "ugly, deformed, low quality, bad anatomy, bad proportions, blurry, watermarked, text, signature, duplicate, cropped, out of frame, extra limbs, poorly drawn hands, poorly drawn face, mutation, distorted, oversaturated, amateur, grainy, draft";
    
    if (medium.toLowerCase().includes("photo") || medium.toLowerCase().includes("hasselblad") || medium.toLowerCase().includes("leica")) {
      return `${baseline}, 3d render, cartoon, anime, illustration, painted look, plastic skin, airbrushed, unnatural smooth skin, fake reflections, CGI sheen`;
    }
    
    if (medium.toLowerCase().includes("render") || medium.toLowerCase().includes("unreal")) {
      return `${baseline}, flat shading, low-poly geometry, bad normal maps, clipping textures, jagged edges, low resolution bake, oversaturated neon wash`;
    }

    return baseline;
  }

  /**
   * Format the output according to user specification:
   * 1. [Deconstructed Breakdown]
   * 2. [Final Architectural Positive Prompt]
   * 3. [Calibrated Negative Prompt]
   * 4. [Recommended Settings]
   */
  formatResponse(result) {
    const { layers, finalPositivePrompt, calibratedNegativePrompt, recommendedSettings } = result;

    return `### 🏛️ [Deconstructed Breakdown]
• **Layer 1: Subject (Core character/object/action)**
  ↳ ${layers.subject.content}

• **Layer 2: Environment & Background (Atmosphere, setting)**
  ↳ ${layers.environment.content}

• **Layer 3: Medium & Artistic Style (Engine, camera film, render style)**
  ↳ ${layers.medium.content}

• **Layer 4: Lighting & Color Palette (Cinematic, volumetric, studio, etc.)**
  ↳ ${layers.lighting.content}

• **Layer 5: Composition & Camera (Shot angle, lens mm, framing)**
  ↳ ${layers.composition.content}

• **Layer 6: Technical & Quality Tokens (8k, ray tracing, ultra-detailed)**
  ↳ ${layers.technical.content}

---

### ⚡ [Final Architectural Positive Prompt]
\`\`\`
${finalPositivePrompt}
\`\`\`

---

### 🛡️ [Calibrated Negative Prompt]
\`\`\`
${calibratedNegativePrompt}
\`\`\`

---

### ⚙️ [Recommended Settings]
• **Aspect Ratio:** ${recommendedSettings.aspectRatio}
• **Recommended Model:** ${recommendedSettings.recommendedModel}
• **CFG Scale:** ${recommendedSettings.cfgScale}
• **Sampling Steps:** ${recommendedSettings.samplingSteps}
• **Sampler:** ${recommendedSettings.sampler}`;
  }
}

module.exports = PromptArchitectEngine;
