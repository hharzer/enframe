#! /usr/bin/env node

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"E11i":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var n,r=require("fs"),s=require("./enframe"),i=t(require("import-fresh"));!function(e){!function(e){e.Scripts="scripts",e.Dependencies="dependencies",e.DevDependencies="devDependencies"}(e.Key||(e.Key={}))}(n||(n={}));var c=["typescript","ts-node","@types/node","parcel","express","@types/express","ts-node","react","@types/react","react-dom","@types/react-dom","compression","@types/compression","helmet","@types/helmet"],p=["prettier","eslint","eslint-config-prettier","eslint-plugin-prettier","eslint-plugin-react","@typescript-eslint/eslint-plugin","@typescript-eslint/parser","mocha","@types/mocha","enzyme","@types/enzyme","chai","@types/chai","enzyme-adapter-react-16","@types/enzyme-adapter-react-16","chai-enzyme","@types/chai-enzyme","cypress","nodemon"],a=function(e){var t=function(e,t,r){var i=Object.keys(r[t]||{}),c=i?e.filter(function(e){return!i.includes(e)}):e;if(c.length){var p="yarn add "+(t==n.Key.DevDependencies?"--dev ":"")+c.join(" ");s.enframeExec(p)}else s.elog(t+" are up to date.")};t(c,n.Key.Dependencies,e),t(p,n.Key.DevDependencies,e)},o={build:"parcel build src/front/index.html",start:"ts-node src/back/server.ts",test:"mocha",cy:"yarn cypress open",watch:"nodemon",lint:"eslint --ext .ts,.tsx ./"},y=function(t){return t?e({},t,o):o};exports.packageJsonMaker=function(){var e=function(){return i.default(s.rootDir("package.json"))},t=e();a(e());var c=(t=e())[n.Key.Scripts];t[n.Key.Scripts]=y(c),r.writeFileSync(s.rootDir("package.json"),JSON.stringify(t,null,2)+"\n")};
},{"./enframe":"xsr0"}],"hz+C":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var r=require("./enframe"),t=e(require("import-fresh")),o=t.default(r.rootDir("enframe.json"));exports.enframeConfig=o;
},{"./enframe":"xsr0"}],"ioA1":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("./enframe"),t=require("child_process"),i=require("./enframeConfig"),n=i.enframeConfig.gitlabRemoteSSH,r=function(){return e.commandDoesNotError("git status")};exports.gitInit=function(){r()||e.enframeExec("git init")};var o=function(){return!!r()&&!!t.execSync("git status --porcelain",{encoding:"utf8"})},c=function(){return t.execSync("git remote",{encoding:"utf8"}).includes("origin")};exports.gitPush=function(){o()?(e.enframeExec("git add ."),e.enframeExec('git commit -m "Enframe commit."'),c()?e.enframeExec("git push origin master"):(e.enframeExec("git remote add origin "+n),e.enframeExec("git push --set-upstream origin master"))):e.elog("No git changes have been detected. Skipping git-push sequence.")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"i9Mb":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,r,n,t){return new(n||(n=Promise))(function(o,a){function u(e){try{c(t.next(e))}catch(r){a(r)}}function i(e){try{c(t.throw(e))}catch(r){a(r)}}function c(e){e.done?o(e.value):new n(function(r){r(e.value)}).then(u,i)}c((t=t.apply(e,r||[])).next())})},r=this&&this.__generator||function(e,r){var n,t,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,t&&(o=2&a[0]?t.return:a[0]?t.throw||((o=t.return)&&o.call(t),0):t.next)&&!(o=o.call(t,a[1])).done)return o;switch(t=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,t=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=r.call(e,u)}catch(i){a=[6,i],t=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}},n=this;exports.__esModule=!0;var t=require("./enframe"),o=require("./enframeConfig"),a=o.enframeConfig.appName,u=a+"-staging",i=a+"-prod",c=function(e){return t.commandDoesNotErrorAsync("heroku apps:info "+e)};exports.herokuChecker=function(){return e(n,void 0,Promise,function(){var e,n,o,a,s;return r(this,function(r){switch(r.label){case 0:return[4,t.commandDoesNotErrorAsync("heroku")];case 1:return e=r.sent(),n=[c(u),c(i)],[4,Promise.all(n)];case 2:return o=r.sent(),a=o[0],s=o[1],[2,{isHeroku:e,isStaging:a,isProd:s,shouldRunHerokuMaker:e&&!a&&!s}]}})})};var s=function(e){try{t.enframeExec("heroku apps:create "+e)}catch(r){t.elog("Failed to create app "+e),t.elog(r)}};exports.herokuMaker=function(e){e.shouldRunHerokuMaker?(s(u),s(i)):t.elog("Skipping Heroku app creation.")};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"J+wu":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=require("fs"),r=require("./enframe"),i=require("./enframeConfig"),n=i.enframeConfig.appName,t=function(e){return r.elog("touched "+e)},o=function(e){return r.enframeDir("srcapp/"+e)},s=function(){e.copyFileSync(o("gitignore"),r.rootDir(".gitignore")),t(".gitignore")},c=function(){e.writeFileSync(r.rootDir(".gitlab-ci.yml"),e.readFileSync(o(".gitlab-ci.yml"),"utf8").replace(/ENFRAME_APP_NAME/g,n)),t(".gitlab-ci.yml")},f={files:[".eslintrc.json",".mocharc.json",".prettierrc","cypress.json","LICENSE","nodemon.json","tsconfig.json"],specialCases:[s,c]},a={dir:"src/back",files:["server.ts"]},l={dir:"src/front",files:["App.test.tsx","App.tsx","index.html","index.tsx","service-worker.js","stylesheet.css"]},u=[f,l,a];exports.fileMaker=function(){u.forEach(function(i){var n=i.dir,s=i.files,c=i.specialCases,f=s;n&&(e.existsSync(r.rootDir(n))||e.mkdirSync(r.rootDir(n),{recursive:!0}),f=s.map(function(e){return n+"/"+e})),f.forEach(function(i){e.copyFileSync(o(i),r.rootDir(i)),t(i)}),c&&c.forEach(function(e){return e()})})};
},{"./enframe":"xsr0","./enframeConfig":"hz+C"}],"xsr0":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,r,n,t){return new(n||(n=Promise))(function(o,i){function c(e){try{u(t.next(e))}catch(r){i(r)}}function a(e){try{u(t.throw(e))}catch(r){i(r)}}function u(e){e.done?o(e.value):new n(function(r){r(e.value)}).then(c,a)}u((t=t.apply(e,r||[])).next())})},r=this&&this.__generator||function(e,r){var n,t,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,t&&(o=2&i[0]?t.return:i[0]?t.throw||((o=t.return)&&o.call(t),0):t.next)&&!(o=o.call(t,i[1])).done)return o;switch(t=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,t=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=r.call(e,c)}catch(a){i=[6,a],t=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},n=this;exports.__esModule=!0;var t=require("path"),o=t.join(process.cwd(),"node_modules/enframe");exports.enframeDir=function(e){return t.join(o,e)},exports.rootDir=function(e){return t.join(process.cwd(),e)};var i=require("child_process"),c=require("./packageJsonMaker"),a=require("./git"),u=require("./herokuMaker"),s=require("./fileMaker"),l=require("util");exports.elog=function(e){console.log("Enframe: "+e)},exports.enframeExec=function(e,r){exports.elog("Executing: "+e+"\n");var n={encoding:"utf8"};r&&(n.stdio="inherit");var t=i.execSync(e,n);t&&console.log(t)},exports.commandDoesNotError=function(e){try{return i.execSync(e,{encoding:"utf8",stdio:"ignore"}),!0}catch(r){return!1}},exports.commandDoesNotErrorAsync=function(t){return e(n,void 0,Promise,function(){var e;return r(this,function(r){switch(r.label){case 0:e=l.promisify(i.exec),r.label=1;case 1:return r.trys.push([1,3,,4]),[4,e(t)];case 2:return r.sent(),[2,!0];case 3:return r.sent(),[2,!1];case 4:return[2]}})})};var f=function(){return i.execSync("cat package.json",{encoding:"utf8"}).includes('"name":')},p=function(){return e(n,void 0,void 0,function(){var e,n;return r(this,function(r){switch(r.label){case 0:return e=u.herokuChecker(),a.gitInit(),f()||exports.enframeExec("yarn init",!0),s.fileMaker(),c.packageJsonMaker(),n=u.herokuMaker,[4,e];case 1:return n.apply(void 0,[r.sent()]),a.gitPush(),exports.elog("You've been framed! Have a nice day :)"),process.exit(),[2]}})})};p();
},{"./packageJsonMaker":"E11i","./git":"ioA1","./herokuMaker":"i9Mb","./fileMaker":"J+wu"}]},{},["xsr0"], null)
//# sourceMappingURL=/enframe.js.map