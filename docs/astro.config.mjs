// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { defineConfig as defineViteConfig } from 'vite'; // Optional, for type checking
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inline Vite config
const viteConfig = defineViteConfig({
	resolve: {
		alias: {
			'@bss/sonic': path.resolve(__dirname, '../packages/bss/dist'),
		},
	},
	server: {
		watch: {
			ignored: ['!../packages/bss/dist/**'], // Ensure changes in the dist folder trigger reload
		},
	},
});

export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
	vite: viteConfig,
});
