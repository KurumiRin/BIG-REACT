import path from 'path';
import fs from 'fs';

// 将ts转译成js的plugin
import ts from 'rollup-plugin-typescript2';
// 解析cjs规范的plugin
import cjs from '@rollup/plugin-commonjs';

// 获取包地址
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包产物地址
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
    // 判断是产出路径还是获取包路径
    if (isDist) {
        return `${distPath}/${pkgName}`;
    }
    return `${pkgPath}/${pkgName}`;
}

export function getPackageJSON(pkgName) {
    // ...包路径
    const path = `${resolvePkgPath(pkgName)}/package.json`;
    const str = fs.readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(str);
}

// rollup plugin
export function getBaseRollupPlugins({ typescript = {} } = {}) {
    return [cjs(), ts(typescript)];
}
