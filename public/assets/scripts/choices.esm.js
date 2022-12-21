var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return target.propertyIsEnumerable(symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// src/scripts/choices.ts
var import_deepmerge = __toESM(require_cjs());

// node_modules/fuse.js/dist/fuse.esm.js
function isArray(value) {
  return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
var INFINITY = 1 / 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  let result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
  return typeof value === "object";
}
function isObjectLike(value) {
  return isObject(value) && value !== null;
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isBlank(value) {
  return !value.trim().length;
}
function getTag(value) {
  return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
var hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};
    let totalWeight = 0;
    keys.forEach((key) => {
      let obj = createKey(key);
      totalWeight += obj.weight;
      this._keys.push(obj);
      this._keyMap[obj.id] = obj;
      totalWeight += obj.weight;
    });
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
};
function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  let getFn = null;
  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, "name")) {
      throw new Error(MISSING_KEY_PROPERTY("name"));
    }
    const name = key.name;
    src = name;
    if (hasOwn.call(key, "weight")) {
      weight = key.weight;
      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
      }
    }
    path = createKeyPath(name);
    id = createKeyId(name);
    getFn = key.getFn;
  }
  return { path, id, weight, src, getFn };
}
function createKeyPath(key) {
  return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
  return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
  let list = [];
  let arr = false;
  const deepGet = (obj2, path2, index) => {
    if (!isDefined(obj2)) {
      return;
    }
    if (!path2[index]) {
      list.push(obj2);
    } else {
      let key = path2[index];
      const value = obj2[key];
      if (!isDefined(value)) {
        return;
      }
      if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path2, index + 1);
        }
      } else if (path2.length) {
        deepGet(value, path2, index + 1);
      }
    }
  };
  deepGet(obj, isString(path) ? path.split(".") : path, 0);
  return arr ? list : list[0];
}
var MatchOptions = {
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1
};
var BasicOptions = {
  isCaseSensitive: false,
  includeScore: false,
  keys: [],
  shouldSort: true,
  sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
var FuzzyOptions = {
  location: 0,
  threshold: 0.6,
  distance: 100
};
var AdvancedOptions = {
  useExtendedSearch: false,
  getFn: get,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1
};
var Config = {
  ...BasicOptions,
  ...MatchOptions,
  ...FuzzyOptions,
  ...AdvancedOptions
};
var SPACE = /[^ ]+/g;
function norm(weight = 1, mantissa = 3) {
  const cache = /* @__PURE__ */ new Map();
  const m = Math.pow(10, mantissa);
  return {
    get(value) {
      const numTokens = value.match(SPACE).length;
      if (cache.has(numTokens)) {
        return cache.get(numTokens);
      }
      const norm2 = 1 / Math.pow(numTokens, 0.5 * weight);
      const n = parseFloat(Math.round(norm2 * m) / m);
      cache.set(numTokens, n);
      return n;
    },
    clear() {
      cache.clear();
    }
  };
}
var FuseIndex = class {
  constructor({
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    this.norm = norm(fieldNormWeight, 3);
    this.getFn = getFn;
    this.isCreated = false;
    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return;
    }
    this.isCreated = true;
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }
    this.norm.clear();
  }
  add(doc) {
    const idx = this.size();
    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  removeAt(idx) {
    this.records.splice(idx, 1);
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]];
  }
  size() {
    return this.records.length;
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return;
    }
    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };
    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = { i: docIndex, $: {} };
    this.keys.forEach((key, keyIndex) => {
      let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
      if (!isDefined(value)) {
        return;
      }
      if (isArray(value)) {
        let subRecords = [];
        const stack = [{ nestedArrIndex: -1, value }];
        while (stack.length) {
          const { nestedArrIndex, value: value2 } = stack.pop();
          if (!isDefined(value2)) {
            continue;
          }
          if (isString(value2) && !isBlank(value2)) {
            let subRecord = {
              v: value2,
              i: nestedArrIndex,
              n: this.norm.get(value2)
            };
            subRecords.push(subRecord);
          } else if (isArray(value2)) {
            value2.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          } else
            ;
        }
        record.$[keyIndex] = subRecords;
      } else if (isString(value) && !isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };
        record.$[keyIndex] = subRecord;
      }
    });
    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
};
function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex;
}
function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
  const { keys, records } = data;
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex;
}
function computeScore$1(pattern, {
  errors = 0,
  currentLocation = 0,
  expectedLocation = 0,
  distance = Config.distance,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  const accuracy = errors / pattern.length;
  if (ignoreLocation) {
    return accuracy;
  }
  const proximity = Math.abs(expectedLocation - currentLocation);
  if (!distance) {
    return proximity ? 1 : accuracy;
  }
  return accuracy + proximity / distance;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
  let indices = [];
  let start = -1;
  let end = -1;
  let i = 0;
  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        indices.push([start, end]);
      }
      start = -1;
    }
  }
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    indices.push([start, i - 1]);
  }
  return indices;
}
var MAX_BITS = 32;
function search(text, pattern, patternAlphabet, {
  location = Config.location,
  distance = Config.distance,
  threshold = Config.threshold,
  findAllMatches = Config.findAllMatches,
  minMatchCharLength = Config.minMatchCharLength,
  includeMatches = Config.includeMatches,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
  }
  const patternLen = pattern.length;
  const textLen = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  let currentThreshold = threshold;
  let bestLocation = expectedLocation;
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = computeMatches ? Array(textLen) : [];
  let index;
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore$1(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });
    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;
    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }
  bestLocation = -1;
  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;
  const mask = 1 << patternLen - 1;
  for (let i = 0; i < patternLen; i += 1) {
    let binMin = 0;
    let binMid = binMax;
    while (binMin < binMid) {
      const score2 = computeScore$1(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score2 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;
    let start = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
    let bitArr = Array(finish + 2);
    bitArr[finish + 1] = (1 << i) - 1;
    for (let j = finish; j >= start; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];
      if (computeMatches) {
        matchMask[currentLocation] = +!!charMatch;
      }
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
      if (i) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }
      if (bitArr[j] & mask) {
        finalScore = computeScore$1(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (finalScore <= currentThreshold) {
          currentThreshold = finalScore;
          bestLocation = currentLocation;
          if (bestLocation <= expectedLocation) {
            break;
          }
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }
    const score = computeScore$1(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (score > currentThreshold) {
      break;
    }
    lastBitArr = bitArr;
  }
  const result = {
    isMatch: bestLocation >= 0,
    score: Math.max(1e-3, finalScore)
  };
  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }
  return result;
}
function createPatternAlphabet(pattern) {
  let mask = {};
  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | 1 << len - i - 1;
  }
  return mask;
}
var BitapSearch = class {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.chunks = [];
    if (!this.pattern.length) {
      return;
    }
    const addChunk = (pattern2, startIndex) => {
      this.chunks.push({
        pattern: pattern2,
        alphabet: createPatternAlphabet(pattern2),
        startIndex
      });
    };
    const len = this.pattern.length;
    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end = len - remainder;
      while (i < end) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }
      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }
  searchIn(text) {
    const { isCaseSensitive, includeMatches } = this.options;
    if (!isCaseSensitive) {
      text = text.toLowerCase();
    }
    if (this.pattern === text) {
      let result2 = {
        isMatch: true,
        score: 0
      };
      if (includeMatches) {
        result2.indices = [[0, text.length - 1]];
      }
      return result2;
    }
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;
    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;
    this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
      const { isMatch, score, indices } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });
      if (isMatch) {
        hasMatches = true;
      }
      totalScore += score;
      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });
    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };
    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }
    return result;
  }
};
var BaseMatch = class {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex);
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex);
  }
  search() {
  }
};
function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null;
}
var ExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(text) {
    const isMatch = text === this.pattern;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InverseExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var PrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InversePrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var SuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    };
  }
};
var InverseSuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var FuzzyMatch = class extends BaseMatch {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(text) {
    return this._bitapSearch.searchIn(text);
  }
};
var IncludeMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(text) {
    let location = 0;
    let index;
    const indices = [];
    const patternLen = this.pattern.length;
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }
    const isMatch = !!indices.length;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    };
  }
};
var searchers = [
  ExactMatch,
  IncludeMatch,
  PrefixExactMatch,
  InversePrefixExactMatch,
  InverseSuffixExactMatch,
  SuffixExactMatch,
  InverseExactMatch,
  FuzzyMatch
];
var searchersLen = searchers.length;
var SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
var OR_TOKEN = "|";
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item.trim().split(SPACE_RE).filter((item2) => item2 && !!item2.trim());
    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }
      if (found) {
        continue;
      }
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break;
        }
      }
    }
    return results;
  });
}
var MultiMatchSet = /* @__PURE__ */ new Set([FuzzyMatch.type, IncludeMatch.type]);
var ExtendedSearch = class {
  constructor(pattern, {
    isCaseSensitive = Config.isCaseSensitive,
    includeMatches = Config.includeMatches,
    minMatchCharLength = Config.minMatchCharLength,
    ignoreLocation = Config.ignoreLocation,
    findAllMatches = Config.findAllMatches,
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance
  } = {}) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.query = parseQuery(this.pattern, this.options);
  }
  static condition(_, options) {
    return options.useExtendedSearch;
  }
  searchIn(text) {
    const query = this.query;
    if (!query) {
      return {
        isMatch: false,
        score: 1
      };
    }
    const { includeMatches, isCaseSensitive } = this.options;
    text = isCaseSensitive ? text : text.toLowerCase();
    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers2 = query[i];
      allIndices.length = 0;
      numMatches = 0;
      for (let j = 0, pLen = searchers2.length; j < pLen; j += 1) {
        const searcher = searchers2[j];
        const { isMatch, indices, score } = searcher.search(text);
        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break;
        }
      }
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };
        if (includeMatches) {
          result.indices = allIndices;
        }
        return result;
      }
    }
    return {
      isMatch: false,
      score: 1
    };
  }
};
var registeredSearchers = [];
function register(...args) {
  registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options);
    }
  }
  return new BitapSearch(pattern, options);
}
var LogicalOperator = {
  AND: "$and",
  OR: "$or"
};
var KeyType = {
  PATH: "$path",
  PATTERN: "$val"
};
var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
var isPath = (query) => !!query[KeyType.PATH];
var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
var convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});
function parse(query, options, { auto = true } = {}) {
  const next = (query2) => {
    let keys = Object.keys(query2);
    const isQueryPath = isPath(query2);
    if (!isQueryPath && keys.length > 1 && !isExpression(query2)) {
      return next(convertToExplicit(query2));
    }
    if (isLeaf(query2)) {
      const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
      const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
      }
      const obj = {
        keyId: createKeyId(key),
        pattern
      };
      if (auto) {
        obj.searcher = createSearcher(pattern, options);
      }
      return obj;
    }
    let node = {
      children: [],
      operator: keys[0]
    };
    keys.forEach((key) => {
      const value = query2[key];
      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });
    return node;
  };
  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }
  return next(query);
}
function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
  results.forEach((result) => {
    let totalScore = 1;
    result.matches.forEach(({ key, norm: norm2, score }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(
        score === 0 && weight ? Number.EPSILON : score,
        (weight || 1) * (ignoreFieldNorm ? 1 : norm2)
      );
    });
    result.score = totalScore;
  });
}
function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];
  if (!isDefined(matches)) {
    return;
  }
  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return;
    }
    const { indices, value } = match;
    let obj = {
      indices,
      value
    };
    if (match.key) {
      obj.key = match.key.src;
    }
    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }
    data.matches.push(obj);
  });
}
function transformScore(result, data) {
  data.score = result.score;
}
function format(results, docs, {
  includeMatches = Config.includeMatches,
  includeScore = Config.includeScore
} = {}) {
  const transformers = [];
  if (includeMatches)
    transformers.push(transformMatches);
  if (includeScore)
    transformers.push(transformScore);
  return results.map((result) => {
    const { idx } = result;
    const data = {
      item: docs[idx],
      refIndex: idx
    };
    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }
    return data;
  });
}
var Fuse = class {
  constructor(docs, options = {}, index) {
    this.options = { ...Config, ...options };
    if (this.options.useExtendedSearch && false) {
      throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
    }
    this._keyStore = new KeyStore(this.options.keys);
    this.setCollection(docs, index);
  }
  setCollection(docs, index) {
    this._docs = docs;
    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE);
    }
    this._myIndex = index || createIndex(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(doc) {
    if (!isDefined(doc)) {
      return;
    }
    this._docs.push(doc);
    this._myIndex.add(doc);
  }
  remove(predicate = () => false) {
    const results = [];
    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;
        results.push(doc);
      }
    }
    return results;
  }
  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }
  getIndex() {
    return this._myIndex;
  }
  search(query, { limit = -1 } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;
    let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
    computeScore(results, { ignoreFieldNorm });
    if (shouldSort) {
      results.sort(sortFn);
    }
    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }
    return format(results, this._docs, {
      includeMatches,
      includeScore
    });
  }
  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const { records } = this._myIndex;
    const results = [];
    records.forEach(({ v: text, i: idx, n: norm2 }) => {
      if (!isDefined(text)) {
        return;
      }
      const { isMatch, score, indices } = searcher.searchIn(text);
      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{ score, value: text, norm: norm2, indices }]
        });
      }
    });
    return results;
  }
  _searchLogical(query) {
    const expression = parse(query, this.options);
    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const { keyId, searcher } = node;
        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });
        if (matches && matches.length) {
          return [
            {
              idx,
              item,
              matches
            }
          ];
        }
        return [];
      }
      const res = [];
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        const child = node.children[i];
        const result = evaluate(child, item, idx);
        if (result.length) {
          res.push(...result);
        } else if (node.operator === LogicalOperator.AND) {
          return [];
        }
      }
      return res;
    };
    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];
    records.forEach(({ $: item, i: idx }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);
        if (expResults.length) {
          if (!resultMap[idx]) {
            resultMap[idx] = { idx, item, matches: [] };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({ matches }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });
    return results;
  }
  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const { keys, records } = this._myIndex;
    const results = [];
    records.forEach(({ $: item, i: idx }) => {
      if (!isDefined(item)) {
        return;
      }
      let matches = [];
      keys.forEach((key, keyIndex) => {
        matches.push(
          ...this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          })
        );
      });
      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });
    return results;
  }
  _findMatches({ key, value, searcher }) {
    if (!isDefined(value)) {
      return [];
    }
    let matches = [];
    if (isArray(value)) {
      value.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) {
          return;
        }
        const { isMatch, score, indices } = searcher.searchIn(text);
        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm: norm2,
            indices
          });
        }
      });
    } else {
      const { v: text, n: norm2 } = value;
      const { isMatch, score, indices } = searcher.searchIn(text);
      if (isMatch) {
        matches.push({ score, key, value: text, norm: norm2, indices });
      }
    }
    return matches;
  }
};
Fuse.version = "6.6.2";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
{
  Fuse.parseQuery = parse;
}
{
  register(ExtendedSearch);
}

