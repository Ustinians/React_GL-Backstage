const {override,fixBabelImports} = require("customize-cra");

module.exports = override(
    // 实现按需打包
    fixBabelImports("import",{
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
    }),
);