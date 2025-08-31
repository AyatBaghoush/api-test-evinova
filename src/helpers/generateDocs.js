import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import axios from 'axios';

// --- CONFIGURATION ---
const PROJECT_DIR = './functional-tests/'; // Your framework folder
const OUTPUT_DIR = './docs/';
//const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set your API key in env
const key = process.env.OPENAI_API_KEY


// --- UTILITY: Read all JS/TS files recursively ---
function readFiles(dir) {
  let filesContent = '';
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      filesContent += readFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.ts')) {
      filesContent += `\n\n// File: ${fullPath}\n`;
      filesContent += fs.readFileSync(fullPath, 'utf8');
    }
  });
  return filesContent;
}

// --- STEP 1: Collect all code from framework ---
const codeContent = readFiles(PROJECT_DIR);
async function generateDocumentation(code) {
  const prompt = `
You are a developer documentation generator.
Generate detailed Markdown documentation for the following SuperTest + Cucumber test framework.
Include sections:
1. Overview of the framework
2. Setup instructions
3. Test Scenarios description
4. Utilities and helpers
5. How to run the tests
6. Any notes or best practices
Format as clean Markdown ready to be used in Mintlify.

Code:
${code}
  `;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command',
        prompt: prompt,
        max_tokens: 3000,
        temperature: 0.5,
        k: 0,
        p: 1,
        stop_sequences: [],
        return_likelihoods: 'NONE'
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.generations[0].text;
  } catch (error) {
    console.error('❌ Error calling Cohere:', error.response?.data || error.message);
    return '';
  }
}
// --- STEP 3: Save generated Markdown ---
async function saveDocs() {
  try {
    const markdown = await generateDocumentation(codeContent);

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const filePath = path.join(OUTPUT_DIR, 'framework-docs.mdx');
    fs.writeFileSync(filePath, markdown);

    console.log(`✅ Documentation generated at: ${filePath}`);
  } catch (error) {
    console.error('❌ Error generating documentation:', error);
  }

}



saveDocs();
