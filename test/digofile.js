var digo = require("digo");

exports.default = function () {
	digo.src("fixtures/*.es").pipe("../").dest("_build");
};
