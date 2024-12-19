import esbuild from 'esbuild';

const baseBuildOptions = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    format: 'esm',
    outdir: './dist',
    sourcemap: true,
    target: 'es2022',
    external: ['tone'],
    treeShaking: true, // Enable tree-shaking
    splitting: true, // Split output for better tree-shakability
    minify: true, // Minify the output for production
    outExtension: { '.js': '.mjs' }, // Use .mjs for module clarity
};

// Function for regular build
export function build() {
    esbuild.build(baseBuildOptions)
        .then(() => {
            console.log('Build succeeded');
        })
        .catch(() => process.exit(1));
}

// Function for development build with watch mode
export function buildDev() {
    esbuild.context({
        ...baseBuildOptions,
    }).then((context) => {
        context.watch();
        console.log('Initial build succeeded. Watching for changes...');
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}

// Script handler
if (process.argv.includes('--dev')) {
    buildDev();
} else {
    build();
}