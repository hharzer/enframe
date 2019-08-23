#! /usr/bin/env node

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"E11i":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("fs"),t=require("./enframe"),r=function(){t.enframeExec("yarn add "+["typescript","ts-node","@types/node","parcel","express","@types/express","ts-node","react","@types/react","react-dom","@types/react-dom","compression","@types/compression","helmet","@types/helmet"].join(" ")),t.enframeExec("yarn add --dev "+["prettier","eslint","eslint-config-prettier","eslint-plugin-prettier","@typescript-eslint/eslint-plugin","@typescript-eslint/parser","mocha","@types/mocha","enzyme","@types/enzyme","chai","@types/chai","enzyme-adapter-react-16","@types/enzyme-adapter-react-16","chai-enzyme","@types/chai-enzyme","cypress","onchange"].join(" "))},s=function(){var r=require(t.rootDir("package.json")),s=r.scripts?r.scripts:{};s.build="parcel build src/front/index.html",s.start="ts-node src/back/server.ts",s.test="mocha",s.cy="yarn cypress open",s.watch="onchange 'src/**' -- yarn build && yarn start",r.scripts=s,e.writeFileSync(t.rootDir("package.json"),JSON.stringify(r,null,2)+"\n")};exports.packageJsonMaker=function(){r(),s()};
},{"./enframe":"xsr0"}],"hz+C":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe");exports.enframeConfig=require(e.rootDir("enframe.json"));
},{"./enframe":"xsr0"}],"ioA1":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),n=require("child_process"),t=require("./enframeConfig"),i=t.enframeConfig.gitlabRemoteSSH,r=function(){return e.commandDoesNotError("git status")},o=function(){return!n.execSync("git status --porcelain",{encoding:"utf8"})},c=function(){return r()&&o()};exports.gitInit=function(){r()||e.enframeExec("git init")};var u=function(){return n.execSync("git remote",{encoding:"utf8"}).includes("origin")};exports.gitPush=function(){c()?(e.enframeExec("git add ."),e.enframeExec('git commit -m "Enframe commit."'),u()?e.enframeExec("git push origin master"):(e.enframeExec("git remote add origin "+i),e.enframeExec("git push --set-upstream origin master"))):console.log("No git changes have been detected. Skipping Enframe git push sequence.")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"i9Mb":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),r=require("./enframeConfig"),o=r.enframeConfig.appName;exports.herokuMaker=function(){(function(){return e.commandDoesNotError("heroku")})||console.log("You do not have the Heroku CLI installed. Skipping Enframe Heroku App creation sequence.\n"),e.commandDoesNotError("heroku apps:info "+o+"-staging")||e.enframeExec("heroku apps:create "+o+"-staging"),e.commandDoesNotError("heroku apps:info "+o+"-prod")||e.enframeExec("heroku apps:create "+o+"-prod")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"J+wu":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var r=require("fs"),e=require("./enframe"),n=require("./enframeConfig"),i=function(n){n.forEach(function(n){r.copyFileSync(e.enframeDir(n),e.rootDir(n)),e.logAdd(n)})},o=n.enframeConfig.appName,t=function(){return r.readFileSync(e.enframeDir(".gitlab-ci.yml"),"utf8").replace(/ENFRAME_APP_NAME/g,o)},c=function(){i(["tsconfig.json",".prettierrc",".eslintrc.json",".mocharc.json","LICENSE","cypress.json"]),r.copyFileSync(e.enframeDir("gitignore"),e.rootDir(".gitignore")),e.logAdd(".gitignore"),r.writeFileSync(e.rootDir(".gitlab-ci.yml"),t()),e.logAdd(".gitlab-ci.yml")},s=function(){r.mkdirSync(e.rootDir("src/back"),{recursive:!0}),e.logAdd("src/back")},f=function(){i(["src/back/server.ts"])},a=function(){r.mkdirSync(e.rootDir("src/front"),{recursive:!0}),e.logAdd("src/front")},l=function(){i(["src/front/App.test.tsx","src/front/App.tsx","src/front/index.html","src/front/index.tsx","src/front/stylesheet.css"])},u=function(){r.existsSync(e.rootDir("src/back"))||s(),r.existsSync(e.rootDir("src/front"))||a(),f(),l()};exports.fileMaker=function(){c(),u()};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"xsr0":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("path"),r=e.join(process.cwd(),"node_modules/enframe");exports.enframeDir=function(n){return e.join(r,n)},exports.rootDir=function(r){return e.join(process.cwd(),r)};var n=require("child_process"),o=require("./packageJsonMaker"),t=require("./git"),i=require("./herokuMaker"),c=require("./fileMaker");exports.logAdd=function(e){console.log("Enframe has added or updated "+e)},exports.enframeExec=function(e,r){console.log("Enframe is executing: "+e+"\n");var o={encoding:"utf8"};r&&(o.stdio="inherit");var t=n.execSync(e,o);t&&console.log(t)},exports.commandDoesNotError=function(e){try{return n.execSync(e,{encoding:"utf8",stdio:"ignore"}),!0}catch(r){return!1}};var a=function(){return n.execSync("cat package.json",{encoding:"utf8"}).includes('"name":')},s=function(){t.gitInit(),a()||exports.enframeExec("yarn init",!0),c.fileMaker(),o.packageJsonMaker(),i.herokuMaker(),t.gitPush()};s();
},{"./packageJsonMaker":"E11i","./git":"ioA1","./herokuMaker":"i9Mb","./fileMaker":"J+wu"}]},{},["xsr0"], null)
//# sourceMappingURL=/enframe.js.map