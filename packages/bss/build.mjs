import esbuild from 'esbuild';
import glob from 'glob';

// Use globbing to dynamically resolve entry points
const entryPoints = glob.sync('./src/**/*.ts');

const baseBuildOptions = {
    entryPoints, // Dynamically resolve all TypeScript files in the src directory
    outdir: './dist', // Output directory
    format: 'esm', // Generate ES modules
    sourcemap: true, // Enable source maps for debugging
    target: 'es2022', // JavaScript target
    treeShaking: true, // Enable tree-shaking for modular builds
    splitting: false, // Splitting is unnecessary for modular builds
    bundle: false, // Do not bundle files, preserve modular structure
    minify: false, // Disable minification in development for readability
    preserveSymlinks: true, // Ensure symlinks are respected
    outExtension: { '.js': '.mjs' }, // Use .mjs extension for clarity
};

// Function for regular build
export function build() {
    esbuild.build({
        ...baseBuildOptions,
        minify: true, // Minify output for production
        metafile: true, // Generate metadata for analysis
    })
        .then((result) => {
            console.log('Build succeeded');
            console.log('Bundle analysis:', result.metafile);
        })
        .catch((error) => {
            console.error('Build failed:', error);
            process.exit(1);
        });
}

// Function for development build with watch mode
export function buildDev() {
    esbuild.context({
        ...baseBuildOptions,
    }).then((context) => {
        context.watch(); // Watch for changes in source files
        console.log('Initial build succeeded. Watching for changes...');
    }).catch((error) => {
        console.error('Build failed:', error);
        process.exit(1);
    });
}

// Script handler
if (process.argv.includes('--dev')) {
    buildDev();
} else {
    build();
}
