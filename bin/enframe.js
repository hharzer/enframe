#! /usr/bin/env node

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"E11i":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r,n=require("fs"),s=require("./enframe"),i=t(require("import-fresh"));!function(e){!function(e){e.Scripts="scripts",e.Dependencies="dependencies",e.DevDependencies="devDependencies"}(e.Key||(e.Key={}))}(r||(r={}));var c=["typescript","ts-node","@types/node","parcel","express","@types/express","ts-node","react","@types/react","react-dom","@types/react-dom","compression","@types/compression","helmet","@types/helmet"],a=["prettier","eslint","eslint-config-prettier","eslint-plugin-prettier","@typescript-eslint/eslint-plugin","@typescript-eslint/parser","mocha","@types/mocha","enzyme","@types/enzyme","chai","@types/chai","enzyme-adapter-react-16","@types/enzyme-adapter-react-16","chai-enzyme","@types/chai-enzyme","cypress","onchange"],p=function(e,t,n){var i=Object.keys(n[t]||{}),c=i?e.filter(function(e){return!i.includes(e)}):e;if(c.length){var a="yarn add "+(t==r.Key.DevDependencies?"--dev ":"")+c.join(" ");s.enframeExec(a)}else s.elog(t+" are up to date.")},o=function(e){p(c,r.Key.Dependencies,e),p(a,r.Key.DevDependencies,e)},y=function(t){var r={build:"parcel build src/front/index.html",start:"ts-node src/back/server.ts",test:"mocha",cy:"yarn cypress open",watch:"onchange 'src/**' -- yarn build && yarn start"};return t?e({},t,r):r},u=function(){return i.default(s.rootDir("package.json"))};exports.packageJsonMaker=function(){o(u());var e=u(),t=e[r.Key.Scripts];e[r.Key.Scripts]=y(t),n.writeFileSync(s.rootDir("package.json"),JSON.stringify(e,null,2)+"\n")};
},{"./enframe":"xsr0"}],"hz+C":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe");exports.enframeConfig=require(e.rootDir("enframe.json"));
},{"./enframe":"xsr0"}],"ioA1":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),t=require("child_process"),i=require("./enframeConfig"),n=i.enframeConfig.gitlabRemoteSSH,r=function(){return e.commandDoesNotError("git status")};exports.gitInit=function(){r()||e.enframeExec("git init")};var o=function(){return!!r()&&!!t.execSync("git status --porcelain",{encoding:"utf8"})},c=function(){return t.execSync("git remote",{encoding:"utf8"}).includes("origin")};exports.gitPush=function(){o()?(e.enframeExec("git add ."),e.enframeExec('git commit -m "Enframe commit."'),c()?e.enframeExec("git push origin master"):(e.enframeExec("git remote add origin "+n),e.enframeExec("git push --set-upstream origin master"))):e.elog("No git changes have been detected. Skipping git-push sequence.")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"i9Mb":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),o=require("./enframeConfig"),r=o.enframeConfig.appName,a=function(o){if(e.commandDoesNotError("heroku apps:info "+o))e.elog("Heroku app "+o+" already exists.");else try{e.enframeExec("heroku apps:create "+o)}catch(r){e.elog("Heroku app creation failed. Skipping for now. Error message below."),e.elog(r)}};exports.herokuMaker=function(){if(!function(){return e.commandDoesNotError("heroku")}){e.elog("You do not have the Heroku CLI installed. Skipping Heroku app-creation sequence.")}a(r+"-staging"),a(r+"-prod")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"J+wu":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var r=require("fs"),e=require("./enframe"),n=require("./enframeConfig"),i=function(r){return e.elog("touched "+r)},t=function(n){n.forEach(function(n){r.copyFileSync(e.enframeDir(n),e.rootDir(n)),i(n)})},c=n.enframeConfig.appName,o=function(){return r.readFileSync(e.enframeDir(".gitlab-ci.yml"),"utf8").replace(/ENFRAME_APP_NAME/g,c)},s=function(){t(["tsconfig.json",".prettierrc",".eslintrc.json",".mocharc.json","LICENSE","cypress.json"]),r.copyFileSync(e.enframeDir("gitignore"),e.rootDir(".gitignore")),i(".gitignore"),r.writeFileSync(e.rootDir(".gitlab-ci.yml"),o()),i(".gitlab-ci.yml")},f=function(){r.mkdirSync(e.rootDir("src/back"),{recursive:!0}),i("src/back")},u=function(){t(["src/back/server.ts"])},a=function(){r.mkdirSync(e.rootDir("src/front"),{recursive:!0}),i("src/front")},l=function(){t(["src/front/App.test.tsx","src/front/App.tsx","src/front/index.html","src/front/index.tsx","src/front/stylesheet.css"])},y=function(){r.existsSync(e.rootDir("src/back"))||f(),r.existsSync(e.rootDir("src/front"))||a(),u(),l()};exports.fileMaker=function(){s(),y()};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"xsr0":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("path"),r=e.join(process.cwd(),"node_modules/enframe");exports.enframeDir=function(n){return e.join(r,n)},exports.rootDir=function(r){return e.join(process.cwd(),r)};var n=require("child_process"),o=require("./packageJsonMaker"),t=require("./git"),i=require("./herokuMaker"),c=require("./fileMaker");exports.enframeExec=function(e,r){exports.elog("Executing: "+e+"\n");var o={encoding:"utf8"};r&&(o.stdio="inherit");var t=n.execSync(e,o);t&&console.log(t)},exports.commandDoesNotError=function(e){try{return n.execSync(e,{encoding:"utf8",stdio:"ignore"}),!0}catch(r){return!1}},exports.elog=function(e){console.log("Enframe: "+e)};var a=function(){return n.execSync("cat package.json",{encoding:"utf8"}).includes('"name":')},u=function(){t.gitInit(),a()||exports.enframeExec("yarn init",!0),c.fileMaker(),o.packageJsonMaker(),i.herokuMaker(),t.gitPush(),exports.elog("You've been framed! Have a nice day :)")};u();
},{"./packageJsonMaker":"E11i","./git":"ioA1","./herokuMaker":"i9Mb","./fileMaker":"J+wu"}]},{},["xsr0"], null)
//# sourceMappingURL=/enframe.js.map