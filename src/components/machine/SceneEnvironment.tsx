import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, SSAO, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// ─────────────────────────────────────────────────────────────────────────────
// Synthetic environment – mimics an industrial workshop HDRI without any
// external file fetch.  Lightformers emit into an off-screen cube map that
// MeshPhysicalMaterial uses for specular IBL & clearcoat reflections.
// Shared by every 3-D viewer so all machines render with the same lighting.
// ─────────────────────────────────────────────────────────────────────────────
export function WorkshopEnvironment({ centerX = 0 }: { centerX?: number }) {
  return (
    <Environment resolution={512} background={false}>
      {/* Overhead fluorescent strip – bright white/neutral */}
      <Lightformer
        form="rect"
        intensity={6}
        position={[centerX, 9, 0]}
        scale={[14, 2, 1]}
        rotation-x={Math.PI / 2}
        color="#ddeeff"
      />
      {/* Left wall bounce – cool industrial blue */}
      <Lightformer
        form="rect"
        intensity={2.5}
        position={[-10, 3, 0]}
        scale={[1, 8, 12]}
        rotation-y={Math.PI / 2}
        color="#5588cc"
      />
      {/* Right wall bounce – warm fill */}
      <Lightformer
        form="rect"
        intensity={1.8}
        position={[10, 3, 0]}
        scale={[1, 8, 12]}
        rotation-y={-Math.PI / 2}
        color="#ffddaa"
      />
      {/* Front fill – faces camera, gives specular catch on forward surfaces */}
      <Lightformer
        form="rect"
        intensity={1.2}
        position={[centerX, 2, 12]}
        scale={[14, 5, 1]}
        rotation-y={Math.PI}
        color="#c8d8f0"
      />
      {/* Rear separation – rim light from behind */}
      <Lightformer
        form="rect"
        intensity={0.6}
        position={[centerX, 4, -10]}
        scale={[14, 4, 1]}
        color="#ffe8bb"
      />
      {/* Floor bounce – very dim upward fill */}
      <Lightformer
        form="ring"
        intensity={0.25}
        position={[centerX, -3, 0]}
        scale={8}
        rotation-x={-Math.PI / 2}
        color="#3a4a5a"
      />
    </Environment>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Direct scene lights (shadows + diffuse fill that Environment alone misses)
// ─────────────────────────────────────────────────────────────────────────────
export function SceneLights({ centerX = 0 }: { centerX?: number }) {
  return (
    <>
      {/* Low ambient so unlit surfaces stay dark but not pure black */}
      <ambientLight intensity={0.25} color="#aabbcc" />

      {/* Key – upper-right-front, casts crisp shadows */}
      <directionalLight
        position={[centerX + 8, 14, 10]}
        intensity={1.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={55}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      {/* Fill – upper-left, cool */}
      <directionalLight position={[centerX - 7, 8, 4]} intensity={0.55} color="#88aaff" />

      {/* Rim – behind, warm separation light */}
      <directionalLight position={[centerX - 2, 6, -10]} intensity={0.4} color="#ffddaa" />

      {/* Under-bounce – softens base-plate shadow */}
      <pointLight position={[centerX, -1.0, 2.5]} intensity={0.3} color="#2a3848" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ground – shadow receiver + reference grid
// ─────────────────────────────────────────────────────────────────────────────
export function Ground() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 60, "#18222e", "#111820"]} position={[0, -0.85, 0]} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Post-processing – ambient occlusion is what turns the flat, "cut-out sticker"
// look of clean primitive geometry into something that reads as physically
// present: it darkens the crevices between bolts, flanges and ribs the way
// real occluded light does, adding the depth cues a single directional key
// light can't provide on its own. A very small bloom keeps painted highlights
// and the status LEDs from clipping to a flat white disc, and the vignette
// pulls the eye toward the machine instead of the workshop background.
// ─────────────────────────────────────────────────────────────────────────────
export function PostFX() {
  return (
    <EffectComposer multisampling={0} enableNormalPass>
      <SSAO
        intensity={22}
        radius={0.12}
        luminanceInfluence={0.4}
        bias={0.02}
        worldDistanceThreshold={0.6}
        worldDistanceFalloff={0.1}
        worldProximityThreshold={0.2}
        worldProximityFalloff={0.1}
      />
      <Bloom intensity={0.35} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur radius={0.5} />
      <Vignette eskil={false} offset={0.15} darkness={0.55} blendFunction={BlendFunction.NORMAL} />
      <SMAA />
    </EffectComposer>
  );
}
