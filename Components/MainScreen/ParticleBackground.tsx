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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)"); 
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.4)"); 
      grad.addColorStop(1, "rgba(255, 255, 255, 0)"); 
      ctx.fillStyle = grad; ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const count = 15000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const waveData = new Float32Array(count * 3);
    const globeData = new Float32Array(count * 3);
    const randomFactors = new Float32Array(count); // For organic movement

    const colorPalette = [
      new THREE.Color("#320c03"),
      new THREE.Color("#90220a"),
      new THREE.Color("#ee502c")
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // 1. TOP CANOPY
      waveData[i3] = (Math.random() - 0.5) * 65; 
      waveData[i3+1] = 7 + (Math.random() * 4); 
      waveData[i3+2] = (Math.random() - 0.5) * 20;

      // 2. GLOBE (Target positions)
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 6.5;
      globeData[i3] = radius * Math.cos(theta) * Math.sin(phi);
      globeData[i3+1] = radius * Math.sin(theta) * Math.sin(phi);
      globeData[i3+2] = radius * Math.cos(phi);

      positions[i3] = waveData[i3];
      positions[i3+1] = waveData[i3+1];
      positions[i3+2] = waveData[i3+2];

      randomFactors[i] = Math.random();

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = chosenColor.r; colors[i3+1] = chosenColor.g; colors[i3+2] = chosenColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      transparent: true,
      vertexColors: true,
      map: createParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    
    camera.position.z = 18;
    camera.position.y = 2;

    const state = { morph: 0 };

    gsap.to(state, {
      morph: 1,
      scrollTrigger: {
        trigger: "#sticky-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      }
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const posArr = geometry.attributes.position.array as Float32Array;

      // CAMERA POSITION MOVES WITH SCROLL
      camera.position.y = THREE.MathUtils.lerp(2, 0, state.morph);

      // WE DO NOT ROTATE points.rotation.y ANYMORE!
      // This keeps the Canopy state perfectly stable.

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const morph = state.morph;

        // 1. DYNAMIC WAVE (CANOPY)
        const waveScale = (1 - morph);
        const swell = Math.sin(waveData[i3] * 0.2 + time * 0.5) * Math.cos(waveData[i3+2] * 0.2 + time * 0.5);
        const fluidY = waveData[i3+1] + (swell * 1.5 * waveScale);

        // 2. ROTATING GLOBE TARGET
        // We calculate the rotation ONLY for the globe targets
        const rotSpeed = time * 0.15 + morph * 2.0; // Faster spin as it forms
        const gx = globeData[i3];
        const gy = globeData[i3+1];
        const gz = globeData[i3+2];

        // Apply Y-axis rotation matrix to the globe point
        const cosR = Math.cos(rotSpeed);
        const sinR = Math.sin(rotSpeed);
        const rotatedGX = gx * cosR - gz * sinR;
        const rotatedGZ = gx * sinR + gz * cosR;

        // 3. ORGANIC CONVERGENCE
        // Add a bit of "float" noise so they don't move in perfectly straight lines
        const noise = Math.sin(time + i) * 0.1 * morph;

        // 4. LERP FROM WAVE TO ROTATING GLOBE
        posArr[i3] = THREE.MathUtils.lerp(waveData[i3], rotatedGX + noise, morph);
        posArr[i3+1] = THREE.MathUtils.lerp(fluidY, gy + noise, morph);
        posArr[i3+2] = THREE.MathUtils.lerp(waveData[i3+2], rotatedGZ + noise, morph);
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-50 bg-black pointer-events-none" />;
}