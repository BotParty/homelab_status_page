import fs from "fs";
import path from "path";
import { Ollama } from "ollama";

const ollama = new Ollama();

//code undrstnading

// Agent 1: Unused File Marker
async function findUnusedFiles(directory) {
  const files = getAllFiles(directory);
  const unusedFiles = [];

  for (const file of files) {
    const fileContent = fs.readFileSync(file, "utf-8");
    const response = await ollama.generate({
      model: "codellama",
      prompt: `Analyze the following file and determine if it's used or not in the project. Consider imports, function calls, and references. Respond with only "USED" or "UNUSED":\n\n${fileContent}`,
    });

    const result = response.trim().toUpperCase();
    if (result === "UNUSED") {
      unusedFiles.push(file);
    }
  }

  return unusedFiles;
}

function getAllFiles(directory) {
  let files = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

// Agent 2: Directory Simplification Suggestor
async function suggestDirectorySimplifications(directory) {
  
}

// Agent 3: Comment Quality Evaluator
async function evaluateComments(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const response = await ollama.generate({
    model: "codellama",
    prompt: `Evaluate the following code comments and suggest improvements or removal of unnecessary ones:\n\n${fileContent}`,
  });
  // Process the response and return suggestions
}

// Agent 4: Function Complexity Analyzer
async function analyzeFunctionComplexity(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const response = await ollama.generate({
    model: "codellama",
    prompt: `Analyze the following code for complex functions and suggest simplifications:\n\n${fileContent}`,
  });
  // Process the response and return suggestions
}

// Agent 5: Dead Code Detector
async function findDeadCode(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const response = await ollama.generate({
    model: "codellama",
    prompt: `Identify dead code or unused imports in the following code:\n\n${fileContent}`,
  });
  // Process the response and return suggestions
}

// Save suggestions to JSON files
function saveSuggestions(suggestions, filename) {
  const outputFolder = "output";
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  const reportPath = path.join(outputFolder, filename);
  fs.writeFileSync(reportPath, JSON.stringify(suggestions, null, 2));
}

// Main function to run all agents
async function runAllAgents(directory) {
  const unusedFiles = await findUnusedFiles(directory);
  saveSuggestions({ unused_files: unusedFiles }, "unused_files.json");

  const directorySuggestions = await suggestDirectorySimplifications(directory);
  saveSuggestions({ directory_suggestions: directorySuggestions }, "directory_suggestions.json");

  // ... run other agents and save their suggestions ...
}

// Bun server
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname.startsWith("/suggestions/")) {
      const filename = url.pathname.split("/").pop();
      const filePath = path.join("output", filename);
      if (fs.existsSync(filePath)) {
        return new Response(fs.readFileSync(filePath));
      }
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);

// Run the agents
runAllAgents("path/to/your/project");
