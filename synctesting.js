let valueA = "1";
let log = console.log;

log('Sync Log '+valueA);

let p1 = new Promise(function(resolve, reject) {
    valueA = "2";
    log('Sync Log '+valueA+" - PromiseArray1 Declaration");
    setTimeout(function() {
        log('Async Timeout 15 ticks - PromiseArray1 Resolved');
        resolve("Array 1 Result!");

    }, 15);
});

setTimeout(function() {
    log('Async Timeout 0 ticks (1)');
}, 0);

valueA = "3"
log('Sync Log '+valueA);

setTimeout(function() {
    log('Async Timeout 10 ticks');
}, 10);

let p = new Promise( function(resolve, reject){
    valueA = "4"
    log('Sync Log '+valueA+" - SoloPromise Declaration");
    setTimeout(function () {
        log("Async Timeout 0 Ticks (2) - SoloPromise Resolved")
        resolve("Solo Promise!");
    }, 0);
});

let p2 = new Promise(function(resolve, reject) {
    valueA = "5";
    log('Sync Log '+valueA+" - PromiseArray2 Declaration/Resolved");
    resolve("Array 2 Result");
});

log('Sync Log 6 - Resolved PromiseArray2')
log(p2);

p.then(function(val) {
    log("Async SoloPromise Then")
    log(val)
})

log('Sync Log 7 - Unresolved SoloPromise')
log(p);

let p3 = new Promise(function(resolve, reject) {
    valueA = "8";
    log('Sync Log '+valueA+" - PromiseArray3 Declaration");
    setTimeout(function() {
        log('Async Timeout 0 ticks (3) - PromiseArray3 Resolved');
        resolve("Array 3 Result!");

    }, 0);
});

let pf = new Promise(function(resolve, reject) {
    valueA = "9";
    log('Sync Log '+valueA+" - FailedPromise Declaration/Result");
    reject('Rejection :(')
});

Promise.race([p1,p2,p3,pf])
    .then((result) => {
    log("Async PromiseRace Then");
    log(result);
})
    .catch((result) => {
        log("Async PromiseRace Catch");
        log(result);
    });

Promise.all([p1,p2,p3]).then((resultsArray) => {
    log("Async PromiseAll Then");
    log(resultsArray[0]);
    log(resultsArray[1]);
    log(resultsArray[2]);
})

setTimeout(function() {
    log("Async Timeout 0 ticks (4)")
    log(p);
}, 0);