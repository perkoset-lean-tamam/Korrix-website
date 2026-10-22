import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei"
import {
  BackSide,
  CanvasTexture,
  SRGBColorSpace,
  type Group,
  type Mesh,
  type Texture,
} from "three"

import { cn } from "@/lib/utils"

const CODE_LINES = [
  "POST /api/v1/deploy 200 42ms",
  "kubectl get pods -n korrix",
  "ssh root@10.0.4.12 uptime",
  "const app = createServer()",
  "docker compose up -d --build",
  "nginx: worker process ready",
  "redis> PING → PONG",
  "git push origin main ✓",
  "SELECT * FROM jobs WHERE status='queued'",
  "pm2 restart api --update-env",
  "TLS handshake ok · edge-01",
  "fn main() { serve(8080) }",
  "async function handle(req)",
  "CDN cache HIT · /assets",
  "cron: backup → s3://korrix",
  "ws://gateway/events connected",
  "HTTP/2 200 · graphql",
  "systemctl status korrix.api",
  "npm run build && deploy",
  "INFO cluster node joined",
  "TRACE span_id=9f3c 12ms",
  "0x7ffe heap alloc 2.4MB",
]

function createCodeTexture(): Texture {
  const size = 1024
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#05080e"
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 12; i++) {
    const y = (i / 12) * size
    const g = ctx.createLinearGradient(0, y, size, y + size / 12)
    g.addColorStop(0, "rgba(0,255,170,0.05)")
    g.addColorStop(0.5, "rgba(90,170,255,0.12)")
    g.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, y, size, size / 12)
  }

  ctx.strokeStyle = "rgba(140,210,255,0.15)"
  ctx.lineWidth = 2
  for (let x = 48; x < size; x += 96) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }

  for (let i = 0; i < 50; i++) {
    ctx.fillStyle =
      Math.random() > 0.4 ? "rgba(0,255,170,0.9)" : "rgba(110,200,255,0.85)"
    ctx.beginPath()
    ctx.arc(
      30 + Math.random() * (size - 60),
      30 + Math.random() * (size - 60),
      2 + Math.random() * 2,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }

  let y = 36
  let i = 0
  while (y < size - 16) {
    const line = CODE_LINES[i % CODE_LINES.length]
    ctx.font = "600 24px ui-monospace, Menlo, Consolas, monospace"
    ctx.fillStyle = `rgba(150, ${200 + (i % 40)}, 240, 0.88)`
    ctx.fillText(line, 20 + (i % 3) * 10, y)

    if (i % 3 === 0) {
      ctx.font = "500 13px ui-monospace, monospace"
      ctx.fillStyle = "rgba(0,255,170,0.3)"
      ctx.fillText(
        Array.from({ length: 54 }, () => (Math.random() > 0.5 ? "1" : "0")).join(
          ""
        ),
        20,
        y + 14
      )
    }
    y += 32
    i++
  }

  // bright panels → crisp silver highlights
  ctx.fillStyle = "rgba(245,250,255,0.9)"
  ctx.fillRect(size * 0.7, size * 0.05, size * 0.24, size * 0.12)
  ctx.fillStyle = "rgba(0,255,190,0.5)"
  ctx.fillRect(size * 0.05, size * 0.66, size * 0.2, size * 0.12)
  ctx.fillStyle = "rgba(255,255,255,0.7)"
  ctx.fillRect(size * 0.36, size * 0.02, size * 0.24, size * 0.07)
  ctx.fillStyle = "rgba(100,180,255,0.45)"
  ctx.fillRect(size * 0.52, size * 0.8, size * 0.32, size * 0.1)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function CodeEnvironment() {
  const map = useMemo(() => createCodeTexture(), [])

  return (
    <Environment resolution={256} environmentIntensity={1.35}>
      <color attach="background" args={["#05080e"]} />
      <mesh scale={50}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={map} side={BackSide} />
      </mesh>
      <Lightformer
        form="rect"
        intensity={5}
        position={[6, 3, -3]}
        scale={[7, 2.2, 1]}
        color="#d8f4ff"
      />
      <Lightformer
        form="rect"
        intensity={3.5}
        position={[-5, -1, 4]}
        scale={[4, 3, 1]}
        color="#5dffc2"
      />
      <Lightformer
        form="ring"
        intensity={2.8}
        position={[0, 5, 1]}
        scale={6}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={2}
        position={[0, -4, -4]}
        scale={[9, 1.4, 1]}
        color="#6ab0ff"
      />
    </Environment>
  )
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function SilverOrb({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (reduced || !group.current || !mesh.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y = t * 0.28
    group.current.rotation.x = Math.sin(t * 0.35) * 0.18
    group.current.rotation.z = Math.cos(t * 0.22) * 0.1
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.15) * 0.035)
  })

  return (
    <Float
      speed={reduced ? 0 : 1.6}
      rotationIntensity={reduced ? 0 : 0.5}
      floatIntensity={reduced ? 0 : 0.7}
      floatingRange={[-0.12, 0.16]}
    >
      <group ref={group} position={[0, 0.08, 0]}>
        <mesh ref={mesh}>
          <sphereGeometry args={[1.1, 128, 128]} />
          <MeshDistortMaterial
            color="#c8ced6"
            metalness={1}
            roughness={0.05}
            distort={reduced ? 0.16 : 0.4}
            speed={reduced ? 0 : 2.6}
            envMapIntensity={2.4}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 5, 2]} intensity={0.7} color="#eaf6ff" />
      <SilverOrb reduced={reduced} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
      <Suspense fallback={null}>
        <CodeEnvironment />
      </Suspense>
    </>
  )
}

export function HeroOrb({ className }: { className?: string }) {
  const reduced = useMemo(() => prefersReducedMotion(), [])

  return (
    <div className={cn("relative", className)}>
      <Canvas
        className="size-full touch-none"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 3.5], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  )
}
