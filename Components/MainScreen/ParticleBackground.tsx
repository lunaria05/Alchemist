// Components/MainScreen/ParticleBackground.tsx
"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Particle Configuration
    const count = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const wavePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;
      const y = Math.sin(x * 0.5) * 2; // Initial Wave

      positions[i * 3] = x;
      positions[i * 3 + 1] = y + 5; // Start at the top
      positions[i * 3 + 2] = z;

      wavePositions[i * 3] = x;
      wavePositions[i * 3 + 1] = y;
      wavePositions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xee502c,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 15;

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      const posArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = posArr[i * 3];
        // Only animate Y for wave effect
        posArr[i * 3 + 1] += Math.sin(time + x) * 0.005;
      }
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-black" />;
}