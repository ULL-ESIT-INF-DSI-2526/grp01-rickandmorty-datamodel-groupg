import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para simular __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración: Carpetas que queremos incluir y extensiones
const CONFIG = {
  inputDirs: ['src', 'tests'], // Carpetas a escanear
  includeFiles: ['package.json', 'tsconfig.json', 'vitest.config.ts'], // Archivos sueltos
  outputFile: 'contexto_proyecto.txt',
  extensions: ['.ts', '.js', '.json']
};

let outputContent = "ESTRUCTURA DEL PROYECTO Y CÓDIGO FUENTE\n";
outputContent += "=========================================\n\n";

function readDirRecursive(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Ignorar node_modules, dist y carpetas ocultas
      if (file !== 'node_modules' && file !== 'dist' && !file.startsWith('.')) {
        readDirRecursive(fullPath);
      }
    } else {
      const ext = path.extname(file);
      if (CONFIG.extensions.includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        outputContent += `\n--- ARCHIVO: ${fullPath.replace(__dirname, '')} ---\n`;
        outputContent += "-------------------------------------------\n";
        outputContent += content;
        outputContent += "\n-------------------------------------------\n";
      }
    }
  });
}

console.log("🚀 Generando contexto del proyecto...");

// 1. Procesar carpetas principales
CONFIG.inputDirs.forEach(dir => {
  const fullPath = path.resolve(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    readDirRecursive(fullPath);
  }
});

// 2. Procesar archivos de configuración sueltos
CONFIG.includeFiles.forEach(file => {
  const fullPath = path.resolve(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    outputContent += `\n--- ARCHIVO: /${file} ---\n`;
    outputContent += "-------------------------------------------\n";
    outputContent += content;
    outputContent += "\n-------------------------------------------\n";
  }
});

// 3. Escribir el resultado
try {
  fs.writeFileSync(CONFIG.outputFile, outputContent);
  console.log(`✅ ¡Éxito! Archivo creado: ${CONFIG.outputFile}`);
} catch (err) {
  console.error(`❌ Error al escribir: ${err.message}`);
}