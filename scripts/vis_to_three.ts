import fs from "fs";
import { join } from "path";
import OpenAI from "openai";



// # 2 | import { castToError } from "./core.mjs";
// #3 | export class OpenAIError extends Error {
// #4 | }
// #5 | export class APIError extends OpenAIError {
// #6 |     constructor(status, error, message, headers) {
// #7 |         super(`${APIError.makeMessage(status, error, message)}`);
// #                         ^
// # error: 400 You uploaded an unsupported image. Please make sure your image has of one the following formats: ['png', 'jpeg', 'gif', 'webp'].





const fileUrl = "https://raw.githubusercontent.com/adnanwahab/homelab/refs/heads/main/web/public/vis/image-1734920932306.png";

// Initialize OpenAI client

// process.env.OPENAI_API_KEY


const openai = new OpenAI({
  apiKey: apiKey
});

function parseAIResponse(response: string): string {
  // Look for code blocks between ```javascript or ```js tags
  const codeBlockRegex = /```(?:javascript|js)\n([\s\S]*?)```/;
  const match = response.match(codeBlockRegex);
  
  if (!match) {
    // Fallback if no code block found - return basic scene setup
    return `
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
    `;
  }
  
  return match[1].trim();
}

async function generateThreejsComponent(imagePath: string) {
  const imageBytes = fs.readFileSync(imagePath);
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o",  // Updated to correct model name
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBytes.toString('base64')}`
            }
          },
          {
            type: "text",
            text: "Generate only the JavaScript code for a ThreeJS visualization of this image. Return only the code that goes inside the useEffect, after scene setup and before the animate function. Use only ThreeJS commands and JavaScript. Do not include any explanation text or markdown formatting."
          }
        ]
      }
    ],
    //max_tokens: 4096
  });

  const aiResponse = response.choices[0].message.content;
  return parseAIResponse(aiResponse);
}

async function main() {
  const imagesDir = join('..', 'web', 'public', 'vis');
  const outputDir = join('..', 'web', 'src', 'app', 'vis');

  // Read first 3 images from directory
  const imagePaths = fs.readdirSync(imagesDir)//.slice(0, 3);

  for (const [idx, imgPath] of imagePaths.entries()) {
    const fullImgPath = join(imagesDir, imgPath);
    if (fs.statSync(fullImgPath).isFile()) {
      const componentCode = await generateThreejsComponent(fullImgPath);
      const outputFile = join(outputDir, String(idx), 'page.tsx');
      
      console.log(outputFile);
      
      // Create component template
      const finalComponent = `
      "use client"
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Visualization() {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const renderer = new THREE.WebGLRenderer({canvas})
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        ${componentCode}

        camera.position.z = 5

        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        function handleResize() {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}`;

      // Ensure directory exists
      fs.mkdirSync(join(outputDir, String(idx)), { recursive: true });
      fs.writeFileSync(outputFile, finalComponent);
    }
  }
}

main().catch(console.error);
