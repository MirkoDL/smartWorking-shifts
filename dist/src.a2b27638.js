// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/classes/calendarClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Week = exports.Day = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Week = /*#__PURE__*/function () {
  function Week() {
    _classCallCheck(this, Week);
  }
  _createClass(Week, [{
    key: "contructor",
    value: function contructor(day) {}
  }]);
  return Week;
}();
exports.Week = Week;
var Day = /*#__PURE__*/function () {
  function Day(day) {
    _classCallCheck(this, Day);
    this.date = day; // aaaa-mm-dd
    this.occupiedBy = []; // array with names
  }
  _createClass(Day, [{
    key: "isNextDayAvaiable",
    value: function isNextDayAvaiable() {
      //check if the next day is: weekend - holiday - free
      //TODO soon
    }
  }, {
    key: "isReserved",
    value: function isReserved() {
      //return true if reserved by policy/weekend

      //check weekend
      var day = new Date(this.date).getDay();
      var isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
      return isWeekend;
    }
  }, {
    key: "isFree",
    value: function isFree(people) {
      //check for 1 sit, return false if already assigned to half the crew(mandatory half the crew to be in office everyday)
      //false if weekend
      return this.occupiedBy.length < Math.round(people / 2) && !this.isReserved();
    }
  }, {
    key: "assign",
    value: function assign(user) {
      this.occupiedBy.push(user);
    }
  }]);
  return Day;
}();
exports.Day = Day;
},{}],"src/classes/userClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var User = /*#__PURE__*/function () {
  function User(name) {
    _classCallCheck(this, User);
    this.name = name;
    this.reservedDays = [
      /*
      aaaa-mm-dd
      */
    ];
    this.assignedDays = [
      /*
        {
      weekNumber: int,
      day: aaaa-mm-dd
        }
        */
    ];
  }
  _createClass(User, [{
    key: "addToUserCalendar",
    value: function addToUserCalendar(day) {
      //day: dd / completeDate: aaaa-mm-dd
      var weekNumber = this.getWeekNumber(day);
      this.assignedDays.push({
        weekNumber: weekNumber,
        day: day
      });
      //console.log(this.assignedDays)
    }
  }, {
    key: "isWeekDone",
    value: function isWeekDone(day) {
      //check if already assigned to two days of the week
      //onsole.log('start ' + this.assignedDays)
      var weekNumber = this.getWeekNumber(day);
      var counter = 0;
      for (var i = 0; i < this.assignedDays.length; i++) {
        if (this.assignedDays[i].weekNumber === weekNumber) {
          counter++;
        }
      }
      return counter > 1; //true if user already assigned to 2 days
    }
  }, {
    key: "getWeekNumber",
    value: function getWeekNumber(currentDate) {
      var startDate = new Date(new Date().getFullYear(), 0, 1);
      var days = Math.floor((new Date(currentDate) - startDate) / (24 * 60 * 60 * 1000));
      var weekNumber = Math.ceil(days / 7);
      return weekNumber;
    }
  }, {
    key: "isVacation",
    value: function isVacation(dayToCheck) {
      //check if the user has vacation planned on that day
      return this.reservedDays.filter(function (day) {
        return day === dayToCheck;
      }) > 0; //true if reserved
    }
  }, {
    key: "reserveDay",
    value: function reserveDay(day) {
      this.reservedDays.push(day);
    }
  }, {
    key: "checkDay",
    value: function checkDay(day) {
      return !(this.isVacation(day) || this.isWeekDone(day)); //true if can add day
    }
  }]);
  return User;
}();
exports.User = User;
},{}],"src/eventListener.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = void 0;
var _userClass = require("./classes/userClass.js");
var users = [];
exports.users = users;
window.onload = function () {
  console.log("loaded");
  document.querySelector("#getUserForm").addEventListener("submit", function (e) {
    console.log("submitted");
    e.preventDefault();
    var username = document.querySelector("#username").value.trim();
    if (username === "") {
      return;
    }
    username = username[0].toUpperCase() + username.substring(1);
    users.push(new _userClass.User(username));
    console.log(users);
  });

  /*document.querySelector(`#monthSelector`).addEventListener(`change`, (e) => {
    console.log("e");
  });*/
};
},{"./classes/userClass.js":"src/classes/userClass.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignDays = void 0;
var _calendarClass = require("./classes/calendarClass.js");
var _eventListener = require("./eventListener.js");
var randomizeUsers = function randomizeUsers() {
  var startUser = Math.floor(Math.random() * (_eventListener.users.length - 0) + 0);
  //move the selected user to the beginning as extracted prior
  _eventListener.users.unshift(_eventListener.users[startUser]);
  _eventListener.users.splice(startUser + 1, 1);
};
var days = [];
var month = "March"; //userInput truncate to lenth 3
var monthNumber = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month.substring(0, 3)) / 3; //get month number 0-11

var lastDayOfMonth = new Date(new Date().getFullYear(), monthNumber, 0).getDate();
var remainingDay = lastDayOfMonth - new Date().getDate();
for (var i = 1; i <= remainingDay; i++) {
  days.push(new _calendarClass.Day("".concat(new Date().getFullYear(), "-").concat(monthNumber < 9 ? "0".concat(monthNumber) : monthNumber, "-").concat(new Date().getDate() + i)));
}
var assignDays = function assignDays() {
  days.forEach(function (day) {
    var currentDay = day.date;
    for (var _i = 0; _i < Math.round(_eventListener.users.length / 2); _i++) {
      //check and assign day to user
      _eventListener.users.forEach(function (user) {
        if (user.checkDay(currentDay) && day.isFree(_eventListener.users.length)) {
          day.assign(user);
          user.addToUserCalendar(currentDay);
        }
      });
    }
    randomizeUsers();
  });
};

//console.log(days);
exports.assignDays = assignDays;
},{"./classes/calendarClass.js":"src/classes/calendarClass.js","./eventListener.js":"src/eventListener.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36455" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map