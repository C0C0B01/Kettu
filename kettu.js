"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function")
      for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: ((k) => from[k]).bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shims/asyncIteratorSymbol.js
  var asyncIteratorSymbol;
  var init_asyncIteratorSymbol = __esm({
    "shims/asyncIteratorSymbol.js"() {
      "use strict";
      asyncIteratorSymbol = Symbol("Symbol.asyncIterator");
    }
  });

  // shims/promiseAllSettled.js
  var allSettledFulfill, allSettledReject, mapAllSettled, allSettled;
  var init_promiseAllSettled = __esm({
    "shims/promiseAllSettled.js"() {
      "use strict";
      allSettledFulfill = (value) => ({
        status: "fulfilled",
        value
      });
      allSettledReject = (reason) => ({
        status: "rejected",
        reason
      });
      mapAllSettled = (item) => Promise.resolve(item).then(allSettledFulfill, allSettledReject);
      allSettled = Promise.allSettled ??= (iterator) => {
        return Promise.all(Array.from(iterator).map(mapAllSettled));
      };
    }
  });

  // node_modules/@swc/helpers/esm/_async_to_generator.js
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done)
      resolve(value);
    else
      Promise.resolve(value).then(_next, _throw);
  }
  function _async_to_generator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  var init_async_to_generator = __esm({
    "node_modules/@swc/helpers/esm/_async_to_generator.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/spitroast/dist/cjs.js
  var require_cjs = __commonJS({
    "node_modules/spitroast/dist/cjs.js"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, {
            get: all[name],
            enumerable: true
          });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          var _loop2 = function(key2) {
            if (!__hasOwnProp2.call(to, key2) && key2 !== except)
              __defProp2(to, key2, {
                get: () => from[key2],
                enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable
              });
          };
          for (var key of __getOwnPropNames2(from))
            _loop2(key);
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", {
        value: true
      }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        after: () => after2,
        before: () => before3,
        instead: () => instead4,
        unpatchAll: () => unpatchAll
      });
      module.exports = __toCommonJS2(src_exports2);
      var patchTypes = [
        "a",
        "b",
        "i"
      ];
      var patchedObjects = /* @__PURE__ */ new Map();
      function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
        var patch = patchedObjects.get(funcParent)?.[funcName];
        if (!patch)
          return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
        for (var hook of patch.b.values()) {
          var maybefuncArgs = hook.call(ctxt, funcArgs);
          if (Array.isArray(maybefuncArgs))
            funcArgs = maybefuncArgs;
        }
        var workingRetVal = [
          ...patch.i.values()
        ].reduce(
          (prev, current) => (...args) => current.call(ctxt, args, prev),
          // This calls the original function
          (...args) => isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args)
        )(...funcArgs);
        for (var hook1 of patch.a.values())
          workingRetVal = hook1.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
        return workingRetVal;
      }
      function unpatch(funcParent, funcName, hookId, type) {
        var patchedObject = patchedObjects.get(funcParent);
        var patch = patchedObject?.[funcName];
        if (!patch?.[type].has(hookId))
          return false;
        patch[type].delete(hookId);
        if (patchTypes.every((t) => patch[t].size === 0)) {
          var success = Reflect.defineProperty(funcParent, funcName, {
            value: patch.o,
            writable: true,
            configurable: true
          });
          if (!success)
            funcParent[funcName] = patch.o;
          delete patchedObject[funcName];
        }
        if (Object.keys(patchedObject).length == 0)
          patchedObjects.delete(funcParent);
        return true;
      }
      function unpatchAll() {
        for (var [parentObject, patchedObject] of patchedObjects.entries())
          for (var funcName in patchedObject)
            for (var hookType of patchTypes)
              for (var hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
                unpatch(parentObject, funcName, hookId, hookType);
      }
      var getPatchFunc_default = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
        if (typeof funcParent[funcName] !== "function")
          throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
        if (!patchedObjects.has(funcParent))
          patchedObjects.set(funcParent, /* @__PURE__ */ Object.create(null));
        var parentInjections = patchedObjects.get(funcParent);
        if (!parentInjections[funcName]) {
          var origFunc = funcParent[funcName];
          parentInjections[funcName] = {
            o: origFunc,
            b: /* @__PURE__ */ new Map(),
            i: /* @__PURE__ */ new Map(),
            a: /* @__PURE__ */ new Map()
          };
          var runHook = (ctxt, args, construct) => {
            var ret = hook_default(funcName, funcParent, args, ctxt, construct);
            if (oneTime)
              unpatchThisPatch();
            return ret;
          };
          var replaceProxy = new Proxy(origFunc, {
            apply: (_2, ctxt, args) => runHook(ctxt, args, false),
            construct: (_2, args) => runHook(origFunc, args, true),
            get: (target, prop, receiver) => prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver)
          });
          var success = Reflect.defineProperty(funcParent, funcName, {
            value: replaceProxy,
            configurable: true,
            writable: true
          });
          if (!success)
            funcParent[funcName] = replaceProxy;
        }
        var hookId = Symbol();
        var unpatchThisPatch = () => unpatch(funcParent, funcName, hookId, patchType);
        parentInjections[funcName][patchType].set(hookId, callback);
        return unpatchThisPatch;
      };
      var before3 = getPatchFunc_default("b");
      var instead4 = getPatchFunc_default("i");
      var after2 = getPatchFunc_default("a");
    }
  });

  // src/lib/api/native/modules/index.ts
  var modules_exports = {};
  __export(modules_exports, {
    BundleUpdaterManager: () => BundleUpdaterManager,
    ImageLoader: () => ImageLoader,
    NativeCacheModule: () => NativeCacheModule,
    NativeClientInfoModule: () => NativeClientInfoModule,
    NativeDeviceModule: () => NativeDeviceModule,
    NativeFileModule: () => NativeFileModule,
    NativeThemeModule: () => NativeThemeModule
  });
  function getNativeModule(...names) {
    for (var name of names) {
      if (globalThis.__turboModuleProxy) {
        var module = globalThis.__turboModuleProxy(name);
        if (module)
          return module;
      }
      if (nmp[name])
        return nmp[name];
    }
    return void 0;
  }
  var nmp, NativeCacheModule, NativeFileModule, NativeClientInfoModule, NativeDeviceModule, NativeThemeModule, BundleUpdaterManager, ImageLoader;
  var init_modules = __esm({
    "src/lib/api/native/modules/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      nmp = globalThis.nativeModuleProxy;
      NativeCacheModule = getNativeModule("NativeCacheModule", "MMKVManager");
      NativeFileModule = getNativeModule("NativeFileModule", "RTNFileManager", "DCDFileManager");
      NativeClientInfoModule = getNativeModule("NativeClientInfoModule", "RTNClientInfoManager", "InfoDictionaryManager");
      NativeDeviceModule = getNativeModule("NativeDeviceModule", "RTNDeviceManager", "DCDDeviceManager");
      NativeThemeModule = getNativeModule("NativeThemeModule", "RTNThemeManager", "DCDTheme");
      BundleUpdaterManager = getNativeModule("BundleUpdaterManager");
      ImageLoader = getNativeModule("ImageLoader");
    }
  });

  // src/lib/api/native/fs.ts
  var fs_exports = {};
  __export(fs_exports, {
    clearFolder: () => clearFolder,
    downloadFile: () => downloadFile,
    fileExists: () => fileExists,
    readFile: () => readFile,
    removeCacheFile: () => removeCacheFile,
    removeFile: () => removeFile,
    writeFile: () => writeFile
  });
  function clearFolder(_0) {
    return _async_to_generator(function* (path, { prefix = "pyoncord/" } = {}) {
      if (typeof NativeFileModule.clearFolder !== "function")
        throw new Error("'fs.clearFolder' is not supported");
      return void (yield NativeFileModule.clearFolder("documents", `${prefix}${path}`));
    }).apply(this, arguments);
  }
  function removeFile(_0) {
    return _async_to_generator(function* (path, { prefix = "pyoncord/" } = {}) {
      if (typeof NativeFileModule.removeFile !== "function")
        throw new Error("'fs.removeFile' is not supported");
      return void (yield NativeFileModule.removeFile("documents", `${prefix}${path}`));
    }).apply(this, arguments);
  }
  function removeCacheFile(path, prefix = "pyoncord/") {
    return _async_to_generator(function* () {
      if (typeof NativeFileModule.removeFile !== "function")
        throw new Error("'fs.removeFile' is not supported");
      return void (yield NativeFileModule.removeFile("cache", `${prefix}${path}`));
    })();
  }
  function fileExists(_0) {
    return _async_to_generator(function* (path, { prefix = "pyoncord/" } = {}) {
      return yield NativeFileModule.fileExists(`${NativeFileModule.getConstants().DocumentsDirPath}/${prefix}${path}`);
    }).apply(this, arguments);
  }
  function writeFile(_0, _1) {
    return _async_to_generator(function* (path, data, { prefix = "pyoncord/" } = {}) {
      if (typeof data !== "string")
        throw new Error("Argument 'data' must be a string");
      return void (yield NativeFileModule.writeFile("documents", `${prefix}${path}`, data, "utf8"));
    }).apply(this, arguments);
  }
  function readFile(_0) {
    return _async_to_generator(function* (path, { prefix = "pyoncord/" } = {}) {
      try {
        return yield NativeFileModule.readFile(`${NativeFileModule.getConstants().DocumentsDirPath}/${prefix}${path}`, "utf8");
      } catch (err) {
        throw new Error(`An error occured while writing to '${path}'`, {
          cause: err
        });
      }
    }).apply(this, arguments);
  }
  function downloadFile(_0, _1) {
    return _async_to_generator(function* (url2, path, { prefix = "pyoncord/" } = {}) {
      var response = yield fetch(url2);
      if (!response.ok) {
        throw new Error(`Failed to download file from ${url2}: ${response.status}`);
      }
      var arrayBuffer = yield response.arrayBuffer();
      var data = Buffer.from(arrayBuffer).toString("base64");
      yield NativeFileModule.writeFile("documents", `${prefix}${path}`, data, "base64");
    }).apply(this, arguments);
  }
  var init_fs = __esm({
    "src/lib/api/native/fs.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_modules();
    }
  });

  // node_modules/@swc/helpers/esm/_get_prototype_of.js
  function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _get_prototype_of(o);
  }
  var init_get_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_get_prototype_of.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_is_native_reflect_construct.js
  function _is_native_reflect_construct() {
    try {
      var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (_2) {
    }
    return (_is_native_reflect_construct = function _is_native_reflect_construct2() {
      return !!result;
    })();
  }
  var init_is_native_reflect_construct = __esm({
    "node_modules/@swc/helpers/esm/_is_native_reflect_construct.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_assert_this_initialized.js
  function _assert_this_initialized(self) {
    if (self === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
  }
  var init_assert_this_initialized = __esm({
    "node_modules/@swc/helpers/esm/_assert_this_initialized.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_type_of.js
  function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }
  var init_type_of = __esm({
    "node_modules/@swc/helpers/esm/_type_of.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_possible_constructor_return.js
  function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function"))
      return call;
    return _assert_this_initialized(self);
  }
  var init_possible_constructor_return = __esm({
    "node_modules/@swc/helpers/esm/_possible_constructor_return.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_assert_this_initialized();
      init_type_of();
    }
  });

  // node_modules/@swc/helpers/esm/_call_super.js
  function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
  }
  var init_call_super = __esm({
    "node_modules/@swc/helpers/esm/_call_super.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_get_prototype_of();
      init_is_native_reflect_construct();
      init_possible_constructor_return();
    }
  });

  // node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor))
      throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/@swc/helpers/esm/_class_call_check.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_set_prototype_of.js
  function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _set_prototype_of(o, p);
  }
  var init_set_prototype_of = __esm({
    "node_modules/@swc/helpers/esm/_set_prototype_of.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_inherits.js
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      _set_prototype_of(subClass, superClass);
  }
  var init_inherits = __esm({
    "node_modules/@swc/helpers/esm/_inherits.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_set_prototype_of();
    }
  });

  // node_modules/@swc/helpers/esm/_construct.js
  function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct())
      _construct = Reflect.construct;
    else {
      _construct = function construct(Parent2, args2, Class2) {
        var a = [
          null
        ];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _set_prototype_of(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  var init_construct = __esm({
    "node_modules/@swc/helpers/esm/_construct.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_is_native_reflect_construct();
      init_set_prototype_of();
    }
  });

  // node_modules/@swc/helpers/esm/_is_native_function.js
  function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  var init_is_native_function = __esm({
    "node_modules/@swc/helpers/esm/_is_native_function.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_wrap_native_super.js
  function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrap_native_super = function _wrap_native_super2(Class2) {
      if (Class2 === null || !_is_native_function(Class2))
        return Class2;
      if (typeof Class2 !== "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _get_prototype_of(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _set_prototype_of(Wrapper, Class2);
    };
    return _wrap_native_super(Class);
  }
  var init_wrap_native_super = __esm({
    "node_modules/@swc/helpers/esm/_wrap_native_super.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_construct();
      init_get_prototype_of();
      init_is_native_function();
      init_set_prototype_of();
    }
  });

  // node_modules/es-toolkit/dist/function/debounce.mjs
  function debounce(func, debounceMs, { signal, edges } = {}) {
    var pendingThis = void 0;
    var pendingArgs = null;
    var leading = edges != null && edges.includes("leading");
    var trailing = edges == null || edges.includes("trailing");
    var invoke = () => {
      if (pendingArgs !== null) {
        func.apply(pendingThis, pendingArgs);
        pendingThis = void 0;
        pendingArgs = null;
      }
    };
    var onTimerEnd = () => {
      if (trailing) {
        invoke();
      }
      cancel();
    };
    var timeoutId = null;
    var schedule = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onTimerEnd();
      }, debounceMs);
    };
    var cancelTimer = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    var cancel = () => {
      cancelTimer();
      pendingThis = void 0;
      pendingArgs = null;
    };
    var flush = () => {
      invoke();
    };
    var debounced = function debounced2(...args) {
      if (signal?.aborted) {
        return;
      }
      pendingThis = this;
      pendingArgs = args;
      var isFirstCall = timeoutId == null;
      schedule();
      if (leading && isFirstCall) {
        invoke();
      }
    };
    debounced.schedule = schedule;
    debounced.cancel = cancel;
    debounced.flush = flush;
    signal?.addEventListener("abort", cancel, {
      once: true
    });
    return debounced;
  }
  var init_debounce = __esm({
    "node_modules/es-toolkit/dist/function/debounce.mjs"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/es-toolkit/dist/object/omit.mjs
  function omit(obj, keys) {
    var result = {
      ...obj
    };
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      delete result[key];
    }
    return result;
  }
  var init_omit = __esm({
    "node_modules/es-toolkit/dist/object/omit.mjs"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/es-toolkit/dist/predicate/isNotNil.mjs
  function isNotNil(x2) {
    return x2 != null;
  }
  var init_isNotNil = __esm({
    "node_modules/es-toolkit/dist/predicate/isNotNil.mjs"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_create_class.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var init_create_class = __esm({
    "node_modules/@swc/helpers/esm/_create_class.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/@swc/helpers/esm/_define_property.js
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else
      obj[key] = value;
    return obj;
  }
  var init_define_property = __esm({
    "node_modules/@swc/helpers/esm/_define_property.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/es-toolkit/dist/index.mjs
  var init_dist = __esm({
    "node_modules/es-toolkit/dist/index.mjs"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_debounce();
      init_omit();
      init_isNotNil();
    }
  });

  // src/metro/internals/enums.ts
  var ModuleFlags, ModulesMapInternal;
  var init_enums = __esm({
    "src/metro/internals/enums.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      ModuleFlags = /* @__PURE__ */ function(ModuleFlags2) {
        ModuleFlags2[ModuleFlags2["EXISTS"] = 1] = "EXISTS";
        ModuleFlags2[ModuleFlags2["BLACKLISTED"] = 2] = "BLACKLISTED";
        ModuleFlags2[ModuleFlags2["ASSET"] = 4] = "ASSET";
        return ModuleFlags2;
      }({});
      ModulesMapInternal = /* @__PURE__ */ function(ModulesMapInternal2) {
        ModulesMapInternal2[ModulesMapInternal2["FULL_LOOKUP"] = 0] = "FULL_LOOKUP";
        ModulesMapInternal2[ModulesMapInternal2["NOT_FOUND"] = 1] = "NOT_FOUND";
        return ModulesMapInternal2;
      }({});
    }
  });

  // src/lib/api/patcher.ts
  var patcher_exports = {};
  __export(patcher_exports, {
    _patcherDelaySymbol: () => _patcherDelaySymbol,
    after: () => after,
    before: () => before,
    default: () => patcher_default,
    instead: () => instead
  });
  function create(fn) {
    function patchFn(...args) {
      if (typeof args[1][_patcherDelaySymbol] === "function") {
        var delayCallback = args[1][_patcherDelaySymbol];
        var cancel = false;
        var unpatch = () => cancel = true;
        delayCallback((target) => {
          if (cancel)
            return;
          args[1] = target;
          unpatch = fn.apply(this, args);
        });
        return () => unpatch();
      }
      return fn.apply(this, args);
    }
    function promisePatchFn(...args) {
      var thenable = args[1];
      if (!thenable || !("then" in thenable))
        throw new Error("target is not a then-able object");
      var cancel = false;
      var unpatch = () => cancel = true;
      thenable.then((target) => {
        if (cancel)
          return;
        args[1] = target;
        unpatch = patchFn.apply(this, args);
      });
      return () => unpatch();
    }
    return Object.assign(patchFn, {
      await: promisePatchFn
    });
  }
  var _after, _before, _instead, _patcherDelaySymbol, after, before, instead, patcher_default;
  var init_patcher = __esm({
    "src/lib/api/patcher.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      ({ after: _after, before: _before, instead: _instead } = require_cjs());
      _patcherDelaySymbol = Symbol.for("bunny.api.patcher.delay");
      after = create(_after);
      before = create(_before);
      instead = create(_instead);
      patcher_default = {
        after,
        before,
        instead
      };
    }
  });

  // src/lib/api/assets/patches.ts
  var patches_exports = {};
  __export(patches_exports, {
    assetsModule: () => assetsModule,
    patchAssets: () => patchAssets
  });
  function patchAssets(module) {
    if (assetsModule)
      return;
    assetsModule = module;
    var unpatch = after("registerAsset", assetsModule, () => {
      var moduleId = getImportingModuleId();
      if (moduleId !== -1)
        indexAssetModuleFlag(moduleId);
    });
    return unpatch;
  }
  var assetsModule;
  var init_patches = __esm({
    "src/lib/api/assets/patches.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_patcher();
      init_caches();
      init_modules2();
    }
  });

  // src/core/vendetta/Emitter.ts
  var Events, Emitter;
  var init_Emitter = __esm({
    "src/core/vendetta/Emitter.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_class_call_check();
      init_create_class();
      init_define_property();
      Events = /* @__PURE__ */ function(Events2) {
        Events2["GET"] = "GET";
        Events2["SET"] = "SET";
        Events2["DEL"] = "DEL";
        return Events2;
      }({});
      Emitter = /* @__PURE__ */ function() {
        "use strict";
        function Emitter2() {
          _class_call_check(this, Emitter2);
          _define_property(this, "listeners", Object.values(Events).reduce((acc, val) => (acc[val] = /* @__PURE__ */ new Set(), acc), {}));
        }
        _create_class(Emitter2, [
          {
            key: "on",
            value: function on(event, listener) {
              if (!this.listeners[event].has(listener))
                this.listeners[event].add(listener);
            }
          },
          {
            key: "off",
            value: function off(event, listener) {
              this.listeners[event].delete(listener);
            }
          },
          {
            key: "once",
            value: function once(event, listener) {
              var once2 = (event2, data) => {
                this.off(event2, once2);
                listener(event2, data);
              };
              this.on(event, once2);
            }
          },
          {
            key: "emit",
            value: function emit(event, data) {
              for (var listener of this.listeners[event])
                listener(event, data);
            }
          }
        ]);
        return Emitter2;
      }();
    }
  });

  // src/metro/factories.ts
  var factories_exports = {};
  __export(factories_exports, {
    createFilterDefinition: () => createFilterDefinition,
    createSimpleFilter: () => createSimpleFilter
  });
  function createFilterDefinition(fn, uniqMaker) {
    function createHolder(func, args, raw) {
      return Object.assign(func, {
        filter: fn,
        raw,
        uniq: [
          raw && "raw::",
          uniqMaker(args)
        ].filter(Boolean).join("")
      });
    }
    var curry = (raw) => (...args) => {
      return createHolder((m2, id, defaultCheck) => {
        return fn(args, m2, id, defaultCheck);
      }, args, raw);
    };
    return Object.assign(curry(false), {
      byRaw: curry(true),
      uniqMaker
    });
  }
  function createSimpleFilter(filter, uniq) {
    return createFilterDefinition((_2, m2) => filter(m2), () => `dynamic::${uniq}`)();
  }
  var init_factories = __esm({
    "src/metro/factories.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/metro/filters.ts
  var filters_exports = {};
  __export(filters_exports, {
    byDisplayName: () => byDisplayName,
    byFilePath: () => byFilePath,
    byMutableProp: () => byMutableProp,
    byName: () => byName,
    byProps: () => byProps,
    byStoreName: () => byStoreName,
    byTypeName: () => byTypeName
  });
  var byProps, byName, byDisplayName, byTypeName, byStoreName, byFilePath, byMutableProp;
  var init_filters = __esm({
    "src/metro/filters.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_factories();
      init_modules2();
      byProps = createFilterDefinition((props, m2) => props.length === 0 ? m2[props[0]] : props.every((p) => m2[p]), (props) => `bunny.metro.byProps(${props.join(",")})`);
      byName = createFilterDefinition(([name], m2) => m2.name === name, (name) => `bunny.metro.byName(${name})`);
      byDisplayName = createFilterDefinition(([displayName], m2) => m2.displayName === displayName, (name) => `bunny.metro.byDisplayName(${name})`);
      byTypeName = createFilterDefinition(([typeName], m2) => m2.type?.name === typeName, (name) => `bunny.metro.byTypeName(${name})`);
      byStoreName = createFilterDefinition(([name], m2) => m2.getName?.length === 0 && m2.getName() === name, (name) => `bunny.metro.byStoreName(${name})`);
      byFilePath = createFilterDefinition(
        // module return depends on defaultCheck. if true, it'll return module.default, otherwise the whole module
        // unlike filters like byName, defaultCheck doesn't affect the return since we don't rely on exports, but only its ID
        // one could say that this is technically a hack, since defaultCheck is meant for filtering exports
        ([path, exportDefault], _2, id, defaultCheck) => exportDefault === defaultCheck && metroModules[id]?.__filePath === path,
        ([path, exportDefault]) => `bunny.metro.byFilePath(${path},${exportDefault})`
      );
      byMutableProp = createFilterDefinition(([prop], m2) => m2?.[prop] && !Object.getOwnPropertyDescriptor(m2, prop)?.get, (prop) => `bunny.metro.byMutableProp(${prop})`);
    }
  });

  // src/metro/finders.ts
  function filterExports(moduleExports, moduleId, filter) {
    if (moduleExports.default && moduleExports.__esModule && filter(moduleExports.default, moduleId, true)) {
      return {
        exports: filter.raw ? moduleExports : moduleExports.default,
        defaultExport: !filter.raw
      };
    }
    if (!filter.raw && filter(moduleExports, moduleId, false)) {
      return {
        exports: moduleExports,
        defaultExport: false
      };
    }
    return {};
  }
  function findModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, false);
    for (var [id, moduleExports] of getModules(filter.uniq, false)) {
      var { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0) {
        cacheId(id, testedExports);
        return {
          id,
          defaultExport
        };
      }
    }
    finish(true);
    return {};
  }
  function findModuleId(filter) {
    return findModule(filter)?.id;
  }
  function findExports(filter) {
    var { id, defaultExport } = findModule(filter);
    if (id == null)
      return;
    return defaultExport ? requireModule(id).default : requireModule(id);
  }
  function findAllModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, true);
    var foundExports = [];
    for (var [id, moduleExports] of getModules(filter.uniq, true)) {
      var { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0 && typeof defaultExport === "boolean") {
        foundExports.push({
          id,
          defaultExport
        });
        cacheId(id, testedExports);
      }
    }
    finish(foundExports.length === 0);
    return foundExports;
  }
  function findAllModuleId(filter) {
    return findAllModule(filter).map((e) => e.id);
  }
  function findAllExports(filter) {
    return findAllModule(filter).map((ret) => {
      if (!ret.id)
        return;
      var { id, defaultExport } = ret;
      return defaultExport ? requireModule(id).default : requireModule(id);
    });
  }
  var init_finders = __esm({
    "src/metro/finders.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_caches();
      init_modules2();
    }
  });

  // src/lib/utils/lazy.ts
  var lazy_exports = {};
  __export(lazy_exports, {
    getProxyFactory: () => getProxyFactory,
    lazyDestructure: () => lazyDestructure,
    proxyLazy: () => proxyLazy
  });
  function proxyLazy(factory, opts = {}) {
    var cache;
    var dummy = opts.hint !== "object" ? function dummy2() {
    } : {};
    var proxyFactory = () => cache ??= factory();
    var proxy = new Proxy(dummy, lazyHandler);
    factories.set(proxy, proxyFactory);
    proxyContextHolder.set(dummy, {
      factory,
      options: opts
    });
    return proxy;
  }
  function lazyDestructure(factory, opts = {}) {
    var proxiedObject = proxyLazy(factory);
    return new Proxy({}, {
      get(_2, property) {
        if (property === Symbol.iterator) {
          return function* () {
            yield proxiedObject;
            yield new Proxy({}, {
              get: (_3, p) => proxyLazy(() => proxiedObject[p], opts)
            });
            throw new Error("This is not a real iterator, this is likely used incorrectly");
          };
        }
        return proxyLazy(() => proxiedObject[property], opts);
      }
    });
  }
  function getProxyFactory(obj) {
    return factories.get(obj);
  }
  var unconfigurable, isUnconfigurable, factories, proxyContextHolder, lazyHandler;
  var init_lazy = __esm({
    "src/lib/utils/lazy.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      unconfigurable = /* @__PURE__ */ new Set([
        "arguments",
        "caller",
        "prototype"
      ]);
      isUnconfigurable = (key) => typeof key === "string" && unconfigurable.has(key);
      factories = /* @__PURE__ */ new WeakMap();
      proxyContextHolder = /* @__PURE__ */ new WeakMap();
      lazyHandler = {
        ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map((fnName) => {
          return [
            fnName,
            (target, ...args) => {
              var contextHolder = proxyContextHolder.get(target);
              var resolved = contextHolder?.factory();
              if (!resolved)
                throw new Error(`Trying to Reflect.${fnName} of ${typeof resolved}`);
              return Reflect[fnName](resolved, ...args);
            }
          ];
        })),
        has(target, p) {
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries && p in isolatedEntries)
              return true;
          }
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.has of ${typeof resolved}`);
          return Reflect.has(resolved, p);
        },
        get(target, p, receiver) {
          if (p === "__IS_BUNNY_LAZY_PROXY__")
            return true;
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries?.[p])
              return isolatedEntries[p];
          }
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.get of ${typeof resolved}`);
          return Reflect.get(resolved, p, receiver);
        },
        ownKeys: (target) => {
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.ownKeys of ${typeof resolved}`);
          var cacheKeys = Reflect.ownKeys(resolved);
          unconfigurable.forEach((key) => !cacheKeys.includes(key) && cacheKeys.push(key));
          return cacheKeys;
        },
        getOwnPropertyDescriptor: (target, p) => {
          if (isUnconfigurable(p))
            return Reflect.getOwnPropertyDescriptor(target, p);
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to getOwnPropertyDescriptor of ${typeof resolved}`);
          var descriptor = Reflect.getOwnPropertyDescriptor(resolved, p);
          if (descriptor)
            Object.defineProperty(target, p, descriptor);
          return descriptor;
        }
      };
    }
  });

  // src/metro/lazy.ts
  var lazy_exports2 = {};
  __export(lazy_exports2, {
    _lazyContextSymbol: () => _lazyContextSymbol,
    createLazyModule: () => createLazyModule,
    getLazyContext: () => getLazyContext
  });
  function getIndexedFind(filter) {
    var modulesMap = getMetroCache().findIndex[filter.uniq];
    if (!modulesMap)
      return void 0;
    for (var k in modulesMap)
      if (k[0] !== "_")
        return Number(k);
  }
  function subscribeLazyModule(proxy, callback) {
    var info = getLazyContext(proxy);
    if (!info)
      throw new Error("Subscribing a module for non-proxy-find");
    if (!info.indexed)
      throw new Error("Attempting to subscribe to a non-indexed find");
    return subscribeModule(info.moduleId, () => {
      callback(findExports(info.filter));
    });
  }
  function getLazyContext(proxy) {
    return _lazyContexts.get(proxy);
  }
  function createLazyModule(filter) {
    var cache = void 0;
    var moduleId = getIndexedFind(filter);
    var context = {
      filter,
      indexed: !!moduleId,
      moduleId,
      getExports(cb) {
        if (!moduleId || metroModules[moduleId]?.isInitialized) {
          cb(this.forceLoad());
          return () => void 0;
        }
        return this.subscribe(cb);
      },
      subscribe(cb) {
        return subscribeLazyModule(proxy, cb);
      },
      get cache() {
        return cache;
      },
      forceLoad() {
        cache ??= findExports(filter);
        if (!cache)
          throw new Error(`${filter.uniq} is ${typeof cache}! (id ${context.moduleId ?? "unknown"})`);
        return cache;
      }
    };
    var proxy = proxyLazy(() => context.forceLoad(), {
      exemptedEntries: {
        [_lazyContextSymbol]: context,
        [_patcherDelaySymbol]: (cb) => context.getExports(cb)
      }
    });
    _lazyContexts.set(proxy, context);
    return proxy;
  }
  var _lazyContextSymbol, _lazyContexts;
  var init_lazy2 = __esm({
    "src/metro/lazy.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_patcher();
      init_lazy();
      init_finders();
      init_caches();
      init_modules2();
      _lazyContextSymbol = Symbol.for("bunny.metro.lazyContext");
      _lazyContexts = /* @__PURE__ */ new WeakMap();
    }
  });

  // src/metro/wrappers.ts
  var findByProps, findByPropsLazy, findByPropsAll, findByName, findByNameLazy, findByNameAll, findByDisplayName, findByDisplayNameLazy, findByDisplayNameAll, findByTypeName, findByTypeNameLazy, findByTypeNameAll, findByStoreName, findByStoreNameLazy, findByFilePath, findByFilePathLazy;
  var init_wrappers = __esm({
    "src/metro/wrappers.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_filters();
      init_finders();
      init_lazy2();
      findByProps = (...props) => findExports(byProps(...props));
      findByPropsLazy = (...props) => createLazyModule(byProps(...props));
      findByPropsAll = (...props) => findAllExports(byProps(...props));
      findByName = (name, expDefault = true) => findExports(expDefault ? byName(name) : byName.byRaw(name));
      findByNameLazy = (name, expDefault = true) => createLazyModule(expDefault ? byName(name) : byName.byRaw(name));
      findByNameAll = (name, expDefault = true) => findAllExports(expDefault ? byName(name) : byName.byRaw(name));
      findByDisplayName = (name, expDefault = true) => findExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      findByDisplayNameLazy = (name, expDefault = true) => createLazyModule(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      findByDisplayNameAll = (name, expDefault = true) => findAllExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      findByTypeName = (name, expDefault = true) => findExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      findByTypeNameLazy = (name, expDefault = true) => createLazyModule(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      findByTypeNameAll = (name, expDefault = true) => findAllExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      findByStoreName = (name) => findExports(byStoreName(name));
      findByStoreNameLazy = (name) => createLazyModule(byStoreName(name));
      findByFilePath = (path, expDefault = false) => findExports(byFilePath(path, expDefault));
      findByFilePathLazy = (path, expDefault = false) => createLazyModule(byFilePath(path, expDefault));
    }
  });

  // shims/depsModule.ts
  var require_depsModule = __commonJS({
    "shims/depsModule.ts"(exports, module) {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_wrappers();
      module.exports = {
        "react": findByPropsLazy("createElement"),
        "react-native": findByPropsLazy("AppRegistry"),
        "util": findByPropsLazy("inspect", "isNullOrUndefined"),
        "moment": findByPropsLazy("isMoment"),
        "chroma-js": findByPropsLazy("brewer"),
        "lodash": findByPropsLazy("forEachRight")
      };
    }
  });

  // globals:react-native
  var require_react_native = __commonJS({
    "globals:react-native"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["react-native"];
    }
  });

  // src/core/vendetta/storage.ts
  function createProxy(target = {}) {
    var emitter = new Emitter();
    var childrens = /* @__PURE__ */ new WeakMap();
    var proxiedChildrenSet = /* @__PURE__ */ new WeakSet();
    function createProxy1(target2, path) {
      return new Proxy(target2, {
        get(target3, prop) {
          if (prop === emitterSymbol)
            return emitter;
          var newPath = [
            ...path,
            prop
          ];
          var value = target3[prop];
          if (value !== void 0 && value !== null) {
            emitter.emit("GET", {
              path: newPath,
              value
            });
            if (typeof value === "object") {
              if (proxiedChildrenSet.has(value))
                return value;
              if (childrens.has(value))
                return childrens.get(value);
              var childrenProxy = createProxy1(value, newPath);
              childrens.set(value, childrenProxy);
              return childrenProxy;
            }
            return value;
          }
          return value;
        },
        set(target3, prop, value) {
          if (typeof value === "object") {
            if (childrens.has(value)) {
              target3[prop] = childrens.get(value);
            } else {
              var childrenProxy = createProxy1(value, [
                ...path,
                prop
              ]);
              childrens.set(value, childrenProxy);
              proxiedChildrenSet.add(value);
              target3[prop] = childrenProxy;
            }
          } else {
            target3[prop] = value;
          }
          emitter.emit("SET", {
            path: [
              ...path,
              prop
            ],
            value: target3[prop]
          });
          return true;
        },
        deleteProperty(target3, prop) {
          var value = typeof target3[prop] === "object" ? childrens.get(target3[prop]) : target3[prop];
          var success = delete target3[prop];
          if (success)
            emitter.emit("DEL", {
              value,
              path: [
                ...path,
                prop
              ]
            });
          return success;
        }
      });
    }
    return {
      proxy: createProxy1(target, []),
      emitter
    };
  }
  function useProxy(storage) {
    var emitter = storage?.[emitterSymbol];
    if (!emitter)
      throw new Error("storage?.[emitterSymbol] is undefined");
    var [, forceUpdate] = React.useReducer((n) => ~n, 0);
    React.useEffect(() => {
      var listener = (event, data) => {
        if (event === "DEL" && data.value === storage)
          return;
        forceUpdate();
      };
      emitter.on("SET", listener);
      emitter.on("DEL", listener);
      return () => {
        emitter.off("SET", listener);
        emitter.off("DEL", listener);
      };
    }, []);
    return storage;
  }
  function createStorage(backend) {
    return _async_to_generator(function* () {
      var data = yield backend.get();
      var { proxy, emitter } = createProxy(data);
      var handler = () => backend.set(proxy);
      emitter.on("SET", handler);
      emitter.on("DEL", handler);
      return proxy;
    })();
  }
  function wrapSync(store) {
    var awaited = void 0;
    var awaitQueue = [];
    var awaitInit = (cb) => awaited ? cb() : awaitQueue.push(cb);
    store.then((v2) => {
      awaited = v2;
      awaitQueue.forEach((cb) => cb());
    });
    return new Proxy({}, {
      ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map((k) => [
        k,
        (t, ...a) => Reflect[k](awaited ?? t, ...a)
      ])),
      get(target, prop, recv) {
        if (prop === syncAwaitSymbol)
          return awaitInit;
        return Reflect.get(awaited ?? target, prop, recv);
      }
    });
  }
  function awaitStorage(...stores) {
    return Promise.all(stores.map((store) => new Promise((res) => store[syncAwaitSymbol](res))));
  }
  var import_react_native, emitterSymbol, syncAwaitSymbol, ILLEGAL_CHARS_REGEX, filePathFixer, getMMKVPath, purgeStorage, createMMKVBackend, createFileBackend;
  var init_storage = __esm({
    "src/core/vendetta/storage.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_Emitter();
      init_modules();
      import_react_native = __toESM(require_react_native());
      emitterSymbol = Symbol.for("vendetta.storage.emitter");
      syncAwaitSymbol = Symbol.for("vendetta.storage.accessor");
      ILLEGAL_CHARS_REGEX = /[<>:"/\\|?*]/g;
      filePathFixer = (file) => import_react_native.Platform.select({
        default: file,
        ios: NativeFileModule.saveFileToGallery ? file : `Documents/${file}`
      });
      getMMKVPath = (name) => {
        if (ILLEGAL_CHARS_REGEX.test(name)) {
          name = name.replace(ILLEGAL_CHARS_REGEX, "-").replace(/-+/g, "-");
        }
        return `vd_mmkv/${name}`;
      };
      purgeStorage = (store) => _async_to_generator(function* () {
        if (yield NativeCacheModule.getItem(store)) {
          NativeCacheModule.removeItem(store);
        }
        var mmkvPath = getMMKVPath(store);
        if (yield NativeFileModule.fileExists(`${NativeFileModule.getConstants().DocumentsDirPath}/${mmkvPath}`)) {
          yield NativeFileModule.removeFile?.("documents", mmkvPath);
        }
      })();
      createMMKVBackend = (store, defaultData = {}) => {
        var mmkvPath = getMMKVPath(store);
        var defaultStr = JSON.stringify(defaultData);
        return createFileBackend(mmkvPath, defaultData, (() => _async_to_generator(function* () {
          var path = `${NativeFileModule.getConstants().DocumentsDirPath}/${mmkvPath}`;
          if (yield NativeFileModule.fileExists(path))
            return;
          var oldData = (yield NativeCacheModule.getItem(store)) ?? defaultStr;
          if (oldData === "!!LARGE_VALUE!!") {
            var cachePath = `${NativeFileModule.getConstants().CacheDirPath}/mmkv/${store}`;
            if (yield NativeFileModule.fileExists(cachePath)) {
              oldData = yield NativeFileModule.readFile(cachePath, "utf8");
            } else {
              console.log(`${store}: Experienced data loss :(`);
              oldData = defaultStr;
            }
          }
          try {
            JSON.parse(oldData);
          } catch (e) {
            console.error(`${store} had an unparseable data while migrating`);
            oldData = defaultStr;
          }
          yield NativeFileModule.writeFile("documents", filePathFixer(mmkvPath), oldData, "utf8");
          if ((yield NativeCacheModule.getItem(store)) !== null) {
            NativeCacheModule.removeItem(store);
            console.log(`Successfully migrated ${store} store from MMKV storage to fs`);
          }
        })())());
      };
      createFileBackend = (file, defaultData = {}, migratePromise) => {
        return {
          get: () => _async_to_generator(function* () {
            yield migratePromise;
            var path = `${NativeFileModule.getConstants().DocumentsDirPath}/${file}`;
            if (yield NativeFileModule.fileExists(path)) {
              var content = yield NativeFileModule.readFile(path, "utf8");
              try {
                return JSON.parse(content);
              } catch (e) {
              }
            }
            yield NativeFileModule.writeFile("documents", filePathFixer(file), JSON.stringify(defaultData), "utf8");
            return JSON.parse(yield NativeFileModule.readFile(path, "utf8"));
          })(),
          set: (data) => _async_to_generator(function* () {
            yield migratePromise;
            yield NativeFileModule.writeFile("documents", filePathFixer(file), JSON.stringify(data), "utf8");
          })()
        };
      };
    }
  });

  // node_modules/@gullerya/object-observer/dist/object-observer.min.js
  var m, x, E, T, K, c, $, N, Y, I, B, D, R, z, y, g, q, H, G, J, F, P, L, C, Q, X, Z, _, b, S, V, U, W, v;
  var init_object_observer_min = __esm({
    "node_modules/@gullerya/object-observer/dist/object-observer.min.js"() {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_call_super();
      init_class_call_check();
      init_create_class();
      init_inherits();
      m = "insert";
      x = "update";
      E = "delete";
      T = "reverse";
      K = "shuffle";
      c = Symbol.for("object-observer-meta-key-0");
      $ = {
        async: 1
      };
      N = (o) => {
        if (!o || typeof o != "object")
          return null;
        var t = {}, e = [];
        for (var [r, n] of Object.entries(o))
          if (r === "path") {
            if (typeof n != "string" || n === "")
              throw new Error('"path" option, if/when provided, MUST be a non-empty string');
            t[r] = n;
          } else if (r === "pathsOf") {
            if (o.path)
              throw new Error('"pathsOf" option MAY NOT be specified together with "path" option');
            if (typeof n != "string")
              throw new Error('"pathsOf" option, if/when provided, MUST be a string (MAY be empty)');
            t[r] = o.pathsOf.split(".").filter(Boolean);
          } else if (r === "pathsFrom") {
            if (o.path || o.pathsOf)
              throw new Error('"pathsFrom" option MAY NOT be specified together with "path"/"pathsOf" option/s');
            if (typeof n != "string" || n === "")
              throw new Error('"pathsFrom" option, if/when provided, MUST be a non-empty string');
            t[r] = n;
          } else
            e.push(r);
        if (e.length)
          throw new Error(`'${e.join(", ")}' is/are not a valid observer option/s`);
        return t;
      };
      Y = (o, t, e) => {
        var r = {};
        r[c] = t;
        for (var n in o)
          r[n] = g(o[n], n, t, e);
        return r;
      };
      I = (o, t, e) => {
        var r = o.length;
        var n = new Array(r);
        n[c] = t;
        for (var i = 0; i < r; i++)
          n[i] = g(o[i], i, t, e);
        return n;
      };
      B = (o, t) => (o[c] = t, o);
      D = (o, t) => {
        if (o === null)
          return t;
        var e = t;
        if (o.path) {
          var r = o.path;
          e = t.filter((n2) => n2.path.join(".") === r);
        } else if (o.pathsOf) {
          var r1 = o.pathsOf, n = r1.join(".");
          e = t.filter((i) => (i.path.length === r1.length + 1 || i.path.length === r1.length && (i.type === T || i.type === K)) && i.path.join(".").startsWith(n));
        } else if (o.pathsFrom) {
          var r2 = o.pathsFrom;
          e = t.filter((n2) => n2.path.join(".").startsWith(r2));
        }
        return e;
      };
      R = (o, t) => {
        try {
          o(t);
        } catch (e) {
          console.error(`failed to notify listener ${o} with ${t}`, e);
        }
      };
      z = function z2() {
        var t = this.batches;
        this.batches = [];
        for (var [e, r] of t)
          R(e, r);
      };
      y = (o, t) => {
        var e = o, r, n, i, l, h, s;
        var u = t.length;
        do {
          for (r = e.options.async, n = e.observers, s = n.length; s--; )
            if ([i, l] = n[s], h = D(l, t), h.length)
              if (r) {
                e.batches.length === 0 && queueMicrotask(z.bind(e));
                var a = void 0;
                for (var p of e.batches)
                  if (p[0] === i) {
                    a = p;
                    break;
                  }
                a || (a = [
                  i,
                  []
                ], e.batches.push(a)), Array.prototype.push.apply(a[1], h);
              } else
                R(i, h);
          var f = e.parent;
          if (f) {
            for (var a1 = 0; a1 < u; a1++) {
              var p1 = t[a1];
              t[a1] = new b(p1.type, [
                e.ownKey,
                ...p1.path
              ], p1.value, p1.oldValue, p1.object);
            }
            e = f;
          } else
            e = null;
        } while (e);
      };
      g = (o, t, e, r) => r !== void 0 && r.has(o) ? null : typeof o != "object" || o === null ? o : Array.isArray(o) ? new U({
        target: o,
        ownKey: t,
        parent: e,
        visited: r
      }).proxy : ArrayBuffer.isView(o) ? new W({
        target: o,
        ownKey: t,
        parent: e
      }).proxy : o instanceof Date ? o : new V({
        target: o,
        ownKey: t,
        parent: e,
        visited: r
      }).proxy;
      q = function q2() {
        var t = this[c], e = t.target, r = e.length - 1;
        var n = e.pop();
        if (n && typeof n == "object") {
          var l = n[c];
          l && (n = l.detach());
        }
        var i = [
          new b(E, [
            r
          ], void 0, n, this)
        ];
        return y(t, i), n;
      };
      H = function H2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r), i = e.length;
        for (var s = 0; s < r; s++)
          n[s] = g(arguments[s], i + s, t);
        var l = Reflect.apply(e.push, e, n), h = [];
        for (var s1 = i, u = e.length; s1 < u; s1++)
          h[s1 - i] = new b(m, [
            s1
          ], e[s1], void 0, this);
        return y(t, h), l;
      };
      G = function G2() {
        var t = this[c], e = t.target;
        var r, n, i, l, h;
        for (r = e.shift(), r && typeof r == "object" && (h = r[c], h && (r = h.detach())), n = 0, i = e.length; n < i; n++)
          l = e[n], l && typeof l == "object" && (h = l[c], h && (h.ownKey = n));
        var s = [
          new b(E, [
            0
          ], void 0, r, this)
        ];
        return y(t, s), r;
      };
      J = function J2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r);
        for (var s = 0; s < r; s++)
          n[s] = g(arguments[s], s, t);
        var i = Reflect.apply(e.unshift, e, n);
        for (var s1 = 0, u = e.length, f; s1 < u; s1++)
          if (f = e[s1], f && typeof f == "object") {
            var a = f[c];
            a && (a.ownKey = s1);
          }
        var l = n.length, h = new Array(l);
        for (var s2 = 0; s2 < l; s2++)
          h[s2] = new b(m, [
            s2
          ], e[s2], void 0, this);
        return y(t, h), i;
      };
      F = function F2() {
        var t = this[c], e = t.target;
        var r, n, i;
        for (e.reverse(), r = 0, n = e.length; r < n; r++)
          if (i = e[r], i && typeof i == "object") {
            var h = i[c];
            h && (h.ownKey = r);
          }
        var l = [
          new b(T, [], void 0, void 0, this)
        ];
        return y(t, l), this;
      };
      P = function P2(t) {
        var e = this[c], r = e.target;
        var n, i, l;
        for (r.sort(t), n = 0, i = r.length; n < i; n++)
          if (l = r[n], l && typeof l == "object") {
            var s = l[c];
            s && (s.ownKey = n);
          }
        var h = [
          new b(K, [], void 0, void 0, this)
        ];
        return y(e, h), this;
      };
      L = function L2(t, e, r) {
        var n = this[c], i = n.target, l = [], h = i.length, s = i.slice(0);
        if (e = e === void 0 ? 0 : e < 0 ? Math.max(h + e, 0) : Math.min(e, h), r = r === void 0 ? h : r < 0 ? Math.max(h + r, 0) : Math.min(r, h), e < h && r > e) {
          i.fill(t, e, r);
          var u;
          for (var f = e, a, p; f < r; f++)
            a = i[f], i[f] = g(a, f, n), f in s ? (p = s[f], p && typeof p == "object" && (u = p[c], u && (p = u.detach())), l.push(new b(x, [
              f
            ], i[f], p, this))) : l.push(new b(m, [
              f
            ], i[f], void 0, this));
          y(n, l);
        }
        return this;
      };
      C = function C2(t, e, r) {
        var n = this[c], i = n.target, l = i.length;
        t = t < 0 ? Math.max(l + t, 0) : t, e = e === void 0 ? 0 : e < 0 ? Math.max(l + e, 0) : Math.min(e, l), r = r === void 0 ? l : r < 0 ? Math.max(l + r, 0) : Math.min(r, l);
        var h = Math.min(r - e, l - t);
        if (t < l && t !== e && h > 0) {
          var s = i.slice(0), u = [];
          i.copyWithin(t, e, r);
          for (var f = t, a, p, O; f < t + h; f++)
            a = i[f], a && typeof a == "object" && (a = g(a, f, n), i[f] = a), p = s[f], p && typeof p == "object" && (O = p[c], O && (p = O.detach())), !(typeof a != "object" && a === p) && u.push(new b(x, [
              f
            ], a, p, this));
          y(n, u);
        }
        return this;
      };
      Q = function Q2() {
        var t = this[c], e = t.target, r = arguments.length, n = new Array(r), i = e.length;
        for (var w = 0; w < r; w++)
          n[w] = g(arguments[w], w, t);
        var l = r === 0 ? 0 : n[0] < 0 ? i + n[0] : n[0], h = r < 2 ? i - l : n[1], s = Math.max(r - 2, 0), u = Reflect.apply(e.splice, e, n), f = e.length;
        var a;
        for (var w1 = 0, A; w1 < f; w1++)
          A = e[w1], A && typeof A == "object" && (a = A[c], a && (a.ownKey = w1));
        var p, O, j;
        for (p = 0, O = u.length; p < O; p++)
          j = u[p], j && typeof j == "object" && (a = j[c], a && (u[p] = a.detach()));
        var M = [];
        var d;
        for (d = 0; d < h; d++)
          d < s ? M.push(new b(x, [
            l + d
          ], e[l + d], u[d], this)) : M.push(new b(E, [
            l + d
          ], void 0, u[d], this));
        for (; d < s; d++)
          M.push(new b(m, [
            l + d
          ], e[l + d], void 0, this));
        return y(t, M), u;
      };
      X = function X2(t, e) {
        var r = this[c], n = r.target, i = t.length, l = n.slice(0);
        e = e || 0, n.set(t, e);
        var h = new Array(i);
        for (var s = e; s < i + e; s++)
          h[s - e] = new b(x, [
            s
          ], n[s], l[s], this);
        y(r, h);
      };
      Z = {
        pop: q,
        push: H,
        shift: G,
        unshift: J,
        reverse: F,
        sort: P,
        fill: L,
        copyWithin: C,
        splice: Q
      };
      _ = {
        reverse: F,
        sort: P,
        fill: L,
        copyWithin: C,
        set: X
      };
      b = function b2(t, e, r, n, i) {
        "use strict";
        _class_call_check(this, b2);
        this.type = t, this.path = e, this.value = r, this.oldValue = n, this.object = i;
      };
      S = /* @__PURE__ */ function() {
        "use strict";
        function S2(t, e) {
          _class_call_check(this, S2);
          var { target: r, parent: n, ownKey: i, visited: l = /* @__PURE__ */ new Set() } = t;
          n && i !== void 0 ? (this.parent = n, this.ownKey = i) : (this.parent = null, this.ownKey = null), l.add(r);
          var h = e(r, this, l);
          l.delete(r), this.observers = [], this.revocable = Proxy.revocable(h, this), this.proxy = this.revocable.proxy, this.target = h, this.options = this.processOptions(t.options), this.options.async && (this.batches = []);
        }
        _create_class(S2, [
          {
            key: "processOptions",
            value: function processOptions(t) {
              if (t) {
                if (typeof t != "object")
                  throw new Error(`Observable options if/when provided, MAY only be an object, got '${t}'`);
                var e = Object.keys(t).filter((r) => !(r in $));
                if (e.length)
                  throw new Error(`'${e.join(", ")}' is/are not a valid Observable option/s`);
                return Object.assign({}, t);
              } else
                return {};
            }
          },
          {
            key: "detach",
            value: function detach() {
              return this.parent = null, this.target;
            }
          },
          {
            key: "set",
            value: function set(t, e, r) {
              var n = t[e];
              if (r !== n) {
                var i = g(r, e, this);
                if (t[e] = i, n && typeof n == "object") {
                  var h = n[c];
                  h && (n = h.detach());
                }
                var l = n === void 0 ? [
                  new b(m, [
                    e
                  ], i, void 0, this.proxy)
                ] : [
                  new b(x, [
                    e
                  ], i, n, this.proxy)
                ];
                y(this, l);
              }
              return true;
            }
          },
          {
            key: "deleteProperty",
            value: function deleteProperty(t, e) {
              var r = t[e];
              if (delete t[e], r && typeof r == "object") {
                var i = r[c];
                i && (r = i.detach());
              }
              var n = [
                new b(E, [
                  e
                ], void 0, r, this.proxy)
              ];
              return y(this, n), true;
            }
          }
        ]);
        return S2;
      }();
      V = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(V2, S2);
        function V2(t) {
          _class_call_check(this, V2);
          return _call_super(this, V2, [
            t,
            Y
          ]);
        }
        return V2;
      }(S);
      U = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(U2, S2);
        function U2(t) {
          _class_call_check(this, U2);
          return _call_super(this, U2, [
            t,
            I
          ]);
        }
        _create_class(U2, [
          {
            key: "get",
            value: function get(t, e) {
              return Z[e] || t[e];
            }
          }
        ]);
        return U2;
      }(S);
      W = /* @__PURE__ */ function(S2) {
        "use strict";
        _inherits(W2, S2);
        function W2(t) {
          _class_call_check(this, W2);
          return _call_super(this, W2, [
            t,
            B
          ]);
        }
        _create_class(W2, [
          {
            key: "get",
            value: function get(t, e) {
              return _[e] || t[e];
            }
          }
        ]);
        return W2;
      }(S);
      v = Object.freeze({
        from: (o, t) => {
          if (!o || typeof o != "object")
            throw new Error("observable MAY ONLY be created from a non-null object");
          if (o[c])
            return o;
          if (Array.isArray(o))
            return new U({
              target: o,
              ownKey: null,
              parent: null,
              options: t
            }).proxy;
          if (ArrayBuffer.isView(o))
            return new W({
              target: o,
              ownKey: null,
              parent: null,
              options: t
            }).proxy;
          if (o instanceof Date)
            throw new Error(`${o} found to be one of a non-observable types`);
          return new V({
            target: o,
            ownKey: null,
            parent: null,
            options: t
          }).proxy;
        },
        isObservable: (o) => !!(o && o[c]),
        observe: (o, t, e) => {
          if (!v.isObservable(o))
            throw new Error("invalid observable parameter");
          if (typeof t != "function")
            throw new Error(`observer MUST be a function, got '${t}'`);
          var r = o[c].observers;
          r.some((n) => n[0] === t) ? console.warn("observer may be bound to an observable only once; will NOT rebind") : r.push([
            t,
            N(e)
          ]);
        },
        unobserve: (o, ...t) => {
          if (!v.isObservable(o))
            throw new Error("invalid observable parameter");
          var e = o[c].observers;
          var r = e.length;
          if (r) {
            if (!t.length) {
              e.splice(0);
              return;
            }
            for (; r; )
              t.indexOf(e[--r][0]) >= 0 && e.splice(r, 1);
          }
        }
      });
    }
  });

  // src/lib/api/storage/index.ts
  var storage_exports = {};
  __export(storage_exports, {
    awaitStorage: () => awaitStorage2,
    createStorage: () => createStorage2,
    createStorageAndCallback: () => createStorageAndCallback,
    createStorageAsync: () => createStorageAsync,
    getPreloadedStorage: () => getPreloadedStorage,
    preloadStorageIfExists: () => preloadStorageIfExists,
    purgeStorage: () => purgeStorage2,
    updateStorage: () => updateStorage,
    useObservable: () => useObservable
  });
  function createFileBackend2(filePath) {
    var write = debounce((data) => {
      writeFile(filePath, JSON.stringify(data));
    }, 500);
    return {
      get: () => _async_to_generator(function* () {
        try {
          return JSON.parse(yield readFile(filePath));
        } catch (e) {
          throw new Error(`Failed to parse storage from '${filePath}'`, {
            cause: e
          });
        }
      })(),
      set: (data) => _async_to_generator(function* () {
        if (!data || typeof data !== "object") {
          throw new Error("data needs to be an object");
        }
        write(data);
      })(),
      exists: () => _async_to_generator(function* () {
        return yield fileExists(filePath);
      })()
    };
  }
  function useObservable(observables, opts) {
    if (observables.some((o) => o?.[storageInitErrorSymbol]))
      throw new Error("An error occured while initializing the storage");
    if (observables.some((o) => !v.isObservable(o))) {
      throw new Error("Argument passed isn't an Observable");
    }
    var [, forceUpdate] = React.useReducer((n) => ~n, 0);
    React.useEffect(() => {
      var listener = () => forceUpdate();
      observables.forEach((o) => v.observe(o, listener, opts));
      return () => {
        observables.forEach((o) => v.unobserve(o, listener));
      };
    }, []);
  }
  function updateStorage(path, value) {
    return _async_to_generator(function* () {
      _loadedStorage[path] = value;
      createFileBackend2(path).set(value);
    })();
  }
  function createStorageAndCallback(path, cb, { dflt = {}, nullIfEmpty = false } = {}) {
    var emitter;
    var callback = (data) => {
      var proxy = new Proxy(v.from(data), {
        get(target, prop, receiver) {
          if (prop === Symbol.for("vendetta.storage.emitter")) {
            if (emitter)
              return emitter;
            emitter = new Emitter();
            v.observe(target, (changes) => {
              for (var change of changes) {
                emitter.emit(change.type !== "delete" ? "SET" : "DEL", {
                  path: change.path,
                  value: change.value
                });
              }
            });
            return emitter;
          }
          return Reflect.get(target, prop, receiver);
        }
      });
      var handler = () => backend.set(proxy);
      v.observe(proxy, handler);
      cb(proxy);
    };
    var backend = createFileBackend2(path);
    if (_loadedStorage[path]) {
      callback(_loadedStorage[path]);
    } else {
      backend.exists().then((exists) => _async_to_generator(function* () {
        if (!exists) {
          if (nullIfEmpty) {
            callback(_loadedStorage[path] = null);
          } else {
            _loadedStorage[path] = dflt;
            yield backend.set(dflt);
            callback(dflt);
          }
        } else {
          callback(_loadedStorage[path] = yield backend.get());
        }
      })());
    }
  }
  function createStorageAsync(_0) {
    return _async_to_generator(function* (path, opts = {}) {
      return new Promise((r) => createStorageAndCallback(path, r, opts));
    }).apply(this, arguments);
  }
  function preloadStorageIfExists(path) {
    return _async_to_generator(function* () {
      if (_loadedStorage[path])
        return true;
      var backend = createFileBackend2(path);
      if (yield backend.exists()) {
        _loadedStorage[path] = yield backend.get();
        return true;
      }
      return false;
    })();
  }
  function purgeStorage2(path) {
    return _async_to_generator(function* () {
      yield removeFile(path);
      delete _loadedStorage[path];
    })();
  }
  function awaitStorage2(...proxies) {
    return Promise.all(proxies.map((proxy) => proxy[storagePromiseSymbol]));
  }
  function getPreloadedStorage(path) {
    return _loadedStorage[path];
  }
  var storageInitErrorSymbol, storagePromiseSymbol, _loadedStorage, createStorage2;
  var init_storage2 = __esm({
    "src/lib/api/storage/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_Emitter();
      init_object_observer_min();
      init_fs();
      init_dist();
      storageInitErrorSymbol = Symbol.for("bunny.storage.initError");
      storagePromiseSymbol = Symbol.for("bunny.storage.promise");
      _loadedStorage = {};
      createStorage2 = (path, opts = {}) => {
        var promise = new Promise((r) => resolvePromise = r);
        var awaited, resolved, error, resolvePromise;
        createStorageAndCallback(path, (proxy) => {
          awaited = proxy;
          resolved = true;
          resolvePromise();
        }, opts);
        var check = () => {
          if (resolved)
            return true;
          throw new Error(`Attempted to access storage without initializing: ${path}`);
        };
        return new Proxy({}, {
          ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map((k) => [
            k,
            (t, ...a) => {
              return check() && Reflect[k](awaited, ...a);
            }
          ])),
          get(target, prop, recv) {
            if (prop === storageInitErrorSymbol)
              return error;
            if (prop === storagePromiseSymbol)
              return promise;
            return check() && Reflect.get(awaited ?? target, prop, recv);
          }
        });
      };
    }
  });

  // src/lib/utils/constants.ts
  var constants_exports = {};
  __export(constants_exports, {
    BUNNY_PROXY_PREFIX: () => BUNNY_PROXY_PREFIX,
    CODEBERG: () => CODEBERG,
    DISCORD_SERVER: () => DISCORD_SERVER,
    GITHUB: () => GITHUB,
    HTTP_REGEX: () => HTTP_REGEX,
    HTTP_REGEX_MULTI: () => HTTP_REGEX_MULTI,
    KETTU_DISCORD_SERVER_ID: () => KETTU_DISCORD_SERVER_ID,
    KETTU_PLUGINS_CHANNEL_ID: () => KETTU_PLUGINS_CHANNEL_ID,
    KETTU_THEMES_CHANNEL_ID: () => KETTU_THEMES_CHANNEL_ID,
    NEXPID_PLUGINS_REPO_URL: () => NEXPID_PLUGINS_REPO_URL,
    OFFICIAL_PLUGINS_REPO_URL: () => OFFICIAL_PLUGINS_REPO_URL,
    VD_DISCORD_SERVER_ID: () => VD_DISCORD_SERVER_ID,
    VD_PLUGINS_CHANNEL_ID: () => VD_PLUGINS_CHANNEL_ID,
    VD_PROXY_PREFIX: () => VD_PROXY_PREFIX,
    VD_THEMES_CHANNEL_ID: () => VD_THEMES_CHANNEL_ID
  });
  var DISCORD_SERVER, CODEBERG, GITHUB, HTTP_REGEX, HTTP_REGEX_MULTI, BUNNY_PROXY_PREFIX, NEXPID_PLUGINS_REPO_URL, OFFICIAL_PLUGINS_REPO_URL, VD_PROXY_PREFIX, VD_DISCORD_SERVER_ID, VD_PLUGINS_CHANNEL_ID, VD_THEMES_CHANNEL_ID, KETTU_DISCORD_SERVER_ID, KETTU_PLUGINS_CHANNEL_ID, KETTU_THEMES_CHANNEL_ID;
  var init_constants = __esm({
    "src/lib/utils/constants.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      DISCORD_SERVER = "https://discord.gg/6cN7wKa8gp";
      CODEBERG = "https://codeberg.org/cocobo1/Kettu";
      GITHUB = "https://github.com/C0C0B01/Kettu";
      HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
      HTTP_REGEX_MULTI = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
      BUNNY_PROXY_PREFIX = "https://bn-plugins.github.io/vd-proxy";
      NEXPID_PLUGINS_REPO_URL = "https://revenge.nexpid.xyz";
      OFFICIAL_PLUGINS_REPO_URL = "";
      VD_PROXY_PREFIX = "https://vd-plugins.github.io/proxy";
      VD_DISCORD_SERVER_ID = "1015931589865246730";
      VD_PLUGINS_CHANNEL_ID = "1091880384561684561";
      VD_THEMES_CHANNEL_ID = "1091880434939482202";
      KETTU_DISCORD_SERVER_ID = "1368145952266911755";
      KETTU_PLUGINS_CHANNEL_ID = "1432796541210333284";
      KETTU_THEMES_CHANNEL_ID = "1408405946434195540";
    }
  });

  // src/lib/utils/cyrb64.ts
  function cyrb64(str, seed = 0) {
    var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
    h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
    h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return [
      h2 >>> 0,
      h1 >>> 0
    ];
  }
  function cyrb64Hash(str, seed = 0) {
    var [h2, h1] = cyrb64(str, seed);
    return h2.toString(36).padStart(7, "0") + h1.toString(36).padStart(7, "0");
  }
  var init_cyrb64 = __esm({
    "src/lib/utils/cyrb64.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/utils/findInReactTree.ts
  function findInReactTree(tree, filter) {
    return findInTree(tree, filter, {
      walkable: [
        "props",
        "children",
        "child",
        "sibling"
      ]
    });
  }
  var init_findInReactTree = __esm({
    "src/lib/utils/findInReactTree.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_utils();
    }
  });

  // src/lib/utils/findInTree.ts
  function treeSearch(tree, filter, opts, depth) {
    if (depth > opts.maxDepth)
      return;
    if (!tree)
      return;
    try {
      if (filter(tree))
        return tree;
    } catch (e) {
    }
    if (Array.isArray(tree)) {
      for (var item of tree) {
        if (typeof item !== "object" || item === null)
          continue;
        try {
          var found = treeSearch(item, filter, opts, depth + 1);
          if (found)
            return found;
        } catch (e) {
        }
      }
    } else if (typeof tree === "object") {
      for (var key of Object.keys(tree)) {
        if (typeof tree[key] !== "object" || tree[key] === null)
          continue;
        if (opts.walkable.length && !opts.walkable.includes(key))
          continue;
        if (opts.ignore.includes(key))
          continue;
        try {
          var found1 = treeSearch(tree[key], filter, opts, depth + 1);
          if (found1)
            return found1;
        } catch (e) {
        }
      }
    }
  }
  function findInTree(tree, filter, { walkable = [], ignore = [], maxDepth = 100 } = {}) {
    return treeSearch(tree, filter, {
      walkable,
      ignore,
      maxDepth
    }, 0);
  }
  var init_findInTree = __esm({
    "src/lib/utils/findInTree.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/utils/hookDefineProperty.ts
  function hookDefineProperty(target, property, cb) {
    var targetAsAny = target;
    if (property in target) {
      return void cb(targetAsAny[property]);
    }
    var value;
    Object.defineProperty(targetAsAny, property, {
      get: () => value,
      set(v2) {
        value = cb(v2) ?? v2;
      },
      configurable: true,
      enumerable: false
    });
    return () => {
      delete targetAsAny[property];
      targetAsAny[property] = value;
    };
  }
  var init_hookDefineProperty = __esm({
    "src/lib/utils/hookDefineProperty.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/utils/invariant.ts
  function invariant(condition, message) {
    if (condition)
      return;
    var resolvedMessage = typeof message === "function" ? message() : message;
    var prefix = "[Invariant Violation]";
    var value = resolvedMessage ? `${prefix}: ${resolvedMessage}` : prefix;
    throw new Error(value);
  }
  var init_invariant = __esm({
    "src/lib/utils/invariant.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/utils/logger.ts
  var logger_exports = {};
  __export(logger_exports, {
    LoggerClass: () => LoggerClass,
    connectToDebugger: () => connectToDebugger,
    disconnectFromDebugger: () => disconnectFromDebugger,
    isConnectedToDebugger: () => isConnectedToDebugger,
    logger: () => logger
  });
  function serializeMessage(msg) {
    return JSON.stringify(msg);
  }
  function sendLog(level, ...args) {
    if (socket?.readyState === WebSocket.OPEN) {
      var message = {
        type: "log",
        data: {
          level,
          message: args
        }
      };
      socket.send(serializeMessage(message));
    }
  }
  function patchConsoleAndLogger() {
    originalConsoleLog = console.log;
    console.log = function(...args) {
      originalConsoleLog.apply(console, args);
      sendLog("default", ...args);
    };
    originalConsoleError = console.error;
    console.error = function(...args) {
      originalConsoleError.apply(console, args);
      sendLog("error", ...args);
    };
    originalConsoleWarn = console.warn;
    console.warn = function(...args) {
      originalConsoleWarn.apply(console, args);
      sendLog("warn", ...args);
    };
    if (logger) {
      originalLoggerLog = logger.log;
      logger.log = function(...args) {
        originalLoggerLog.apply(logger, args);
        sendLog("default", ...args);
      };
      originalLoggerError = logger.error;
      logger.error = function(...args) {
        originalLoggerError.apply(logger, args);
        sendLog("error", ...args);
      };
      originalLoggerWarn = logger.warn;
      logger.warn = function(...args) {
        originalLoggerWarn.apply(logger, args);
        sendLog("warn", ...args);
      };
    }
  }
  function unpatchConsoleAndLogger() {
    if (originalConsoleLog) {
      console.log = originalConsoleLog;
      originalConsoleLog = void 0;
    }
    if (originalConsoleError) {
      console.error = originalConsoleError;
      originalConsoleError = void 0;
    }
    if (originalConsoleWarn) {
      console.warn = originalConsoleWarn;
      originalConsoleWarn = void 0;
    }
    if (logger) {
      if (originalLoggerLog) {
        logger.log = originalLoggerLog;
        originalLoggerLog = void 0;
      }
      if (originalLoggerError) {
        logger.error = originalLoggerError;
        originalLoggerError = void 0;
      }
      if (originalLoggerWarn) {
        logger.warn = originalLoggerWarn;
        originalLoggerWarn = void 0;
      }
    }
  }
  function connectToDebugger(url2) {
    if (socket !== void 0 && socket.readyState !== WebSocket.CLOSED) {
      unpatchConsoleAndLogger();
      socket.close();
    }
    if (!url2) {
      console.error("Invalid debugger URL!");
      return;
    }
    try {
      socket = new WebSocket(`ws://${url2}`);
      socket.addEventListener("open", () => {
        console.log("Connected to debugger.");
        var hello = {
          type: "hello",
          data: {
            version: VERSION
          }
        };
        socket?.send(serializeMessage(hello));
        patchConsoleAndLogger();
      });
      socket.addEventListener("message", (message) => {
        try {
          var data = JSON.parse(message.data);
          if (data.type === "run" && data.data?.code) {
            try {
              (0, eval)(data.data.code);
            } catch (e) {
              console.error("Error executing remote code:", e);
            }
          }
        } catch (e) {
          console.error("Error processing message:", e);
        }
      });
      socket.addEventListener("close", () => {
        console.log("Disconnected from debugger.");
        unpatchConsoleAndLogger();
      });
      socket.addEventListener("error", (err) => {
        console.error(`Debugger error: ${err.message}`);
        unpatchConsoleAndLogger();
      });
    } catch (e) {
      console.error("Failed to connect to debugger:", e);
    }
  }
  function disconnectFromDebugger() {
    if (socket) {
      unpatchConsoleAndLogger();
      socket.close();
      socket = void 0;
    }
  }
  function isConnectedToDebugger() {
    return socket?.readyState === WebSocket.OPEN;
  }
  var LoggerClass, logger, socket, originalConsoleLog, originalConsoleError, originalConsoleWarn, originalLoggerLog, originalLoggerError, originalLoggerWarn, VERSION;
  var init_logger = __esm({
    "src/lib/utils/logger.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_wrappers();
      LoggerClass = findByNameLazy("Logger");
      logger = new LoggerClass("Kettu");
      VERSION = 1;
    }
  });

  // src/lib/utils/safeFetch.ts
  function safeFetch(input, options, timeout = 1e4) {
    return _async_to_generator(function* () {
      var req = yield fetch(input, {
        signal: timeoutSignal(timeout),
        ...options
      });
      if (!req.ok)
        throw new Error(`Request returned non-ok: ${req.status} ${req.statusText}`);
      return req;
    })();
  }
  function timeoutSignal(ms) {
    var controller = new AbortController();
    setTimeout(() => controller.abort(`Timed out after ${ms}ms`), ms);
    return controller.signal;
  }
  var init_safeFetch = __esm({
    "src/lib/utils/safeFetch.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
    }
  });

  // src/lib/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    constants: () => constants_exports,
    cyrb64: () => cyrb64,
    findInReactTree: () => findInReactTree,
    findInTree: () => findInTree,
    hookDefineProperty: () => hookDefineProperty,
    invariant: () => invariant,
    lazy: () => lazy_exports,
    logger: () => logger_exports,
    safeFetch: () => safeFetch
  });
  var init_utils = __esm({
    "src/lib/utils/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_constants();
      init_cyrb64();
      init_findInReactTree();
      init_findInTree();
      init_hookDefineProperty();
      init_invariant();
      init_lazy();
      init_logger();
      init_safeFetch();
    }
  });

  // shims/jsxRuntime.ts
  var jsxRuntime_exports = {};
  __export(jsxRuntime_exports, {
    Fragment: () => Fragment,
    jsx: () => jsx,
    jsxs: () => jsxs
  });
  function unproxyFirstArg(args) {
    if (!args[0]) {
      throw new Error("The first argument (Component) is falsy. Ensure that you are passing a valid component.");
    }
    var factory = getProxyFactory(args[0]);
    if (factory)
      args[0] = factory();
    return args;
  }
  var jsxRuntime, Fragment, jsx, jsxs;
  var init_jsxRuntime = __esm({
    "shims/jsxRuntime.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_lazy();
      init_wrappers();
      jsxRuntime = findByPropsLazy("jsx", "jsxs", "Fragment");
      Fragment = Symbol.for("react.fragment");
      jsx = (...args) => jsxRuntime.jsx(...unproxyFirstArg(args));
      jsxs = (...args) => jsxRuntime.jsxs(...unproxyFirstArg(args));
    }
  });

  // src/lib/addons/themes/colors/preferences.ts
  var colorsPref;
  var init_preferences = __esm({
    "src/lib/addons/themes/colors/preferences.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_storage2();
      colorsPref = createStorage2("themes/colors/preferences.json", {
        dflt: {
          selected: null,
          customBackground: null
        }
      });
    }
  });

  // src/metro/common/components.ts
  var components_exports = {};
  __export(components_exports, {
    ActionSheet: () => ActionSheet,
    ActionSheetRow: () => ActionSheetRow,
    AlertActionButton: () => AlertActionButton,
    AlertActions: () => AlertActions,
    AlertModal: () => AlertModal,
    Avatar: () => Avatar,
    AvatarPile: () => AvatarPile,
    BottomSheetTitleHeader: () => BottomSheetTitleHeader,
    Button: () => Button,
    Card: () => Card,
    CompatButton: () => CompatButton,
    CompatSegmentedControl: () => CompatSegmentedControl,
    ContextMenu: () => ContextMenu,
    FlashList: () => FlashList,
    FloatingActionButton: () => FloatingActionButton,
    FormCheckbox: () => FormCheckbox,
    FormRadio: () => FormRadio,
    FormSwitch: () => FormSwitch,
    Forms: () => Forms,
    HelpMessage: () => HelpMessage,
    IconButton: () => IconButton,
    LegacyAlert: () => LegacyAlert,
    LegacyForm: () => LegacyForm,
    LegacyFormArrow: () => LegacyFormArrow,
    LegacyFormCTA: () => LegacyFormCTA,
    LegacyFormCTAButton: () => LegacyFormCTAButton,
    LegacyFormCardSection: () => LegacyFormCardSection,
    LegacyFormCheckbox: () => LegacyFormCheckbox,
    LegacyFormCheckboxRow: () => LegacyFormCheckboxRow,
    LegacyFormCheckmark: () => LegacyFormCheckmark,
    LegacyFormDivider: () => LegacyFormDivider,
    LegacyFormHint: () => LegacyFormHint,
    LegacyFormIcon: () => LegacyFormIcon,
    LegacyFormInput: () => LegacyFormInput,
    LegacyFormLabel: () => LegacyFormLabel,
    LegacyFormRadio: () => LegacyFormRadio,
    LegacyFormRadioGroup: () => LegacyFormRadioGroup,
    LegacyFormRadioRow: () => LegacyFormRadioRow,
    LegacyFormRow: () => LegacyFormRow,
    LegacyFormSection: () => LegacyFormSection,
    LegacyFormSelect: () => LegacyFormSelect,
    LegacyFormSliderRow: () => LegacyFormSliderRow,
    LegacyFormSubLabel: () => LegacyFormSubLabel,
    LegacyFormSwitch: () => LegacyFormSwitch,
    LegacyFormSwitchRow: () => LegacyFormSwitchRow,
    LegacyFormTernaryCheckBox: () => LegacyFormTernaryCheckBox,
    LegacyFormText: () => LegacyFormText,
    LegacyFormTitle: () => LegacyFormTitle,
    PressableScale: () => PressableScale,
    RedesignCompat: () => RedesignCompat,
    RowButton: () => RowButton,
    SafeAreaProvider: () => SafeAreaProvider,
    SafeAreaView: () => SafeAreaView,
    SegmentedControl: () => SegmentedControl,
    SegmentedControlPages: () => SegmentedControlPages,
    Stack: () => Stack,
    TableCheckbox: () => TableCheckbox,
    TableCheckboxRow: () => TableCheckboxRow,
    TableRadio: () => TableRadio,
    TableRadioGroup: () => TableRadioGroup,
    TableRadioRow: () => TableRadioRow,
    TableRow: () => TableRow,
    TableRowGroup: () => TableRowGroup,
    TableRowIcon: () => TableRowIcon,
    TableRowTrailingText: () => TableRowTrailingText,
    TableSwitch: () => TableSwitch,
    TableSwitchRow: () => TableSwitchRow,
    Text: () => Text,
    TextArea: () => TextArea,
    TextInput: () => TextInput,
    TwinButtons: () => TwinButtons,
    useSafeAreaInsets: () => useSafeAreaInsets,
    useSegmentedControlState: () => useSegmentedControlState
  });
  var bySingularProp, findSingular, findProp, LegacyAlert, CompatButton, HelpMessage, SafeAreaView, SafeAreaProvider, useSafeAreaInsets, ActionSheetRow, Button, TwinButtons, IconButton, RowButton, PressableScale, TableRow, TableRowIcon, TableRowTrailingText, TableRowGroup, TableRadioGroup, TableRadioRow, TableSwitchRow, TableCheckboxRow, TableSwitch, TableRadio, TableCheckbox, FormSwitch, FormRadio, FormCheckbox, Card, RedesignCompat, AlertModal, AlertActionButton, AlertActions, AvatarPile, ContextMenu, Stack, Avatar, TextInput, TextArea, SegmentedControl, SegmentedControlPages, useSegmentedControlState, CompatSegmentedControl, FloatingActionButton, ActionSheet, BottomSheetTitleHeader, textsModule, Text, Forms, LegacyForm, LegacyFormArrow, LegacyFormCTA, LegacyFormCTAButton, LegacyFormCardSection, LegacyFormCheckbox, LegacyFormCheckboxRow, LegacyFormCheckmark, LegacyFormDivider, LegacyFormHint, LegacyFormIcon, LegacyFormInput, LegacyFormLabel, LegacyFormRadio, LegacyFormRadioGroup, LegacyFormRadioRow, LegacyFormRow, LegacyFormSection, LegacyFormSelect, LegacyFormSliderRow, LegacyFormSubLabel, LegacyFormSwitch, LegacyFormSwitchRow, LegacyFormTernaryCheckBox, LegacyFormText, LegacyFormTitle, FlashList;
  var init_components = __esm({
    "src/metro/common/components.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_lazy();
      init_factories();
      init_finders();
      init_wrappers();
      bySingularProp = createFilterDefinition(([prop], m2) => m2[prop] && Object.keys(m2).length === 1, (prop) => `bunny.metro.common.components.bySingularProp(${prop})`);
      findSingular = (prop) => proxyLazy(() => findExports(bySingularProp(prop))?.[prop]);
      findProp = (...props) => proxyLazy(() => findByProps(...props)[props[0]]);
      LegacyAlert = findByDisplayNameLazy("FluxContainer(Alert)");
      CompatButton = findByPropsLazy("Looks", "Colors", "Sizes");
      HelpMessage = findByNameLazy("HelpMessage");
      ({ SafeAreaView, SafeAreaProvider, useSafeAreaInsets } = lazyDestructure(() => findByProps("useSafeAreaInsets")));
      ActionSheetRow = findProp("ActionSheetRow");
      Button = findSingular("Button");
      TwinButtons = findProp("TwinButtons");
      IconButton = findSingular("IconButton");
      RowButton = findProp("RowButton");
      PressableScale = findProp("PressableScale");
      TableRow = findProp("TableRow");
      TableRowIcon = findProp("TableRowIcon");
      TableRowTrailingText = findProp("TableRowTrailingText");
      TableRowGroup = findProp("TableRowGroup");
      TableRadioGroup = findProp("TableRadioGroup");
      TableRadioRow = findProp("TableRadioRow");
      TableSwitchRow = findProp("TableSwitchRow");
      TableCheckboxRow = findProp("TableCheckboxRow");
      TableSwitch = findSingular("FormSwitch");
      TableRadio = findSingular("FormRadio");
      TableCheckbox = findSingular("FormCheckbox");
      FormSwitch = findSingular("FormSwitch");
      FormRadio = findSingular("FormRadio");
      FormCheckbox = findSingular("FormCheckbox");
      Card = findProp("Card");
      RedesignCompat = proxyLazy(() => findByProps("RedesignCompat").RedesignCompat);
      AlertModal = findProp("AlertModal");
      AlertActionButton = findProp("AlertActionButton");
      AlertActions = findProp("AlertActions");
      AvatarPile = findSingular("AvatarPile");
      ContextMenu = findProp("ContextMenu");
      Stack = findProp("Stack");
      Avatar = findProp("default", "AvatarSizes", "getStatusSize");
      TextInput = findSingular("TextInput");
      TextArea = findSingular("TextArea");
      SegmentedControl = findProp("SegmentedControl");
      SegmentedControlPages = findProp("SegmentedControlPages");
      useSegmentedControlState = findSingular("useSegmentedControlState");
      CompatSegmentedControl = findProp("CompatSegmentedControl");
      FloatingActionButton = findProp("FloatingActionButton");
      ActionSheet = findProp("ActionSheet");
      BottomSheetTitleHeader = findProp("BottomSheetTitleHeader");
      textsModule = findByPropsLazy("Text", "LegacyText");
      Text = proxyLazy(() => textsModule.Text);
      Forms = findByPropsLazy("Form", "FormSection");
      ({ Form: LegacyForm, FormArrow: LegacyFormArrow, FormCTA: LegacyFormCTA, FormCTAButton: LegacyFormCTAButton, FormCardSection: LegacyFormCardSection, FormCheckbox: LegacyFormCheckbox, FormCheckboxRow: LegacyFormCheckboxRow, FormCheckmark: LegacyFormCheckmark, FormDivider: LegacyFormDivider, FormHint: LegacyFormHint, FormIcon: LegacyFormIcon, FormInput: LegacyFormInput, FormLabel: LegacyFormLabel, FormRadio: LegacyFormRadio, FormRadioGroup: LegacyFormRadioGroup, FormRadioRow: LegacyFormRadioRow, FormRow: LegacyFormRow, FormSection: LegacyFormSection, FormSelect: LegacyFormSelect, FormSliderRow: LegacyFormSliderRow, FormSubLabel: LegacyFormSubLabel, FormSwitch: LegacyFormSwitch, FormSwitchRow: LegacyFormSwitchRow, FormTernaryCheckBox: LegacyFormTernaryCheckBox, FormText: LegacyFormText, FormTitle: LegacyFormTitle } = lazyDestructure(() => Forms));
      FlashList = findProp("FlashList");
    }
  });

  // src/metro/common/index.ts
  var common_exports = {};
  __export(common_exports, {
    Flux: () => Flux,
    FluxDispatcher: () => FluxDispatcher,
    FluxUtils: () => FluxUtils,
    NavigationNative: () => NavigationNative,
    React: () => React2,
    ReactNative: () => ReactNative,
    assets: () => assets,
    channels: () => channels,
    clipboard: () => clipboard,
    commands: () => commands,
    components: () => components_exports,
    constants: () => constants,
    i18n: () => i18n,
    invites: () => invites,
    messageUtil: () => messageUtil,
    navigation: () => navigation,
    navigationStack: () => navigationStack,
    semver: () => semver,
    toasts: () => toasts,
    tokens: () => tokens,
    url: () => url,
    useToken: () => useToken
  });
  var import_react_native2, constants, channels, i18n, clipboard, assets, invites, commands, navigation, toasts, messageUtil, navigationStack, NavigationNative, semver, tokens, useToken, openURL, url, Flux, FluxDispatcher, FluxUtils, React2, ReactNative;
  var init_common = __esm({
    "src/metro/common/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_lazy();
      init_wrappers();
      import_react_native2 = __toESM(require_react_native());
      init_components();
      constants = findByPropsLazy("Fonts", "Permissions");
      channels = findByPropsLazy("getVoiceChannelId");
      i18n = findByPropsLazy("Messages");
      clipboard = findByPropsLazy("setString", "getString", "hasString");
      assets = findByPropsLazy("registerAsset");
      invites = findByPropsLazy("acceptInviteAndTransitionToInviteChannel");
      commands = findByPropsLazy("getBuiltInCommands");
      navigation = findByPropsLazy("pushLazy");
      toasts = findByFilePathLazy("modules/toast/native/ToastActionCreators.tsx", true);
      messageUtil = findByPropsLazy("sendBotMessage");
      navigationStack = findByPropsLazy("createStackNavigator");
      NavigationNative = findByPropsLazy("NavigationContainer");
      semver = findByPropsLazy("parse", "clean");
      tokens = findByPropsLazy("unsafe_rawColors", "colors");
      ({ useToken } = lazyDestructure(() => findByProps("useToken")));
      openURL = (url2) => import_react_native2.Linking.openURL(url2);
      url = nativeModuleProxy.NativeLinkingModule || nativeModuleProxy.DCDLinkingManager ? {
        openURL,
        openDeeplink: openURL,
        handleSupportedURL: openURL,
        isDiscordConnectOauth2Deeplink: () => {
          console.warn("url.isDiscordConnectOauth2Deeplink is not implemented and will always return false");
          return false;
        },
        showLongPressUrlActionSheet: () => console.warn("url.showLongPressUrlActionSheet is not implemented"),
        handleMessageLinking: findByFilePathLazy("modules/links/native/handleContentLinking.tsx", true)
      } : findByPropsLazy("openURL", "openDeeplink");
      Flux = findByPropsLazy("connectStores");
      FluxDispatcher = findByProps("_interceptors");
      FluxUtils = findByProps("useStateFromStores");
      React2 = globalThis.React = findByPropsLazy("createElement");
      ReactNative = globalThis.ReactNative = findByPropsLazy("AppRegistry");
    }
  });

  // src/metro/index.ts
  var metro_exports = {};
  __export(metro_exports, {
    common: () => common_exports,
    factories: () => factories_exports,
    filters: () => filters_exports,
    findAllExports: () => findAllExports,
    findAllModule: () => findAllModule,
    findAllModuleId: () => findAllModuleId,
    findByDisplayName: () => findByDisplayName,
    findByDisplayNameAll: () => findByDisplayNameAll,
    findByDisplayNameLazy: () => findByDisplayNameLazy,
    findByFilePath: () => findByFilePath,
    findByFilePathLazy: () => findByFilePathLazy,
    findByName: () => findByName,
    findByNameAll: () => findByNameAll,
    findByNameLazy: () => findByNameLazy,
    findByProps: () => findByProps,
    findByPropsAll: () => findByPropsAll,
    findByPropsLazy: () => findByPropsLazy,
    findByStoreName: () => findByStoreName,
    findByStoreNameLazy: () => findByStoreNameLazy,
    findByTypeName: () => findByTypeName,
    findByTypeNameAll: () => findByTypeNameAll,
    findByTypeNameLazy: () => findByTypeNameLazy,
    findExports: () => findExports,
    findModule: () => findModule,
    findModuleId: () => findModuleId,
    lazy: () => lazy_exports2
  });
  var init_metro = __esm({
    "src/metro/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_common();
      init_factories();
      init_filters();
      init_finders();
      init_lazy2();
      init_wrappers();
    }
  });

  // globals:chroma-js
  var require_chroma_js = __commonJS({
    "globals:chroma-js"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["chroma-js"];
    }
  });

  // src/lib/addons/themes/colors/parser.ts
  function parseColorManifest(manifest) {
    var resolveType = (type2 = "dark") => (colorsPref.type ?? type2) === "dark" ? "darker" : "light";
    if (manifest.spec === 3) {
      var semanticColorDefinitions = {};
      for (var [semanticColorKey, semanticColorValue] of Object.entries(manifest.main.semantic ?? {})) {
        if (typeof semanticColorValue === "object") {
          var { type, value, opacity: semanticColorOpacity } = semanticColorValue;
          if (type === "raw") {
            semanticColorDefinitions[semanticColorKey] = {
              value,
              opacity: semanticColorOpacity ?? 1
            };
          } else {
            var rawColorValue = tokenRef.RawColor[value];
            semanticColorDefinitions[semanticColorKey] = {
              value: rawColorValue,
              opacity: semanticColorOpacity ?? 1
            };
          }
        } else if (typeof semanticColorValue === "string") {
          if (semanticColorValue.startsWith("#")) {
            semanticColorDefinitions[semanticColorKey] = {
              value: import_chroma_js.default.hex(semanticColorValue).hex(),
              opacity: 1
            };
          } else {
            semanticColorDefinitions[semanticColorKey] = {
              value: tokenRef.RawColor[semanticColorValue],
              opacity: 1
            };
          }
        } else {
          throw new Error(`Invalid semantic definitions: ${semanticColorValue}`);
        }
      }
      if (import_react_native3.Platform.OS === "android")
        applyAndroidAlphaKeys(manifest.main.raw);
      return {
        spec: 3,
        reference: resolveType(manifest.type),
        semantic: semanticColorDefinitions,
        raw: manifest.main.raw ?? {},
        background: manifest.main.background
      };
    }
    if (manifest.spec === 2) {
      var semanticDefinitions = {};
      var background = manifest.background ? {
        ...omit(manifest.background, [
          "alpha"
        ]),
        opacity: manifest.background.alpha
      } : void 0;
      if (manifest.semanticColors) {
        for (var key in manifest.semanticColors) {
          var values = manifest.semanticColors[key].map((c2) => c2 || void 0).slice(0, 2);
          if (!values[0])
            continue;
          semanticDefinitions[key] = {
            value: normalizeToHex(values[resolveType() === "light" ? 1 : 0]),
            opacity: 1
          };
        }
      }
      if (manifest.rawColors) {
        var draft = {};
        for (var key1 in manifest.rawColors) {
          var value1 = manifest.rawColors[key1];
          if (!value1)
            continue;
          draft[key1] = normalizeToHex(value1);
        }
        if (import_react_native3.Platform.OS === "android")
          applyAndroidAlphaKeys(draft);
        manifest.rawColors = draft;
      }
      return {
        spec: 2,
        reference: resolveType(),
        semantic: semanticDefinitions,
        raw: manifest.rawColors ?? {},
        background
      };
    }
    if (manifest.spec === 1 || manifest.theme_color_map && !manifest.spec) {
      var semanticDefinitions1 = {};
      var rawDefinitions = {};
      var themeIndex = resolveType() === "light" ? 1 : 0;
      if (manifest.theme_color_map) {
        for (var [key2, colorArray] of Object.entries(manifest.theme_color_map)) {
          if (!Array.isArray(colorArray) || colorArray.length < 2) {
            console.warn(`[Parser] Invalid color array for ${key2}:`, colorArray);
            continue;
          }
          var colorValue = colorArray[themeIndex];
          if (!colorValue) {
            console.warn(`[Parser] Missing color value for ${key2} at index ${themeIndex}`);
            continue;
          }
          var normalized = normalizeToHex(colorValue);
          if (normalized) {
            semanticDefinitions1[key2] = {
              value: normalized,
              opacity: 1
            };
          }
        }
      }
      var rawColors2 = manifest.colours || manifest.colors;
      if (rawColors2) {
        for (var [key3, colorValue1] of Object.entries(rawColors2)) {
          if (typeof colorValue1 !== "string")
            continue;
          var normalized1 = normalizeToHex(colorValue1);
          if (normalized1) {
            var discordKey = convertEnmityToDiscordRawKey(key3);
            rawDefinitions[discordKey] = normalized1;
            if (discordKey !== key3) {
              rawDefinitions[key3] = normalized1;
            }
          }
        }
      }
      if (manifest.unsafe_colors) {
        for (var [key4, colorValue2] of Object.entries(manifest.unsafe_colors)) {
          if (typeof colorValue2 !== "string")
            continue;
          var normalized2 = normalizeToHex(colorValue2);
          if (normalized2) {
            rawDefinitions[key4] = normalized2;
          }
        }
      }
      if (import_react_native3.Platform.OS === "android")
        applyAndroidAlphaKeys(rawDefinitions);
      return {
        spec: 2,
        reference: resolveType(),
        semantic: semanticDefinitions1,
        raw: rawDefinitions,
        background: manifest.background
      };
    }
    throw new Error("Invalid theme spec");
  }
  function convertEnmityToDiscordRawKey(enmityKey) {
    var conversions = {
      "PRIMARY_DARK": "PRIMARY_100",
      "PRIMARY_DARK_100": "PRIMARY_100",
      "PRIMARY_DARK_200": "PRIMARY_200",
      "PRIMARY_DARK_300": "PRIMARY_300",
      "PRIMARY_DARK_360": "PRIMARY_360",
      "PRIMARY_DARK_400": "PRIMARY_400",
      "PRIMARY_DARK_500": "PRIMARY_500",
      "PRIMARY_DARK_600": "PRIMARY_600",
      "PRIMARY_DARK_630": "PRIMARY_630",
      "PRIMARY_DARK_700": "PRIMARY_700",
      "PRIMARY_DARK_800": "PRIMARY_800",
      "PRIMARY_DARK_900": "PRIMARY_900"
    };
    return conversions[enmityKey] || enmityKey;
  }
  function applyAndroidAlphaKeys(rawColors2) {
    if (!rawColors2)
      return;
    var alphaMap = {
      "BLACK_ALPHA_60": [
        "BLACK",
        0.6
      ],
      "BRAND_NEW_360_ALPHA_20": [
        "BRAND_360",
        0.2
      ],
      "BRAND_NEW_360_ALPHA_25": [
        "BRAND_360",
        0.25
      ],
      "BRAND_NEW_500_ALPHA_20": [
        "BRAND_500",
        0.2
      ],
      "PRIMARY_DARK_500_ALPHA_20": [
        "PRIMARY_500",
        0.2
      ],
      "PRIMARY_DARK_700_ALPHA_60": [
        "PRIMARY_700",
        0.6
      ],
      "STATUS_GREEN_500_ALPHA_20": [
        "GREEN_500",
        0.2
      ],
      "STATUS_RED_500_ALPHA_20": [
        "RED_500",
        0.2
      ]
    };
    for (var key in alphaMap) {
      var [colorKey, alpha] = alphaMap[key];
      if (!rawColors2[colorKey])
        continue;
      rawColors2[key] = (0, import_chroma_js.default)(rawColors2[colorKey]).alpha(alpha).hex();
    }
    return rawColors2;
  }
  function normalizeToHex(colorString) {
    if (colorString === void 0)
      return void 0;
    if (colorString.toLowerCase() === "transparent") {
      return "#00000000";
    }
    if (import_chroma_js.default.valid(colorString))
      return (0, import_chroma_js.default)(colorString).hex();
    var color2 = Number((0, import_react_native3.processColor)(colorString));
    return import_chroma_js.default.rgb(
      color2 >> 16 & 255,
      color2 >> 8 & 255,
      color2 & 255,
      color2 >> 24 & 255
      // alpha
    ).hex();
  }
  var import_chroma_js, import_react_native3, tokenRef;
  var init_parser = __esm({
    "src/lib/addons/themes/colors/parser.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_metro();
      import_chroma_js = __toESM(require_chroma_js());
      init_dist();
      import_react_native3 = __toESM(require_react_native());
      init_preferences();
      tokenRef = findByProps("SemanticColor");
    }
  });

  // src/lib/addons/themes/colors/updater.ts
  function updateBunnyColor(colorManifest, { update = true }) {
    if (settings.safeMode?.enabled)
      return;
    var internalDef = colorManifest ? parseColorManifest(colorManifest) : null;
    var ref = Object.assign(_colorRef, {
      current: internalDef,
      key: `bn-theme-${++_inc}`,
      lastSetDiscordTheme: !ThemeStore.theme.startsWith("bn-theme-") ? ThemeStore.theme : _colorRef.lastSetDiscordTheme
    });
    if (internalDef != null) {
      tokenRef2.Theme[ref.key.toUpperCase()] = ref.key;
      FormDivider.DIVIDER_COLORS[ref.key] = FormDivider.DIVIDER_COLORS[ref.current.reference];
      Object.keys(tokenRef2.Shadow).forEach((k) => tokenRef2.Shadow[k][ref.key] = tokenRef2.Shadow[k][ref.current.reference]);
      Object.keys(tokenRef2.SemanticColor).forEach((k) => {
        tokenRef2.SemanticColor[k][ref.key] = {
          ...tokenRef2.SemanticColor[k][ref.current.reference]
        };
      });
    }
    if (update) {
      AppearanceManager.setShouldSyncAppearanceSettings(false);
      AppearanceManager.updateTheme(internalDef != null ? ref.key : ref.lastSetDiscordTheme);
    }
  }
  var tokenRef2, origRawColor, AppearanceManager, ThemeStore, FormDivider, _inc, _colorRef;
  var init_updater = __esm({
    "src/lib/addons/themes/colors/updater.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_settings();
      init_metro();
      init_parser();
      tokenRef2 = findByProps("SemanticColor");
      origRawColor = {
        ...tokenRef2.RawColor
      };
      AppearanceManager = findByPropsLazy("updateTheme");
      ThemeStore = findByStoreNameLazy("ThemeStore");
      FormDivider = findByPropsLazy("DIVIDER_COLORS");
      _inc = 1;
      _colorRef = {
        current: null,
        key: `bn-theme-${_inc}`,
        origRaw: origRawColor,
        lastSetDiscordTheme: "darker"
      };
    }
  });

  // src/lib/addons/themes/colors/patches/background.tsx
  function ThemeBackground({ children }) {
    useObservable([
      colorsPref
    ]);
    if (!_colorRef.current || colorsPref.customBackground === "hidden" || !_colorRef.current.background?.url || _colorRef.current.background?.blur && typeof _colorRef.current.background?.blur !== "number") {
      return children;
    }
    return /* @__PURE__ */ jsx(import_react_native4.ImageBackground, {
      style: {
        flex: 1,
        height: "100%"
      },
      source: {
        uri: _colorRef.current.background?.url
      },
      blurRadius: _colorRef.current.background?.blur,
      children
    });
  }
  function patchChatBackground() {
    try {
      var patches3 = [
        after("render", Messages, (_2, ret) => {
          if (!_colorRef.current || !_colorRef.current.background?.url)
            return;
          var messagesComponent = findInReactTree(ret, (x2) => x2 && "HACK_fixModalInteraction" in x2.props && x2?.props?.style);
          if (messagesComponent) {
            var flattened = import_react_native4.StyleSheet.flatten(messagesComponent.props.style);
            var backgroundColor = (0, import_chroma_js2.default)(flattened.backgroundColor || "black").alpha(1 - (_colorRef.current.background?.opacity ?? 1)).hex();
            messagesComponent.props.style = import_react_native4.StyleSheet.flatten([
              messagesComponent.props.style,
              {
                backgroundColor
              }
            ]);
          }
          return /* @__PURE__ */ jsx(ThemeBackground, {
            children: ret
          });
        })
      ];
      return () => patches3.forEach((x2) => x2());
    } catch (e) {
      logger.error("Failed to patch chat background.", e);
      return () => {
      };
    }
  }
  var import_chroma_js2, import_react_native4, Messages;
  var init_background = __esm({
    "src/lib/addons/themes/colors/patches/background.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_preferences();
      init_updater();
      init_patcher();
      init_storage2();
      init_utils();
      init_metro();
      import_chroma_js2 = __toESM(require_chroma_js());
      import_react_native4 = __toESM(require_react_native());
      init_logger();
      Messages = findByFilePathLazy("modules/messages/native/Messages.tsx", true);
    }
  });

  // src/lib/addons/themes/colors/patches/resolver.ts
  function patchDefinitionAndResolver() {
    var callback = ([theme]) => theme === _colorRef.key ? [
      _colorRef.current.reference
    ] : void 0;
    Object.keys(tokenReference.RawColor).forEach((key) => {
      Object.defineProperty(tokenReference.RawColor, key, {
        configurable: true,
        enumerable: true,
        get: () => {
          var ret = _colorRef.current?.raw[key];
          if (ret)
            return ret;
          return origRawColor2[key];
        }
      });
    });
    var unpatches = [
      before("isThemeDark", isThemeModule, callback),
      before("isThemeLight", isThemeModule, callback),
      before("updateTheme", NativeThemeModule, callback),
      instead("resolveSemanticColor", tokenReference.default.meta ?? tokenReference.default.internal, (args, orig) => {
        if (!_colorRef.current)
          return orig(...args);
        if (args[0] !== _colorRef.key)
          return orig(...args);
        args[0] = _colorRef.current.reference;
        var [name, colorDef] = extractInfo(_colorRef.current.reference, args[1]);
        var semanticDef = _colorRef.current.semantic[name];
        if (!semanticDef && _colorRef.current.spec === 2 && name in SEMANTIC_FALLBACK_MAP) {
          semanticDef = _colorRef.current.semantic[SEMANTIC_FALLBACK_MAP[name]];
        }
        if (semanticDef?.value) {
          if (semanticDef.opacity === 1)
            return semanticDef.value;
          return (0, import_chroma_js3.default)(semanticDef.value).alpha(semanticDef.opacity).hex();
        }
        var rawValue = _colorRef.current.raw[colorDef.raw];
        if (rawValue) {
          return colorDef.opacity === 1 ? rawValue : (0, import_chroma_js3.default)(rawValue).alpha(colorDef.opacity).hex();
        }
        return orig(...args);
      }),
      () => {
        Object.defineProperty(tokenReference, "RawColor", {
          configurable: true,
          writable: true,
          value: origRawColor2
        });
      }
    ];
    return () => unpatches.forEach((p) => p());
  }
  function extractInfo(themeName, colorObj) {
    var propName = colorObj[extractInfo._sym ??= Object.getOwnPropertySymbols(colorObj)[0]];
    var colorDef = tokenReference.SemanticColor[propName];
    return [
      propName,
      colorDef[themeName]
    ];
  }
  var import_chroma_js3, tokenReference, isThemeModule, SEMANTIC_FALLBACK_MAP, origRawColor2;
  var init_resolver = __esm({
    "src/lib/addons/themes/colors/patches/resolver.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_updater();
      init_modules();
      init_patcher();
      init_metro();
      init_filters();
      init_lazy2();
      import_chroma_js3 = __toESM(require_chroma_js());
      tokenReference = findByProps("SemanticColor");
      isThemeModule = createLazyModule(byMutableProp("isThemeDark"));
      SEMANTIC_FALLBACK_MAP = {
        "BG_BACKDROP": "BACKGROUND_FLOATING",
        "BG_BASE_PRIMARY": "BACKGROUND_PRIMARY",
        "BG_BASE_SECONDARY": "BACKGROUND_SECONDARY",
        "BG_BASE_TERTIARY": "BACKGROUND_SECONDARY_ALT",
        "BG_MOD_FAINT": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_STRONG": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_SUBTLE": "BACKGROUND_MODIFIER_ACCENT",
        "BG_SURFACE_OVERLAY": "BACKGROUND_FLOATING",
        "BG_SURFACE_OVERLAY_TMP": "BACKGROUND_FLOATING",
        "BG_SURFACE_RAISED": "BACKGROUND_MOBILE_PRIMARY"
      };
      origRawColor2 = {
        ...tokenReference.RawColor
      };
    }
  });

  // src/lib/addons/themes/colors/patches/storage.ts
  function patchStorage() {
    var patchedKeys = /* @__PURE__ */ new Set([
      "ThemeStore",
      "SelectivelySyncedUserSettingsStore"
    ]);
    var patches3 = [
      after("get", mmkvStorage, ([key], ret) => {
        if (!_colorRef.current || !patchedKeys.has(key))
          return;
        var state = findInTree(ret._state, (s) => typeof s.theme === "string");
        if (state)
          state.theme = _colorRef.key;
      }),
      before("set", mmkvStorage, ([key, value]) => {
        if (!patchedKeys.has(key))
          return;
        var json = JSON.stringify(value);
        var lastSetDiscordTheme = _colorRef.lastSetDiscordTheme ?? "darker";
        var replaced = json.replace(/"theme":"bn-theme-\d+"/, `"theme":${JSON.stringify(lastSetDiscordTheme)}`);
        return [
          key,
          JSON.parse(replaced)
        ];
      })
    ];
    return () => patches3.forEach((p) => p());
  }
  var mmkvStorage;
  var init_storage3 = __esm({
    "src/lib/addons/themes/colors/patches/storage.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_updater();
      init_patcher();
      init_utils();
      init_lazy();
      init_metro();
      mmkvStorage = proxyLazy(() => {
        var newModule = findByProps("impl");
        if (typeof newModule?.impl === "object")
          return newModule.impl;
        return findByProps("storage");
      });
    }
  });

  // src/lib/addons/themes/colors/index.ts
  function initColors(manifest) {
    if (manifest)
      updateBunnyColor(manifest, {
        update: false
      });
    var patches3 = [
      patchStorage(),
      patchDefinitionAndResolver(),
      patchChatBackground()
    ];
    return () => patches3.forEach((p) => p());
  }
  var init_colors = __esm({
    "src/lib/addons/themes/colors/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_background();
      init_resolver();
      init_storage3();
      init_updater();
    }
  });

  // src/lib/addons/themes/index.ts
  var themes_exports = {};
  __export(themes_exports, {
    fetchTheme: () => fetchTheme,
    getCurrentTheme: () => getCurrentTheme,
    getThemeFromLoader: () => getThemeFromLoader,
    initThemes: () => initThemes,
    installTheme: () => installTheme,
    removeTheme: () => removeTheme,
    selectTheme: () => selectTheme,
    themes: () => themes,
    updateThemes: () => updateThemes,
    writeThemeToNative: () => writeThemeToNative
  });
  function writeThemeToNative(theme) {
    return _async_to_generator(function* () {
      if (typeof theme !== "object")
        throw new Error("Theme must be an object");
      yield createFileBackend(getThemeFilePath() || "theme.json").set(theme);
    })();
  }
  function processData(data) {
    if (data.semanticColors) {
      var { semanticColors: semanticColors2 } = data;
      for (var key in semanticColors2) {
        for (var index in semanticColors2[key]) {
          semanticColors2[key][index] &&= normalizeToHex(semanticColors2[key][index]) || false;
        }
      }
    }
    if (data.rawColors) {
      var { rawColors: rawColors2 } = data;
      for (var key1 in rawColors2) {
        var normalized = normalizeToHex(rawColors2[key1]);
        if (normalized)
          data.rawColors[key1] = normalized;
      }
      if (import_react_native5.Platform.OS === "android")
        applyAndroidAlphaKeys(rawColors2);
    }
    if (data.spec === void 0) {
      if (!("theme_color_map" in data)) {
        data.spec = 2;
      }
    }
    return data;
  }
  function validateTheme(themeJSON) {
    if (typeof themeJSON !== "object" || themeJSON === null)
      return false;
    if (themeJSON.spec === 3 && !themeJSON.main)
      return false;
    if (themeJSON.spec === 2)
      return true;
    if (themeJSON.theme_color_map)
      return true;
    return themeJSON.spec === 2 || themeJSON.spec === 3;
  }
  function fetchTheme(url2, selected = false) {
    return _async_to_generator(function* () {
      var themeJSON;
      try {
        themeJSON = yield (yield safeFetch(url2, {
          cache: "no-store"
        })).json();
      } catch (e) {
        throw new Error(`Failed to fetch theme at ${url2}`);
      }
      if (!validateTheme(themeJSON))
        throw new Error(`Invalid theme at ${url2}`);
      themes[url2] = {
        id: url2,
        selected,
        data: processData(themeJSON)
      };
      if (selected) {
        writeThemeToNative(themes[url2]);
        updateBunnyColor(themes[url2].data, {
          update: true
        });
      }
    })();
  }
  function installTheme(url2) {
    return _async_to_generator(function* () {
      if (typeof url2 !== "string" || url2 in themes)
        throw new Error("Theme already installed");
      yield fetchTheme(url2);
    })();
  }
  function selectTheme(theme, write = true) {
    if (theme)
      theme.selected = true;
    Object.keys(themes).forEach((k) => themes[k].selected = themes[k].id === theme?.id);
    if (theme == null && write) {
      updateBunnyColor(null, {
        update: true
      });
      return writeThemeToNative({});
    } else if (theme) {
      updateBunnyColor(theme.data, {
        update: true
      });
      return writeThemeToNative(theme);
    }
  }
  function removeTheme(id) {
    return _async_to_generator(function* () {
      var theme = themes[id];
      if (theme.selected)
        yield selectTheme(null);
      delete themes[id];
      return theme.selected;
    })();
  }
  function updateThemes() {
    return _async_to_generator(function* () {
      yield awaitStorage(themes);
      var currentTheme = getThemeFromLoader();
      yield allSettled(Object.keys(themes).map((id) => fetchTheme(id, currentTheme?.id === id)));
    })();
  }
  function getCurrentTheme() {
    return Object.values(themes).find((t) => t.selected) ?? null;
  }
  function getThemeFromLoader() {
    return getStoredTheme();
  }
  function initThemes() {
    return _async_to_generator(function* () {
      if (!isThemeSupported())
        return;
      if (settings.safeMode?.enabled)
        return;
      try {
        if (isPyonLoader()) {
          writeFile("../vendetta_theme.json", "null");
        }
        yield awaitStorage2(colorsPref);
        var currentTheme = getThemeFromLoader();
        initColors(currentTheme?.data ?? null);
        updateThemes().catch((e) => console.error("Failed to update themes", e));
      } catch (e) {
        console.error("Failed to initialize themes", e);
      }
    })();
  }
  var import_react_native5, themes;
  var init_themes = __esm({
    "src/lib/addons/themes/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_storage();
      init_fs();
      init_loader();
      init_storage2();
      init_utils();
      import_react_native5 = __toESM(require_react_native());
      init_settings();
      init_colors();
      init_parser();
      init_preferences();
      init_updater();
      themes = wrapSync(createStorage(createMMKVBackend("VENDETTA_THEMES")));
    }
  });

  // src/lib/api/native/loader.ts
  function isVendettaLoader() {
    return vendettaLoaderIdentity != null;
  }
  function isPyonLoader() {
    return pyonLoaderIdentity != null;
  }
  function isRa1nLoader() {
    return rainLoaderIdentity != null;
  }
  function polyfillVendettaLoaderIdentity() {
    if (!isPyonLoader() || isVendettaLoader() || !isRa1nLoader())
      return null;
    var loader;
    if (isRa1nLoader() == true) {
      loader = {
        name: rainLoaderIdentity.loaderName,
        features: {}
      };
    } else {
      loader = {
        name: pyonLoaderIdentity.loaderName,
        features: {}
      };
    }
    if (isLoaderConfigSupported())
      loader.features.loaderConfig = true;
    if (isSysColorsSupported()) {
      loader.features.syscolors = {
        prop: "__vendetta_syscolors"
      };
      Object.defineProperty(globalThis, "__vendetta_syscolors", {
        get: () => getSysColors(),
        configurable: true
      });
    }
    if (isThemeSupported()) {
      loader.features.themes = {
        prop: "__vendetta_theme"
      };
      Object.defineProperty(globalThis, "__vendetta_theme", {
        // get: () => getStoredTheme(),
        get: () => {
          var id = getStoredTheme()?.id;
          if (!id)
            return null;
          var { themes: themes2 } = (init_themes(), __toCommonJS(themes_exports));
          return themes2[id] ?? getStoredTheme() ?? null;
        },
        configurable: true
      });
    }
    Object.defineProperty(globalThis, "__vendetta_loader", {
      get: () => loader,
      configurable: true
    });
    return loader;
  }
  function getVendettaLoaderIdentity() {
    if (globalThis.__vendetta_loader)
      return globalThis.__vendetta_loader;
    return polyfillVendettaLoaderIdentity();
  }
  function getLoaderName() {
    if (isPyonLoader())
      return pyonLoaderIdentity.loaderName;
    else if (isRa1nLoader())
      return rainLoaderIdentity.loadername;
    else if (isVendettaLoader())
      return vendettaLoaderIdentity.name;
    return "Unknown";
  }
  function getLoaderVersion() {
    if (isPyonLoader())
      return pyonLoaderIdentity.loaderVersion;
    else if (isRa1nLoader())
      return rainLoaderIdentity.loaderVersion;
    return null;
  }
  function isLoaderConfigSupported() {
    if (isPyonLoader()) {
      return true;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.loaderConfig;
    } else if (isRa1nLoader()) {
      return true;
    }
    return false;
  }
  function isThemeSupported() {
    if (isPyonLoader()) {
      return pyonLoaderIdentity.hasThemeSupport;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.themes != null;
    } else if (isRa1nLoader()) {
      return false;
    }
    return false;
  }
  function getStoredTheme() {
    if (isPyonLoader()) {
      return pyonLoaderIdentity.storedTheme;
    } else if (isVendettaLoader()) {
      var themeProp = vendettaLoaderIdentity.features.themes?.prop;
      if (!themeProp)
        return null;
      return globalThis[themeProp] || null;
    }
    return null;
  }
  function getThemeFilePath() {
    if (isPyonLoader()) {
      return "pyoncord/current-theme.json";
    } else if (isVendettaLoader()) {
      return "vendetta_theme.json";
    }
    return null;
  }
  function isReactDevToolsPreloaded() {
    if (isPyonLoader()) {
      return Boolean(globalThis.__REACT_DEVTOOLS__);
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools != null;
    }
    return false;
  }
  function getReactDevToolsProp() {
    if (!isReactDevToolsPreloaded())
      return null;
    if (isPyonLoader()) {
      globalThis.__pyoncord_rdt = globalThis.__REACT_DEVTOOLS__.exports;
      return "__pyoncord_rdt";
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools.prop;
    }
    return null;
  }
  function getReactDevToolsVersion() {
    if (!isReactDevToolsPreloaded())
      return null;
    if (isPyonLoader()) {
      return globalThis.__REACT_DEVTOOLS__.version || null;
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools.version;
    }
    return null;
  }
  function isSysColorsSupported() {
    return true;
  }
  function getSysColors() {
    if (!isSysColorsSupported())
      return null;
    if (isPyonLoader()) {
      return pyonLoaderIdentity.sysColors;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.syscolors.prop;
    }
    return null;
  }
  function getLoaderConfigPath() {
    if (isPyonLoader()) {
      return "pyoncord/loader.json";
    } else if (isVendettaLoader()) {
      return "vendetta_loader.json";
    } else if (isRa1nLoader()) {
      return "rain/loader.json";
    }
    return "loader.json";
  }
  function isFontSupported() {
    if (isPyonLoader())
      return pyonLoaderIdentity.fontPatch === 2;
    return false;
  }
  var pyonLoaderIdentity, rainLoaderIdentity, vendettaLoaderIdentity;
  var init_loader = __esm({
    "src/lib/api/native/loader.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_fs();
      pyonLoaderIdentity = globalThis.__PYON_LOADER__;
      rainLoaderIdentity = globalThis.__RAIN_LOADER__;
      vendettaLoaderIdentity = globalThis.__vendetta_loader;
      getVendettaLoaderIdentity();
    }
  });

  // src/lib/api/settings.ts
  var settings_exports = {};
  __export(settings_exports, {
    loaderConfig: () => loaderConfig,
    settings: () => settings
  });
  var settings, loaderConfig;
  var init_settings = __esm({
    "src/lib/api/settings.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_storage();
      init_loader();
      settings = wrapSync(createStorage(createMMKVBackend("VENDETTA_SETTINGS")));
      loaderConfig = wrapSync(createStorage(createFileBackend(getLoaderConfigPath(), {
        customLoadUrl: {
          enabled: false,
          url: "http://localhost:4040/kettu.js"
        }
      })));
    }
  });

  // src/metro/polyfills/redesign.ts
  var redesign_exports = {};
  __export(redesign_exports, {
    default: () => redesign_default
  });
  var redesignProps, _module, _source, cacher, actualExports, exportsKeysLength, prop, id, moduleExports, redesign_default;
  var init_redesign = __esm({
    "src/metro/polyfills/redesign.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_caches();
      redesignProps = /* @__PURE__ */ new Set([
        "AlertActionButton",
        "AlertModal",
        "AlertModalContainer",
        "AvatarDuoPile",
        "AvatarPile",
        "BACKDROP_OPAQUE_MAX_OPACITY",
        "Backdrop",
        "Button",
        "Card",
        "ContextMenu",
        "ContextMenuContainer",
        "FauxHeader",
        "FloatingActionButton",
        "GhostInput",
        "GuildIconPile",
        "HeaderActionButton",
        "HeaderButton",
        "HeaderSubmittingIndicator",
        "IconButton",
        "Input",
        "InputButton",
        "InputContainer",
        "LayerContext",
        "LayerScope",
        "Modal",
        "ModalActionButton",
        "ModalContent",
        "ModalDisclaimer",
        "ModalFloatingAction",
        "ModalFloatingActionSpacer",
        "ModalFooter",
        "ModalScreen",
        "ModalStepIndicator",
        "NAV_BAR_HEIGHT",
        "NAV_BAR_HEIGHT_MULTILINE",
        "Navigator",
        "NavigatorHeader",
        "NavigatorScreen",
        "Pile",
        "PileOverflow",
        "RedesignCompat",
        "RedesignCompatContext",
        "RowButton",
        "STATUS_BAR_HEIGHT",
        "SceneLoadingIndicator",
        "SearchField",
        "SegmentedControl",
        "SegmentedControlPages",
        "Slider",
        "Stack",
        "StepModal",
        "StickyContext",
        "StickyHeader",
        "StickyWrapper",
        "TABLE_ROW_CONTENT_HEIGHT",
        "TABLE_ROW_HEIGHT",
        "TableCheckboxRow",
        "TableRadioGroup",
        "TableRadioRow",
        "TableRow",
        "TableRowGroup",
        "TableRowGroupTitle",
        "TableRowIcon",
        "TableSwitchRow",
        "Tabs",
        "TextArea",
        "TextField",
        "TextInput",
        "Toast",
        "dismissAlerts",
        "getHeaderBackButton",
        "getHeaderCloseButton",
        "getHeaderConditionalBackButton",
        "getHeaderNoTitle",
        "getHeaderTextButton",
        "hideContextMenu",
        "navigatorShouldCrossfade",
        "openAlert",
        "useAccessibilityNativeStackOptions",
        "useAndroidNavScrim",
        "useCoachmark",
        "useFloatingActionButtonScroll",
        "useFloatingActionButtonState",
        "useNativeStackNavigation",
        "useNavigation",
        "useNavigationTheme",
        "useNavigatorBackPressHandler",
        "useNavigatorScreens",
        "useNavigatorShouldCrossfade",
        "useSegmentedControlState",
        "useStackNavigation",
        "useTabNavigation",
        "useTooltip"
      ]);
      _module = {};
      _source = {};
      cacher = getPolyfillModuleCacher("redesign_module");
      for ([id, moduleExports] of cacher.getModules()) {
        for (prop of redesignProps) {
          actualExports = void 0;
          if (moduleExports[prop]) {
            actualExports = moduleExports;
          } else if (moduleExports.default?.[prop]) {
            actualExports = moduleExports.default;
          } else {
            continue;
          }
          exportsKeysLength = Reflect.ownKeys(actualExports).length;
          if (_source[prop] && exportsKeysLength >= _source[prop]) {
            continue;
          }
          _module[prop] = actualExports[prop];
          _source[prop] = Reflect.ownKeys(actualExports).length;
          cacher.cacheId(id);
          if (exportsKeysLength === 1) {
            redesignProps.delete(prop);
          }
        }
      }
      cacher.finish();
      redesign_default = _module;
    }
  });

  // src/metro/internals/modules.ts
  var modules_exports2 = {};
  __export(modules_exports2, {
    getCachedPolyfillModules: () => getCachedPolyfillModules,
    getImportingModuleId: () => getImportingModuleId,
    getModules: () => getModules,
    metroModules: () => metroModules,
    requireModule: () => requireModule,
    subscribeModule: () => subscribeModule,
    waitFor: () => waitFor,
    waitForModule: () => waitForModule
  });
  function blacklistModule(id) {
    Object.defineProperty(metroModules, id, {
      enumerable: false
    });
    blacklistedIds.add(id);
    indexBlacklistFlag(Number(id));
  }
  function isBadExports(exports) {
    return !exports || exports === globalThis || exports["<!@ pylix was here :fuyusquish: \n Hi pylix! -cocobo1!@>"] === null || exports.__proto__ === Object.prototype && Reflect.ownKeys(exports).length === 0 || exports.default?.[Symbol.toStringTag] === "IntlMessagesProxy";
  }
  function onModuleRequire(moduleExports, id) {
    indexExportsFlags(id, moduleExports);
    moduleExports.initSentry &&= () => void 0;
    if (moduleExports.default?.track && moduleExports.default.trackMaker)
      moduleExports.default.track = () => Promise.resolve();
    if (moduleExports.registerAsset) {
      (init_patches(), __toCommonJS(patches_exports)).patchAssets(moduleExports);
    }
    if (!patchedNativeComponentRegistry && [
      "customBubblingEventTypes",
      "customDirectEventTypes",
      "register",
      "get"
    ].every((x2) => moduleExports[x2])) {
      instead2("register", moduleExports, ([name, cb], origFunc) => {
        try {
          return origFunc(name, cb);
        } catch (e) {
          return name;
        }
      });
      patchedNativeComponentRegistry = true;
    }
    if (moduleExports?.default?.constructor?.displayName === "DeveloperExperimentStore") {
      moduleExports.default = new Proxy(moduleExports.default, {
        get(target, property, receiver) {
          if (property === "isDeveloper") {
            var { settings: settings2 } = (init_settings(), __toCommonJS(settings_exports));
            return settings2.enableDiscordDeveloperSettings ?? false;
          }
          return Reflect.get(target, property, receiver);
        }
      });
    }
    if (!patchedImportTracker && moduleExports.fileFinishedImporting) {
      before2("fileFinishedImporting", moduleExports, ([filePath]) => {
        if (_importingModuleId === -1 || !filePath)
          return;
        metroModules[_importingModuleId].__filePath = filePath;
      });
      patchedImportTracker = true;
    }
    if (!patchedInspectSource && globalThis["__core-js_shared__"]) {
      var inspect = (f) => typeof f === "function" && functionToString.apply(f, []);
      globalThis["__core-js_shared__"].inspectSource = inspect;
      patchedInspectSource = true;
    }
    if (moduleExports.findHostInstance_DEPRECATED) {
      var prevExports = metroModules[id - 1]?.publicModule.exports;
      var inc = prevExports.default?.reactProfilingEnabled ? 1 : -1;
      if (!metroModules[id + inc]?.isInitialized) {
        blacklistModule(id + inc);
      }
    }
    if (moduleExports.isMoment) {
      instead2("defineLocale", moduleExports, (args, orig) => {
        var origLocale = moduleExports.locale();
        orig(...args);
        moduleExports.locale(origLocale);
      });
    }
    var subs = moduleSubscriptions.get(Number(id));
    if (subs) {
      subs.forEach((s) => s());
      moduleSubscriptions.delete(Number(id));
    }
  }
  function getImportingModuleId() {
    return _importingModuleId;
  }
  function subscribeModule(id, cb) {
    var subs = moduleSubscriptions.get(id) ?? /* @__PURE__ */ new Set();
    subs.add(cb);
    moduleSubscriptions.set(id, subs);
    return () => subs.delete(cb);
  }
  function requireModule(id) {
    if (!metroModules[0]?.isInitialized)
      metroRequire(0);
    if (blacklistedIds.has(id))
      return void 0;
    if (Number(id) === -1)
      return init_redesign(), __toCommonJS(redesign_exports);
    if (metroModules[id]?.isInitialized && !metroModules[id]?.hasError) {
      return metroRequire(id);
    }
    var originalHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(noopHandler);
    var moduleExports;
    try {
      moduleExports = metroRequire(id);
    } catch (e) {
      blacklistModule(id);
      moduleExports = void 0;
    }
    ErrorUtils.setGlobalHandler(originalHandler);
    return moduleExports;
  }
  function* getModules(uniq, all = false) {
    yield [
      -1,
      (init_redesign(), __toCommonJS(redesign_exports))
    ];
    var cache = getMetroCache().findIndex[uniq];
    if (all && !cache?.[`_${ModulesMapInternal.FULL_LOOKUP}`])
      cache = void 0;
    if (cache?.[`_${ModulesMapInternal.NOT_FOUND}`])
      return;
    for (var id in cache) {
      if (id[0] === "_")
        continue;
      var exports = requireModule(Number(id));
      if (isBadExports(exports))
        continue;
      yield [
        id,
        exports
      ];
    }
    for (var id1 in metroModules) {
      var exports1 = requireModule(Number(id1));
      if (isBadExports(exports1))
        continue;
      yield [
        id1,
        exports1
      ];
    }
  }
  function* getCachedPolyfillModules(name) {
    var cache = getMetroCache().polyfillIndex[name];
    for (var id in cache) {
      var exports = requireModule(Number(id));
      if (isBadExports(exports))
        continue;
      yield [
        id,
        exports
      ];
    }
    if (!cache[`_${ModulesMapInternal.FULL_LOOKUP}`]) {
      for (var id1 in metroModules) {
        var exports1 = requireModule(Number(id1));
        if (isBadExports(exports1))
          continue;
        yield [
          id1,
          exports1
        ];
      }
    }
  }
  function waitFor(filter, callback, options = {}) {
    var { count = 1 } = options;
    var currentCount = 0;
    var unsubscribers = [];
    var isActive = true;
    var cleanup = () => {
      if (!isActive)
        return;
      isActive = false;
      unsubscribers.forEach((unsub) => unsub());
      unsubscribers.length = 0;
    };
    function checkModule(id3) {
      if (!isActive)
        return true;
      var exports = requireModule(id3);
      if (isBadExports(exports))
        return false;
      var result = filter(exports);
      if (!result)
        return false;
      callback(result, id3);
      if (++currentCount >= count) {
        cleanup();
        return true;
      }
      return false;
    }
    if (filter.key) {
      var cache = getMetroCache().findIndex[filter.key];
      if (cache) {
        var _loop2 = function(id3) {
          if (id3[0] === "_")
            return "continue";
          var numId2 = Number(id3);
          if (metroModules[numId2]?.isInitialized) {
            if (checkModule(numId2))
              return {
                v: cleanup
              };
          } else {
            var unsub = subscribeModule(numId2, () => {
              checkModule(numId2);
            });
            unsubscribers.push(unsub);
          }
        };
        for (var id in cache) {
          var _ret = _loop2(id);
          if (_type_of(_ret) === "object")
            return _ret.v;
        }
      }
    }
    for (var id1 in metroModules) {
      if (!isActive)
        break;
      var numId = Number(id1);
      if (metroModules[numId]?.isInitialized && !metroModules[numId]?.hasError) {
        if (checkModule(numId))
          return cleanup;
      }
    }
    if (isActive) {
      var _loop1 = function(id22) {
        var numId2 = Number(id22);
        if (!metroModules[numId2]?.isInitialized) {
          var unsub = subscribeModule(numId2, () => {
            checkModule(numId2);
          });
          unsubscribers.push(unsub);
        }
      };
      for (var id2 in metroModules)
        _loop1(id2);
    }
    return cleanup;
  }
  function waitForModule(filter, options = {}) {
    return new Promise((resolve) => {
      waitFor(filter, (exports) => resolve(exports), options);
    });
  }
  var _loop, before2, instead2, metroModules, metroRequire, moduleSubscriptions, blacklistedIds, noopHandler, functionToString, patchedInspectSource, patchedImportTracker, patchedNativeComponentRegistry, _importingModuleId, key;
  var init_modules2 = __esm({
    "src/metro/internals/modules.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_type_of();
      init_caches();
      init_enums();
      _loop = function(key) {
        var id = Number(key);
        var metroModule = metroModules[id];
        var cache = getMetroCache().flagsIndex[id];
        if (cache & ModuleFlags.BLACKLISTED) {
          blacklistModule(id);
          return "continue";
        }
        if (metroModule.factory) {
          instead2("factory", metroModule, (args, origFunc) => {
            var originalImportingId = _importingModuleId;
            _importingModuleId = id;
            var { 1: metroRequire2, 4: moduleObject } = args;
            args[
              2
              /* metroImportDefault */
            ] = (id2) => {
              var exps = metroRequire2(id2);
              return exps && exps.__esModule ? exps.default : exps;
            };
            args[
              3
              /* metroImportAll */
            ] = (id2) => {
              var exps = metroRequire2(id2);
              if (exps && exps.__esModule)
                return exps;
              var importAll = {};
              if (exps)
                Object.assign(importAll, exps);
              importAll.default = exps;
              return importAll;
            };
            origFunc(...args);
            if (!isBadExports(moduleObject.exports)) {
              onModuleRequire(moduleObject.exports, id);
            } else {
              blacklistModule(id);
            }
            _importingModuleId = originalImportingId;
          });
        }
      };
      ({ before: before2, instead: instead2 } = require_cjs());
      metroModules = globalThis.modules;
      metroRequire = (id) => globalThis.__r(+id);
      moduleSubscriptions = /* @__PURE__ */ new Map();
      blacklistedIds = /* @__PURE__ */ new Set();
      noopHandler = () => void 0;
      functionToString = Function.prototype.toString;
      patchedInspectSource = false;
      patchedImportTracker = false;
      patchedNativeComponentRegistry = false;
      _importingModuleId = -1;
      for (key in metroModules)
        _loop(key);
    }
  });

  // src/metro/internals/caches.ts
  var caches_exports = {};
  __export(caches_exports, {
    getCacherForUniq: () => getCacherForUniq,
    getMetroCache: () => getMetroCache,
    getPolyfillModuleCacher: () => getPolyfillModuleCacher,
    indexAssetModuleFlag: () => indexAssetModuleFlag,
    indexBlacklistFlag: () => indexBlacklistFlag,
    indexExportsFlags: () => indexExportsFlags,
    initMetroCache: () => initMetroCache
  });
  function buildInitCache() {
    var cache = {
      _v: CACHE_VERSION,
      _buildNumber: NativeClientInfoModule.getConstants().Build,
      _modulesCount: Object.keys(globalThis.modules).length,
      flagsIndex: {},
      findIndex: {},
      polyfillIndex: {}
    };
    setTimeout(() => {
      for (var id in globalThis.modules) {
        (init_modules2(), __toCommonJS(modules_exports2)).requireModule(id);
      }
    }, 100);
    _metroCache = cache;
    return cache;
  }
  function initMetroCache() {
    return _async_to_generator(function* () {
      if (!(yield fileExists(BUNNY_METRO_CACHE_PATH)))
        return void buildInitCache();
      var rawCache = yield readFile(BUNNY_METRO_CACHE_PATH);
      try {
        _metroCache = JSON.parse(rawCache);
        if (_metroCache._v !== CACHE_VERSION) {
          _metroCache = null;
          throw "cache invalidated; cache version outdated";
        }
        if (_metroCache._buildNumber !== NativeClientInfoModule.getConstants().Build) {
          _metroCache = null;
          throw "cache invalidated; version mismatch";
        }
        if (_metroCache._modulesCount !== Object.keys(globalThis.modules).length) {
          _metroCache = null;
          throw "cache invalidated; modules count mismatch";
        }
      } catch (e) {
        buildInitCache();
      }
    })();
  }
  function extractExportsFlags(moduleExports) {
    if (!moduleExports)
      return void 0;
    var bit = ModuleFlags.EXISTS;
    return bit;
  }
  function indexExportsFlags(moduleId, moduleExports) {
    var flags = extractExportsFlags(moduleExports);
    if (flags && flags !== ModuleFlags.EXISTS) {
      _metroCache.flagsIndex[moduleId] = flags;
    }
  }
  function indexBlacklistFlag(id) {
    _metroCache.flagsIndex[id] |= ModuleFlags.BLACKLISTED;
  }
  function indexAssetModuleFlag(id) {
    _metroCache.flagsIndex[id] |= ModuleFlags.ASSET;
  }
  function getCacherForUniq(uniq, allFind) {
    var indexObject = _metroCache.findIndex[uniq] ??= {};
    return {
      cacheId(moduleId, exports) {
        indexObject[moduleId] ??= extractExportsFlags(exports);
        saveCache();
      },
      // Finish may not be called by single find
      finish(notFound) {
        if (allFind)
          indexObject[`_${ModulesMapInternal.FULL_LOOKUP}`] = 1;
        if (notFound)
          indexObject[`_${ModulesMapInternal.NOT_FOUND}`] = 1;
        saveCache();
      }
    };
  }
  function getPolyfillModuleCacher(name) {
    var indexObject = _metroCache.polyfillIndex[name] ??= {};
    return {
      getModules() {
        return (init_modules2(), __toCommonJS(modules_exports2)).getCachedPolyfillModules(name);
      },
      cacheId(moduleId) {
        indexObject[moduleId] = 1;
        saveCache();
      },
      finish() {
        indexObject[`_${ModulesMapInternal.FULL_LOOKUP}`] = 1;
        saveCache();
      }
    };
  }
  var CACHE_VERSION, BUNNY_METRO_CACHE_PATH, _metroCache, getMetroCache, saveCache;
  var init_caches = __esm({
    "src/metro/internals/caches.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_fs();
      init_modules();
      init_dist();
      init_enums();
      CACHE_VERSION = 102;
      BUNNY_METRO_CACHE_PATH = "caches/metro_modules.json";
      _metroCache = null;
      getMetroCache = () => _metroCache;
      saveCache = debounce(() => {
        writeFile(BUNNY_METRO_CACHE_PATH, JSON.stringify(_metroCache));
      }, 1e3);
    }
  });

  // src/core/ui/reporter/utils/isStack.tsx
  function isComponentStack(error) {
    return "componentStack" in error && typeof error.componentStack === "string";
  }
  function hasStack(error) {
    return !!error.stack;
  }
  var init_isStack = __esm({
    "src/core/ui/reporter/utils/isStack.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/api/assets/index.ts
  var assets_exports = {};
  __export(assets_exports, {
    filterAssets: () => filterAssets,
    findAsset: () => findAsset,
    findAssetId: () => findAssetId,
    iterateAssets: () => iterateAssets
  });
  function* iterateAssets() {
    var { flagsIndex } = getMetroCache();
    var yielded = /* @__PURE__ */ new Set();
    for (var id in flagsIndex) {
      if (flagsIndex[id] & ModuleFlags.ASSET) {
        var assetId = requireModule(Number(id));
        if (typeof assetId !== "number" || yielded.has(assetId))
          continue;
        yield getAssetById(assetId);
        yielded.add(assetId);
      }
    }
  }
  function getAssetById(id) {
    var asset = assetsModule.getAssetByID(id);
    if (!asset)
      return asset;
    return Object.assign(asset, {
      id
    });
  }
  function findAsset(param) {
    if (typeof param === "number")
      return getAssetById(param);
    if (typeof param === "string" && _nameToAssetCache[param]) {
      return _nameToAssetCache[param];
    }
    for (var asset of iterateAssets()) {
      if (typeof param === "string" && asset.name === param) {
        _nameToAssetCache[param] = asset;
        return asset;
      } else if (typeof param === "function" && param(asset)) {
        return asset;
      }
    }
  }
  function filterAssets(param) {
    var filteredAssets = [];
    for (var asset of iterateAssets()) {
      if (typeof param === "string" ? asset.name === param : param(asset)) {
        filteredAssets.push(asset);
      }
    }
    return filteredAssets;
  }
  function findAssetId(name) {
    return findAsset(name)?.id;
  }
  var _nameToAssetCache;
  var init_assets = __esm({
    "src/lib/api/assets/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_caches();
      init_enums();
      init_modules2();
      init_patches();
      _nameToAssetCache = {};
    }
  });

  // src/core/i18n/default.json
  var default_default;
  var init_default = __esm({
    "src/core/i18n/default.json"() {
      default_default = {
        ABOUT: "About",
        ACTIONS: "Actions",
        ARE_YOU_SURE_TO_CLEAR_DATA: "Are you sure you wish to clear the data of {name}?",
        ARE_YOU_SURE_TO_DELETE_PLUGIN: "Are you sure you wish to delete {name}? This will clear all of the plugin's data.",
        ARE_YOU_SURE_TO_DELETE_THEME: "Are you sure you wish to delete {name}?",
        ASSET_BROWSER: "Asset Browser",
        BRAND: "Brand",
        PUPU: "Kettu",
        PUPU_URL: "Kettu URL",
        BROWSER: "Addon Browser",
        BYTECODE: "Bytecode",
        CANCEL: "Cancel",
        CLEAR: "Clear",
        CLEAR_BUNDLE: "Clear JS Bundle",
        CLEAR_BUNDLE_DESC: "Clear the cached bundle. This will force a re-download of the bundle next app launch.",
        CLEAR_DATA: "Clear data",
        CLEAR_DATA_FAILED: "Failed to clear data for {name}",
        CLEAR_DATA_SUCCESSFUL: "Cleared data for {name}",
        CODEBERG: "Codeberg",
        CODENAME: "Codename",
        COMMAND_DEBUG_DESC: "Send Kettu debug info.",
        COMMAND_DEBUG_OPT_EPHEMERALLY: "Send debug info ephemerally.",
        COMMAND_EVAL_DESC: "Evaluate JavaScript code.",
        COMMAND_EVAL_OPT_ASYNC: "Whether to support 'await' in code. Must explicitly return for result (default: false)",
        COMMAND_EVAL_OPT_CODE: "The code to evaluate.",
        COMMAND_PLUGINS_DESC: "Send list of installed plugins.",
        COMMAND_PLUGINS_OPT_EPHEMERALLY: "Send plugins list ephemerally.",
        COMPONENT: "Component",
        CONFIRMATION_LINK_IS_A_TYPE: "This link is a **{urlType, select, plugin {Plugin} theme {Theme} other {Add-on}}**, would you like to install it?",
        CONNECT_TO_DEBUG_WEBSOCKET: "Connect to debug WebSocket",
        CONNECT_TO_REACT_DEVTOOLS: "Connect to React DevTools",
        CONTINUE: "Continue",
        COPIED_TO_CLIPBOARD: "Copied to clipboard",
        COPY_URL: "Copy URL",
        DEBUG: "Debug",
        DEBUGGER_URL: "RainDevTools URL",
        AUTO_DEBUGGER: "Automatically connect to RainDevTools",
        DEVTOOLS_URL: "React DevTools URL",
        AUTO_DEVTOOLS: "Automatically connect to React Devtools",
        DELETE: "Delete",
        DESC_EXTRACT_FONTS_FROM_THEME: 'Looks out for "fonts" field in your currently applied theme and install it.',
        DEVELOPER: "Developer",
        DEVELOPER_SETTINGS: "Developer Settings",
        DISABLE_THEME: "Disable Theme",
        DISABLE_UPDATES: "Disable Updates",
        DISCORD_SERVER: "Discord Server",
        DONE: "Done",
        ENABLE_EVAL_COMMAND: "Enable /eval command",
        ENABLE_EVAL_COMMAND_DESC: "Evaluate JavaScript directly from a command. Be cautious when using this command as it may pose a security risk. Make sure to know what you are doing.",
        ENABLE_UPDATES: "Enable Updates",
        ERROR_BOUNDARY_TOOLS_LABEL: "ErrorBoundary Tools",
        EXTRACT: "Extract",
        FONT_NAME: "Font Name",
        FONTS: "Fonts",
        GENERAL: "General",
        GITHUB: "GitHub",
        HOLD_UP: "Hold Up",
        INFO: "Info",
        INSTALL: "Install",
        INSTALL_ADDON: "Install an add-on",
        INSTALL_FONT: "Install a font",
        INSTALL_PLUGIN: "Install a plugin",
        INSTALL_REACT_DEVTOOLS: "Install React DevTools",
        INSTALL_THEME: "Install a theme",
        LABEL_EXTRACT_FONTS_FROM_THEME: "Extract font from theme",
        LINKS: "Links",
        LOAD_FROM_CUSTOM_URL: "Load from custom URL",
        LOAD_FROM_CUSTOM_URL_DEC: "Load Kettu from a custom endpoint.",
        LOAD_REACT_DEVTOOLS: "Load React DevTools",
        LOADER: "Loader",
        MACHINE_ID: "Machine ID",
        MANUFACTURER: "Manufacturer",
        MESSAGE: "Message",
        MISCELLANEOUS: "Miscellaneous",
        MODAL_RELOAD_REQUIRED: "Reload app?",
        MODAL_RELOAD_REQUIRED_DESC: "A reload is required to see the changes. Do you want to reload now?",
        MODAL_THEME_REFETCHED: "Theme refetched",
        MODAL_THEME_REFETCHED_DESC: "A reload is required to see the changes. Do you want to reload now?",
        MODAL_UNPROXIED_PLUGIN_DESC: "The plugin you are trying to install has not been proxied/verified by staff. Are you sure you want to continue?",
        MODAL_UNPROXIED_PLUGIN_HEADER: "Unproxied Plugin",
        MODEL: "Model",
        MODELID: "Model Identifier",
        OPEN_IN_BROWSER: "Open in Browser",
        OPERATING_SYSTEM: "Operating System",
        OVERFLOW_PLUGIN_SETTINGS: "Plugin Settings",
        PLATFORM: "Platform",
        PLUGIN_REFETCH_FAILED: "Failed to refetch plugin",
        PLUGIN_REFETCH_SUCCESSFUL: "Successfully refetched plugin",
        PLUGINS: "Plugins",
        REFETCH: "Refetch",
        RELOAD: "Reload",
        RELOAD_DISCORD: "Reload Discord",
        RELOAD_IN_NORMAL_MODE: "Reload in Normal Mode",
        RELOAD_IN_NORMAL_MODE_DESC: "Safe mode currently enabled, tap to reload in normal mode",
        RELOAD_IN_SAFE_MODE: "Reload in Safe Mode",
        RELOAD_IN_SAFE_MODE_DESC: "Tap to reload Discord without loading addons",
        REMOVE: "Remove",
        RESTART_REQUIRED_TO_TAKE_EFFECT: "Restart is required to take effect",
        RETRY: "Retry",
        RETRY_RENDER: "Retry Render",
        SAFE_MODE: "Safe Mode",
        SAFE_MODE_NOTICE_FONTS: "You are in safe mode, meaning fonts have been temporarily disabled. {enabled, select, true {If a font appears to be causing the issue, you can press below to disable it persistently.} other {}}",
        SAFE_MODE_NOTICE_PLUGINS: "You are in safe mode, so plugins cannot be loaded. Disable any misbehaving plugins, then return to Normal Mode from the General settings page.",
        SAFE_MODE_NOTICE_THEMES: "You are in safe mode, meaning themes have been temporarily disabled. {enabled, select, true {If a theme appears to be causing the issue, you can press below to disable it persistently.} other {}}",
        SEARCH: "Search",
        SEPARATOR: ", ",
        SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS: "Activate Discord Experiments",
        SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS_DESC: "Warning: Messing with this feature may lead to account termination. I heavily discourage using this and am not responsible for anything that happens if you use it",
        STACK_TRACE: "Stack Trace",
        SUCCESSFULLY_INSTALLED: "Successfully installed",
        THEME_EXTRACTOR_DESC: "This pack overrides the following: {fonts}",
        THEME_REFETCH_FAILED: "Failed to refetch theme",
        THEME_REFETCH_SUCCESSFUL: "Successfully refetched theme",
        THEMES: "Themes",
        THEMES_RELOAD_FOR_CHANGES: "Reload the app to fully apply changes",
        TOASTS_INSTALLED_PLUGIN: "Installed plugin",
        TOASTS_PLUGIN_UPDATE: "{update, select, true {Enabled} other {Disabled}} updates for {name}",
        UH_OH: "Uh Oh",
        UNINSTALL: "Uninstall",
        UNINSTALL_TITLE: "Uninstall {title}",
        URL_PLACEHOLDER: "https://codeberg.org/cocobo1/Kettu",
        VERSION: "Version",
        VERSIONS: "Versions"
      };
    }
  });

  // src/core/i18n/index.ts
  function initFetchI18nStrings() {
    var cb = ({ locale }) => {
      var languageMap = {
        "es-ES": "es",
        "es-419": "es_419",
        "zh-TW": "zh-Hant",
        "zh-CN": "zh-Hans",
        "pt-PT": "pt",
        "pt-BR": "pt_BR",
        "sv-SE": "sv"
      };
      var resolvedLocale = _lastSetLocale = languageMap[locale] ?? locale;
      if (resolvedLocale.startsWith("en-")) {
        _currentLocale = null;
        return;
      }
      if (!_loadedLocale.has(resolvedLocale)) {
        _loadedLocale.add(resolvedLocale);
        fetch(`https://codeberg.org/cocobo1/kettu-i18n/src/branch/main/base/${resolvedLocale}.json`).then((r) => r.json()).then((strings) => _loadedStrings[resolvedLocale] = strings).then(() => resolvedLocale === _lastSetLocale && (_currentLocale = resolvedLocale)).catch((e) => console.error(`An error occured while fetching strings for ${resolvedLocale}: ${e}`));
      } else {
        _currentLocale = resolvedLocale;
      }
    };
    FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", cb);
    return () => FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", cb);
  }
  function formatString(key, val) {
    var str = Strings[key];
    return new IntlMessageFormat(str).format(val);
  }
  var IntlMessageFormat, _currentLocale, _lastSetLocale, _loadedLocale, _loadedStrings, Strings;
  var init_i18n = __esm({
    "src/core/i18n/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_common();
      init_wrappers();
      init_default();
      IntlMessageFormat = findByNameLazy("MessageFormat");
      _currentLocale = null;
      _lastSetLocale = null;
      _loadedLocale = /* @__PURE__ */ new Set();
      _loadedStrings = {};
      Strings = new Proxy({}, {
        get: (_t, prop) => {
          if (_currentLocale && _loadedStrings[_currentLocale]?.[prop]) {
            return _loadedStrings[_currentLocale]?.[prop];
          }
          return default_default[prop];
        }
      });
    }
  });

  // src/lib/ui/toasts.ts
  var toasts_exports = {};
  __export(toasts_exports, {
    showToast: () => showToast
  });
  var uuid4, showToast;
  var init_toasts = __esm({
    "src/lib/ui/toasts.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_i18n();
      init_assets();
      init_lazy();
      init_common();
      init_wrappers();
      ({ uuid4 } = lazyDestructure(() => findByProps("uuid4")));
      showToast = (content, asset) => toasts.open({
        // ? In build 182205/44707, Discord changed their toasts, source is no longer used, rather icon, and a key is needed.
        // TODO: We could probably have the developer specify a key themselves, but this works to fix toasts
        key: `vd-toast-${uuid4()}`,
        content,
        source: asset,
        icon: asset
      });
      showToast.showCopyToClipboard = (message = Strings.COPIED_TO_CLIPBOARD) => {
        showToast(message, findAssetId("toast_copy_link"));
      };
    }
  });

  // src/lib/api/debug.ts
  var debug_exports = {};
  __export(debug_exports, {
    connectRdt: () => connectRdt,
    connectToDebugger: () => connectToDebugger2,
    disconnectFromDebugger: () => disconnectFromDebugger2,
    disconnectRdt: () => disconnectRdt,
    getDebugInfo: () => getDebugInfo,
    initDebugger: () => initDebugger,
    isConnectedToDebugger: () => isConnectedToDebugger2,
    patchLogHook: () => patchLogHook,
    rdtClient: () => rdtClient,
    rdtConnected: () => rdtConnected,
    toggleSafeMode: () => toggleSafeMode,
    useIsRdtConnected: () => useIsRdtConnected,
    versionHash: () => versionHash
  });
  function toggleSafeMode() {
    return _async_to_generator(function* () {
      settings.safeMode = {
        ...settings.safeMode,
        enabled: !settings.safeMode?.enabled
      };
      if (isThemeSupported()) {
        if (getThemeFromLoader()?.id)
          settings.safeMode.currentThemeId = getThemeFromLoader().id;
        if (settings.safeMode?.enabled) {
          yield selectTheme(null);
        } else if (settings.safeMode?.currentThemeId) {
          yield selectTheme(themes[settings.safeMode?.currentThemeId]);
        }
      }
      setTimeout(BundleUpdaterManager.reload, 400);
    })();
  }
  function serializeMessage2(msg) {
    return JSON.stringify(msg);
  }
  function sendLog2(level, ...args) {
    if (socket2?.readyState === WebSocket.OPEN) {
      var message = {
        type: "log",
        data: {
          level,
          message: args
        }
      };
      socket2.send(serializeMessage2(message));
    }
  }
  function patchConsoleAndLogger2() {
    originalConsoleLog2 = console.log;
    console.log = function(...args) {
      originalConsoleLog2.apply(console, args);
      sendLog2("default", ...args);
    };
    originalConsoleError2 = console.error;
    console.error = function(...args) {
      originalConsoleError2.apply(console, args);
      sendLog2("error", ...args);
    };
    originalConsoleWarn2 = console.warn;
    console.warn = function(...args) {
      originalConsoleWarn2.apply(console, args);
      sendLog2("warn", ...args);
    };
    if (logger) {
      originalLoggerLog2 = logger.log;
      logger.log = function(...args) {
        originalLoggerLog2.apply(logger, args);
        sendLog2("default", ...args);
      };
      originalLoggerError2 = logger.error;
      logger.error = function(...args) {
        originalLoggerError2.apply(logger, args);
        sendLog2("error", ...args);
      };
      originalLoggerWarn2 = logger.warn;
      logger.warn = function(...args) {
        originalLoggerWarn2.apply(logger, args);
        sendLog2("warn", ...args);
      };
    }
  }
  function unpatchConsoleAndLogger2() {
    if (originalConsoleLog2) {
      console.log = originalConsoleLog2;
      originalConsoleLog2 = void 0;
    }
    if (originalConsoleError2) {
      console.error = originalConsoleError2;
      originalConsoleError2 = void 0;
    }
    if (originalConsoleWarn2) {
      console.warn = originalConsoleWarn2;
      originalConsoleWarn2 = void 0;
    }
    if (logger) {
      if (originalLoggerLog2) {
        logger.log = originalLoggerLog2;
        originalLoggerLog2 = void 0;
      }
      if (originalLoggerError2) {
        logger.error = originalLoggerError2;
        originalLoggerError2 = void 0;
      }
      if (originalLoggerWarn2) {
        logger.warn = originalLoggerWarn2;
        originalLoggerWarn2 = void 0;
      }
    }
  }
  function connectToDebugger2(url2) {
    if (socket2 !== void 0 && socket2.readyState !== WebSocket.CLOSED) {
      unpatchConsoleAndLogger2();
      socket2.close();
    }
    if (!url2) {
      showToast("Invalid debugger URL!", findAssetId("Small"));
      return;
    }
    try {
      socket2 = new WebSocket(`ws://${url2}`);
      socket2.addEventListener("open", () => {
        showToast("Connected to debugger.", findAssetId("Check"));
        var hello = {
          type: "hello",
          data: {
            version: VERSION2
          }
        };
        socket2?.send(serializeMessage2(hello));
        patchConsoleAndLogger2();
      });
      socket2.addEventListener("message", (message) => {
        try {
          var data = JSON.parse(message.data);
          if (data.type === "run" && data.data?.code) {
            try {
              (0, eval)(data.data.code);
            } catch (e) {
              console.error("Error executing remote code:", e);
            }
          }
        } catch (e) {
          try {
            (0, eval)(message.data);
          } catch (err) {
            console.error(err);
          }
        }
      });
      socket2.addEventListener("close", () => {
        showToast("Disconnected from debugger.", findAssetId("Small"));
        unpatchConsoleAndLogger2();
      });
      socket2.addEventListener("error", (err) => {
        console.log(`Debugger error: ${err.message}`);
        showToast("An error occurred with the debugger connection!", findAssetId("Small"));
        unpatchConsoleAndLogger2();
      });
    } catch (e) {
      logger.error("Failed to connect to debugger:", e);
      showToast("Failed to connect to debugger!", findAssetId("Small"));
    }
  }
  function disconnectFromDebugger2() {
    if (socket2) {
      unpatchConsoleAndLogger2();
      socket2.close();
      socket2 = void 0;
      showToast("Disconnected from debugger.", findAssetId("Check"));
    }
  }
  function isConnectedToDebugger2() {
    return socket2?.readyState === WebSocket.OPEN;
  }
  function bump() {
    for (var x2 of changeHooks)
      x2(rdtConnected);
  }
  function cleanupRdt() {
    rdtClient = null;
    rdtConnected = false;
    bump();
  }
  function connectRdt(url2, quiet) {
    if (!isReactDevToolsPreloaded() || rdtClient)
      return;
    var base = url2.split(":").slice(0, -1).join(":");
    var ws = rdtClient = new WebSocket(`ws://${base}:${rdtPort}`);
    ws.addEventListener("open", () => {
      if (!quiet)
        showToast("Connected to React DevTools", findAssetId("CheckmarkSmallIcon"));
      rdtConnected = true;
      bump();
    });
    ws.addEventListener("close", () => {
      cleanupRdt();
    });
    ws.addEventListener("error", (e) => {
      cleanupRdt();
      var err = e?.message ?? e?.stack ?? String(e);
      logger.error("React DevTools error:", err);
      if (!quiet)
        showToast(err, findAssetId("CircleXIcon-primary"));
    });
    var devTools = globalThis[getReactDevToolsProp() || "__vendetta_rdc"];
    if (devTools?.connectToDevTools) {
      devTools.connectToDevTools({
        websocket: ws,
        resolveRNStyle: import_react_native6.StyleSheet.flatten
      });
    }
  }
  function disconnectRdt() {
    rdtClient?.close();
  }
  function useIsRdtConnected() {
    var [connected, update] = React.useState(rdtConnected);
    React.useEffect(() => {
      changeHooks.add(update);
      return () => void changeHooks.delete(update);
    }, []);
    return connected;
  }
  function patchLogHook() {
    var unpatch = after("nativeLoggingHook", globalThis, (args) => {
      if (socket2?.readyState === WebSocket.OPEN) {
        sendLog2(args[1] === "error" ? "error" : args[1] === "warn" ? "warn" : "default", args[0]);
      }
      logger.log(args[0]);
    });
    return () => {
      socket2 && socket2.close();
      unpatch();
    };
  }
  function getDebugInfo() {
    var hermesProps = globalThis.HermesInternal.getRuntimeProperties();
    var hermesVer = hermesProps["OSS Release Version"];
    var padding = "for RN ";
    var PlatformConstants = import_react_native6.Platform.constants;
    var rnVer = PlatformConstants.reactNativeVersion;
    return {
      vendetta: {
        version: versionHash.split("-")[0],
        loader: getLoaderName()
      },
      bunny: {
        version: versionHash,
        loader: {
          name: getLoaderName(),
          version: getLoaderVersion()
        }
      },
      discord: {
        version: NativeClientInfoModule.getConstants().Version,
        build: NativeClientInfoModule.getConstants().Build
      },
      react: {
        version: React.version,
        nativeVersion: hermesVer.startsWith(padding) ? hermesVer.substring(padding.length) : `${rnVer.major}.${rnVer.minor}.${rnVer.patch}`
      },
      hermes: {
        version: hermesVer,
        buildType: hermesProps.Build,
        bytecodeVersion: hermesProps["Bytecode Version"]
      },
      ...import_react_native6.Platform.select({
        android: {
          os: {
            name: "Android",
            version: PlatformConstants.Release,
            sdk: PlatformConstants.Version
          }
        },
        ios: {
          os: {
            name: PlatformConstants.systemName,
            version: PlatformConstants.osVersion
          }
        }
      }),
      ...import_react_native6.Platform.select({
        android: {
          device: {
            manufacturer: PlatformConstants.Manufacturer,
            brand: PlatformConstants.Brand,
            model: PlatformConstants.Model,
            codename: NativeDeviceModule.device
          }
        },
        ios: {
          device: {
            manufacturer: NativeDeviceModule.deviceManufacturer,
            brand: NativeDeviceModule.deviceBrand,
            model: NativeDeviceModule.deviceModel,
            codename: NativeDeviceModule.device
          }
        }
      })
    };
  }
  function initDebugger() {
    if (settings.autoDebugger) {
      try {
        connectToDebugger2(settings.debuggerUrl);
      } catch (e) {
        logger.error("Failed to connect to Debugger during startup:", e);
      }
    }
    if (settings.autoDevTools) {
      try {
        if (settings.devToolsUrl) {
          connectRdt(settings.devToolsUrl, true);
        }
      } catch (e) {
        logger.error("Failed to connect to ReactDevTools during startup:", e);
      }
    }
  }
  var import_react_native6, socket2, originalConsoleLog2, originalConsoleError2, originalConsoleWarn2, originalLoggerLog2, originalLoggerError2, originalLoggerWarn2, VERSION2, rdtPort, rdtClient, rdtConnected, changeHooks, versionHash;
  var init_debug = __esm({
    "src/lib/api/debug.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_themes();
      init_assets();
      init_loader();
      init_modules();
      init_patcher();
      init_settings();
      init_logger();
      init_toasts();
      import_react_native6 = __toESM(require_react_native());
      VERSION2 = 1;
      rdtPort = 8097;
      rdtClient = null;
      rdtConnected = false;
      changeHooks = /* @__PURE__ */ new Set();
      versionHash = "v1.4.1";
    }
  });

  // src/lib/ui/components/wrappers/AlertModal.tsx
  function AlertModal2(props) {
    var forwardFailedModal = findByFilePath("modules/forwarding/native/ForwardFailedAlertModal.tsx");
    if (!forwardFailedModal && "extraContent" in props) {
      props.content = /* @__PURE__ */ jsxs(import_react_native7.View, {
        style: {
          gap: 16
        },
        children: [
          /* @__PURE__ */ jsx(Text, {
            variant: "text-md/medium",
            color: "text-muted",
            children: props.content
          }),
          /* @__PURE__ */ jsx(import_react_native7.View, {
            children: props.extraContent
          })
        ]
      });
      delete props.extraContent;
    }
    return /* @__PURE__ */ jsx(_AlertModal, {
      ...props
    });
  }
  var import_react_native7, _AlertModal, _AlertActionButton, AlertActionButton2;
  var init_AlertModal = __esm({
    "src/lib/ui/components/wrappers/AlertModal.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_lazy();
      init_metro();
      init_components();
      import_react_native7 = __toESM(require_react_native());
      ({ AlertModal: _AlertModal, AlertActionButton: _AlertActionButton } = lazyDestructure(() => findByProps("AlertModal", "AlertActions")));
      AlertActionButton2 = _AlertActionButton;
    }
  });

  // src/lib/ui/components/wrappers/index.ts
  var wrappers_exports = {};
  __export(wrappers_exports, {
    AlertActionButton: () => AlertActionButton2,
    AlertModal: () => AlertModal2
  });
  var init_wrappers2 = __esm({
    "src/lib/ui/components/wrappers/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_AlertModal();
    }
  });

  // src/lib/ui/color.ts
  function isSemanticColor(sym) {
    return colorResolver.isSemanticColor(sym);
  }
  function resolveSemanticColor(sym, theme = ThemeStore2.theme) {
    return colorResolver.resolveSemanticColor(theme, sym);
  }
  var color, semanticColors, rawColors, ThemeStore2, colorResolver;
  var init_color = __esm({
    "src/lib/ui/color.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_common();
      init_wrappers();
      color = findByProps("SemanticColor");
      semanticColors = color?.default?.colors ?? constants?.ThemeColorMap;
      rawColors = color?.default?.unsafe_rawColors ?? constants?.Colors;
      ThemeStore2 = findByStoreNameLazy("ThemeStore");
      colorResolver = color.default.meta ??= color.default.internal;
    }
  });

  // src/lib/ui/styles.ts
  var styles_exports = {};
  __export(styles_exports, {
    TextStyleSheet: () => TextStyleSheet,
    ThemeContext: () => ThemeContext,
    createLegacyClassComponentStyles: () => createLegacyClassComponentStyles,
    createStyles: () => createStyles,
    createThemedStyleSheet: () => createThemedStyleSheet
  });
  function createStyles(sheet) {
    return proxyLazy(() => Styles.createStyles(sheet));
  }
  function createLegacyClassComponentStyles(sheet) {
    return proxyLazy(() => Styles.createLegacyClassComponentStyles(sheet));
  }
  function createThemedStyleSheet(sheet) {
    for (var key in sheet) {
      sheet[key] = new Proxy(import_react_native8.StyleSheet.flatten(sheet[key]), {
        get(target, prop, receiver) {
          var res = Reflect.get(target, prop, receiver);
          return isSemanticColor(res) ? resolveSemanticColor(res) : res;
        }
      });
    }
    return sheet;
  }
  var import_react_native8, Styles, ThemeContext, TextStyleSheet;
  var init_styles = __esm({
    "src/lib/ui/styles.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_lazy();
      init_wrappers();
      init_color();
      import_react_native8 = __toESM(require_react_native());
      Styles = findByPropsLazy("createStyles");
      ({ ThemeContext } = lazyDestructure(() => findByProps("ThemeContext"), {
        hint: "object"
      }));
      ({ TextStyleSheet } = lazyDestructure(() => findByProps("TextStyleSheet")));
    }
  });

  // src/lib/ui/components/Codeblock.tsx
  function Codeblock({ selectable, style, children }) {
    if (!selectable)
      return /* @__PURE__ */ jsx(TextBasedCodeblock, {
        style,
        children
      });
    return import_react_native9.Platform.select({
      ios: /* @__PURE__ */ jsx(InputBasedCodeblock, {
        style,
        children
      }),
      default: /* @__PURE__ */ jsx(TextBasedCodeblock, {
        style,
        children,
        selectable: true
      })
    });
  }
  var import_react_native9, useStyles, InputBasedCodeblock, TextBasedCodeblock;
  var init_Codeblock = __esm({
    "src/lib/ui/components/Codeblock.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_common();
      init_color();
      init_styles();
      import_react_native9 = __toESM(require_react_native());
      useStyles = createStyles({
        codeBlock: {
          fontFamily: constants.Fonts.CODE_NORMAL,
          fontSize: 12,
          textAlignVertical: "center",
          backgroundColor: semanticColors.CARD_BACKGROUND_DEFAULT,
          color: semanticColors.TEXT_DEFAULT,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: semanticColors.BORDER_SUBTLE,
          padding: 10
        }
      });
      InputBasedCodeblock = ({ style, children }) => /* @__PURE__ */ jsx(import_react_native9.TextInput, {
        editable: false,
        multiline: true,
        style: [
          useStyles().codeBlock,
          style && style
        ],
        value: children
      });
      TextBasedCodeblock = ({ selectable, style, children }) => /* @__PURE__ */ jsx(import_react_native9.Text, {
        selectable,
        style: [
          useStyles().codeBlock,
          style && style
        ],
        children
      });
    }
  });

  // src/lib/ui/sheets.ts
  var sheets_exports = {};
  __export(sheets_exports, {
    hideSheet: () => hideSheet,
    showSheet: () => showSheet
  });
  function showSheet(key, lazyImport, props) {
    if (!("then" in lazyImport))
      lazyImport = Promise.resolve({
        default: lazyImport
      });
    actionSheet.openLazy(lazyImport, key, props ?? {});
  }
  function hideSheet(key) {
    actionSheet.hideActionSheet(key);
  }
  var actionSheet;
  var init_sheets = __esm({
    "src/lib/ui/sheets.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_wrappers();
      actionSheet = findByPropsLazy("openLazy", "hideActionSheet");
    }
  });

  // src/core/ui/reporter/utils/parseComponentStack.tsx
  function parseComponentStack(componentStack) {
    return componentStack.split(/[\s|\n]+?in /).filter(Boolean);
  }
  var init_parseComponentStack = __esm({
    "src/core/ui/reporter/utils/parseComponentStack.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // globals:react
  var require_react = __commonJS({
    "globals:react"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["react"];
    }
  });

  // src/core/ui/reporter/components/ErrorComponentStackCard.tsx
  function ErrorComponentStackCard(props) {
    var [collapsed, setCollapsed] = (0, import_react.useState)(true);
    var stack;
    try {
      stack = parseComponentStack(props.componentStack);
      stack = collapsed ? stack.slice(0, 4) : stack;
    } catch (e) {
      return;
    }
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(import_react_native10.View, {
        style: {
          gap: 8
        },
        children: [
          /* @__PURE__ */ jsx(Text, {
            variant: "heading-lg/bold",
            children: "Component Stack"
          }),
          /* @__PURE__ */ jsx(import_react_native10.View, {
            style: {
              gap: 4
            },
            children: stack.map((component) => /* @__PURE__ */ jsxs(import_react_native10.View, {
              style: {
                flexDirection: "row"
              },
              children: [
                /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/bold",
                  color: "text-muted",
                  children: "<"
                }),
                /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/bold",
                  children: component
                }),
                /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/bold",
                  color: "text-muted",
                  children: "/>"
                })
              ]
            }))
          }),
          collapsed && /* @__PURE__ */ jsx(Text, {
            children: "..."
          }),
          /* @__PURE__ */ jsxs(import_react_native10.View, {
            style: {
              gap: 8,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                text: `Show ${collapsed ? "more" : "less"}`,
                icon: collapsed ? findAssetId("down_arrow") : /* @__PURE__ */ jsx(import_react_native10.Image, {
                  style: {
                    transform: [
                      {
                        rotate: `${collapsed ? 0 : 180}deg`
                      }
                    ]
                  },
                  source: findAssetId("down_arrow")
                }),
                onPress: () => setCollapsed((v2) => !v2)
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                text: "Copy",
                icon: findAssetId("CopyIcon"),
                onPress: () => clipboard.setString(props.componentStack)
              })
            ]
          })
        ]
      })
    });
  }
  var import_react, import_react_native10;
  var init_ErrorComponentStackCard = __esm({
    "src/core/ui/reporter/components/ErrorComponentStackCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_parseComponentStack();
      init_assets();
      init_common();
      init_components();
      import_react = __toESM(require_react());
      import_react_native10 = __toESM(require_react_native());
    }
  });

  // src/core/ui/reporter/utils/parseErrorStack.ts
  function isInternalBytecodeSourceUrl(sourceUrl) {
    return sourceUrl === "InternalBytecode.js";
  }
  function parseLine(line) {
    var asFrame = line.match(RE_FRAME);
    if (asFrame) {
      return {
        type: "FRAME",
        functionName: asFrame[1],
        location: asFrame[2] === "native" ? {
          type: "NATIVE"
        } : asFrame[3] === "address at " ? isInternalBytecodeSourceUrl(asFrame[4]) ? {
          type: "INTERNAL_BYTECODE",
          sourceUrl: asFrame[4],
          line1Based: Number.parseInt(asFrame[5], 10),
          virtualOffset0Based: Number.parseInt(asFrame[6], 10)
        } : {
          type: "BYTECODE",
          sourceUrl: asFrame[4],
          line1Based: Number.parseInt(asFrame[5], 10),
          virtualOffset0Based: Number.parseInt(asFrame[6], 10)
        } : {
          type: "SOURCE",
          sourceUrl: asFrame[4],
          line1Based: Number.parseInt(asFrame[5], 10),
          column1Based: Number.parseInt(asFrame[6], 10)
        }
      };
    }
    var asSkipped = line.match(RE_SKIPPED);
    if (asSkipped) {
      return {
        type: "SKIPPED",
        count: Number.parseInt(asSkipped[1], 10)
      };
    }
  }
  function parseHermesStack(stack) {
    var lines = stack.split(/\n/);
    var entries = [];
    var lastMessageLine = -1;
    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];
      if (!line) {
        continue;
      }
      var entry = parseLine(line);
      if (entry) {
        entries.push(entry);
        continue;
      }
      if (RE_COMPONENT_NO_STACK.test(line)) {
        continue;
      }
      lastMessageLine = i;
      entries = [];
    }
    var message = lines.slice(0, lastMessageLine + 1).join("\n");
    return {
      message,
      entries
    };
  }
  function convertHermesStack(stack) {
    var frames = [];
    for (var entry of stack.entries) {
      if (entry.type !== "FRAME") {
        continue;
      }
      var { location, functionName } = entry;
      if (location.type === "NATIVE" || location.type === "INTERNAL_BYTECODE") {
        continue;
      }
      frames.push({
        methodName: functionName,
        file: location.sourceUrl,
        lineNumber: location.line1Based,
        column: location.type === "SOURCE" ? location.column1Based - 1 : location.virtualOffset0Based
      });
    }
    return frames;
  }
  function parseErrorStack(errorStack) {
    if (errorStack == null) {
      return [];
    }
    var parsedStack = Array.isArray(errorStack) ? errorStack : convertHermesStack(parseHermesStack(errorStack));
    return parsedStack;
  }
  var RE_FRAME, RE_SKIPPED, RE_COMPONENT_NO_STACK;
  var init_parseErrorStack = __esm({
    "src/core/ui/reporter/utils/parseErrorStack.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      RE_FRAME = /^ {4}at (.+?)(?: \((native)\)?| \((address at )?(.*?):(\d+):(\d+)\))$/;
      RE_SKIPPED = /^ {4}... skipping (\d+) frames$/;
      RE_COMPONENT_NO_STACK = /^ {4}at .*$/;
    }
  });

  // src/core/ui/reporter/components/ErrorStackCard.tsx
  function ErrorStackCard(props) {
    var [collapsed, setCollapsed] = (0, import_react2.useState)(true);
    var stack;
    try {
      var parsedErrorStack = parseErrorStack(props.error.stack);
      stack = collapsed ? parsedErrorStack.slice(0, 4) : parsedErrorStack;
    } catch (e) {
      return null;
    }
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(import_react_native11.View, {
        style: {
          gap: 12
        },
        children: [
          /* @__PURE__ */ jsx(Text, {
            variant: "heading-lg/bold",
            children: "Call Stack"
          }),
          /* @__PURE__ */ jsx(import_react_native11.View, {
            style: {
              gap: 4
            },
            children: stack.map((f, id) => /* @__PURE__ */ jsx(Line, {
              id,
              frame: f
            }))
          }),
          collapsed && /* @__PURE__ */ jsx(Text, {
            children: "..."
          }),
          /* @__PURE__ */ jsxs(import_react_native11.View, {
            style: {
              gap: 8,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                text: `Show ${collapsed ? "more" : "less"}`,
                icon: collapsed ? findAssetId("down_arrow") : /* @__PURE__ */ jsx(import_react_native11.Image, {
                  style: {
                    transform: [
                      {
                        rotate: `${collapsed ? 0 : 180}deg`
                      }
                    ]
                  },
                  source: findAssetId("down_arrow")
                }),
                onPress: () => setCollapsed((v2) => !v2)
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                text: "Copy",
                icon: findAssetId("CopyIcon"),
                onPress: () => clipboard.setString(props.error.stack)
              })
            ]
          })
        ]
      })
    });
  }
  function Line(props) {
    var [collapsed, setCollapsed] = (0, import_react2.useState)(true);
    return /* @__PURE__ */ jsxs(import_react_native11.Pressable, {
      onPress: () => setCollapsed((v2) => !v2),
      children: [
        /* @__PURE__ */ jsx(Text, {
          style: {
            fontFamily: constants.Fonts.CODE_BOLD
          },
          children: props.frame.methodName
        }),
        /* @__PURE__ */ jsx(Text, {
          style: {
            fontFamily: constants.Fonts.CODE_NORMAL
          },
          ellipsizeMode: "middle",
          numberOfLines: collapsed ? 1 : void 0,
          children: /* @__PURE__ */ jsxs(Text, {
            color: "text-muted",
            children: [
              props.frame.file === INDEX_BUNDLE_FILE ? "jsbundle" : props.frame.file,
              ":",
              props.frame.lineNumber,
              ":",
              props.frame.column
            ]
          })
        })
      ]
    }, props.id);
  }
  var import_react2, import_react_native11;
  var init_ErrorStackCard = __esm({
    "src/core/ui/reporter/components/ErrorStackCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_parseErrorStack();
      init_assets();
      init_common();
      init_components();
      import_react2 = __toESM(require_react());
      import_react_native11 = __toESM(require_react_native());
      init_ErrorCard();
    }
  });

  // src/core/ui/reporter/components/ErrorDetailsActionSheet.tsx
  function ErrorDetailsActionSheet(props) {
    return /* @__PURE__ */ jsx(ActionSheet, {
      children: /* @__PURE__ */ jsxs(import_react_native12.View, {
        style: {
          gap: 12,
          paddingVertical: 12
        },
        children: [
          /* @__PURE__ */ jsx(Text, {
            variant: "heading-lg/extrabold",
            children: "Error"
          }),
          /* @__PURE__ */ jsx(Codeblock, {
            selectable: true,
            children: props.error.message
          }),
          hasStack(props.error) && /* @__PURE__ */ jsx(ErrorStackCard, {
            error: props.error
          }),
          isComponentStack(props.error) ? /* @__PURE__ */ jsx(ErrorComponentStackCard, {
            componentStack: props.error.componentStack
          }) : null
        ]
      })
    });
  }
  var import_react_native12;
  var init_ErrorDetailsActionSheet = __esm({
    "src/core/ui/reporter/components/ErrorDetailsActionSheet.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_isStack();
      init_components2();
      init_components();
      import_react_native12 = __toESM(require_react_native());
      init_ErrorComponentStackCard();
      init_ErrorStackCard();
    }
  });

  // src/core/ui/reporter/components/ErrorCard.tsx
  function ErrorCard(props) {
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(Stack, {
        children: [
          props.header && typeof props.header !== "string" ? props.header : /* @__PURE__ */ jsx(Text, {
            variant: "heading-lg/bold",
            children: props.header ?? Strings.UH_OH
          }),
          /* @__PURE__ */ jsx(Codeblock, {
            selectable: true,
            children: String(props.error)
          }),
          /* @__PURE__ */ jsxs(TwinButtons, {
            children: [
              props.onRetryRender && /* @__PURE__ */ jsx(Button, {
                variant: "destructive",
                // icon={findAssetId("RetryIcon")}
                text: Strings.RETRY_RENDER,
                onPress: props.onRetryRender
              }),
              props.error instanceof Error ? /* @__PURE__ */ jsx(Button, {
                text: "Details",
                // icon={findAssetId("CircleInformationIcon-primary")}
                onPress: () => showSheet("BunnyErrorDetailsActionSheet", ErrorDetailsActionSheet, {
                  error: props.error
                })
              }) : null
            ]
          })
        ]
      })
    });
  }
  var INDEX_BUNDLE_FILE;
  var init_ErrorCard = __esm({
    "src/core/ui/reporter/components/ErrorCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_i18n();
      init_components2();
      init_sheets();
      init_components();
      init_ErrorDetailsActionSheet();
      INDEX_BUNDLE_FILE = globalThis.HermesInternal.getFunctionLocation(globalThis.__r).fileName;
    }
  });

  // src/lib/ui/components/ErrorBoundary.tsx
  var _React_Component, ErrorBoundary;
  var init_ErrorBoundary = __esm({
    "src/lib/ui/components/ErrorBoundary.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_call_super();
      init_class_call_check();
      init_create_class();
      init_define_property();
      init_inherits();
      init_jsxRuntime();
      init_ErrorCard();
      init_common();
      init_styles();
      ErrorBoundary = /* @__PURE__ */ function(_superClass) {
        "use strict";
        _inherits(ErrorBoundary2, _superClass);
        function ErrorBoundary2(props) {
          _class_call_check(this, ErrorBoundary2);
          var _this;
          _this = _call_super(this, ErrorBoundary2, [
            props
          ]);
          _this.state = {
            hasErr: false
          };
          return _this;
        }
        _create_class(ErrorBoundary2, [
          {
            key: "render",
            value: function render() {
              if (!this.state.hasErr)
                return this.props.children;
              return /* @__PURE__ */ jsx(ErrorCard, {
                error: this.state.error,
                onRetryRender: () => this.setState({
                  hasErr: false
                })
              });
            }
          }
        ]);
        return ErrorBoundary2;
      }(_React_Component = React2.Component);
      _define_property(ErrorBoundary, "contextType", ThemeContext);
      _define_property(ErrorBoundary, "getDerivedStateFromError", (error) => ({
        hasErr: true,
        error
      }));
    }
  });

  // src/lib/ui/components/Search.tsx
  function SearchIcon() {
    return /* @__PURE__ */ jsx(import_react_native13.Image, {
      style: {
        width: 16,
        height: 16
      },
      source: findAssetId("icon-search")
    });
  }
  var import_react_native13, Search_default;
  var init_Search = __esm({
    "src/lib/ui/components/Search.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_i18n();
      init_assets();
      init_components();
      init_ErrorBoundary();
      import_react_native13 = __toESM(require_react_native());
      Search_default = ({ onChangeText, placeholder, style, isRound }) => {
        var [query, setQuery] = React.useState("");
        var onChange = (value) => {
          setQuery(value);
          onChangeText?.(value);
        };
        return /* @__PURE__ */ jsx(ErrorBoundary, {
          children: /* @__PURE__ */ jsx(import_react_native13.View, {
            style,
            children: /* @__PURE__ */ jsx(TextInput, {
              grow: true,
              isClearable: true,
              leadingIcon: SearchIcon,
              placeholder: placeholder ?? Strings.SEARCH,
              onChange,
              returnKeyType: "search",
              size: "md",
              autoCapitalize: "none",
              autoCorrect: false,
              isRound,
              value: query
            })
          })
        });
      };
    }
  });

  // src/lib/ui/components/Summary.tsx
  function Summary({ label, icon, noPadding = false, noAnimation = false, children }) {
    var [hidden, setHidden] = React.useState(true);
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [
        /* @__PURE__ */ jsx(TableRow, {
          label,
          icon: icon && /* @__PURE__ */ jsx(TableRow.Icon, {
            source: findAssetId(icon)
          }),
          trailing: /* @__PURE__ */ jsx(LegacyFormRow.Arrow, {
            style: {
              transform: [
                {
                  rotate: `${hidden ? 180 : 90}deg`
                }
              ]
            }
          }),
          onPress: () => {
            setHidden(!hidden);
            if (!noAnimation)
              import_react_native14.LayoutAnimation.configureNext(import_react_native14.LayoutAnimation.Presets.easeInEaseOut);
          }
        }),
        !hidden && /* @__PURE__ */ jsx(Fragment, {
          children: /* @__PURE__ */ jsx(import_react_native14.View, {
            style: !noPadding && {
              paddingHorizontal: 15
            },
            children
          })
        })
      ]
    });
  }
  var import_react_native14;
  var init_Summary = __esm({
    "src/lib/ui/components/Summary.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_assets();
      init_components();
      import_react_native14 = __toESM(require_react_native());
    }
  });

  // src/lib/ui/components/index.ts
  var components_exports2 = {};
  __export(components_exports2, {
    Codeblock: () => Codeblock,
    ErrorBoundary: () => ErrorBoundary,
    Search: () => Search_default,
    Summary: () => Summary,
    wrappers: () => wrappers_exports
  });
  var init_components2 = __esm({
    "src/lib/ui/components/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_wrappers2();
      init_Codeblock();
      init_ErrorBoundary();
      init_Search();
      init_Summary();
    }
  });

  // src/core/ui/reporter/components/ErrorBoundaryScreen.tsx
  function ErrorBoundaryScreen(props) {
    var styles = useStyles2();
    var debugInfo = getDebugInfo();
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsx(SafeAreaProvider, {
        children: /* @__PURE__ */ jsxs(SafeAreaView, {
          style: styles.container,
          children: [
            /* @__PURE__ */ jsxs(import_react_native15.View, {
              style: {
                gap: 4
              },
              children: [
                /* @__PURE__ */ jsx(Text, {
                  variant: "display-lg",
                  children: "Uh oh."
                }),
                /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/normal",
                  children: "A crash occurred while rendering a component. This could be caused by a plugin, Kettu, or Discord itself."
                }),
                /* @__PURE__ */ jsxs(Text, {
                  variant: "text-sm/normal",
                  color: "text-muted",
                  children: [
                    debugInfo.os.name,
                    "; ",
                    debugInfo.discord.build,
                    " (",
                    debugInfo.discord.version,
                    "); ",
                    debugInfo.bunny.version
                  ]
                })
              ]
            }),
            /* @__PURE__ */ jsxs(import_react_native15.ScrollView, {
              fadingEdgeLength: 64,
              contentContainerStyle: {
                gap: 12
              },
              children: [
                /* @__PURE__ */ jsx(Codeblock, {
                  selectable: true,
                  children: props.error.message
                }),
                hasStack(props.error) && /* @__PURE__ */ jsx(ErrorStackCard, {
                  error: props.error
                }),
                isComponentStack(props.error) ? /* @__PURE__ */ jsx(ErrorComponentStackCard, {
                  componentStack: props.error.componentStack
                }) : null
              ]
            }),
            /* @__PURE__ */ jsxs(Card, {
              style: {
                gap: 6
              },
              children: [
                /* @__PURE__ */ jsx(Button, {
                  text: "Reload Discord",
                  onPress: () => BundleUpdaterManager.reload()
                }),
                !settings.safeMode?.enabled && /* @__PURE__ */ jsx(Button, {
                  text: "Reload in Safe Mode",
                  onPress: () => toggleSafeMode()
                }),
                /* @__PURE__ */ jsx(Button, {
                  variant: "destructive",
                  text: "Retry Render",
                  onPress: () => props.rerender()
                })
              ]
            })
          ]
        })
      })
    });
  }
  var import_react_native15, useStyles2;
  var init_ErrorBoundaryScreen = __esm({
    "src/core/ui/reporter/components/ErrorBoundaryScreen.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_isStack();
      init_debug();
      init_modules();
      init_settings();
      init_components2();
      init_styles();
      init_common();
      init_components();
      import_react_native15 = __toESM(require_react_native());
      init_ErrorComponentStackCard();
      init_ErrorStackCard();
      useStyles2 = createStyles({
        container: {
          flex: 1,
          backgroundColor: tokens.colors.BG_BASE_SECONDARY,
          paddingHorizontal: 16,
          height: "100%",
          gap: 12
        }
      });
    }
  });

  // src/core/debug/patches/patchErrorBoundary.tsx
  function getErrorBoundaryContext() {
    var ctxt = findByNameLazy("ErrorBoundary")[_lazyContextSymbol];
    return new Promise((resolve) => ctxt.getExports((exp) => resolve(exp.prototype)));
  }
  function patchErrorBoundary() {
    return after.await("render", getErrorBoundaryContext(), function() {
      if (!this.state.error)
        return;
      return /* @__PURE__ */ jsx(ErrorBoundaryScreen, {
        error: this.state.error,
        rerender: () => this.setState({
          info: null,
          error: null
        })
      });
    });
  }
  var init_patchErrorBoundary = __esm({
    "src/core/debug/patches/patchErrorBoundary.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_ErrorBoundaryScreen();
      init_patcher();
      init_lazy2();
      init_wrappers();
    }
  });

  // globals:moment
  var require_moment = __commonJS({
    "globals:moment"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["moment"];
    }
  });

  // src/core/fixes.ts
  function onDispatch({ locale }) {
    try {
      import_moment.default.locale(locale.toLowerCase());
    } catch (e) {
      logger.error("Failed to fix timestamps...", e);
    }
    FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  var import_moment, fixes_default;
  var init_fixes = __esm({
    "src/core/fixes.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_logger();
      init_common();
      import_moment = __toESM(require_moment());
      fixes_default = () => {
        FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", onDispatch);
      };
    }
  });

  // src/assets/icons/kettu.png
  var kettu_default;
  var init_kettu = __esm({
    "src/assets/icons/kettu.png"() {
      kettu_default = "data:image/png;base64,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Im1DZW50ZXJYXCI6MC40ODM0NDI1NzQ3Mzk0NTYyLFwibUNlbnRlcllcIjowLjUwOTgzMDY1MzY2NzQ1LFwibVdpZHRoXCI6MC43OTA1NzkxOTk3OTA5NTQ2LFwibUhlaWdodFwiOjAuODAzODg5MzM0MjAxODEyNyxcIm1Sb3RhdGlvblwiOjAsXCJtUm90YXRlXCI6MCxcIm1IRmxpcFwiOjAsXCJtVkZsaXBcIjowLFwibVJvdGF0aW9uRWZmZWN0XCI6MCxcIm1Sb3RhdGVFZmZlY3RcIjowLFwibUhGbGlwRWZmZWN0XCI6MCxcIm1WRmxpcEVmZmVjdFwiOjAsXCJtSG96UGVyc3BlY3RpdmVcIjowLFwibVZlclBlcnNwZWN0aXZlXCI6MH0iLCJ0b25lVmFsdWUiOiJ7XCJicmlnaHRuZXNzXCI6MTAwLFwiZXhwb3N1cmVcIjoxMDAsXCJjb250cmFzdFwiOjEwMCxcInNhdHVyYXRpb25cIjoxMDAsXCJodWVcIjoxMDAsXCJ3Yk1vZGVcIjotMSxcIndiVGVtcGVyYXR1cmVcIjoxMDAsXCJ0aW50XCI6MTAwLFwic2hhZG93XCI6MTAwLFwiaGlnaGxpZ2h0XCI6MTAwLFwibGlnaHRiYWxhbmNlXCI6MTAwLFwic2hhcnBuZXNzXCI6MTAwLFwiZGVmaW5pdGlvblwiOjEwMCxcImlzQnJpZ2h0bmVzc0lQRVwiOmZhbHNlLFwiaXNFeHBvc3VyZUlQRVwiOmZhbHNlLFwiaXNDb250cmFzdElQRVwiOmZhbHNlLFwiaXNTYXR1cmF0aW9uSVBFXCI6ZmFsc2V9IiwiZWZmZWN0VmFsdWUiOiJ7XCJmaWx0ZXJJbmRpY2F0aW9uXCI6NDA5NyxcImFscGhhVmFsdWVcIjoxMDAsXCJmaWx0ZXJUeXBlXCI6MH0iLCJwb3J0cmFpdEVmZmVjdFZhbHVlIjoie1wiZWZmZWN0SWRcIjotMSxcImVmZmVjdExldmVsXCI6LTEsXCJleGlmUm90YXRpb25cIjowLFwibGlnaHRMZXZlbFwiOjAsXCJ0b3VjaFhcIjowLFwidG91Y2hZXCI6MCxcInJlZm9jdXNYXCI6LTEsXCJyZWZvY3VzWVwiOi0xLFwiZWZmZWN0SWRPcmlnaW5hbFwiOi0xLFwiZWZmZWN0TGV2ZWxPcmlnaW5hbFwiOi0xLFwibGlnaHRMZXZlbE9yaWdpbmFsXCI6LTEsXCJ0b3VjaFhPcmlnaW5hbFwiOjAsXCJ0b3VjaFlPcmlnaW5hbFwiOjAsXCJyZWZvY3VzWE9yaWdpbmFsXCI6LTEsXCJyZWZvY3VzWU9yaWdpbmFsXCI6LTEsXCJ3YXRlck1hcmtSZW1vdmVkXCI6ZmFsc2UsXCJ3YXRlck1hcmtSZW1vdmVkT3JpZ2luYWxcIjpmYWxzZX0iLCJpc0JsZW5kaW5nIjp0cnVlLCJpc05vdFJlRWRpdCI6ZmFsc2UsInNlcFZlcnNpb24iOiIxNjAwMDAiLCJuZGVWZXJzaW9uIjoxLCJyZVNpemUiOjQsImlzU2NhbGVBSSI6ZmFsc2UsInJvdGF0aW9uIjoxLCJhZGp1c3RtZW50VmFsdWUiOiJ7XCJtQ3JvcFN0YXRlXCI6MTMxMDc2fSIsImlzQXBwbHlTaGFwZUNvcnJlY3Rpb24iOmZhbHNlLCJpc05ld1JlRWRpdE9ubHkiOmZhbHNlLCJpc0RlY29SZUVkaXRPbmx5IjpmYWxzZSwiaXNBSUZpbHRlclJlRWRpdE9ubHkiOmZhbHNlfQAAoQsWAAAAT3JpZ2luYWxfUGF0aF9IYXNoX0tleTBmYTMxNDVjMzc5MDc4MWI4ZDA2YjdiMThkNmI3Y2Y5YWZmMTY4NTE4NDA5YTFiNTZjMTQ5NTc2MzQ5YjViZmYvMjM4MDNTRUZIawAAAAIAAAAAAKEL7QYAAIkGAAAAAKELZAAAAGQAAAAkAAAAU0VGVA==";
    }
  });

  // src/lib/ui/settings/patches/shared.tsx
  function wrapOnPress(onPress, navigation2, renderPromise, screenOptions, props) {
    return () => _async_to_generator(function* () {
      if (onPress)
        return void onPress();
      var Component = yield renderPromise().then((m2) => m2.default);
      if (typeof screenOptions === "string") {
        screenOptions = {
          title: screenOptions
        };
      }
      navigation2 ??= tabsNavigationRef.getRootNavigationRef();
      navigation2.navigate("PUPU_CUSTOM_PAGE", {
        ...screenOptions,
        render: () => /* @__PURE__ */ jsx(Component, {
          ...props
        })
      });
    })();
  }
  var tabsNavigationRef, CustomPageRenderer;
  var init_shared = __esm({
    "src/lib/ui/settings/patches/shared.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_common();
      init_wrappers();
      init_components2();
      tabsNavigationRef = findByPropsLazy("getRootNavigationRef");
      CustomPageRenderer = React.memo(() => {
        var navigation2 = NavigationNative.useNavigation();
        var route = NavigationNative.useRoute();
        var { render: PageComponent, ...args } = route.params;
        React.useEffect(() => void navigation2.setOptions({
          ...args
        }), []);
        return /* @__PURE__ */ jsx(ErrorBoundary, {
          children: /* @__PURE__ */ jsx(PageComponent, {})
        });
      });
    }
  });

  // src/lib/ui/settings/patches/tabs.tsx
  function useIsFirstRender() {
    var firstRender = false;
    React.useEffect(() => void (firstRender = true), []);
    return firstRender;
  }
  function patchTabsUI(unpatches) {
    var getRows = () => Object.values(registeredSections).flatMap((sect) => sect.map((row) => ({
      [row.key]: {
        type: "pressable",
        title: row.title,
        icon: row.icon,
        IconComponent: () => /* @__PURE__ */ jsx(TableRow.Icon, {
          source: row.icon
        }),
        usePredicate: row.usePredicate,
        useTrailing: row.useTrailing,
        onPress: wrapOnPress(row.onPress, null, row.render, row.title()),
        withArrow: true,
        ...row.rawTabsConfig
      }
    }))).reduce((a, c2) => Object.assign(a, c2));
    var origRendererConfig = settingConstants.SETTING_RENDERER_CONFIG;
    var rendererConfigValue = settingConstants.SETTING_RENDERER_CONFIG;
    Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
      enumerable: true,
      configurable: true,
      get: () => ({
        ...rendererConfigValue,
        VendettaCustomPage: {
          type: "route",
          title: () => "Kettu",
          screen: {
            route: "VendettaCustomPage",
            getComponent: () => CustomPageRenderer
          }
        },
        PUPU_CUSTOM_PAGE: {
          type: "route",
          title: () => "Kettu",
          screen: {
            route: "PUPU_CUSTOM_PAGE",
            getComponent: () => CustomPageRenderer
          }
        },
        BUNNY_CUSTOM_PAGE: {
          type: "route",
          title: () => "Kettu",
          screen: {
            route: "BUNNY_CUSTOM_PAGE",
            getComponent: () => CustomPageRenderer
          }
        },
        ...getRows()
      }),
      set: (v2) => rendererConfigValue = v2
    });
    unpatches.push(() => {
      Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
        value: origRendererConfig,
        writable: true,
        get: void 0,
        set: void 0
      });
    });
    try {
      unpatches.push(after("createList", createListModule, function(args, ret) {
        var [config] = args;
        if (config?.sections && Array.isArray(config.sections)) {
          var sections = config.sections;
          var accountSectionIndex = sections.findIndex((i) => i.settings?.includes("ACCOUNT"));
          if (accountSectionIndex !== -1) {
            var index = accountSectionIndex + 1;
            Object.keys(registeredSections).forEach((sect) => {
              var alreadyExists = sections.some((s) => s.label === sect);
              if (!alreadyExists) {
                sections.splice(index++, 0, {
                  label: sect,
                  title: sect,
                  settings: registeredSections[sect].map((a) => a.key)
                });
              }
            });
          }
        }
        return ret;
      }));
    } catch (e) {
      unpatches.push(after("default", SettingsOverviewScreen, (_2, ret) => {
        if (useIsFirstRender())
          return;
        var { sections } = findInReactTree(ret, (i) => i.props?.sections).props;
        var index = -~sections.findIndex((i) => i.settings.includes("ACCOUNT")) || 1;
        Object.keys(registeredSections).forEach((sect) => {
          sections.splice(index++, 0, {
            label: sect,
            title: sect,
            settings: registeredSections[sect].map((a) => a.key)
          });
        });
      }));
    }
  }
  var settingConstants, createListModule, SettingsOverviewScreen;
  var init_tabs = __esm({
    "src/lib/ui/settings/patches/tabs.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_patcher();
      init_components();
      init_wrappers();
      init_settings2();
      init_shared();
      init_utils();
      settingConstants = findByPropsLazy("SETTING_RENDERER_CONFIG");
      createListModule = findByPropsLazy("createList");
      SettingsOverviewScreen = findByNameLazy("SettingsOverviewScreen", false);
    }
  });

  // src/lib/ui/settings/index.tsx
  var settings_exports2 = {};
  __export(settings_exports2, {
    patchSettings: () => patchSettings,
    registerSection: () => registerSection,
    registeredSections: () => registeredSections
  });
  function registerSection(section) {
    registeredSections[section.name] = section.items;
    return () => delete registeredSections[section.name];
  }
  function patchSettings() {
    var unpatches = new Array();
    patchTabsUI(unpatches);
    return () => unpatches.forEach((u) => u());
  }
  var registeredSections;
  var init_settings2 = __esm({
    "src/lib/ui/settings/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_tabs();
      registeredSections = {};
    }
  });

  // src/core/debug/safeMode.ts
  function isSafeMode() {
    return settings.safeMode?.enabled === true;
  }
  function toggleSafeMode2() {
    return _async_to_generator(function* ({ to = !isSafeMode(), reload = true } = {}) {
      var enabled = (settings.safeMode ??= {
        enabled: to
      }).enabled = to;
      var currentColor = getCurrentTheme();
      yield writeThemeToNative(enabled ? {} : currentColor?.data ?? {});
      if (reload)
        setTimeout(() => BundleUpdaterManager.reload(), 500);
    }).apply(this, arguments);
  }
  var init_safeMode = __esm({
    "src/core/debug/safeMode.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_themes();
      init_modules();
      init_settings();
    }
  });

  // src/core/ui/settings/pages/General/Version.tsx
  function Version({ label, version, icon }) {
    return /* @__PURE__ */ jsx(TableRow, {
      label,
      trailing: /* @__PURE__ */ jsx(TableRowTrailingText, {
        text: version
      }),
      icon: /* @__PURE__ */ jsx(TableRow.Icon, {
        source: typeof icon === "string" ? findAssetId(icon) : icon
      }),
      onPress: () => {
        clipboard.setString(`${label} - ${version}`);
        showToast.showCopyToClipboard();
      }
    });
  }
  var init_Version = __esm({
    "src/core/ui/settings/pages/General/Version.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_assets();
      init_common();
      init_components();
      init_toasts();
    }
  });

  // src/core/ui/settings/pages/General/About.tsx
  function About() {
    var debugInfo = getDebugInfo();
    useProxy(settings);
    var versions = [
      {
        label: Strings.PUPU,
        version: debugInfo.bunny.version,
        icon: {
          uri: kettu_default
        }
      },
      {
        label: "Discord",
        version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
        icon: "Discord"
      },
      {
        label: "React",
        version: debugInfo.react.version,
        icon: "ScienceIcon"
      },
      {
        label: "React Native",
        version: debugInfo.react.nativeVersion,
        icon: "MobilePhoneIcon"
      },
      {
        label: Strings.BYTECODE,
        version: debugInfo.hermes.bytecodeVersion,
        icon: "TopicsIcon"
      }
    ];
    var platformInfo = [
      {
        label: Strings.LOADER,
        version: `${debugInfo.bunny.loader.name} (${debugInfo.bunny.loader.version})`,
        icon: "DownloadIcon"
      },
      {
        label: Strings.OPERATING_SYSTEM,
        version: `${debugInfo.os.name} ${debugInfo.os.version}`,
        icon: "ScreenIcon"
      },
      ...debugInfo.os.sdk ? [
        {
          label: "SDK",
          version: debugInfo.os.sdk,
          icon: "StaffBadgeIcon"
        }
      ] : [],
      {
        label: Strings.MANUFACTURER,
        version: debugInfo.device.manufacturer,
        icon: "WrenchIcon"
      },
      ...import_react_native16.Platform.OS !== "ios" ? [
        {
          label: Strings.BRAND,
          version: debugInfo.device.brand,
          icon: "MagicWandIcon"
        }
      ] : [],
      {
        label: Strings.MODEL,
        version: debugInfo.device.model,
        icon: "MobilePhoneIcon"
      },
      {
        label: import_react_native16.Platform.select({
          android: Strings.CODENAME,
          ios: Strings.MODELID
        }),
        version: debugInfo.device.codename,
        icon: "TagIcon"
      }
    ];
    return /* @__PURE__ */ jsx(import_react_native16.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 24,
        children: [
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.VERSIONS,
            children: versions.map((v2) => /* @__PURE__ */ jsx(Version, {
              label: v2.label,
              version: v2.version,
              icon: v2.icon
            }))
          }),
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.PLATFORM,
            children: platformInfo.map((p) => /* @__PURE__ */ jsx(Version, {
              label: p.label,
              version: p.version,
              icon: p.icon
            }))
          })
        ]
      })
    });
  }
  var import_react_native16;
  var init_About = __esm({
    "src/core/ui/settings/pages/General/About.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_i18n();
      init_settings3();
      init_Version();
      init_storage();
      init_debug();
      init_settings();
      init_components();
      import_react_native16 = __toESM(require_react_native());
    }
  });

  // src/lib/ui/alerts.ts
  var alerts_exports = {};
  __export(alerts_exports, {
    dismissAlert: () => dismissAlert,
    openAlert: () => openAlert
  });
  var openAlert, dismissAlert;
  var init_alerts = __esm({
    "src/lib/ui/alerts.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_lazy();
      init_metro();
      ({ openAlert, dismissAlert } = lazyDestructure(() => findByProps("openAlert", "dismissAlert")));
    }
  });

  // src/assets/icons/codeberg-logo_icon_white.png
  var codeberg_logo_icon_white_default;
  var init_codeberg_logo_icon_white = __esm({
    "src/assets/icons/codeberg-logo_icon_white.png"() {
      codeberg_logo_icon_white_default = "data:image/png;base64,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";
    }
  });

  // src/core/ui/settings/pages/General/index.tsx
  var General_exports = {};
  __export(General_exports, {
    default: () => General
  });
  function General() {
    useProxy(settings);
    var debugInfo = getDebugInfo();
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(import_react_native17.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 24,
        children: [
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.INFO,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.PUPU,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: {
                    uri: kettu_default
                  }
                }),
                trailing: /* @__PURE__ */ jsx(TableRow.TrailingText, {
                  text: debugInfo.bunny.version
                })
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: "Discord",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("Discord")
                }),
                trailing: /* @__PURE__ */ jsx(TableRow.TrailingText, {
                  text: `${debugInfo.discord.version} (${debugInfo.discord.build})`
                })
              }),
              /* @__PURE__ */ jsx(TableRow, {
                arrow: true,
                label: Strings.ABOUT,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("CircleInformationIcon-primary")
                }),
                onPress: () => navigation2.push("PUPU_CUSTOM_PAGE", {
                  title: Strings.ABOUT,
                  render: () => /* @__PURE__ */ jsx(About, {})
                })
              })
            ]
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.LINKS,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                arrow: true,
                label: Strings.DISCORD_SERVER,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("Discord")
                }),
                onPress: () => import_react_native17.Linking.openURL(DISCORD_SERVER)
              }),
              /* @__PURE__ */ jsx(TableRow, {
                arrow: true,
                label: Strings.CODEBERG,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: {
                    uri: codeberg_logo_icon_white_default
                  }
                }),
                onPress: () => import_react_native17.Linking.openURL(CODEBERG)
              }),
              /* @__PURE__ */ jsx(TableRow, {
                arrow: true,
                label: Strings.GITHUB,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("img_account_sync_github_white")
                }),
                onPress: () => import_react_native17.Linking.openURL(GITHUB)
              })
            ]
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.ACTIONS,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.RELOAD_DISCORD,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("RetryIcon")
                }),
                onPress: () => BundleUpdaterManager.reload()
              }),
              /* @__PURE__ */ jsx(TableSwitchRow, {
                label: "Safe Mode",
                subLabel: "Load Kettu without loading add-ons",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ShieldIcon")
                }),
                value: isSafeMode(),
                onValueChange: (to) => {
                  toggleSafeMode2({
                    to,
                    reload: false
                  });
                  openAlert("bunny-reload-safe-mode", /* @__PURE__ */ jsx(AlertModal, {
                    title: "Reload now?",
                    content: !to ? "All add-ons will load normally." : "All add-ons will be temporarily disabled upon reload.",
                    actions: /* @__PURE__ */ jsxs(AlertActions, {
                      children: [
                        /* @__PURE__ */ jsx(AlertActionButton, {
                          text: "Reload Now",
                          variant: "destructive",
                          onPress: () => BundleUpdaterManager.reload()
                        }),
                        /* @__PURE__ */ jsx(AlertActionButton, {
                          text: "Later",
                          variant: "secondary"
                        })
                      ]
                    })
                  }));
                }
              }),
              /* @__PURE__ */ jsx(TableSwitchRow, {
                label: Strings.DEVELOPER_SETTINGS,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("WrenchIcon")
                }),
                value: settings.developerSettings,
                onValueChange: (v2) => {
                  settings.developerSettings = v2;
                }
              })
            ]
          }),
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.MISCELLANEOUS,
            children: /* @__PURE__ */ jsx(TableSwitchRow, {
              label: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS,
              subLabel: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS_DESC,
              icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                source: findAssetId("WrenchIcon")
              }),
              value: settings.enableDiscordDeveloperSettings,
              onValueChange: (v2) => {
                settings.enableDiscordDeveloperSettings = v2;
              }
            })
          })
        ]
      })
    });
  }
  var import_react_native17;
  var init_General = __esm({
    "src/core/ui/settings/pages/General/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_safeMode();
      init_i18n();
      init_settings3();
      init_About();
      init_storage();
      init_assets();
      init_debug();
      init_modules();
      init_settings();
      init_alerts();
      init_constants();
      init_common();
      init_components();
      import_react_native17 = __toESM(require_react_native());
      init_codeberg_logo_icon_white();
    }
  });

  // src/lib/utils/isValidHttpUrl.ts
  function isValidHttpUrl(input) {
    var url2;
    try {
      url2 = new URL(input);
    } catch (e) {
      return false;
    }
    return url2.protocol === "http:" || url2.protocol === "https:";
  }
  var init_isValidHttpUrl = __esm({
    "src/lib/utils/isValidHttpUrl.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // node_modules/fuzzysort/fuzzysort.js
  var require_fuzzysort = __commonJS({
    "node_modules/fuzzysort/fuzzysort.js"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_call_super();
      init_class_call_check();
      init_create_class();
      init_inherits();
      init_wrap_native_super();
      ((root, UMD) => {
        if (typeof define === "function" && define.amd)
          define([], UMD);
        else if (typeof module === "object" && module.exports)
          module.exports = UMD();
        else
          root["fuzzysort"] = UMD();
      })(exports, (_2) => {
        "use strict";
        var single = (search, target) => {
          if (!search || !target)
            return NULL;
          var preparedSearch = getPreparedSearch(search);
          if (!isPrepared(target))
            target = getPrepared(target);
          var searchBitflags = preparedSearch.bitflags;
          if ((searchBitflags & target._bitflags) !== searchBitflags)
            return NULL;
          return algorithm(preparedSearch, target);
        };
        var go = (search, targets, options) => {
          if (!search)
            return options?.all ? all(targets, options) : noResults;
          var preparedSearch = getPreparedSearch(search);
          var searchBitflags = preparedSearch.bitflags;
          var containsSpace = preparedSearch.containsSpace;
          var threshold = denormalizeScore(options?.threshold || 0);
          var limit = options?.limit || INFINITY;
          var resultsLen = 0;
          var limitedCount = 0;
          var targetsLen = targets.length;
          function push_result(result2) {
            if (resultsLen < limit) {
              q3.add(result2);
              ++resultsLen;
            } else {
              ++limitedCount;
              if (result2._score > q3.peek()._score)
                q3.replaceTop(result2);
            }
          }
          if (options?.key) {
            var key = options.key;
            for (var i = 0; i < targetsLen; ++i) {
              var obj = targets[i];
              var target = getValue(obj, key);
              if (!target)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result._score < threshold)
                continue;
              result.obj = obj;
              push_result(result);
            }
          } else if (options?.keys) {
            var keys = options.keys;
            var keysLen = keys.length;
            outer:
              for (var i = 0; i < targetsLen; ++i) {
                var obj = targets[i];
                {
                  var keysBitflags = 0;
                  for (var keyI = 0; keyI < keysLen; ++keyI) {
                    var key = keys[keyI];
                    var target = getValue(obj, key);
                    if (!target) {
                      tmpTargets[keyI] = noTarget;
                      continue;
                    }
                    if (!isPrepared(target))
                      target = getPrepared(target);
                    tmpTargets[keyI] = target;
                    keysBitflags |= target._bitflags;
                  }
                  if ((searchBitflags & keysBitflags) !== searchBitflags)
                    continue;
                }
                if (containsSpace)
                  for (var i1 = 0; i1 < preparedSearch.spaceSearches.length; i1++)
                    keysSpacesBestScores[i1] = NEGATIVE_INFINITY;
                for (var keyI = 0; keyI < keysLen; ++keyI) {
                  target = tmpTargets[keyI];
                  if (target === noTarget) {
                    tmpResults[keyI] = noTarget;
                    continue;
                  }
                  tmpResults[keyI] = algorithm(
                    preparedSearch,
                    target,
                    /*allowSpaces=*/
                    false,
                    /*allowPartialMatch=*/
                    containsSpace
                  );
                  if (tmpResults[keyI] === NULL) {
                    tmpResults[keyI] = noTarget;
                    continue;
                  }
                  if (containsSpace)
                    for (var i2 = 0; i2 < preparedSearch.spaceSearches.length; i2++) {
                      if (allowPartialMatchScores[i2] > -1e3) {
                        if (keysSpacesBestScores[i2] > NEGATIVE_INFINITY) {
                          var tmp = (keysSpacesBestScores[i2] + allowPartialMatchScores[i2]) / 4;
                          if (tmp > keysSpacesBestScores[i2])
                            keysSpacesBestScores[i2] = tmp;
                        }
                      }
                      if (allowPartialMatchScores[i2] > keysSpacesBestScores[i2])
                        keysSpacesBestScores[i2] = allowPartialMatchScores[i2];
                    }
                }
                if (containsSpace) {
                  for (var i3 = 0; i3 < preparedSearch.spaceSearches.length; i3++) {
                    if (keysSpacesBestScores[i3] === NEGATIVE_INFINITY)
                      continue outer;
                  }
                } else {
                  var hasAtLeast1Match = false;
                  for (var i4 = 0; i4 < keysLen; i4++) {
                    if (tmpResults[i4]._score !== NEGATIVE_INFINITY) {
                      hasAtLeast1Match = true;
                      break;
                    }
                  }
                  if (!hasAtLeast1Match)
                    continue;
                }
                var objResults = new KeysResult(keysLen);
                for (var i5 = 0; i5 < keysLen; i5++) {
                  objResults[i5] = tmpResults[i5];
                }
                if (containsSpace) {
                  var score = 0;
                  for (var i6 = 0; i6 < preparedSearch.spaceSearches.length; i6++)
                    score += keysSpacesBestScores[i6];
                } else {
                  var score = NEGATIVE_INFINITY;
                  for (var i7 = 0; i7 < keysLen; i7++) {
                    var result = objResults[i7];
                    if (result._score > -1e3) {
                      if (score > NEGATIVE_INFINITY) {
                        var tmp = (score + result._score) / 4;
                        if (tmp > score)
                          score = tmp;
                      }
                    }
                    if (result._score > score)
                      score = result._score;
                  }
                }
                objResults.obj = obj;
                objResults._score = score;
                if (options?.scoreFn) {
                  score = options.scoreFn(objResults);
                  if (!score)
                    continue;
                  score = denormalizeScore(score);
                  objResults._score = score;
                }
                if (score < threshold)
                  continue;
                push_result(objResults);
              }
          } else {
            for (var i = 0; i < targetsLen; ++i) {
              var target = targets[i];
              if (!target)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result._score < threshold)
                continue;
              push_result(result);
            }
          }
          if (resultsLen === 0)
            return noResults;
          var results = new Array(resultsLen);
          for (var i = resultsLen - 1; i >= 0; --i)
            results[i] = q3.poll();
          results.total = resultsLen + limitedCount;
          return results;
        };
        var highlight = (result, open = "<b>", close = "</b>") => {
          var callback = typeof open === "function" ? open : void 0;
          var target = result.target;
          var targetLen = target.length;
          var indexes = result.indexes;
          var highlighted = "";
          var matchI = 0;
          var indexesI = 0;
          var opened = false;
          var parts = [];
          for (var i = 0; i < targetLen; ++i) {
            var char = target[i];
            if (indexes[indexesI] === i) {
              ++indexesI;
              if (!opened) {
                opened = true;
                if (callback) {
                  parts.push(highlighted);
                  highlighted = "";
                } else {
                  highlighted += open;
                }
              }
              if (indexesI === indexes.length) {
                if (callback) {
                  highlighted += char;
                  parts.push(callback(highlighted, matchI++));
                  highlighted = "";
                  parts.push(target.substr(i + 1));
                } else {
                  highlighted += char + close + target.substr(i + 1);
                }
                break;
              }
            } else {
              if (opened) {
                opened = false;
                if (callback) {
                  parts.push(callback(highlighted, matchI++));
                  highlighted = "";
                } else {
                  highlighted += close;
                }
              }
            }
            highlighted += char;
          }
          return callback ? parts : highlighted;
        };
        var prepare = (target) => {
          if (typeof target === "number")
            target = "" + target;
          else if (typeof target !== "string")
            target = "";
          var info = prepareLowerInfo(target);
          return new_result(target, {
            _targetLower: info._lower,
            _targetLowerCodes: info.lowerCodes,
            _bitflags: info.bitflags
          });
        };
        var cleanup = () => {
          preparedCache.clear();
          preparedSearchCache.clear();
        };
        var Result = /* @__PURE__ */ function() {
          function Result2() {
            _class_call_check(this, Result2);
          }
          _create_class(Result2, [
            {
              key: "indexes",
              get: function get() {
                return this._indexes.slice(0, this._indexes.len).sort((a, b3) => a - b3);
              }
            },
            {
              key: "indexes",
              set: function set(indexes) {
                return this._indexes = indexes;
              }
            },
            {
              key: "highlight",
              value: function value(open, close) {
                return highlight(this, open, close);
              }
            },
            {
              key: "score",
              get: function get() {
                return normalizeScore(this._score);
              }
            },
            {
              key: "score",
              set: function set(score) {
                this._score = denormalizeScore(score);
              }
            }
          ]);
          return Result2;
        }();
        var KeysResult = /* @__PURE__ */ function(Array1) {
          _inherits(KeysResult2, Array1);
          function KeysResult2() {
            _class_call_check(this, KeysResult2);
            return _call_super(this, KeysResult2, arguments);
          }
          _create_class(KeysResult2, [
            {
              key: "score",
              get: function get() {
                return normalizeScore(this._score);
              }
            },
            {
              key: "score",
              set: function set(score) {
                this._score = denormalizeScore(score);
              }
            }
          ]);
          return KeysResult2;
        }(_wrap_native_super(Array));
        var new_result = (target, options) => {
          var result = new Result();
          result["target"] = target;
          result["obj"] = options.obj ?? NULL;
          result._score = options._score ?? NEGATIVE_INFINITY;
          result._indexes = options._indexes ?? [];
          result._targetLower = options._targetLower ?? "";
          result._targetLowerCodes = options._targetLowerCodes ?? NULL;
          result._nextBeginningIndexes = options._nextBeginningIndexes ?? NULL;
          result._bitflags = options._bitflags ?? 0;
          return result;
        };
        var normalizeScore = (score) => {
          if (score === NEGATIVE_INFINITY)
            return 0;
          if (score > 1)
            return score;
          return Math.E ** (((-score + 1) ** 0.04307 - 1) * -2);
        };
        var denormalizeScore = (normalizedScore) => {
          if (normalizedScore === 0)
            return NEGATIVE_INFINITY;
          if (normalizedScore > 1)
            return normalizedScore;
          return 1 - Math.pow(Math.log(normalizedScore) / -2 + 1, 1 / 0.04307);
        };
        var prepareSearch = (search) => {
          if (typeof search === "number")
            search = "" + search;
          else if (typeof search !== "string")
            search = "";
          search = search.trim();
          var info = prepareLowerInfo(search);
          var spaceSearches = [];
          if (info.containsSpace) {
            var searches = search.split(/\s+/);
            searches = [
              ...new Set(searches)
            ];
            for (var i = 0; i < searches.length; i++) {
              if (searches[i] === "")
                continue;
              var _info = prepareLowerInfo(searches[i]);
              spaceSearches.push({
                lowerCodes: _info.lowerCodes,
                _lower: searches[i].toLowerCase(),
                containsSpace: false
              });
            }
          }
          return {
            lowerCodes: info.lowerCodes,
            _lower: info._lower,
            containsSpace: info.containsSpace,
            bitflags: info.bitflags,
            spaceSearches
          };
        };
        var getPrepared = (target) => {
          if (target.length > 999)
            return prepare(target);
          var targetPrepared = preparedCache.get(target);
          if (targetPrepared !== void 0)
            return targetPrepared;
          targetPrepared = prepare(target);
          preparedCache.set(target, targetPrepared);
          return targetPrepared;
        };
        var getPreparedSearch = (search) => {
          if (search.length > 999)
            return prepareSearch(search);
          var searchPrepared = preparedSearchCache.get(search);
          if (searchPrepared !== void 0)
            return searchPrepared;
          searchPrepared = prepareSearch(search);
          preparedSearchCache.set(search, searchPrepared);
          return searchPrepared;
        };
        var all = (targets, options) => {
          var results = [];
          results.total = targets.length;
          var limit = options?.limit || INFINITY;
          if (options?.key) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var target = getValue(obj, options.key);
              if (target == NULL)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              var result = new_result(target.target, {
                _score: target._score,
                obj
              });
              results.push(result);
              if (results.length >= limit)
                return results;
            }
          } else if (options?.keys) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var objResults = new KeysResult(options.keys.length);
              for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
                var target = getValue(obj, options.keys[keyI]);
                if (!target) {
                  objResults[keyI] = noTarget;
                  continue;
                }
                if (!isPrepared(target))
                  target = getPrepared(target);
                target._score = NEGATIVE_INFINITY;
                target._indexes.len = 0;
                objResults[keyI] = target;
              }
              objResults.obj = obj;
              objResults._score = NEGATIVE_INFINITY;
              results.push(objResults);
              if (results.length >= limit)
                return results;
            }
          } else {
            for (var i = 0; i < targets.length; i++) {
              var target = targets[i];
              if (target == NULL)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              target._score = NEGATIVE_INFINITY;
              target._indexes.len = 0;
              results.push(target);
              if (results.length >= limit)
                return results;
            }
          }
          return results;
        };
        var algorithm = (preparedSearch, prepared, allowSpaces = false, allowPartialMatch = false) => {
          if (allowSpaces === false && preparedSearch.containsSpace)
            return algorithmSpaces(preparedSearch, prepared, allowPartialMatch);
          var searchLower = preparedSearch._lower;
          var searchLowerCodes = preparedSearch.lowerCodes;
          var searchLowerCode = searchLowerCodes[0];
          var targetLowerCodes = prepared._targetLowerCodes;
          var searchLen = searchLowerCodes.length;
          var targetLen = targetLowerCodes.length;
          var searchI = 0;
          var targetI = 0;
          var matchesSimpleLen = 0;
          for (; ; ) {
            var isMatch = searchLowerCode === targetLowerCodes[targetI];
            if (isMatch) {
              matchesSimple[matchesSimpleLen++] = targetI;
              ++searchI;
              if (searchI === searchLen)
                break;
              searchLowerCode = searchLowerCodes[searchI];
            }
            ++targetI;
            if (targetI >= targetLen)
              return NULL;
          }
          var searchI = 0;
          var successStrict = false;
          var matchesStrictLen = 0;
          var nextBeginningIndexes = prepared._nextBeginningIndexes;
          if (nextBeginningIndexes === NULL)
            nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target);
          targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
          var backtrackCount = 0;
          if (targetI !== targetLen)
            for (; ; ) {
              if (targetI >= targetLen) {
                if (searchI <= 0)
                  break;
                ++backtrackCount;
                if (backtrackCount > 200)
                  break;
                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
          var substringIndex = searchLen <= 1 ? -1 : prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
          var isSubstring = !!~substringIndex;
          var isSubstringBeginning = !isSubstring ? false : substringIndex === 0 || prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
          if (isSubstring && !isSubstringBeginning) {
            for (var i = 0; i < nextBeginningIndexes.length; i = nextBeginningIndexes[i]) {
              if (i <= substringIndex)
                continue;
              for (var s = 0; s < searchLen; s++)
                if (searchLowerCodes[s] !== prepared._targetLowerCodes[i + s])
                  break;
              if (s === searchLen) {
                substringIndex = i;
                isSubstringBeginning = true;
                break;
              }
            }
          }
          var calculateScore = (matches) => {
            var score2 = 0;
            var extraMatchGroupCount = 0;
            for (var i2 = 1; i2 < searchLen; ++i2) {
              if (matches[i2] - matches[i2 - 1] !== 1) {
                score2 -= matches[i2];
                ++extraMatchGroupCount;
              }
            }
            var unmatchedDistance = matches[searchLen - 1] - matches[0] - (searchLen - 1);
            score2 -= (12 + unmatchedDistance) * extraMatchGroupCount;
            if (matches[0] !== 0)
              score2 -= matches[0] * matches[0] * 0.2;
            if (!successStrict) {
              score2 *= 1e3;
            } else {
              var uniqueBeginningIndexes = 1;
              for (var i2 = nextBeginningIndexes[0]; i2 < targetLen; i2 = nextBeginningIndexes[i2])
                ++uniqueBeginningIndexes;
              if (uniqueBeginningIndexes > 24)
                score2 *= (uniqueBeginningIndexes - 24) * 10;
            }
            score2 -= (targetLen - searchLen) / 2;
            if (isSubstring)
              score2 /= 1 + searchLen * searchLen * 1;
            if (isSubstringBeginning)
              score2 /= 1 + searchLen * searchLen * 1;
            score2 -= (targetLen - searchLen) / 2;
            return score2;
          };
          if (!successStrict) {
            if (isSubstring)
              for (var i = 0; i < searchLen; ++i)
                matchesSimple[i] = substringIndex + i;
            var matchesBest = matchesSimple;
            var score = calculateScore(matchesBest);
          } else {
            if (isSubstringBeginning) {
              for (var i = 0; i < searchLen; ++i)
                matchesSimple[i] = substringIndex + i;
              var matchesBest = matchesSimple;
              var score = calculateScore(matchesSimple);
            } else {
              var matchesBest = matchesStrict;
              var score = calculateScore(matchesStrict);
            }
          }
          prepared._score = score;
          for (var i = 0; i < searchLen; ++i)
            prepared._indexes[i] = matchesBest[i];
          prepared._indexes.len = searchLen;
          var result = new Result();
          result.target = prepared.target;
          result._score = prepared._score;
          result._indexes = prepared._indexes;
          return result;
        };
        var algorithmSpaces = (preparedSearch, target, allowPartialMatch) => {
          var seen_indexes = /* @__PURE__ */ new Set();
          var score = 0;
          var result = NULL;
          var first_seen_index_last_search = 0;
          var searches = preparedSearch.spaceSearches;
          var searchesLen = searches.length;
          var changeslen = 0;
          var resetNextBeginningIndexes = () => {
            for (var i3 = changeslen - 1; i3 >= 0; i3--)
              target._nextBeginningIndexes[nextBeginningIndexesChanges[i3 * 2 + 0]] = nextBeginningIndexesChanges[i3 * 2 + 1];
          };
          var hasAtLeast1Match = false;
          for (var i = 0; i < searchesLen; ++i) {
            allowPartialMatchScores[i] = NEGATIVE_INFINITY;
            var search = searches[i];
            result = algorithm(search, target);
            if (allowPartialMatch) {
              if (result === NULL)
                continue;
              hasAtLeast1Match = true;
            } else {
              if (result === NULL) {
                resetNextBeginningIndexes();
                return NULL;
              }
            }
            var isTheLastSearch = i === searchesLen - 1;
            if (!isTheLastSearch) {
              var indexes = result._indexes;
              var indexesIsConsecutiveSubstring = true;
              for (var i1 = 0; i1 < indexes.len - 1; i1++) {
                if (indexes[i1 + 1] - indexes[i1] !== 1) {
                  indexesIsConsecutiveSubstring = false;
                  break;
                }
              }
              if (indexesIsConsecutiveSubstring) {
                var newBeginningIndex = indexes[indexes.len - 1] + 1;
                var toReplace = target._nextBeginningIndexes[newBeginningIndex - 1];
                for (var i2 = newBeginningIndex - 1; i2 >= 0; i2--) {
                  if (toReplace !== target._nextBeginningIndexes[i2])
                    break;
                  target._nextBeginningIndexes[i2] = newBeginningIndex;
                  nextBeginningIndexesChanges[changeslen * 2 + 0] = i2;
                  nextBeginningIndexesChanges[changeslen * 2 + 1] = toReplace;
                  changeslen++;
                }
              }
            }
            score += result._score / searchesLen;
            allowPartialMatchScores[i] = result._score / searchesLen;
            if (result._indexes[0] < first_seen_index_last_search) {
              score -= (first_seen_index_last_search - result._indexes[0]) * 2;
            }
            first_seen_index_last_search = result._indexes[0];
            for (var j = 0; j < result._indexes.len; ++j)
              seen_indexes.add(result._indexes[j]);
          }
          if (allowPartialMatch && !hasAtLeast1Match)
            return NULL;
          resetNextBeginningIndexes();
          var allowSpacesResult = algorithm(
            preparedSearch,
            target,
            /*allowSpaces=*/
            true
          );
          if (allowSpacesResult !== NULL && allowSpacesResult._score > score) {
            if (allowPartialMatch) {
              for (var i = 0; i < searchesLen; ++i) {
                allowPartialMatchScores[i] = allowSpacesResult._score / searchesLen;
              }
            }
            return allowSpacesResult;
          }
          if (allowPartialMatch)
            result = target;
          result._score = score;
          var i = 0;
          for (var index of seen_indexes)
            result._indexes[i++] = index;
          result._indexes.len = i;
          return result;
        };
        var remove_accents = (str) => str.replace(RegExp("\\p{Script=Latin}+", "gu"), (match) => match.normalize("NFD")).replace(/[\u0300-\u036f]/g, "");
        var prepareLowerInfo = (str) => {
          str = remove_accents(str);
          var strLen = str.length;
          var lower = str.toLowerCase();
          var lowerCodes = [];
          var bitflags = 0;
          var containsSpace = false;
          for (var i = 0; i < strLen; ++i) {
            var lowerCode = lowerCodes[i] = lower.charCodeAt(i);
            if (lowerCode === 32) {
              containsSpace = true;
              continue;
            }
            var bit = lowerCode >= 97 && lowerCode <= 122 ? lowerCode - 97 : lowerCode >= 48 && lowerCode <= 57 ? 26 : lowerCode <= 127 ? 30 : 31;
            bitflags |= 1 << bit;
          }
          return {
            lowerCodes,
            bitflags,
            containsSpace,
            _lower: lower
          };
        };
        var prepareBeginningIndexes = (target) => {
          var targetLen = target.length;
          var beginningIndexes = [];
          var beginningIndexesLen = 0;
          var wasUpper = false;
          var wasAlphanum = false;
          for (var i = 0; i < targetLen; ++i) {
            var targetCode = target.charCodeAt(i);
            var isUpper = targetCode >= 65 && targetCode <= 90;
            var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
            var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
            wasUpper = isUpper;
            wasAlphanum = isAlphanum;
            if (isBeginning)
              beginningIndexes[beginningIndexesLen++] = i;
          }
          return beginningIndexes;
        };
        var prepareNextBeginningIndexes = (target) => {
          target = remove_accents(target);
          var targetLen = target.length;
          var beginningIndexes = prepareBeginningIndexes(target);
          var nextBeginningIndexes = [];
          var lastIsBeginning = beginningIndexes[0];
          var lastIsBeginningI = 0;
          for (var i = 0; i < targetLen; ++i) {
            if (lastIsBeginning > i) {
              nextBeginningIndexes[i] = lastIsBeginning;
            } else {
              lastIsBeginning = beginningIndexes[++lastIsBeginningI];
              nextBeginningIndexes[i] = lastIsBeginning === void 0 ? targetLen : lastIsBeginning;
            }
          }
          return nextBeginningIndexes;
        };
        var preparedCache = /* @__PURE__ */ new Map();
        var preparedSearchCache = /* @__PURE__ */ new Map();
        var matchesSimple = [];
        var matchesStrict = [];
        var nextBeginningIndexesChanges = [];
        var keysSpacesBestScores = [];
        var allowPartialMatchScores = [];
        var tmpTargets = [];
        var tmpResults = [];
        var getValue = (obj, prop) => {
          var tmp = obj[prop];
          if (tmp !== void 0)
            return tmp;
          if (typeof prop === "function")
            return prop(obj);
          var segs = prop;
          if (!Array.isArray(prop))
            segs = prop.split(".");
          var len = segs.length;
          var i = -1;
          while (obj && ++i < len)
            obj = obj[segs[i]];
          return obj;
        };
        var isPrepared = (x2) => {
          return typeof x2 === "object" && typeof x2._bitflags === "number";
        };
        var INFINITY = Infinity;
        var NEGATIVE_INFINITY = -INFINITY;
        var noResults = [];
        noResults.total = 0;
        var NULL = null;
        var noTarget = prepare("");
        var fastpriorityqueue = (r) => {
          var e = [], o = 0, a = {}, v2 = (r2) => {
            for (var a2 = 0, v3 = e[a2], c2 = 1; c2 < o; ) {
              var s = c2 + 1;
              a2 = c2, s < o && e[s]._score < e[c2]._score && (a2 = s), e[a2 - 1 >> 1] = e[a2], c2 = 1 + (a2 << 1);
            }
            for (var f = a2 - 1 >> 1; a2 > 0 && v3._score < e[f]._score; f = (a2 = f) - 1 >> 1)
              e[a2] = e[f];
            e[a2] = v3;
          };
          return a.add = (r2) => {
            var a2 = o;
            e[o++] = r2;
            for (var v3 = a2 - 1 >> 1; a2 > 0 && r2._score < e[v3]._score; v3 = (a2 = v3) - 1 >> 1)
              e[a2] = e[v3];
            e[a2] = r2;
          }, a.poll = (r2) => {
            if (0 !== o) {
              var a2 = e[0];
              return e[0] = e[--o], v2(), a2;
            }
          }, a.peek = (r2) => {
            if (0 !== o)
              return e[0];
          }, a.replaceTop = (r2) => {
            e[0] = r2, v2();
          }, a;
        };
        var q3 = fastpriorityqueue();
        return {
          "single": single,
          "go": go,
          "prepare": prepare,
          "cleanup": cleanup
        };
      });
    }
  });

  // src/core/ui/components/AddonPage.tsx
  function InputAlert(props) {
    var [value, setValue] = React.useState("");
    var [error, setError] = React.useState("");
    var [isFetching, setIsFetching] = React.useState(false);
    function onConfirmWrapper() {
      setIsFetching(true);
      props.fetchFn(value).then(() => dismissAlert("AddonInputAlert")).catch((e) => e instanceof Error ? setError(e.message) : String(e)).finally(() => setIsFetching(false));
    }
    return /* @__PURE__ */ jsx(AlertModal, {
      title: props.label,
      content: "Type in the source URL you want to install from:",
      extraContent: /* @__PURE__ */ jsxs(Stack, {
        style: {
          marginTop: -12
        },
        children: [
          /* @__PURE__ */ jsx(TextInput, {
            autoFocus: true,
            isClearable: true,
            value,
            onChange: (v2) => {
              setValue(v2);
              if (error)
                setError("");
            },
            returnKeyType: "done",
            onSubmitEditing: onConfirmWrapper,
            state: error ? "error" : void 0,
            errorMessage: error || void 0
          }),
          /* @__PURE__ */ jsx(import_react_native18.ScrollView, {
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            style: {
              gap: 8
            },
            children: /* @__PURE__ */ jsx(Button, {
              size: "sm",
              variant: "tertiary",
              text: "Import from clipboard",
              icon: findAssetId("ClipboardListIcon"),
              onPress: () => clipboard.getString().then((str) => setValue(str))
            })
          })
        ]
      }),
      actions: /* @__PURE__ */ jsxs(Stack, {
        children: [
          /* @__PURE__ */ jsx(Button, {
            loading: isFetching,
            text: "Install",
            variant: "primary",
            disabled: !value || !isValidHttpUrl(value),
            onPress: onConfirmWrapper
          }),
          /* @__PURE__ */ jsx(AlertActionButton, {
            disabled: isFetching,
            text: "Cancel",
            variant: "secondary"
          })
        ]
      })
    });
  }
  function AddonPage({ CardComponent, ...props }) {
    var [search, setSearch] = React.useState("");
    var [sortFn, setSortFn] = React.useState(() => null);
    var { bottom: bottomInset } = useSafeAreaInsets();
    var navigation2 = NavigationNative.useNavigation();
    (0, import_react3.useEffect)(() => {
      if (props.OptionsActionSheetComponent) {
        navigation2.setOptions({
          headerRight: () => /* @__PURE__ */ jsx(IconButton, {
            size: "sm",
            variant: "secondary",
            icon: findAssetId("MoreHorizontalIcon"),
            onPress: () => showSheet("AddonMoreSheet", props.OptionsActionSheetComponent)
          })
        });
      }
    }, [
      navigation2
    ]);
    var results = (0, import_react3.useMemo)(() => {
      var values = props.items;
      if (props.resolveItem)
        values = values.map(props.resolveItem).filter(isNotNil);
      var items = values.filter((i) => isNotNil(i) && typeof i === "object");
      if (!search && sortFn)
        items.sort(sortFn);
      return import_fuzzysort.default.go(search, items, {
        keys: props.searchKeywords,
        all: true
      });
    }, [
      props.items,
      sortFn,
      search
    ]);
    var onInstallPress = (0, import_react3.useCallback)(() => {
      if (!props.installAction)
        return () => {
        };
      var { label, onPress, fetchFn } = props.installAction;
      if (fetchFn) {
        openAlert("AddonInputAlert", /* @__PURE__ */ jsx(InputAlert, {
          label: label ?? "Install",
          fetchFn
        }));
      } else {
        onPress?.();
      }
    }, []);
    if (results.length === 0 && !search) {
      return /* @__PURE__ */ jsxs(import_react_native18.View, {
        style: {
          gap: 32,
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center"
        },
        children: [
          /* @__PURE__ */ jsxs(import_react_native18.View, {
            style: {
              gap: 8,
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(import_react_native18.Image, {
                source: findAssetId("empty_quick_switcher")
              }),
              /* @__PURE__ */ jsx(Text, {
                variant: "text-lg/semibold",
                color: "text-default",
                children: "Oops! Nothing to see here\u2026 yet!"
              })
            ]
          }),
          /* @__PURE__ */ jsx(Button, {
            size: "lg",
            icon: findAssetId("DownloadIcon"),
            text: props.installAction?.label ?? "Install",
            onPress: onInstallPress
          })
        ]
      });
    }
    var headerElement = /* @__PURE__ */ jsxs(import_react_native18.View, {
      style: {
        paddingBottom: 8
      },
      children: [
        settings.safeMode?.enabled && /* @__PURE__ */ jsxs(import_react_native18.View, {
          style: {
            marginBottom: 10
          },
          children: [
            /* @__PURE__ */ jsx(HelpMessage, {
              messageType: 0,
              children: props.safeModeHint?.message
            }),
            props.safeModeHint?.footer
          ]
        }),
        /* @__PURE__ */ jsxs(import_react_native18.View, {
          style: {
            flexDirection: "row",
            gap: 8
          },
          children: [
            /* @__PURE__ */ jsx(Search_default, {
              style: {
                flexGrow: 1
              },
              isRound: !!props.sortOptions,
              onChangeText: (v2) => setSearch(v2)
            }),
            props.sortOptions && /* @__PURE__ */ jsx(IconButton, {
              icon: findAssetId("ArrowsUpDownIcon"),
              variant: "tertiary",
              disabled: !!search,
              onPress: () => showSimpleActionSheet({
                key: "AddonListSortOptions",
                header: {
                  title: "Sort Options",
                  onClose: () => hideActionSheet("AddonListSortOptions")
                },
                options: Object.entries(props.sortOptions).map(([name, fn]) => ({
                  label: name,
                  onPress: () => setSortFn(() => fn)
                }))
              })
            })
          ]
        }),
        props.ListHeaderComponent && /* @__PURE__ */ jsx(props.ListHeaderComponent, {})
      ]
    });
    return /* @__PURE__ */ jsxs(ErrorBoundary, {
      children: [
        /* @__PURE__ */ jsx(FlashList, {
          data: results,
          extraData: search,
          estimatedItemSize: 136,
          ListHeaderComponent: headerElement,
          ListEmptyComponent: () => /* @__PURE__ */ jsxs(import_react_native18.View, {
            style: {
              gap: 12,
              padding: 12,
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(import_react_native18.Image, {
                source: findAssetId("devices_not_found")
              }),
              /* @__PURE__ */ jsx(Text, {
                variant: "text-lg/semibold",
                color: "text-default",
                children: "Hmmm... could not find that!"
              })
            ]
          }),
          contentContainerStyle: {
            padding: 8,
            paddingHorizontal: 12,
            paddingBottom: 90
          },
          ItemSeparatorComponent: () => /* @__PURE__ */ jsx(import_react_native18.View, {
            style: {
              height: 8
            }
          }),
          ListFooterComponent: props.ListFooterComponent,
          renderItem: ({ item }) => /* @__PURE__ */ jsx(CardComponent, {
            item: item.obj,
            result: item
          })
        }),
        props.installAction && /* @__PURE__ */ jsx(FloatingActionButton, {
          positionBottom: bottomInset + 8,
          icon: findAssetId("PlusLargeIcon"),
          onPress: onInstallPress
        })
      ]
    });
  }
  var import_fuzzysort, import_react3, import_react_native18, showSimpleActionSheet, hideActionSheet;
  var init_AddonPage = __esm({
    "src/core/ui/components/AddonPage.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_assets();
      init_settings();
      init_alerts();
      init_sheets();
      init_isValidHttpUrl();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      init_components2();
      init_dist();
      import_fuzzysort = __toESM(require_fuzzysort());
      import_react3 = __toESM(require_react());
      import_react_native18 = __toESM(require_react_native());
      ({ showSimpleActionSheet, hideActionSheet } = lazyDestructure(() => findByProps("showSimpleActionSheet")));
    }
  });

  // src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts
  var usePluginCardStyles;
  var init_usePluginCardStyles = __esm({
    "src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_common();
      init_styles();
      usePluginCardStyles = createStyles({
        smallIcon: {
          tintColor: tokens.colors.LOGO_PRIMARY,
          height: 18,
          width: 18
        },
        badgeIcon: {
          tintColor: tokens.colors.LOGO_PRIMARY,
          height: 12,
          width: 12
        },
        badgesContainer: {
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 6,
          borderRadius: 6,
          padding: 4
        }
      });
    }
  });

  // src/core/vendetta/plugins.ts
  var plugins, pluginInstance, VdPluginManager;
  var init_plugins = __esm({
    "src/core/vendetta/plugins.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_storage();
      init_settings();
      init_utils();
      init_constants();
      init_logger();
      plugins = wrapSync(createStorage(createMMKVBackend("VENDETTA_PLUGINS")));
      pluginInstance = {};
      VdPluginManager = {
        plugins,
        pluginFetch(url2) {
          return _async_to_generator(function* () {
            if (url2.startsWith(VD_PROXY_PREFIX)) {
              url2 = url2.replace("https://bunny-mod.github.io/plugins-proxy", BUNNY_PROXY_PREFIX).replace(VD_PROXY_PREFIX, BUNNY_PROXY_PREFIX);
            }
            return yield safeFetch(url2, {
              cache: "no-store"
            });
          })();
        },
        fetchPlugin(id) {
          return _async_to_generator(function* () {
            if (!id.endsWith("/"))
              id += "/";
            var existingPlugin = plugins[id];
            var pluginManifest;
            try {
              pluginManifest = yield (yield this.pluginFetch(id + "manifest.json")).json();
            } catch (e) {
              throw new Error(`Failed to fetch manifest for ${id}`);
            }
            var pluginJs;
            if (existingPlugin?.manifest.hash !== pluginManifest.hash) {
              try {
                pluginJs = yield (yield this.pluginFetch(id + (pluginManifest.main || "index.js"))).text();
              } catch (e) {
              }
            }
            if (!pluginJs && !existingPlugin)
              throw new Error(`Failed to fetch JS for ${id}`);
            plugins[id] = {
              id,
              manifest: pluginManifest,
              enabled: existingPlugin?.enabled ?? false,
              update: existingPlugin?.update ?? true,
              js: pluginJs ?? existingPlugin.js
            };
          }).call(this);
        },
        installPlugin(id, enabled = true) {
          return _async_to_generator(function* () {
            if (!id.endsWith("/"))
              id += "/";
            if (typeof id !== "string" || id in plugins)
              throw new Error("Plugin already installed");
            yield this.fetchPlugin(id);
            if (enabled)
              yield this.startPlugin(id);
          }).call(this);
        },
        /**
         * @internal
         */
        evalPlugin(plugin) {
          return _async_to_generator(function* () {
            var vendettaForPlugins = {
              ...globalThis.vendetta,
              plugin: {
                id: plugin.id,
                manifest: plugin.manifest,
                // Wrapping this with wrapSync is NOT an option.
                storage: yield createStorage(createMMKVBackend(plugin.id))
              },
              logger: new LoggerClass(`Kettu \xBB ${plugin.manifest.name}`)
            };
            var pluginString = `vendetta=>{return ${plugin.js}}
//# sourceURL=${plugin.id}`;
            var raw = (0, eval)(pluginString)(vendettaForPlugins);
            var ret = typeof raw === "function" ? raw() : raw;
            return ret?.default ?? ret ?? {};
          })();
        },
        startPlugin(id) {
          return _async_to_generator(function* () {
            if (!id.endsWith("/"))
              id += "/";
            var plugin = plugins[id];
            if (plugin.id.includes("xxjust") == true || plugin.id.includes("DevNjay") == true) {
              return;
            }
            if (!plugin)
              throw new Error("Attempted to start non-existent plugin");
            try {
              if (!settings.safeMode?.enabled) {
                var pluginRet = yield this.evalPlugin(plugin);
                pluginInstance[id] = pluginRet;
                pluginRet.onLoad?.();
              }
              plugin.enabled = true;
            } catch (e) {
              logger.error(`Plugin ${plugin.id} errored whilst loading, and will be unloaded`, e);
              try {
                pluginInstance[plugin.id]?.onUnload?.();
              } catch (e2) {
                logger.error(`Plugin ${plugin.id} errored whilst unloading`, e2);
              }
              delete pluginInstance[id];
              plugin.enabled = false;
            }
          }).call(this);
        },
        stopPlugin(id, disable = true) {
          if (!id.endsWith("/"))
            id += "/";
          var plugin = plugins[id];
          var pluginRet = pluginInstance[id];
          if (!plugin)
            throw new Error("Attempted to stop non-existent plugin");
          if (!settings.safeMode?.enabled) {
            try {
              pluginRet?.onUnload?.();
            } catch (e) {
              logger.error(`Plugin ${plugin.id} errored whilst unloading`, e);
            }
            delete pluginInstance[id];
          }
          if (disable)
            plugin.enabled = false;
        },
        removePlugin(id) {
          return _async_to_generator(function* () {
            if (!id.endsWith("/"))
              id += "/";
            var plugin = plugins[id];
            if (plugin.enabled)
              this.stopPlugin(id);
            delete plugins[id];
            yield purgeStorage(id);
          }).call(this);
        },
        /**
         * @internal
         */
        initPlugins() {
          return _async_to_generator(function* () {
            yield awaitStorage(settings, plugins);
            var allIds = Object.keys(plugins);
            if (!settings.safeMode?.enabled) {
              allSettled(allIds.filter((pl) => plugins[pl].enabled).map((pl) => _async_to_generator(function* () {
                return plugins[pl].update && (yield this.fetchPlugin(pl).catch((e) => logger.error(e.message))), yield this.startPlugin(pl);
              }).call(this)));
              allIds.filter((pl) => !plugins[pl].enabled && plugins[pl].update).forEach((pl) => this.fetchPlugin(pl));
            }
            return () => this.stopAllPlugins();
          }).call(this);
        },
        stopAllPlugins() {
          return Object.keys(pluginInstance).forEach((p) => this.stopPlugin(p, false));
        },
        getSettings: (id) => pluginInstance[id]?.settings
      };
    }
  });

  // src/core/plugins/quickinstall/forumPost.tsx
  function useExtractThreadContent(thread, _firstMessage = null, actionSheet3 = false) {
    if (thread.guild_id !== KETTU_DISCORD_SERVER_ID)
      return;
    var postType;
    if (thread.parent_id === KETTU_PLUGINS_CHANNEL_ID) {
      postType = "Plugin";
    } else if (thread.parent_id === KETTU_THEMES_CHANNEL_ID && isThemeSupported()) {
      postType = "Theme";
    } else
      return;
    var { firstMessage } = actionSheet3 ? useFirstForumPostMessage(thread) : {
      firstMessage: _firstMessage
    };
    var urls = firstMessage?.content?.match(HTTP_REGEX_MULTI)?.filter(postMap[postType].urlsFilter);
    if (!urls || !urls[0])
      return;
    if (postType === "Plugin" && !urls[0].endsWith("/"))
      urls[0] += "/";
    return [
      postType,
      urls[0]
    ];
  }
  function useInstaller(thread, firstMessage = null, actionSheet3 = false) {
    var [postType, url2] = useExtractThreadContent(thread, firstMessage, actionSheet3) ?? [];
    useProxy(VdPluginManager.plugins);
    useProxy(themes);
    var [isInstalling, setIsInstalling] = React.useState(false);
    if (!postType || !url2)
      return [
        true
      ];
    var isInstalled = Boolean(postMap[postType].storage[url2]);
    var installOrRemove = () => _async_to_generator(function* () {
      setIsInstalling(true);
      try {
        yield postMap[postType].installOrRemove(url2);
      } catch (e) {
        showToast(e.message, findAssetId("Small"));
      } finally {
        setIsInstalling(false);
      }
    })();
    return [
      false,
      postType,
      isInstalled,
      isInstalling,
      installOrRemove
    ];
  }
  var useFirstForumPostMessage, forumReactions, postMap, installButtonPatch, forumPost_default;
  var init_forumPost = __esm({
    "src/core/plugins/quickinstall/forumPost.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_i18n();
      init_plugins();
      init_storage();
      init_themes();
      init_assets();
      init_loader();
      init_patcher();
      init_constants();
      init_lazy();
      init_components();
      init_wrappers();
      init_components2();
      init_toasts();
      ({ useFirstForumPostMessage } = lazyDestructure(() => findByProps("useFirstForumPostMessage")));
      forumReactions = findByPropsLazy("MostCommonForumPostReaction");
      postMap = {
        Plugin: {
          storage: VdPluginManager.plugins,
          urlsFilter: (url2) => url2.startsWith(VD_PROXY_PREFIX),
          installOrRemove: (url2) => {
            var isInstalled = postMap.Plugin.storage[url2];
            return isInstalled ? VdPluginManager.removePlugin(url2) : VdPluginManager.installPlugin(url2);
          }
        },
        Theme: {
          storage: themes,
          urlsFilter: (url2) => url2.endsWith(".json"),
          installOrRemove: (url2) => {
            var isInstalled = postMap.Theme.storage[url2];
            return isInstalled ? removeTheme(url2) : installTheme(url2);
          }
        }
      };
      installButtonPatch = () => after("MostCommonForumPostReaction", forumReactions, ([{ thread, firstMessage }], res) => {
        var [shouldReturn, _2, installed, loading, installOrRemove] = useInstaller(thread, firstMessage, true);
        if (shouldReturn)
          return;
        return /* @__PURE__ */ jsxs(Fragment, {
          children: [
            res,
            /* @__PURE__ */ jsx(ErrorBoundary, {
              children: /* @__PURE__ */ jsx(Button, {
                size: "sm",
                loading,
                disabled: loading,
                // variant={installed ? "destructive" : "primary"} crashes older version because "destructive" was renamed from "danger" and there's no sane way for compat check horror
                variant: installed ? "secondary" : "primary",
                text: installed ? Strings.UNINSTALL : Strings.INSTALL,
                onPress: installOrRemove,
                icon: findAssetId(installed ? "ic_message_delete" : "DownloadIcon"),
                style: {
                  marginLeft: 8
                }
              })
            })
          ]
        });
      });
      forumPost_default = () => {
        var patches3 = [
          // actionSheetPatch(),
          installButtonPatch()
        ];
        return () => patches3.map((p) => p());
      };
    }
  });

  // src/lib/ui/components/InputAlert.tsx
  function InputAlert2({ title, confirmText, confirmColor, onConfirm, cancelText, placeholder, initialValue = "", secureTextEntry }) {
    var [value, setValue] = React.useState(initialValue);
    var [error, setError] = React.useState("");
    function onConfirmWrapper() {
      var asyncOnConfirm = Promise.resolve(onConfirm(value));
      asyncOnConfirm.then(() => {
        Alerts.close();
      }).catch((e) => {
        setError(e.message);
      });
    }
    return /* @__PURE__ */ jsx(LegacyAlert, {
      title,
      confirmText,
      confirmColor,
      isConfirmButtonDisabled: error.length !== 0,
      onConfirm: onConfirmWrapper,
      cancelText,
      onCancel: () => Alerts.close(),
      children: /* @__PURE__ */ jsx(LegacyFormInput, {
        placeholder,
        value,
        onChange: (v2) => {
          setValue(typeof v2 === "string" ? v2 : v2.text);
          if (error)
            setError("");
        },
        returnKeyType: "done",
        onSubmitEditing: onConfirmWrapper,
        error: error || void 0,
        secureTextEntry,
        autoFocus: true,
        showBorder: true,
        style: {
          alignSelf: "stretch"
        }
      })
    });
  }
  var Alerts;
  var init_InputAlert = __esm({
    "src/lib/ui/components/InputAlert.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_components();
      init_wrappers();
      Alerts = findByPropsLazy("openLazy", "close");
    }
  });

  // src/core/vendetta/alerts.ts
  function showConfirmationAlert(options) {
    var internalOptions = options;
    internalOptions.body = options.content;
    delete internalOptions.content;
    internalOptions.isDismissable ??= true;
    return Alerts2.show(internalOptions);
  }
  var Alerts2, showCustomAlert, showInputAlert;
  var init_alerts2 = __esm({
    "src/core/vendetta/alerts.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_wrappers();
      init_InputAlert();
      Alerts2 = findByPropsLazy("openLazy", "close");
      showCustomAlert = (component, props) => Alerts2.openLazy({
        importer: () => _async_to_generator(function* () {
          return () => React.createElement(component, props);
        })()
      });
      showInputAlert = (options) => showCustomAlert(InputAlert2, options);
    }
  });

  // src/core/plugins/quickinstall/url.tsx
  function typeFromUrl(url2) {
    if (url2.startsWith(VD_PROXY_PREFIX)) {
      return "plugin";
    } else if (url2.endsWith(".json") && isThemeSupported()) {
      return "theme";
    }
  }
  function installWithToast(type, url2) {
    (type === "plugin" ? VdPluginManager.installPlugin.bind(VdPluginManager) : installTheme)(url2).then(() => {
      showToast(Strings.SUCCESSFULLY_INSTALLED, findAssetId("Check"));
    }).catch((e) => {
      showToast(e.message, findAssetId("Small"));
    });
  }
  var import_react_native19, showSimpleActionSheet2, handleClick, getChannelId, getChannel, url_default;
  var init_url = __esm({
    "src/core/plugins/quickinstall/url.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_i18n();
      init_alerts2();
      init_plugins();
      init_themes();
      init_assets();
      init_loader();
      init_patcher();
      init_constants();
      init_lazy();
      init_common();
      init_filters();
      init_finders();
      init_wrappers();
      init_toasts();
      import_react_native19 = __toESM(require_react_native());
      showSimpleActionSheet2 = findExports(byMutableProp("showSimpleActionSheet"));
      handleClick = findByPropsLazy("handleClick");
      ({ getChannelId } = lazyDestructure(() => channels));
      ({ getChannel } = lazyDestructure(() => findByProps("getChannel")));
      url_default = () => {
        var patches3 = new Array();
        patches3.push(after("showSimpleActionSheet", showSimpleActionSheet2, (args) => {
          if (args[0].key !== "LongPressUrl")
            return;
          var { header: { title: url2 }, options } = args[0];
          var urlType = typeFromUrl(url2);
          if (!urlType)
            return;
          options.push({
            label: Strings.INSTALL_ADDON,
            onPress: () => installWithToast(urlType, url2)
          });
        }));
        patches3.push(instead("handleClick", handleClick, function(args, orig) {
          return _async_to_generator(function* () {
            var { href: url2 } = args[0];
            var urlType = typeFromUrl(url2);
            if (!urlType)
              return orig.apply(this, args);
            if (urlType === "theme" && getChannel(getChannelId())?.parent_id !== VD_THEMES_CHANNEL_ID)
              return orig.apply(this, args);
            showConfirmationAlert({
              title: Strings.HOLD_UP,
              content: formatString("CONFIRMATION_LINK_IS_A_TYPE", {
                urlType
              }),
              onConfirm: () => installWithToast(urlType, url2),
              confirmText: Strings.INSTALL,
              cancelText: Strings.CANCEL,
              secondaryConfirmText: Strings.OPEN_IN_BROWSER,
              onConfirmSecondary: () => import_react_native19.Linking.openURL(url2)
            });
          }).call(this);
        }));
        return () => patches3.forEach((p) => p());
      };
    }
  });

  // src/core/plugins/quickinstall/index.ts
  var quickinstall_exports = {};
  __export(quickinstall_exports, {
    default: () => quickinstall_default
  });
  var patches, quickinstall_default;
  var init_quickinstall = __esm({
    "src/core/plugins/quickinstall/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_plugins2();
      init_forumPost();
      init_url();
      patches = [];
      quickinstall_default = defineCorePlugin({
        manifest: {
          id: "bunny.quickinstall",
          version: "1.0.0",
          type: "plugin",
          spec: 3,
          main: "",
          display: {
            name: "QuickInstall",
            description: "Quickly install Vendetta plugins and themes",
            authors: [
              {
                name: "Vendetta Team"
              }
            ]
          }
        },
        start() {
          patches = [
            forumPost_default(),
            url_default()
          ];
        },
        stop() {
          patches.forEach((p) => p());
        }
      });
    }
  });

  // src/lib/api/react/jsx.ts
  var jsx_exports = {};
  __export(jsx_exports, {
    deleteJsxCreate: () => deleteJsxCreate,
    onJsxCreate: () => onJsxCreate,
    patchJsx: () => patchJsx
  });
  function onJsxCreate(Component, callback) {
    if (!callbacks.has(Component))
      callbacks.set(Component, []);
    callbacks.get(Component).push(callback);
  }
  function deleteJsxCreate(Component, callback) {
    if (!callbacks.has(Component))
      return;
    var cbs = callbacks.get(Component);
    cbs.splice(cbs.indexOf(callback), 1);
    if (cbs.length === 0)
      callbacks.delete(Component);
  }
  function patchJsx() {
    var callback = ([Component], ret) => {
      if (typeof ret.type === "undefined") {
        ret.type = "RCTView";
        return ret;
      }
      if (typeof Component === "function" && callbacks.has(Component.name)) {
        var cbs = callbacks.get(Component.name);
        for (var cb of cbs) {
          var _ret = cb(Component, ret);
          if (_ret !== void 0)
            ret = _ret;
        }
        return ret;
      }
    };
    var patches3 = [
      after("jsx", jsxRuntime2, callback),
      after("jsxs", jsxRuntime2, callback)
    ];
    return () => patches3.forEach((unpatch) => unpatch());
  }
  var callbacks, jsxRuntime2;
  var init_jsx = __esm({
    "src/lib/api/react/jsx.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_patcher();
      init_metro();
      callbacks = /* @__PURE__ */ new Map();
      jsxRuntime2 = findByPropsLazy("jsx", "jsxs");
    }
  });

  // src/core/plugins/badges/index.tsx
  var badges_exports = {};
  __export(badges_exports, {
    default: () => badges_default
  });
  var import_react4, useBadgesModule, badges_default;
  var init_badges = __esm({
    "src/core/plugins/badges/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_patcher();
      init_jsx();
      init_metro();
      import_react4 = __toESM(require_react());
      init_plugins2();
      useBadgesModule = findByName("useBadges", false);
      badges_default = defineCorePlugin({
        manifest: {
          id: "bunny.badges",
          version: "1.1.0",
          type: "plugin",
          spec: 3,
          main: "",
          display: {
            name: "Badges",
            description: "Adds badges to user's profile",
            authors: [
              {
                name: "cocobo1"
              },
              {
                name: "pylixonly"
              }
            ]
          }
        },
        start() {
          var allBadges = null;
          var badgeProps = {};
          onJsxCreate("ProfileBadge", (component, ret) => {
            if (ret.props.id?.startsWith("bunny-")) {
              var cachedProps = badgeProps[ret.props.id];
              if (cachedProps) {
                ret.props.source = cachedProps.source;
                ret.props.label = cachedProps.label;
                ret.props.id = cachedProps.id;
              }
            }
          });
          onJsxCreate("RenderedBadge", (component, ret) => {
            if (ret.props.id?.startsWith("bunny-")) {
              var cachedProps = badgeProps[ret.props.id];
              if (cachedProps) {
                Object.assign(ret.props, cachedProps);
              }
            }
          });
          after("default", useBadgesModule, ([user], result) => {
            var [badges, setBadges] = (0, import_react4.useState)([]);
            (0, import_react4.useEffect)(() => {
              if (!user)
                return;
              if (!allBadges) {
                fetch("https://codeberg.org/raincord/badges/raw/branch/main/badges.json").then((r) => r.json()).then((data) => {
                  allBadges = data;
                  setBadges(allBadges[user.userId] || []);
                });
              } else {
                setBadges(allBadges[user.userId] || []);
              }
            }, [
              user?.userId
            ]);
            if (user && badges.length > 0) {
              badges.forEach((badge, i) => {
                var badgeId = `bunny-${user.userId}-${i}`;
                badgeProps[badgeId] = {
                  id: badgeId,
                  source: {
                    uri: badge.url
                  },
                  label: badge.label,
                  userId: user.userId
                };
                result.push({
                  id: badgeId,
                  description: badge.label,
                  icon: " _"
                });
              });
            }
          });
        }
      });
    }
  });

  // src/core/plugins/notrack/index.ts
  var notrack_exports = {};
  __export(notrack_exports, {
    default: () => notrack_default
  });
  function patchNetwork() {
    var analyticsTest = /client-analytics\.braintreegateway\.com|discord\.com\/api\/v9\/(science|track)|app\.adjust\..*|.*\.ingest\.sentry\.io/;
    try {
      var unpatch = instead("send", XMLHttpRequest.prototype, function(args, orig) {
        if (this.__sentry_xhr__?.url && analyticsTest.test(this.__sentry_xhr__.url)) {
          return void 0;
        }
        return orig.apply(this, args);
      });
      return unpatch;
    } catch (e) {
      return () => false;
    }
  }
  function patchConsole() {
    var sentrified = {};
    try {
      Object.keys(console).forEach((key) => {
        var consoleFunc = console[key];
        if (consoleFunc) {
          sentrified[key] = consoleFunc;
          var originalFunc = consoleFunc.__sentry_original__;
          console[key] = originalFunc ?? consoleFunc;
        }
      });
    } catch (e) {
      logger.log("Failed to de-sentrify console functions!", e);
    }
    return () => {
      Object.keys(sentrified).forEach((key) => {
        if (sentrified[key]) {
          console[key] = sentrified[key];
        }
      });
    };
  }
  function patchMiscellaneous() {
    var miscPatches = [
      // Global analytics utilities
      AnalyticsUtils?.AnalyticsActionHandlers && noop("handleTrack", AnalyticsUtils.AnalyticsActionHandlers),
      AnalyticsUtils?.AnalyticsActionHandlers && noop("handleFingerprint", AnalyticsUtils.AnalyticsActionHandlers),
      // Super properties tracking
      SuperPropUtils && noop("track", SuperPropUtils),
      // Voice state metadata tracking
      VoiceStateUtils && noop("trackWithMetadata", VoiceStateUtils),
      // Crash reporter
      CrashReportUtils && noop("submitLiveCrashReport", CrashReportUtils),
      // Metrics
      MetricsUtils?._metrics && noop("push", MetricsUtils._metrics)
    ].filter(Boolean);
    return () => miscPatches.forEach((p) => p());
  }
  function patchSentry() {
    var sentryPatches = [];
    if (Sentry.initializer) {
      sentryPatches.push(noop("initSentry", Sentry.initializer));
    }
    if (Sentry.main && Sentry.main.addBreadcrumb) {
      sentryPatches.push(noop("addBreadcrumb", Sentry.main));
    }
    if (Sentry.client) {
      try {
        Sentry.client.getOptions().enabled = false;
        Sentry.client.close();
        if (Sentry.main) {
          if (Sentry.main.getStackTop) {
            Sentry.main.getStackTop().scope.clear();
          }
          if (Sentry.main.getScope) {
            Sentry.main.getScope().clear();
          }
        }
      } catch (e) {
      }
    }
    return () => {
      try {
        sentryPatches.forEach((p) => p());
        if (Sentry.client) {
          Sentry.client.getOptions().enabled = true;
          Sentry.client.open();
        }
      } catch (e) {
      }
    };
  }
  var patches2, AnalyticsUtils, SuperPropUtils, VoiceStateUtils, CrashReportUtils, MetricsUtils, sentryGlobal, sentryHub, sentryClient, Sentry, noop, notrack_default;
  var init_notrack = __esm({
    "src/core/plugins/notrack/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_plugins2();
      init_metro();
      init_patcher();
      init_logger();
      patches2 = [];
      AnalyticsUtils = findByProps("AnalyticsActionHandlers");
      SuperPropUtils = findByProps("encodeProperties", "track");
      VoiceStateUtils = findByProps("getVoiceStateMetadata");
      CrashReportUtils = findByProps("submitLiveCrashReport");
      MetricsUtils = findByProps("_metrics");
      sentryGlobal = globalThis.__SENTRY__;
      sentryHub = sentryGlobal?.hub;
      sentryClient = sentryHub?.getClient();
      Sentry = {
        initializer: findByProps("initSentry"),
        main: sentryHub,
        client: sentryClient
      };
      noop = (prop, parent) => {
        try {
          return instead(prop, parent, () => void 0);
        } catch (e) {
          return () => false;
        }
      };
      notrack_default = defineCorePlugin({
        manifest: {
          id: "bunny.notrack",
          version: "1.0.0",
          type: "plugin",
          spec: 3,
          main: "",
          display: {
            name: "NoTrack",
            description: "Disables Discord's telemetry",
            authors: [
              {
                name: "maisymoe"
              }
            ]
          }
        },
        start() {
          patches2 = [
            patchNetwork(),
            patchConsole(),
            patchMiscellaneous(),
            patchSentry()
          ].filter(Boolean);
          logger.log("NoTrack: Enabled - all telemetry tracking disabled");
        },
        stop() {
          patches2.forEach((p) => p?.());
          patches2 = [];
          logger.log("NoTrack: Disabled - telemetry tracking restored");
        }
      });
    }
  });

  // src/core/plugins/messagefix/index.ts
  var messagefix_exports = {};
  __export(messagefix_exports, {
    default: () => messagefix_default
  });
  var MessageActions, originalSendMessage, messagefix_default;
  var init_messagefix = __esm({
    "src/core/plugins/messagefix/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_plugins2();
      init_metro();
      init_logger();
      MessageActions = findByProps("sendMessage");
      messagefix_default = defineCorePlugin({
        manifest: {
          id: "bunny.messagefix",
          version: "1.0.0",
          type: "plugin",
          spec: 3,
          main: "",
          display: {
            name: "MessageFix",
            description: "Ensures messages include the required nonce parameter",
            authors: [
              {
                name: "Win8.1VMUser"
              },
              {
                name: "kmmiio99o.dev"
              }
            ]
          }
        },
        start() {
          originalSendMessage = MessageActions.sendMessage;
          MessageActions.sendMessage = function(channelId, message, replyRef, options) {
            options = options || {};
            options.nonce = options.nonce || (BigInt(Date.now() - 14200704e5) << 22n).toString();
            return originalSendMessage.call(this, channelId, message, replyRef, options);
          };
          logger.log("MessageFix: Enabled - adding nonce to all messages");
        },
        stop() {
          if (originalSendMessage)
            MessageActions.sendMessage = originalSendMessage;
          logger.log("MessageFix: Disabled");
        }
      });
    }
  });

  // src/core/plugins/index.ts
  function defineCorePlugin(instance) {
    instance[Symbol.for("bunny.core.plugin")] = true;
    return instance;
  }
  var getCorePlugins;
  var init_plugins2 = __esm({
    "src/core/plugins/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      getCorePlugins = () => ({
        "bunny.quickinstall": (init_quickinstall(), __toCommonJS(quickinstall_exports)),
        "bunny.badges": (init_badges(), __toCommonJS(badges_exports)),
        "bunny.notrack": (init_notrack(), __toCommonJS(notrack_exports)),
        "bunny.messagefix": (init_messagefix(), __toCommonJS(messagefix_exports))
      });
    }
  });

  // src/lib/api/commands/types.ts
  var ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType;
  var init_types = __esm({
    "src/lib/api/commands/types.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      ApplicationCommandInputType = /* @__PURE__ */ function(ApplicationCommandInputType2) {
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN"] = 0] = "BUILT_IN";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_TEXT"] = 1] = "BUILT_IN_TEXT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_INTEGRATION"] = 2] = "BUILT_IN_INTEGRATION";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BOT"] = 3] = "BOT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["PLACEHOLDER"] = 4] = "PLACEHOLDER";
        return ApplicationCommandInputType2;
      }({});
      ApplicationCommandOptionType = /* @__PURE__ */ function(ApplicationCommandOptionType2) {
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND"] = 1] = "SUB_COMMAND";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["STRING"] = 3] = "STRING";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["INTEGER"] = 4] = "INTEGER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["BOOLEAN"] = 5] = "BOOLEAN";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["USER"] = 6] = "USER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["CHANNEL"] = 7] = "CHANNEL";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ROLE"] = 8] = "ROLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["MENTIONABLE"] = 9] = "MENTIONABLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["NUMBER"] = 10] = "NUMBER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ATTACHMENT"] = 11] = "ATTACHMENT";
        return ApplicationCommandOptionType2;
      }({});
      ApplicationCommandType = /* @__PURE__ */ function(ApplicationCommandType2) {
        ApplicationCommandType2[ApplicationCommandType2["CHAT"] = 1] = "CHAT";
        ApplicationCommandType2[ApplicationCommandType2["USER"] = 2] = "USER";
        ApplicationCommandType2[ApplicationCommandType2["MESSAGE"] = 3] = "MESSAGE";
        return ApplicationCommandType2;
      }({});
    }
  });

  // src/core/commands/eval.ts
  var eval_exports = {};
  __export(eval_exports, {
    default: () => eval_default
  });
  function wrapInJSCodeblock(resString) {
    return "```js\n" + resString.replaceAll("`", "`" + ZERO_WIDTH_SPACE_CHARACTER) + "\n```";
  }
  var util, AsyncFunction, ZERO_WIDTH_SPACE_CHARACTER, eval_default;
  var init_eval = __esm({
    "src/core/commands/eval.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_i18n();
      init_types();
      init_settings();
      init_common();
      init_wrappers();
      util = findByPropsLazy("inspect");
      AsyncFunction = (() => _async_to_generator(function* () {
        return void 0;
      })()).constructor;
      ZERO_WIDTH_SPACE_CHARACTER = "\u200B";
      eval_default = () => ({
        name: "eval",
        description: Strings.COMMAND_EVAL_DESC,
        shouldHide: () => settings.enableEvalCommand === true,
        options: [
          {
            name: "code",
            type: ApplicationCommandOptionType.STRING,
            description: Strings.COMMAND_EVAL_OPT_CODE,
            required: true
          },
          {
            name: "async",
            type: ApplicationCommandOptionType.BOOLEAN,
            description: Strings.COMMAND_EVAL_OPT_ASYNC
          }
        ],
        execute(_0, _1) {
          return _async_to_generator(function* ([code, async], ctx) {
            try {
              var res = util.inspect(async?.value ? yield AsyncFunction(code.value)() : eval?.(code.value));
              var trimmedRes = res.length > 2e3 ? res.slice(0, 2e3) + "..." : res;
              messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(trimmedRes));
            } catch (err) {
              messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(err?.stack ?? err));
            }
          }).apply(this, arguments);
        }
      });
    }
  });

  // src/core/commands/debug.ts
  var debug_exports2 = {};
  __export(debug_exports2, {
    default: () => debug_default
  });
  var debug_default;
  var init_debug2 = __esm({
    "src/core/commands/debug.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_i18n();
      init_types();
      init_debug();
      init_common();
      debug_default = () => ({
        name: "debug",
        description: Strings.COMMAND_DEBUG_DESC,
        options: [
          {
            name: "ephemeral",
            type: ApplicationCommandOptionType.BOOLEAN,
            description: Strings.COMMAND_DEBUG_OPT_EPHEMERALLY
          }
        ],
        execute([ephemeral], ctx) {
          var info = getDebugInfo();
          var content = [
            "**Kettu Debug Info**",
            `> Kettu: ${info.bunny.version} (${info.bunny.loader.name} ${info.bunny.loader.version})`,
            `> Discord: ${info.discord.version} (${info.discord.build})`,
            `> React: ${info.react.version} (RN ${info.react.nativeVersion})`,
            `> Hermes: ${info.hermes.version} (bcv${info.hermes.bytecodeVersion})`,
            `> System: ${info.os.name} ${info.os.version} ${info.os.sdk ? `(SDK ${info.os.sdk})` : ""}`.trimEnd(),
            `> Device: ${info.device.model} (${info.device.codename})`
          ].join("\n");
          if (ephemeral?.value) {
            messageUtil.sendBotMessage(ctx.channel.id, content);
          } else {
            var fixNonce = (BigInt(Date.now() - 14200704e5) << 22n).toString();
            messageUtil.sendMessage(ctx.channel.id, {
              content
            }, void 0, {
              nonce: fixNonce
            });
          }
        }
      });
    }
  });

  // src/core/commands/plugins.ts
  var plugins_exports = {};
  __export(plugins_exports, {
    default: () => plugins_default
  });
  var plugins_default;
  var init_plugins3 = __esm({
    "src/core/commands/plugins.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_i18n();
      init_plugins();
      init_types();
      init_common();
      plugins_default = () => ({
        name: "plugins",
        description: Strings.COMMAND_PLUGINS_DESC,
        options: [
          {
            name: "ephemeral",
            displayName: "ephemeral",
            type: ApplicationCommandOptionType.BOOLEAN,
            description: Strings.COMMAND_DEBUG_OPT_EPHEMERALLY
          }
        ],
        execute([ephemeral], ctx) {
          var plugins2 = Object.values(VdPluginManager.plugins).filter(Boolean);
          plugins2.sort((a, b3) => a.manifest.name.localeCompare(b3.manifest.name));
          var enabled = plugins2.filter((p) => p.enabled).map((p) => p.manifest.name);
          var disabled = plugins2.filter((p) => !p.enabled).map((p) => p.manifest.name);
          var content = [
            `**Installed Plugins (${plugins2.length}):**`,
            ...enabled.length > 0 ? [
              `Enabled (${enabled.length}):`,
              "> " + enabled.join(", ")
            ] : [],
            ...disabled.length > 0 ? [
              `Disabled (${disabled.length}):`,
              "> " + disabled.join(", ")
            ] : []
          ].join("\n");
          if (ephemeral?.value) {
            messageUtil.sendBotMessage(ctx.channel.id, content);
          } else {
            var fixNonce = (BigInt(Date.now() - 14200704e5) << 22n).toString();
            messageUtil.sendMessage(ctx.channel.id, {
              content
            }, void 0, {
              nonce: fixNonce
            });
          }
        }
      });
    }
  });

  // src/lib/api/commands/index.ts
  var commands_exports = {};
  __export(commands_exports, {
    patchCommands: () => patchCommands,
    registerCommand: () => registerCommand
  });
  function patchCommands() {
    var unpatch = after("getBuiltInCommands", commands, ([type], res) => {
      return [
        ...res,
        ...commands2.filter((c2) => (type instanceof Array ? type.includes(c2.type) : type === c2.type) && c2.__bunny?.shouldHide?.() !== false)
      ];
    });
    [
      (init_eval(), __toCommonJS(eval_exports)),
      (init_debug2(), __toCommonJS(debug_exports2)),
      (init_plugins3(), __toCommonJS(plugins_exports))
    ].forEach((r) => registerCommand(r.default()));
    return () => {
      commands2 = [];
      unpatch();
    };
  }
  function registerCommand(command) {
    var builtInCommands;
    try {
      builtInCommands = commands.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
    } catch (e) {
      builtInCommands = commands.getBuiltInCommands(Object.values(ApplicationCommandType), true, false);
    }
    builtInCommands.sort((a, b3) => parseInt(b3.id) - parseInt(a.id));
    var lastCommand = builtInCommands[builtInCommands.length - 1];
    command.id = (parseInt(lastCommand.id, 10) - 1).toString();
    command.__bunny = {
      shouldHide: command.shouldHide
    };
    command.applicationId ??= "-1";
    command.type ??= ApplicationCommandType.CHAT;
    command.inputType = ApplicationCommandInputType.BUILT_IN;
    command.displayName ??= command.name;
    command.untranslatedName ??= command.name;
    command.displayDescription ??= command.description;
    command.untranslatedDescription ??= command.description;
    if (command.options)
      for (var opt of command.options) {
        opt.displayName ??= opt.name;
        opt.displayDescription ??= opt.description;
      }
    instead("execute", command, (args, orig) => {
      Promise.resolve(orig.apply(command, args)).then((ret) => {
        if (ret && typeof ret === "object") {
          messageUtil.sendMessage(args[1].channel.id, ret);
        }
      }).catch((err) => {
        logger.error("Failed to execute command", err);
      });
    });
    commands2.push(command);
    return () => commands2 = commands2.filter(({ id }) => id !== command.id);
  }
  var commands2;
  var init_commands = __esm({
    "src/lib/api/commands/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_types();
      init_patcher();
      init_logger();
      init_common();
      commands2 = [];
    }
  });

  // src/lib/api/flux/index.ts
  var flux_exports = {};
  __export(flux_exports, {
    dispatcher: () => dispatcher,
    injectFluxInterceptor: () => injectFluxInterceptor,
    intercept: () => intercept
  });
  function injectFluxInterceptor() {
    var cb = (payload) => {
      for (var intercept2 of intercepts) {
        var res = intercept2(payload);
        if (res == null) {
          continue;
        } else if (!res) {
          payload[blockedSym] = true;
        } else if (typeof res === "object") {
          Object.assign(payload, res);
          payload[modifiedSym] = true;
        }
      }
      return blockedSym in payload;
    };
    (dispatcher._interceptors ??= []).unshift(cb);
    return () => dispatcher._interceptors &&= dispatcher._interceptors.filter((v2) => v2 !== cb);
  }
  function intercept(cb) {
    intercepts.push(cb);
    return () => {
      intercepts = intercepts.filter((i) => i !== cb);
    };
  }
  var blockedSym, modifiedSym, dispatcher, intercepts;
  var init_flux = __esm({
    "src/lib/api/flux/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_common();
      blockedSym = Symbol.for("bunny.flux.blocked");
      modifiedSym = Symbol.for("bunny.flux.modified");
      dispatcher = FluxDispatcher;
      intercepts = [];
    }
  });

  // src/lib/api/native/index.ts
  var native_exports = {};
  __export(native_exports, {
    fs: () => fs_exports
  });
  var init_native = __esm({
    "src/lib/api/native/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_fs();
    }
  });

  // src/lib/api/react/index.ts
  var react_exports = {};
  __export(react_exports, {
    jsx: () => jsx_exports
  });
  var init_react = __esm({
    "src/lib/api/react/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsx();
    }
  });

  // src/lib/api/index.ts
  var api_exports = {};
  __export(api_exports, {
    assets: () => assets_exports,
    commands: () => commands_exports,
    debug: () => debug_exports,
    flux: () => flux_exports,
    native: () => native_exports,
    patcher: () => patcher_exports,
    react: () => react_exports,
    settings: () => settings_exports,
    storage: () => storage_exports
  });
  var init_api = __esm({
    "src/lib/api/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_assets();
      init_commands();
      init_debug();
      init_flux();
      init_native();
      init_patcher();
      init_react();
      init_settings();
      init_storage2();
    }
  });

  // src/lib/addons/plugins/api.ts
  function shimDisposableFn(unpatches, f) {
    var dummy = (...props) => {
      var up = f(...props);
      unpatches.push(up);
      return up;
    };
    for (var key in f)
      if (typeof f[key] === "function") {
        dummy[key] = shimDisposableFn(unpatches, f[key]);
      }
    return dummy;
  }
  function createBunnyPluginApi(id) {
    var disposers = new Array();
    var object = {
      ...globalThis.bunny,
      api: {
        ...globalThis.bunny.api,
        patcher: {
          before: shimDisposableFn(disposers, patcher_exports.before),
          after: shimDisposableFn(disposers, patcher_exports.after),
          instead: shimDisposableFn(disposers, patcher_exports.instead)
        },
        commands: {
          ...globalThis.bunny.api.commands,
          registerCommand: shimDisposableFn(disposers, registerCommand)
        },
        flux: {
          ...globalThis.bunny.api.flux,
          intercept: shimDisposableFn(disposers, globalThis.bunny.api.flux.intercept)
        }
      },
      // Added something in here? Make sure to also update BunnyPluginProperty in ./types
      plugin: {
        createStorage: () => createStorage2(`plugins/storage/${id}.json`),
        manifest: registeredPlugins.get(id),
        logger
      }
    };
    return {
      object,
      disposers
    };
  }
  var init_api2 = __esm({
    "src/lib/addons/plugins/api.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_api();
      init_commands();
      init_storage2();
      init_logger();
      init_plugins4();
    }
  });

  // src/lib/addons/plugins/index.ts
  var plugins_exports2 = {};
  __export(plugins_exports2, {
    apiObjects: () => apiObjects,
    corePluginInstances: () => corePluginInstances,
    deleteRepository: () => deleteRepository,
    disablePlugin: () => disablePlugin,
    enablePlugin: () => enablePlugin,
    getPluginSettingsComponent: () => getPluginSettingsComponent,
    initPlugins: () => initPlugins,
    installPlugin: () => installPlugin,
    isCorePlugin: () => isCorePlugin,
    isGreaterVersion: () => isGreaterVersion,
    isPluginEnabled: () => isPluginEnabled,
    isPluginInstalled: () => isPluginInstalled,
    pluginInstances: () => pluginInstances,
    pluginRepositories: () => pluginRepositories,
    pluginSettings: () => pluginSettings,
    refreshPlugin: () => refreshPlugin,
    registeredPlugins: () => registeredPlugins,
    startPlugin: () => startPlugin,
    stopPlugin: () => stopPlugin,
    uninstallPlugin: () => uninstallPlugin,
    updateAllRepository: () => updateAllRepository,
    updateAndWritePlugin: () => updateAndWritePlugin,
    updatePlugins: () => updatePlugins,
    updateRepository: () => updateRepository
  });
  function assert(condition, id, attempt) {
    if (!condition)
      throw new Error(`[${id}] Attempted to ${attempt}`);
  }
  function isGreaterVersion(v1, v2) {
    if (semver.gt(v1, v2))
      return true;
    var coerced = semver.coerce(v1);
    if (coerced == null)
      return false;
    return semver.prerelease(v1)?.includes("dev") && semver.eq(coerced, v2);
  }
  function isExternalPlugin(manifest) {
    return "parentRepository" in manifest;
  }
  function isCorePlugin(id) {
    return corePluginInstances.has(id);
  }
  function getPluginSettingsComponent(id) {
    var instance = pluginInstances.get(id);
    if (!instance)
      return null;
    if (instance.SettingsComponent)
      return instance.SettingsComponent;
    return null;
  }
  function isPluginInstalled(id) {
    return pluginSettings[id] != null;
  }
  function isPluginEnabled(id) {
    return Boolean(pluginSettings[id]?.enabled);
  }
  function updateAndWritePlugin(repoUrl, id, fetchScript) {
    return _async_to_generator(function* () {
      var manifest = yield fetchJSON(repoUrl, `builds/${id}/manifest.json`);
      manifest.parentRepository = repoUrl;
      if (fetchScript) {
        manifest.jsPath = `plugins/scripts/${id}.js`;
        var js = yield fetchJS(repoUrl, `builds/${id}/index.js`);
        yield writeFile(manifest.jsPath, js);
      }
      yield updateStorage(`plugins/manifests/${id}.json`, manifest);
      if (registeredPlugins.has(id)) {
        var existingManifest = registeredPlugins.get(id);
        return Object.assign(existingManifest, manifest);
      }
      return manifest;
    })();
  }
  function refreshPlugin(id, repoUrl) {
    return _async_to_generator(function* () {
      var manifest = registeredPlugins.get(id);
      assert(manifest, id, "refresh a non-registered plugin");
      assert(pluginInstances.get(id), id, "refresh a non-started plugin");
      stopPlugin(id);
      if (isExternalPlugin(manifest)) {
        manifest = yield updateAndWritePlugin(repoUrl ?? manifest.parentRepository, id, true);
      }
      registeredPlugins.delete(id);
      registeredPlugins.set(id, manifest);
      yield startPlugin(id);
    })();
  }
  function updateRepository(repoUrl) {
    return _async_to_generator(function* () {
      var repo = yield fetchJSON(repoUrl, "repo.json");
      var storedRepo = pluginRepositories[repoUrl];
      var updated = false;
      if (!storedRepo) {
        for (var id in repo) {
          if (corePluginInstances.has(id)) {
            throw new Error(`Plugins can't have the same ID as any of Bunny core plugin '${id}'`);
          }
        }
        updated = true;
        pluginRepositories[repoUrl] = repo;
      } else {
        for (var plugin in storedRepo)
          if (!repo[plugin]) {
            delete storedRepo[plugin];
          }
      }
      var pluginIds = Object.keys(repo).filter((id2) => !id2.startsWith("$"));
      yield Promise.all(pluginIds.map((pluginId) => _async_to_generator(function* () {
        if (!storedRepo || !storedRepo[pluginId] || repo[pluginId].alwaysFetch || isGreaterVersion(repo[pluginId].version, storedRepo[pluginId].version)) {
          updated = true;
          pluginRepositories[repoUrl][pluginId] = repo[pluginId];
          yield updateAndWritePlugin(repoUrl, pluginId, Boolean(storedRepo && pluginSettings[pluginId]));
        } else {
          var manifest2 = yield preloadStorageIfExists(`plugins/manifests/${pluginId}.json`);
          if (!manifest2) {
            yield updateAndWritePlugin(repoUrl, pluginId, Boolean(storedRepo && pluginSettings[pluginId]));
          }
        }
      })()));
      for (var id1 of pluginIds) {
        var manifest = getPreloadedStorage(`plugins/manifests/${id1}.json`);
        if (manifest === void 0)
          continue;
        var existing = registeredPlugins.get(id1);
        if (existing && !isGreaterVersion(manifest.version, existing.version)) {
          continue;
        }
        registeredPlugins.set(id1, manifest);
      }
      return updated;
    })();
  }
  function deleteRepository(repoUrl) {
    return _async_to_generator(function* () {
      assert(repoUrl !== OFFICIAL_PLUGINS_REPO_URL, repoUrl, "delete the official repository");
      assert(pluginRepositories[repoUrl], repoUrl, "delete a non-registered repository");
      var promQueues = [];
      for (var [id, manifest] of registeredPlugins) {
        if (!isExternalPlugin(manifest) || manifest.parentRepository !== repoUrl)
          continue;
        if (isPluginInstalled(id)) {
          promQueues.push(uninstallPlugin(id));
        }
        promQueues.push(purgeStorage2(`plugins/manifests/${id}.json`));
        registeredPlugins.delete(id);
      }
      delete pluginRepositories[repoUrl];
      yield Promise.all(promQueues);
      updateAllRepository();
    })();
  }
  function enablePlugin(id, start) {
    return _async_to_generator(function* () {
      assert(isPluginInstalled(id), id, "enable a non-installed plugin");
      if (start)
        yield startPlugin(id);
      pluginSettings[id].enabled = true;
    })();
  }
  function disablePlugin(id) {
    assert(isPluginInstalled(id), id, "disable a non-installed plugin");
    pluginInstances.has(id) && stopPlugin(id);
    pluginSettings[id].enabled = false;
  }
  function installPlugin(id, start) {
    return _async_to_generator(function* () {
      var manifest = registeredPlugins.get(id);
      assert(manifest, id, "install an non-registered plugin");
      assert(!isPluginInstalled(id), id, "install an already installed plugin");
      assert(isExternalPlugin(manifest), id, "install a core plugin");
      yield updateAndWritePlugin(manifest.parentRepository, id, true);
      pluginSettings[id] = {
        enabled: true
      };
      if (start)
        startPlugin(id);
    })();
  }
  function uninstallPlugin(id) {
    return _async_to_generator(function* () {
      var manifest = registeredPlugins.get(id);
      assert(manifest, id, "uninstall an unregistered plugin");
      assert(isPluginInstalled(id), id, "uninstall a non-installed plugin");
      assert(isExternalPlugin(manifest), id, "uninstall a core plugin");
      pluginInstances.has(id) && stopPlugin(id);
      delete pluginSettings[id];
      yield purgeStorage2(`plugins/storage/${id}.json`);
      yield removeFile(`plugins/scripts/${id}.js`);
    })();
  }
  function startPlugin(_0) {
    return _async_to_generator(function* (id, { throwIfDisabled = false, disableWhenThrown = true } = {}) {
      var manifest = registeredPlugins.get(id);
      assert(manifest, id, "start a non-registered plugin");
      assert(isPluginInstalled(id), id, "start a non-installed plugin");
      assert(!throwIfDisabled || pluginSettings[id]?.enabled, id, "start a disabled plugin");
      assert(!pluginInstances.has(id), id, "start an already started plugin");
      yield preloadStorageIfExists(`plugins/storage/${id}.json`);
      var pluginInstance2;
      if (isExternalPlugin(manifest)) {
        try {
          var iife = yield readFile(manifest.jsPath);
          var instantiator = globalEvalWithSourceUrl(`(bunny,definePlugin)=>{${iife};return plugin?.default ?? plugin;}`, `bunny-plugin/${id}-${manifest.version}`);
        } catch (error) {
          throw new Error("An error occured while parsing plugin's code, possibly a syntax error?", {
            cause: error
          });
        }
        try {
          var api = createBunnyPluginApi(id);
          pluginInstance2 = instantiator(api.object, (p) => {
            return Object.assign(p, {
              manifest
            });
          });
          if (!pluginInstance2)
            throw new Error(`Plugin '${id}' does not export a valid plugin instance`);
          apiObjects.set(id, api);
          pluginInstances.set(id, pluginInstance2);
        } catch (error) {
          throw new Error("An error occured while instantiating plugin's code", {
            cause: error
          });
        }
      } else {
        pluginInstance2 = corePluginInstances.get(id);
        assert(pluginInstance2, id, "start a non-existent core plugin");
        pluginInstances.set(id, pluginInstance2);
      }
      try {
        pluginInstance2.start?.();
        pluginSettings[id].enabled = true;
      } catch (error) {
        disableWhenThrown && disablePlugin(id);
        throw new Error("An error occured while starting the plugin", {
          cause: error
        });
      }
    }).apply(this, arguments);
  }
  function stopPlugin(id) {
    var instance = pluginInstances.get(id);
    assert(instance, id, "stop a non-started plugin");
    instance.stop?.();
    var obj = apiObjects.get(id);
    obj?.disposers.forEach((d) => d());
    pluginInstances.delete(id);
  }
  function updateAllRepository() {
    return _async_to_generator(function* () {
      try {
        yield updateRepository(OFFICIAL_PLUGINS_REPO_URL);
      } catch (error) {
        console.error("Failed to update official plugins repository", error);
      }
      yield allSettled(Object.keys(pluginRepositories).map((repo) => _async_to_generator(function* () {
        if (repo !== OFFICIAL_PLUGINS_REPO_URL) {
          yield updateRepository(repo);
        }
      })()));
    })();
  }
  function updatePlugins() {
    return _async_to_generator(function* () {
      yield awaitStorage2(pluginRepositories, pluginSettings);
      var corePlugins = getCorePlugins();
      for (var id in corePlugins) {
        var { default: instance, preenabled } = corePlugins[id];
        pluginSettings[id] ??= {
          enabled: preenabled ?? true
        };
        registeredPlugins.set(id, instance.manifest);
        corePluginInstances.set(id, instance);
      }
      updateAllRepository();
    })();
  }
  function initPlugins() {
    return _async_to_generator(function* () {
      yield awaitStorage2(pluginRepositories, pluginSettings);
      allSettled([
        ...registeredPlugins.keys()
      ].map((id) => _async_to_generator(function* () {
        if (isPluginEnabled(id)) {
          startPlugin(id);
        }
      })()));
    })();
  }
  var corePluginInstances, registeredPlugins, pluginInstances, apiObjects, pluginRepositories, pluginSettings, _fetch, fetchJS, fetchJSON;
  var init_plugins4 = __esm({
    "src/lib/addons/plugins/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_plugins2();
      init_fs();
      init_storage2();
      init_utils();
      init_constants();
      init_common();
      init_api2();
      corePluginInstances = /* @__PURE__ */ new Map();
      registeredPlugins = /* @__PURE__ */ new Map();
      pluginInstances = /* @__PURE__ */ new Map();
      apiObjects = /* @__PURE__ */ new Map();
      pluginRepositories = createStorage2("plugins/repositories.json");
      pluginSettings = createStorage2("plugins/settings.json");
      _fetch = (repoUrl, path) => safeFetch(new URL(path, repoUrl), {
        cache: "no-store"
      });
      fetchJS = (repoUrl, path) => _fetch(repoUrl, path).then((r) => r.text());
      fetchJSON = (repoUrl, path) => _fetch(repoUrl, path).then((r) => r.json());
    }
  });

  // src/core/ui/settings/pages/Plugins/components/PluginCard.tsx
  function getHighlightColor() {
    return (0, import_chroma_js4.default)(tokens.unsafe_rawColors.YELLOW_300).alpha(0.3).hex();
  }
  function Title() {
    var styles = usePluginCardStyles();
    var { plugin, result } = useCardContext();
    var highlightedNode = result[0].highlight((m2, i) => /* @__PURE__ */ jsx(Text, {
      style: {
        backgroundColor: getHighlightColor()
      },
      children: m2
    }, i));
    var icon = plugin.icon && findAssetId(plugin.icon);
    var textNode = /* @__PURE__ */ jsx(Text, {
      numberOfLines: 1,
      variant: "heading-lg/semibold",
      children: highlightedNode.length ? highlightedNode : plugin.name
    });
    return /* @__PURE__ */ jsxs(import_react_native20.View, {
      style: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
      },
      children: [
        icon && /* @__PURE__ */ jsx(import_react_native20.Image, {
          style: styles.smallIcon,
          source: icon
        }),
        textNode
      ]
    });
  }
  function Authors() {
    var { plugin, result } = useCardContext();
    var styles = usePluginCardStyles();
    if (!plugin.authors)
      return null;
    var highlightedNode = result[2].highlight((m2, i) => /* @__PURE__ */ jsx(Text, {
      style: {
        backgroundColor: getHighlightColor()
      },
      children: m2
    }, i));
    var badges = plugin.getBadges();
    var authorText = highlightedNode.length > 0 ? highlightedNode : plugin.authors.map((a) => a.name).join(", ");
    return /* @__PURE__ */ jsxs(import_react_native20.View, {
      style: {
        flexDirection: "row",
        flexWrap: "wrap",
        flexShrink: 1,
        gap: 4
      },
      children: [
        /* @__PURE__ */ jsxs(Text, {
          variant: "text-sm/semibold",
          color: "text-muted",
          children: [
            "by ",
            authorText
          ]
        }),
        badges.length > 0 && /* @__PURE__ */ jsx(import_react_native20.View, {
          style: styles.badgesContainer,
          children: badges.map((b3, i) => /* @__PURE__ */ jsx(import_react_native20.Image, {
            source: b3.source,
            style: styles.badgeIcon
          }, i))
        })
      ]
    });
  }
  function Description() {
    var { plugin, result } = useCardContext();
    var highlightedNode = result[1].highlight((m2, i) => /* @__PURE__ */ jsx(Text, {
      style: {
        backgroundColor: getHighlightColor()
      },
      children: m2
    }, i));
    return /* @__PURE__ */ jsx(Text, {
      variant: "text-md/medium",
      children: highlightedNode.length ? highlightedNode : plugin.description
    });
  }
  function PluginCard({ result, item: plugin }) {
    plugin.usePluginState();
    var [, forceUpdate] = React.useReducer(() => ({}), 0);
    var cardContextValue = (0, import_react5.useMemo)(() => ({
      plugin,
      result
    }), [
      plugin,
      result
    ]);
    var core = isCorePlugin(plugin.id);
    return /* @__PURE__ */ jsx(CardContext.Provider, {
      value: cardContextValue,
      children: /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsxs(Stack, {
          spacing: 16,
          children: [
            /* @__PURE__ */ jsxs(import_react_native20.View, {
              style: {
                flexDirection: "row",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsxs(import_react_native20.View, {
                  style: {
                    flexShrink: 1
                  },
                  children: [
                    /* @__PURE__ */ jsx(Title, {}),
                    /* @__PURE__ */ jsx(Authors, {})
                  ]
                }),
                /* @__PURE__ */ jsx(import_react_native20.View, {
                  children: /* @__PURE__ */ jsxs(Stack, {
                    spacing: 12,
                    direction: "horizontal",
                    children: [
                      /* @__PURE__ */ jsx(Actions, {}),
                      /* @__PURE__ */ jsx(import_react_native20.View, {
                        style: core ? {
                          opacity: 0.5
                        } : void 0,
                        children: /* @__PURE__ */ jsx(TableSwitch, {
                          value: core ? true : plugin.isEnabled(),
                          disabled: core,
                          onValueChange: (v2) => {
                            if (!core) {
                              plugin.toggle(v2);
                              forceUpdate();
                            }
                          }
                        })
                      })
                    ]
                  })
                })
              ]
            }),
            /* @__PURE__ */ jsx(Description, {})
          ]
        })
      })
    });
  }
  var import_chroma_js4, import_react5, import_react_native20, CardContext, useCardContext, Actions;
  var init_PluginCard = __esm({
    "src/core/ui/settings/pages/Plugins/components/PluginCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_usePluginCardStyles();
      init_assets();
      init_common();
      init_components();
      init_sheets();
      import_chroma_js4 = __toESM(require_chroma_js());
      import_react5 = __toESM(require_react());
      import_react_native20 = __toESM(require_react_native());
      init_plugins4();
      CardContext = /* @__PURE__ */ (0, import_react5.createContext)(null);
      useCardContext = () => (0, import_react5.useContext)(CardContext);
      Actions = () => {
        var { plugin } = useCardContext();
        var navigation2 = NavigationNative.useNavigation();
        return /* @__PURE__ */ jsxs(import_react_native20.View, {
          style: {
            flexDirection: "row",
            gap: 6
          },
          children: [
            /* @__PURE__ */ jsx(IconButton, {
              size: "sm",
              variant: "secondary",
              icon: findAssetId("WrenchIcon"),
              disabled: !plugin.getPluginSettingsComponent(),
              onPress: () => navigation2.push("PUPU_CUSTOM_PAGE", {
                title: plugin.name,
                render: plugin.getPluginSettingsComponent()
              })
            }),
            /* @__PURE__ */ jsx(IconButton, {
              size: "sm",
              variant: "secondary",
              icon: findAssetId("CircleInformationIcon-primary"),
              onPress: () => void showSheet("PluginInfoActionSheet", plugin.resolveSheetComponent(), {
                plugin,
                navigation: navigation2
              })
            })
          ]
        });
      };
    }
  });

  // src/metro/common/stores.ts
  var UserStore;
  var init_stores = __esm({
    "src/metro/common/stores.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_wrappers();
      UserStore = findByStoreNameLazy("UserStore");
    }
  });

  // src/core/ui/settings/pages/Plugins/sheets/TitleComponent.tsx
  function TitleComponent({ plugin }) {
    var users = FluxUtils.useStateFromStoresArray([
      UserStore
    ], () => {
      plugin.authors?.forEach((a) => a.id && maybeFetchUser(a.id));
      return plugin.authors?.map((a) => UserStore.getUser(a.id));
    });
    var { authors } = plugin;
    var authorTextNode = [];
    if (authors) {
      var _loop2 = function(author2) {
        authorTextNode.push(/* @__PURE__ */ jsx(Text, {
          onPress: () => showUserProfileActionSheet({
            userId: author2.id
          }),
          variant: "text-md/medium",
          children: author2.name
        }));
        authorTextNode.push(", ");
      };
      for (var author of authors)
        _loop2(author);
      authorTextNode.pop();
    }
    return /* @__PURE__ */ jsxs(import_react_native21.View, {
      style: {
        gap: 4
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native21.View, {
          children: /* @__PURE__ */ jsx(Text, {
            variant: "heading-xl/semibold",
            children: plugin.name
          })
        }),
        /* @__PURE__ */ jsx(import_react_native21.View, {
          style: {
            flexDirection: "row",
            flexShrink: 1
          },
          children: authors?.length && /* @__PURE__ */ jsxs(import_react_native21.View, {
            style: {
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              paddingVertical: 4,
              paddingHorizontal: 8,
              backgroundColor: "#00000016",
              borderRadius: 32
            },
            children: [
              users.length && /* @__PURE__ */ jsx(AvatarPile, {
                size: "xxsmall",
                names: plugin.authors?.map((a) => a.name),
                totalCount: plugin.authors?.length,
                children: users.map((a) => /* @__PURE__ */ jsx(Avatar, {
                  size: "xxsmall",
                  user: a
                }))
              }),
              /* @__PURE__ */ jsx(Text, {
                variant: "text-md/medium",
                children: authorTextNode
              })
            ]
          })
        })
      ]
    });
  }
  var import_react_native21, showUserProfileActionSheet, maybeFetchUser;
  var init_TitleComponent = __esm({
    "src/core/ui/settings/pages/Plugins/sheets/TitleComponent.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      init_stores();
      import_react_native21 = __toESM(require_react_native());
      showUserProfileActionSheet = findByNameLazy("showUserProfileActionSheet");
      ({ getUser: maybeFetchUser } = lazyDestructure(() => findByProps("getUser", "fetchProfile")));
    }
  });

  // src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx
  var PluginInfoActionSheet_exports = {};
  __export(PluginInfoActionSheet_exports, {
    default: () => PluginInfoActionSheet
  });
  function PluginInfoIconButton(props) {
    var { onPress } = props;
    props.onPress &&= () => {
      hideSheet("PluginInfoActionSheet");
      onPress?.();
    };
    return /* @__PURE__ */ jsx(IconButton, {
      ...props
    });
  }
  function PluginInfoActionSheet({ plugin, navigation: navigation2 }) {
    plugin.usePluginState();
    var [loading, setLoading] = (0, import_react6.useState)(false);
    var isVendettaPlugin = plugin.id.includes("/");
    var isCorePlugin2 = plugin.id.startsWith("bunny.") || plugin.id.startsWith("vendetta.");
    var copyPluginUrl = () => {
      var url2 = plugin.id;
      if (isVendettaPlugin) {
        url2 = plugin.id;
      } else {
        try {
          var pluginAny = plugin;
          var repoUrl = (
            //@ts-expect-error
            pluginAny._manifest?.parentRepository || //@ts-expect-error
            pluginAny.manifest?.parentRepository
          );
          url2 = repoUrl ? `${repoUrl}/builds/${plugin.id}` : plugin.id;
        } catch (e) {
          url2 = plugin.id;
        }
      }
      clipboard.setString(url2);
      showToast("Copied to clipboard!", findAssetId("toast_copy_link"));
    };
    var refetchPlugin = () => _async_to_generator(function* () {
      setLoading(true);
      try {
        if (isVendettaPlugin) {
          var vdPlugin = VdPluginManager.plugins[plugin.id];
          if (vdPlugin.enabled)
            VdPluginManager.stopPlugin(plugin.id, false);
          yield VdPluginManager.fetchPlugin(plugin.id);
          if (vdPlugin.enabled)
            yield VdPluginManager.startPlugin(plugin.id);
          showToast("Plugin refreshed successfully");
        } else {
          showToast("Plugin refreshed successfully");
        }
      } catch (e) {
        showToast("Failed to refresh plugin");
      } finally {
        setLoading(false);
      }
    })();
    var clearPluginData = () => {
      showConfirmationAlert({
        title: "Clear Data",
        content: "Are you sure you want to clear all data for this plugin? This action cannot be undone.",
        confirmText: "Clear",
        confirmColor: "red",
        cancelText: "Cancel",
        onConfirm: () => _async_to_generator(function* () {
          hideSheet("PluginInfoActionSheet");
          try {
            if (isVendettaPlugin) {
              var vdPlugin = VdPluginManager.plugins[plugin.id];
              if (vdPlugin.enabled)
                VdPluginManager.stopPlugin(plugin.id, false);
              yield purgeStorage(plugin.id);
              if (vdPlugin.enabled)
                yield VdPluginManager.startPlugin(plugin.id);
            } else {
              yield purgeStorage2(`plugins/storage/${plugin.id}.json`);
            }
            showToast("Plugin data cleared successfully");
          } catch (e) {
            showToast("Failed to clear plugin data");
          }
        })()
      });
    };
    var uninstallPluginHandler = () => {
      if (isCorePlugin2) {
        showToast("Core plugins cannot be uninstalled");
        return;
      }
      showConfirmationAlert({
        title: "Uninstall Plugin",
        content: "Are you sure you want to uninstall this plugin? This action cannot be undone.",
        confirmText: "Uninstall",
        confirmColor: "red",
        cancelText: "Cancel",
        onConfirm: () => _async_to_generator(function* () {
          hideSheet("PluginInfoActionSheet");
          try {
            if (isVendettaPlugin) {
              yield VdPluginManager.removePlugin(plugin.id);
            } else {
            }
            showToast("Plugin uninstalled successfully");
          } catch (e) {
            showToast(`Failed to uninstall plugin: ${e instanceof Error ? e.message : String(e)}`);
          }
        })()
      });
    };
    return /* @__PURE__ */ jsx(ActionSheet, {
      children: /* @__PURE__ */ jsxs(import_react_native22.ScrollView, {
        contentContainerStyle: {
          gap: 12,
          marginBottom: 12
        },
        children: [
          /* @__PURE__ */ jsx(import_react_native22.View, {
            style: {
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 24,
              justifyContent: "space-between",
              width: "100%"
            },
            children: /* @__PURE__ */ jsx(TitleComponent, {
              plugin
            })
          }),
          /* @__PURE__ */ jsxs(import_react_native22.View, {
            style: {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 22,
              paddingHorizontal: 4
            },
            children: [
              /* @__PURE__ */ jsx(PluginInfoIconButton, {
                label: "Configure",
                variant: "secondary",
                disabled: !plugin.getPluginSettingsComponent(),
                icon: findAssetId("WrenchIcon"),
                onPress: () => {
                  navigation2.push("PUPU_CUSTOM_PAGE", {
                    title: plugin.name,
                    render: plugin.getPluginSettingsComponent()
                  });
                }
              }),
              !isCorePlugin2 && /* @__PURE__ */ jsx(PluginInfoIconButton, {
                label: "Refetch",
                variant: "secondary",
                icon: findAssetId("RetryIcon"),
                onPress: refetchPlugin,
                disabled: loading
              }),
              !isCorePlugin2 && /* @__PURE__ */ jsx(PluginInfoIconButton, {
                label: "Copy URL",
                variant: "secondary",
                icon: findAssetId("LinkIcon"),
                onPress: copyPluginUrl
              }),
              /* @__PURE__ */ jsx(PluginInfoIconButton, {
                label: "Clear Data",
                variant: "secondary",
                icon: findAssetId("FileIcon"),
                onPress: clearPluginData
              }),
              !isCorePlugin2 && /* @__PURE__ */ jsx(PluginInfoIconButton, {
                label: "Uninstall",
                variant: "secondary",
                icon: findAssetId("TrashIcon"),
                onPress: uninstallPluginHandler
              })
            ]
          }),
          /* @__PURE__ */ jsxs(Card, {
            children: [
              /* @__PURE__ */ jsx(Text, {
                variant: "text-md/semibold",
                color: "text-primary",
                style: {
                  marginBottom: 4,
                  color: "text-strong"
                },
                children: "Description"
              }),
              /* @__PURE__ */ jsx(Text, {
                variant: "text-md/medium",
                children: plugin.description
              })
            ]
          })
        ]
      })
    });
  }
  var import_react6, import_react_native22;
  var init_PluginInfoActionSheet = __esm({
    "src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_sheets();
      init_components();
      init_common();
      init_toasts();
      init_alerts2();
      init_plugins();
      init_storage();
      init_storage2();
      init_assets();
      import_react6 = __toESM(require_react());
      import_react_native22 = __toESM(require_react_native());
      init_TitleComponent();
    }
  });

  // src/core/ui/settings/pages/Plugins/models/bunny.ts
  function unifyBunnyPlugin(manifest) {
    return {
      id: manifest.id,
      name: manifest.display.name,
      description: manifest.display.description,
      authors: manifest.display.authors,
      getBadges() {
        return [
          {
            source: {
              uri: kettu_default
            }
          }
        ];
      },
      isEnabled: () => isPluginEnabled(manifest.id),
      isInstalled: () => manifest.id in pluginSettings,
      usePluginState() {
        useObservable([
          pluginSettings
        ]);
      },
      toggle(start) {
        try {
          start ? enablePlugin(manifest.id, true) : disablePlugin(manifest.id);
        } catch (e) {
          console.error(e);
        }
      },
      resolveSheetComponent() {
        return Promise.resolve({
          default: (init_PluginInfoActionSheet(), __toCommonJS(PluginInfoActionSheet_exports)).default
        });
      },
      getPluginSettingsComponent() {
        return getPluginSettingsComponent(manifest.id);
      }
    };
  }
  var init_bunny = __esm({
    "src/core/ui/settings/pages/Plugins/models/bunny.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_settings3();
      init_plugins4();
      init_storage2();
    }
  });

  // src/core/ui/settings/pages/Plugins/models/vendetta.ts
  function unifyVdPlugin(vdPlugin) {
    return {
      id: vdPlugin.id,
      name: vdPlugin.manifest.name,
      description: vdPlugin.manifest.description,
      authors: vdPlugin.manifest.authors,
      icon: vdPlugin.manifest.vendetta?.icon,
      getBadges() {
        return [];
      },
      isEnabled: () => vdPlugin.enabled,
      isInstalled: () => Boolean(vdPlugin && VdPluginManager.plugins[vdPlugin.id]),
      usePluginState() {
        useProxy(VdPluginManager.plugins[vdPlugin.id]);
      },
      toggle(start) {
        start ? VdPluginManager.startPlugin(vdPlugin.id) : VdPluginManager.stopPlugin(vdPlugin.id);
      },
      resolveSheetComponent() {
        return Promise.resolve({
          default: (init_PluginInfoActionSheet(), __toCommonJS(PluginInfoActionSheet_exports)).default
        });
      },
      getPluginSettingsComponent() {
        return VdPluginManager.getSettings(vdPlugin.id);
      }
    };
  }
  var init_vendetta = __esm({
    "src/core/ui/settings/pages/Plugins/models/vendetta.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_plugins();
      init_storage();
    }
  });

  // src/core/ui/settings/pages/Plugins/index.tsx
  var Plugins_exports = {};
  __export(Plugins_exports, {
    default: () => Plugins
  });
  function PluginPage(props) {
    var items = props.useItems();
    return /* @__PURE__ */ jsx(AddonPage, {
      CardComponent: PluginCard,
      title: Strings.PLUGINS,
      searchKeywords: [
        "name",
        "description",
        (p) => p.authors?.map((a) => typeof a === "string" ? a : a.name).join() || ""
      ],
      sortOptions: {
        "Name (A-Z)": (a, b3) => a.name.localeCompare(b3.name),
        "Name (Z-A)": (a, b3) => b3.name.localeCompare(a.name)
      },
      safeModeHint: {
        message: Strings.SAFE_MODE_NOTICE_PLUGINS
      },
      items,
      ...props
    });
  }
  function Plugins() {
    useProxy(settings);
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(PluginPage, {
      useItems: () => {
        useProxy(VdPluginManager.plugins);
        useObservable([
          pluginSettings
        ]);
        var corePlugins = [
          ...registeredPlugins.values()
        ].filter((p) => isPluginInstalled(p.id) && isCorePlugin(p.id)).map(unifyBunnyPlugin);
        var vdPlugins = Object.values(VdPluginManager.plugins).map(unifyVdPlugin);
        var bnPlugins = [
          ...registeredPlugins.values()
        ].filter((p) => isPluginInstalled(p.id) && !isCorePlugin(p.id)).map(unifyBunnyPlugin);
        return [
          ...corePlugins,
          ...vdPlugins,
          ...bnPlugins
        ];
      },
      ListHeaderComponent: () => {
        var unproxiedPlugins = Object.values(VdPluginManager.plugins).filter((p) => !p.id.startsWith(VD_PROXY_PREFIX) && !p.id.startsWith(BUNNY_PROXY_PREFIX));
        if (!unproxiedPlugins.length)
          return null;
        return /* @__PURE__ */ jsx(import_react_native23.View, {
          style: {
            marginVertical: 12,
            marginHorizontal: 10
          },
          children: /* @__PURE__ */ jsx(Card, {
            border: "strong",
            children: /* @__PURE__ */ jsxs(import_react_native23.View, {
              style: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              },
              children: [
                /* @__PURE__ */ jsxs(import_react_native23.View, {
                  style: {
                    gap: 6,
                    flexShrink: 1
                  },
                  children: [
                    /* @__PURE__ */ jsx(Text, {
                      variant: "heading-md/bold",
                      children: "Unproxied Plugins Found"
                    }),
                    /* @__PURE__ */ jsx(Text, {
                      variant: "text-sm/medium",
                      color: "text-muted",
                      children: "Plugins installed from unproxied sources may run unverified code in this app without your awareness."
                    })
                  ]
                }),
                /* @__PURE__ */ jsx(import_react_native23.View, {
                  style: {
                    marginLeft: "auto"
                  },
                  children: /* @__PURE__ */ jsx(IconButton, {
                    size: "sm",
                    variant: "secondary",
                    icon: findAssetId("CircleInformationIcon-primary"),
                    style: {
                      marginLeft: 8
                    },
                    onPress: () => {
                      navigation2.push("PUPU_CUSTOM_PAGE", {
                        title: "Unproxied Plugins",
                        render: () => {
                          return /* @__PURE__ */ jsx(FlashList, {
                            data: unproxiedPlugins,
                            contentContainerStyle: {
                              padding: 8
                            },
                            ItemSeparatorComponent: () => /* @__PURE__ */ jsx(import_react_native23.View, {
                              style: {
                                height: 8
                              }
                            }),
                            renderItem: ({ item: p }) => /* @__PURE__ */ jsx(Card, {
                              children: /* @__PURE__ */ jsx(Text, {
                                variant: "heading-md/semibold",
                                children: p.id
                              })
                            })
                          });
                        }
                      });
                    }
                  })
                })
              ]
            })
          })
        });
      },
      installAction: {
        label: "Install a plugin",
        fetchFn: (url2) => _async_to_generator(function* () {
          if (!url2.startsWith(VD_PROXY_PREFIX) && !url2.startsWith(BUNNY_PROXY_PREFIX) && !settings.developerSettings) {
            openAlert2("bunny-plugin-unproxied-confirmation", /* @__PURE__ */ jsx(AlertModal3, {
              title: "Hold On!",
              content: "You're trying to install a plugin from an unproxied external source. This means you're trusting the creator to run their code in this app without your knowledge. Are you sure you want to continue?",
              extraContent: /* @__PURE__ */ jsx(Card, {
                children: /* @__PURE__ */ jsx(Text, {
                  variant: "text-md/bold",
                  children: url2
                })
              }),
              actions: /* @__PURE__ */ jsxs(AlertActions2, {
                children: [
                  /* @__PURE__ */ jsx(AlertActionButton3, {
                    text: "Continue",
                    variant: "primary",
                    onPress: () => {
                      VdPluginManager.installPlugin(url2).then(() => showToast(Strings.TOASTS_INSTALLED_PLUGIN, findAssetId("Check"))).catch((e) => openAlert2("bunny-plugin-install-failed", /* @__PURE__ */ jsx(AlertModal3, {
                        title: "Install Failed",
                        content: `Unable to install plugin from '${url2}':`,
                        extraContent: /* @__PURE__ */ jsx(Card, {
                          children: /* @__PURE__ */ jsx(Text, {
                            variant: "text-md/normal",
                            children: e instanceof Error ? e.message : String(e)
                          })
                        }),
                        actions: /* @__PURE__ */ jsx(AlertActionButton3, {
                          text: "Okay",
                          variant: "primary"
                        })
                      })));
                    }
                  }),
                  /* @__PURE__ */ jsx(AlertActionButton3, {
                    text: "Cancel",
                    variant: "secondary"
                  })
                ]
              })
            }));
          } else {
            return yield VdPluginManager.installPlugin(url2);
          }
        })()
      }
    });
  }
  var import_react_native23, openAlert2, AlertModal3, AlertActions2, AlertActionButton3;
  var init_Plugins = __esm({
    "src/core/ui/settings/pages/Plugins/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_PluginCard();
      init_plugins();
      init_storage();
      init_plugins4();
      init_assets();
      init_settings();
      init_storage2();
      init_toasts();
      init_constants();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      import_react_native23 = __toESM(require_react_native());
      init_bunny();
      init_vendetta();
      ({ openAlert: openAlert2 } = lazyDestructure(() => findByProps("openAlert", "dismissAlert")));
      ({ AlertModal: AlertModal3, AlertActions: AlertActions2, AlertActionButton: AlertActionButton3 } = lazyDestructure(() => findByProps("AlertModal", "AlertActions")));
    }
  });

  // src/core/ui/components/AddonCard.tsx
  function AddonCard(props) {
    var styles = useStyles3();
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(Stack, {
        spacing: 16,
        children: [
          /* @__PURE__ */ jsxs(import_react_native24.View, {
            style: {
              flexDirection: "row",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxs(import_react_native24.View, {
                style: styles.headerLeading,
                children: [
                  /* @__PURE__ */ jsx(Text, {
                    style: styles.headerLabel,
                    children: props.headerLabel
                  }),
                  props.headerSublabel && /* @__PURE__ */ jsx(Text, {
                    style: styles.headerSubtitle,
                    children: props.headerSublabel
                  })
                ]
              }),
              /* @__PURE__ */ jsxs(import_react_native24.View, {
                style: [
                  styles.headerTrailing,
                  {
                    marginLeft: "auto"
                  }
                ],
                children: [
                  /* @__PURE__ */ jsxs(import_react_native24.View, {
                    style: styles.actions,
                    children: [
                      props.overflowActions && /* @__PURE__ */ jsx(IconButton, {
                        onPress: () => showSimpleActionSheet3({
                          key: "CardOverflow",
                          header: {
                            title: props.overflowTitle,
                            icon: props.headerIcon && /* @__PURE__ */ jsx(LegacyFormRow.Icon, {
                              style: {
                                marginRight: 8
                              },
                              source: findAssetId(props.headerIcon)
                            }),
                            onClose: () => hideActionSheet2()
                          },
                          options: props.overflowActions?.map((i) => ({
                            ...i,
                            icon: findAssetId(i.icon)
                          }))
                        }),
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("CircleInformationIcon-primary")
                      }),
                      props.actions?.map(({ icon, onPress, disabled }) => /* @__PURE__ */ jsx(IconButton, {
                        onPress,
                        disabled,
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId(icon)
                      }))
                    ]
                  }),
                  props.toggleType && (props.toggleType === "switch" ? /* @__PURE__ */ jsx(FormSwitch, {
                    value: props.toggleValue(),
                    onValueChange: props.onToggleChange
                  }) : /* @__PURE__ */ jsx(import_react_native24.TouchableOpacity, {
                    onPress: () => {
                      props.onToggleChange?.(!props.toggleValue());
                    },
                    children: /* @__PURE__ */ jsx(FormRadio, {
                      selected: props.toggleValue()
                    })
                  }))
                ]
              })
            ]
          }),
          props.descriptionLabel && /* @__PURE__ */ jsx(Text, {
            variant: "text-md/medium",
            children: props.descriptionLabel
          })
        ]
      })
    });
  }
  var import_react_native24, hideActionSheet2, showSimpleActionSheet3, useStyles3;
  var init_AddonCard = __esm({
    "src/core/ui/components/AddonCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_assets();
      init_lazy();
      init_components();
      init_wrappers();
      init_color();
      init_styles();
      import_react_native24 = __toESM(require_react_native());
      ({ hideActionSheet: hideActionSheet2 } = lazyDestructure(() => findByProps("openLazy", "hideActionSheet")));
      ({ showSimpleActionSheet: showSimpleActionSheet3 } = lazyDestructure(() => findByProps("showSimpleActionSheet")));
      useStyles3 = createStyles({
        card: {
          backgroundColor: semanticColors?.CARD_SECONDARY_BG,
          borderRadius: 12,
          overflow: "hidden"
        },
        header: {
          padding: 0
        },
        headerLeading: {
          flexDirection: "column",
          justifyContent: "center",
          scale: 1.2
        },
        headerTrailing: {
          display: "flex",
          flexDirection: "row",
          gap: 15,
          alignItems: "center"
        },
        headerLabel: {
          ...TextStyleSheet["heading-md/semibold"],
          color: semanticColors.MOBILE_TEXT_HEADING_PRIMARY
        },
        headerSubtitle: {
          ...TextStyleSheet["text-md/semibold"],
          color: semanticColors.TEXT_MUTED
        },
        descriptionLabel: {
          ...TextStyleSheet["text-md/semibold"],
          color: semanticColors.TEXT_NORMAL
        },
        actions: {
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 5
        },
        iconStyle: {
          tintColor: semanticColors.INTERACTIVE_ICON_DEFAULT,
          opacity: 0.2,
          height: 64,
          width: 64,
          left: void 0,
          right: "30%",
          top: "-10%"
        }
      });
    }
  });

  // src/core/ui/settings/pages/Themes/sheets/ThemeInfoActionSheet.tsx
  var ThemeInfoActionSheet_exports = {};
  __export(ThemeInfoActionSheet_exports, {
    default: () => ThemeInfoActionSheet
  });
  function ThemeInfoIconButton(props) {
    var { onPress } = props;
    props.onPress &&= () => {
      hideSheet("ThemeInfoActionSheet");
      onPress?.();
    };
    return /* @__PURE__ */ jsx(IconButton, {
      ...props,
      label: props.label
    });
  }
  function TitleComponent2({ theme }) {
    var { authors } = theme.data;
    return /* @__PURE__ */ jsxs(import_react_native25.View, {
      style: {
        gap: 4
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native25.View, {
          children: /* @__PURE__ */ jsx(Text, {
            variant: "heading-xl/semibold",
            children: theme.data.name
          })
        }),
        /* @__PURE__ */ jsx(import_react_native25.View, {
          style: {
            flexDirection: "row",
            flexShrink: 1
          },
          children: authors && authors.length > 0 && /* @__PURE__ */ jsx(import_react_native25.TouchableOpacity, {
            style: {
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              paddingVertical: 4,
              paddingHorizontal: 8,
              backgroundColor: "#00000016",
              borderRadius: 32
            },
            disabled: !authors.some((a) => a.id),
            children: /* @__PURE__ */ jsxs(Text, {
              variant: "text-md/medium",
              children: [
                "by ",
                authors.map((a) => a.name).join(", ")
              ]
            })
          })
        })
      ]
    });
  }
  function ThemeInfoActionSheet({ theme, navigation: navigation2 }) {
    var [themeState, setThemeState] = (0, import_react7.useState)({
      ...theme
    });
    var [loading, setLoading] = (0, import_react7.useState)(false);
    (0, import_react7.useEffect)(() => {
      var interval = setInterval(() => {
        setThemeState({
          ...theme
        });
      }, 500);
      return () => clearInterval(interval);
    }, [
      theme
    ]);
    var copyThemeUrl = () => {
      clipboard.setString(themeState.id);
      if (typeof showToast?.showCopyToClipboard === "function") {
        showToast.showCopyToClipboard();
      } else {
        showToast("Copied to clipboard");
      }
    };
    var refetchTheme = () => _async_to_generator(function* () {
      setLoading(true);
      try {
        yield fetchTheme(themeState.id, themeState.selected);
        showToast("Theme refreshed successfully");
      } catch (e) {
        console.error("Failed to refresh theme:", e);
        showToast("Failed to refresh theme");
      } finally {
        setLoading(false);
      }
    })();
    var removeThemeHandler = () => {
      showConfirmationAlert({
        title: Strings.HOLD_UP,
        content: formatString("ARE_YOU_SURE_TO_DELETE_THEME", {
          name: themeState.data.name
        }),
        confirmText: Strings.DELETE,
        cancelText: Strings.CANCEL,
        confirmColor: "red",
        onConfirm: () => _async_to_generator(function* () {
          hideSheet("ThemeInfoActionSheet");
          try {
            var wasSelected = yield removeTheme(themeState.id);
            if (wasSelected)
              selectTheme(null);
            showToast("Theme removed successfully");
          } catch (e) {
            console.error("Failed to remove theme:", e);
            showToast("Failed to remove theme");
          }
        })()
      });
    };
    var applyTheme = () => {
      try {
        selectTheme(themeState);
        hideSheet("ThemeInfoActionSheet");
        showToast(`Applied theme: ${themeState.data.name}`);
      } catch (e) {
        console.error("Failed to apply theme:", e);
        showToast("Failed to apply theme");
      }
    };
    return /* @__PURE__ */ jsx(ActionSheet, {
      children: /* @__PURE__ */ jsxs(import_react_native25.ScrollView, {
        contentContainerStyle: {
          gap: 12,
          marginBottom: 12
        },
        children: [
          /* @__PURE__ */ jsx(import_react_native25.View, {
            style: {
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 24,
              justifyContent: "space-between",
              width: "100%"
            },
            children: /* @__PURE__ */ jsx(TitleComponent2, {
              theme: themeState
            })
          }),
          /* @__PURE__ */ jsxs(import_react_native25.View, {
            style: {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 65,
              paddingHorizontal: 8
            },
            children: [
              /* @__PURE__ */ jsx(ThemeInfoIconButton, {
                label: Strings.REFETCH,
                variant: "secondary",
                icon: findAssetId("RetryIcon"),
                onPress: refetchTheme,
                disabled: loading
              }),
              /* @__PURE__ */ jsx(ThemeInfoIconButton, {
                label: Strings.COPY_URL,
                variant: "secondary",
                icon: findAssetId("LinkIcon"),
                onPress: copyThemeUrl
              }),
              /* @__PURE__ */ jsx(ThemeInfoIconButton, {
                label: Strings.UNINSTALL,
                variant: "secondary",
                icon: findAssetId("TrashIcon"),
                onPress: removeThemeHandler
              })
            ]
          }),
          /* @__PURE__ */ jsxs(Card, {
            children: [
              /* @__PURE__ */ jsx(Text, {
                variant: "text-md/semibold",
                style: {
                  marginBottom: 4,
                  color: semanticColors.MOBILE_TEXT_HEADING_PRIMARY
                },
                children: "Description"
              }),
              /* @__PURE__ */ jsx(Text, {
                variant: "text-md/medium",
                children: themeState.data.description || "No description provided."
              })
            ]
          })
        ]
      })
    });
  }
  var import_react7, import_react_native25;
  var init_ThemeInfoActionSheet = __esm({
    "src/core/ui/settings/pages/Themes/sheets/ThemeInfoActionSheet.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_assets();
      init_sheets();
      init_components();
      init_common();
      import_react7 = __toESM(require_react());
      import_react_native25 = __toESM(require_react_native());
      init_toasts();
      init_alerts2();
      init_themes();
      init_i18n();
      init_color();
    }
  });

  // src/core/ui/settings/pages/Themes/ThemeCard.tsx
  function ThemeCard({ item: theme }) {
    var navigation2 = NavigationNative.useNavigation();
    var [removed, setRemoved] = React2.useState(false);
    if (removed)
      return null;
    var { authors } = theme.data;
    return /* @__PURE__ */ jsx(AddonCard, {
      headerLabel: theme.data.name,
      headerSublabel: authors ? `by ${authors.map((i) => i.name).join(", ")}` : "",
      descriptionLabel: theme.data.description ?? "No description.",
      toggleType: !settings.safeMode?.enabled ? "radio" : void 0,
      toggleValue: () => themes[theme.id].selected,
      onToggleChange: (v2) => {
        try {
          selectTheme(v2 ? theme : null);
        } catch (e) {
          console.error("Error while selecting theme:", e);
        }
      },
      overflowTitle: theme.data.name,
      actions: [
        {
          icon: "CircleInformationIcon-primary",
          onPress: () => {
            var importPromise = Promise.resolve().then(() => (init_ThemeInfoActionSheet(), ThemeInfoActionSheet_exports));
            showSheet("ThemeInfoActionSheet", importPromise, {
              theme,
              navigation: navigation2
            });
          }
        }
      ]
    });
  }
  var init_ThemeCard = __esm({
    "src/core/ui/settings/pages/Themes/ThemeCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_AddonCard();
      init_themes();
      init_settings();
      init_sheets();
      init_common();
    }
  });

  // src/core/ui/settings/pages/Themes/index.tsx
  var Themes_exports = {};
  __export(Themes_exports, {
    default: () => Themes
  });
  function Themes() {
    useProxy(settings);
    useProxy(themes);
    return /* @__PURE__ */ jsx(AddonPage, {
      title: Strings.THEMES,
      searchKeywords: [
        "data.name",
        "data.description",
        (p) => p.data.authors?.map((a) => a.name).join(", ") ?? ""
      ],
      sortOptions: {
        "Name (A-Z)": (a, b3) => a.data.name.localeCompare(b3.data.name),
        "Name (Z-A)": (a, b3) => b3.data.name.localeCompare(a.data.name)
      },
      installAction: {
        label: "Install a theme",
        fetchFn: installTheme
      },
      items: Object.values(themes),
      safeModeHint: {
        message: formatString("SAFE_MODE_NOTICE_THEMES", {
          enabled: Boolean(settings.safeMode?.currentThemeId)
        }),
        footer: settings.safeMode?.currentThemeId && /* @__PURE__ */ jsx(Button, {
          size: "small",
          text: Strings.DISABLE_THEME,
          onPress: () => delete settings.safeMode?.currentThemeId,
          style: {
            marginTop: 8
          }
        })
      },
      CardComponent: ThemeCard,
      OptionsActionSheetComponent: () => {
        useObservable([
          colorsPref
        ]);
        return /* @__PURE__ */ jsxs(ActionSheet, {
          children: [
            /* @__PURE__ */ jsx(BottomSheetTitleHeader, {
              title: "Options"
            }),
            /* @__PURE__ */ jsxs(import_react_native26.View, {
              style: {
                paddingVertical: 20,
                gap: 12
              },
              children: [
                /* @__PURE__ */ jsxs(TableRowGroup, {
                  title: "Override Theme Type",
                  children: [
                    /* @__PURE__ */ jsx(TableCheckboxRow, {
                      label: "Auto",
                      icon: /* @__PURE__ */ jsx(TableRowIcon, {
                        source: findAssetId("RobotIcon")
                      }),
                      checked: !colorsPref.type,
                      onPress: () => {
                        if (!colorsPref.type) {
                          colorsPref.type = "dark";
                        }
                        getCurrentTheme()?.data && updateBunnyColor(getCurrentTheme().data, {
                          update: true
                        });
                      }
                    }),
                    /* @__PURE__ */ jsx(TableCheckboxRow, {
                      label: "Dark",
                      icon: /* @__PURE__ */ jsx(TableRowIcon, {
                        source: findAssetId("ThemeDarkIcon")
                      }),
                      checked: colorsPref.type === "dark",
                      onPress: () => {
                        colorsPref.type = colorsPref.type === "dark" ? void 0 : "dark";
                        getCurrentTheme()?.data && updateBunnyColor(getCurrentTheme().data, {
                          update: true
                        });
                      }
                    }),
                    /* @__PURE__ */ jsx(TableCheckboxRow, {
                      label: "Light",
                      icon: /* @__PURE__ */ jsx(TableRowIcon, {
                        source: findAssetId("ThemeLightIcon")
                      }),
                      checked: colorsPref.type === "light",
                      onPress: () => {
                        colorsPref.type = colorsPref.type === "light" ? void 0 : "light";
                        getCurrentTheme()?.data && updateBunnyColor(getCurrentTheme().data, {
                          update: true
                        });
                      }
                    })
                  ]
                }),
                /* @__PURE__ */ jsx(TableRowGroup, {
                  title: "Chat Background",
                  children: /* @__PURE__ */ jsx(TableCheckboxRow, {
                    label: "Show Background",
                    subLabel: "Enable or disable themes background on chat",
                    icon: /* @__PURE__ */ jsx(TableRowIcon, {
                      source: findAssetId("ImageIcon")
                    }),
                    checked: !colorsPref.customBackground,
                    onPress: () => {
                      colorsPref.customBackground = !colorsPref.customBackground ? "hidden" : null;
                    }
                  })
                })
              ]
            })
          ]
        });
      }
    });
  }
  var import_react_native26;
  var init_Themes = __esm({
    "src/core/ui/settings/pages/Themes/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_ThemeCard();
      init_storage();
      init_themes();
      init_preferences();
      init_updater();
      init_assets();
      init_settings();
      init_storage2();
      init_components();
      import_react_native26 = __toESM(require_react_native());
    }
  });

  // src/lib/addons/fonts/index.ts
  var fonts_exports = {};
  __export(fonts_exports, {
    fonts: () => fonts,
    installFont: () => installFont,
    removeFont: () => removeFont,
    saveFont: () => saveFont,
    selectFont: () => selectFont,
    updateFont: () => updateFont,
    updateFonts: () => updateFonts,
    validateFont: () => validateFont
  });
  function writeFont(font) {
    return _async_to_generator(function* () {
      if (!font && font !== null)
        throw new Error("Arg font must be a valid object or null");
      if (font) {
        yield writeFile("fonts.json", JSON.stringify(font));
      } else {
        yield removeFile("fonts.json");
      }
    })();
  }
  function validateFont(font) {
    if (!font || typeof font !== "object")
      throw new Error("URL returned a null/non-object JSON");
    if (typeof font.spec !== "number")
      throw new Error("Invalid font 'spec' number");
    if (font.spec !== 1)
      throw new Error("Only fonts which follows spec:1 are supported");
    var requiredFields = [
      "name",
      "main"
    ];
    if (requiredFields.some((f) => !font[f]))
      throw new Error(`Font is missing one of the fields: ${requiredFields}`);
    if (font.name.startsWith("__"))
      throw new Error("Font names cannot start with __");
    if (font.name in fonts)
      throw new Error(`There is already a font named '${font.name}' installed`);
  }
  function saveFont(data, selected = false) {
    return _async_to_generator(function* () {
      var fontDefJson;
      if (typeof data === "string") {
        try {
          fontDefJson = yield (yield safeFetch(data)).json();
        } catch (e) {
          throw new Error(`Failed to fetch fonts at ${data}`, {
            cause: e
          });
        }
      } else {
        fontDefJson = data;
      }
      validateFont(fontDefJson);
      var errors = yield allSettled(Object.entries(fontDefJson.main).map(([font, url2]) => _async_to_generator(function* () {
        var ext = url2.split(".").pop();
        if (ext !== "ttf" && ext !== "otf")
          ext = "ttf";
        var path = `downloads/fonts/${fontDefJson.name}/${font}.${ext}`;
        if (!(yield fileExists(path)))
          yield downloadFile(url2, path);
      })())).then((it) => it.map((it2) => it2.status === "fulfilled" ? void 0 : it2.reason));
      if (errors.some((it) => it))
        throw errors;
      fonts[fontDefJson.name] = fontDefJson;
      if (selected)
        writeFont(fonts[fontDefJson.name]);
      return fontDefJson;
    })();
  }
  function updateFont(fontDef) {
    return _async_to_generator(function* () {
      var fontDefCopy = {
        ...fontDef
      };
      if (fontDefCopy.source)
        fontDefCopy = {
          ...yield fetch(fontDefCopy.source).then((it) => it.json()),
          // Can't change these properties
          name: fontDef.name,
          source: fontDef.source
        };
      var selected = fonts.__selected === fontDef.name;
      yield removeFont(fontDef.name);
      yield saveFont(fontDefCopy, selected);
    })();
  }
  function installFont(url2, selected = false) {
    return _async_to_generator(function* () {
      var font = yield saveFont(url2);
      if (selected)
        yield selectFont(font.name);
    })();
  }
  function selectFont(name) {
    return _async_to_generator(function* () {
      if (name && !(name in fonts))
        throw new Error("Selected font does not exist!");
      if (name) {
        fonts.__selected = name;
      } else {
        delete fonts.__selected;
      }
      yield writeFont(name == null ? null : fonts[name]);
    })();
  }
  function removeFont(name) {
    return _async_to_generator(function* () {
      var selected = fonts.__selected === name;
      if (selected)
        yield selectFont(null);
      delete fonts[name];
      try {
        yield clearFolder(`downloads/fonts/${name}`);
      } catch (e) {
      }
    })();
  }
  function updateFonts() {
    return _async_to_generator(function* () {
      yield awaitStorage(fonts);
      allSettled(Object.keys(fonts).map((name) => saveFont(fonts[name], fonts.__selected === name)));
    })();
  }
  var fonts;
  var init_fonts = __esm({
    "src/lib/addons/fonts/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_storage();
      init_fs();
      init_utils();
      fonts = wrapSync(createStorage(createMMKVBackend("BUNNY_FONTS")));
    }
  });

  // src/core/ui/settings/pages/Fonts/FontEditor.tsx
  function promptDetachConfirmationForThen(fontName, cb) {
    if (fontName && fonts[fontName].source)
      openAlert3("revenge-fonts-detach-source-confirmation", /* @__PURE__ */ jsx(AlertModal4, {
        title: "Detach font pack URL?",
        content: "You need to detach the font pack URL from this font pack before you can manually edit its font entries. Do you want to detach the font pack URL?",
        actions: /* @__PURE__ */ jsxs(Stack, {
          children: [
            /* @__PURE__ */ jsx(AlertActionButton4, {
              text: "Detach",
              variant: "destructive",
              onPress: () => {
                delete fonts[fontName].source;
                cb();
              }
            }),
            /* @__PURE__ */ jsx(AlertActionButton4, {
              text: Strings.CANCEL,
              variant: "secondary"
            })
          ]
        })
      }));
    else
      cb();
  }
  function guessFontName(urls) {
    var fileNames = urls.map((url2) => {
      var { pathname } = new URL(url2);
      var fileName = pathname.replace(/\.[^/.]+$/, "");
      return fileName.split("/").pop();
    }).filter(Boolean);
    var shortest = fileNames.reduce((shortest2, name) => {
      return name.length < shortest2.length ? name : shortest2;
    }, fileNames[0] || "");
    return shortest?.replace(/-[A-Za-z]*$/, "") || null;
  }
  function RevengeFontsExtractor({ fonts: fonts2, setName }) {
    var currentTheme = getCurrentTheme().data;
    var themeFonts = currentTheme.fonts;
    var [fontName, setFontName] = (0, import_react8.useState)(guessFontName(Object.values(themeFonts)));
    var [error, setError] = (0, import_react8.useState)(void 0);
    return /* @__PURE__ */ jsxs(import_react_native27.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: Strings.FONT_NAME,
          value: fontName,
          placeholder: fontName || "Whitney",
          onChange: setFontName,
          errorMessage: error,
          state: error ? "error" : void 0
        }),
        /* @__PURE__ */ jsx(Text, {
          variant: "text-xs/normal",
          color: "text-muted",
          children: formatString("THEME_EXTRACTOR_DESC", {
            fonts: Object.keys(themeFonts).join(Strings.SEPARATOR)
          })
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: Strings.EXTRACT,
          disabled: !fontName,
          onPress: () => {
            if (!fontName)
              return;
            try {
              validateFont({
                spec: 1,
                name: fontName,
                main: themeFonts
              });
              setName(fontName);
              Object.assign(fonts2, themeFonts);
              actionSheet2.hideActionSheet();
            } catch (e) {
              setError(String(e));
            }
          }
        })
      ]
    });
  }
  function JsonFontImporter({ fonts: fonts2, setName, setSource }) {
    var [fontLink, setFontLink] = (0, import_react8.useState)("");
    var [saving, setSaving] = (0, import_react8.useState)(false);
    var [error, setError] = (0, import_react8.useState)(void 0);
    return /* @__PURE__ */ jsxs(import_react_native27.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: "Font Link",
          value: fontLink,
          placeholder: "https://link.to/font/pack.json",
          onChange: setFontLink,
          errorMessage: error,
          state: error ? "error" : void 0
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: "Import",
          disabled: !fontLink || saving,
          loading: saving,
          onPress: () => {
            setSaving(true);
            (() => _async_to_generator(function* () {
              var res = yield safeFetch(fontLink, {
                cache: "no-store"
              });
              var json = yield res.json();
              validateFont(json);
              setName(json.name);
              setSource(fontLink);
              Object.assign(fonts2, json.main);
            })())().then(() => actionSheet2.hideActionSheet()).catch((e) => setError(String(e))).finally(() => setSaving(false));
          }
        })
      ]
    });
  }
  function EntryEditorActionSheet(props) {
    var [familyName, setFamilyName] = (0, import_react8.useState)(props.name);
    var [fontUrl, setFontUrl] = (0, import_react8.useState)(props.fontEntries[props.name]);
    return /* @__PURE__ */ jsxs(import_react_native27.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: "Family Name (to override)",
          value: familyName,
          placeholder: "ggsans-Bold",
          onChange: setFamilyName
        }),
        /* @__PURE__ */ jsx(TextInput, {
          size: "md",
          label: "Font URL",
          value: fontUrl,
          placeholder: "https://link.to/the/font.ttf",
          onChange: setFontUrl
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: "Apply",
          onPress: () => {
            delete props.fontEntries[props.name];
            props.fontEntries[familyName] = fontUrl;
            props.onChange();
            actionSheet2.hideActionSheet();
          }
        })
      ]
    });
  }
  function promptActionSheet(Component, fontEntries, props) {
    actionSheet2.openLazy(Promise.resolve({
      default: () => /* @__PURE__ */ jsx(ErrorBoundary, {
        children: /* @__PURE__ */ jsxs(ActionSheet, {
          children: [
            /* @__PURE__ */ jsx(BottomSheetTitleHeader, {
              title: "Import Font"
            }),
            /* @__PURE__ */ jsx(Component, {
              fonts: fontEntries,
              ...props
            })
          ]
        })
      })
    }), "FontEditorActionSheet");
  }
  function NewEntryRow({ fontName, fontEntry }) {
    var nameRef = (0, import_react8.useRef)();
    var urlRef = (0, import_react8.useRef)();
    var [nameSet, setNameSet] = (0, import_react8.useState)(false);
    var [error, setError] = (0, import_react8.useState)();
    return /* @__PURE__ */ jsxs(import_react_native27.View, {
      style: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start"
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native27.View, {
          style: {
            flex: 1
          },
          children: /* @__PURE__ */ jsx(TextInput, {
            isRound: true,
            size: "md",
            label: nameSet ? nameRef.current : void 0,
            placeholder: nameSet ? "https://path.to/the/file.ttf" : "PostScript name (e.g. ggsans-Bold)",
            leadingIcon: () => nameSet ? null : /* @__PURE__ */ jsx(TableRow.Icon, {
              source: findAssetId("PlusSmallIcon")
            }),
            leadingText: nameSet ? nameRef.current : "",
            onChange: (text) => (nameSet ? urlRef : nameRef).current = text,
            errorMessage: error,
            state: error ? "error" : void 0
          })
        }),
        nameSet && /* @__PURE__ */ jsx(IconButton, {
          size: "md",
          variant: "secondary",
          onPress: () => {
            nameRef.current = "";
            setNameSet(false);
          },
          icon: findAssetId("TrashIcon")
        }),
        /* @__PURE__ */ jsx(IconButton, {
          size: "md",
          variant: "primary",
          onPress: () => promptDetachConfirmationForThen(fontName, () => {
            if (!nameSet && nameRef.current) {
              setNameSet(true);
            } else if (nameSet && nameRef.current && urlRef.current) {
              try {
                var parsedUrl = new URL(urlRef.current);
                if (!parsedUrl.protocol || !parsedUrl.host) {
                  throw "Invalid URL";
                }
                fontEntry[nameRef.current] = urlRef.current;
                nameRef.current = void 0;
                urlRef.current = void 0;
                setNameSet(false);
              } catch (e) {
                setError(String(e));
              }
            }
          }),
          icon: findAssetId(nameSet ? "PlusSmallIcon" : "ArrowLargeRightIcon")
        })
      ]
    });
  }
  function FontEditor(props) {
    var [name, setName] = (0, import_react8.useState)(props.name);
    var [source, setSource] = (0, import_react8.useState)(props.name && fonts[props.name].source);
    var [importing, setIsImporting] = (0, import_react8.useState)(false);
    var [errors, setErrors] = (0, import_react8.useState)();
    var memoEntry = (0, import_react8.useMemo)(() => {
      return createProxy(props.name ? {
        ...fonts[props.name].main
      } : {}).proxy;
    }, [
      props.name
    ]);
    var fontEntries = useProxy(memoEntry);
    var navigation2 = NavigationNative.useNavigation();
    var [, forceUpdate] = React.useReducer(() => ({}), 0);
    return /* @__PURE__ */ jsx(import_react_native27.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 12,
        children: [
          !props.name ? /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Import",
            children: [
              getCurrentTheme()?.data?.fonts && /* @__PURE__ */ jsx(TableRow, {
                label: Strings.LABEL_EXTRACT_FONTS_FROM_THEME,
                subLabel: Strings.DESC_EXTRACT_FONTS_FROM_THEME,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("HammerIcon")
                }),
                onPress: () => promptActionSheet(RevengeFontsExtractor, fontEntries, {
                  setName
                })
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: "Import font entries from a link",
                subLabel: "Directly import from a link with a pre-configured JSON file",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("LinkIcon")
                }),
                onPress: () => promptActionSheet(JsonFontImporter, fontEntries, {
                  setName,
                  setSource
                })
              })
            ]
          }) : /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Actions",
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: "Refetch fonts from source",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("RetryIcon")
                }),
                onPress: () => _async_to_generator(function* () {
                  yield updateFont(fonts[props.name]);
                  navigation2.goBack();
                })()
              }),
              /* @__PURE__ */ jsx(TableRow, {
                variant: "danger",
                label: "Delete font pack",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  variant: "danger",
                  source: findAssetId("TrashIcon")
                }),
                onPress: () => removeFont(props.name).then(() => navigation2.goBack())
              })
            ]
          }),
          /* @__PURE__ */ jsx(TextInput, {
            size: "lg",
            value: name,
            label: Strings.FONT_NAME,
            placeholder: "Whitney",
            onChange: setName
          }),
          props.name && fonts[props.name].source && /* @__PURE__ */ jsx(TextInput, {
            size: "lg",
            value: source,
            label: "Font Pack URL",
            onChange: setSource
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Font Entries",
            children: [
              Object.entries(fontEntries).map(([name2, url2], index) => {
                var error = errors?.[index];
                return /* @__PURE__ */ jsx(TableRow, {
                  label: name2,
                  subLabel: error ? /* @__PURE__ */ jsx(Text, {
                    variant: "text-xs/medium",
                    color: "text-feedback-critical",
                    children: error.message
                  }) : url2,
                  trailing: /* @__PURE__ */ jsxs(Stack, {
                    spacing: 8,
                    direction: "horizontal",
                    children: [
                      /* @__PURE__ */ jsx(IconButton, {
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("PencilIcon"),
                        onPress: () => promptDetachConfirmationForThen(props.name, () => promptActionSheet(EntryEditorActionSheet, fontEntries, {
                          name: name2,
                          fontEntries,
                          onChange: () => {
                            setErrors(void 0);
                            forceUpdate();
                          }
                        }))
                      }),
                      /* @__PURE__ */ jsx(IconButton, {
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("TrashIcon"),
                        onPress: () => promptDetachConfirmationForThen(props.name, () => {
                          delete fontEntries[name2];
                          setErrors(void 0);
                        })
                      })
                    ]
                  })
                });
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: /* @__PURE__ */ jsx(NewEntryRow, {
                  fontName: props.name,
                  fontEntry: fontEntries
                })
              })
            ]
          }),
          errors && /* @__PURE__ */ jsx(Text, {
            variant: "text-sm/medium",
            color: "text-feedback-critical",
            children: "Some font entries cannot be imported. Please modify the entries and try again."
          }),
          /* @__PURE__ */ jsx(import_react_native27.View, {
            style: {
              flexDirection: "row",
              justifyContent: "flex-end",
              bottom: 0,
              left: 0
            },
            children: /* @__PURE__ */ jsx(Button, {
              size: "lg",
              loading: importing,
              disabled: importing || !name || Object.keys(fontEntries).length === 0,
              variant: "primary",
              text: props.name ? "Save" : "Import",
              onPress: () => _async_to_generator(function* () {
                if (!name)
                  return;
                setErrors(void 0);
                setIsImporting(true);
                if (!props.name) {
                  saveFont({
                    spec: 1,
                    name,
                    main: fontEntries,
                    source
                  }).then(() => navigation2.goBack()).catch((e) => setErrors(e)).finally(() => setIsImporting(false));
                } else {
                  Object.assign(fonts[props.name], {
                    name,
                    main: fontEntries
                  });
                  updateFont(fonts[props.name]).then(() => navigation2.goBack()).catch((e) => setErrors(e)).finally(() => setIsImporting(false));
                }
              })(),
              icon: findAssetId(props.name ? "toast_image_saved" : "DownloadIcon"),
              style: {
                marginLeft: 8
              }
            })
          })
        ]
      })
    });
  }
  var import_react8, import_react_native27, actionSheet2, openAlert3, AlertModal4, AlertActionButton4;
  var init_FontEditor = __esm({
    "src/core/ui/settings/pages/Fonts/FontEditor.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_i18n();
      init_storage();
      init_fonts();
      init_themes();
      init_assets();
      init_utils();
      init_lazy();
      init_common();
      init_components();
      init_wrappers();
      init_components2();
      import_react8 = __toESM(require_react());
      import_react_native27 = __toESM(require_react_native());
      actionSheet2 = findByPropsLazy("hideActionSheet");
      ({ openAlert: openAlert3 } = lazyDestructure(() => findByProps("openAlert", "dismissAlert")));
      ({ AlertModal: AlertModal4, AlertActionButton: AlertActionButton4 } = lazyDestructure(() => findByProps("AlertModal", "AlertActions")));
    }
  });

  // src/core/ui/settings/pages/Fonts/FontCard.tsx
  function FontCard({ item: font }) {
    useProxy(fonts);
    var navigation2 = NavigationNative.useNavigation();
    var selected = fonts.__selected === font.name;
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsx(Stack, {
        spacing: 16,
        children: /* @__PURE__ */ jsxs(import_react_native28.View, {
          style: {
            flexDirection: "row",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsx(import_react_native28.View, {
              children: /* @__PURE__ */ jsx(Text, {
                variant: "heading-lg/semibold",
                children: font.name
              })
            }),
            /* @__PURE__ */ jsx(import_react_native28.View, {
              style: {
                marginLeft: "auto"
              },
              children: /* @__PURE__ */ jsxs(Stack, {
                spacing: 12,
                direction: "horizontal",
                children: [
                  /* @__PURE__ */ jsx(IconButton, {
                    onPress: () => {
                      navigation2.push("BUNNY_CUSTOM_PAGE", {
                        title: "Edit Font",
                        render: () => /* @__PURE__ */ jsx(FontEditor, {
                          name: font.name
                        })
                      });
                    },
                    size: "sm",
                    variant: "secondary",
                    disabled: selected,
                    icon: findAssetId("WrenchIcon")
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    size: "sm",
                    variant: selected ? "secondary" : "primary",
                    text: selected ? "Unapply" : "Apply",
                    onPress: () => _async_to_generator(function* () {
                      yield selectFont(selected ? null : font.name);
                      showConfirmationAlert({
                        title: Strings.HOLD_UP,
                        content: "Reload Discord to apply changes?",
                        confirmText: Strings.RELOAD,
                        cancelText: Strings.CANCEL,
                        confirmColor: "red",
                        onConfirm: BundleUpdaterManager.reload
                      });
                    })()
                  })
                ]
              })
            })
          ]
        })
      })
    });
  }
  var import_react_native28, useToken2;
  var init_FontCard = __esm({
    "src/core/ui/settings/pages/Fonts/FontCard.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_i18n();
      init_alerts2();
      init_storage();
      init_fonts();
      init_assets();
      init_modules();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      import_react_native28 = __toESM(require_react_native());
      init_FontEditor();
      ({ useToken: useToken2 } = lazyDestructure(() => findByProps("useToken")));
    }
  });

  // src/core/ui/settings/pages/Fonts/index.tsx
  var Fonts_exports = {};
  __export(Fonts_exports, {
    default: () => Fonts
  });
  function Fonts() {
    useProxy(settings);
    useProxy(fonts);
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(AddonPage, {
      title: Strings.FONTS,
      searchKeywords: [
        "name",
        "description"
      ],
      sortOptions: {
        "Name (A-Z)": (a, b3) => a.name.localeCompare(b3.name),
        "Name (Z-A)": (a, b3) => b3.name.localeCompare(a.name)
      },
      items: Object.values(fonts),
      safeModeHint: {
        message: Strings.SAFE_MODE_NOTICE_FONTS
      },
      CardComponent: FontCard,
      installAction: {
        label: "Install a font",
        onPress: () => {
          navigation2.push("BUNNY_CUSTOM_PAGE", {
            title: "Import Font",
            render: () => /* @__PURE__ */ jsx(FontEditor, {})
          });
        }
      }
    });
  }
  var init_Fonts = __esm({
    "src/core/ui/settings/pages/Fonts/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_FontEditor();
      init_storage();
      init_fonts();
      init_settings();
      init_common();
      init_FontCard();
    }
  });

  // src/core/ui/settings/pages/PluginBrowser/index.tsx
  var PluginBrowser_exports = {};
  __export(PluginBrowser_exports, {
    default: () => BrowserPage
  });
  function normalizeIdFromInstallUrl(url2) {
    return url2.endsWith("/") ? url2 : url2 + "/";
  }
  function InstallButton({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    var normId = normalizeIdFromInstallUrl(addon.installUrl);
    var [installed, setInstalled] = React2.useState(() => isPluginMode ? Boolean(VdPluginManager.plugins[normId]) : Boolean(themes[addon.installUrl]));
    React2.useEffect(() => {
      setInstalled(isPluginMode ? Boolean(VdPluginManager.plugins[normId]) : Boolean(themes[addon.installUrl]));
    }, [
      addon.installUrl,
      setRefreshTick,
      isPluginMode
    ]);
    var installAddon = () => _async_to_generator(function* () {
      if (installing.has(normId))
        return;
      setInstalling((prev) => new Set(prev).add(normId));
      try {
        if (isPluginMode) {
          yield VdPluginManager.installPlugin(normId, true);
        } else {
          yield installTheme(addon.installUrl);
        }
        showToast(`Installed ${addon.name}`, findAssetId("CheckIcon"));
        setInstalled(true);
      } catch (e) {
        showToast(e instanceof Error ? e.message : String(e), findAssetId("CircleXIcon-primary"));
      } finally {
        setInstalling((prev) => {
          var s = new Set(prev);
          s.delete(normId);
          return s;
        });
        setRefreshTick((t) => t + 1);
      }
    })();
    var uninstallAddon = () => _async_to_generator(function* () {
      try {
        if (isPluginMode) {
          yield VdPluginManager.removePlugin(normId);
        } else {
          yield removeTheme(addon.installUrl);
        }
        showToast(`Uninstalled ${addon.name}`, findAssetId("TrashIcon"));
        setInstalled(false);
      } catch (e) {
        showToast(e instanceof Error ? e.message : String(e), findAssetId("CircleXIcon-primary"));
      } finally {
        setRefreshTick((t) => t + 1);
      }
    })();
    var promptInstall = () => {
      if (!isPluginMode)
        return installAddon();
      var plugin = addon;
      var needsWarn = plugin.status && plugin.status !== "working" || plugin.warningMessage && plugin.warningMessage.trim().length > 0;
      if (!needsWarn)
        return installAddon();
      var lines = [];
      if (plugin.status && plugin.status !== "working") {
        if (plugin.status === "broken")
          lines.push("This plugin is marked as broken, please be aware you may encounter issues");
        else if (plugin.status === "warning")
          lines.push("This plugin may have issues");
        else
          lines.push(`Status: ${plugin.status}`);
      }
      if (plugin.warningMessage)
        lines.push(plugin.warningMessage);
      openAlert("plugins-list-install-warning", /* @__PURE__ */ jsx(AlertModal, {
        title: "Warning!",
        content: "This plugin may not work as expected.",
        extraContent: /* @__PURE__ */ jsx(Text, {
          variant: "text-sm/normal",
          color: "text-muted",
          children: lines.join("\n\n")
        }),
        actions: /* @__PURE__ */ jsxs(AlertActions, {
          children: [
            /* @__PURE__ */ jsx(AlertActionButton2, {
              text: "Install Anyway",
              variant: "primary",
              onPress: () => {
                dismissAlert("plugins-list-install-warning");
                installAddon();
              }
            }),
            /* @__PURE__ */ jsx(AlertActionButton2, {
              text: "Cancel",
              variant: "secondary",
              onPress: () => dismissAlert("plugins-list-install-warning")
            })
          ]
        })
      }));
    };
    return /* @__PURE__ */ jsx(Button, {
      size: "sm",
      loading: installing.has(normId),
      text: !installed ? installing.has(normId) ? "Installing..." : "Install" : "Uninstall",
      disabled: installing.has(normId),
      onPress: !installed ? promptInstall : uninstallAddon,
      variant: !installed ? "primary" : "destructive",
      icon: findAssetId(!installed ? "DownloadIcon" : "TrashIcon")
    });
  }
  function TrailingButtons({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    var copyAddonLink = () => {
      clipboard.setString(addon.installUrl);
      showToast.showCopyToClipboard?.();
    };
    var copySourceUrl = () => {
      var plugin = addon;
      clipboard.setString(plugin.sourceUrl);
      showToast.showCopyToClipboard?.();
    };
    var openAddonMenu = () => {
      var actions = [
        {
          label: `Copy ${isPluginMode ? "Plugin" : "Theme"} Link`,
          icon: findAssetId("CopyIcon"),
          onPress: copyAddonLink
        }
      ];
      if (isPluginMode && addon.sourceUrl) {
        actions.push({
          label: "Copy Source URL",
          icon: findAssetId("CopyIcon"),
          onPress: copySourceUrl
        });
      }
      var sheetKey = `${isPluginMode ? "plugin" : "theme"}-menu`;
      showSheet(sheetKey, () => /* @__PURE__ */ jsx(ActionSheet, {
        children: /* @__PURE__ */ jsx(TableRowGroup, {
          title: `${isPluginMode ? "Plugin" : "Theme"} Info`,
          children: actions.map((action, index) => /* @__PURE__ */ jsx(TableRow, {
            label: action.label,
            icon: /* @__PURE__ */ jsx(TableRow.Icon, {
              source: action.icon
            }),
            onPress: () => {
              action.onPress();
              hideSheet(sheetKey);
            }
          }, index))
        })
      }));
    };
    return /* @__PURE__ */ jsxs(Stack, {
      spacing: 8,
      direction: "horizontal",
      children: [
        /* @__PURE__ */ jsx(IconButton, {
          size: "sm",
          onPress: openAddonMenu,
          variant: "secondary",
          icon: findAssetId("MoreHorizontalIcon")
        }),
        /* @__PURE__ */ jsx(InstallButton, {
          addon,
          isPluginMode,
          installing,
          setInstalling,
          setRefreshTick
        })
      ]
    });
  }
  function AddonCard2({ addon, isPluginMode, installing, setInstalling, setRefreshTick }) {
    var { name, description, authors } = addon;
    var plugin = addon;
    var statusColor = "text-normal";
    if (isPluginMode) {
      if (plugin.status === "working")
        statusColor = "#4ADE80";
      if (plugin.status === "broken")
        statusColor = "#EF4444";
      if (plugin.status === "warning")
        statusColor = "#F59E0B";
    }
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(Stack, {
        spacing: 16,
        children: [
          /* @__PURE__ */ jsxs(import_react_native29.View, {
            style: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxs(import_react_native29.View, {
                style: {
                  flexShrink: 1
                },
                children: [
                  /* @__PURE__ */ jsx(Text, {
                    numberOfLines: 1,
                    variant: "heading-lg/semibold",
                    children: name
                  }),
                  /* @__PURE__ */ jsxs(Text, {
                    variant: "text-md/semibold",
                    color: "text-muted",
                    children: [
                      "by ",
                      authors?.join(", ") || "Unknown"
                    ]
                  }),
                  isPluginMode && /* @__PURE__ */ jsxs(Text, {
                    variant: "text-md/semibold",
                    style: {
                      color: statusColor
                    },
                    children: [
                      "Status: ",
                      plugin.status
                    ]
                  })
                ]
              }),
              /* @__PURE__ */ jsx(import_react_native29.View, {
                children: /* @__PURE__ */ jsx(TrailingButtons, {
                  addon,
                  isPluginMode,
                  installing,
                  setInstalling,
                  setRefreshTick
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx(Text, {
            variant: "text-md/medium",
            children: description
          }),
          isPluginMode && plugin.warningMessage && /* @__PURE__ */ jsxs(Text, {
            variant: "text-sm/medium",
            color: "text-muted",
            children: [
              "Warning: ",
              plugin.warningMessage
            ]
          })
        ]
      })
    });
  }
  function BrowserPage() {
    var navigation2 = NavigationNative.useNavigation();
    var [mode, setMode] = React2.useState("plugins");
    var [plugins2, setPlugins] = React2.useState([]);
    var [themesList, setThemesList] = React2.useState([]);
    var [loading, setLoading] = React2.useState(true);
    var [error, setError] = React2.useState(null);
    var [searchQuery, setSearchQuery] = React2.useState("");
    var [installing, setInstalling] = React2.useState(/* @__PURE__ */ new Set());
    var [refreshTick, setRefreshTick] = React2.useState(0);
    var [sort, setSort] = React2.useState("Newest");
    React2.useEffect(() => {
      navigation2.setOptions({
        title: "Browser"
      });
    }, [
      navigation2
    ]);
    var fetchData = React2.useCallback((isPluginMode) => _async_to_generator(function* () {
      setLoading(true);
      setError(null);
      try {
        var url2 = isPluginMode ? PLUGIN_URL : THEME_URL;
        var response = yield safeFetch(url2);
        if (!response.ok)
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        var data = yield response.json();
        var addonList = [];
        if (Array.isArray(data)) {
          addonList = data;
        } else if (isPluginMode && data.OFFICIAL_PLUGINS) {
          addonList = data.OFFICIAL_PLUGINS;
        } else if (!isPluginMode) {
          addonList = data.OFFICIAL_THEMES || data.themes || data.THEMES || data.items || [];
        }
        if (isPluginMode) {
          setPlugins(addonList);
        } else {
          setThemesList(addonList);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        if (isPluginMode) {
          setPlugins([]);
        } else {
          setThemesList([]);
        }
      } finally {
        setLoading(false);
      }
    })(), []);
    var fetchPlugins = React2.useCallback(() => fetchData(true), [
      fetchData
    ]);
    var fetchThemes = React2.useCallback(() => fetchData(false), [
      fetchData
    ]);
    React2.useEffect(() => {
      fetchPlugins();
      fetchThemes();
    }, [
      fetchPlugins,
      fetchThemes
    ]);
    var filterList = (list) => {
      if (!list)
        return [];
      var q3 = searchQuery.toLowerCase();
      if (!q3)
        return list;
      return list.filter((p) => p.name.toLowerCase().includes(q3) || p.description.toLowerCase().includes(q3) || (p.authors || []).some((a) => a.toLowerCase().includes(q3)));
    };
    var sortedAndFiltered = React2.useMemo(() => {
      var list = filterList(mode === "plugins" ? plugins2 : themesList);
      var getStatusPriority = (status, sortBy) => {
        if (sortBy === "Working First") {
          return status === "working" || status === "warning" ? 0 : 1;
        }
        if (sortBy === "Broken First") {
          return status === "broken" ? 0 : 1;
        }
        return 0;
      };
      switch (sort) {
        case "Newest":
          return [
            ...list
          ].reverse();
        case "Oldest":
          return [
            ...list
          ];
        case "Name (A\u2013Z)":
          return [
            ...list
          ].sort((a, b3) => a.name.localeCompare(b3.name));
        case "Name (Z\u2013A)":
          return [
            ...list
          ].sort((a, b3) => b3.name.localeCompare(a.name));
        case "Working First":
          if (mode === "plugins") {
            return [
              ...list
            ].sort((a, b3) => {
              var pa = getStatusPriority(a.status, "Working First");
              var pb = getStatusPriority(b3.status, "Working First");
              return pa !== pb ? pa - pb : a.name.localeCompare(b3.name);
            });
          }
          return list;
        case "Broken First":
          if (mode === "plugins") {
            return [
              ...list
            ].sort((a, b3) => {
              var pa = getStatusPriority(a.status, "Broken First");
              var pb = getStatusPriority(b3.status, "Broken First");
              return pa !== pb ? pa - pb : a.name.localeCompare(b3.name);
            });
          }
          return list;
        default:
          return list;
      }
    }, [
      plugins2,
      themesList,
      mode,
      searchQuery,
      sort
    ]);
    if (error) {
      return /* @__PURE__ */ jsx(import_react_native29.View, {
        style: {
          flex: 1,
          paddingHorizontal: 8,
          justifyContent: "center",
          alignItems: "center"
        },
        children: /* @__PURE__ */ jsxs(Card, {
          style: {
            gap: 8
          },
          children: [
            /* @__PURE__ */ jsx(Text, {
              style: {
                textAlign: "center"
              },
              variant: "heading-lg/bold",
              children: "An error occurred while fetching the repository"
            }),
            /* @__PURE__ */ jsx(Text, {
              style: {
                textAlign: "center"
              },
              variant: "text-sm/medium",
              color: "text-muted",
              children: error
            }),
            /* @__PURE__ */ jsx(Button, {
              size: "lg",
              text: "Refetch",
              onPress: () => fetchData(mode === "plugins"),
              icon: findAssetId("RetryIcon")
            })
          ]
        })
      });
    }
    return /* @__PURE__ */ jsxs(import_react_native29.View, {
      style: {
        flex: 1
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native29.View, {
          style: {
            paddingHorizontal: 10
          },
          children: /* @__PURE__ */ jsxs(Stack, {
            spacing: 12,
            children: [
              /* @__PURE__ */ jsx(import_react_native29.View, {
                style: {
                  flexDirection: "row",
                  paddingTop: 10
                },
                children: /* @__PURE__ */ jsxs(import_react_native29.View, {
                  style: {
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(Button, {
                      size: "md",
                      text: "Plugins",
                      variant: mode === "plugins" ? "primary" : "secondary",
                      onPress: () => setMode("plugins"),
                      style: {
                        flex: 1
                      }
                    }),
                    /* @__PURE__ */ jsx(import_react_native29.View, {
                      style: {
                        width: 8
                      }
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      size: "md",
                      text: "Themes",
                      variant: mode === "themes" ? "primary" : "secondary",
                      onPress: () => setMode("themes"),
                      style: {
                        flex: 1
                      }
                    })
                  ]
                })
              }),
              /* @__PURE__ */ jsxs(import_react_native29.View, {
                style: {
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingBottom: 6
                },
                children: [
                  /* @__PURE__ */ jsx(Search_default, {
                    placeholder: `Search ${mode}...`,
                    isRound: true,
                    onChangeText: setSearchQuery,
                    style: {
                      flex: 1
                    }
                  }),
                  /* @__PURE__ */ jsx(import_react_native29.View, {
                    style: {
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8
                    },
                    children: /* @__PURE__ */ jsx(IconButton, {
                      size: "md",
                      variant: "tertiary",
                      icon: findAssetId("MoreVerticalIcon"),
                      disabled: !!searchQuery,
                      onPress: () => showSimpleActionSheet4({
                        key: "AddonListSortOptions",
                        header: {
                          title: "Sort Options",
                          onClose: () => hideActionSheet3("AddonListSortOptions")
                        },
                        options: Object.entries(Sort).map(([key, value]) => ({
                          label: value,
                          onPress: () => {
                            setSort(value);
                          }
                        }))
                      })
                    })
                  })
                ]
              })
            ]
          })
        }),
        /* @__PURE__ */ jsx(FlashList, {
          data: sortedAndFiltered,
          refreshing: loading,
          onRefresh: mode === "plugins" ? fetchPlugins : fetchThemes,
          estimatedItemSize: 200,
          contentContainerStyle: {
            paddingBottom: 90,
            paddingHorizontal: 5
          },
          ListHeaderComponent: mode === "plugins" ? /* @__PURE__ */ jsx(import_react_native29.View, {
            style: {
              paddingVertical: 6,
              paddingHorizontal: 8
            },
            children: /* @__PURE__ */ jsx(Card, {
              border: "strong",
              children: /* @__PURE__ */ jsx(import_react_native29.View, {
                style: {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                },
                children: /* @__PURE__ */ jsxs(import_react_native29.View, {
                  style: {
                    gap: 6,
                    flexShrink: 1
                  },
                  children: [
                    /* @__PURE__ */ jsx(Text, {
                      variant: "heading-md/bold",
                      children: "Unproxied Plugins"
                    }),
                    /* @__PURE__ */ jsx(Text, {
                      variant: "text-sm/medium",
                      color: "text-muted",
                      children: "Plugins installed from this source have not been checked for safety, install at your own risk"
                    })
                  ]
                })
              })
            })
          }) : null,
          //@ts-ignore
          renderItem: ({ item: addon }) => /* @__PURE__ */ jsx(import_react_native29.View, {
            style: {
              paddingVertical: 6,
              paddingHorizontal: 8
            },
            children: /* @__PURE__ */ jsx(AddonCard2, {
              addon,
              isPluginMode: mode === "plugins",
              installing,
              setInstalling,
              setRefreshTick
            })
          })
        })
      ]
    });
  }
  var import_react_native29, showSimpleActionSheet4, hideActionSheet3, PLUGIN_URL, THEME_URL, Sort;
  var init_PluginBrowser = __esm({
    "src/core/ui/settings/pages/PluginBrowser/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_common();
      import_react_native29 = __toESM(require_react_native());
      init_components();
      init_assets();
      init_safeFetch();
      init_toasts();
      init_Search();
      init_plugins();
      init_themes();
      init_common();
      init_sheets();
      init_wrappers2();
      init_alerts();
      init_components();
      init_lazy();
      init_metro();
      ({ showSimpleActionSheet: showSimpleActionSheet4 } = lazyDestructure(() => findByProps("showSimpleActionSheet")));
      ({ hideActionSheet: hideActionSheet3 } = findByProps("hideActionSheet"));
      PLUGIN_URL = "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json";
      THEME_URL = "https://raw.githubusercontent.com/kmmiio99o/theme-marketplace/refs/heads/main/themes.json";
      Sort = /* @__PURE__ */ function(Sort2) {
        Sort2["DateNewest"] = "Newest";
        Sort2["DateOldest"] = "Oldest";
        Sort2["NameAZ"] = "Name (A\u2013Z)";
        Sort2["NameZA"] = "Name (Z\u2013A)";
        Sort2["WorkingFirst"] = "Working First";
        Sort2["BrokenFirst"] = "Broken First";
        return Sort2;
      }(Sort || {});
    }
  });

  // src/core/ui/hooks/useFS.ts
  function useFileExists(path, prefix) {
    var [state, setState] = (0, import_react9.useState)(2);
    var check = () => fileExists(path, {
      prefix
    }).then((exists) => setState(exists ? 1 : 0)).catch(() => setState(3));
    var customFS = (0, import_react9.useMemo)(() => new Proxy(fs_exports, {
      get(target, p, receiver) {
        var val = Reflect.get(target, p, receiver);
        if (typeof val !== "function")
          return;
        return (...args) => {
          var promise = (check(), val(...args));
          if (promise?.constructor?.name === "Promise") {
            setState(2);
            promise.finally(check);
          }
          return promise;
        };
      }
    }), []);
    (0, import_react9.useEffect)(() => void check(), []);
    return [
      state,
      customFS
    ];
  }
  var import_react9, CheckState;
  var init_useFS = __esm({
    "src/core/ui/hooks/useFS.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_fs();
      import_react9 = __toESM(require_react());
      CheckState = /* @__PURE__ */ function(CheckState2) {
        CheckState2[CheckState2["FALSE"] = 0] = "FALSE";
        CheckState2[CheckState2["TRUE"] = 1] = "TRUE";
        CheckState2[CheckState2["LOADING"] = 2] = "LOADING";
        CheckState2[CheckState2["ERROR"] = 3] = "ERROR";
        return CheckState2;
      }({});
    }
  });

  // src/core/ui/settings/pages/Developer/AssetDisplay.tsx
  function AssetDisplay({ asset }) {
    return /* @__PURE__ */ jsx(TableRow, {
      variant: displayable.has(asset.type) ? "default" : "danger",
      label: asset.name,
      subLabel: `Index: ${asset.id} Type: ${asset.type}`,
      icon: displayable.has(asset.type) ? /* @__PURE__ */ jsx(import_react_native30.Image, {
        source: asset.id,
        style: {
          width: 32,
          height: 32
        }
      }) : /* @__PURE__ */ jsx(TableRow.Icon, {
        variant: "danger",
        source: findAssetId(asset.type in iconMap ? iconMap[asset.type] : iconMap.default)
      }),
      onPress: () => openAlert4("revenge-asset-display-details", /* @__PURE__ */ jsx(AlertModal5, {
        title: asset.name,
        content: `Index: ${asset.id}
Module ID: ${asset.moduleId}
Type: ${asset.type}`,
        extraContent: displayable.has(asset.type) ? /* @__PURE__ */ jsx(import_react_native30.Image, {
          resizeMode: "contain",
          source: asset.id,
          style: {
            flex: 1,
            width: "auto",
            height: 192
          }
        }) : /* @__PURE__ */ jsxs(Text, {
          variant: "text-sm/medium",
          color: "text-danger",
          style: {
            width: "100%",
            textAlign: "center"
          },
          children: [
            "Asset type ",
            asset.type.toUpperCase(),
            " is not supported for preview."
          ]
        }),
        actions: /* @__PURE__ */ jsxs(Stack, {
          children: [
            /* @__PURE__ */ jsx(AlertActionButton5, {
              text: "Copy asset name",
              variant: "primary",
              onPress: () => copyToClipboard(asset.name)
            }),
            /* @__PURE__ */ jsx(AlertActionButton5, {
              text: "Copy asset index",
              variant: "secondary",
              onPress: () => copyToClipboard(asset.id.toString())
            })
          ]
        })
      }))
    });
  }
  var import_react_native30, openAlert4, AlertModal5, AlertActionButton5, displayable, iconMap, copyToClipboard;
  var init_AssetDisplay = __esm({
    "src/core/ui/settings/pages/Developer/AssetDisplay.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_assets();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      init_toasts();
      import_react_native30 = __toESM(require_react_native());
      ({ openAlert: openAlert4 } = lazyDestructure(() => findByProps("openAlert", "dismissAlert")));
      ({ AlertModal: AlertModal5, AlertActionButton: AlertActionButton5 } = lazyDestructure(() => findByProps("AlertModal", "AlertActions")));
      displayable = /* @__PURE__ */ new Set([
        "png",
        "jpg",
        "svg"
      ]);
      iconMap = {
        jsona: "ic_file_text",
        lottie: "ic_image",
        webm: "CirclePlayIcon-primary",
        ttf: "ic_add_text",
        default: "UnknownGameIcon"
      };
      copyToClipboard = (text) => {
        clipboard.setString(text);
        showToast.showCopyToClipboard();
      };
    }
  });

  // src/core/ui/settings/pages/Developer/AssetBrowser.tsx
  function AssetBrowser() {
    var [search, setSearch] = React.useState("");
    var [showNonImages, setShowNonImages] = React.useState(false);
    var all = (0, import_react10.useMemo)(() => Array.from(iterateAssets()), []);
    var filteredData = (0, import_react10.useMemo)(() => {
      var result = all.filter((a) => a.name.includes(search) || a.id.toString() === search);
      if (!showNonImages) {
        result = result.filter((a) => displayable2.has(a.type));
      }
      return result;
    }, [
      all,
      search,
      showNonImages
    ]);
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsxs(import_react_native31.View, {
        style: {
          flex: 1
        },
        children: [
          /* @__PURE__ */ jsxs(import_react_native31.View, {
            style: {
              flexDirection: "row",
              alignItems: "center",
              margin: 10
            },
            children: [
              /* @__PURE__ */ jsx(import_react_native31.View, {
                style: {
                  flex: 1,
                  marginRight: 10
                },
                children: /* @__PURE__ */ jsx(Search_default, {
                  onChangeText: (v2) => setSearch(v2)
                })
              }),
              /* @__PURE__ */ jsx(import_react_native31.TouchableOpacity, {
                style: {
                  padding: 12,
                  backgroundColor: showNonImages ? "#0f1013" : "#303139",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 44,
                  minHeight: 44
                },
                onPress: () => setShowNonImages(!showNonImages),
                children: /* @__PURE__ */ jsx(import_react_native31.Image, {
                  style: {
                    width: 20,
                    height: 20
                  },
                  source: findAssetId("ic_image")
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx(import_react_native31.ScrollView, {
            children: /* @__PURE__ */ jsxs(import_react_native31.View, {
              style: {
                flex: 1,
                borderRadius: 16,
                paddingHorizontal: 12,
                overflow: "hidden",
                backgroundColor: "transparent"
              },
              children: [
                showNonImages && /* @__PURE__ */ jsx(Text, {
                  variant: "text-sm/medium",
                  color: "text-danger",
                  style: {
                    marginBottom: 16
                  },
                  children: "Some assets types cannot be displayed and will be marked in red."
                }),
                /* @__PURE__ */ jsx(import_react_native31.FlatList, {
                  data: filteredData,
                  renderItem: ({ item }) => /* @__PURE__ */ jsx(AssetDisplay, {
                    asset: item,
                    showNonImages
                  }),
                  contentContainerStyle: {
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    borderRadius: 16
                  },
                  scrollEnabled: false,
                  keyExtractor: (a) => a.id.toString()
                })
              ]
            })
          })
        ]
      })
    });
  }
  var import_react10, import_react_native31, displayable2;
  var init_AssetBrowser = __esm({
    "src/core/ui/settings/pages/Developer/AssetBrowser.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_AssetDisplay();
      init_assets();
      init_components();
      init_components2();
      import_react10 = __toESM(require_react());
      import_react_native31 = __toESM(require_react_native());
      displayable2 = /* @__PURE__ */ new Set([
        "png",
        "jpg",
        "svg"
      ]);
    }
  });

  // src/core/ui/settings/pages/Developer/index.tsx
  var Developer_exports = {};
  __export(Developer_exports, {
    default: () => Developer
  });
  function Developer() {
    var [rdtFileExists, fs] = useFileExists("preloads/reactDevtools.js");
    var [isDebuggerConnected, setIsDebuggerConnected] = (0, import_react11.useState)(isConnectedToDebugger2());
    var styles = useStyles4();
    var navigation2 = NavigationNative.useNavigation();
    useProxy(settings);
    useProxy(loaderConfig);
    (0, import_react11.useEffect)(() => {
      var interval = setInterval(() => {
        setIsDebuggerConnected(isConnectedToDebugger2());
      }, 1e3);
      return () => clearInterval(interval);
    }, []);
    var handleDebuggerConnect = () => {
      if (isDebuggerConnected) {
        disconnectFromDebugger2();
        setIsDebuggerConnected(false);
      } else {
        connectToDebugger2(settings.debuggerUrl);
        setTimeout(() => setIsDebuggerConnected(isConnectedToDebugger2()), 100);
      }
    };
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsx(import_react_native33.ScrollView, {
        style: {
          flex: 1
        },
        contentContainerStyle: {
          paddingBottom: 38
        },
        children: /* @__PURE__ */ jsxs(Stack, {
          style: {
            paddingVertical: 24,
            paddingHorizontal: 12
          },
          spacing: 24,
          children: [
            /* @__PURE__ */ jsxs(TableRowGroup, {
              title: Strings.DEBUGGER_URL,
              children: [
                /* @__PURE__ */ jsx(TextInput, {
                  placeholder: "127.0.0.1:9090",
                  size: "md",
                  leadingIcon: () => /* @__PURE__ */ jsx(LegacyFormText, {
                    style: styles.leadingText,
                    children: "ws://"
                  }),
                  defaultValue: settings.debuggerUrl,
                  onChange: (v2) => settings.debuggerUrl = v2
                }),
                /* @__PURE__ */ jsx(Stack, {
                  style: {
                    marginTop: 4,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflow: "hidden"
                  },
                  children: /* @__PURE__ */ jsx(TableSwitchRow, {
                    label: Strings.AUTO_DEBUGGER,
                    subLabel: isDebuggerConnected ? "Connected" : void 0,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("copy")
                    }),
                    value: settings.autoDebugger,
                    onValueChange: (v2) => {
                      settings.autoDebugger = v2;
                    }
                  })
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  label: isDebuggerConnected ? "Disconnect from Debugger" : Strings.CONNECT_TO_DEBUG_WEBSOCKET,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId(isDebuggerConnected ? "ic_message_delete" : "copy")
                  }),
                  onPress: handleDebuggerConnect
                })
              ]
            }),
            isReactDevToolsPreloaded() && /* @__PURE__ */ jsx(Fragment, {
              children: /* @__PURE__ */ jsxs(TableRowGroup, {
                title: Strings.DEVTOOLS_URL,
                children: [
                  /* @__PURE__ */ jsx(TextInput, {
                    placeholder: "127.0.0.1:8097",
                    size: "md",
                    leadingIcon: () => /* @__PURE__ */ jsx(LegacyFormText, {
                      style: styles.leadingText,
                      children: "ws://"
                    }),
                    defaultValue: settings.devToolsUrl,
                    onChange: (v2) => settings.devToolsUrl = v2
                  }),
                  /* @__PURE__ */ jsx(Stack, {
                    style: {
                      marginTop: 4,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      overflow: "hidden"
                    },
                    children: /* @__PURE__ */ jsx(TableSwitchRow, {
                      label: Strings.AUTO_DEVTOOLS,
                      icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                        source: findAssetId("ic_badge_staff")
                      }),
                      value: settings.autoDevTools,
                      onValueChange: (v2) => {
                        settings.autoDevTools = v2;
                      }
                    })
                  }),
                  /* @__PURE__ */ jsx(TableRow, {
                    label: Strings.CONNECT_TO_REACT_DEVTOOLS,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("ic_badge_staff")
                    }),
                    onPress: () => _async_to_generator(function* () {
                      if (!settings.devToolsUrl?.trim()) {
                        showToast("Invalid devTools URL!", findAssetId("Small"));
                        return;
                      }
                      try {
                        var devTools = globalThis[getReactDevToolsProp() || "__vendetta_rdc"];
                        if (!devTools?.connectToDevTools) {
                          showToast("Invalid devTools URL!", findAssetId("Small"));
                          return;
                        }
                        yield devTools.connectToDevTools({
                          host: settings.devToolsUrl.split(":")?.[0],
                          resolveRNStyle: import_react_native33.StyleSheet.flatten
                        });
                      } catch (error) {
                        showToast("Invalid devTools URL!", findAssetId("Small"));
                      }
                    })()
                  })
                ]
              })
            }),
            isLoaderConfigSupported() && /* @__PURE__ */ jsx(Fragment, {
              children: /* @__PURE__ */ jsxs(TableRowGroup, {
                title: "Loader config",
                children: [
                  /* @__PURE__ */ jsx(TableSwitchRow, {
                    label: Strings.LOAD_FROM_CUSTOM_URL,
                    subLabel: Strings.LOAD_FROM_CUSTOM_URL_DEC,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("copy")
                    }),
                    value: loaderConfig.customLoadUrl.enabled,
                    onValueChange: (v2) => {
                      loaderConfig.customLoadUrl.enabled = v2;
                    }
                  }),
                  loaderConfig.customLoadUrl.enabled && /* @__PURE__ */ jsx(TableRow, {
                    label: /* @__PURE__ */ jsx(TextInput, {
                      defaultValue: loaderConfig.customLoadUrl.url,
                      size: "md",
                      onChange: (v2) => loaderConfig.customLoadUrl.url = v2,
                      placeholder: "http://localhost:4040/kettu.js",
                      label: Strings.PUPU_URL
                    })
                  }),
                  isReactDevToolsPreloaded() && isVendettaLoader() && /* @__PURE__ */ jsx(TableSwitchRow, {
                    label: Strings.LOAD_REACT_DEVTOOLS,
                    subLabel: `${Strings.VERSION}: ${getReactDevToolsVersion()}`,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("ic_badge_staff")
                    }),
                    value: loaderConfig.loadReactDevTools,
                    onValueChange: (v2) => {
                      loaderConfig.loadReactDevTools = v2;
                    }
                  })
                ]
              })
            }),
            /* @__PURE__ */ jsxs(TableRowGroup, {
              title: "Other",
              children: [
                /* @__PURE__ */ jsx(TableRow, {
                  label: Strings.CLEAR_BUNDLE,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("TrashIcon")
                  }),
                  onPress: () => {
                    openAlert5("pupu-clear-bundle-reload-confirmation", /* @__PURE__ */ jsx(AlertModal6, {
                      title: Strings.MODAL_RELOAD_REQUIRED,
                      content: Strings.MODAL_RELOAD_REQUIRED_DESC,
                      actions: /* @__PURE__ */ jsxs(Stack, {
                        children: [
                          /* @__PURE__ */ jsx(AlertActionButton6, {
                            text: Strings.RELOAD,
                            variant: "destructive",
                            onPress: () => import_react_native32.NativeModules.BundleUpdaterManager.reload()
                          }),
                          /* @__PURE__ */ jsx(AlertActionButton6, {
                            text: Strings.CANCEL,
                            variant: "secondary"
                          })
                        ]
                      })
                    }));
                  }
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  arrow: true,
                  label: Strings.ASSET_BROWSER,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("ic_image")
                  }),
                  trailing: TableRow.Arrow,
                  onPress: () => navigation2.push("PUPU_CUSTOM_PAGE", {
                    title: Strings.ASSET_BROWSER,
                    render: AssetBrowser
                  })
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  arrow: true,
                  label: Strings.ERROR_BOUNDARY_TOOLS_LABEL,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("ic_warning_24px")
                  }),
                  onPress: () => showSimpleActionSheet5({
                    key: "ErrorBoundaryTools",
                    header: {
                      title: "Which ErrorBoundary do you want to trip?",
                      icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                        style: {
                          marginRight: 8
                        },
                        source: findAssetId("ic_warning_24px")
                      }),
                      onClose: () => hideActionSheet4()
                    },
                    options: [
                      // @ts-expect-error
                      // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                      {
                        label: Strings.PUPU,
                        onPress: () => navigation2.push("PUPU_CUSTOM_PAGE", {
                          render: () => /* @__PURE__ */ jsx("undefined", {})
                        })
                      },
                      {
                        label: "Discord",
                        isDestructive: true,
                        onPress: () => navigation2.push("PUPU_CUSTOM_PAGE", {
                          noErrorBoundary: true
                        })
                      }
                    ]
                  })
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  label: Strings.INSTALL_REACT_DEVTOOLS,
                  subLabel: Strings.RESTART_REQUIRED_TO_TAKE_EFFECT,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("DownloadIcon")
                  }),
                  trailing: /* @__PURE__ */ jsx(Button, {
                    size: "sm",
                    loading: rdtFileExists === CheckState.LOADING,
                    disabled: rdtFileExists === CheckState.LOADING,
                    variant: rdtFileExists === CheckState.TRUE ? "secondary" : "primary",
                    text: rdtFileExists === CheckState.TRUE ? Strings.UNINSTALL : Strings.INSTALL,
                    onPress: () => _async_to_generator(function* () {
                      if (rdtFileExists === CheckState.FALSE) {
                        fs.downloadFile(RDT_EMBED_LINK, "preloads/reactDevtools.js").then(() => showToast("Successfully installed! A reload is required", findAssetId("DownloadIcon")));
                      } else if (rdtFileExists === CheckState.TRUE) {
                        fs.removeFile("preloads/reactDevtools.js");
                      }
                    })(),
                    icon: findAssetId(rdtFileExists === CheckState.TRUE ? "TrashIcon" : "DownloadIcon"),
                    style: {
                      marginLeft: 8
                    }
                  })
                }),
                /* @__PURE__ */ jsx(TableSwitchRow, {
                  label: Strings.ENABLE_EVAL_COMMAND,
                  subLabel: Strings.ENABLE_EVAL_COMMAND_DESC,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("PencilIcon")
                  }),
                  value: !!settings.enableEvalCommand,
                  onValueChange: (v2) => {
                    settings.enableEvalCommand = v2;
                  }
                })
              ]
            })
          ]
        })
      })
    });
  }
  var import_react_native32, import_react_native33, import_react11, hideActionSheet4, showSimpleActionSheet5, openAlert5, AlertModal6, AlertActionButton6, RDT_EMBED_LINK, useStyles4;
  var init_Developer = __esm({
    "src/core/ui/settings/pages/Developer/index.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_jsxRuntime();
      init_i18n();
      init_useFS();
      init_AssetBrowser();
      init_storage();
      init_assets();
      init_debug();
      init_loader();
      init_settings();
      init_lazy();
      init_common();
      init_components();
      init_wrappers();
      init_color();
      init_components2();
      init_styles();
      import_react_native32 = __toESM(require_react_native());
      import_react_native33 = __toESM(require_react_native());
      init_toasts();
      import_react11 = __toESM(require_react());
      ({ hideActionSheet: hideActionSheet4 } = lazyDestructure(() => findByProps("openLazy", "hideActionSheet")));
      ({ showSimpleActionSheet: showSimpleActionSheet5 } = lazyDestructure(() => findByProps("showSimpleActionSheet")));
      ({ openAlert: openAlert5 } = lazyDestructure(() => findByProps("openAlert", "dismissAlert")));
      ({ AlertModal: AlertModal6, AlertActionButton: AlertActionButton6 } = lazyDestructure(() => findByProps("AlertModal", "AlertActions")));
      RDT_EMBED_LINK = "https://codeberg.org/raincord/raindevtools/raw/branch/dev/dist/index.bundle";
      useStyles4 = createStyles({
        leadingText: {
          ...TextStyleSheet["heading-md/semibold"],
          color: semanticColors.TEXT_MUTED,
          marginRight: -4
        }
      });
    }
  });

  // src/core/ui/settings/index.ts
  function initSettings() {
    registerSection({
      name: "Kettu",
      items: [
        {
          key: "KETTU",
          title: () => Strings.PUPU,
          icon: {
            uri: kettu_default
          },
          render: () => Promise.resolve().then(() => (init_General(), General_exports)),
          useTrailing: () => `(${"v1.4.1"})`
        },
        {
          key: "BUNNY_PLUGINS",
          title: () => Strings.PLUGINS,
          icon: findAssetId("ActivitiesIcon"),
          render: () => Promise.resolve().then(() => (init_Plugins(), Plugins_exports))
        },
        {
          key: "BUNNY_THEMES",
          title: () => Strings.THEMES,
          icon: findAssetId("PaintPaletteIcon"),
          render: () => Promise.resolve().then(() => (init_Themes(), Themes_exports)),
          usePredicate: () => isThemeSupported()
        },
        {
          key: "BUNNY_FONTS",
          title: () => Strings.FONTS,
          icon: findAssetId("LettersIcon"),
          render: () => Promise.resolve().then(() => (init_Fonts(), Fonts_exports)),
          usePredicate: () => isFontSupported()
        },
        {
          key: "KETTU_BROWSER",
          title: () => Strings.BROWSER,
          icon: findAssetId("ChannelListMagnifyingGlassIcon"),
          render: () => Promise.resolve().then(() => (init_PluginBrowser(), PluginBrowser_exports))
        },
        {
          key: "BUNNY_DEVELOPER",
          title: () => Strings.DEVELOPER,
          icon: findAssetId("WrenchIcon"),
          render: () => Promise.resolve().then(() => (init_Developer(), Developer_exports)),
          usePredicate: () => useProxy(settings).developerSettings ?? false
        }
      ]
    });
    registerSection({
      name: "Bunny",
      items: []
    });
    registerSection({
      name: "Revenge",
      items: []
    });
    registerSection({
      name: "Vendetta",
      items: []
    });
  }
  var init_settings3 = __esm({
    "src/core/ui/settings/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_kettu();
      init_i18n();
      init_storage();
      init_assets();
      init_loader();
      init_settings();
      init_settings2();
    }
  });

  // globals:lodash
  var require_lodash = __commonJS({
    "globals:lodash"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["lodash"];
    }
  });

  // globals:util
  var require_util = __commonJS({
    "globals:util"(exports, module) {
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      module.exports = require_depsModule()["util"];
    }
  });

  // src/core/vendetta/api.tsx
  var import_react12, import_react_native34, initVendettaObject;
  var init_api3 = __esm({
    "src/core/vendetta/api.tsx"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_jsxRuntime();
      init_alerts2();
      init_storage();
      init_storage();
      init_themes();
      init_assets();
      init_commands();
      init_debug();
      init_loader();
      init_patcher();
      init_settings();
      init_utils();
      init_cyrb64();
      init_logger();
      init_metro();
      init_common();
      init_components();
      init_components();
      init_color();
      init_components2();
      init_styles();
      init_toasts();
      init_dist();
      import_react12 = __toESM(require_react());
      import_react_native34 = __toESM(require_react_native());
      init_plugins();
      initVendettaObject = () => {
        var createStackBasedFilter = (fn) => {
          return (filter) => {
            return fn(factories_exports.createSimpleFilter(filter, cyrb64Hash(new Error().stack)));
          };
        };
        var api = globalThis.vendetta = {
          patcher: {
            before: patcher_default.before,
            after: patcher_default.after,
            instead: patcher_default.instead
          },
          metro: {
            modules: globalThis.modules,
            find: createStackBasedFilter(findExports),
            findAll: createStackBasedFilter(findAllExports),
            findByProps: (...props) => {
              if (props.length === 1 && props[0] === "KeyboardAwareScrollView") {
                props.push("listenToKeyboardEvents");
              }
              var ret = findByProps(...props);
              if (ret == null) {
                if (props.includes("ActionSheetTitleHeader")) {
                  var module = findByProps("ActionSheetRow");
                  return {
                    ...module,
                    ActionSheetTitleHeader: module.BottomSheetTitleHeader,
                    ActionSheetContentContainer: ({ children }) => {
                      (0, import_react12.useEffect)(() => console.warn("Discord has removed 'ActionSheetContentContainer', please move into something else. This has been temporarily replaced with View"), []);
                      return /* @__PURE__ */ (0, import_react12.createElement)(import_react_native34.View, null, children);
                    }
                  };
                }
              }
              return ret;
            },
            findByPropsAll: (...props) => findByPropsAll(...props),
            findByName: (name, defaultExp) => {
              if (name === "create" && typeof defaultExp === "undefined") {
                return findByName("create", false).default;
              }
              return findByName(name, defaultExp ?? true);
            },
            findByNameAll: (name, defaultExp = true) => findByNameAll(name, defaultExp),
            findByDisplayName: (displayName, defaultExp = true) => findByDisplayName(displayName, defaultExp),
            findByDisplayNameAll: (displayName, defaultExp = true) => findByDisplayNameAll(displayName, defaultExp),
            findByTypeName: (typeName, defaultExp = true) => findByTypeName(typeName, defaultExp),
            findByTypeNameAll: (typeName, defaultExp = true) => findByTypeNameAll(typeName, defaultExp),
            findByStoreName: (name) => findByStoreName(name),
            common: {
              constants,
              channels,
              i18n,
              url,
              toasts,
              stylesheet: {
                createThemedStyleSheet
              },
              clipboard,
              assets,
              invites,
              commands,
              navigation,
              navigationStack,
              NavigationNative,
              Flux,
              FluxDispatcher,
              React: React2,
              ReactNative,
              moment: require_moment(),
              chroma: require_chroma_js(),
              lodash: require_lodash(),
              util: require_util()
            }
          },
          constants: {
            DISCORD_SERVER: "https://discord.gg/n9QQ4XhhJP",
            GITHUB: "https://github.com/vendetta-mod",
            PROXY_PREFIX: "https://vd-plugins.github.io/proxy",
            HTTP_REGEX: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
            HTTP_REGEX_MULTI: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
            DISCORD_SERVER_ID: "1015931589865246730",
            PLUGINS_CHANNEL_ID: "1091880384561684561",
            THEMES_CHANNEL_ID: "1091880434939482202"
          },
          utils: {
            findInReactTree: (tree, filter) => findInReactTree(tree, filter),
            findInTree: (tree, filter, options) => findInTree(tree, filter, options),
            safeFetch: (input, options, timeout) => safeFetch(input, options, timeout),
            unfreeze: (obj) => Object.isFrozen(obj) ? {
              ...obj
            } : obj,
            without: (object, ...keys) => omit(object, keys)
          },
          debug: {
            connectToDebugger: (url2) => connectToDebugger2(url2),
            getDebugInfo: () => getDebugInfo()
          },
          ui: {
            components: {
              Forms,
              General: ReactNative,
              Alert: LegacyAlert,
              Button: CompatButton,
              HelpMessage: (...props) => /* @__PURE__ */ jsx(HelpMessage, {
                ...props
              }),
              SafeAreaView: (...props) => /* @__PURE__ */ jsx(SafeAreaView, {
                ...props
              }),
              Summary,
              ErrorBoundary,
              Codeblock,
              Search: Search_default
            },
            toasts: {
              showToast: (content, asset) => showToast(content, asset)
            },
            alerts: {
              showConfirmationAlert: (options) => showConfirmationAlert(options),
              showCustomAlert: (component, props) => showCustomAlert(component, props),
              showInputAlert: (options) => showInputAlert(options)
            },
            assets: {
              all: new Proxy({}, {
                get(cache, p) {
                  if (typeof p !== "string")
                    return void 0;
                  if (cache[p])
                    return cache[p];
                  for (var asset of iterateAssets()) {
                    if (asset.name)
                      return cache[p] = asset;
                  }
                },
                ownKeys(cache) {
                  var keys = /* @__PURE__ */ new Set();
                  for (var asset of iterateAssets()) {
                    cache[asset.name] = asset;
                    keys.add(asset.name);
                  }
                  return [
                    ...keys
                  ];
                }
              }),
              find: (filter) => findAsset(filter),
              getAssetByName: (name) => findAsset(name),
              getAssetByID: (id) => findAsset(id),
              getAssetIDByName: (name) => findAssetId(name)
            },
            semanticColors,
            rawColors
          },
          plugins: {
            plugins: VdPluginManager.plugins,
            fetchPlugin: (source) => VdPluginManager.fetchPlugin(source),
            installPlugin: (source, enabled = true) => VdPluginManager.installPlugin(source, enabled),
            startPlugin: (id) => VdPluginManager.startPlugin(id),
            stopPlugin: (id, disable = true) => VdPluginManager.stopPlugin(id, disable),
            removePlugin: (id) => VdPluginManager.removePlugin(id),
            getSettings: (id) => VdPluginManager.getSettings(id)
          },
          themes: {
            themes,
            fetchTheme: (id, selected) => fetchTheme(id, selected),
            installTheme: (id) => installTheme(id),
            selectTheme: (id) => selectTheme(id === "default" ? null : themes[id]),
            removeTheme: (id) => removeTheme(id),
            getCurrentTheme: () => getThemeFromLoader(),
            updateThemes: () => updateThemes()
          },
          commands: {
            registerCommand
          },
          storage: {
            createProxy: (target) => createProxy(target),
            useProxy: (_storage) => useProxy(_storage),
            createStorage: (backend) => createStorage(backend),
            wrapSync: (store) => wrapSync(store),
            awaitSyncWrapper: (store) => awaitStorage(store),
            createMMKVBackend: (store) => createMMKVBackend(store),
            createFileBackend: (file) => {
              if (isPyonLoader() && file === "vendetta_theme.json") {
                file = "pyon/current-theme.json";
              }
              return createFileBackend(file);
            }
          },
          settings,
          loader: {
            identity: getVendettaLoaderIdentity() ?? void 0,
            config: loaderConfig
          },
          logger: {
            log: (...message) => console.log(...message),
            info: (...message) => console.info(...message),
            warn: (...message) => console.warn(...message),
            error: (...message) => console.error(...message),
            time: (...message) => console.time(...message),
            trace: (...message) => console.trace(...message),
            verbose: (...message) => console.log(...message)
          },
          version: versionHash,
          unload: () => {
            delete globalThis.vendetta;
          }
        };
        return () => api.unload();
      };
    }
  });

  // src/global.d.ts
  var init_global_d = __esm({
    "src/global.d.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/modules.d.ts
  var init_modules_d = __esm({
    "src/modules.d.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
    }
  });

  // src/lib/ui/index.ts
  var ui_exports = {};
  __export(ui_exports, {
    alerts: () => alerts_exports,
    components: () => components_exports2,
    settings: () => settings_exports2,
    sheets: () => sheets_exports,
    styles: () => styles_exports,
    toasts: () => toasts_exports
  });
  var init_ui = __esm({
    "src/lib/ui/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_alerts();
      init_components2();
      init_settings2();
      init_sheets();
      init_styles();
      init_toasts();
    }
  });

  // src/lib/index.ts
  var lib_exports = {};
  __export(lib_exports, {
    _jsx: () => jsxRuntime_exports,
    api: () => api_exports,
    fonts: () => fonts_exports,
    managers: () => managers,
    metro: () => metro_exports,
    plugins: () => plugins_exports2,
    themes: () => themes_exports,
    ui: () => ui_exports,
    unload: () => unload,
    utils: () => utils_exports
  });
  function unload() {
    for (var d of _disposer)
      if (typeof d === "function")
        d();
    delete globalThis.bunny;
  }
  var managers, _disposer;
  var init_lib = __esm({
    "src/lib/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_global_d();
      init_modules_d();
      init_fonts();
      init_plugins4();
      init_themes();
      init_api();
      init_ui();
      init_utils();
      init_metro();
      init_fonts();
      init_plugins4();
      init_themes();
      init_jsxRuntime();
      init_lazy();
      managers = proxyLazy(() => {
        console.warn("bunny.managers.* is deprecated, and moved the top level (bunny.*). bunny.managers will be eventually removed soon");
        return {
          get fonts() {
            return fonts_exports;
          },
          get plugins() {
            return plugins_exports2;
          },
          get themes() {
            return themes_exports;
          }
        };
      }, {
        hint: "object"
      });
      _disposer = [];
      unload.push = (fn) => {
        _disposer.push(fn);
      };
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });
  var src_default;
  var init_src = __esm({
    "src/index.ts"() {
      "use strict";
      init_asyncIteratorSymbol();
      init_promiseAllSettled();
      init_async_to_generator();
      init_patchErrorBoundary();
      init_fixes();
      init_i18n();
      init_settings3();
      init_api3();
      init_plugins();
      init_fonts();
      init_plugins4();
      init_themes();
      init_commands();
      init_debug();
      init_flux();
      init_jsx();
      init_logger();
      init_settings2();
      init_debug();
      init_lib();
      src_default = () => _async_to_generator(function* () {
        yield Promise.all([
          initThemes(),
          injectFluxInterceptor(),
          patchSettings(),
          patchLogHook(),
          patchCommands(),
          patchJsx(),
          initVendettaObject(),
          initFetchI18nStrings(),
          initSettings(),
          fixes_default(),
          patchErrorBoundary(),
          updatePlugins(),
          updateFonts(),
          initPlugins(),
          VdPluginManager.initPlugins()
        ]).then(
          // Push them all to unloader
          (u) => u.forEach((f) => f && unload.push(f))
        );
        initDebugger();
        globalThis.bunny = lib_exports;
        logger.log("Kettu is ready!");
      })();
    }
  });

  // src/entry.ts
  init_asyncIteratorSymbol();
  init_promiseAllSettled();
  init_async_to_generator();
  var { instead: instead3 } = require_cjs();
  globalThis.window = globalThis;
  function initializeKettu() {
    return _async_to_generator(function* () {
      try {
        Object.freeze = Object.seal = Object;
        yield (init_caches(), __toCommonJS(caches_exports)).initMetroCache();
        (init_src(), __toCommonJS(src_exports)).default();
      } catch (e) {
        var { ClientInfoManager } = (init_modules(), __toCommonJS(modules_exports));
        var stack = e instanceof Error ? e.stack : void 0;
        console.log(stack ?? e?.toString?.() ?? e);
        alert([
          "Failed to load Kettu!\n",
          `Build Number: ${ClientInfoManager.getConstants().Build}`,
          `Kettu: ${"v1.4.1"}`,
          stack || e?.toString?.()
        ].join("\n"));
      }
    })();
  }
  if (typeof globalThis.__r === "undefined") {
    deferredCalls = [];
    unpatches = [];
    deferMethodExecution = (object, method, condition, resume, returnWith) => {
      var restore = instead3(method, object, function(args, original) {
        if (!condition || condition(...args)) {
          var queue = {
            object,
            method,
            args,
            resume
          };
          deferredCalls.push(queue);
          return returnWith ? returnWith(queue) : void 0;
        }
        return original.apply(this, args);
      });
      unpatches.push(restore);
    };
    resumeDeferred = () => {
      for (var queue of deferredCalls) {
        var { object, method, args, resume } = queue;
        if (resume) {
          resume(queue);
        } else {
          object[method](...args);
        }
      }
      deferredCalls.length = 0;
    };
    onceIndexRequired = (originalRequire) => {
      if (globalThis.__fbBatchedBridge) {
        var batchedBridge = globalThis.__fbBatchedBridge;
        deferMethodExecution(
          batchedBridge,
          "callFunctionReturnFlushedQueue",
          // If the call is to AppRegistry, we want to defer it because it is not yet registered (Revenge delays it)
          // Same goes to the non-callable modules, which are not registered yet, so we ensure that only registered ones can get through
          (...args) => args[0] === "AppRegistry" || !batchedBridge.getCallableModule(args[0]),
          ({ args }) => {
            if (batchedBridge.getCallableModule(args[0])) {
              batchedBridge.__callFunction(...args);
            }
          },
          () => batchedBridge.flushedQueue()
        );
      }
      if (globalThis.RN$AppRegistry) {
        deferMethodExecution(globalThis.RN$AppRegistry, "runApplication");
      }
      var startDiscord = () => _async_to_generator(function* () {
        yield initializeKettu();
        for (var unpatch of unpatches)
          unpatch();
        unpatches.length = 0;
        originalRequire(0);
        resumeDeferred();
      })();
      startDiscord();
    };
    Object.defineProperties(globalThis, {
      __r: {
        configurable: true,
        get: () => _requireFunc,
        set(v2) {
          _requireFunc = function patchedRequire(a) {
            if (a === 0) {
              if (globalThis.modules instanceof Map)
                globalThis.modules = Object.fromEntries(globalThis.modules);
              onceIndexRequired(v2);
              _requireFunc = v2;
            } else
              return v2(a);
          };
        }
      },
      __d: {
        configurable: true,
        get() {
          if (globalThis.Object && !globalThis.modules) {
            globalThis.modules = globalThis.__c?.();
          }
          return this.value;
        },
        set(v2) {
          this.value = v2;
        }
      }
    });
  } else {
    initializeKettu();
  }
  var _requireFunc;
  var deferredCalls;
  var unpatches;
  var deferMethodExecution;
  var resumeDeferred;
  var onceIndexRequired;
})();
//# sourceURL=kettu
