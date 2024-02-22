'use strict';

function MyArrayProto() {
    this.flat = function (depth=1) {
        // debugger;
        let result = new MyArray();
        if (this.length === 0 || depth <= 0) {
            return this;
        }
        for (let i = 0; i < this.length; i++) {
            if (MyArray.isMyArray(this[i])) {
                result = result.concat(this[i].flat(depth-1));
            } else {
                result.push(this[i]);
            }
        }
        return result;
    }

    // methods from classwork.
	this.push = function () {
		if (arguments) {
			for (let i = 0; i < arguments.length; i++) {
				this[this.length++] = arguments[i];
			}
		}
		return this.length;
	};
	this.forEach = function (fn) {
		for (let i = 0; i < this.length; i++) {
			fn(this[i], i, this);
		}
	};
	this.concat = function (...args) {
		const res = new MyArray();
        this.forEach(el => {
            res.push(el)
        })
		for (let i = 0; i < args.length; i++) {
			if (Array.isArray(args[i])) {
				res.push(...args[i]);
			} else if (MyArray.isMyArray(args[i])) {
				for (let j = 0; j < args[i].length; j++) {
					res.push(args[i][j]);
				}
			} else {
				res.push(args[i]);
			}
		}
		return res;
	};
}

function MyArray(...args) {
    this.length = 0;

    if (args) {
        for (let i = 0; i < args.length; i++) {
            this[this.length++] = args[i];
        }
    }
}

MyArray.prototype = new MyArrayProto;

MyArray.isMyArray = function(item) {
    return item instanceof MyArray;
}

const innerNumbers2 = new MyArray(8,9);
const innerNumbers = new MyArray(5,6,7, innerNumbers2);
const numbers = new MyArray(1,2,3,4,innerNumbers);

console.log(numbers.flat(1));
console.log(numbers.flat(2));