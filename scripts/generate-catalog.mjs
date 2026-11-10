import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDirectory = path.join(root, "pages");
const mediaDirectory = path.join(root, "media");
const outputFile = path.join(root, "catalog.json");

function compareItems(a, b) {
  return a.label.localeCompare(b.label, "es", {
    numeric: true,
    sensitivity: "base"
  });
}

function toUrlPath(...segments) {
  return `/${segments.map(segment => encodeURIComponent(segment)).join("/")}`;
}

function fileKind(name) {
  const extension = path.extname(name).slice(1).toLowerCase();
  const kinds = {
    avif: "IMG", gif: "IMG", jpeg: "IMG", jpg: "IMG", png: "IMG", svg: "IMG", webp: "IMG",
    m4a: "AUD", mp3: "AUD", ogg: "AUD", wav: "AUD",
    mov: "VID", mp4: "VID", webm: "VID",
    pdf: "PDF"
  };
  return kinds[extension] || "FILE";
}

async function listProjects() {
  const entries = await readdir(pagesDirectory, { withFileTypes: true });
  const projects = [];

  for (const entry of entries) {
    if (entry.isFile() && /\.html$/i.test(entry.name)) {
      const name = entry.name.replace(/\.html$/i, "");
      projects.push({
        label: entry.name,
        path: toUrlPath("a", name),
        kind: "HTML"
      });
    } else if (entry.isDirectory()) {
      const nestedEntries = await readdir(path.join(pagesDirectory, entry.name), { withFileTypes: true });
      if (nestedEntries.some(nested => nested.isFile() && nested.name === "index.html")) {
        projects.push({
          label: entry.name,
          path: `${toUrlPath("a", entry.name)}/`,
          kind: "DIR"
        });
      }
    }
  }

  return projects.sort(compareItems);
}

async function listMedia() {
  const files = [];

  async function visit(directory, relativeSegments = []) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath, [...relativeSegments, entry.name]);
      } else if (entry.isFile()) {
        const segments = [...relativeSegments, entry.name];
        files.push({
          label: segments.join("/"),
          path: toUrlPath("media", ...segments),
          kind: fileKind(entry.name)
        });
      }
    }
  }

  await visit(mediaDirectory);
  return files.sort(compareItems);
}

const catalog = {
  pages: await listProjects(),
  media: await listMedia()
};

await writeFile(outputFile, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
console.log(`Generated catalog.json (${catalog.pages.length} projects, ${catalog.media.length} media files).`);
