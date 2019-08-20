#! /usr/bin/env node

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"e4+p":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("fs"),r=require("./enframe"),o=["LICENSE","CODE_OF_CONDUCT.md","tsconfig.json",".prettierrc",".eslintrc.json"],i=function(e){console.log("Enframe has added or updated the file: "+e+".")};exports.copyFiles=function(){o.forEach(function(o){e.copyFileSync(r.enframeDir(o),r.rootDir(o)),i(o)}),e.copyFileSync(r.enframeDir("gitignore"),r.rootDir(".gitignore")),i(".gitignore")};
},{"./enframe":"xsr0"}],"lVn/":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),t=["typescript","ts-node","@types/node","parcel"],n=["prettier","eslint","eslint-config-prettier","eslint-plugin-prettier","@typescript-eslint/eslint-plugin","@typescript-eslint/parser"],r=function(t,n){e.enframeExec("yarn add "+(t?"--dev":"")+" "+n)};exports.addDependencies=function(){t.forEach(function(e){r(!1,e)}),n.forEach(function(e){r(!0,e)})};
},{"./enframe":"xsr0"}],"/CCQ":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var r=require("fs"),e=require("./enframe");exports.updatePackJsonScripts=function(){delete require.cache[require.resolve(e.rootDir("package.json"))];var s,t=require(e.rootDir("package.json"));(s=t.scripts?t.scripts:{}).build="parcel build src/front/index.html",s.start="ts-node src/back/server.ts",t.scripts=s,r.writeFileSync(e.rootDir("package.json"),JSON.stringify(t,null,2)+"\n")};
},{"./enframe":"xsr0"}],"xsr0":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("fs"),r=require("child_process"),o=require("./copyFiles"),n=require("./addDependencies"),i=require("./updatePackJsonScripts"),t=require("path");exports.enframeDir=function(e){return t.join(t.join(process.cwd(),"node_modules/enframe"),e)},exports.rootDir=function(e){return t.join(process.cwd(),e)};var s=require(exports.rootDir("package.json"));exports.enframeExec=function(e,o){console.log("Enframe is attempting to execute: "+e+"\n");var n={encoding:"utf8"};o&&(n.stdio="inherit");var i=r.execSync(e,n);i&&console.log(i)};var c=function(){console.log("Enframe is adding the folders: src, src/back, and src/front"),e.mkdirSync(exports.rootDir("src/back"),{recursive:!0}),e.mkdirSync(exports.rootDir("src/front"),{recursive:!0})},a=function(){e.existsSync(exports.rootDir(".git/"))||exports.enframeExec("git init")},u=function(){s.name||exports.enframeExec("yarn init",!0)},p=function(){e.existsSync(exports.rootDir("src/"))||c()},d=function(){a(),u(),p(),o.copyFiles(),n.addDependencies(),i.updatePackJsonScripts()};d();
},{"./copyFiles":"e4+p","./addDependencies":"lVn/","./updatePackJsonScripts":"/CCQ"}]},{},["xsr0"], null)
//# sourceMappingURL=/enframe.js.map