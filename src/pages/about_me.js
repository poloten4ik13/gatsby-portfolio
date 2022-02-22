import * as THREE from 'three'
import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { Reflector, CameraShake, OrbitControls, useTexture, Stars } from "@react-three/drei"
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import Layout from "../component/Layout"
import { graphql, useStaticQuery } from "gatsby"
import Button from "../component/Button"


const query = graphql`
  {
    allFile(sort: {fields: name}, filter: {absolutePath: {regex: "/svgFolder/"}}) {
      totalCount
      nodes {
        name
        publicURL
      }
    }
  }
`


function Triangle({ color, svg, ...props}) {
  const ref = useRef()
  const [r] = useState(() => Math.random() * 10000)
  useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10))
  const {paths} = useLoader(SVGLoader, svg)

  let geometry;
  let arr = [];

  paths.forEach((path, i) => {
    const shapes = path.toShapes(true);
     shapes.forEach((shape, j) => {
       arr.push(shape)
  })
   })

  geometry = new THREE.ShapeGeometry(arr)

  return (
    <group ref={ref}>
      <mesh geometry={geometry} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Rig({ children }) {
  const ref = useRef()
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
  })
  return <group ref={ref}>{children}</group>
}



const About = () => {
  const { allFile: {nodes}} = useStaticQuery(query);

  function Ground(props) {
    const [floor, normal] = useTexture([ nodes[0].publicURL, nodes[1].publicURL])
    return (
      <Reflector resolution={1024} args={[8, 8]} {...props}>
        {(Material, props) => <Material color="#f0f0f0" metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
      </Reflector>
    )
  }

  return (
    <>
      <Layout>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.75} />
        <Stars radius={300} depth={10} count={1000} factor={10} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Suspense fallback={null}>
          <Rig>
            <Triangle color="#ff2060" scale={0.009} svg={nodes[5].publicURL} position={[1, 0, 0]} rotation={[0, 0, Math.PI / 3]} />
            <Triangle color="cyan" scale={0.009}  svg={nodes[2].publicURL} position={[3, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
            <Triangle color="orange" scale={0.009} svg={nodes[3].publicURL}  position={[-1, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
            <Triangle color="white" scale={0.009} svg={nodes[6].publicURL} position={[1, 2, -10]} rotation={[0, 0, Math.PI / 3]} />
            <Triangle color="#58E854" scale={0.009} svg={nodes[4].publicURL} position={[6, 0.8, -5]} rotation={[0, 0, Math.PI / 3]} />
            <Ground mirror={1} args={[25, 15]}  blur={[900, 100]}  mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-1.2} />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom kernelSize={1} luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.3} />
            <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.2} />
          </EffectComposer>
        </Suspense>
        <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} />
      </Canvas>
        <div className="about-main">
          <h1>The great pleasure introduce my self!</h1>
          <p>I’m a Front-End Developer located in Ukraine(Kyiv).<br/> I have a serious passion for UI,
            animations and creating intuitive, <br/>dynamic user experiences. I want to improve my coding skills,
            <br/> as well as learn new technologies in real projects.</p>
          <p>I`m well-organised person, problem solver, independent<br/>  employee with high attention to detail.
            Fan of Snowboarding,<br/>  Kitesurfing, Surfing and Chess.</p>
          <p>Interested in the entire frontend spectrum and working <br/> on ambitious projects with positive people.</p>
          <Button string1={"CONTACT ME!"} string2={"PRESS ME"} />
        </div>
      </Layout>
    </>
  )
}

export default About

