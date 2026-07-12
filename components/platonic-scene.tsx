"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Edges, Float } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { mesh } from "topojson-client"
import landAtlas from "world-atlas/land-110m.json"
import * as THREE from "three"

type SolidName = "tetrahedron" | "octahedron" | "icosahedron" | "cube" | "dodecahedron"
type SceneObject = SolidName | "logo"
type SolidProps = { name: SolidName; position: [number, number, number]; color: string; scale?: number; alwaysVisible?: boolean }
type Coordinate = [longitude: number, latitude: number]

const landTopology = landAtlas as unknown as Parameters<typeof mesh>[0]
const naturalEarthCoastlines = mesh(landTopology, landTopology.objects.land as Parameters<typeof mesh>[1]).coordinates as Coordinate[][]

function globePoint([longitude, latitude]: Coordinate, radius: number) {
  const lon = THREE.MathUtils.degToRad(longitude)
  const lat = THREE.MathUtils.degToRad(latitude)
  return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lon))
}

function GlobeLine({ points, color, opacity }: { points: THREE.Vector3[]; color: string; opacity: number }) {
  const line = useMemo(() => {
    const object = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color, transparent:true, opacity, depthWrite:false }))
    object.renderOrder = 3
    return object
  }, [points, color, opacity])
  return <primitive object={line}/>
}

function GlobeOccluder({ radius }: { radius: number }) {
  const mesh = useMemo(() => {
    const material = new THREE.MeshBasicMaterial()
    material.colorWrite = false
    material.depthWrite = true
    const object = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 32), material)
    object.renderOrder = 2
    return object
  }, [radius])
  return <primitive object={mesh}/>
}

function EarthWireframe() {
  const ref = useRef<THREE.Group>(null)
  const { latitudeLines, longitudeLines, coastlineLines } = useMemo(() => {
    const radius = 1.525
    return {
      latitudeLines: [-60,-30,0,30,60].map((latitude) => Array.from({ length:145 }, (_, index) => globePoint([-180 + index * 2.5, latitude], radius))),
      longitudeLines: Array.from({ length:12 }, (_, line) => -180 + line * 30).map((longitude) => Array.from({ length:91 }, (_, index) => globePoint([longitude, -90 + index * 2], radius))),
      coastlineLines: naturalEarthCoastlines.map((coastline) => coastline.map((coordinate) => globePoint(coordinate, radius + .015))),
    }
  }, [])
  useFrame((_state, delta) => { if (ref.current) ref.current.rotation.y += delta * .032 })
  return <group rotation={[.32, 0, -.38]}><group ref={ref}>
    <GlobeOccluder radius={1.525}/>
    {latitudeLines.map((points, index) => <GlobeLine key={`lat-${index}`} points={points} color="#FDA4D4" opacity={index === 2 ? .48 : .2}/>) }
    {longitudeLines.map((points, index) => <GlobeLine key={`lon-${index}`} points={points} color="#FDA4D4" opacity={index === 0 ? .44 : .2}/>) }
    {coastlineLines.map((points, index) => <GlobeLine key={`coast-${index}`} points={points} color="#FCE7F3" opacity={.86}/>) }
  </group></group>
}

function OrbitalStarField() {
  const ref = useRef<THREE.Points>(null)
  const { geometry, material } = useMemo(() => {
    let seed = 48271
    const random = () => {
      seed = seed * 16807 % 2147483647
      return (seed - 1) / 2147483646
    }
    const count = 2600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [new THREE.Color("#F5F3F0"), new THREE.Color("#C9A227"), new THREE.Color("#BBA7FF"), new THREE.Color("#FDA4D4")]
    for (let index = 0; index < count; index++) {
      const radius = 8 + Math.pow(random(), .7) * 42
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[index * 3 + 1] = radius * Math.cos(phi)
      positions[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
      const color = palette[Math.floor(random() * palette.length)]
      colors[index * 3] = color.r
      colors[index * 3 + 1] = color.g
      colors[index * 3 + 2] = color.b
    }
    const starGeometry = new THREE.BufferGeometry()
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return { geometry:starGeometry, material:new THREE.PointsMaterial({ size:.05, sizeAttenuation:true, vertexColors:true, transparent:true, opacity:.86, depthWrite:false }) }
  }, [])
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * .008
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * .025) * .12
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * .018) * .035
  })
  return <points ref={ref} geometry={geometry} material={material}/>
}

const LOGO_DIAMOND_RADIUS = .88
const LOGO_DIAMOND_OFFSET = LOGO_DIAMOND_RADIUS * 2

function ContinuousQuincunx() {
  const line = useMemo(() => {
    const r = LOGO_DIAMOND_RADIUS
    const points: Coordinate[] = [
      [0,r],[r,r*2],[0,r*3],[-r,r*2],[0,r],
      [r,0],[r*2,r],[r*3,0],[r*2,-r],[r,0],
      [0,-r],[r,-r*2],[0,-r*3],[-r,-r*2],[0,-r],
      [-r,0],[-r*2,-r],[-r*3,0],[-r*2,r],[-r,0],
    ]
    const curve = new THREE.CatmullRomCurve3(points.map(([x,y]) => new THREE.Vector3(x,y,0)), true, "catmullrom", .025)
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(480))
    return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color:"#D8C98F", transparent:true, opacity:.7, depthWrite:false }))
  }, [])
  return <primitive object={line}/>
}

