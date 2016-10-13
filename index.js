var babel = require("babel-core");

module.exports = function Babel(file, options) {

    // 设置默认值。
    options = Object.assign({
        filename: file.srcPath,
        sourceMaps: file.sourceMap,
        inputSourceMap: file.sourceMapObject,
        babelrc: false,
        compact: false
    }, options);

    // 更改扩展名。
    file.ext = ".js";

    // 生成。
    try {
        var result = babel.transform(file.content, options);
    } catch (e) {
        var log = {
            plugin: Babel.name,
            source: e.codeFrame,
            error: e
        };
        try {
            var m = /^(.*?): (.*)\s*\(\d+:\d+\)$/.exec(e.message);
            log.message = m[2];
            log.fileName = m[1];
            log.line = e.loc && e.loc.line - 1;
            log.column = e.loc && e.loc.column;
        } catch (e2) { }
        return file.error(log);
    }

    // 保存。
    file.content = result.code;
    if (result.map) {
        file.sourceMapObject = result.map;
    }
    file.ast = result.ast;
};
