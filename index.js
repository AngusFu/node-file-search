#!/usr/bin/env node
var fs = require('fs');

/**
 * 读取文件 返回 Promise 对象
 */
var readFile = function(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};


/**
 * 读取文件夹
 */
var readDir = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(error, files) {
            if (error) reject(error);
            resolve(files);
        });
    });
};


/**
 * 文件或者路径状态
 */
var fileStat = function (path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(error, stats) {
            if (error) reject(error);
            resolve(stats);
        });
    });
};


function walk(path, handleFile) {
    handleFile(path);

    readDir(path).then(function (files) {
        files.forEach(function(item) {
            var tmpPath = path + '/' + item;

            fileStat(tmpPath).then(function (stats) {
                if (stats.isDirectory()) {
                    return walk(tmpPath, handleFile);
                }
                return handleFile(tmpPath);
            });
        });
    }).catch(function (err) {
         console.log(err);
    });
}


function handleFile(path, targetString, ignoreCase) {
    targetString = ignoreCase ? targetString.toLowerCase() : targetString;

    fileStat(path).then(function (stats) {
        if (!stats.isFile()) return;

        readFile(path).then(function (data) {
            var str = data.toString();
            str = ignoreCase && str.toLowerCase() || str;
            path = ignoreCase && path.toLowerCase() || path;

            if (!!~str.indexOf(targetString)) {
                console.log('[---]: %s', path);
            }
            if (!!~path.indexOf(targetString)) {
                console.log('[dir]: %s', path);
            }
        });
    }).catch(function (err) {
         console.log(err);
    });
}



var args = process.argv.slice(2);

var path = args[0];
var keyword = args[1];
var ignoreCase = !!args[2];

walk(path, function (path) {
    handleFile(path, keyword, ignoreCase);
});
