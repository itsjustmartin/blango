// third party side or lib (Promise Construction)
const lazyAdd = function (a, b) {
  const doAdd = (resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number") {
      reject("a and b must both be numbers")
    } else {
      const sum = a + b
      resolve(sum)
    }
  }

  return new Promise(doAdd)
}
//---------------------
// Executing side (Executing Promises)
function resolvedCallback(data) {
  console.log('Resolved with data ' +  data)
}

function rejectedCallback(message) {
  console.log('Rejected with message ' + message)
}

const p = lazyAdd(3, 4)
// p is a Promise instance that has not yet been settled
// There will be no console output at this point.

// This next line will settle the doAdd function
p.then(resolvedCallback, rejectedCallback)
// There will be some console output now

lazyAdd("nan", "alsonan").then(resolvedCallback, rejectedCallback)