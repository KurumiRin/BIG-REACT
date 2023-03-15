import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name, module } = getPackageJSON('react');

// react包的路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDisPath = resolvePkgPath(name, true);
export default [
    // react
    {
        // 输入路径
        input: `${pkgPath}/${module}`,
        // 输出路径
        output: {
            file: `${pkgDisPath}/index.js`,
            name: 'index.js',
            // 兼容cjs和ESM
            format: 'umd'
        },
        // 打包插件
        plugins: [
            ...getBaseRollupPlugins(),
            generatePackageJson({
                inputFolder: pkgPath,
                outputFolder: pkgDisPath,
                // 自定义需要打包的packagejson字段
                baseContents: ({ name, description, version }) => ({
                    name,
                    description,
                    version,
                    // 输出产物的入口
                    main: 'index.js'
                })
            })
        ]
    },
    // jsx-runtime
    {
        input: `${pkgPath}/src/jsx.ts`,
        output: [
            // jsx-runtime
            {
                file: `${pkgDisPath}/jsx-runtime.js`,
                name: 'jsx-runtime.js',
                format: 'umd'
            },
            // jsx-dev-runtime
            {
                file: `${pkgDisPath}/jsx-dev-runtime.js`,
                name: 'jsx-dev-runtime.js',
                format: 'umd'
            }
        ],
        // 打包插件
        plugins: getBaseRollupPlugins()
    }
];
