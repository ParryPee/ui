import fs from "node:fs";
import path from "node:path";

const REGISTRY_PATH = "./registry";
const OUTPUT_FILE = path.join(REGISTRY_PATH, "__index__.tsx");
const STYLE_NAME = "8starlabs-ui";
const COMPONENT_FOLDERS = ["blocks"];

function getComponentFiles(folder: string) {
  const dir = path.join(REGISTRY_PATH, STYLE_NAME, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(
      (f) => f.endsWith(".tsx") && !f.startsWith("_") && !f.startsWith("__")
    )
    .map((f) => ({
      name: path.basename(f, ".tsx"),
      importPath: `@/registry/${STYLE_NAME}/${folder}/${f.replace(/\.tsx$/, "")}`,
      filePath: `registry/${STYLE_NAME}/${folder}/${f}`,
      type: `registry:ui`
    }));
}

const allComponents: {
  name: string;
  importPath: string;
  filePath: string;
  type: string;
}[] = [];
for (const folder of COMPONENT_FOLDERS) {
  allComponents.push(...getComponentFiles(folder));
}

let imports = "";
let indexEntries = "";

for (const { name, importPath, filePath, type } of allComponents) {
  const varName = `${name.replace(/[^a-zA-Z0-9]/g, "_")}_component`;
  imports += `import ${varName} from "${importPath}";\n`;
  indexEntries += `    "${name}": {
      name: "${name}",
      type: "registry:ui",
      files: [{
        path: "${filePath}",
        type: "registry:ui",
        target: ""
      }],
      component: ${varName}
    },\n`;
}

const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
${imports}
export const Index: Record<string, any> = {
  "${STYLE_NAME}": {
${indexEntries}  }
};
`;

fs.writeFileSync(OUTPUT_FILE, fileContent, "utf8");
console.log(`✅ Generated ${OUTPUT_FILE}`);
