'use strict';

const assert = require('assert');

const tests = shortenStack => {
    const dir = process.cwd();

    const empty = shortenStack(dir, '');
    assert.equal(empty, '');

    const error = new Error('Test error');
    const { stack } = error;
    const short = shortenStack(dir, stack);

    assert(error instanceof Error);
    assert(typeof short === 'string');
    assert(typeof stack === 'string');
    assert(stack.includes(dir));
    assert(!short.includes(dir));
    assert.equal(stack.split('\n')[0], short.split('\n')[0]);
    assert.equal(stack.split('\n').length, short.split('\n').length);

    const notInc = shortenStack('/unknown/path', stack);
    assert.equal(notInc, stack);

    const nmStack = `Error: Test error
        at Object.<anonymous> (/home/toresto/Refactoring/3-run.js:1:11)
        at Module._compile (internal/modules/cjs/loader.js:955:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:991:10)
        at Module.load (internal/modules/cjs/loader.js:811:32)
        at Function.Module._load (internal/modules/cjs/loader.js:723:14)
        at Function.Module.runMain (internal/modules/cjs/loader.js:1043:10)
        at internal/main/run_main_module.js:17:11`;
    const nmShort = shortenStack('/home/toresto/Refactoring', nmStack);
    const nmExpected = `Error: Test error
        at Object.<anonymous> (/3-run.js:1:11)
        at Module._compile (internal/modules/cjs/loader.js:955:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:991:10)
        at Module.load (internal/modules/cjs/loader.js:811:32)
        at Function.Module._load (internal/modules/cjs/loader.js:723:14)
        at Function.Module.runMain (internal/modules/cjs/loader.js:1043:10)
        at internal/main/run_main_module.js:17:11`;
    assert.equal(nmShort, nmExpected); 
};

module.exports = { tests };