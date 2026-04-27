import { readdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const dirs = [
  join(root, 'src/components'),
  join(root, 'src/layouts'),
  join(root, 'src/react-components'),
];

for (const dir of dirs) {
  const exports = readdirSync(dir)
    .filter(f => f.endsWith('.astro') || f.endsWith('.tsx'))
    .map(f => {
      const name = f.replace(/\.(astro|tsx)$/, '');
      return `export { default as ${name} } from './${f}';`;
    })
    .join('\n');

  writeFileSync(join(dir, 'index.ts'), exports + '\n');
  console.log(`updated ${dir}/index.ts`);
}
