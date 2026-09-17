/**
 * AI Video Prompt Architecture Engine
 * Engineered for Kling AI, Runway Gen-3, Luma Dream Machine, and Sora.
 */

function buildVideoPrompt(userConcept, rawInput) {
  const isKiss = /kiss|يبوسو|قبلة/i.test(userConcept) || /يبوسو|بوس/i.test(rawInput);
  const isEmbrace = /embrace|حضن|عناق/i.test(userConcept) || /حضن|حميم/i.test(rawInput);
  const isRain = /rain|مطر/i.test(userConcept) || /مطر/i.test(rawInput);
  const isCar = /car|سيارة/i.test(userConcept) || /سيار/i.test(rawInput);

  let motion = "";
  let cameraMovement = "";
  let temporalDynamics = "";

  if (isKiss) {
    motion = "gentle slow-motion head movement, tender leaning in, subtle lip touch with eyes closing softly, atmospheric breathing";
    cameraMovement = "slow cinematic orbit push-in, shallow depth of field, 50mm anamorphic lens, buttery smooth motion";
    temporalDynamics = "cinematic 24fps film cadence, golden candlelight flickering softly, delicate motion blur";
  } else if (isEmbrace) {
    motion = "slow affectionate embrace, fingers gently brushing through hair, subtle warmth and emotional breathing";
    cameraMovement = "gentle tracking pan around subjects, eye-level framing";
    temporalDynamics = "cinematic natural motion, soft rim light shimmering across edges, 24fps";
  } else if (isRain) {
    motion = "raindrops falling in slow motion, water ripples splashing on pavement, vapor drifting through air";
    cameraMovement = "low-angle slow tracking dolly shot moving forward";
    temporalDynamics = "60fps slowed to 24fps, reflective liquid lighting dynamics";
  } else if (isCar) {
    motion = "high-speed highway tracking, wheels spinning with realistic motion blur, exhaust heat shimmer";
    cameraMovement = "dynamic chase cam low to the ground, fast-paced panning";
    temporalDynamics = "cinematic motion blur, streetlights streaking in reflection";
  } else {
    motion = "natural realistic micro-movements, organic breathing, subtle ambient breeze shifting hair and clothing";
    cameraMovement = "slow subtle cinematic push-in, smooth gimbal stabilization";
    temporalDynamics = "authentic 24fps film motion, consistent lighting continuity";
  }

  const videoPrompt = `${userConcept}, ${motion}, ${cameraMovement}, ${temporalDynamics}, ultra-realistic 4k resolution cinematic video`;

  return {
    videoPrompt,
    cameraMovement,
    motion,
    recommendedModel: "Kling AI v1.5 / Runway Gen-3 Alpha / Luma Dream Machine",
    settings: {
      motionStrength: "5-6 (Natural & Smooth)",
      fps: "24fps (Cinematic)",
      aspectRatio: "16:9 (Landscape) or 9:16 (Reels/TikTok)"
    }
  };
}

module.exports = {
  buildVideoPrompt
};
