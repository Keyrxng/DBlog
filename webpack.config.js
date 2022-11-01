const path = require("path");

module.exports = {
	//...
	resolve: {
		alias: {
			wagmi$: {'/node_modules/wagmi'},
			modules: ["node_modules"],
		},
	},
};
