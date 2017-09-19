(function (mod) {
	if (typeof exports === "object" && typeof module === "object") { // CommonJS
		mod(
			require("codemirror/lib/codemirror"),
			require("codemirror/mode/markdown/markdown"),
			require("codemirror/addon/hint/show-hint")
		);
	}
})(function (CodeMirror) {
	"use strict";

	CodeMirror.defineOption("autoSuggest", [], function (cm, value) {
		cm.on("inputRead", function (cm, change) {
			var mode = cm.getModeAt(cm.getCursor());

			for (var i = 0, len = value.length; i < len; i++) {
				if (mode.name === value[i].mode && change.text[0] === value[i].startChar) {
					cm.showHint({
						completeSingle: false,
						hint: function (cm) {
							var cur = cm.getCursor(),
								token = cm.getTokenAt(cur);
							var start = token.start + 1,
								end = token.end;
							return {
								list: value[i].listCallback(),
								from: CodeMirror.Pos(cur.line, start),
								to: CodeMirror.Pos(cur.line, end)
							};
						}
					});
				}
			}
		});
	});
});
