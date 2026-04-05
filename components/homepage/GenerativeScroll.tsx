"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

// SHADER
const bgVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const bgFragmentShader = `
uniform sampler2D uTexture;
uniform vec3 uBgColor;
varying vec2 vUv;
void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float darkness = 1.0 - texColor.r;
    float intensity = 0.25;
    vec3 color = mix(uBgColor, vec3(0.15, 0.15, 0.15), darkness * intensity);
    gl_FragColor = vec4(color, 1.0);
}
`;

const scrollVertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
    vUv = uv;
    float tension = sin(uv.x * 3.14159265);
    float elevation = sin(uv.x * 2.0 - uTime * 0.15) * 0.08;
    elevation += sin(uv.y * 3.0 + uTime * 0.1) * 0.02;
    vElevation = elevation * tension;
    float sag = (uv.x * (1.0 - uv.x)) * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z + vElevation - sag, 1.0);
}
`;

const scrollFragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;

void main() {
    vec2 scrolledUv = vUv * vec2(2.0, 2.0);
    scrolledUv.x += uTime * 0.01;
    vec4 texColor = texture2D(uTexture, scrolledUv);

    float distFromCenterX = abs(vUv.x - 0.5);
    float distFromCenterY = abs(vUv.y - 0.5);

    float overWatermarkX = smoothstep(0.4, 0.2, distFromCenterX);
    float overWatermarkY = smoothstep(0.35, 0.15, distFromCenterY);
    float overWatermark = overWatermarkX * overWatermarkY;

    float fadeX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
    float fadeY = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    float edgeMask = fadeX * fadeY;

    float distFromCenter = abs(vUv.y - 0.5) * 2.0;
    float volumeShadow = smoothstep(0.4, 1.0, distFromCenter);

    vec3 basePaperColor = vec3(0.96, 0.94, 0.90);
    vec3 shadowPaperColor = vec3(0.80, 0.78, 0.74);
    vec3 finalPaperColor = mix(basePaperColor, shadowPaperColor, volumeShadow * 0.6);

    float paperAlpha = 0.15 + (volumeShadow * 0.1) + (vElevation * 0.2);
    float inkWash = smoothstep(-0.05, 0.05, vElevation) * 0.3 + 0.6;
    float textAlpha = texColor.a * inkWash * 1.2;

    textAlpha *= mix(1.0, 0.3, overWatermark);

    vec3 inkColor = vec3(0.12, 0.12, 0.12);

    float finalAlpha = max(paperAlpha, textAlpha * 0.85) * edgeMask;
    vec3 finalColor = mix(finalPaperColor, inkColor, textAlpha);

    gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

const particleVertexShader = `
uniform float uTime;
uniform float uHovered;
attribute vec3 aTarget; 
varying vec2 vUv;

