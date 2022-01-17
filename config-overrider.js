const {override,fixBabelImports,addLessLoader} = require("customize-cra");

module.exports = override(
    // 实现按需打包
    fixBabelImports("import",{
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
    }),
    addLessLoader({
        javascriptEnable: true,
        modifyVars: {'@primary-color':'#1DA57A'},
    })
);