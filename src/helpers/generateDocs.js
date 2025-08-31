import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// --- CONFIGURATION ---
const PROJECT_DIR = '../../functional-tests/'; // Your framework folder
const OUTPUT_DIR = './docs/';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set your API key in env

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

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

// --- STEP 2: Generate documentation using OpenAI ---
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

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 3000
  });

  return response.choices[0].message.content;
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