void main() {
    vUv = uv;
    
    vec3 midPoint = mix(position, aTarget, 0.5);
    vec3 chaos = midPoint + vec3(
        sin(uTime * 3.0 + position.x * 5.0),
        cos(uTime * 2.5 + position.y * 5.0),
        sin(uTime * 4.0 + position.z * 5.0)
    ) * 1.5;

    float toChaos = smoothstep(0.0, 0.5, uHovered);
    float toTarget = smoothstep(0.5, 1.0, uHovered);
    
    vec3 currentPos = mix(position, chaos, toChaos);
    currentPos = mix(currentPos, aTarget, toTarget);

    currentPos.y += sin(uTime * 1.5 + currentPos.x) * 0.1;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPos, 1.0);
    gl_PointSize = 2.0; 
}
`;

const particleFragmentShader = `
uniform float uHovered;
void main() {
    vec3 inkColor = vec3(0.12, 0.12, 0.12);
    vec3 vermilionColor = vec3(1.0, 0.25, 0.15);
    
    vec3 finalColor = mix(inkColor, vermilionColor, smoothstep(0.2, 0.8, uHovered));
    
    if (distance(gl_PointCoord, vec2(0.5)) > 0.5) discard;
    
    gl_FragColor = vec4(finalColor, 0.85); 
}
`;


// HELPER FUNCTIONS 1: Background pic
function BackgroundLayer({ bgColor }: { bgColor: THREE.Color }) {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            "/shanshui.jpg",
            (tex) => {
                tex.minFilter = THREE.LinearFilter;
                setTexture(tex);
            },
            undefined,
            (err) => console.error("Fail to load the image", err)
        );
    }, []);

    const uniforms = useMemo(() => ({
        uTexture: { value: texture },
        uBgColor: { value: bgColor },
    }), [texture, bgColor]);

    if (!texture) return null;

    return (
        <mesh position={[0, 0, -2.5]}>
            <planeGeometry args={[40, 20]} />
            <shaderMaterial
                vertexShader={bgVertexShader}
                fragmentShader={bgFragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}


// HELPER FUNCTIONS 2: Randomly generate code
function createCodeTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 2048; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const snippets = [
        "function buildDigitalShanshui(data) {",
        "const Yoki = new Architect({ bounds: 'Limitless' });",
        "// SYS_LOG: INITIALIZING CORE...",
        "return renderScroll(scroll);",
        "interface Archive { id: string; timestamp: number; }",
        "let hash = crypto.createHash('sha256').update(data);"
    ];

    for (let row = 0; row < 35; row++) {
        const y = row * 15;
        let x = Math.random() * -200;
        while (x < canvas.width) {
            const text = snippets[Math.floor(Math.random() * snippets.length)];
            const isDark = Math.random() > 0.8;
            ctx.font = isDark ? "bold 14px monospace" : "12px monospace";
            ctx.fillStyle = isDark ? "rgba(20, 20, 20, 0.9)" : "rgba(60, 60, 60, 0.35)";
            ctx.fillText(text, x, y);
            x += ctx.measureText(text).width + 80 + Math.random() * 150;
        }
    }

    ctx.fillStyle = "rgba(160, 40, 40, 0.5)";
    ctx.fillRect(1600, 400, 30, 30);
    ctx.font = "10px serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("秦語", 1604, 412);
    ctx.fillText("印彤", 1604, 424);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    return texture;
}


// HELPER FUNCTIONS 3: Particle name
function ParticleName() {
    const pointsRef = useRef<THREE.Points>(null!);
    const [hovered, setHovered] = useState(false);

    const { geometry } = useMemo(() => {
        if (typeof document === 'undefined') return { geometry: new THREE.BufferGeometry() };
        const canvas = document.createElement('canvas');
        canvas.width = 600; canvas.height = 150;
        const ctx = canvas.getContext('2d');
        if (!ctx) return { geometry: new THREE.BufferGeometry() };

        const getPoints = (text: string, font: string) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = font;
            ctx.fillText(text, 300, 75);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const points = [];
            for (let y = 0; y < canvas.height; y += 1) {
                for (let x = 0; x < canvas.width; x += 3) {
                    if (data[(y * canvas.width + x) * 4 + 3] > 128) {
                        points.push([(x - 300) / 70, -(y - 75) / 70, 0]); 
                    }
                }
            }
            return points;
        };

        const slenderP1pts = getPoints("YOKI QIN", "bold 45px sans-serif"); 
        const squareP2pts = getPoints("秦 語 彤", "bold 55px serif");    

        const count = Math.max(slenderP1pts.length, squareP2pts.length);
        const positions = new Float32Array(count * 3);
        const targets = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const p1 = slenderP1pts[i % slenderP1pts.length];
            const p2 = squareP2pts[i % squareP2pts.length];
            
            positions[i*3] = p1[0] - 1.5; 
            positions[i*3+1] = p1[1]; 
            positions[i*3+2] = (Math.random()-0.5)*0.2;
            
            targets[i*3] = p2[0] + 1.5; 
            targets[i*3+1] = p2[1]; 
            targets[i*3+2] = (Math.random()-0.5)*0.2;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3));
        return { geometry: geo };
    }, []);

    const uniforms = useRef({
        uTime: { value: 0 },
        uHovered: { value: 0 }
    });

    useFrame((state) => {
        if (pointsRef.current) {
            uniforms.current.uTime.value = state.clock.getElapsedTime();
            uniforms.current.uHovered.value = THREE.MathUtils.lerp(uniforms.current.uHovered.value, hovered ? 1 : 0, 0.05);
            pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, state.mouse.x * 0.05, 0.05);
            pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -state.mouse.y * 0.05, 0.05);
        }
    });

    return (
        <group position={[0, -2.8, 0.2]}> 
            <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} visible={false}>
                <planeGeometry args={[10, 2]} />
            </mesh>
            <points ref={pointsRef} geometry={geometry}>
                <shaderMaterial
                    vertexShader={particleVertexShader}
                    fragmentShader={particleFragmentShader}
                    uniforms={uniforms.current}
                    transparent={true}
                    depthWrite={false}
                />
            </points>
        </group>
    );
}


// Main Function
export default function GenerativeScroll() {
    const scrollRef = useRef<THREE.Mesh>(null!);
    const [codeTex, setCodeTex] = useState<THREE.CanvasTexture | null>(null);

    const bgColor = useMemo(() => new THREE.Color("#F5F5F3"), []);

    useEffect(() => {
        setCodeTex(createCodeTexture());
    }, []);

    const scrollUniforms = useRef({
        uTime: { value: 0 },
        uTexture: { value: codeTex },
    });

    useEffect(() => {
        if (codeTex) scrollUniforms.current.uTexture.value = codeTex;
    }, [codeTex]);

    useFrame((state) => {
        if (scrollRef.current) {
            scrollUniforms.current.uTime.value = state.clock.getElapsedTime();
            scrollRef.current.rotation.y = THREE.MathUtils.lerp(scrollRef.current.rotation.y, state.mouse.x * 0.03, 0.05);
            scrollRef.current.rotation.x = THREE.MathUtils.lerp(scrollRef.current.rotation.x, -state.mouse.y * 0.03, 0.05);
        }
    });

    if (!codeTex) return null;

    return (
        <group>
            <BackgroundLayer bgColor={bgColor} />

            {/* (1) Title */}
            <Html
                position={[0, 0, -1]}
                center
                style={{
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 0
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    userSelect: 'none'
                }}>
                    <h1 style={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: '8vw',
                        fontWeight: 100,
                        color: 'rgba(26, 26, 26, 0.03)',
                        margin: '0',
                        letterSpacing: '-0.02em',
                        lineHeight: 1
                    }}>
                        HELLO WORLD
                    </h1>

                    <div style={{
                        marginTop: '-1rem',
                        display: 'flex',
                        alignItems: 'baseline'
                    }}>
                        <span style={{
                            fontFamily: 'serif',
                            fontSize: '3vw',
                            color: 'rgba(160, 40, 40, 0.08)',
                            marginRight: '2rem',
                            fontWeight: 200
                        }}>
                            //
                        </span>
                        <span style={{
                            fontFamily: '"Songti SC", "STSong", "SimSun", serif',
                            fontSize: '6vw',
                            fontWeight: 300,
                            color: 'rgba(26, 26, 26, 0.05)',
                            letterSpacing: '1.5rem'
                        }}>
                            你好
                        </span>
                    </div>
                </div>
            </Html>

            {/* (2) Scroll */}
            <mesh ref={scrollRef} position={[0, 0, 0.5]}>
                <planeGeometry args={[20, 4.5, 128, 64]} />
                <shaderMaterial
                    vertexShader={scrollVertexShader}
                    fragmentShader={scrollFragmentShader}
                    uniforms={scrollUniforms.current}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* (3) Particle name */}
            <ParticleName />
        </group>
    );
}