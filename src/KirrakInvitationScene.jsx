import React, { useRef, Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Text, PerspectiveCamera, RoundedBox, Stars } from '@react-three/drei';
import gsap from 'gsap';
import kirrakImage from './assets/img.jpeg'; 

const InteractiveTicket = ({ seniorNumber, farewellDate, onDateClick }) => {
  const groupRef = useRef();
  const texture = useLoader(THREE.TextureLoader, kirrakImage);

  useFrame((state) => {
    if (!groupRef.current) return;
    const x = state.mouse.x * 0.15;
    const y = state.mouse.y * 0.08;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x, 0.1);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y, 0.1);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group 
        ref={groupRef}
        position={[0, -1.8, 0]} // Placed lower to clear the background faces
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <RoundedBox args={[3.2, 2.0, 0.1]} radius={0.08} smoothness={4}>
          <meshStandardMaterial map={texture} emissive="#000" metalness={0.8} roughness={0.2} />
        </RoundedBox>

        <Text position={[0, 0.7, 0.06]} fontSize={0.22} color="#FFD700" fontWeight="bold">KIRRAK FAREWELL</Text>
        <Text position={[0, 0.2, 0.06]} fontSize={0.1} color="#FFF">SPECIAL INVITE FOR</Text>
        <Text position={[0, -0.05, 0.06]} fontSize={0.25} color="#00ffcc" fontWeight="900">{seniorNumber}</Text>

        <group position={[0, -0.6, 0.06]} onClick={onDateClick}>
          <Text fontSize={0.18} color="#ff4d4d" fontWeight="bold">{farewellDate}</Text>
          <Text position={[0, -0.18, 0]} fontSize={0.07} color="#aaa">( CLICK TO OPEN )</Text>
          <mesh visible={false}><planeGeometry args={[2, 0.6]} /><meshBasicMaterial /></mesh>
        </group>
      </group>
    </Float>
  );
};

const KirrakInvitation = () => {
  const cameraRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const handleReveal = () => {
    gsap.to(cameraRef.current.position, {
      y: -1.8,
      z: 4,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => setShowModal(true) 
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas shadows gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 7]} fov={45} />
        <Stars radius={100} depth={50} count={1200} factor={4} fade speed={1} />
        <ambientLight intensity={1.8} />
        <Suspense fallback={null}>
          <InteractiveTicket seniorNumber="23A81A0656" farewellDate="30th MARCH" onDateClick={handleReveal} />
        </Suspense>
      </Canvas>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1 className="modal-title">🎬 KIRRAK PARTY 🎬</h1>
            
            <div className="quote-section">
              <p>"Every great story needs a finale, not because it's over, but because the characters have become legends. Our movie might be ending, but your soundtrack will play in these halls forever"</p>
              <span className="sub-quote">Let's celebrate the final chapter together.</span>
            </div>

            <div className="details-card">
              <div className="detail-row"><span className="label">WHEN:</span><span className="value">30th March | 2:00 PM</span></div>
              <div className="detail-row"><span className="label">WHERE:</span><span className="value">YNS Auditorium</span></div>
            </div>

            <button className="modal-btn" onClick={() => setShowModal(false)}>GET READY</button>
          </div>

          <style>{`
            .modal-overlay {
              position: absolute; inset: 0; background: rgba(0, 0, 0, 0.85);
              display: flex; justify-content: center; align-items: center;
              z-index: 5000; backdrop-filter: blur(12px);
            }
            .modal-content {
              background: linear-gradient(145deg, #151515, #000);
              border: 2px solid #FFD700; padding: 50px; border-radius: 20px;
              text-align: center; max-width: 580px; width: 90%;
              box-shadow: 0 0 50px rgba(255, 215, 0, 0.25);
              animation: cinemaReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              color: white; font-family: 'Georgia', serif;
            }
            .modal-title { color: #FFD700; font-size: 2.4rem; margin-bottom: 25px; letter-spacing: 5px; }
            .quote-section { margin-bottom: 30px; border-left: 4px solid #FFD700; padding-left: 25px; text-align: left; }
            .quote-section p { font-size: 1.5rem; font-style: italic; margin: 0; color: #fff; line-height: 1.4; }
            .sub-quote { font-size: 0.95rem; color: #777; display: block; margin-top: 8px; font-family: sans-serif; }
            .details-card { background: rgba(255, 255, 255, 0.04); padding: 30px; border-radius: 12px; margin-bottom: 40px; }
            .detail-row { display: flex; justify-content: space-between; margin: 12px 0; font-family: sans-serif; font-size: 1.2rem; }
            .label { color: #FFD700; font-weight: bold; }
            .value { color: #00ffcc; font-weight: 500; }
            .modal-btn {
              background: #FFD700; color: #000; border: none; padding: 18px 60px;
              border-radius: 50px; font-size: 1.2rem; font-weight: 900; cursor: pointer;
              transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
            }
            .modal-btn:hover { transform: scale(1.05); background: #fff; box-shadow: 0 12px 30px rgba(255, 215, 0, 0.5); }
            @keyframes cinemaReveal { from { transform: scale(0.85) translateY(30px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default KirrakInvitation;