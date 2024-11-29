import {defineConfig} from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({mode}) => {
  return {
    build: {
      minify: 'esbuild',
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'wj-loading',
        fileName: (format) => `wj-loading.${format}.js`,
      },
      rollupOptions: {
        external: ["src/main.ts"], // 指定外部依赖，如果没有依赖可留空,
      },
    },
    esbuild: {
      drop: mode === 'development' ? [] : ['console', "debugger"]
    },
    plugins: [
      dts({
        rollupTypes: true,
        tsconfigPath: './tsconfig.json',
        entryRoot: 'src',          // 类型文件的入口目录
        outDir: 'dist/types',   // 类型文件的输出目录
        logLevel: 'info',      // 打印诊断信息
        exclude: ['src/main.ts']
      })
    ],
  }
});