function LogoInsetSolid({ name, position, color }: { name:SolidName; position:[number,number,number]; color:string }) {
  const ref = useRef<THREE.Mesh>(null)
  const shape = useMemo(() => geometry(name), [name])
  useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.x += delta * .22; ref.current.rotation.y += delta * .34 } })
  return <mesh ref={ref} geometry={shape} position={position} scale={.31} renderOrder={2}><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.5} opacity={.48} transparent metalness={.42} roughness={.28}/><Edges color={color} opacity={1} transparent/></mesh>
}

function LogoMark() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.y += delta * .11; ref.current.rotation.x += delta * .025 } })
  return <Float speed={.8} floatIntensity={.18}><group ref={ref} rotation={[-.08,.18,0]}>
    <ContinuousQuincunx/>
    <LogoInsetSolid name="octahedron" position={[0,LOGO_DIAMOND_OFFSET,0]} color="#D4AF37"/>
    <LogoInsetSolid name="cube" position={[0,-LOGO_DIAMOND_OFFSET,0]} color="#4A6741"/>
    <LogoInsetSolid name="tetrahedron" position={[LOGO_DIAMOND_OFFSET,0,0]} color="#C2542D"/>
    <LogoInsetSolid name="icosahedron" position={[-LOGO_DIAMOND_OFFSET,0,0]} color="#2BA8A0"/>
    <LogoInsetSolid name="dodecahedron" position={[0,0,0]} color="#6D4AFF"/>
  </group></Float>
}

function geometry(name: SolidName) { if (name === "tetrahedron") return new THREE.TetrahedronGeometry(1); if (name === "octahedron") return new THREE.OctahedronGeometry(1); if (name === "icosahedron") return new THREE.IcosahedronGeometry(1); if (name === "cube") return new THREE.BoxGeometry(1.35, 1.35, 1.35); return new THREE.DodecahedronGeometry(1) }
function Solid({ name, position, color, scale = 1, alwaysVisible = false }: SolidProps) { const ref = useRef<THREE.Mesh>(null); const shape = useMemo(() => geometry(name), [name]); useFrame((_state, delta) => { if (ref.current) { ref.current.rotation.x += delta * .08; ref.current.rotation.y += delta * .14 } }); return <Float speed={1.1} floatIntensity={.35}><mesh ref={ref} geometry={shape} position={position} scale={scale} renderOrder={alwaysVisible ? 5 : 0}><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.55} opacity={alwaysVisible ? .38 : .24} transparent roughness={.3} metalness={.4} depthTest={!alwaysVisible} depthWrite={!alwaysVisible}/><Edges color={color} opacity={1} transparent depthTest={!alwaysVisible} renderOrder={alwaysVisible ? 6 : 0}/></mesh></Float> }

export function PlatonicScene({ active = "all", height = 460, heroEarth = false }: { active?: SceneObject | "all"; height?: number; heroEarth?: boolean }) {
  const isHeroDodecahedron = heroEarth && active === "dodecahedron"
  const solids: SolidProps[] = active === "all" ? [{ name:"tetrahedron", position:[-2.6,1.5,0], color:"#C2542D" }, { name:"octahedron", position:[2.6,1.5,0], color:"#D4AF37" }, { name:"icosahedron", position:[-2.6,-1.5,0], color:"#2BA8A0" }, { name:"cube", position:[2.6,-1.5,0], color:"#4A6741" }, { name:"dodecahedron", position:[0,0,0], color:"#6D4AFF", scale:1.4 }] : active === "logo" ? [] : [{ name:active, position:[0,0,0], color: active === "tetrahedron" ? "#C2542D" : active === "octahedron" ? "#D4AF37" : active === "icosahedron" ? "#2BA8A0" : active === "cube" ? "#4A6741" : isHeroDodecahedron ? "#FF6FAE" : "#6D4AFF", scale:isHeroDodecahedron ? .825 : 2.2, alwaysVisible:isHeroDodecahedron }]
  return <div style={{ height }} className="w-full"><Canvas camera={{ position:[0,0,8], fov:48 }} dpr={[1,1.5]}><OrbitalStarField/><ambientLight intensity={.45}/><pointLight position={[5,6,5]} intensity={1.4} color="#F4E0A6"/><pointLight position={[-5,-4,3]} intensity={.7} color="#FF6FAE"/>{active === "logo" ? <LogoMark/> : solids.map((solid) => <Solid key={`${solid.name}-${solid.position[0]}`} {...solid}/>)}{isHeroDodecahedron ? <EarthWireframe/> : null}</Canvas></div>
}
