"use strict";var applySourceMap=require("vinyl-sourcemaps-apply"),isObject=require("lodash/fp/isObject"),defaultsDeep=require("lodash/fp/defaultsDeep"),createError=require("./create-error");module.exports=function(e,r){return function(t){return function(a){var n=function(e){return e&&!isObject(e)&&(r.warn("gulp-uglify expects an object, non-object provided"),e={}),defaultsDeep({output:{}},e)}(t||{}),o=Boolean(a.sourceMap);if(a.isNull())return a;if(a.isStream())throw createError(a,"Streaming not supported",null);o&&(n.sourceMap={filename:a.sourceMap.file,includeSources:!0},a.sourceMap.mappings&&(n.sourceMap.content=a.sourceMap));var u={};u[a.relative]=String(a.contents);var i=e.minify(u,n);if(!i||i.error)throw createError(a,"unable to minify JavaScript",i&&i.error);if(i.warnings&&i.warnings.forEach(function(e){r.warn("gulp-uglify [%s]: %s",a.relative,e)}),a.contents=new Buffer(i.code),o){var c=JSON.parse(i.map);applySourceMap(a,c)}return a}}};