// src/scripts/constants.ts
var EVENTS = {
  showDropdown: "showDropdown",
  hideDropdown: "hideDropdown",
  change: "change",
  choice: "choice",
  search: "search",
  addItem: "addItem",
  removeItem: "removeItem",
  highlightItem: "highlightItem",
  highlightChoice: "highlightChoice",
  unhighlightItem: "unhighlightItem"
};
var ACTION_TYPES = {
  ADD_CHOICE: "ADD_CHOICE",
  FILTER_CHOICES: "FILTER_CHOICES",
  ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
  CLEAR_CHOICES: "CLEAR_CHOICES",
  ADD_GROUP: "ADD_GROUP",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM",
  CLEAR_ALL: "CLEAR_ALL",
  RESET_TO: "RESET_TO",
  SET_IS_LOADING: "SET_IS_LOADING"
};
var KEY_CODES = {
  BACK_KEY: 46,
  DELETE_KEY: 8,
  ENTER_KEY: 13,
  A_KEY: 65,
  ESC_KEY: 27,
  UP_KEY: 38,
  DOWN_KEY: 40,
  PAGE_UP_KEY: 33,
  PAGE_DOWN_KEY: 34
};
var TEXT_TYPE = "text";
var SELECT_ONE_TYPE = "select-one";
var SELECT_MULTIPLE_TYPE = "select-multiple";
var SCROLLING_SPEED = 4;

// src/scripts/actions/choices.ts
var addChoice = ({
  value,
  label,
  id,
  groupId,
  disabled,
  elementId,
  customProperties,
  placeholder,
  keyCode
}) => ({
  type: ACTION_TYPES.ADD_CHOICE,
  value,
  label,
  id,
  groupId,
  disabled,
  elementId,
  customProperties,
  placeholder,
  keyCode
});
var filterChoices = (results) => ({
  type: ACTION_TYPES.FILTER_CHOICES,
  results
});
var activateChoices = (active = true) => ({
  type: ACTION_TYPES.ACTIVATE_CHOICES,
  active
});
var clearChoices = () => ({
  type: ACTION_TYPES.CLEAR_CHOICES
});

// src/scripts/actions/groups.ts
var addGroup = ({
  value,
  id,
  active,
  disabled
}) => ({
  type: ACTION_TYPES.ADD_GROUP,
  value,
  id,
  active,
  disabled
});

// src/scripts/actions/items.ts
var addItem = ({
  value,
  label,
  id,
  choiceId,
  groupId,
  customProperties,
  placeholder,
  keyCode
}) => ({
  type: ACTION_TYPES.ADD_ITEM,
  value,
  label,
  id,
  choiceId,
  groupId,
  customProperties,
  placeholder,
  keyCode
});
var removeItem = (id, choiceId) => ({
  type: ACTION_TYPES.REMOVE_ITEM,
  id,
  choiceId
});
var highlightItem = (id, highlighted) => ({
  type: ACTION_TYPES.HIGHLIGHT_ITEM,
  id,
  highlighted
});

// src/scripts/actions/misc.ts
var clearAll = () => ({
  type: ACTION_TYPES.CLEAR_ALL
});
var resetTo = (state) => ({
  type: ACTION_TYPES.RESET_TO,
  state
});
var setIsLoading = (isLoading) => ({
  type: ACTION_TYPES.SET_IS_LOADING,
  isLoading
});

// src/scripts/components/dropdown.ts
var Dropdown = class {
  element;
  type;
  classNames;
  isActive;
  constructor({
    element,
    type,
    classNames
  }) {
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.isActive = false;
  }
  get distanceFromTopWindow() {
    return this.element.getBoundingClientRect().bottom;
  }
  getChild(selector) {
    return this.element.querySelector(selector);
  }
  show() {
    this.element.classList.add(this.classNames.activeState);
    this.element.setAttribute("aria-expanded", "true");
    this.isActive = true;
    return this;
  }
  hide() {
    this.element.classList.remove(this.classNames.activeState);
    this.element.setAttribute("aria-expanded", "false");
    this.isActive = false;
    return this;
  }
};

// src/scripts/lib/utils.ts
var getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
var generateChars = (length) => Array.from({ length }, () => getRandomNumber(0, 36).toString(36)).join("");
var generateId = (element, prefix) => {
  let id = element.id || element.name && `${element.name}-${generateChars(2)}` || generateChars(4);
  id = id.replace(/(:|\.|\[|\]|,)/g, "");
  id = `${prefix}-${id}`;
  return id;
};
var getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
var isType = (type, obj) => obj !== void 0 && obj !== null && getType(obj) === type;
var wrap = (element, wrapper = document.createElement("div")) => {
  if (element.parentNode) {
    if (element.nextSibling) {
      element.parentNode.insertBefore(wrapper, element.nextSibling);
    } else {
      element.parentNode.appendChild(wrapper);
    }
  }
  return wrapper.appendChild(element);
};
var getAdjacentEl = (startEl, selector, direction = 1) => {
  const prop = `${direction > 0 ? "next" : "previous"}ElementSibling`;
  let sibling = startEl[prop];
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling[prop];
  }
  return sibling;
};
var isScrolledIntoView = (element, parent, direction = 1) => {
  if (!element) {
    return false;
  }
  let isVisible;
  if (direction > 0) {
    isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
  } else {
    isVisible = element.offsetTop >= parent.scrollTop;
  }
  return isVisible;
};
var sanitise = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};
var strToEl = (() => {
  const tmpEl = document.createElement("div");
  return (str) => {
    const cleanedInput = str.trim();
    tmpEl.innerHTML = cleanedInput;
    const firldChild = tmpEl.children[0];
    while (tmpEl.firstChild) {
      tmpEl.removeChild(tmpEl.firstChild);
    }
    return firldChild;
  };
})();
var sortByAlpha = ({ value, label = value }, { value: value2, label: label2 = value2 }) => label.localeCompare(label2, [], {
  sensitivity: "base",
  ignorePunctuation: true,
  numeric: true
});
var sortByScore = (a, b) => {
  const { score: scoreA = 0 } = a;
  const { score: scoreB = 0 } = b;
  return scoreA - scoreB;
};
var dispatchEvent = (element, type, customArgs = null) => {
  const event = new CustomEvent(type, {
    detail: customArgs,
    bubbles: true,
    cancelable: true
  });
  return element.dispatchEvent(event);
};
var existsInArray = (array, value, key = "value") => array.some((item) => {
  if (typeof value === "string") {
    return item[key] === value.trim();
  }
  return item[key] === value;
});
var cloneObject = (obj) => JSON.parse(JSON.stringify(obj));
var diff = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return aKeys.filter((i) => bKeys.indexOf(i) < 0);
};
var parseCustomProperties = (customProperties) => {
  if (typeof customProperties !== "undefined") {
    try {
      return JSON.parse(customProperties);
    } catch (e) {
      return customProperties;
    }
  }
  return {};
};

