import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import { warppEnv } from './src/utils/gitEnv'
// import { threadId } from 'worker_threads'

// https://vite.dev/config/
export default defineConfig((mode: ConfigEnv):UserConfig=>{
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = warppEnv(env)
  return{
    plugins: [
      react(),
      viteEnv.VITE_USE_COMPRESS && viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html)$/i,
        // gzipOptions: {
        //   level: 9,
        // },
        // brotliOptions: {

        // }
      }),
      WindiCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: {
        // '/api': {
        //   target: viteEnv.VITE_API_URL,
        //   changeOrigin: true,
        //   rewrite: (path)=>path.replace(/^\/api/,''),
        // }
      }
    },
    build: {
      outDir: 'dist',
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: viteEnv.VITE_DROP_CONSOLE,
      //     drop_debugger: true,
      //   }
      // }
      minify: 'esbuild',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
      }
    },
    base: '/vite-ts-road/',
  }
})
