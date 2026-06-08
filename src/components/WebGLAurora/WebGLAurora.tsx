'use client'

import {
  Renderer,
  Program,
  Mesh,
  Color,
  Triangle,
} from 'ogl'
import { useEffect, useRef } from 'react'
import './Aurora.css'

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

// Simplex noise permutation function
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

// 2D Simplex noise
float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

// Color interpolation macro
#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  // Setup color gradient
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Create a large moving circle at the bottom
  vec2 center = vec2(0.5 + sin(uTime * 0.5) * 0.3, -0.2);
  float dist = distance(uv, center);

  // Scale the circle size based on amplitude
  float radius = 0.6 * uAmplitude;

  // Create smooth falloff from center
  float auroraAlpha = 1.0 - smoothstep(0.0, radius * uBlend, dist);

  // Premultiply alpha to prevent edge artifacts
  vec3 auroraColor = rampColor * auroraAlpha;

  fragColor = vec4(auroraColor, auroraAlpha);
}
`

interface WebGLAuroraProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
  className?: string
}

const DEFAULT_COLOR_STOPS = [
  '#85c2ff',
  '#7cff67',
  '#5227FF',
]
const TIME_SCALE = 0.001

function hexToRgb(hex: string): [number, number, number] {
  const c = new Color(hex)
  return [c.r, c.g, c.b]
}

export default function WebGLAurora({
  colorStops = DEFAULT_COLOR_STOPS,
  amplitude = 1.0,
  blend = 0.5,
  speed = 1.0,
  className = '',
}: WebGLAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef({
    colorStops,
    amplitude,
    blend,
    speed,
  })

  propsRef.current = { colorStops, amplitude, blend, speed }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize WebGL renderer
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    })

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.style.backgroundColor = 'transparent'

    const handleResize = () => {
      if (!container) return
      const { offsetWidth, offsetHeight } = container
      renderer.setSize(offsetWidth, offsetHeight)
      if (program) {
        program.uniforms.uResolution.value = [
          offsetWidth,
          offsetHeight,
        ]
      }
    }

    window.addEventListener('resize', handleResize)

    // Setup geometry
    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv
    }

    // Create shader program
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map(hexToRgb) },
        uResolution: {
          value: [
            container.offsetWidth,
            container.offsetHeight,
          ],
        },
        uBlend: { value: blend },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    container.appendChild(gl.canvas)

    // Animation loop
    let animationId = 0
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate)

      const { speed, amplitude, blend, colorStops } =
        propsRef.current

      program.uniforms.uTime.value =
        time * TIME_SCALE * speed
      program.uniforms.uAmplitude.value = amplitude
      program.uniforms.uBlend.value = blend
      program.uniforms.uColorStops.value =
        colorStops.map(hexToRgb)

      renderer.render({ scene: mesh })
    }

    animationId = requestAnimationFrame(animate)
    handleResize()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [amplitude, blend, colorStops, speed])

  return (
    <div
      ref={containerRef}
      className={`aurora-container ${className}`}
    />
  )
}
