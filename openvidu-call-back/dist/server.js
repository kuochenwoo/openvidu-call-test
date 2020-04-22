!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SERVER_PORT=process.env.SERVER_PORT||5e3,t.OPENVIDU_URL=process.env.OPENVIDU_URL||"https://localhost:4443",t.OPENVIDU_SECRET=process.env.OPENVIDU_SECRET||"MY_SECRET",t.DEV_MODE=process.env.DEV_MODE||!1},function(e,t){e.exports=require("express")},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(1)),i=n(0),u=n(3);r(n(9)).default.config();var s=o.default();s.use(o.default.static("public")),s.use(o.default.json()),s.use("/call",u.app),s.listen(i.SERVER_PORT,(function(){console.log("OpenVidu Call Server is listening on port "+i.SERVER_PORT)}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function s(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=i(n(1)),s=n(4),a=n(0);t.app=u.default.Router({strict:!0});var c=new s.OpenViduService;function l(e,t){var n,r=null===(n=e.response)||void 0===n?void 0:n.status;if("ECONNREFUSED"===e.code)return console.error("ERROR: Cannot connect with OpenVidu Server"),void t.status(504).send("ECONNREFUSED: Cannot connect with OpenVidu Server");"DEPTH_ZERO_SELF_SIGNED_CERT"===e.code||e.code.includes("SELF_SIGNED_CERT")?t.status(401).send("ERROR: Self signed certificate Visit "+a.OPENVIDU_URL):t.status(r).send("ERROR: Cannot create OpenVidu session")}t.app.post("/",(function(e,t){return r(void 0,void 0,void 0,(function(){var n,r,i,u,s,f;return o(this,(function(o){switch(o.label){case 0:n=e.body.sessionId,console.log("Session ID received",e.body),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,c.createSession(n,a.OPENVIDU_URL,a.OPENVIDU_SECRET)];case 2:return r=o.sent(),n=r.id,[3,4];case 3:return i=o.sent(),(u=null===(f=i.response)||void 0===f?void 0:f.status)&&409!==u?(l(i,t),[2]):[3,4];case 4:return o.trys.push([4,6,,7]),[4,c.createToken(n,a.OPENVIDU_URL,a.OPENVIDU_SECRET)];case 5:return s=o.sent(),t.status(200).send(JSON.stringify(s.token)),[3,7];case 6:return l(o.sent(),t),[3,7];case 7:return[2]}}))}))}))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function s(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};Object.defineProperty(t,"__esModule",{value:!0});var i=n(5),u=function(){function e(){this.httpClientService=new i.HttpClientService}return e.prototype.createSession=function(e,t,n){return r(this,void 0,void 0,(function(){var r,i;return o(this,(function(o){switch(o.label){case 0:return r=t+"/api/sessions",console.log("Requesting session to ",r),i=JSON.stringify({customSessionId:e}),[4,this.httpClientService.post(i,r,n)];case 1:return[2,o.sent()]}}))}))},e.prototype.createToken=function(e,t,n){return r(this,void 0,void 0,(function(){var r,i;return o(this,(function(o){switch(o.label){case 0:return r=t+"/api/tokens",console.log("Requesting token to ",r),i=JSON.stringify({session:e}),[4,this.httpClientService.post(i,r,n)];case 1:return[2,o.sent()]}}))}))},e}();t.OpenViduService=u},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{a(r.next(e))}catch(e){i(e)}}function s(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,s)}a((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=i(n(6)),s=i(n(7)),a=i(n(8)),c=n(0),l=function(){function e(){this.options={}}return e.prototype.post=function(e,t,n){return r(this,void 0,void 0,(function(){return o(this,(function(r){switch(r.label){case 0:c.DEV_MODE&&(this.options.httpsAgent=new s.default.Agent({rejectUnauthorized:!1})),this.options.headers={Authorization:"Basic "+a.default("OPENVIDUAPP:"+n),"Content-Type":"application/json"},r.label=1;case 1:return r.trys.push([1,3,,4]),[4,u.default.post(t,e,this.options)];case 2:return[2,r.sent().data];case 3:throw r.sent();case 4:return[2]}}))}))},e}();t.HttpClientService=l},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("https")},function(e,t){e.exports=require("btoa")},function(e,t){e.exports=require("dotenv")}]);