// src/scripts/components/container.ts
var Container = class {
  element;
  type;
  classNames;
  position;
  isOpen;
  isFlipped;
  isFocussed;
  isDisabled;
  isLoading;
  constructor({
    element,
    type,
    classNames,
    position
  }) {
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.position = position;
    this.isOpen = false;
    this.isFlipped = false;
    this.isFocussed = false;
    this.isDisabled = false;
    this.isLoading = false;
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  addEventListeners() {
    this.element.addEventListener("focus", this._onFocus);
    this.element.addEventListener("blur", this._onBlur);
  }
  removeEventListeners() {
    this.element.removeEventListener("focus", this._onFocus);
    this.element.removeEventListener("blur", this._onBlur);
  }
  shouldFlip(dropdownPos) {
    if (typeof dropdownPos !== "number") {
      return false;
    }
    let shouldFlip = false;
    if (this.position === "auto") {
      shouldFlip = !window.matchMedia(`(min-height: ${dropdownPos + 1}px)`).matches;
    } else if (this.position === "top") {
      shouldFlip = true;
    }
    return shouldFlip;
  }
  setActiveDescendant(activeDescendantID) {
    this.element.setAttribute("aria-activedescendant", activeDescendantID);
  }
  removeActiveDescendant() {
    this.element.removeAttribute("aria-activedescendant");
  }
  open(dropdownPos) {
    this.element.classList.add(this.classNames.openState);
    this.element.setAttribute("aria-expanded", "true");
    this.isOpen = true;
    if (this.shouldFlip(dropdownPos)) {
      this.element.classList.add(this.classNames.flippedState);
      this.isFlipped = true;
    }
  }
  close() {
    this.element.classList.remove(this.classNames.openState);
    this.element.setAttribute("aria-expanded", "false");
    this.removeActiveDescendant();
    this.isOpen = false;
    if (this.isFlipped) {
      this.element.classList.remove(this.classNames.flippedState);
      this.isFlipped = false;
    }
  }
  focus() {
    if (!this.isFocussed) {
      this.element.focus();
    }
  }
  addFocusState() {
    this.element.classList.add(this.classNames.focusState);
  }
  removeFocusState() {
    this.element.classList.remove(this.classNames.focusState);
  }
  enable() {
    this.element.classList.remove(this.classNames.disabledState);
    this.element.removeAttribute("aria-disabled");
    if (this.type === SELECT_ONE_TYPE) {
      this.element.setAttribute("tabindex", "0");
    }
    this.isDisabled = false;
  }
  disable() {
    this.element.classList.add(this.classNames.disabledState);
    this.element.setAttribute("aria-disabled", "true");
    if (this.type === SELECT_ONE_TYPE) {
      this.element.setAttribute("tabindex", "-1");
    }
    this.isDisabled = true;
  }
  wrap(element) {
    wrap(element, this.element);
  }
  unwrap(element) {
    if (this.element.parentNode) {
      this.element.parentNode.insertBefore(element, this.element);
      this.element.parentNode.removeChild(this.element);
    }
  }
  addLoadingState() {
    this.element.classList.add(this.classNames.loadingState);
    this.element.setAttribute("aria-busy", "true");
    this.isLoading = true;
  }
  removeLoadingState() {
    this.element.classList.remove(this.classNames.loadingState);
    this.element.removeAttribute("aria-busy");
    this.isLoading = false;
  }
  _onFocus() {
    this.isFocussed = true;
  }
  _onBlur() {
    this.isFocussed = false;
  }
};

// src/scripts/components/input.ts
var Input = class {
  element;
  type;
  classNames;
  preventPaste;
  isFocussed;
  isDisabled;
  constructor({
    element,
    type,
    classNames,
    preventPaste
  }) {
    this.element = element;
    this.type = type;
    this.classNames = classNames;
    this.preventPaste = preventPaste;
    this.isFocussed = this.element.isEqualNode(document.activeElement);
    this.isDisabled = element.disabled;
    this._onPaste = this._onPaste.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  set placeholder(placeholder) {
    this.element.placeholder = placeholder;
  }
  get value() {
    return sanitise(this.element.value);
  }
  set value(value) {
    this.element.value = value;
  }
  get rawValue() {
    return this.element.value;
  }
  addEventListeners() {
    this.element.addEventListener("paste", this._onPaste);
    this.element.addEventListener("input", this._onInput, {
      passive: true
    });
    this.element.addEventListener("focus", this._onFocus, {
      passive: true
    });
    this.element.addEventListener("blur", this._onBlur, {
      passive: true
    });
  }
  removeEventListeners() {
    this.element.removeEventListener("input", this._onInput);
    this.element.removeEventListener("paste", this._onPaste);
    this.element.removeEventListener("focus", this._onFocus);
    this.element.removeEventListener("blur", this._onBlur);
  }
  enable() {
    this.element.removeAttribute("disabled");
    this.isDisabled = false;
  }
  disable() {
    this.element.setAttribute("disabled", "");
    this.isDisabled = true;
  }
  focus() {
    if (!this.isFocussed) {
      this.element.focus();
    }
  }
  blur() {
    if (this.isFocussed) {
      this.element.blur();
    }
  }
  clear(setWidth = true) {
    if (this.element.value) {
      this.element.value = "";
    }
    if (setWidth) {
      this.setWidth();
    }
    return this;
  }
  setWidth() {
    const { style, value, placeholder } = this.element;
    style.minWidth = `${placeholder.length + 1}ch`;
    style.width = `${value.length + 1}ch`;
  }
  setActiveDescendant(activeDescendantID) {
    this.element.setAttribute("aria-activedescendant", activeDescendantID);
  }
  removeActiveDescendant() {
    this.element.removeAttribute("aria-activedescendant");
  }
  _onInput() {
    if (this.type !== SELECT_ONE_TYPE) {
      this.setWidth();
    }
  }
  _onPaste(event) {
    if (this.preventPaste) {
      event.preventDefault();
    }
  }
  _onFocus() {
    this.isFocussed = true;
  }
  _onBlur() {
    this.isFocussed = false;
  }
};

// src/scripts/components/list.ts
var List = class {
  element;
  scrollPos;
  height;
  constructor({ element }) {
    this.element = element;
    this.scrollPos = this.element.scrollTop;
    this.height = this.element.offsetHeight;
  }
  clear() {
    this.element.innerHTML = "";
  }
  append(node) {
    this.element.appendChild(node);
  }
  getChild(selector) {
    return this.element.querySelector(selector);
  }
  hasChildren() {
    return this.element.hasChildNodes();
  }
  scrollToTop() {
    this.element.scrollTop = 0;
  }
  scrollToChildElement(element, direction) {
    if (!element) {
      return;
    }
    const listHeight = this.element.offsetHeight;
    const listScrollPosition = this.element.scrollTop + listHeight;
    const elementHeight = element.offsetHeight;
    const elementPos = element.offsetTop + elementHeight;
    const destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
    requestAnimationFrame(() => {
      this._animateScroll(destination, direction);
    });
  }
  _scrollDown(scrollPos, strength, destination) {
    const easing = (destination - scrollPos) / strength;
    const distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos + distance;
  }
  _scrollUp(scrollPos, strength, destination) {
    const easing = (scrollPos - destination) / strength;
    const distance = easing > 1 ? easing : 1;
    this.element.scrollTop = scrollPos - distance;
  }
  _animateScroll(destination, direction) {
    const strength = SCROLLING_SPEED;
    const choiceListScrollTop = this.element.scrollTop;
    let continueAnimation = false;
    if (direction > 0) {
      this._scrollDown(choiceListScrollTop, strength, destination);
      if (choiceListScrollTop < destination) {
        continueAnimation = true;
      }
    } else {
      this._scrollUp(choiceListScrollTop, strength, destination);
      if (choiceListScrollTop > destination) {
        continueAnimation = true;
      }
    }
    if (continueAnimation) {
      requestAnimationFrame(() => {
        this._animateScroll(destination, direction);
      });
    }
  }
};

// src/scripts/components/wrapped-element.ts
var WrappedElement = class {
  element;
  classNames;
  isDisabled;
  constructor({ element, classNames }) {
    this.element = element;
    this.classNames = classNames;
    if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
      throw new TypeError("Invalid element passed");
    }
    this.isDisabled = false;
  }
  get isActive() {
    return this.element.dataset.choice === "active";
  }
  get dir() {
    return this.element.dir;
  }
  get value() {
    return this.element.value;
  }
  set value(value) {
    this.element.value = value;
  }
  conceal() {
    this.element.classList.add(this.classNames.input);
    this.element.hidden = true;
    this.element.tabIndex = -1;
    const origStyle = this.element.getAttribute("style");
    if (origStyle) {
      this.element.setAttribute("data-choice-orig-style", origStyle);
    }
    this.element.setAttribute("data-choice", "active");
  }
  reveal() {
    this.element.classList.remove(this.classNames.input);
    this.element.hidden = false;
    this.element.removeAttribute("tabindex");
    const origStyle = this.element.getAttribute("data-choice-orig-style");
    if (origStyle) {
      this.element.removeAttribute("data-choice-orig-style");
      this.element.setAttribute("style", origStyle);
    } else {
      this.element.removeAttribute("style");
    }
    this.element.removeAttribute("data-choice");
    this.element.value = this.element.value;
  }
  enable() {
    this.element.removeAttribute("disabled");
    this.element.disabled = false;
    this.isDisabled = false;
  }
  disable() {
    this.element.setAttribute("disabled", "");
    this.element.disabled = true;
    this.isDisabled = true;
  }
  triggerEvent(eventType, data) {
    dispatchEvent(this.element, eventType, data);
  }
};

// src/scripts/components/wrapped-input.ts
var WrappedInput = class extends WrappedElement {
  element;
  delimiter;
  constructor({
    element,
    classNames,
    delimiter
  }) {
    super({ element, classNames });
    this.delimiter = delimiter;
  }
  get value() {
    return this.element.value;
  }
  set value(value) {
    this.element.setAttribute("value", value);
    this.element.value = value;
  }
};

// src/scripts/components/wrapped-select.ts
var WrappedSelect = class extends WrappedElement {
  element;
  classNames;
  template;
  constructor({
    element,
    classNames,
    template
  }) {
    super({ element, classNames });
    this.template = template;
  }
  get placeholderOption() {
    return this.element.querySelector('option[value=""]') || this.element.querySelector("option[placeholder]");
  }
  get optionGroups() {
    return Array.from(this.element.getElementsByTagName("OPTGROUP"));
  }
  get options() {
    return Array.from(this.element.options);
  }
  set options(options) {
    const fragment = document.createDocumentFragment();
    const addOptionToFragment = (data) => {
      const option = this.template(data);
      fragment.appendChild(option);
    };
    options.forEach((optionData) => addOptionToFragment(optionData));
    this.appendDocFragment(fragment);
  }
  appendDocFragment(fragment) {
    this.element.innerHTML = "";
    this.element.appendChild(fragment);
  }
};

// src/scripts/defaults.ts
var DEFAULT_CLASSNAMES = {
  containerOuter: "choices",
  containerInner: "choices__inner",
  input: "choices__input",
  inputCloned: "choices__input--cloned",
  list: "choices__list",
  listItems: "choices__list--multiple",
  listSingle: "choices__list--single",
  listDropdown: "choices__list--dropdown",
  item: "choices__item",
  itemSelectable: "choices__item--selectable",
  itemDisabled: "choices__item--disabled",
  itemChoice: "choices__item--choice",
  placeholder: "choices__placeholder",
  group: "choices__group",
  groupHeading: "choices__heading",
  button: "choices__button",
  activeState: "is-active",
  focusState: "is-focused",
  openState: "is-open",
  disabledState: "is-disabled",
  highlightedState: "is-highlighted",
  selectedState: "is-selected",
  flippedState: "is-flipped",
  loadingState: "is-loading",
  noResults: "has-no-results",
  noChoices: "has-no-choices"
};
var DEFAULT_CONFIG = {
  items: [],
  choices: [],
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  addItems: true,
  addItemFilter: null,
  removeItems: true,
  removeItemButton: false,
  editItems: false,
  allowHTML: true,
  duplicateItemsAllowed: true,
  delimiter: ",",
  paste: true,
  searchEnabled: true,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 4,
  searchFields: ["label", "value"],
  position: "auto",
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  sorter: sortByAlpha,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: "auto",
  loadingText: "Loading...",
  noResultsText: "No results found",
  noChoicesText: "No choices to choose from",
  itemSelectText: "Press to select",
  uniqueItemText: "Only unique values can be added",
  customAddItemText: "Only values matching specific conditions can be added",
  addItemText: (value) => `Press Enter to add <b>"${sanitise(value)}"</b>`,
  maxItemText: (maxItemCount) => `Only ${maxItemCount} values can be added`,
  valueComparer: (value1, value2) => value1 === value2,
  fuseOptions: {
    includeScore: true
  },
  labelId: "",
  callbackOnInit: null,
  callbackOnCreateTemplates: null,
  classNames: DEFAULT_CLASSNAMES
};

// node_modules/redux/es/redux.js
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  var type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  var constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  var typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(false ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(false ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error(false ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(false ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(false ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }
    if (typeof action.type === "undefined") {
      throw new Error(false ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (isDispatching) {
      throw new Error(false ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(false ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(false ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + ' has unexpected type of "' + kindOf(inputState) + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }
  var unexpectedKeys = Object.keys(inputState).filter(function(key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function(key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? "keys" : "key") + " " + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer = reducers[key];
    var initialState = reducer(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(false ? formatProdErrorMessage(12) : 'The slice reducer for key "' + key + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(false ? formatProdErrorMessage(13) : 'The slice reducer for key "' + key + '" returned undefined when probed with a random type. ' + ("Don't try to handle '" + ActionTypes.INIT + `' or other actions in "redux/*" `) + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (true) {
      if (typeof reducers[key] === "undefined") {
        warning('No reducer provided for key "' + key + '"');
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;
  if (true) {
    unexpectedKeyCache = {};
  }
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        var actionType = action && action.type;
        throw new Error(false ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? '"' + String(actionType) + '"' : "(unknown type)") + ', the slice reducer for key "' + _key + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.');
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function isCrushed() {
}
if (typeof isCrushed.name === "string" && isCrushed.name !== "isCrushed") {
  warning('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.');
}

// src/scripts/reducers/items.ts
var defaultState = [];
function items(state = defaultState, action = {}) {
  switch (action.type) {
    case "ADD_ITEM": {
      const addItemAction = action;
      const newState = [
        ...state,
        {
          id: addItemAction.id,
          choiceId: addItemAction.choiceId,
          groupId: addItemAction.groupId,
          value: addItemAction.value,
          label: addItemAction.label,
          active: true,
          highlighted: false,
          customProperties: addItemAction.customProperties,
          placeholder: addItemAction.placeholder || false,
          keyCode: null
        }
      ];
      return newState.map((obj) => {
        const item = obj;
        item.highlighted = false;
        return item;
      });
    }
    case "REMOVE_ITEM": {
      return state.map((obj) => {
        const item = obj;
        if (item.id === action.id) {
          item.active = false;
        }
        return item;
      });
    }
    case "HIGHLIGHT_ITEM": {
      const highlightItemAction = action;
      return state.map((obj) => {
        const item = obj;
        if (item.id === highlightItemAction.id) {
          item.highlighted = highlightItemAction.highlighted;
        }
        return item;
      });
    }
    default: {
      return state;
    }
  }
}

// src/scripts/reducers/groups.ts
var defaultState2 = [];
function groups(state = defaultState2, action = {}) {
  switch (action.type) {
    case "ADD_GROUP": {
      const addGroupAction = action;
      return [
        ...state,
        {
          id: addGroupAction.id,
          value: addGroupAction.value,
          active: addGroupAction.active,
          disabled: addGroupAction.disabled
        }
      ];
    }
    case "CLEAR_CHOICES": {
      return [];
    }
    default: {
      return state;
    }
  }
}

// src/scripts/reducers/choices.ts
var defaultState3 = [];
function choices(state = defaultState3, action = {}) {
  switch (action.type) {
    case "ADD_CHOICE": {
      const addChoiceAction = action;
      const choice = {
        id: addChoiceAction.id,
        elementId: addChoiceAction.elementId,
        groupId: addChoiceAction.groupId,
        value: addChoiceAction.value,
        label: addChoiceAction.label || addChoiceAction.value,
        disabled: addChoiceAction.disabled || false,
        selected: false,
        active: true,
        score: 9999,
        customProperties: addChoiceAction.customProperties,
        placeholder: addChoiceAction.placeholder || false
      };
      return [...state, choice];
    }
    case "ADD_ITEM": {
      const addItemAction = action;
      if (addItemAction.choiceId > -1) {
        return state.map((obj) => {
          const choice = obj;
          if (choice.id === parseInt(`${addItemAction.choiceId}`, 10)) {
            choice.selected = true;
          }
          return choice;
        });
      }
      return state;
    }
    case "REMOVE_ITEM": {
      const removeItemAction = action;
      if (removeItemAction.choiceId && removeItemAction.choiceId > -1) {
        return state.map((obj) => {
          const choice = obj;
          if (choice.id === parseInt(`${removeItemAction.choiceId}`, 10)) {
            choice.selected = false;
          }
          return choice;
        });
      }
      return state;
    }
    case "FILTER_CHOICES": {
      const filterChoicesAction = action;
      return state.map((obj) => {
        const choice = obj;
        choice.active = filterChoicesAction.results.some(({ item, score }) => {
          if (item.id === choice.id) {
            choice.score = score;
            return true;
          }
          return false;
        });
        return choice;
      });
    }
    case "ACTIVATE_CHOICES": {
      const activateChoicesAction = action;
      return state.map((obj) => {
        const choice = obj;
        choice.active = activateChoicesAction.active;
        return choice;
      });
    }
    case "CLEAR_CHOICES": {
      return defaultState3;
    }
    default: {
      return state;
    }
  }
}

// src/scripts/reducers/loading.ts
var defaultState4 = false;
var general = (state = defaultState4, action = {}) => {
  switch (action.type) {
    case "SET_IS_LOADING": {
      return action.isLoading;
    }
    default: {
      return state;
    }
  }
};
var loading_default = general;

// src/scripts/reducers/index.ts
var defaultState5 = {
  groups: [],
  items: [],
  choices: [],
  loading: false
};
var appReducer = combineReducers({
  items,
  groups,
  choices,
  loading: loading_default
});
var rootReducer = (passedState, action) => {
  let state = passedState;
  if (action.type === "CLEAR_ALL") {
    state = defaultState5;
  } else if (action.type === "RESET_TO") {
    return cloneObject(action.state);
  }
  return appReducer(state, action);
};
var reducers_default = rootReducer;

// src/scripts/store/store.ts
var Store = class {
  _store;
  constructor() {
    this._store = createStore(
      reducers_default,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  subscribe(onChange) {
    this._store.subscribe(onChange);
  }
  dispatch(action) {
    this._store.dispatch(action);
  }
  get state() {
    return this._store.getState();
  }
  get items() {
    return this.state.items;
  }
  get activeItems() {
    return this.items.filter((item) => item.active === true);
  }
  get highlightedActiveItems() {
    return this.items.filter((item) => item.active && item.highlighted);
  }
  get choices() {
    return this.state.choices;
  }
  get activeChoices() {
    return this.choices.filter((choice) => choice.active === true);
  }
  get selectableChoices() {
    return this.choices.filter((choice) => choice.disabled !== true);
  }
  get searchableChoices() {
    return this.selectableChoices.filter(
      (choice) => choice.placeholder !== true
    );
  }
  get placeholderChoice() {
    return [...this.choices].reverse().find((choice) => choice.placeholder === true);
  }
  get groups() {
    return this.state.groups;
  }
  get activeGroups() {
    const { groups: groups2, choices: choices2 } = this;
    return groups2.filter((group) => {
      const isActive = group.active === true && group.disabled === false;
      const hasActiveOptions = choices2.some(
        (choice) => choice.active === true && choice.disabled === false
      );
      return isActive && hasActiveOptions;
    }, []);
  }
  isLoading() {
    return this.state.loading;
  }
  getChoiceById(id) {
    return this.activeChoices.find((choice) => choice.id === parseInt(id, 10));
  }
  getGroupById(id) {
    return this.groups.find((group) => group.id === id);
  }
};

// src/scripts/templates.ts
var templates = {
  containerOuter({ classNames: { containerOuter } }, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
    const div = Object.assign(document.createElement("div"), {
      className: containerOuter
    });
    div.dataset.type = passedElementType;
    if (dir) {
      div.dir = dir;
    }
    if (isSelectOneElement) {
      div.tabIndex = 0;
    }
    if (isSelectElement) {
      div.setAttribute("role", searchEnabled ? "combobox" : "listbox");
      if (searchEnabled) {
        div.setAttribute("aria-autocomplete", "list");
      }
    }
    div.setAttribute("aria-haspopup", "true");
    div.setAttribute("aria-expanded", "false");
    if (labelId) {
      div.setAttribute("aria-labelledby", labelId);
    }
    return div;
  },
  containerInner({
    classNames: { containerInner }
  }) {
    return Object.assign(document.createElement("div"), {
      className: containerInner
    });
  },
  itemList({ classNames: { list, listSingle, listItems } }, isSelectOneElement) {
    return Object.assign(document.createElement("div"), {
      className: `${list} ${isSelectOneElement ? listSingle : listItems}`
    });
  },
  placeholder({ allowHTML, classNames: { placeholder } }, value) {
    return Object.assign(document.createElement("div"), {
      className: placeholder,
      [allowHTML ? "innerHTML" : "innerText"]: value
    });
  },
  item({
    allowHTML,
    classNames: {
      item,
      button,
      highlightedState,
      itemSelectable,
      placeholder
    }
  }, {
    id,
    value,
    label,
    customProperties,
    active,
    disabled,
    highlighted,
    placeholder: isPlaceholder
  }, removeItemButton) {
    const div = Object.assign(document.createElement("div"), {
      className: item,
      [allowHTML ? "innerHTML" : "innerText"]: label
    });
    Object.assign(div.dataset, {
      item: "",
      id,
      value,
      customProperties
    });
    if (active) {
      div.setAttribute("aria-selected", "true");
    }
    if (disabled) {
      div.setAttribute("aria-disabled", "true");
    }
    if (isPlaceholder) {
      div.classList.add(placeholder);
    }
    div.classList.add(highlighted ? highlightedState : itemSelectable);
    if (removeItemButton) {
      if (disabled) {
        div.classList.remove(itemSelectable);
      }
      div.dataset.deletable = "";
      const REMOVE_ITEM_TEXT = "Remove item";
      const removeButton = Object.assign(document.createElement("button"), {
        type: "button",
        className: button,
        [allowHTML ? "innerHTML" : "innerText"]: REMOVE_ITEM_TEXT
      });
      removeButton.setAttribute(
        "aria-label",
        `${REMOVE_ITEM_TEXT}: '${value}'`
      );
      removeButton.dataset.button = "";
      div.appendChild(removeButton);
    }
    return div;
  },
  choiceList({ classNames: { list } }, isSelectOneElement) {
    const div = Object.assign(document.createElement("div"), {
      className: list
    });
    if (!isSelectOneElement) {
      div.setAttribute("aria-multiselectable", "true");
    }
    div.setAttribute("role", "listbox");
    return div;
  },
  choiceGroup({
    allowHTML,
    classNames: { group, groupHeading, itemDisabled }
  }, { id, value, disabled }) {
    const div = Object.assign(document.createElement("div"), {
      className: `${group} ${disabled ? itemDisabled : ""}`
    });
    div.setAttribute("role", "group");
    Object.assign(div.dataset, {
      group: "",
      id,
      value
    });
    if (disabled) {
      div.setAttribute("aria-disabled", "true");
    }
    div.appendChild(
      Object.assign(document.createElement("div"), {
        className: groupHeading,
        [allowHTML ? "innerHTML" : "innerText"]: value
      })
    );
    return div;
  },
  choice({
    allowHTML,
    classNames: {
      item,
      itemChoice,
      itemSelectable,
      selectedState,
      itemDisabled,
      placeholder
    }
  }, {
    id,
    value,
    label,
    groupId,
    elementId,
    disabled: isDisabled,
    selected: isSelected,
    placeholder: isPlaceholder
  }, selectText) {
    const div = Object.assign(document.createElement("div"), {
      id: elementId,
      [allowHTML ? "innerHTML" : "innerText"]: label,
      className: `${item} ${itemChoice}`
    });
    if (isSelected) {
      div.classList.add(selectedState);
    }
    if (isPlaceholder) {
      div.classList.add(placeholder);
    }
    div.setAttribute("role", groupId && groupId > 0 ? "treeitem" : "option");
    Object.assign(div.dataset, {
      choice: "",
      id,
      value,
      selectText
    });
    if (isDisabled) {
      div.classList.add(itemDisabled);
      div.dataset.choiceDisabled = "";
      div.setAttribute("aria-disabled", "true");
    } else {
      div.classList.add(itemSelectable);
      div.dataset.choiceSelectable = "";
    }
    return div;
  },
  input({ classNames: { input, inputCloned } }, placeholderValue) {
    const inp = Object.assign(document.createElement("input"), {
      type: "search",
      name: "search_terms",
      className: `${input} ${inputCloned}`,
      autocomplete: "off",
      autocapitalize: "off",
      spellcheck: false
    });
    inp.setAttribute("role", "textbox");
    inp.setAttribute("aria-autocomplete", "list");
    inp.setAttribute("aria-label", placeholderValue);
    return inp;
  },
  dropdown({
    classNames: { list, listDropdown }
  }) {
    const div = document.createElement("div");
    div.classList.add(list, listDropdown);
    div.setAttribute("aria-expanded", "false");
    return div;
  },
  notice({
    allowHTML,
    classNames: { item, itemChoice, noResults, noChoices }
  }, innerText, type = "") {
    const classes = [item, itemChoice];
    if (type === "no-choices") {
      classes.push(noChoices);
    } else if (type === "no-results") {
      classes.push(noResults);
    }
    return Object.assign(document.createElement("div"), {
      [allowHTML ? "innerHTML" : "innerText"]: innerText,
      className: classes.join(" ")
    });
  },
  option({
    label,
    value,
    customProperties,
    active,
    disabled
  }) {
    const opt = new Option(label, value, false, active);
    if (customProperties) {
      opt.dataset.customProperties = `${customProperties}`;
    }
    opt.disabled = !!disabled;
    return opt;
  }
};
var templates_default = templates;

// src/scripts/choices.ts
var IS_IE11 = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
var USER_DEFAULTS = {};
var Choices = class {
  static get defaults() {
    return Object.preventExtensions({
      get options() {
        return USER_DEFAULTS;
      },
      get templates() {
        return templates_default;
      }
    });
  }
  initialised;
  config;
  passedElement;
  containerOuter;
  containerInner;
  choiceList;
  itemList;
  input;
  dropdown;
  _isTextElement;
  _isSelectOneElement;
  _isSelectMultipleElement;
  _isSelectElement;
  _store;
  _templates;
  _initialState;
  _currentState;
  _prevState;
  _currentValue;
  _canSearch;
  _isScrollingOnIe;
  _highlightPosition;
  _wasTap;
  _isSearching;
  _placeholderValue;
  _baseId;
  _direction;
  _idNames;
  _presetGroups;
  _presetOptions;
  _presetChoices;
  _presetItems;
  constructor(element = "[data-choice]", userConfig = {}) {
    if (userConfig.allowHTML === void 0) {
      console.warn(
        "Deprecation warning: allowHTML will default to false in a future release. To render HTML in Choices, you will need to set it to true. Setting allowHTML will suppress this message."
      );
    }
    this.config = import_deepmerge.default.all(
      [DEFAULT_CONFIG, Choices.defaults.options, userConfig],
      { arrayMerge: (_, sourceArray) => [...sourceArray] }
    );
    const invalidConfigOptions = diff(this.config, DEFAULT_CONFIG);
    if (invalidConfigOptions.length) {
      console.warn(
        "Unknown config option(s) passed",
        invalidConfigOptions.join(", ")
      );
    }
    const passedElement = typeof element === "string" ? document.querySelector(element) : element;
    if (!(passedElement instanceof HTMLInputElement || passedElement instanceof HTMLSelectElement)) {
      throw TypeError(
        "Expected one of the following types text|select-one|select-multiple"
      );
    }
    this._isTextElement = passedElement.type === TEXT_TYPE;
    this._isSelectOneElement = passedElement.type === SELECT_ONE_TYPE;
    this._isSelectMultipleElement = passedElement.type === SELECT_MULTIPLE_TYPE;
    this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
    this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled;
    if (!["auto", "always"].includes(`${this.config.renderSelectedChoices}`)) {
      this.config.renderSelectedChoices = "auto";
    }
    if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== "function") {
      const re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
      this.config.addItemFilter = re.test.bind(re);
    }
    if (this._isTextElement) {
      this.passedElement = new WrappedInput({
        element: passedElement,
        classNames: this.config.classNames,
        delimiter: this.config.delimiter
      });
    } else {
      this.passedElement = new WrappedSelect({
        element: passedElement,
        classNames: this.config.classNames,
        template: (data) => this._templates.option(data)
      });
    }
    this.initialised = false;
    this._store = new Store();
    this._initialState = defaultState5;
    this._currentState = defaultState5;
    this._prevState = defaultState5;
    this._currentValue = "";
    this._canSearch = !!this.config.searchEnabled;
    this._isScrollingOnIe = false;
    this._highlightPosition = 0;
    this._wasTap = true;
    this._placeholderValue = this._generatePlaceholderValue();
    this._baseId = generateId(this.passedElement.element, "choices-");
    this._direction = this.passedElement.dir;
    if (!this._direction) {
      const { direction: elementDirection } = window.getComputedStyle(
        this.passedElement.element
      );
      const { direction: documentDirection } = window.getComputedStyle(
        document.documentElement
      );
      if (elementDirection !== documentDirection) {
        this._direction = elementDirection;
      }
    }
    this._idNames = {
      itemChoice: "item-choice"
    };
    if (this._isSelectElement) {
      this._presetGroups = this.passedElement.optionGroups;
      this._presetOptions = this.passedElement.options;
    }
    this._presetChoices = this.config.choices;
    this._presetItems = this.config.items;
    if (this.passedElement.value && this._isTextElement) {
      const splitValues = this.passedElement.value.split(
        this.config.delimiter
      );
      this._presetItems = this._presetItems.concat(splitValues);
    }
    if (this.passedElement.options) {
      this.passedElement.options.forEach((option) => {
        this._presetChoices.push({
          value: option.value,
          label: option.innerHTML,
          selected: !!option.selected,
          disabled: option.disabled || option.parentNode.disabled,
          placeholder: option.value === "" || option.hasAttribute("placeholder"),
          customProperties: parseCustomProperties(
            option.dataset.customProperties
          )
        });
      });
    }
    this._render = this._render.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
    this._onSelectKey = this._onSelectKey.bind(this);
    this._onEnterKey = this._onEnterKey.bind(this);
    this._onEscapeKey = this._onEscapeKey.bind(this);
    this._onDirectionKey = this._onDirectionKey.bind(this);
    this._onDeleteKey = this._onDeleteKey.bind(this);
    if (this.passedElement.isActive) {
      if (!this.config.silent) {
        console.warn(
          "Trying to initialise Choices on element already initialised",
          { element }
        );
      }
      this.initialised = true;
      return;
    }
    this.init();
  }
  init() {
    if (this.initialised) {
      return;
    }
    this._createTemplates();
    this._createElements();
    this._createStructure();
    this._store.subscribe(this._render);
    this._render();
    this._addEventListeners();
    const shouldDisable = !this.config.addItems || this.passedElement.element.hasAttribute("disabled");
    if (shouldDisable) {
      this.disable();
    }
    this.initialised = true;
    const { callbackOnInit } = this.config;
    if (callbackOnInit && typeof callbackOnInit === "function") {
      callbackOnInit.call(this);
    }
  }
  destroy() {
    if (!this.initialised) {
      return;
    }
    this._removeEventListeners();
    this.passedElement.reveal();
    this.containerOuter.unwrap(this.passedElement.element);
    this.clearStore();
    if (this._isSelectElement) {
      this.passedElement.options = this._presetOptions;
    }
    this._templates = templates_default;
    this.initialised = false;
  }
  enable() {
    if (this.passedElement.isDisabled) {
      this.passedElement.enable();
    }
    if (this.containerOuter.isDisabled) {
      this._addEventListeners();
      this.input.enable();
      this.containerOuter.enable();
    }
    return this;
  }
  disable() {
    if (!this.passedElement.isDisabled) {
      this.passedElement.disable();
    }
    if (!this.containerOuter.isDisabled) {
      this._removeEventListeners();
      this.input.disable();
      this.containerOuter.disable();
    }
    return this;
  }
  highlightItem(item, runEvent = true) {
    if (!item || !item.id) {
      return this;
    }
    const { id, groupId = -1, value = "", label = "" } = item;
    const group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
    this._store.dispatch(highlightItem(id, true));
    if (runEvent) {
      this.passedElement.triggerEvent(EVENTS.highlightItem, {
        id,
        value,
        label,
        groupValue: group && group.value ? group.value : null
      });
    }
    return this;
  }
  unhighlightItem(item) {
    if (!item || !item.id) {
      return this;
    }
    const { id, groupId = -1, value = "", label = "" } = item;
    const group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
    this._store.dispatch(highlightItem(id, false));
    this.passedElement.triggerEvent(EVENTS.highlightItem, {
      id,
      value,
      label,
      groupValue: group && group.value ? group.value : null
    });
    return this;
  }
  highlightAll() {
    this._store.items.forEach((item) => this.highlightItem(item));
    return this;
  }
  unhighlightAll() {
    this._store.items.forEach((item) => this.unhighlightItem(item));
    return this;
  }
  removeActiveItemsByValue(value) {
    this._store.activeItems.filter((item) => item.value === value).forEach((item) => this._removeItem(item));
    return this;
  }
  removeActiveItems(excludedId) {
    this._store.activeItems.filter(({ id }) => id !== excludedId).forEach((item) => this._removeItem(item));
    return this;
  }
  removeHighlightedItems(runEvent = false) {
    this._store.highlightedActiveItems.forEach((item) => {
      this._removeItem(item);
      if (runEvent) {
        this._triggerChange(item.value);
      }
    });
    return this;
  }
  showDropdown(preventInputFocus) {
    if (this.dropdown.isActive) {
      return this;
    }
    requestAnimationFrame(() => {
      this.dropdown.show();
      this.containerOuter.open(this.dropdown.distanceFromTopWindow);
      if (!preventInputFocus && this._canSearch) {
        this.input.focus();
      }
      this.passedElement.triggerEvent(EVENTS.showDropdown, {});
    });
    return this;
  }
  hideDropdown(preventInputBlur) {
    if (!this.dropdown.isActive) {
      return this;
    }
    requestAnimationFrame(() => {
      this.dropdown.hide();
      this.containerOuter.close();
      if (!preventInputBlur && this._canSearch) {
        this.input.removeActiveDescendant();
        this.input.blur();
      }
      this.passedElement.triggerEvent(EVENTS.hideDropdown, {});
    });
    return this;
  }
  getValue(valueOnly = false) {
    const values = this._store.activeItems.reduce(
      (selectedItems, item) => {
        const itemValue = valueOnly ? item.value : item;
        selectedItems.push(itemValue);
        return selectedItems;
      },
      []
    );
    return this._isSelectOneElement ? values[0] : values;
  }
  setValue(items2) {
    if (!this.initialised) {
      return this;
    }
    items2.forEach((value) => this._setChoiceOrItem(value));
    return this;
  }
  setChoiceByValue(value) {
    if (!this.initialised || this._isTextElement) {
      return this;
    }
    const choiceValue = Array.isArray(value) ? value : [value];
    choiceValue.forEach((val) => this._findAndSelectChoiceByValue(val));
    return this;
  }
  setChoices(choicesArrayOrFetcher = [], value = "value", label = "label", replaceChoices = false) {
    if (!this.initialised) {
      throw new ReferenceError(
        `setChoices was called on a non-initialized instance of Choices`
      );
    }
    if (!this._isSelectElement) {
      throw new TypeError(`setChoices can't be used with INPUT based Choices`);
    }
    if (typeof value !== "string" || !value) {
      throw new TypeError(
        `value parameter must be a name of 'value' field in passed objects`
      );
    }
    if (replaceChoices) {
      this.clearChoices();
    }
    if (typeof choicesArrayOrFetcher === "function") {
      const fetcher = choicesArrayOrFetcher(this);
      if (typeof Promise === "function" && fetcher instanceof Promise) {
        return new Promise((resolve) => requestAnimationFrame(resolve)).then(() => this._handleLoadingState(true)).then(() => fetcher).then(
          (data) => this.setChoices(data, value, label, replaceChoices)
        ).catch((err) => {
          if (!this.config.silent) {
            console.error(err);
          }
        }).then(() => this._handleLoadingState(false)).then(() => this);
      }
      if (!Array.isArray(fetcher)) {
        throw new TypeError(
          `.setChoices first argument function must return either array of choices or Promise, got: ${typeof fetcher}`
        );
      }
      return this.setChoices(fetcher, value, label, false);
    }
    if (!Array.isArray(choicesArrayOrFetcher)) {
      throw new TypeError(
        `.setChoices must be called either with array of choices with a function resulting into Promise of array of choices`
      );
    }
    this.containerOuter.removeLoadingState();
    this._startLoading();
    choicesArrayOrFetcher.forEach((groupOrChoice) => {
      if (groupOrChoice.choices) {
        this._addGroup({
          id: groupOrChoice.id ? parseInt(`${groupOrChoice.id}`, 10) : null,
          group: groupOrChoice,
          valueKey: value,
          labelKey: label
        });
      } else {
        const choice = groupOrChoice;
        this._addChoice({
          value: choice[value],
          label: choice[label],
          isSelected: !!choice.selected,
          isDisabled: !!choice.disabled,
          placeholder: !!choice.placeholder,
          customProperties: choice.customProperties
        });
      }
    });
    this._stopLoading();
    return this;
  }
  clearChoices() {
    this._store.dispatch(clearChoices());
    return this;
  }
  clearStore() {
    this._store.dispatch(clearAll());
    return this;
  }
  clearInput() {
    const shouldSetInputWidth = !this._isSelectOneElement;
    this.input.clear(shouldSetInputWidth);
    if (!this._isTextElement && this._canSearch) {
      this._isSearching = false;
      this._store.dispatch(activateChoices(true));
    }
    return this;
  }
  _render() {
    if (this._store.isLoading()) {
      return;
    }
    this._currentState = this._store.state;
    const stateChanged = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items;
    const shouldRenderChoices = this._isSelectElement;
    const shouldRenderItems = this._currentState.items !== this._prevState.items;
    if (!stateChanged) {
      return;
    }
    if (shouldRenderChoices) {
      this._renderChoices();
    }
    if (shouldRenderItems) {
      this._renderItems();
    }
    this._prevState = this._currentState;
  }
  _renderChoices() {
    const { activeGroups, activeChoices } = this._store;
    let choiceListFragment = document.createDocumentFragment();
    this.choiceList.clear();
    if (this.config.resetScrollPosition) {
      requestAnimationFrame(() => this.choiceList.scrollToTop());
    }
    if (activeGroups.length >= 1 && !this._isSearching) {
      const activePlaceholders = activeChoices.filter(
        (activeChoice) => activeChoice.placeholder === true && activeChoice.groupId === -1
      );
      if (activePlaceholders.length >= 1) {
        choiceListFragment = this._createChoicesFragment(
          activePlaceholders,
          choiceListFragment
        );
      }
      choiceListFragment = this._createGroupsFragment(
        activeGroups,
        activeChoices,
        choiceListFragment
      );
    } else if (activeChoices.length >= 1) {
      choiceListFragment = this._createChoicesFragment(
        activeChoices,
        choiceListFragment
      );
    }
    if (choiceListFragment.childNodes && choiceListFragment.childNodes.length > 0) {
      const { activeItems } = this._store;
      const canAddItem = this._canAddItem(activeItems, this.input.value);
      if (canAddItem.response) {
        this.choiceList.append(choiceListFragment);
        this._highlightChoice();
      } else {
        const notice = this._getTemplate("notice", canAddItem.notice);
        this.choiceList.append(notice);
      }
    } else {
      let dropdownItem;
      let notice;
      if (this._isSearching) {
        notice = typeof this.config.noResultsText === "function" ? this.config.noResultsText() : this.config.noResultsText;
        dropdownItem = this._getTemplate("notice", notice, "no-results");
      } else {
        notice = typeof this.config.noChoicesText === "function" ? this.config.noChoicesText() : this.config.noChoicesText;
        dropdownItem = this._getTemplate("notice", notice, "no-choices");
      }
      this.choiceList.append(dropdownItem);
    }
  }
  _renderItems() {
    const activeItems = this._store.activeItems || [];
    this.itemList.clear();
    const itemListFragment = this._createItemsFragment(activeItems);
    if (itemListFragment.childNodes) {
      this.itemList.append(itemListFragment);
    }
  }
  _createGroupsFragment(groups2, choices2, fragment = document.createDocumentFragment()) {
    const getGroupChoices = (group) => choices2.filter((choice) => {
      if (this._isSelectOneElement) {
        return choice.groupId === group.id;
      }
      return choice.groupId === group.id && (this.config.renderSelectedChoices === "always" || !choice.selected);
    });
    if (this.config.shouldSort) {
      groups2.sort(this.config.sorter);
    }
    groups2.forEach((group) => {
      const groupChoices = getGroupChoices(group);
      if (groupChoices.length >= 1) {
        const dropdownGroup = this._getTemplate("choiceGroup", group);
        fragment.appendChild(dropdownGroup);
        this._createChoicesFragment(groupChoices, fragment, true);
      }
    });
    return fragment;
  }
  _createChoicesFragment(choices2, fragment = document.createDocumentFragment(), withinGroup = false) {
    const { renderSelectedChoices, searchResultLimit, renderChoiceLimit } = this.config;
    const filter = this._isSearching ? sortByScore : this.config.sorter;
    const appendChoice = (choice) => {
      const shouldRender = renderSelectedChoices === "auto" ? this._isSelectOneElement || !choice.selected : true;
      if (shouldRender) {
        const dropdownItem = this._getTemplate(
          "choice",
          choice,
          this.config.itemSelectText
        );
        fragment.appendChild(dropdownItem);
      }
    };
    let rendererableChoices = choices2;
    if (renderSelectedChoices === "auto" && !this._isSelectOneElement) {
      rendererableChoices = choices2.filter((choice) => !choice.selected);
    }
    const { placeholderChoices, normalChoices } = rendererableChoices.reduce(
      (acc, choice) => {
        if (choice.placeholder) {
          acc.placeholderChoices.push(choice);
        } else {
          acc.normalChoices.push(choice);
        }
        return acc;
      },
      {
        placeholderChoices: [],
        normalChoices: []
      }
    );
    if (this.config.shouldSort || this._isSearching) {
      normalChoices.sort(filter);
    }
    let choiceLimit = rendererableChoices.length;
    const sortedChoices = this._isSelectOneElement ? [...placeholderChoices, ...normalChoices] : normalChoices;
    if (this._isSearching) {
      choiceLimit = searchResultLimit;
    } else if (renderChoiceLimit && renderChoiceLimit > 0 && !withinGroup) {
      choiceLimit = renderChoiceLimit;
    }
    for (let i = 0; i < choiceLimit; i += 1) {
      if (sortedChoices[i]) {
        appendChoice(sortedChoices[i]);
      }
    }
    return fragment;
  }
  _createItemsFragment(items2, fragment = document.createDocumentFragment()) {
    const { shouldSortItems, sorter, removeItemButton } = this.config;
    if (shouldSortItems && !this._isSelectOneElement) {
      items2.sort(sorter);
    }
    if (this._isTextElement) {
      this.passedElement.value = items2.map(({ value }) => value).join(this.config.delimiter);
    } else {
      this.passedElement.options = items2;
    }
    const addItemToFragment = (item) => {
      const listItem = this._getTemplate("item", item, removeItemButton);
      fragment.appendChild(listItem);
    };
    items2.forEach(addItemToFragment);
    return fragment;
  }
  _triggerChange(value) {
    if (value === void 0 || value === null) {
      return;
    }
    this.passedElement.triggerEvent(EVENTS.change, {
      value
    });
  }
  _selectPlaceholderChoice(placeholderChoice) {
    this._addItem({
      value: placeholderChoice.value,
      label: placeholderChoice.label,
      choiceId: placeholderChoice.id,
      groupId: placeholderChoice.groupId,
      placeholder: placeholderChoice.placeholder
    });
    this._triggerChange(placeholderChoice.value);
  }
  _handleButtonAction(activeItems, element) {
    if (!activeItems || !element || !this.config.removeItems || !this.config.removeItemButton) {
      return;
    }
    const itemId = element.parentNode && element.parentNode.dataset.id;
    const itemToRemove = itemId && activeItems.find((item) => item.id === parseInt(itemId, 10));
    if (!itemToRemove) {
      return;
    }
    this._removeItem(itemToRemove);
    this._triggerChange(itemToRemove.value);
    if (this._isSelectOneElement && this._store.placeholderChoice) {
      this._selectPlaceholderChoice(this._store.placeholderChoice);
    }
  }
  _handleItemAction(activeItems, element, hasShiftKey = false) {
    if (!activeItems || !element || !this.config.removeItems || this._isSelectOneElement) {
      return;
    }
    const passedId = element.dataset.id;
    activeItems.forEach((item) => {
      if (item.id === parseInt(`${passedId}`, 10) && !item.highlighted) {
        this.highlightItem(item);
      } else if (!hasShiftKey && item.highlighted) {
        this.unhighlightItem(item);
      }
    });
    this.input.focus();
  }
  _handleChoiceAction(activeItems, element) {
    if (!activeItems || !element) {
      return;
    }
    const { id } = element.dataset;
    const choice = id && this._store.getChoiceById(id);
    if (!choice) {
      return;
    }
    const passedKeyCode = activeItems[0] && activeItems[0].keyCode ? activeItems[0].keyCode : void 0;
    const hasActiveDropdown = this.dropdown.isActive;
    choice.keyCode = passedKeyCode;
    this.passedElement.triggerEvent(EVENTS.choice, {
      choice
    });
    if (!choice.selected && !choice.disabled) {
      const canAddItem = this._canAddItem(activeItems, choice.value);
      if (canAddItem.response) {
        this._addItem({
          value: choice.value,
          label: choice.label,
          choiceId: choice.id,
          groupId: choice.groupId,
          customProperties: choice.customProperties,
          placeholder: choice.placeholder,
          keyCode: choice.keyCode
        });
        this._triggerChange(choice.value);
      }
    }
    this.clearInput();
    if (hasActiveDropdown && this._isSelectOneElement) {
      this.hideDropdown(true);
      this.containerOuter.focus();
    }
  }
  _handleBackspace(activeItems) {
    if (!this.config.removeItems || !activeItems) {
      return;
    }
    const lastItem = activeItems[activeItems.length - 1];
    const hasHighlightedItems = activeItems.some((item) => item.highlighted);
    if (this.config.editItems && !hasHighlightedItems && lastItem) {
      this.input.value = lastItem.value;
      this.input.setWidth();
      this._removeItem(lastItem);
      this._triggerChange(lastItem.value);
    } else {
      if (!hasHighlightedItems) {
        this.highlightItem(lastItem, false);
      }
      this.removeHighlightedItems(true);
    }
  }
  _startLoading() {
    this._store.dispatch(setIsLoading(true));
  }
  _stopLoading() {
    this._store.dispatch(setIsLoading(false));
  }
  _handleLoadingState(setLoading = true) {
    let placeholderItem = this.itemList.getChild(
      `.${this.config.classNames.placeholder}`
    );
    if (setLoading) {
      this.disable();
      this.containerOuter.addLoadingState();
      if (this._isSelectOneElement) {
        if (!placeholderItem) {
          placeholderItem = this._getTemplate(
            "placeholder",
            this.config.loadingText
          );
          if (placeholderItem) {
            this.itemList.append(placeholderItem);
          }
        } else {
          placeholderItem.innerHTML = this.config.loadingText;
        }
      } else {
        this.input.placeholder = this.config.loadingText;
      }
    } else {
      this.enable();
      this.containerOuter.removeLoadingState();
      if (this._isSelectOneElement) {
        if (placeholderItem) {
          placeholderItem.innerHTML = this._placeholderValue || "";
        }
      } else {
        this.input.placeholder = this._placeholderValue || "";
      }
    }
  }
  _handleSearch(value) {
    if (!this.input.isFocussed) {
      return;
    }
    const { choices: choices2 } = this._store;
    const { searchFloor, searchChoices } = this.config;
    const hasUnactiveChoices = choices2.some((option) => !option.active);
    if (value !== null && typeof value !== "undefined" && value.length >= searchFloor) {
      const resultCount = searchChoices ? this._searchChoices(value) : 0;
      this.passedElement.triggerEvent(EVENTS.search, {
        value,
        resultCount
      });
    } else if (hasUnactiveChoices) {
      this._isSearching = false;
      this._store.dispatch(activateChoices(true));
    }
  }
  _canAddItem(activeItems, value) {
    let canAddItem = true;
    let notice = typeof this.config.addItemText === "function" ? this.config.addItemText(value) : this.config.addItemText;
    if (!this._isSelectOneElement) {
      const isDuplicateValue = existsInArray(activeItems, value);
      if (this.config.maxItemCount > 0 && this.config.maxItemCount <= activeItems.length) {
        canAddItem = false;
        notice = typeof this.config.maxItemText === "function" ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText;
      }
      if (!this.config.duplicateItemsAllowed && isDuplicateValue && canAddItem) {
        canAddItem = false;
        notice = typeof this.config.uniqueItemText === "function" ? this.config.uniqueItemText(value) : this.config.uniqueItemText;
      }
      if (this._isTextElement && this.config.addItems && canAddItem && typeof this.config.addItemFilter === "function" && !this.config.addItemFilter(value)) {
        canAddItem = false;
        notice = typeof this.config.customAddItemText === "function" ? this.config.customAddItemText(value) : this.config.customAddItemText;
      }
    }
    return {
      response: canAddItem,
      notice
    };
  }
  _searchChoices(value) {
    const newValue = typeof value === "string" ? value.trim() : value;
    const currentValue = typeof this._currentValue === "string" ? this._currentValue.trim() : this._currentValue;
    if (newValue.length < 1 && newValue === `${currentValue} `) {
      return 0;
    }
    const haystack = this._store.searchableChoices;
    const needle = newValue;
    const options = Object.assign(this.config.fuseOptions, {
      keys: [...this.config.searchFields],
      includeMatches: true
    });
    const fuse = new Fuse(haystack, options);
    const results = fuse.search(needle);
    this._currentValue = newValue;
    this._highlightPosition = 0;
    this._isSearching = true;
    this._store.dispatch(filterChoices(results));
    return results.length;
  }
  _addEventListeners() {
    const { documentElement } = document;
    documentElement.addEventListener("touchend", this._onTouchEnd, true);
    this.containerOuter.element.addEventListener(
      "keydown",
      this._onKeyDown,
      true
    );
    this.containerOuter.element.addEventListener(
      "mousedown",
      this._onMouseDown,
      true
    );
    documentElement.addEventListener("click", this._onClick, { passive: true });
    documentElement.addEventListener("touchmove", this._onTouchMove, {
      passive: true
    });
    this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
      passive: true
    });
    if (this._isSelectOneElement) {
      this.containerOuter.element.addEventListener("focus", this._onFocus, {
        passive: true
      });
      this.containerOuter.element.addEventListener("blur", this._onBlur, {
        passive: true
      });
    }
    this.input.element.addEventListener("keyup", this._onKeyUp, {
      passive: true
    });
    this.input.element.addEventListener("focus", this._onFocus, {
      passive: true
    });
    this.input.element.addEventListener("blur", this._onBlur, {
      passive: true
    });
    if (this.input.element.form) {
      this.input.element.form.addEventListener("reset", this._onFormReset, {
        passive: true
      });
    }
    this.input.addEventListeners();
  }
  _removeEventListeners() {
    const { documentElement } = document;
    documentElement.removeEventListener("touchend", this._onTouchEnd, true);
    this.containerOuter.element.removeEventListener(
      "keydown",
      this._onKeyDown,
      true
    );
    this.containerOuter.element.removeEventListener(
      "mousedown",
      this._onMouseDown,
      true
    );
    documentElement.removeEventListener("click", this._onClick);
    documentElement.removeEventListener("touchmove", this._onTouchMove);
    this.dropdown.element.removeEventListener("mouseover", this._onMouseOver);
    if (this._isSelectOneElement) {
      this.containerOuter.element.removeEventListener("focus", this._onFocus);
      this.containerOuter.element.removeEventListener("blur", this._onBlur);
    }
    this.input.element.removeEventListener("keyup", this._onKeyUp);
    this.input.element.removeEventListener("focus", this._onFocus);
    this.input.element.removeEventListener("blur", this._onBlur);
    if (this.input.element.form) {
      this.input.element.form.removeEventListener("reset", this._onFormReset);
    }
    this.input.removeEventListeners();
  }
  _onKeyDown(event) {
    const { keyCode } = event;
    const { activeItems } = this._store;
    const hasFocusedInput = this.input.isFocussed;
    const hasActiveDropdown = this.dropdown.isActive;
    const hasItems = this.itemList.hasChildren();
    const keyString = String.fromCharCode(keyCode);
    const wasPrintableChar = /[^\x00-\x1F]/.test(keyString);
    const {
      BACK_KEY,
      DELETE_KEY,
      ENTER_KEY,
      A_KEY,
      ESC_KEY,
      UP_KEY,
      DOWN_KEY,
      PAGE_UP_KEY,
      PAGE_DOWN_KEY
    } = KEY_CODES;
    if (!this._isTextElement && !hasActiveDropdown && wasPrintableChar) {
      this.showDropdown();
      if (!this.input.isFocussed) {
        this.input.value += event.key.toLowerCase();
      }
    }
    switch (keyCode) {
      case A_KEY:
        return this._onSelectKey(event, hasItems);
      case ENTER_KEY:
        return this._onEnterKey(event, activeItems, hasActiveDropdown);
      case ESC_KEY:
        return this._onEscapeKey(hasActiveDropdown);
      case UP_KEY:
      case PAGE_UP_KEY:
      case DOWN_KEY:
      case PAGE_DOWN_KEY:
        return this._onDirectionKey(event, hasActiveDropdown);
      case DELETE_KEY:
      case BACK_KEY:
        return this._onDeleteKey(event, activeItems, hasFocusedInput);
      default:
    }
  }
  _onKeyUp({
    target,
    keyCode
  }) {
    const { value } = this.input;
    const { activeItems } = this._store;
    const canAddItem = this._canAddItem(activeItems, value);
    const { BACK_KEY: backKey, DELETE_KEY: deleteKey } = KEY_CODES;
    if (this._isTextElement) {
      const canShowDropdownNotice = canAddItem.notice && value;
      if (canShowDropdownNotice) {
        const dropdownItem = this._getTemplate("notice", canAddItem.notice);
        this.dropdown.element.innerHTML = dropdownItem.outerHTML;
        this.showDropdown(true);
      } else {
        this.hideDropdown(true);
      }
    } else {
      const wasRemovalKeyCode = keyCode === backKey || keyCode === deleteKey;
      const userHasRemovedValue = wasRemovalKeyCode && target && !target.value;
      const canReactivateChoices = !this._isTextElement && this._isSearching;
      const canSearch = this._canSearch && canAddItem.response;
      if (userHasRemovedValue && canReactivateChoices) {
        this._isSearching = false;
        this._store.dispatch(activateChoices(true));
      } else if (canSearch) {
        this._handleSearch(this.input.rawValue);
      }
    }
    this._canSearch = this.config.searchEnabled;
  }
  _onSelectKey(event, hasItems) {
    const { ctrlKey, metaKey } = event;
    const hasCtrlDownKeyPressed = ctrlKey || metaKey;
    if (hasCtrlDownKeyPressed && hasItems) {
      this._canSearch = false;
      const shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
      if (shouldHightlightAll) {
        this.highlightAll();
      }
    }
  }
  _onEnterKey(event, activeItems, hasActiveDropdown) {
    const { target } = event;
    const { ENTER_KEY: enterKey } = KEY_CODES;
    const targetWasButton = target && target.hasAttribute("data-button");
    if (this._isTextElement && target && target.value) {
      const { value } = this.input;
      const canAddItem = this._canAddItem(activeItems, value);
      if (canAddItem.response) {
        this.hideDropdown(true);
        this._addItem({ value });
        this._triggerChange(value);
        this.clearInput();
      }
    }
    if (targetWasButton) {
      this._handleButtonAction(activeItems, target);
      event.preventDefault();
    }
    if (hasActiveDropdown) {
      const highlightedChoice = this.dropdown.getChild(
        `.${this.config.classNames.highlightedState}`
      );
      if (highlightedChoice) {
        if (activeItems[0]) {
          activeItems[0].keyCode = enterKey;
        }
        this._handleChoiceAction(activeItems, highlightedChoice);
      }
      event.preventDefault();
    } else if (this._isSelectOneElement) {
      this.showDropdown();
      event.preventDefault();
    }
  }
  _onEscapeKey(hasActiveDropdown) {
    if (hasActiveDropdown) {
      this.hideDropdown(true);
      this.containerOuter.focus();
    }
  }
  _onDirectionKey(event, hasActiveDropdown) {
    const { keyCode, metaKey } = event;
    const {
      DOWN_KEY: downKey,
      PAGE_UP_KEY: pageUpKey,
      PAGE_DOWN_KEY: pageDownKey
    } = KEY_CODES;
    if (hasActiveDropdown || this._isSelectOneElement) {
      this.showDropdown();
      this._canSearch = false;
      const directionInt = keyCode === downKey || keyCode === pageDownKey ? 1 : -1;
      const skipKey = metaKey || keyCode === pageDownKey || keyCode === pageUpKey;
      const selectableChoiceIdentifier = "[data-choice-selectable]";
      let nextEl;
      if (skipKey) {
        if (directionInt > 0) {
          nextEl = this.dropdown.element.querySelector(
            `${selectableChoiceIdentifier}:last-of-type`
          );
        } else {
          nextEl = this.dropdown.element.querySelector(
            selectableChoiceIdentifier
          );
        }
      } else {
        const currentEl = this.dropdown.element.querySelector(
          `.${this.config.classNames.highlightedState}`
        );
        if (currentEl) {
          nextEl = getAdjacentEl(
            currentEl,
            selectableChoiceIdentifier,
            directionInt
          );
        } else {
          nextEl = this.dropdown.element.querySelector(
            selectableChoiceIdentifier
          );
        }
      }
      if (nextEl) {
        if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) {
          this.choiceList.scrollToChildElement(nextEl, directionInt);
        }
        this._highlightChoice(nextEl);
      }
      event.preventDefault();
    }
  }
  _onDeleteKey(event, activeItems, hasFocusedInput) {
    const { target } = event;
    if (!this._isSelectOneElement && !target.value && hasFocusedInput) {
      this._handleBackspace(activeItems);
      event.preventDefault();
    }
  }
  _onTouchMove() {
    if (this._wasTap) {
      this._wasTap = false;
    }
  }
  _onTouchEnd(event) {
    const { target } = event || event.touches[0];
    const touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
    if (touchWasWithinContainer) {
      const containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
      if (containerWasExactTarget) {
        if (this._isTextElement) {
          this.input.focus();
        } else if (this._isSelectMultipleElement) {
          this.showDropdown();
        }
      }
      event.stopPropagation();
    }
    this._wasTap = true;
  }
  _onMouseDown(event) {
    const { target } = event;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (IS_IE11 && this.choiceList.element.contains(target)) {
      const firstChoice = this.choiceList.element.firstElementChild;
      const isOnScrollbar = this._direction === "ltr" ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
      this._isScrollingOnIe = isOnScrollbar;
    }
    if (target === this.input.element) {
      return;
    }
    const item = target.closest("[data-button],[data-item],[data-choice]");
    if (item instanceof HTMLElement) {
      const hasShiftKey = event.shiftKey;
      const { activeItems } = this._store;
      const { dataset } = item;
      if ("button" in dataset) {
        this._handleButtonAction(activeItems, item);
      } else if ("item" in dataset) {
        this._handleItemAction(activeItems, item, hasShiftKey);
      } else if ("choice" in dataset) {
        this._handleChoiceAction(activeItems, item);
      }
    }
    event.preventDefault();
  }
  _onMouseOver({ target }) {
    if (target instanceof HTMLElement && "choice" in target.dataset) {
      this._highlightChoice(target);
    }
  }
  _onClick({ target }) {
    const clickWasWithinContainer = this.containerOuter.element.contains(
      target
    );
    if (clickWasWithinContainer) {
      if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
        if (this._isTextElement) {
          if (document.activeElement !== this.input.element) {
            this.input.focus();
          }
        } else {
          this.showDropdown();
          this.containerOuter.focus();
        }
      } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
        this.hideDropdown();
      }
    } else {
      const hasHighlightedItems = this._store.highlightedActiveItems.length > 0;
      if (hasHighlightedItems) {
        this.unhighlightAll();
      }
      this.containerOuter.removeFocusState();
      this.hideDropdown(true);
    }
  }
  _onFocus({ target }) {
    const focusWasWithinContainer = target && this.containerOuter.element.contains(target);
    if (!focusWasWithinContainer) {
      return;
    }
    const focusActions = {
      [TEXT_TYPE]: () => {
        if (target === this.input.element) {
          this.containerOuter.addFocusState();
        }
      },
      [SELECT_ONE_TYPE]: () => {
        this.containerOuter.addFocusState();
        if (target === this.input.element) {
          this.showDropdown(true);
        }
      },
      [SELECT_MULTIPLE_TYPE]: () => {
        if (target === this.input.element) {
          this.showDropdown(true);
          this.containerOuter.addFocusState();
        }
      }
    };
    focusActions[this.passedElement.element.type]();
  }
  _onBlur({ target }) {
    const blurWasWithinContainer = target && this.containerOuter.element.contains(target);
    if (blurWasWithinContainer && !this._isScrollingOnIe) {
      const { activeItems } = this._store;
      const hasHighlightedItems = activeItems.some((item) => item.highlighted);
      const blurActions = {
        [TEXT_TYPE]: () => {
          if (target === this.input.element) {
            this.containerOuter.removeFocusState();
            if (hasHighlightedItems) {
              this.unhighlightAll();
            }
            this.hideDropdown(true);
          }
        },
        [SELECT_ONE_TYPE]: () => {
          this.containerOuter.removeFocusState();
          if (target === this.input.element || target === this.containerOuter.element && !this._canSearch) {
            this.hideDropdown(true);
          }
        },
        [SELECT_MULTIPLE_TYPE]: () => {
          if (target === this.input.element) {
            this.containerOuter.removeFocusState();
            this.hideDropdown(true);
            if (hasHighlightedItems) {
              this.unhighlightAll();
            }
          }
        }
      };
      blurActions[this.passedElement.element.type]();
    } else {
      this._isScrollingOnIe = false;
      this.input.element.focus();
    }
  }
  _onFormReset() {
    this._store.dispatch(resetTo(this._initialState));
  }
  _highlightChoice(el = null) {
    const choices2 = Array.from(
      this.dropdown.element.querySelectorAll("[data-choice-selectable]")
    );
    if (!choices2.length) {
      return;
    }
    let passedEl = el;
    const highlightedChoices = Array.from(
      this.dropdown.element.querySelectorAll(
        `.${this.config.classNames.highlightedState}`
      )
    );
    highlightedChoices.forEach((choice) => {
      choice.classList.remove(this.config.classNames.highlightedState);
      choice.setAttribute("aria-selected", "false");
    });
    if (passedEl) {
      this._highlightPosition = choices2.indexOf(passedEl);
    } else {
      if (choices2.length > this._highlightPosition) {
        passedEl = choices2[this._highlightPosition];
      } else {
        passedEl = choices2[choices2.length - 1];
      }
      if (!passedEl) {
        passedEl = choices2[0];
      }
    }
    passedEl.classList.add(this.config.classNames.highlightedState);
    passedEl.setAttribute("aria-selected", "true");
    this.passedElement.triggerEvent(EVENTS.highlightChoice, { el: passedEl });
    if (this.dropdown.isActive) {
      this.input.setActiveDescendant(passedEl.id);
      this.containerOuter.setActiveDescendant(passedEl.id);
    }
  }
  _addItem({
    value,
    label = null,
    choiceId = -1,
    groupId = -1,
    customProperties = {},
    placeholder = false,
    keyCode = -1
  }) {
    let passedValue = typeof value === "string" ? value.trim() : value;
    const { items: items2 } = this._store;
    const passedLabel = label || passedValue;
    const passedOptionId = choiceId || -1;
    const group = groupId >= 0 ? this._store.getGroupById(groupId) : null;
    const id = items2 ? items2.length + 1 : 1;
    if (this.config.prependValue) {
      passedValue = this.config.prependValue + passedValue.toString();
    }
    if (this.config.appendValue) {
      passedValue += this.config.appendValue.toString();
    }
    this._store.dispatch(
      addItem({
        value: passedValue,
        label: passedLabel,
        id,
        choiceId: passedOptionId,
        groupId,
        customProperties,
        placeholder,
        keyCode
      })
    );
    if (this._isSelectOneElement) {
      this.removeActiveItems(id);
    }
    this.passedElement.triggerEvent(EVENTS.addItem, {
      id,
      value: passedValue,
      label: passedLabel,
      customProperties,
      groupValue: group && group.value ? group.value : null,
      keyCode
    });
  }
  _removeItem(item) {
    const { id, value, label, customProperties, choiceId, groupId } = item;
    const group = groupId && groupId >= 0 ? this._store.getGroupById(groupId) : null;
    if (!id || !choiceId) {
      return;
    }
    this._store.dispatch(removeItem(id, choiceId));
    this.passedElement.triggerEvent(EVENTS.removeItem, {
      id,
      value,
      label,
      customProperties,
      groupValue: group && group.value ? group.value : null
    });
  }
  _addChoice({
    value,
    label = null,
    isSelected = false,
    isDisabled = false,
    groupId = -1,
    customProperties = {},
    placeholder = false,
    keyCode = -1
  }) {
    if (typeof value === "undefined" || value === null) {
      return;
    }
    const { choices: choices2 } = this._store;
    const choiceLabel = label || value;
    const choiceId = choices2 ? choices2.length + 1 : 1;
    const choiceElementId = `${this._baseId}-${this._idNames.itemChoice}-${choiceId}`;
    this._store.dispatch(
      addChoice({
        id: choiceId,
        groupId,
        elementId: choiceElementId,
        value,
        label: choiceLabel,
        disabled: isDisabled,
        customProperties,
        placeholder,
        keyCode
      })
    );
    if (isSelected) {
      this._addItem({
        value,
        label: choiceLabel,
        choiceId,
        customProperties,
        placeholder,
        keyCode
      });
    }
  }
  _addGroup({ group, id, valueKey = "value", labelKey = "label" }) {
    const groupChoices = isType("Object", group) ? group.choices : Array.from(group.getElementsByTagName("OPTION"));
    const groupId = id || Math.floor(new Date().valueOf() * Math.random());
    const isDisabled = group.disabled ? group.disabled : false;
    if (groupChoices) {
      this._store.dispatch(
        addGroup({
          value: group.label,
          id: groupId,
          active: true,
          disabled: isDisabled
        })
      );
      const addGroupChoices = (choice) => {
        const isOptDisabled = choice.disabled || choice.parentNode && choice.parentNode.disabled;
        this._addChoice({
          value: choice[valueKey],
          label: isType("Object", choice) ? choice[labelKey] : choice.innerHTML,
          isSelected: choice.selected,
          isDisabled: isOptDisabled,
          groupId,
          customProperties: choice.customProperties,
          placeholder: choice.placeholder
        });
      };
      groupChoices.forEach(addGroupChoices);
    } else {
      this._store.dispatch(
        addGroup({
          value: group.label,
          id: group.id,
          active: false,
          disabled: group.disabled
        })
      );
    }
  }
  _getTemplate(template, ...args) {
    return this._templates[template].call(this, this.config, ...args);
  }
  _createTemplates() {
    const { callbackOnCreateTemplates } = this.config;
    let userTemplates = {};
    if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === "function") {
      userTemplates = callbackOnCreateTemplates.call(this, strToEl);
    }
    this._templates = (0, import_deepmerge.default)(templates_default, userTemplates);
  }
  _createElements() {
    this.containerOuter = new Container({
      element: this._getTemplate(
        "containerOuter",
        this._direction,
        this._isSelectElement,
        this._isSelectOneElement,
        this.config.searchEnabled,
        this.passedElement.element.type,
        this.config.labelId
      ),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.containerInner = new Container({
      element: this._getTemplate("containerInner"),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      position: this.config.position
    });
    this.input = new Input({
      element: this._getTemplate("input", this._placeholderValue),
      classNames: this.config.classNames,
      type: this.passedElement.element.type,
      preventPaste: !this.config.paste
    });
    this.choiceList = new List({
      element: this._getTemplate("choiceList", this._isSelectOneElement)
    });
    this.itemList = new List({
      element: this._getTemplate("itemList", this._isSelectOneElement)
    });
    this.dropdown = new Dropdown({
      element: this._getTemplate("dropdown"),
      classNames: this.config.classNames,
      type: this.passedElement.element.type
    });
  }
  _createStructure() {
    this.passedElement.conceal();
    this.containerInner.wrap(this.passedElement.element);
    this.containerOuter.wrap(this.containerInner.element);
    if (this._isSelectOneElement) {
      this.input.placeholder = this.config.searchPlaceholderValue || "";
    } else if (this._placeholderValue) {
      this.input.placeholder = this._placeholderValue;
      this.input.setWidth();
    }
    this.containerOuter.element.appendChild(this.containerInner.element);
    this.containerOuter.element.appendChild(this.dropdown.element);
    this.containerInner.element.appendChild(this.itemList.element);
    if (!this._isTextElement) {
      this.dropdown.element.appendChild(this.choiceList.element);
    }
    if (!this._isSelectOneElement) {
      this.containerInner.element.appendChild(this.input.element);
    } else if (this.config.searchEnabled) {
      this.dropdown.element.insertBefore(
        this.input.element,
        this.dropdown.element.firstChild
      );
    }
    if (this._isSelectElement) {
      this._highlightPosition = 0;
      this._isSearching = false;
      this._startLoading();
      if (this._presetGroups.length) {
        this._addPredefinedGroups(this._presetGroups);
      } else {
        this._addPredefinedChoices(this._presetChoices);
      }
      this._stopLoading();
    }
    if (this._isTextElement) {
      this._addPredefinedItems(this._presetItems);
    }
  }
  _addPredefinedGroups(groups2) {
    const placeholderChoice = this.passedElement.placeholderOption;
    if (placeholderChoice && placeholderChoice.parentNode && placeholderChoice.parentNode.tagName === "SELECT") {
      this._addChoice({
        value: placeholderChoice.value,
        label: placeholderChoice.innerHTML,
        isSelected: placeholderChoice.selected,
        isDisabled: placeholderChoice.disabled,
        placeholder: true
      });
    }
    groups2.forEach(
      (group) => this._addGroup({
        group,
        id: group.id || null
      })
    );
  }
  _addPredefinedChoices(choices2) {
    if (this.config.shouldSort) {
      choices2.sort(this.config.sorter);
    }
    const hasSelectedChoice = choices2.some((choice) => choice.selected);
    const firstEnabledChoiceIndex = choices2.findIndex(
      (choice) => choice.disabled === void 0 || !choice.disabled
    );
    choices2.forEach((choice, index) => {
      const { value = "", label, customProperties, placeholder } = choice;
      if (this._isSelectElement) {
        if (choice.choices) {
          this._addGroup({
            group: choice,
            id: choice.id || null
          });
        } else {
          const shouldPreselect = this._isSelectOneElement && !hasSelectedChoice && index === firstEnabledChoiceIndex;
          const isSelected = shouldPreselect ? true : choice.selected;
          const isDisabled = choice.disabled;
          this._addChoice({
            value,
            label,
            isSelected: !!isSelected,
            isDisabled: !!isDisabled,
            placeholder: !!placeholder,
            customProperties
          });
        }
      } else {
        this._addChoice({
          value,
          label,
          isSelected: !!choice.selected,
          isDisabled: !!choice.disabled,
          placeholder: !!choice.placeholder,
          customProperties
        });
      }
    });
  }
  _addPredefinedItems(items2) {
    items2.forEach((item) => {
      if (typeof item === "object" && item.value) {
        this._addItem({
          value: item.value,
          label: item.label,
          choiceId: item.id,
          customProperties: item.customProperties,
          placeholder: item.placeholder
        });
      }
      if (typeof item === "string") {
        this._addItem({
          value: item
        });
      }
    });
  }
  _setChoiceOrItem(item) {
    const itemType = getType(item).toLowerCase();
    const handleType = {
      object: () => {
        if (!item.value) {
          return;
        }
        if (!this._isTextElement) {
          this._addChoice({
            value: item.value,
            label: item.label,
            isSelected: true,
            isDisabled: false,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        } else {
          this._addItem({
            value: item.value,
            label: item.label,
            choiceId: item.id,
            customProperties: item.customProperties,
            placeholder: item.placeholder
          });
        }
      },
      string: () => {
        if (!this._isTextElement) {
          this._addChoice({
            value: item,
            label: item,
            isSelected: true,
            isDisabled: false
          });
        } else {
          this._addItem({
            value: item
          });
        }
      }
    };
    handleType[itemType]();
  }
  _findAndSelectChoiceByValue(value) {
    const { choices: choices2 } = this._store;
    const foundChoice = choices2.find(
      (choice) => this.config.valueComparer(choice.value, value)
    );
    if (foundChoice && !foundChoice.selected) {
      this._addItem({
        value: foundChoice.value,
        label: foundChoice.label,
        choiceId: foundChoice.id,
        groupId: foundChoice.groupId,
        customProperties: foundChoice.customProperties,
        placeholder: foundChoice.placeholder,
        keyCode: foundChoice.keyCode
      });
    }
  }
  _generatePlaceholderValue() {
    if (this._isSelectElement && this.passedElement.placeholderOption) {
      const { placeholderOption } = this.passedElement;
      return placeholderOption ? placeholderOption.text : null;
    }
    const { placeholder, placeholderValue } = this.config;
    const {
      element: { dataset }
    } = this.passedElement;
    if (placeholder) {
      if (placeholderValue) {
        return placeholderValue;
      }
      if (dataset.placeholder) {
        return dataset.placeholder;
      }
    }
    return null;
  }
};
var choices_default = Choices;

// src/index.ts
var src_default = choices_default;
export {
  ACTION_TYPES,
  DEFAULT_CLASSNAMES,
  DEFAULT_CONFIG,
  EVENTS,
  KEY_CODES,
  SCROLLING_SPEED,
  SELECT_MULTIPLE_TYPE,
  SELECT_ONE_TYPE,
  TEXT_TYPE,
  src_default as default,
  templates_default as templates
};
//# sourceMappingURL=choices.esm.js.map
