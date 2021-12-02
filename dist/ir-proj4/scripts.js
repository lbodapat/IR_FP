/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;/*!
  * Bootstrap v4.0.0-beta.2 (https://getbootstrap.com)
  * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
var bootstrap = (function (exports,$,Popper) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;
Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function () {
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */
  var transition = false;
  var MAX_UID = 1000000;
  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend' // shoutout AngusCroll (https://goo.gl/pxwQGp)

  };

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (typeof el.style[name] !== 'undefined') {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();
    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(document).find(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    }
  };
  setTransitionEndSupport();
  return Util;
}($);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var inheritsLoose = _inheritsLoose;

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'alert';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // getters


    var _proto = Alert.prototype;

    // public
    _proto.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // private


    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    }; // static


    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'button';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event = {
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // getters


    var _proto = Button.prototype;

    // public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // static


    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'carousel';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event = {
    SLIDE: "slide" + EVENT_KEY,
    SLID: "slid" + EVENT_KEY,
    KEYDOWN: "keydown" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY,
    TOUCHEND: "touchend" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };
  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    } // getters


    var _proto = Carousel.prototype;

    // public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    }; // private


    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });

        if ('ontouchstart' in document.documentElement) {
          // if it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $(this._element).on(Event.TOUCHEND, function () {
            _this2.pause();

            if (_this2.touchTimeout) {
              clearTimeout(_this2.touchTimeout);
            }

            _this2.touchTimeout = setTimeout(function (event) {
              return _this2.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
          });
        }
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
          return;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);

      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this3 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
          $(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this3._isSliding = false;
          setTimeout(function () {
            return $(_this3._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    }; // static


    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = $.extend({}, Default, $(this).data());

        if (typeof config === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new Error("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'collapse';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var Default = {
    toggle: true,
    parent: ''
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event = {
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var tabToggles = $(Selector.DATA_TOGGLE);

      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);

        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // getters


    var _proto = Collapse.prototype;

    // public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));

        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $(selector);

            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    }; // private


    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent = null;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // it's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = $(this._config.parent)[0];
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    }; // static


    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function () {
  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'dropdown';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };
  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };
  var Default = {
    offset: 0,
    flip: true
  };
  var DefaultType = {
    offset: '(number|string|function)',
    flip: 'boolean'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // getters


    var _proto = Dropdown.prototype;

    // public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      var element = this._element; // for dropup with alignment we use the parent as popper container

      if ($(parent).hasClass(ClassName.DROPUP)) {
        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
          element = parent;
        }
      }

      this._popper = new Popper(element, this._menu, this._getPopperConfig()); // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
        $('body').children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }; // private


    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        this._menu = $(parent).find(Selector.MENU)[0];
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element).parent();
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var _this2 = this;

      var offsetConf = {};

      if (typeof this._config.offset === 'function') {
        offsetConf.fn = function (data) {
          data.offsets = $.extend({}, data.offsets, _this2._config.offset(data.offsets) || {});
          return data;
        };
      } else {
        offsetConf.offset = this._config.offset;
      }

      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: offsetConf,
          flip: {
            enabled: this._config.flip
          }
        } // Disable Popper.js for Dropdown in Navbar

      };

      if (this._inNavbar) {
        popperConfig.modifiers.applyStyle = {
          enabled: !this._inNavbar
        };
      }

      return popperConfig;
    }; // static


    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}($, Popper);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'modal';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    RESIZE: "resize" + EVENT_KEY,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    } // getters


    var _proto = Modal.prototype;

    // public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isTransitioning || this._isShown) {
        return;
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var hideEvent = $.Event(Event.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);
      $(this._element).removeClass(ClassName.SHOW);
      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(window, document, this._element, this._backdrop).off(EVENT_KEY);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    }; // private


    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && !$(_this4._element).has(event.target).length) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    }; // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------


    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        // Adjust fixed content padding
        $(Selector.FIXED_CONTENT).each(function (index, element) {
          var actualPadding = $(element)[0].style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(Selector.STICKY_CONTENT).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust navbar-toggler margin

        $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $('body').css('padding-right');
        $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      $(Selector.FIXED_CONTENT).each(function (index, element) {
        var padding = $(element).data('padding-right');

        if (typeof padding !== 'undefined') {
          $(element).css('padding-right', padding).removeData('padding-right');
        }
      }); // Restore sticky content and navbar-toggler margin

      $(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $('body').data('padding-right');

      if (typeof padding !== 'undefined') {
        $('body').css('padding-right', padding).removeData('padding-right');
      }
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    }; // static


    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function () {
  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap tooltips require Popper.js (https://popper.js.org)');
  }
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'tooltip';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)'
  };
  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip'
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
  };
  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // getters


    var _proto = Tooltip.prototype;

    // public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);
        var container = this.config.container === false ? document.body : $(this.config.container);
        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: {
              offset: this.config.offset
            },
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector.ARROW
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName.SHOW); // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $('body').children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW); // if this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $('body').children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    }; // protected


    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement());
      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;

      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    }; // private


    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
            return _this3.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
          $(_this3.element).on(eventIn, _this3.config.selector, function (event) {
            return _this3._enter(event);
          }).on(eventOut, _this3.config.selector, function (event) {
            return _this3._leave(event);
          });
        }

        $(_this3.element).closest('.modal').on('hide.bs.modal', function () {
          return _this3.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(data.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    }; // static


    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}($, Popper);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'popover';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });
  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });
  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    INSERTED: "inserted" + EVENT_KEY,
    CLICK: "click" + EVENT_KEY,
    FOCUSIN: "focusin" + EVENT_KEY,
    FOCUSOUT: "focusout" + EVENT_KEY,
    MOUSEENTER: "mouseenter" + EVENT_KEY,
    MOUSELEAVE: "mouseleave" + EVENT_KEY
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // we use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());
      $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
    }; // private


    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    }; // static


    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    createClass(Popover, null, [{
      key: "VERSION",
      // getters
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);
    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'scrollspy';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event = {
    ACTIVATE: "activate" + EVENT_KEY,
    SCROLL: "scroll" + EVENT_KEY,
    LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // getters


    var _proto = ScrollSpy.prototype;

    // public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = $.makeArray($(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    }; // private


    _proto._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


      queries = queries.map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
      });
      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    }; // static


    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);
    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function () {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tab';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // getters


    var _proto = Tab.prototype;

    // public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    }; // private


    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements;

      if (container.nodeName === 'UL') {
        activeElements = $(container).find(Selector.ACTIVE_UL);
      } else {
        activeElements = $(container).children(Selector.ACTIVE);
      }

      var active = activeElements[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];

        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }; // static


    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);
    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}($);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(function () {
  if (typeof $ === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
  }

  var version = $.fn.jquery.split(' ')[0].split('.');
  var minMajor = 1;
  var ltMajor = 2;
  var minMinor = 9;
  var minPatch = 1;
  var maxMajor = 4;

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
  }
})($);

exports.Util = Util;
exports.Alert = Alert;
exports.Button = Button;
exports.Carousel = Carousel;
exports.Collapse = Collapse;
exports.Dropdown = Dropdown;
exports.Modal = Modal;
exports.Popover = Popover;
exports.Scrollspy = ScrollSpy;
exports.Tab = Tab;
exports.Tooltip = Tooltip;

return exports;

}({},$,Popper));
//# sourceMappingURL=bootstrap.js.map

;/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Popper = factory());
}(this, (function () { 'use strict';

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

return Popper;

})));
//# sourceMappingURL=popper.js.map

;(function(){var a="' of type ",l="SCRIPT",p="Uneven number of arguments",q="array",t="function",aa="google.charts.load",ba="hasOwnProperty",u="number",v="object",x="pre-45",ca="propertyIsEnumerable",y="string",da="text/javascript",ea="toLocaleString";function A(){return function(b){return b}}function B(){return function(){}}function D(b){return function(){return this[b]}}function E(b){return function(){return b}}var F,G=G||{};G.scope={};
G.Tk=function(b){var c=0;return function(){return c<b.length?{done:!1,value:b[c++]}:{done:!0}}};G.Sk=function(b){return{next:G.Tk(b)}};G.Dd=function(b){var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return c?c.call(b):G.Sk(b)};G.Rk=function(b){for(var c,d=[];!(c=b.next()).done;)d.push(c.value);return d};G.ve=function(b){return b instanceof Array?b:G.Rk(G.Dd(b))};
G.$t=function(b,c,d){b instanceof String&&(b=String(b));for(var e=b.length,f=0;f<e;f++){var g=b[f];if(c.call(d,g,f,b))return{Bm:f,Oo:g}}return{Bm:-1,Oo:void 0}};G.Aj=!1;G.hp=!1;G.ip=!1;G.Nr=!1;G.defineProperty=G.Aj||typeof Object.defineProperties==t?Object.defineProperty:function(b,c,d){b!=Array.prototype&&b!=Object.prototype&&(b[c]=d.value)};G.fm=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};G.global=G.fm(this);
G.Pc=function(b,c){if(c){var d=G.global;b=b.split(".");for(var e=0;e<b.length-1;e++){var f=b[e];f in d||(d[f]={});d=d[f]}b=b[b.length-1];e=d[b];c=c(e);c!=e&&null!=c&&G.defineProperty(d,b,{configurable:!0,writable:!0,value:c})}};G.Rg=function(b,c,d){if(null==b)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return b+""};
G.Pc("String.prototype.repeat",function(b){return b?b:function(c){var d=G.Rg(this,null,"repeat");if(0>c||1342177279<c)throw new RangeError("Invalid count value");c|=0;for(var e="";c;)if(c&1&&(e+=d),c>>>=1)d+=d;return e}});G.$j=!1;
G.Pc("Promise",function(b){function c(k){this.qa=g.$a;this.Ia=void 0;this.ic=[];var m=this.De();try{k(m.resolve,m.reject)}catch(n){m.reject(n)}}function d(){this.pb=null}function e(k){return k instanceof c?k:new c(function(m){m(k)})}if(b&&!G.$j)return b;d.prototype.Ig=function(k){if(null==this.pb){this.pb=[];var m=this;this.Jg(function(){m.Ol()})}this.pb.push(k)};var f=G.global.setTimeout;d.prototype.Jg=function(k){f(k,0)};d.prototype.Ol=function(){for(;this.pb&&this.pb.length;){var k=this.pb;this.pb=
[];for(var m=0;m<k.length;++m){var n=k[m];k[m]=null;try{n()}catch(r){this.el(r)}}}this.pb=null};d.prototype.el=function(k){this.Jg(function(){throw k;})};var g={$a:0,nb:1,Ja:2};c.prototype.De=function(){function k(r){return function(w){n||(n=!0,r.call(m,w))}}var m=this,n=!1;return{resolve:k(this.Qn),reject:k(this.sf)}};c.prototype.Qn=function(k){if(k===this)this.sf(new TypeError("A Promise cannot resolve to itself"));else if(k instanceof c)this.no(k);else{a:switch(typeof k){case v:var m=null!=k;break a;
case t:m=!0;break a;default:m=!1}m?this.Pn(k):this.qh(k)}};c.prototype.Pn=function(k){var m=void 0;try{m=k.then}catch(n){this.sf(n);return}typeof m==t?this.oo(m,k):this.qh(k)};c.prototype.sf=function(k){this.aj(g.Ja,k)};c.prototype.qh=function(k){this.aj(g.nb,k)};c.prototype.aj=function(k,m){if(this.qa!=g.$a)throw Error("Cannot settle("+k+", "+m+"): Promise already settled in state"+this.qa);this.qa=k;this.Ia=m;this.Ql()};c.prototype.Ql=function(){if(null!=this.ic){for(var k=0;k<this.ic.length;++k)h.Ig(this.ic[k]);
this.ic=null}};var h=new d;c.prototype.no=function(k){var m=this.De();k.dd(m.resolve,m.reject)};c.prototype.oo=function(k,m){var n=this.De();try{k.call(m,n.resolve,n.reject)}catch(r){n.reject(r)}};c.prototype.then=function(k,m){function n(z,C){return typeof z==t?function(U){try{r(z(U))}catch(V){w(V)}}:C}var r,w,W=new c(function(z,C){r=z;w=C});this.dd(n(k,r),n(m,w));return W};c.prototype["catch"]=function(k){return this.then(void 0,k)};c.prototype.dd=function(k,m){function n(){switch(r.qa){case g.nb:k(r.Ia);
break;case g.Ja:m(r.Ia);break;default:throw Error("Unexpected state: "+r.qa);}}var r=this;null==this.ic?h.Ig(n):this.ic.push(n)};c.resolve=e;c.reject=function(k){return new c(function(m,n){n(k)})};c.race=function(k){return new c(function(m,n){for(var r=G.Dd(k),w=r.next();!w.done;w=r.next())e(w.value).dd(m,n)})};c.all=function(k){var m=G.Dd(k),n=m.next();return n.done?e([]):new c(function(r,w){function W(U){return function(V){z[U]=V;C--;0==C&&r(z)}}var z=[],C=0;do z.push(void 0),C++,e(n.value).dd(W(z.length-
1),w),n=m.next();while(!n.done)})};return c});G.Pc("Object.is",function(b){return b?b:function(c,d){return c===d?0!==c||1/c===1/d:c!==c&&d!==d}});G.Pc("Array.prototype.includes",function(b){return b?b:function(c,d){var e=this;e instanceof String&&(e=String(e));var f=e.length;d=d||0;for(0>d&&(d=Math.max(d+f,0));d<f;d++){var g=e[d];if(g===c||Object.is(g,c))return!0}return!1}});G.Pc("String.prototype.includes",function(b){return b?b:function(c,d){return-1!==G.Rg(this,c,"includes").indexOf(c,d||0)}});
var H=H||{};H.global=this||self;H.ca=function(b){return void 0!==b};H.L=function(b){return typeof b==y};H.Em=function(b){return"boolean"==typeof b};H.Bb=function(b){return typeof b==u};H.ih=function(b,c,d){b=b.split(".");d=d||H.global;b[0]in d||"undefined"==typeof d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&H.ca(c)?d[e]=c:d=d[e]&&d[e]!==Object.prototype[e]?d[e]:d[e]={}};H.define=function(b,c){return c};H.eq=2012;H.sa=!0;H.S="en";H.pe=!0;H.Ck=!1;H.Vj=!H.sa;
H.Yp=!1;H.kw=function(b){if(H.mi())throw Error("goog.provide cannot be used within a module.");H.Wg(b)};H.Wg=function(b,c){H.ih(b,c)};H.Sh=function(){null===H.Ee&&(H.Ee=H.km());return H.Ee};H.kk=/^[\w+/_-]+[=]{0,2}$/;H.Ee=null;H.km=function(){var b=H.global.document;return(b=b.querySelector&&b.querySelector("script[nonce]"))&&(b=b.nonce||b.getAttribute("nonce"))&&H.kk.test(b)?b:""};H.Jk=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
H.pf=function(b){if(!H.L(b)||!b||-1==b.search(H.Jk))throw Error("Invalid module identifier");if(!H.li())throw Error("Module "+b+" has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
if(H.Fa.Mc)throw Error("goog.module may only be called once per module.");H.Fa.Mc=b};H.pf.get=E(null);H.pf.Au=E(null);H.rc={bg:"es6",je:"goog"};H.Fa=null;H.mi=function(){return H.li()||H.Lm()};H.li=function(){return!!H.Fa&&H.Fa.type==H.rc.je};H.Lm=function(){if(H.Fa&&H.Fa.type==H.rc.bg)return!0;var b=H.global.$jscomp;return b?typeof b.Ne!=t?!1:!!b.Ne():!1};H.pf.Fe=function(){H.Fa.Fe=!0};
H.Jt=function(b){if(H.Fa)H.Fa.Mc=b;else{var c=H.global.$jscomp;if(!c||typeof c.Ne!=t)throw Error('Module with namespace "'+b+'" has been loaded incorrectly.');c=c.Nn(c.Ne());H.Ei[b]={Sl:c,type:H.rc.bg,un:b}}};H.dx=function(b){if(H.Vj)throw b=b||"",Error("Importing test-only code into non-debug environment"+(b?": "+b:"."));};H.fu=B();H.wb=function(b){b=b.split(".");for(var c=H.global,d=0;d<b.length;d++)if(c=c[b[d]],!H.zb(c))return null;return c};
H.Qu=function(b,c){c=c||H.global;for(var d in b)c[d]=b[d]};H.As=B();H.Gx=!1;H.Zp=!0;H.Fi=function(b){H.global.console&&H.global.console.error(b)};H.Nn=B();H.vw=function(){return{}};H.hl="";H.Rb=B();H.ys=function(){throw Error("unimplemented abstract method");};H.Bs=B();H.bv=[];H.Wq=!0;H.yk=H.sa;H.Ei={};H.Kp=!1;H.ls="detect";H.gp=!1;H.ms="";H.Ek="transpile.js";H.$e=null;
H.Mo=function(){if(null==H.$e){try{var b=!eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')}catch(c){b=!1}H.$e=b}return H.$e};H.Ro=function(b){return"(function(){"+b+"\n;})();\n"};
H.Pv=function(b){var c=H.Fa;try{H.Fa={Mc:"",Fe:!1,type:H.rc.je};if(H.Wa(b))var d=b.call(void 0,{});else if(H.L(b))H.Mo()&&(b=H.Ro(b)),d=H.gn.call(void 0,b);else throw Error("Invalid module definition");var e=H.Fa.Mc;if(H.L(e)&&e)H.Fa.Fe?H.Wg(e,d):H.yk&&Object.seal&&typeof d==v&&null!=d&&Object.seal(d),H.Ei[e]={Sl:d,type:H.rc.je,un:H.Fa.Mc};else throw Error('Invalid module name "'+e+'"');}finally{H.Fa=c}};H.gn=function(b){eval(b);return{}};
H.$v=function(b){b=b.split("/");for(var c=0;c<b.length;)"."==b[c]?b.splice(c,1):c&&".."==b[c]&&b[c-1]&&".."!=b[c-1]?b.splice(--c,2):c++;return b.join("/")};H.cn=function(b){if(H.global.Oj)return H.global.Oj(b);try{var c=new H.global.XMLHttpRequest;c.open("get",b,!1);c.send();return 0==c.status||200==c.status?c.responseText:null}catch(d){return null}};
H.Ax=function(b,c,d){var e=H.global.$jscomp;e||(H.global.$jscomp=e={});var f=e.Gf;if(!f){var g=H.hl+H.Ek,h=H.cn(g);if(h){(function(){(0,eval)(h+"\n//# sourceURL="+g)}).call(H.global);if(H.global.$gwtExport&&H.global.$gwtExport.$jscomp&&!H.global.$gwtExport.$jscomp.transpile)throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: '+JSON.stringify(H.global.$gwtExport));H.global.$jscomp.Gf=H.global.$gwtExport.$jscomp.transpile;e=H.global.$jscomp;f=e.Gf}}if(!f){var k=" requires transpilation but no transpiler was found.";
k+=' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.';f=e.Gf=function(m,n){H.Fi(n+k);return m}}return f(b,c,d)};
H.ra=function(b){var c=typeof b;if(c==v)if(b){if(b instanceof Array)return q;if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return v;if("[object Array]"==d||typeof b.length==u&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return q;if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return t}else return"null";
else if(c==t&&"undefined"==typeof b.call)return v;return c};H.zv=function(b){return null===b};H.zb=function(b){return null!=b};H.isArray=function(b){return H.ra(b)==q};H.ma=function(b){var c=H.ra(b);return c==q||c==v&&typeof b.length==u};H.kv=function(b){return H.Da(b)&&typeof b.getFullYear==t};H.Wa=function(b){return H.ra(b)==t};H.Da=function(b){var c=typeof b;return c==v&&null!=b||c==t};H.Uh=function(b){return b[H.Gb]||(b[H.Gb]=++H.Eo)};H.Vu=function(b){return!!b[H.Gb]};
H.Mn=function(b){null!==b&&"removeAttribute"in b&&b.removeAttribute(H.Gb);try{delete b[H.Gb]}catch(c){}};H.Gb="closure_uid_"+(1E9*Math.random()>>>0);H.Eo=0;H.yu=H.Uh;H.qw=H.Mn;H.ul=function(b){var c=H.ra(b);if(c==v||c==q){if(typeof b.clone===t)return b.clone();c=c==q?[]:{};for(var d in b)c[d]=H.ul(b[d]);return c}return b};H.jl=function(b,c,d){return b.call.apply(b.bind,arguments)};
H.il=function(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var f=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(f,e);return b.apply(c,f)}}return function(){return b.apply(c,arguments)}};H.bind=function(b,c,d){H.bind=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?H.jl:H.il;return H.bind.apply(null,arguments)};
H.Sb=function(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var e=d.slice();e.push.apply(e,arguments);return b.apply(this,e)}};H.Vv=function(b,c){for(var d in c)b[d]=c[d]};H.now=H.pe&&Date.now||function(){return+new Date};
H.Pu=function(b){if(H.global.execScript)H.global.execScript(b,"JavaScript");else if(H.global.eval){if(null==H.nd){try{H.global.eval("var _evalTest_ = 1;")}catch(e){}if("undefined"!=typeof H.global._evalTest_){try{delete H.global._evalTest_}catch(e){}H.nd=!0}else H.nd=!1}if(H.nd)H.global.eval(b);else{var c=H.global.document,d=c.createElement(l);d.type=da;d.defer=!1;d.appendChild(c.createTextNode(b));c.head.appendChild(d);c.head.removeChild(d)}}else throw Error("goog.globalEval not available");};
H.nd=null;H.vu=function(b,c){function d(g){g=g.split("-");for(var h=[],k=0;k<g.length;k++)h.push(e(g[k]));return h.join("-")}function e(g){return H.ah[g]||g}if("."==String(b).charAt(0))throw Error('className passed in goog.getCssName must not start with ".". You passed: '+b);var f=H.ah?"BY_WHOLE"==H.Bl?e:d:A();b=c?b+"-"+f(c):f(b);return H.global.Nj?H.global.Nj(b):b};H.Lw=function(b,c){H.ah=b;H.Bl=c};
H.Bu=function(b,c,d){d&&d.b&&(b=b.replace(/</g,"&lt;"));c&&(b=b.replace(/\{\$([^}]+)}/g,function(e,f){return null!=c&&f in c?c[f]:e}));return b};H.Cu=A();H.Dc=function(b,c){H.ih(b,c,void 0)};H.Wt=function(b,c,d){b[c]=d};H.yb=function(b,c){function d(){}d.prototype=c.prototype;b.gj=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.gl=function(e,f,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[f].apply(e,h)}};
H.gl=function(b,c,d){var e=arguments.callee.caller;if(H.Ck||H.sa&&!e)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if("undefined"!==typeof e.gj){for(var f=Array(arguments.length-1),g=1;g<arguments.length;g++)f[g-1]=arguments[g];return e.gj.constructor.apply(b,f)}if(typeof c!=y&&"symbol"!=typeof c)throw Error("method names provided to goog.base must be a string or a symbol");f=Array(arguments.length-
2);for(g=2;g<arguments.length;g++)f[g-2]=arguments[g];g=!1;for(var h=b.constructor.prototype;h;h=Object.getPrototypeOf(h))if(h[c]===e)g=!0;else if(g)return h[c].apply(b,f);if(b[c]===e)return b.constructor.prototype[c].apply(b,f);throw Error("goog.base called from a method of one name to a method of a different name");};H.scope=function(b){if(H.mi())throw Error("goog.scope is not supported within a module.");b.call(H.global)};
H.La=function(b,c){var d=c.constructor,e=c.to;d&&d!=Object.prototype.constructor||(d=function(){throw Error("cannot instantiate an interface (no constructor defined).");});d=H.La.xl(d,b);b&&H.yb(d,b);delete c.constructor;delete c.to;H.La.Fg(d.prototype,c);null!=e&&(e instanceof Function?e(d):H.La.Fg(d,e));return d};H.La.xk=H.sa;
H.La.xl=function(b,c){function d(){var f=b.apply(this,arguments)||this;f[H.Gb]=f[H.Gb];this.constructor===d&&e&&Object.seal instanceof Function&&Object.seal(f);return f}if(!H.La.xk)return b;var e=!H.La.Wm(c);return d};H.La.Wm=function(b){return b&&b.prototype&&b.prototype[H.Gk]};H.La.ng=["constructor",ba,"isPrototypeOf",ca,ea,"toString","valueOf"];
H.La.Fg=function(b,c){for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(b[d]=c[d]);for(var e=0;e<H.La.ng.length;e++)d=H.La.ng[e],Object.prototype.hasOwnProperty.call(c,d)&&(b[d]=c[d])};H.tx=B();H.Gk="goog_defineClass_legacy_unsealable";H.ad="";H.Ad=A();H.$g=function(b){var c=null;if("undefined"===typeof TrustedTypes||!TrustedTypes.createPolicy)return c;try{c=TrustedTypes.createPolicy(b,{createHTML:H.Ad,createScript:H.Ad,createScriptURL:H.Ad,createURL:H.Ad})}catch(d){H.Fi(d.message)}return c};
H.os=H.ad?H.$g(H.ad+"#base"):null;H.debug={};H.debug.Error=function(b){if(Error.captureStackTrace)Error.captureStackTrace(this,H.debug.Error);else{var c=Error().stack;c&&(this.stack=c)}b&&(this.message=String(b))};H.yb(H.debug.Error,Error);H.debug.Error.prototype.name="CustomError";H.a={};H.a.ua={mb:1,jp:2,$c:3,yp:4,aq:5,$p:6,zr:7,Fp:8,Uc:9,Sp:10,Wj:11,lr:12};H.m={};H.m.za=H.sa;H.m.oc=function(b,c){H.debug.Error.call(this,H.m.vo(b,c))};H.yb(H.m.oc,H.debug.Error);H.m.oc.prototype.name="AssertionError";H.m.Sj=function(b){throw b;};H.m.Ge=H.m.Sj;H.m.vo=function(b,c){b=b.split("%s");for(var d="",e=b.length-1,f=0;f<e;f++)d+=b[f]+(f<c.length?c[f]:"%s");return d+b[e]};H.m.Ta=function(b,c,d,e){var f="Assertion failed";if(d){f+=": "+d;var g=e}else b&&(f+=": "+b,g=c);b=new H.m.oc(""+f,g||[]);H.m.Ge(b)};H.m.Pw=function(b){H.m.za&&(H.m.Ge=b)};
H.m.assert=function(b,c,d){H.m.za&&!b&&H.m.Ta("",null,c,Array.prototype.slice.call(arguments,2));return b};H.m.Ms=function(b,c,d){H.m.za&&null==b&&H.m.Ta("Expected to exist: %s.",[b],c,Array.prototype.slice.call(arguments,2));return b};H.m.xa=function(b,c){H.m.za&&H.m.Ge(new H.m.oc("Failure"+(b?": "+b:""),Array.prototype.slice.call(arguments,1)))};H.m.Us=function(b,c,d){H.m.za&&!H.Bb(b)&&H.m.Ta("Expected number but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Xs=function(b,c,d){H.m.za&&!H.L(b)&&H.m.Ta("Expected string but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Os=function(b,c,d){H.m.za&&!H.Wa(b)&&H.m.Ta("Expected function but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Vs=function(b,c,d){H.m.za&&!H.Da(b)&&H.m.Ta("Expected object but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Js=function(b,c,d){H.m.za&&!H.isArray(b)&&H.m.Ta("Expected array but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ks=function(b,c,d){H.m.za&&!H.Em(b)&&H.m.Ta("Expected boolean but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ls=function(b,c,d){!H.m.za||H.Da(b)&&b.nodeType==H.a.ua.mb||H.m.Ta("Expected Element but got %s: %s.",[H.ra(b),b],c,Array.prototype.slice.call(arguments,2));return b};
H.m.Ps=function(b,c,d,e){!H.m.za||b instanceof c||H.m.Ta("Expected instanceof %s but got %s.",[H.m.Th(c),H.m.Th(b)],d,Array.prototype.slice.call(arguments,3));return b};H.m.Ns=function(b,c,d){!H.m.za||typeof b==u&&isFinite(b)||H.m.Ta("Expected %s to be a finite number but it is not.",[b],c,Array.prototype.slice.call(arguments,2));return b};H.m.Ws=function(){for(var b in Object.prototype)H.m.xa(b+" should not be enumerable in Object.prototype.")};
H.m.Th=function(b){return b instanceof Function?b.displayName||b.name||"unknown type name":b instanceof Object?b.constructor.displayName||b.constructor.name||Object.prototype.toString.call(b):null===b?"null":typeof b};H.g={};H.fb=H.pe;H.g.cb=!1;H.g.zn=function(b){return b[b.length-1]};H.g.Lv=H.g.zn;H.g.indexOf=H.fb&&(H.g.cb||Array.prototype.indexOf)?function(b,c,d){return Array.prototype.indexOf.call(b,c,d)}:function(b,c,d){d=null==d?0:0>d?Math.max(0,b.length+d):d;if(H.L(b))return H.L(c)&&1==c.length?b.indexOf(c,d):-1;for(;d<b.length;d++)if(d in b&&b[d]===c)return d;return-1};
H.g.lastIndexOf=H.fb&&(H.g.cb||Array.prototype.lastIndexOf)?function(b,c,d){return Array.prototype.lastIndexOf.call(b,c,null==d?b.length-1:d)}:function(b,c,d){d=null==d?b.length-1:d;0>d&&(d=Math.max(0,b.length+d));if(H.L(b))return H.L(c)&&1==c.length?b.lastIndexOf(c,d):-1;for(;0<=d;d--)if(d in b&&b[d]===c)return d;return-1};
H.g.forEach=H.fb&&(H.g.cb||Array.prototype.forEach)?function(b,c,d){Array.prototype.forEach.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)g in f&&c.call(d,f[g],g,b)};H.g.ph=function(b,c){var d=b.length,e=H.L(b)?b.split(""):b;for(--d;0<=d;--d)d in e&&c.call(void 0,e[d],d,b)};
H.g.filter=H.fb&&(H.g.cb||Array.prototype.filter)?function(b,c,d){return Array.prototype.filter.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=[],g=0,h=H.L(b)?b.split(""):b,k=0;k<e;k++)if(k in h){var m=h[k];c.call(d,m,k,b)&&(f[g++]=m)}return f};H.g.map=H.fb&&(H.g.cb||Array.prototype.map)?function(b,c,d){return Array.prototype.map.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=Array(e),g=H.L(b)?b.split(""):b,h=0;h<e;h++)h in g&&(f[h]=c.call(d,g[h],h,b));return f};
H.g.reduce=H.fb&&(H.g.cb||Array.prototype.reduce)?function(b,c,d,e){e&&(c=H.bind(c,e));return Array.prototype.reduce.call(b,c,d)}:function(b,c,d,e){var f=d;H.g.forEach(b,function(g,h){f=c.call(e,f,g,h,b)});return f};H.g.reduceRight=H.fb&&(H.g.cb||Array.prototype.reduceRight)?function(b,c,d,e){e&&(c=H.bind(c,e));return Array.prototype.reduceRight.call(b,c,d)}:function(b,c,d,e){var f=d;H.g.ph(b,function(g,h){f=c.call(e,f,g,h,b)});return f};
H.g.some=H.fb&&(H.g.cb||Array.prototype.some)?function(b,c,d){return Array.prototype.some.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return!0;return!1};H.g.every=H.fb&&(H.g.cb||Array.prototype.every)?function(b,c,d){return Array.prototype.every.call(b,c,d)}:function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&!c.call(d,f[g],g,b))return!1;return!0};
H.g.count=function(b,c,d){var e=0;H.g.forEach(b,function(f,g,h){c.call(d,f,g,h)&&++e},d);return e};H.g.find=function(b,c,d){c=H.g.findIndex(b,c,d);return 0>c?null:H.L(b)?b.charAt(c):b[c]};H.g.findIndex=function(b,c,d){for(var e=b.length,f=H.L(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return g;return-1};H.g.au=function(b,c,d){c=H.g.Tl(b,c,d);return 0>c?null:H.L(b)?b.charAt(c):b[c]};
H.g.Tl=function(b,c,d){var e=b.length,f=H.L(b)?b.split(""):b;for(--e;0<=e;e--)if(e in f&&c.call(d,f[e],e,b))return e;return-1};H.g.contains=function(b,c){return 0<=H.g.indexOf(b,c)};H.g.Ca=function(b){return 0==b.length};H.g.clear=function(b){if(!H.isArray(b))for(var c=b.length-1;0<=c;c--)delete b[c];b.length=0};H.g.Zu=function(b,c){H.g.contains(b,c)||b.push(c)};H.g.bi=function(b,c,d){H.g.splice(b,d,0,c)};H.g.av=function(b,c,d){H.Sb(H.g.splice,b,d,0).apply(null,c)};
H.g.insertBefore=function(b,c,d){var e;2==arguments.length||0>(e=H.g.indexOf(b,d))?b.push(c):H.g.bi(b,c,e)};H.g.remove=function(b,c){c=H.g.indexOf(b,c);var d;(d=0<=c)&&H.g.kc(b,c);return d};H.g.sw=function(b,c){c=H.g.lastIndexOf(b,c);return 0<=c?(H.g.kc(b,c),!0):!1};H.g.kc=function(b,c){return 1==Array.prototype.splice.call(b,c,1).length};H.g.rw=function(b,c,d){c=H.g.findIndex(b,c,d);return 0<=c?(H.g.kc(b,c),!0):!1};
H.g.pw=function(b,c,d){var e=0;H.g.ph(b,function(f,g){c.call(d,f,g,b)&&H.g.kc(b,g)&&e++});return e};H.g.concat=function(b){return Array.prototype.concat.apply([],arguments)};H.g.join=function(b){return Array.prototype.concat.apply([],arguments)};H.g.jb=function(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]};H.g.clone=H.g.jb;
H.g.extend=function(b,c){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(H.ma(e)){var f=b.length||0,g=e.length||0;b.length=f+g;for(var h=0;h<g;h++)b[f+h]=e[h]}else b.push(e)}};H.g.splice=function(b,c,d,e){return Array.prototype.splice.apply(b,H.g.slice(arguments,1))};H.g.slice=function(b,c,d){return 2>=arguments.length?Array.prototype.slice.call(b,c):Array.prototype.slice.call(b,c,d)};
H.g.Jn=function(b,c){c=c||b;for(var d={},e=0,f=0;f<b.length;){var g=b[f++];var h=g;h=H.Da(h)?"o"+H.Uh(h):(typeof h).charAt(0)+h;Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,c[e++]=g)}c.length=e};H.g.Kg=function(b,c,d){return H.g.Lg(b,d||H.g.sb,!1,c)};H.g.at=function(b,c,d){return H.g.Lg(b,c,!0,void 0,d)};H.g.Lg=function(b,c,d,e,f){for(var g=0,h=b.length,k;g<h;){var m=g+h>>1;var n=d?c.call(f,b[m],m,b):c(e,b[m]);0<n?g=m+1:(h=m,k=!n)}return k?g:~g};H.g.sort=function(b,c){b.sort(c||H.g.sb)};
H.g.mx=function(b,c){for(var d=Array(b.length),e=0;e<b.length;e++)d[e]={index:e,value:b[e]};var f=c||H.g.sb;H.g.sort(d,function(g,h){return f(g.value,h.value)||g.index-h.index});for(e=0;e<b.length;e++)b[e]=d[e].value};H.g.qo=function(b,c,d){var e=d||H.g.sb;H.g.sort(b,function(f,g){return e(c(f),c(g))})};H.g.jx=function(b,c,d){H.g.qo(b,function(e){return e[c]},d)};H.g.wi=function(b){for(var c=H.g.sb,d=1;d<b.length;d++)if(0<c(b[d-1],b[d]))return!1;return!0};
H.g.Ob=function(b,c){if(!H.ma(b)||!H.ma(c)||b.length!=c.length)return!1;for(var d=b.length,e=H.g.eh,f=0;f<d;f++)if(!e(b[f],c[f]))return!1;return!0};H.g.nt=function(b,c,d){d=d||H.g.sb;for(var e=Math.min(b.length,c.length),f=0;f<e;f++){var g=d(b[f],c[f]);if(0!=g)return g}return H.g.sb(b.length,c.length)};H.g.sb=function(b,c){return b>c?1:b<c?-1:0};H.g.dv=function(b,c){return-H.g.sb(b,c)};H.g.eh=function(b,c){return b===c};H.g.Zs=function(b,c,d){d=H.g.Kg(b,c,d);return 0>d?(H.g.bi(b,c,-(d+1)),!0):!1};
H.g.$s=function(b,c,d){c=H.g.Kg(b,c,d);return 0<=c?H.g.kc(b,c):!1};H.g.ct=function(b,c,d){for(var e={},f=0;f<b.length;f++){var g=b[f],h=c.call(d,g,f,b);H.ca(h)&&(e[h]||(e[h]=[])).push(g)}return e};H.g.Ao=function(b,c,d){var e={};H.g.forEach(b,function(f,g){e[c.call(d,f,g,b)]=f});return e};H.g.Qd=function(b,c,d){var e=[],f=0,g=b;d=d||1;void 0!==c&&(f=b,g=c);if(0>d*(g-f))return[];if(0<d)for(b=f;b<g;b+=d)e.push(b);else for(b=f;b>g;b+=d)e.push(b);return e};
H.g.repeat=function(b,c){for(var d=[],e=0;e<c;e++)d[e]=b;return d};H.g.flatten=function(b){for(var c=[],d=0;d<arguments.length;d++){var e=arguments[d];if(H.isArray(e))for(var f=0;f<e.length;f+=8192){var g=H.g.slice(e,f,f+8192);g=H.g.flatten.apply(null,g);for(var h=0;h<g.length;h++)c.push(g[h])}else c.push(e)}return c};H.g.rotate=function(b,c){b.length&&(c%=b.length,0<c?Array.prototype.unshift.apply(b,b.splice(-c,c)):0>c&&Array.prototype.push.apply(b,b.splice(0,-c)));return b};
H.g.Xv=function(b,c,d){c=Array.prototype.splice.call(b,c,1);Array.prototype.splice.call(b,d,0,c[0])};H.g.uj=function(b){if(!arguments.length)return[];for(var c=[],d=arguments[0].length,e=1;e<arguments.length;e++)arguments[e].length<d&&(d=arguments[e].length);for(e=0;e<d;e++){for(var f=[],g=0;g<arguments.length;g++)f.push(arguments[g][e]);c.push(f)}return c};H.g.ix=function(b,c){c=c||Math.random;for(var d=b.length-1;0<d;d--){var e=Math.floor(c()*(d+1)),f=b[d];b[d]=b[e];b[e]=f}};
H.g.tt=function(b,c){var d=[];H.g.forEach(c,function(e){d.push(b[e])});return d};H.g.qt=function(b,c,d){return H.g.concat.apply([],H.g.map(b,c,d))};H.async={};H.async.Wc=function(b,c,d){this.bn=d;this.Al=b;this.On=c;this.Fd=0;this.zd=null};H.async.Wc.prototype.get=function(){if(0<this.Fd){this.Fd--;var b=this.zd;this.zd=b.next;b.next=null}else b=this.Al();return b};H.async.Wc.prototype.put=function(b){this.On(b);this.Fd<this.bn&&(this.Fd++,b.next=this.zd,this.zd=b)};H.debug.pa={};H.debug.bq=B();H.debug.pa.jc=[];H.debug.pa.qf=[];H.debug.pa.Mi=!1;H.debug.pa.register=function(b){H.debug.pa.jc[H.debug.pa.jc.length]=b;if(H.debug.pa.Mi)for(var c=H.debug.pa.qf,d=0;d<c.length;d++)b(H.bind(c[d].So,c[d]))};H.debug.pa.Wv=function(b){H.debug.pa.Mi=!0;for(var c=H.bind(b.So,b),d=0;d<H.debug.pa.jc.length;d++)H.debug.pa.jc[d](c);H.debug.pa.qf.push(b)};H.debug.pa.Fx=function(b){var c=H.debug.pa.qf;b=H.bind(b.K,b);for(var d=0;d<H.debug.pa.jc.length;d++)H.debug.pa.jc[d](b);c.length--};H.a.m={};H.a.m.we=function(b){if(H.m.za){var c=H.a.m.ec(b);c&&(!b||!(b instanceof c.Location)&&b instanceof c.Element)&&H.m.xa("Argument is not a Location (or a non-Element mock); got: %s",H.a.m.dh(b))}};H.a.m.Aa=function(b,c){if(H.m.za){var d=H.a.m.ec(b);d&&"undefined"!=typeof d[c]&&(b&&(b instanceof d[c]||!(b instanceof d.Location||b instanceof d.Element))||H.m.xa("Argument is not a %s (or a non-Element, non-Location mock); got: %s",c,H.a.m.dh(b)))}return b};H.a.m.Uk=function(b){H.a.m.Aa(b,"HTMLAnchorElement")};
H.a.m.Wk=function(b){return H.a.m.Aa(b,"HTMLButtonElement")};H.a.m.bl=function(b){H.a.m.Aa(b,"HTMLLinkElement")};H.a.m.$k=function(b){H.a.m.Aa(b,"HTMLImageElement")};H.a.m.Vk=function(b){H.a.m.Aa(b,"HTMLAudioElement")};H.a.m.dl=function(b){H.a.m.Aa(b,"HTMLVideoElement")};H.a.m.al=function(b){return H.a.m.Aa(b,"HTMLInputElement")};H.a.m.Rs=function(b){return H.a.m.Aa(b,"HTMLTextAreaElement")};H.a.m.Qs=function(b){return H.a.m.Aa(b,"HTMLCanvasElement")};H.a.m.Xk=function(b){H.a.m.Aa(b,"HTMLEmbedElement")};
H.a.m.Yk=function(b){return H.a.m.Aa(b,"HTMLFormElement")};H.a.m.Zk=function(b){H.a.m.Aa(b,"HTMLFrameElement")};H.a.m.Gg=function(b){H.a.m.Aa(b,"HTMLIFrameElement")};H.a.m.cl=function(b){H.a.m.Aa(b,"HTMLObjectElement")};H.a.m.Hg=function(b){H.a.m.Aa(b,"HTMLScriptElement")};H.a.m.dh=function(b){if(H.Da(b))try{return b.constructor.displayName||b.constructor.name||Object.prototype.toString.call(b)}catch(c){return"<object could not be stringified>"}else return void 0===b?"undefined":null===b?"null":typeof b};
H.a.m.ec=function(b){try{var c=b&&b.ownerDocument,d=c&&(c.defaultView||c.parentWindow);d=d||H.global;if(d.Element&&d.Location)return d}catch(e){}return null};H.V={};H.V.Vg=function(b){return function(){return b}};H.V.cq=E(!1);H.V.ns=E(!0);H.V.mr=E(null);H.V.ai=A();H.V.error=function(b){return function(){throw Error(b);}};H.V.xa=function(b){return function(){throw b;}};H.V.lock=function(b,c){c=c||0;return function(){return b.apply(this,Array.prototype.slice.call(arguments,0,c))}};H.V.cw=function(b){return function(){return arguments[b]}};
H.V.iw=function(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var e=Array.prototype.slice.call(arguments);e.push.apply(e,d);return b.apply(this,e)}};H.V.Jx=function(b,c){return H.V.fo(b,H.V.Vg(c))};H.V.Ut=function(b,c){return function(d){return c?b==d:b===d}};H.V.ot=function(b,c){var d=arguments,e=d.length;return function(){var f;e&&(f=d[e-1].apply(this,arguments));for(var g=e-2;0<=g;g--)f=d[g].call(this,f);return f}};
H.V.fo=function(b){var c=arguments,d=c.length;return function(){for(var e,f=0;f<d;f++)e=c[f].apply(this,arguments);return e}};H.V.and=function(b){var c=arguments,d=c.length;return function(){for(var e=0;e<d;e++)if(!c[e].apply(this,arguments))return!1;return!0}};H.V.or=function(b){var c=arguments,d=c.length;return function(){for(var e=0;e<d;e++)if(c[e].apply(this,arguments))return!0;return!1}};H.V.xn=function(b){return function(){return!b.apply(this,arguments)}};
H.V.create=function(b,c){function d(){}d.prototype=b.prototype;var e=new d;b.apply(e,Array.prototype.slice.call(arguments,1));return e};H.V.Jj=!0;H.V.ol=function(b){var c=!1,d;return function(){if(!H.V.Jj)return b();c||(d=b(),c=!0);return d}};H.V.once=function(b){var c=b;return function(){if(c){var d=c;c=null;d()}}};H.V.It=function(b,c,d){var e=0;return function(f){H.global.clearTimeout(e);var g=arguments;e=H.global.setTimeout(function(){b.apply(d,g)},c)}};
H.V.vx=function(b,c,d){function e(){g=H.global.setTimeout(f,c);b.apply(d,k)}function f(){g=0;h&&(h=!1,e())}var g=0,h=!1,k=[];return function(m){k=arguments;g?h=!0:e()}};H.V.mw=function(b,c,d){function e(){f=0}var f=0;return function(g){f||(f=H.global.setTimeout(e,c),b.apply(d,arguments))}};H.a.zq=B();H.a.f=function(b){this.wo=b};H.a.f.prototype.toString=D("wo");H.a.f.Uo=new H.a.f("A");H.a.f.Vo=new H.a.f("ABBR");H.a.f.Xo=new H.a.f("ACRONYM");H.a.f.Yo=new H.a.f("ADDRESS");H.a.f.bp=new H.a.f("APPLET");H.a.f.cp=new H.a.f("AREA");H.a.f.ep=new H.a.f("ARTICLE");H.a.f.fp=new H.a.f("ASIDE");H.a.f.kp=new H.a.f("AUDIO");H.a.f.lp=new H.a.f("B");H.a.f.mp=new H.a.f("BASE");H.a.f.np=new H.a.f("BASEFONT");H.a.f.op=new H.a.f("BDI");H.a.f.pp=new H.a.f("BDO");H.a.f.sp=new H.a.f("BIG");H.a.f.tp=new H.a.f("BLOCKQUOTE");
H.a.f.up=new H.a.f("BODY");H.a.f.Xf=new H.a.f("BR");H.a.f.vp=new H.a.f("BUTTON");H.a.f.wp=new H.a.f("CANVAS");H.a.f.xp=new H.a.f("CAPTION");H.a.f.zp=new H.a.f("CENTER");H.a.f.Ap=new H.a.f("CITE");H.a.f.Bp=new H.a.f("CODE");H.a.f.Cp=new H.a.f("COL");H.a.f.Dp=new H.a.f("COLGROUP");H.a.f.Ep=new H.a.f("COMMAND");H.a.f.Gp=new H.a.f("DATA");H.a.f.Hp=new H.a.f("DATALIST");H.a.f.Ip=new H.a.f("DD");H.a.f.Jp=new H.a.f("DEL");H.a.f.Lp=new H.a.f("DETAILS");H.a.f.Mp=new H.a.f("DFN");H.a.f.Np=new H.a.f("DIALOG");
H.a.f.Op=new H.a.f("DIR");H.a.f.Pp=new H.a.f("DIV");H.a.f.Qp=new H.a.f("DL");H.a.f.Tp=new H.a.f("DT");H.a.f.Wp=new H.a.f("EM");H.a.f.Xp=new H.a.f("EMBED");H.a.f.fq=new H.a.f("FIELDSET");H.a.f.gq=new H.a.f("FIGCAPTION");H.a.f.hq=new H.a.f("FIGURE");H.a.f.iq=new H.a.f("FONT");H.a.f.jq=new H.a.f("FOOTER");H.a.f.kq=new H.a.f("FORM");H.a.f.lq=new H.a.f("FRAME");H.a.f.mq=new H.a.f("FRAMESET");H.a.f.oq=new H.a.f("H1");H.a.f.pq=new H.a.f("H2");H.a.f.qq=new H.a.f("H3");H.a.f.rq=new H.a.f("H4");H.a.f.sq=new H.a.f("H5");
H.a.f.tq=new H.a.f("H6");H.a.f.uq=new H.a.f("HEAD");H.a.f.vq=new H.a.f("HEADER");H.a.f.wq=new H.a.f("HGROUP");H.a.f.xq=new H.a.f("HR");H.a.f.yq=new H.a.f("HTML");H.a.f.Aq=new H.a.f("I");H.a.f.Dq=new H.a.f("IFRAME");H.a.f.Eq=new H.a.f("IMG");H.a.f.Fq=new H.a.f("INPUT");H.a.f.Gq=new H.a.f("INS");H.a.f.Lq=new H.a.f("ISINDEX");H.a.f.Oq=new H.a.f("KBD");H.a.f.Pq=new H.a.f("KEYGEN");H.a.f.Qq=new H.a.f("LABEL");H.a.f.Sq=new H.a.f("LEGEND");H.a.f.Tq=new H.a.f("LI");H.a.f.Uq=new H.a.f("LINK");H.a.f.Yq=new H.a.f("MAIN");
H.a.f.Zq=new H.a.f("MAP");H.a.f.$q=new H.a.f("MARK");H.a.f.ar=new H.a.f("MATH");H.a.f.cr=new H.a.f("MENU");H.a.f.dr=new H.a.f("MENUITEM");H.a.f.er=new H.a.f("META");H.a.f.fr=new H.a.f("METER");H.a.f.ir=new H.a.f("NAV");H.a.f.jr=new H.a.f("NOFRAMES");H.a.f.kr=new H.a.f("NOSCRIPT");H.a.f.nr=new H.a.f("OBJECT");H.a.f.qr=new H.a.f("OL");H.a.f.rr=new H.a.f("OPTGROUP");H.a.f.sr=new H.a.f("OPTION");H.a.f.tr=new H.a.f("OUTPUT");H.a.f.ur=new H.a.f("P");H.a.f.vr=new H.a.f("PARAM");H.a.f.wr=new H.a.f("PICTURE");
H.a.f.yr=new H.a.f("PRE");H.a.f.Ar=new H.a.f("PROGRESS");H.a.f.Q=new H.a.f("Q");H.a.f.Br=new H.a.f("RP");H.a.f.Cr=new H.a.f("RT");H.a.f.Dr=new H.a.f("RTC");H.a.f.Er=new H.a.f("RUBY");H.a.f.Gr=new H.a.f("S");H.a.f.Jr=new H.a.f("SAMP");H.a.f.Kr=new H.a.f(l);H.a.f.Lr=new H.a.f("SECTION");H.a.f.Mr=new H.a.f("SELECT");H.a.f.Or=new H.a.f("SMALL");H.a.f.Pr=new H.a.f("SOURCE");H.a.f.Qr=new H.a.f("SPAN");H.a.f.Rr=new H.a.f("STRIKE");H.a.f.Sr=new H.a.f("STRONG");H.a.f.Tr=new H.a.f("STYLE");H.a.f.Ur=new H.a.f("SUB");
H.a.f.Vr=new H.a.f("SUMMARY");H.a.f.Wr=new H.a.f("SUP");H.a.f.Xr=new H.a.f("SVG");H.a.f.Yr=new H.a.f("TABLE");H.a.f.Zr=new H.a.f("TBODY");H.a.f.$r=new H.a.f("TD");H.a.f.bs=new H.a.f("TEMPLATE");H.a.f.cs=new H.a.f("TEXTAREA");H.a.f.ds=new H.a.f("TFOOT");H.a.f.es=new H.a.f("TH");H.a.f.fs=new H.a.f("THEAD");H.a.f.gs=new H.a.f("TIME");H.a.f.hs=new H.a.f("TITLE");H.a.f.js=new H.a.f("TR");H.a.f.ks=new H.a.f("TRACK");H.a.f.ps=new H.a.f("TT");H.a.f.rs=new H.a.f("U");H.a.f.ss=new H.a.f("UL");H.a.f.ts=new H.a.f("VAR");
H.a.f.us=new H.a.f("VIDEO");H.a.f.vs=new H.a.f("WBR");H.object={};H.object.is=function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c};H.object.forEach=function(b,c,d){for(var e in b)c.call(d,b[e],e,b)};H.object.filter=function(b,c,d){var e={},f;for(f in b)c.call(d,b[f],f,b)&&(e[f]=b[f]);return e};H.object.map=function(b,c,d){var e={},f;for(f in b)e[f]=c.call(d,b[f],f,b);return e};H.object.some=function(b,c,d){for(var e in b)if(c.call(d,b[e],e,b))return!0;return!1};H.object.every=function(b,c,d){for(var e in b)if(!c.call(d,b[e],e,b))return!1;return!0};
H.object.ub=function(b){var c=0,d;for(d in b)c++;return c};H.object.tu=function(b){for(var c in b)return c};H.object.uu=function(b){for(var c in b)return b[c]};H.object.contains=function(b,c){return H.object.Mb(b,c)};H.object.ga=function(b){var c=[],d=0,e;for(e in b)c[d++]=b[e];return c};H.object.la=function(b){var c=[],d=0,e;for(e in b)c[d++]=e;return c};H.object.Ou=function(b,c){var d=H.ma(c),e=d?c:arguments;for(d=d?0:1;d<e.length;d++){if(null==b)return;b=b[e[d]]}return b};
H.object.Lb=function(b,c){return null!==b&&c in b};H.object.Mb=function(b,c){for(var d in b)if(b[d]==c)return!0;return!1};H.object.Ul=function(b,c,d){for(var e in b)if(c.call(d,b[e],e,b))return e};H.object.bu=function(b,c,d){return(c=H.object.Ul(b,c,d))&&b[c]};H.object.Ca=function(b){for(var c in b)return!1;return!0};H.object.clear=function(b){for(var c in b)delete b[c]};H.object.remove=function(b,c){var d;(d=c in b)&&delete b[c];return d};
H.object.add=function(b,c,d){if(null!==b&&c in b)throw Error('The object already contains the key "'+c+'"');H.object.set(b,c,d)};H.object.get=function(b,c,d){return null!==b&&c in b?b[c]:d};H.object.set=function(b,c,d){b[c]=d};H.object.Tw=function(b,c,d){return c in b?b[c]:b[c]=d};H.object.hx=function(b,c,d){if(c in b)return b[c];d=d();return b[c]=d};H.object.Ob=function(b,c){for(var d in b)if(!(d in c)||b[d]!==c[d])return!1;for(var e in c)if(!(e in b))return!1;return!0};
H.object.clone=function(b){var c={},d;for(d in b)c[d]=b[d];return c};H.object.Jo=function(b){var c=H.ra(b);if(c==v||c==q){if(H.Wa(b.clone))return b.clone();c=c==q?[]:{};for(var d in b)c[d]=H.object.Jo(b[d]);return c}return b};H.object.Co=function(b){var c={},d;for(d in b)c[b[d]]=d;return c};H.object.qg=["constructor",ba,"isPrototypeOf",ca,ea,"toString","valueOf"];
H.object.extend=function(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<H.object.qg.length;g++)d=H.object.qg[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}};H.object.create=function(b){var c=arguments.length;if(1==c&&H.isArray(arguments[0]))return H.object.create.apply(null,arguments[0]);if(c%2)throw Error(p);for(var d={},e=0;e<c;e+=2)d[arguments[e]]=arguments[e+1];return d};
H.object.yl=function(b){var c=arguments.length;if(1==c&&H.isArray(arguments[0]))return H.object.yl.apply(null,arguments[0]);for(var d={},e=0;e<c;e++)d[arguments[e]]=!0;return d};H.object.zt=function(b){var c=b;Object.isFrozen&&!Object.isFrozen(b)&&(c=Object.create(b),Object.freeze(c));return c};H.object.pv=function(b){return!!Object.isFrozen&&Object.isFrozen(b)};
H.object.su=function(b,c,d){if(!b)return[];if(!Object.getOwnPropertyNames||!Object.getPrototypeOf)return H.object.la(b);for(var e={};b&&(b!==Object.prototype||c)&&(b!==Function.prototype||d);){for(var f=Object.getOwnPropertyNames(b),g=0;g<f.length;g++)e[f[g]]=!0;b=Object.getPrototypeOf(b)}return H.object.la(e)};H.object.Nu=function(b){return(b=Object.getPrototypeOf(b.prototype))&&b.constructor};H.a.tags={};H.a.tags.Nk={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};H.a.tags.Ym=function(b){return!0===H.a.tags.Nk[b]};H.b={};H.b.Ya={};H.b.Ya.ab=H.ad?H.$g(H.ad+"#html"):null;H.c={};H.c.qs=B();H.c.M=function(b,c){this.Ef=b===H.c.M.fg&&c||"";this.Dk=H.c.M.wg};H.c.M.prototype.Va=!0;H.c.M.prototype.Ga=D("Ef");H.c.M.prototype.toString=function(){return"Const{"+this.Ef+"}"};H.c.M.K=function(b){if(b instanceof H.c.M&&b.constructor===H.c.M&&b.Dk===H.c.M.wg)return b.Ef;H.m.xa("expected object of type Const, got '"+b+"'");return"type_error:Const"};H.c.M.from=function(b){return new H.c.M(H.c.M.fg,b)};H.c.M.wg={};H.c.M.fg={};H.c.M.EMPTY=H.c.M.from("");H.b.W=function(){this.Jd="";this.tk=H.b.W.wa};H.b.W.prototype.Va=!0;H.b.W.wa={};H.b.W.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.W.EMPTY:H.b.W.uc(b)};H.b.W.hu=function(b,c){for(var d=[],e=1;e<arguments.length;e++)d.push(H.b.W.ej(arguments[e]));return H.b.W.uc("("+H.c.M.K(b)+")("+d.join(", ")+");")};H.b.W.ku=function(b){return H.b.W.uc(H.b.W.ej(b))};H.b.W.prototype.Ga=function(){return this.Jd.toString()};H.sa&&(H.b.W.prototype.toString=function(){return"SafeScript{"+this.Jd+"}"});
H.b.W.K=function(b){return H.b.W.pj(b).toString()};H.b.W.pj=function(b){if(b instanceof H.b.W&&b.constructor===H.b.W&&b.tk===H.b.W.wa)return b.Jd;H.m.xa("expected object of type SafeScript, got '"+b+a+H.ra(b));return"type_error:SafeScript"};H.b.W.ej=function(b){return JSON.stringify(b).replace(/</g,"\\x3c")};H.b.W.uc=function(b){return(new H.b.W).Qb(b)};H.b.W.prototype.Qb=function(b){this.Jd=H.b.Ya.ab?H.b.Ya.ab.createScript(b):b;return this};H.b.W.EMPTY=H.b.W.uc("");H.Ua={};H.Ua.url={};H.Ua.url.wl=function(b){return H.Ua.url.Vh().createObjectURL(b)};H.Ua.url.yw=function(b){H.Ua.url.Vh().revokeObjectURL(b)};H.Ua.url.Vh=function(){var b=H.Ua.url.nh();if(null!=b)return b;throw Error("This browser doesn't seem to support blob URLs");};H.Ua.url.nh=function(){return H.ca(H.global.URL)&&H.ca(H.global.URL.createObjectURL)?H.global.URL:H.ca(H.global.webkitURL)&&H.ca(H.global.webkitURL.createObjectURL)?H.global.webkitURL:H.ca(H.global.createObjectURL)?H.global:null};
H.Ua.url.bt=function(){return null!=H.Ua.url.nh()};H.i={};H.i.j={};H.i.j.ak=!1;
H.i.j.jg=H.i.j.ak||("ar"==H.S.substring(0,2).toLowerCase()||"fa"==H.S.substring(0,2).toLowerCase()||"he"==H.S.substring(0,2).toLowerCase()||"iw"==H.S.substring(0,2).toLowerCase()||"ps"==H.S.substring(0,2).toLowerCase()||"sd"==H.S.substring(0,2).toLowerCase()||"ug"==H.S.substring(0,2).toLowerCase()||"ur"==H.S.substring(0,2).toLowerCase()||"yi"==H.S.substring(0,2).toLowerCase())&&(2==H.S.length||"-"==H.S.substring(2,3)||"_"==H.S.substring(2,3))||3<=H.S.length&&"ckb"==H.S.substring(0,3).toLowerCase()&&
(3==H.S.length||"-"==H.S.substring(3,4)||"_"==H.S.substring(3,4))||7<=H.S.length&&("-"==H.S.substring(2,3)||"_"==H.S.substring(2,3))&&("adlm"==H.S.substring(3,7).toLowerCase()||"arab"==H.S.substring(3,7).toLowerCase()||"hebr"==H.S.substring(3,7).toLowerCase()||"nkoo"==H.S.substring(3,7).toLowerCase()||"rohg"==H.S.substring(3,7).toLowerCase()||"thaa"==H.S.substring(3,7).toLowerCase())||8<=H.S.length&&("-"==H.S.substring(3,4)||"_"==H.S.substring(3,4))&&("adlm"==H.S.substring(4,8).toLowerCase()||"arab"==
H.S.substring(4,8).toLowerCase()||"hebr"==H.S.substring(4,8).toLowerCase()||"nkoo"==H.S.substring(4,8).toLowerCase()||"rohg"==H.S.substring(4,8).toLowerCase()||"thaa"==H.S.substring(4,8).toLowerCase());H.i.j.Wb={gk:"\u202a",pk:"\u202b",pg:"\u202c",hk:"\u200e",qk:"\u200f"};H.i.j.aa={Eb:1,Fb:-1,Za:0};H.i.j.Zc="right";H.i.j.Xc="left";H.i.j.Cq=H.i.j.jg?H.i.j.Xc:H.i.j.Zc;H.i.j.Bq=H.i.j.jg?H.i.j.Zc:H.i.j.Xc;
H.i.j.zo=function(b){return typeof b==u?0<b?H.i.j.aa.Eb:0>b?H.i.j.aa.Fb:H.i.j.aa.Za:null==b?null:b?H.i.j.aa.Fb:H.i.j.aa.Eb};H.i.j.gc="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";H.i.j.lc="\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";H.i.j.Am=/<[^>]*>|&[^;]+;/g;H.i.j.Cb=function(b,c){return c?b.replace(H.i.j.Am,""):b};
H.i.j.Tn=new RegExp("["+H.i.j.lc+"]");H.i.j.kn=new RegExp("["+H.i.j.gc+"]");H.i.j.Ze=function(b,c){return H.i.j.Tn.test(H.i.j.Cb(b,c))};H.i.j.Uu=H.i.j.Ze;H.i.j.Zh=function(b){return H.i.j.kn.test(H.i.j.Cb(b,void 0))};H.i.j.nn=new RegExp("^["+H.i.j.gc+"]");H.i.j.Yn=new RegExp("^["+H.i.j.lc+"]");H.i.j.Tm=function(b){return H.i.j.Yn.test(b)};H.i.j.Pm=function(b){return H.i.j.nn.test(b)};H.i.j.xv=function(b){return!H.i.j.Pm(b)&&!H.i.j.Tm(b)};H.i.j.ln=new RegExp("^[^"+H.i.j.lc+"]*["+H.i.j.gc+"]");
H.i.j.Vn=new RegExp("^[^"+H.i.j.gc+"]*["+H.i.j.lc+"]");H.i.j.cj=function(b,c){return H.i.j.Vn.test(H.i.j.Cb(b,c))};H.i.j.Ev=H.i.j.cj;H.i.j.so=function(b,c){return H.i.j.ln.test(H.i.j.Cb(b,c))};H.i.j.vv=H.i.j.so;H.i.j.ui=/^http:\/\/.*/;H.i.j.yv=function(b,c){b=H.i.j.Cb(b,c);return H.i.j.ui.test(b)||!H.i.j.Zh(b)&&!H.i.j.Ze(b)};H.i.j.mn=new RegExp("["+H.i.j.gc+"][^"+H.i.j.lc+"]*$");H.i.j.Wn=new RegExp("["+H.i.j.lc+"][^"+H.i.j.gc+"]*$");H.i.j.Ll=function(b,c){return H.i.j.mn.test(H.i.j.Cb(b,c))};
H.i.j.uv=H.i.j.Ll;H.i.j.Ml=function(b,c){return H.i.j.Wn.test(H.i.j.Cb(b,c))};H.i.j.Cv=H.i.j.Ml;H.i.j.Xn=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;H.i.j.Dv=function(b){return H.i.j.Xn.test(b)};H.i.j.ll=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;H.i.j.Su=function(b,c){c=(void 0===c?H.i.j.Ze(b):c)?H.i.j.Wb.qk:H.i.j.Wb.hk;return b.replace(H.i.j.ll,c+"$&"+c)};
H.i.j.Rt=function(b){return"<"==b.charAt(0)?b.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+b+"</span>"};H.i.j.St=function(b){return H.i.j.Wb.pk+b+H.i.j.Wb.pg};H.i.j.Pt=function(b){return"<"==b.charAt(0)?b.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+b+"</span>"};H.i.j.Qt=function(b){return H.i.j.Wb.gk+b+H.i.j.Wb.pg};H.i.j.Hl=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;H.i.j.$m=/left/gi;H.i.j.Sn=/right/gi;H.i.j.xo=/%%%%/g;
H.i.j.Uv=function(b){return b.replace(H.i.j.Hl,":$1 $4 $3 $2").replace(H.i.j.$m,"%%%%").replace(H.i.j.Sn,H.i.j.Xc).replace(H.i.j.xo,H.i.j.Zc)};H.i.j.Jl=/([\u0591-\u05f2])"/g;H.i.j.po=/([\u0591-\u05f2])'/g;H.i.j.Zv=function(b){return b.replace(H.i.j.Jl,"$1\u05f4").replace(H.i.j.po,"$1\u05f3")};H.i.j.Qo=/\s+/;H.i.j.ym=/[\d\u06f0-\u06f9]/;H.i.j.Un=.4;
H.i.j.hh=function(b,c){var d=0,e=0,f=!1;b=H.i.j.Cb(b,c).split(H.i.j.Qo);for(c=0;c<b.length;c++){var g=b[c];H.i.j.cj(g)?(d++,e++):H.i.j.ui.test(g)?f=!0:H.i.j.Zh(g)?e++:H.i.j.ym.test(g)&&(f=!0)}return 0==e?f?H.i.j.aa.Eb:H.i.j.aa.Za:d/e>H.i.j.Un?H.i.j.aa.Fb:H.i.j.aa.Eb};H.i.j.Kt=function(b,c){return H.i.j.hh(b,c)==H.i.j.aa.Fb};H.i.j.Mw=function(b,c){b&&(c=H.i.j.zo(c))&&(b.style.textAlign=c==H.i.j.aa.Fb?H.i.j.Zc:H.i.j.Xc,b.dir=c==H.i.j.aa.Fb?"rtl":"ltr")};
H.i.j.Nw=function(b,c){switch(H.i.j.hh(c)){case H.i.j.aa.Eb:b.dir="ltr";break;case H.i.j.aa.Fb:b.dir="rtl";break;default:b.removeAttribute("dir")}};H.i.j.Up=B();H.b.H=function(){this.Nd="";this.Hf=null;this.Fk=H.b.H.wa};H.b.H.prototype.Va=!0;H.b.H.prototype.Ga=function(){return this.Nd.toString()};H.b.H.prototype.af=!0;H.b.H.prototype.vb=function(){return H.i.j.aa.Eb};H.sa&&(H.b.H.prototype.toString=function(){return"TrustedResourceUrl{"+this.Nd+"}"});H.b.H.K=function(b){return H.b.H.Zd(b).toString()};
H.b.H.Zd=function(b){if(b instanceof H.b.H&&b.constructor===H.b.H&&b.Fk===H.b.H.wa)return b.Nd;H.m.xa("expected object of type TrustedResourceUrl, got '"+b+a+H.ra(b));return"type_error:TrustedResourceUrl"};H.b.H.na=function(b){return b.Hf?b.Hf:H.b.H.K(b)};
H.b.H.format=function(b,c){var d=H.c.M.K(b);if(!H.b.H.Hj.test(d))throw Error("Invalid TrustedResourceUrl format: "+d);b=d.replace(H.b.H.bk,function(e,f){if(!Object.prototype.hasOwnProperty.call(c,f))throw Error('Found marker, "'+f+'", in format string, "'+d+'", but no valid label mapping found in args: '+JSON.stringify(c));e=c[f];return e instanceof H.c.M?H.c.M.K(e):encodeURIComponent(String(e))});return H.b.H.xc(b)};H.b.H.bk=/%{(\w+)}/g;H.b.H.Hj=/^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
H.b.H.Ik=/^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;H.b.H.eu=function(b,c,d,e){b=H.b.H.format(b,c);b=H.b.H.K(b);b=H.b.H.Ik.exec(b);c=b[3]||"";return H.b.H.xc(b[1]+H.b.H.dj("?",b[2]||"",d)+H.b.H.dj("#",c,e))};H.b.H.Fc=function(b){return H.b.H.xc(H.c.M.K(b))};H.b.H.iu=function(b){for(var c="",d=0;d<b.length;d++)c+=H.c.M.K(b[d]);return H.b.H.xc(c)};H.b.H.wa={};H.b.H.xc=function(b){var c=new H.b.H;c.Nd=H.b.Ya.ab?H.b.Ya.ab.createScriptURL(b):b;H.b.Ya.ab&&(c.Hf=H.b.Ya.ab.createURL(b));return c};
H.b.H.dj=function(b,c,d){if(null==d)return c;if(H.L(d))return d?b+encodeURIComponent(d):"";for(var e in d){var f=d[e];f=H.isArray(f)?f:[f];for(var g=0;g<f.length;g++){var h=f[g];null!=h&&(c||(c=b),c+=(c.length>b.length?"&":"")+encodeURIComponent(e)+"="+encodeURIComponent(String(h)))}}return c};H.c.A={};H.c.A.startsWith=function(b,c){return 0==b.lastIndexOf(c,0)};H.c.A.endsWith=function(b,c){var d=b.length-c.length;return 0<=d&&b.indexOf(c,d)==d};H.c.A.Ib=function(b,c){return 0==H.c.A.ed(c,b.substr(0,c.length))};H.c.A.Og=function(b,c){return 0==H.c.A.ed(c,b.substr(b.length-c.length,c.length))};H.c.A.Pg=function(b,c){return b.toLowerCase()==c.toLowerCase()};H.c.A.Lc=function(b){return/^[\s\xa0]*$/.test(b)};H.c.A.trim=H.pe&&String.prototype.trim?function(b){return b.trim()}:function(b){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(b)[1]};
H.c.A.ed=function(b,c){b=String(b).toLowerCase();c=String(c).toLowerCase();return b<c?-1:b==c?0:1};H.c.A.Nc=function(b,c){return b.replace(/(\r\n|\r|\n)/g,c?"<br />":"<br>")};
H.c.A.Ha=function(b,c){if(c)b=b.replace(H.c.A.Lf,"&amp;").replace(H.c.A.kg,"&lt;").replace(H.c.A.gg,"&gt;").replace(H.c.A.rg,"&quot;").replace(H.c.A.tg,"&#39;").replace(H.c.A.mg,"&#0;");else{if(!H.c.A.yj.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(H.c.A.Lf,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(H.c.A.kg,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(H.c.A.gg,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(H.c.A.rg,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(H.c.A.tg,"&#39;"));-1!=b.indexOf("\x00")&&
(b=b.replace(H.c.A.mg,"&#0;"))}return b};H.c.A.Lf=/&/g;H.c.A.kg=/</g;H.c.A.gg=/>/g;H.c.A.rg=/"/g;H.c.A.tg=/'/g;H.c.A.mg=/\x00/g;H.c.A.yj=/[\x00&<>"']/;H.c.A.sj=function(b){return H.c.A.Nc(b.replace(/  /g," &#160;"),void 0)};H.c.A.contains=function(b,c){return-1!=b.indexOf(c)};H.c.A.fd=function(b,c){return H.c.A.contains(b.toLowerCase(),c.toLowerCase())};
H.c.A.Kb=function(b,c){var d=0;b=H.c.A.trim(String(b)).split(".");c=H.c.A.trim(String(c)).split(".");for(var e=Math.max(b.length,c.length),f=0;0==d&&f<e;f++){var g=b[f]||"",h=c[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;d=H.c.A.Ae(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||H.c.A.Ae(0==g[2].length,0==h[2].length)||H.c.A.Ae(g[2],h[2]);g=g[3];h=h[3]}while(0==d)}return d};
H.c.A.Ae=function(b,c){return b<c?-1:b>c?1:0};H.b.s=function(){this.Md="";this.wk=H.b.s.wa};H.b.s.ta="about:invalid#zClosurez";H.b.s.prototype.Va=!0;H.b.s.prototype.Ga=function(){return this.Md.toString()};H.b.s.prototype.af=!0;H.b.s.prototype.vb=function(){return H.i.j.aa.Eb};H.sa&&(H.b.s.prototype.toString=function(){return"SafeUrl{"+this.Md+"}"});H.b.s.K=function(b){return H.b.s.na(b).toString()};
H.b.s.na=function(b){if(b instanceof H.b.s&&b.constructor===H.b.s&&b.wk===H.b.s.wa)return b.Md;H.m.xa("expected object of type SafeUrl, got '"+b+a+H.ra(b));return"type_error:SafeUrl"};H.b.s.Fc=function(b){return H.b.s.Ba(H.c.M.K(b))};H.b.ne=/^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;H.b.s.Gv=function(b){return H.b.ne.test(b)};
H.b.s.gu=function(b){b=H.b.ne.test(b.type)?H.Ua.url.wl(b):H.b.s.ta;return H.b.s.Ba(b)};H.b.Rj=/^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;H.b.s.Wl=function(b){b=b.replace(/(%0A|%0D)/g,"");var c=b.match(H.b.Rj);c=c&&H.b.ne.test(c[1]);return H.b.s.Ba(c?b:H.b.s.ta)};H.b.s.pu=function(b){H.c.A.Ib(b,"tel:")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.Ak=/^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;H.b.s.mu=function(b){H.b.Ak.test(decodeURIComponent(b))||(b=H.b.s.ta);return H.b.s.Ba(b)};
H.b.s.ju=function(b){H.c.A.Ib(b,"fb-messenger://share")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.ru=function(b){H.c.A.Ib(b,"whatsapp://send")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.nu=function(b){H.c.A.Ib(b,"sms:")&&H.b.s.Um(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Um=function(b){var c=b.indexOf("#");0<c&&(b=b.substring(0,c));c=b.match(/[?&]body=/gi);if(!c)return!0;if(1<c.length)return!1;b=b.match(/[?&]body=([^&]*)/)[1];if(!b)return!0;try{decodeURIComponent(b)}catch(d){return!1}return/^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(b)};
H.b.s.ou=function(b){H.c.A.Ib(b,"ssh://")||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Fw=function(b,c){return H.b.s.uf(/^chrome-extension:\/\/([^\/]+)\//,b,c)};H.b.s.Hw=function(b,c){return H.b.s.uf(/^moz-extension:\/\/([^\/]+)\//,b,c)};H.b.s.Gw=function(b,c){return H.b.s.uf(/^ms-browser-extension:\/\/([^\/]+)\//,b,c)};H.b.s.uf=function(b,c,d){(b=b.exec(c))?(b=b[1],-1==(d instanceof H.c.M?[H.c.M.K(d)]:d.map(function(e){return H.c.M.K(e)})).indexOf(b)&&(c=H.b.s.ta)):c=H.b.s.ta;return H.b.s.Ba(c)};
H.b.s.qu=function(b){return H.b.s.Ba(H.b.H.K(b))};H.b.oe=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;H.b.s.Ir=H.b.oe;H.b.s.Td=function(b){if(b instanceof H.b.s)return b;b=typeof b==v&&b.Va?b.Ga():String(b);H.b.oe.test(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.Pa=function(b,c){if(b instanceof H.b.s)return b;b=typeof b==v&&b.Va?b.Ga():String(b);if(c&&/^data:/i.test(b)&&(c=H.b.s.Wl(b),c.Ga()==b))return c;H.b.oe.test(b)||(b=H.b.s.ta);return H.b.s.Ba(b)};H.b.s.wa={};
H.b.s.Ba=function(b){var c=new H.b.s;c.Md=H.b.Ya.ab?H.b.Ya.ab.createURL(b):b;return c};H.b.s.Wo=H.b.s.Ba("about:blank");H.b.D=function(){this.Ld="";this.vk=H.b.D.wa};H.b.D.prototype.Va=!0;H.b.D.wa={};H.b.D.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.D.EMPTY:H.b.D.vc(b)};H.b.D.prototype.Ga=D("Ld");H.sa&&(H.b.D.prototype.toString=function(){return"SafeStyle{"+this.Ld+"}"});H.b.D.K=function(b){if(b instanceof H.b.D&&b.constructor===H.b.D&&b.vk===H.b.D.wa)return b.Ld;H.m.xa("expected object of type SafeStyle, got '"+b+a+H.ra(b));return"type_error:SafeStyle"};H.b.D.vc=function(b){return(new H.b.D).Qb(b)};
H.b.D.prototype.Qb=function(b){this.Ld=b;return this};H.b.D.EMPTY=H.b.D.vc("");H.b.D.ta="zClosurez";H.b.D.create=function(b){var c="",d;for(d in b){if(!/^[-_a-zA-Z0-9]+$/.test(d))throw Error("Name allows only [-_a-zA-Z0-9], got: "+d);var e=b[d];null!=e&&(e=H.isArray(e)?H.g.map(e,H.b.D.Vi).join(" "):H.b.D.Vi(e),c+=d+":"+e+";")}return c?H.b.D.vc(c):H.b.D.EMPTY};
H.b.D.Vi=function(b){if(b instanceof H.b.s)return'url("'+H.b.s.K(b).replace(/</g,"%3c").replace(/[\\"]/g,"\\$&")+'")';b=b instanceof H.c.M?H.c.M.K(b):H.b.D.bo(String(b));if(/[{;}]/.test(b))throw new H.m.oc("Value does not allow [{;}], got: %s.",[b]);return b};
H.b.D.bo=function(b){var c=b.replace(H.b.D.eg,"$1").replace(H.b.D.eg,"$1").replace(H.b.D.xg,"url");if(H.b.D.Kk.test(c)){if(H.b.D.Pj.test(b))return H.m.xa("String value disallows comments, got: "+b),H.b.D.ta;if(!H.b.D.um(b))return H.m.xa("String value requires balanced quotes, got: "+b),H.b.D.ta;if(!H.b.D.vm(b))return H.m.xa("String value requires balanced square brackets and one identifier per pair of brackets, got: "+b),H.b.D.ta}else return H.m.xa("String value allows only "+H.b.D.Ag+" and simple functions, got: "+
b),H.b.D.ta;return H.b.D.co(b)};H.b.D.um=function(b){for(var c=!0,d=!0,e=0;e<b.length;e++){var f=b.charAt(e);"'"==f&&d?c=!c:'"'==f&&c&&(d=!d)}return c&&d};H.b.D.vm=function(b){for(var c=!0,d=/^[-_a-zA-Z0-9]$/,e=0;e<b.length;e++){var f=b.charAt(e);if("]"==f){if(c)return!1;c=!0}else if("["==f){if(!c)return!1;c=!1}else if(!c&&!d.test(f))return!1}return c};H.b.D.Ag="[-,.\"'%_!# a-zA-Z0-9\\[\\]]";H.b.D.Kk=new RegExp("^"+H.b.D.Ag+"+$");H.b.D.xg=/\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
H.b.D.eg=/\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g;H.b.D.Pj=/\/\*/;H.b.D.co=function(b){return b.replace(H.b.D.xg,function(c,d,e,f){var g="";e=e.replace(/^(['"])(.*)\1$/,function(h,k,m){g=k;return m});c=H.b.s.Td(e).Ga();return d+g+c+g+f})};H.b.D.concat=function(b){function c(e){H.isArray(e)?H.g.forEach(e,c):d+=H.b.D.K(e)}var d="";H.g.forEach(arguments,c);return d?H.b.D.vc(d):H.b.D.EMPTY};H.b.Y=function(){this.Kd="";this.uk=H.b.Y.wa};H.b.Y.prototype.Va=!0;H.b.Y.wa={};
H.b.Y.Bt=function(b,c){if(H.c.A.contains(b,"<"))throw Error("Selector does not allow '<', got: "+b);var d=b.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g,"");if(!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(d))throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: "+b);if(!H.b.Y.tm(d))throw Error("() and [] in selector must be balanced, got: "+b);c instanceof H.b.D||(c=H.b.D.create(c));b=b+"{"+H.b.D.K(c).replace(/</g,"\\3C ")+"}";return H.b.Y.wc(b)};
H.b.Y.tm=function(b){for(var c={"(":")","[":"]"},d=[],e=0;e<b.length;e++){var f=b[e];if(c[f])d.push(c[f]);else if(H.object.contains(c,f)&&d.pop()!=f)return!1}return 0==d.length};H.b.Y.concat=function(b){function c(e){H.isArray(e)?H.g.forEach(e,c):d+=H.b.Y.K(e)}var d="";H.g.forEach(arguments,c);return H.b.Y.wc(d)};H.b.Y.Fc=function(b){b=H.c.M.K(b);return 0===b.length?H.b.Y.EMPTY:H.b.Y.wc(b)};H.b.Y.prototype.Ga=D("Kd");H.sa&&(H.b.Y.prototype.toString=function(){return"SafeStyleSheet{"+this.Kd+"}"});
H.b.Y.K=function(b){if(b instanceof H.b.Y&&b.constructor===H.b.Y&&b.uk===H.b.Y.wa)return b.Kd;H.m.xa("expected object of type SafeStyleSheet, got '"+b+a+H.ra(b));return"type_error:SafeStyleSheet"};H.b.Y.wc=function(b){return(new H.b.Y).Qb(b)};H.b.Y.prototype.Qb=function(b){this.Kd=b;return this};H.b.Y.EMPTY=H.b.Y.wc("");H.h={};H.h.userAgent={};H.h.userAgent.F={};H.h.userAgent.F.Fh=function(){var b=H.h.userAgent.F.hm();return b&&(b=b.userAgent)?b:""};H.h.userAgent.F.hm=function(){return H.global.navigator};H.h.userAgent.F.qj=H.h.userAgent.F.Fh();H.h.userAgent.F.fx=function(b){H.h.userAgent.F.qj=b||H.h.userAgent.F.Fh()};H.h.userAgent.F.cc=function(){return H.h.userAgent.F.qj};H.h.userAgent.F.T=function(b){return H.c.A.contains(H.h.userAgent.F.cc(),b)};
H.h.userAgent.F.nf=function(b){return H.c.A.fd(H.h.userAgent.F.cc(),b)};H.h.userAgent.F.jh=function(b){for(var c=/(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g,d=[],e;e=c.exec(b);)d.push([e[1],e[2],e[3]||void 0]);return d};H.h.userAgent.B={};H.h.userAgent.B.Ii=function(){return H.h.userAgent.F.T("Opera")};H.h.userAgent.B.sn=function(){return H.h.userAgent.F.T("Trident")||H.h.userAgent.F.T("MSIE")};H.h.userAgent.B.lf=function(){return H.h.userAgent.F.T("Edge")};H.h.userAgent.B.Gi=function(){return H.h.userAgent.F.T("Edg/")};H.h.userAgent.B.Hi=function(){return H.h.userAgent.F.T("OPR")};H.h.userAgent.B.mf=function(){return H.h.userAgent.F.T("Firefox")||H.h.userAgent.F.T("FxiOS")};
H.h.userAgent.B.Ji=function(){return H.h.userAgent.F.T("Safari")&&!(H.h.userAgent.B.jf()||H.h.userAgent.B.kf()||H.h.userAgent.B.Ii()||H.h.userAgent.B.lf()||H.h.userAgent.B.Gi()||H.h.userAgent.B.Hi()||H.h.userAgent.B.mf()||H.h.userAgent.B.vi()||H.h.userAgent.F.T("Android"))};H.h.userAgent.B.kf=function(){return H.h.userAgent.F.T("Coast")};
H.h.userAgent.B.tn=function(){return(H.h.userAgent.F.T("iPad")||H.h.userAgent.F.T("iPhone"))&&!H.h.userAgent.B.Ji()&&!H.h.userAgent.B.jf()&&!H.h.userAgent.B.kf()&&!H.h.userAgent.B.mf()&&H.h.userAgent.F.T("AppleWebKit")};H.h.userAgent.B.jf=function(){return(H.h.userAgent.F.T("Chrome")||H.h.userAgent.F.T("CriOS"))&&!H.h.userAgent.B.lf()};H.h.userAgent.B.rn=function(){return H.h.userAgent.F.T("Android")&&!(H.h.userAgent.B.hi()||H.h.userAgent.B.Im()||H.h.userAgent.B.ff()||H.h.userAgent.B.vi())};
H.h.userAgent.B.ff=H.h.userAgent.B.Ii;H.h.userAgent.B.Bd=H.h.userAgent.B.sn;H.h.userAgent.B.Ab=H.h.userAgent.B.lf;H.h.userAgent.B.Gm=H.h.userAgent.B.Gi;H.h.userAgent.B.Bv=H.h.userAgent.B.Hi;H.h.userAgent.B.Im=H.h.userAgent.B.mf;H.h.userAgent.B.Fv=H.h.userAgent.B.Ji;H.h.userAgent.B.jv=H.h.userAgent.B.kf;H.h.userAgent.B.sv=H.h.userAgent.B.tn;H.h.userAgent.B.hi=H.h.userAgent.B.jf;H.h.userAgent.B.gv=H.h.userAgent.B.rn;H.h.userAgent.B.vi=function(){return H.h.userAgent.F.T("Silk")};
H.h.userAgent.B.Hc=function(){function b(f){f=H.g.find(f,e);return d[f]||""}var c=H.h.userAgent.F.cc();if(H.h.userAgent.B.Bd())return H.h.userAgent.B.gm(c);c=H.h.userAgent.F.jh(c);var d={};H.g.forEach(c,function(f){d[f[0]]=f[1]});var e=H.Sb(H.object.Lb,d);return H.h.userAgent.B.ff()?b(["Version","Opera"]):H.h.userAgent.B.Ab()?b(["Edge"]):H.h.userAgent.B.Gm()?b(["Edg"]):H.h.userAgent.B.hi()?b(["Chrome","CriOS"]):(c=c[2])&&c[1]||""};
H.h.userAgent.B.Xa=function(b){return 0<=H.c.A.Kb(H.h.userAgent.B.Hc(),b)};H.h.userAgent.B.gm=function(b){var c=/rv: *([\d\.]*)/.exec(b);if(c&&c[1])return c[1];c="";var d=/MSIE +([\d\.]+)/.exec(b);if(d&&d[1])if(b=/Trident\/(\d.\d)/.exec(b),"7.0"==d[1])if(b&&b[1])switch(b[1]){case "4.0":c="8.0";break;case "5.0":c="9.0";break;case "6.0":c="10.0";break;case "7.0":c="11.0"}else c="7.0";else c=d[1];return c};H.b.u=function(){this.Id="";this.sk=H.b.u.wa;this.md=null};H.b.u.prototype.af=!0;H.b.u.prototype.vb=D("md");H.b.u.prototype.Va=!0;H.b.u.prototype.Ga=function(){return this.Id.toString()};H.sa&&(H.b.u.prototype.toString=function(){return"SafeHtml{"+this.Id+"}"});H.b.u.K=function(b){return H.b.u.Db(b).toString()};H.b.u.Db=function(b){if(b instanceof H.b.u&&b.constructor===H.b.u&&b.sk===H.b.u.wa)return b.Id;H.m.xa("expected object of type SafeHtml, got '"+b+a+H.ra(b));return"type_error:SafeHtml"};
H.b.u.Ha=function(b){if(b instanceof H.b.u)return b;var c=typeof b==v,d=null;c&&b.af&&(d=b.vb());return H.b.u.Sa(H.c.A.Ha(c&&b.Va?b.Ga():String(b)),d)};H.b.u.Xu=function(b){if(b instanceof H.b.u)return b;b=H.b.u.Ha(b);return H.b.u.Sa(H.c.A.Nc(H.b.u.K(b)),b.vb())};H.b.u.Yu=function(b){if(b instanceof H.b.u)return b;b=H.b.u.Ha(b);return H.b.u.Sa(H.c.A.sj(H.b.u.K(b)),b.vb())};H.b.u.from=H.b.u.Ha;H.b.u.zg=/^[a-zA-Z0-9-]+$/;
H.b.u.Hk={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0};H.b.u.lk={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};H.b.u.create=function(b,c,d){H.b.u.Po(String(b));return H.b.u.Nb(String(b),c,d)};H.b.u.Po=function(b){if(!H.b.u.zg.test(b))throw Error("Invalid tag name <"+b+">.");if(b.toUpperCase()in H.b.u.lk)throw Error("Tag name <"+b+"> is not allowed for SafeHtml.");};
H.b.u.xt=function(b,c,d,e){b&&H.b.H.K(b);var f={};f.src=b||null;f.srcdoc=c&&H.b.u.K(c);b=H.b.u.hd(f,{sandbox:""},d);return H.b.u.Nb("iframe",b,e)};H.b.u.Ct=function(b,c,d,e){if(!H.b.u.pl())throw Error("The browser does not support sandboxed iframes.");var f={};f.src=b?H.b.s.K(H.b.s.Td(b)):null;f.srcdoc=c||null;f.sandbox="";b=H.b.u.hd(f,{},d);return H.b.u.Nb("iframe",b,e)};H.b.u.pl=function(){return H.global.HTMLIFrameElement&&"sandbox"in H.global.HTMLIFrameElement.prototype};
H.b.u.Dt=function(b,c){H.b.H.K(b);b=H.b.u.hd({src:b},{},c);return H.b.u.Nb("script",b)};H.b.u.createScript=function(b,c){for(var d in c){var e=d.toLowerCase();if("language"==e||"src"==e||"text"==e||"type"==e)throw Error('Cannot set "'+e+'" attribute');}d="";b=H.g.concat(b);for(e=0;e<b.length;e++)d+=H.b.W.K(b[e]);b=H.b.u.Sa(d,H.i.j.aa.Za);return H.b.u.Nb("script",c,b)};
H.b.u.Et=function(b,c){c=H.b.u.hd({type:"text/css"},{},c);var d="";b=H.g.concat(b);for(var e=0;e<b.length;e++)d+=H.b.Y.K(b[e]);b=H.b.u.Sa(d,H.i.j.aa.Za);return H.b.u.Nb("style",c,b)};H.b.u.At=function(b,c){b=H.b.s.K(H.b.s.Td(b));(H.h.userAgent.B.Bd()||H.h.userAgent.B.Ab())&&H.c.A.contains(b,";")&&(b="'"+b.replace(/'/g,"%27")+"'");return H.b.u.Nb("meta",{"http-equiv":"refresh",content:(c||0)+"; url="+b})};
H.b.u.Yl=function(b,c,d){if(d instanceof H.c.M)d=H.c.M.K(d);else if("style"==c.toLowerCase())d=H.b.u.nm(d);else{if(/^on/i.test(c))throw Error('Attribute "'+c+'" requires goog.string.Const value, "'+d+'" given.');if(c.toLowerCase()in H.b.u.Hk)if(d instanceof H.b.H)d=H.b.H.K(d);else if(d instanceof H.b.s)d=H.b.s.K(d);else if(H.L(d))d=H.b.s.Td(d).Ga();else throw Error('Attribute "'+c+'" on tag "'+b+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+d+'" given.');}d.Va&&(d=d.Ga());
return c+'="'+H.c.A.Ha(String(d))+'"'};H.b.u.nm=function(b){if(!H.Da(b))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof b+" given: "+b);b instanceof H.b.D||(b=H.b.D.create(b));return H.b.D.K(b)};H.b.u.Gt=function(b,c,d,e){c=H.b.u.create(c,d,e);c.md=b;return c};
H.b.u.join=function(b,c){function d(g){H.isArray(g)?H.g.forEach(g,d):(g=H.b.u.Ha(g),f.push(H.b.u.K(g)),g=g.vb(),e==H.i.j.aa.Za?e=g:g!=H.i.j.aa.Za&&e!=g&&(e=null))}b=H.b.u.Ha(b);var e=b.vb(),f=[];H.g.forEach(c,d);return H.b.u.Sa(f.join(H.b.u.K(b)),e)};H.b.u.concat=function(b){return H.b.u.join(H.b.u.EMPTY,Array.prototype.slice.call(arguments))};H.b.u.rt=function(b,c){var d=H.b.u.concat(H.g.slice(arguments,1));d.md=b;return d};H.b.u.wa={};H.b.u.Sa=function(b,c){return(new H.b.u).Qb(b,c)};
H.b.u.prototype.Qb=function(b,c){this.Id=H.b.Ya.ab?H.b.Ya.ab.createHTML(b):b;this.md=c;return this};H.b.u.Nb=function(b,c,d){var e=null;var f="<"+b+H.b.u.uo(b,c);H.zb(d)?H.isArray(d)||(d=[d]):d=[];H.a.tags.Ym(b.toLowerCase())?f+=">":(e=H.b.u.concat(d),f+=">"+H.b.u.K(e)+"</"+b+">",e=e.vb());(b=c&&c.dir)&&(e=/^(ltr|rtl|auto)$/i.test(b)?H.i.j.aa.Za:null);return H.b.u.Sa(f,e)};
H.b.u.uo=function(b,c){var d="";if(c)for(var e in c){if(!H.b.u.zg.test(e))throw Error('Invalid attribute name "'+e+'".');var f=c[e];H.zb(f)&&(d+=" "+H.b.u.Yl(b,e,f))}return d};H.b.u.hd=function(b,c,d){var e={},f;for(f in b)e[f]=b[f];for(f in c)e[f]=c[f];for(f in d){var g=f.toLowerCase();if(g in b)throw Error('Cannot override "'+g+'" attribute, got "'+f+'" with value "'+d[f]+'"');g in c&&delete e[g];e[f]=d[f]}return e};H.b.u.Rp=H.b.u.Sa("<!DOCTYPE html>",H.i.j.aa.Za);H.b.u.EMPTY=H.b.u.Sa("",H.i.j.aa.Za);
H.b.u.Xf=H.b.u.Sa("<br>",H.i.j.aa.Za);H.b.kb={};H.b.kb.Si=function(b,c){return H.b.u.Sa(c,null)};H.b.kb.Cw=function(b,c){return H.b.W.uc(c)};H.b.kb.Dw=function(b,c){return H.b.D.vc(c)};H.b.kb.Ew=function(b,c){return H.b.Y.wc(c)};H.b.kb.$n=function(b,c){return H.b.s.Ba(c)};H.b.kb.Cx=function(b,c){return H.b.H.xc(c)};H.a.O={};H.a.O.Mq={Zo:"afterbegin",$o:"afterend",qp:"beforebegin",rp:"beforeend"};H.a.O.$u=function(b,c,d){b.insertAdjacentHTML(c,H.b.u.Db(d))};H.a.O.zk={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};H.a.O.Mm=H.V.ol(function(){if(H.sa&&"undefined"===typeof document)return!1;var b=document.createElement("div"),c=document.createElement("div");c.appendChild(document.createElement("div"));b.appendChild(c);if(H.sa&&!b.firstChild)return!1;c=b.firstChild.firstChild;b.innerHTML=H.b.u.Db(H.b.u.EMPTY);return!c.parentElement});
H.a.O.Ko=function(b,c){if(H.a.O.Mm())for(;b.lastChild;)b.removeChild(b.lastChild);b.innerHTML=H.b.u.Db(c)};H.a.O.xf=function(b,c){if(H.m.za&&H.a.O.zk[b.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+b.tagName+".");H.a.O.Ko(b,c)};H.a.O.Zw=function(b,c){b.outerHTML=H.b.u.Db(c)};H.a.O.Qw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.Yk(b).action=H.b.s.na(c)};H.a.O.Kw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.Wk(b).formAction=H.b.s.na(c)};
H.a.O.Vw=function(b,c){c=c instanceof H.b.s?c:H.b.s.Pa(c);H.a.m.al(b).formAction=H.b.s.na(c)};H.a.O.cx=function(b,c){b.style.cssText=H.b.D.K(c)};H.a.O.Il=function(b){b.write(H.b.u.Db(H.b.u.EMPTY))};H.a.O.Iw=function(b,c){H.a.m.Uk(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.href=H.b.s.na(c)};H.a.O.io=function(b,c){H.a.m.$k(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:image\//i.test(c));b.src=H.b.s.na(c)};
H.a.O.Jw=function(b,c){H.a.m.Vk(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:audio\//i.test(c));b.src=H.b.s.na(c)};H.a.O.gx=function(b,c){H.a.m.dl(b);c=c instanceof H.b.s?c:H.b.s.Pa(c,/^data:video\//i.test(c));b.src=H.b.s.na(c)};H.a.O.Ow=function(b,c){H.a.m.Xk(b);b.src=H.b.H.Zd(c)};H.a.O.Sw=function(b,c){H.a.m.Zk(b);b.src=H.b.H.na(c)};H.a.O.ho=function(b){var c=H.b.H.Fc(H.c.M.EMPTY);H.a.m.Gg(b);b.src=H.b.H.na(c)};H.a.O.Uw=function(b,c){H.a.m.Gg(b);b.srcdoc=H.b.u.Db(c)};
H.a.O.Ww=function(b,c,d){H.a.m.bl(b);b.rel=d;H.c.A.fd(d,"stylesheet")?b.href=H.b.H.na(c):b.href=c instanceof H.b.H?H.b.H.na(c):c instanceof H.b.s?H.b.s.na(c):H.b.s.na(H.b.s.Pa(c))};H.a.O.Yw=function(b,c){H.a.m.cl(b);b.data=H.b.H.Zd(c)};H.a.O.mo=function(b,c){H.a.m.Hg(b);b.src=H.b.H.Zd(c);(c=H.Sh())&&b.setAttribute("nonce",c)};H.a.O.bx=function(b,c){H.a.m.Hg(b);b.text=H.b.W.pj(c);(c=H.Sh())&&b.setAttribute("nonce",c)};H.a.O.Xw=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.href=H.b.s.na(c)};
H.a.O.Ys=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.assign(H.b.s.na(c))};H.a.O.uw=function(b,c){H.a.m.we(b);c=c instanceof H.b.s?c:H.b.s.Pa(c);b.replace(H.b.s.na(c))};H.a.O.fw=function(b,c,d,e,f){b=b instanceof H.b.s?b:H.b.s.Pa(b);return(c||H.global).open(H.b.s.na(b),d?H.c.M.K(d):"",e,f)};H.a.O.hw=function(b,c){return H.a.O.parseFromString(b,c,"text/html")};H.a.O.parseFromString=function(b,c,d){return b.parseFromString(H.b.u.Db(c),d)};
H.a.O.yt=function(b){if(!/^image\/.*/g.test(b.type))throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");var c=H.global.URL.createObjectURL(b);b=new H.global.Image;b.onload=function(){H.global.URL.revokeObjectURL(c)};H.a.O.io(b,H.b.kb.$n(H.c.M.from("Image blob URL."),c));return b};H.c.Uj=!1;H.c.Zj=!1;H.c.yg={lg:"\u00a0"};H.c.startsWith=H.c.A.startsWith;H.c.endsWith=H.c.A.endsWith;H.c.Ib=H.c.A.Ib;H.c.Og=H.c.A.Og;H.c.Pg=H.c.A.Pg;H.c.sx=function(b,c){for(var d=b.split("%s"),e="",f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join("%s")};H.c.kt=function(b){return b.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};H.c.Lc=H.c.A.Lc;H.c.nv=function(b){return 0==b.length};H.c.Ca=H.c.Lc;H.c.Hm=function(b){return H.c.Lc(H.c.on(b))};
H.c.mv=H.c.Hm;H.c.hv=function(b){return!/[^\t\n\r ]/.test(b)};H.c.ev=function(b){return!/[^a-zA-Z]/.test(b)};H.c.Av=function(b){return!/[^0-9]/.test(b)};H.c.fv=function(b){return!/[^a-zA-Z0-9]/.test(b)};H.c.Hv=function(b){return" "==b};H.c.Iv=function(b){return 1==b.length&&" "<=b&&"~">=b||"\u0080"<=b&&"\ufffd">=b};H.c.qx=function(b){return b.replace(/(\r\n|\r|\n)+/g," ")};H.c.rl=function(b){return b.replace(/(\r\n|\r|\n)/g,"\n")};H.c.bw=function(b){return b.replace(/\xa0|\s/g," ")};
H.c.aw=function(b){return b.replace(/\xa0|[ \t]+/g," ")};H.c.jt=function(b){return b.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};H.c.trim=H.c.A.trim;H.c.trimLeft=function(b){return b.replace(/^[\s\xa0]+/,"")};H.c.trimRight=function(b){return b.replace(/[\s\xa0]+$/,"")};H.c.ed=H.c.A.ed;
H.c.Ni=function(b,c,d){if(b==c)return 0;if(!b)return-1;if(!c)return 1;for(var e=b.toLowerCase().match(d),f=c.toLowerCase().match(d),g=Math.min(e.length,f.length),h=0;h<g;h++){d=e[h];var k=f[h];if(d!=k)return b=parseInt(d,10),!isNaN(b)&&(c=parseInt(k,10),!isNaN(c)&&b-c)?b-c:d<k?-1:1}return e.length!=f.length?e.length-f.length:b<c?-1:1};H.c.cv=function(b,c){return H.c.Ni(b,c,/\d+|\D+/g)};H.c.Vl=function(b,c){return H.c.Ni(b,c,/\d+|\.\d+|\D+/g)};H.c.dw=H.c.Vl;H.c.Rc=function(b){return encodeURIComponent(String(b))};
H.c.$d=function(b){return decodeURIComponent(b.replace(/\+/g," "))};H.c.Nc=H.c.A.Nc;H.c.Ha=function(b,c){b=H.c.A.Ha(b,c);H.c.Uj&&(b=b.replace(H.c.Yj,"&#101;"));return b};H.c.Yj=/e/g;H.c.nj=function(b){return H.c.contains(b,"&")?!H.c.Zj&&"document"in H.global?H.c.oj(b):H.c.Ho(b):b};H.c.Dx=function(b,c){return H.c.contains(b,"&")?H.c.oj(b,c):b};
H.c.oj=function(b,c){var d={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'};var e=c?c.createElement("div"):H.global.document.createElement("div");return b.replace(H.c.dk,function(f,g){var h=d[f];if(h)return h;"#"==g.charAt(0)&&(g=Number("0"+g.substr(1)),isNaN(g)||(h=String.fromCharCode(g)));h||(H.a.O.xf(e,H.b.kb.Si(H.c.M.from("Single HTML entity."),f+" ")),h=e.firstChild.nodeValue.slice(0,-1));return d[f]=h})};
H.c.Ho=function(b){return b.replace(/&([^;]+);/g,function(c,d){switch(d){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:return"#"!=d.charAt(0)||(d=Number("0"+d.substr(1)),isNaN(d))?c:String.fromCharCode(d)}})};H.c.dk=/&([^;\s<&]+);?/g;H.c.sj=function(b){return H.c.Nc(b.replace(/  /g," &#160;"),void 0)};H.c.jw=function(b){return b.replace(/(^|[\n ]) /g,"$1"+H.c.yg.lg)};
H.c.rx=function(b,c){for(var d=c.length,e=0;e<d;e++){var f=1==d?c:c.charAt(e);if(b.charAt(0)==f&&b.charAt(b.length-1)==f)return b.substring(1,b.length-1)}return b};H.c.truncate=function(b,c,d){d&&(b=H.c.nj(b));b.length>c&&(b=b.substring(0,c-3)+"...");d&&(b=H.c.Ha(b));return b};H.c.Bx=function(b,c,d,e){d&&(b=H.c.nj(b));e&&b.length>c?(e>c&&(e=c),b=b.substring(0,c-e)+"..."+b.substring(b.length-e)):b.length>c&&(e=Math.floor(c/2),b=b.substring(0,e+c%2)+"..."+b.substring(b.length-e));d&&(b=H.c.Ha(b));return b};
H.c.Bf={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"\\u003C"};H.c.Cd={"'":"\\'"};H.c.quote=function(b){b=String(b);for(var c=['"'],d=0;d<b.length;d++){var e=b.charAt(d),f=e.charCodeAt(0);c[d+1]=H.c.Bf[e]||(31<f&&127>f?e:H.c.gh(e))}c.push('"');return c.join("")};H.c.Vt=function(b){for(var c=[],d=0;d<b.length;d++)c[d]=H.c.gh(b.charAt(d));return c.join("")};
H.c.gh=function(b){if(b in H.c.Cd)return H.c.Cd[b];if(b in H.c.Bf)return H.c.Cd[b]=H.c.Bf[b];var c=b.charCodeAt(0);if(31<c&&127>c)var d=b;else{if(256>c){if(d="\\x",16>c||256<c)d+="0"}else d="\\u",4096>c&&(d+="0");d+=c.toString(16).toUpperCase()}return H.c.Cd[b]=d};H.c.contains=H.c.A.contains;H.c.fd=H.c.A.fd;H.c.ut=function(b,c){return b&&c?b.split(c).length-1:0};H.c.kc=A();H.c.remove=function(b,c){return b.replace(c,"")};H.c.ow=function(b,c){c=new RegExp(H.c.rf(c),"g");return b.replace(c,"")};
H.c.tw=function(b,c,d){c=new RegExp(H.c.rf(c),"g");return b.replace(c,d.replace(/\$/g,"$$$$"))};H.c.rf=function(b){return String(b).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};H.c.repeat=String.prototype.repeat?function(b,c){return b.repeat(c)}:function(b,c){return Array(c+1).join(b)};H.c.gw=function(b,c,d){b=H.ca(d)?b.toFixed(d):String(b);d=b.indexOf(".");-1==d&&(d=b.length);return H.c.repeat("0",Math.max(0,c-d))+b};H.c.on=function(b){return null==b?"":String(b)};
H.c.nl=function(b){return Array.prototype.join.call(arguments,"")};H.c.Ph=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^H.now()).toString(36)};H.c.Kb=H.c.A.Kb;H.c.Wu=function(b){for(var c=0,d=0;d<b.length;++d)c=31*c+b.charCodeAt(d)>>>0;return c};H.c.Io=2147483648*Math.random()|0;H.c.Ft=function(){return"goog_"+H.c.Io++};H.c.xx=function(b){var c=Number(b);return 0==c&&H.c.Lc(b)?NaN:c};H.c.tv=function(b){return/^[a-z]+([A-Z][a-z]*)*$/.test(b)};
H.c.Jv=function(b){return/^([A-Z][a-z]*)+$/.test(b)};H.c.wx=function(b){return String(b).replace(/\-([a-z])/g,function(c,d){return d.toUpperCase()})};H.c.yx=function(b){return String(b).replace(/([A-Z])/g,"-$1").toLowerCase()};H.c.zx=function(b,c){c=H.L(c)?H.c.rf(c):"\\s";return b.replace(new RegExp("(^"+(c?"|["+c+"]+":"")+")([a-z])","g"),function(d,e,f){return e+f.toUpperCase()})};H.c.ft=function(b){return String(b.charAt(0)).toUpperCase()+String(b.substr(1)).toLowerCase()};
H.c.parseInt=function(b){isFinite(b)&&(b=String(b));return H.L(b)?/^\s*-?0x/i.test(b)?parseInt(b,16):parseInt(b,10):NaN};H.c.kx=function(b,c,d){b=b.split(c);for(var e=[];0<d&&b.length;)e.push(b.shift()),d--;b.length&&e.push(b.join(c));return e};H.c.Mv=function(b,c){if(c)typeof c==y&&(c=[c]);else return b;for(var d=-1,e=0;e<c.length;e++)if(""!=c[e]){var f=b.lastIndexOf(c[e]);f>d&&(d=f)}return-1==d?b:b.slice(d+1)};
H.c.Ot=function(b,c){var d=[],e=[];if(b==c)return 0;if(!b.length||!c.length)return Math.max(b.length,c.length);for(var f=0;f<c.length+1;f++)d[f]=f;for(f=0;f<b.length;f++){e[0]=f+1;for(var g=0;g<c.length;g++)e[g+1]=Math.min(e[g]+1,d[g+1]+1,d[g]+Number(b[f]!=c[g]));for(g=0;g<d.length;g++)d[g]=e[g]}return e[c.length]};H.h.userAgent.ea={};H.h.userAgent.ea.Rm=function(){return H.h.userAgent.F.T("Presto")};H.h.userAgent.ea.Vm=function(){return H.h.userAgent.F.T("Trident")||H.h.userAgent.F.T("MSIE")};H.h.userAgent.ea.Ab=function(){return H.h.userAgent.F.T("Edge")};H.h.userAgent.ea.yi=function(){return H.h.userAgent.F.nf("WebKit")&&!H.h.userAgent.ea.Ab()};H.h.userAgent.ea.Jm=function(){return H.h.userAgent.F.T("Gecko")&&!H.h.userAgent.ea.yi()&&!H.h.userAgent.ea.Vm()&&!H.h.userAgent.ea.Ab()};
H.h.userAgent.ea.Hc=function(){var b=H.h.userAgent.F.cc();if(b){b=H.h.userAgent.F.jh(b);var c=H.h.userAgent.ea.dm(b);if(c)return"Gecko"==c[0]?H.h.userAgent.ea.rm(b):c[1];b=b[0];var d;if(b&&(d=b[2])&&(d=/Trident\/([^\s;]+)/.exec(d)))return d[1]}return""};H.h.userAgent.ea.dm=function(b){if(!H.h.userAgent.ea.Ab())return b[1];for(var c=0;c<b.length;c++){var d=b[c];if("Edge"==d[0])return d}};H.h.userAgent.ea.Xa=function(b){return 0<=H.c.Kb(H.h.userAgent.ea.Hc(),b)};
H.h.userAgent.ea.rm=function(b){return(b=H.g.find(b,function(c){return"Firefox"==c[0]}))&&b[1]||""};H.async.jj=function(b){H.global.setTimeout(function(){throw b;},0)};H.async.Na=function(b,c,d){var e=b;c&&(e=H.bind(b,c));e=H.async.Na.tj(e);H.Wa(H.global.setImmediate)&&(d||H.async.Na.No())?H.global.setImmediate(e):(H.async.Na.Zi||(H.async.Na.Zi=H.async.Na.mm()),H.async.Na.Zi(e))};H.async.Na.No=function(){return H.global.Window&&H.global.Window.prototype&&!H.h.userAgent.B.Ab()&&H.global.Window.prototype.setImmediate==H.global.setImmediate?!1:!0};
H.async.Na.mm=function(){var b=H.global.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!H.h.userAgent.ea.Rm()&&(b=function(){var f=document.createElement("IFRAME");f.style.display="none";H.a.O.ho(f);document.documentElement.appendChild(f);var g=f.contentWindow;f=g.document;f.open();H.a.O.Il(f);f.close();var h="callImmediate"+Math.random(),k="file:"==g.location.protocol?"*":g.location.protocol+"//"+g.location.host;f=H.bind(function(m){if(("*"==
k||m.origin==k)&&m.data==h)this.port1.onmessage()},this);g.addEventListener("message",f,!1);this.port1={};this.port2={postMessage:function(){g.postMessage(h,k)}}});if("undefined"!==typeof b&&!H.h.userAgent.B.Bd()){var c=new b,d={},e=d;c.port1.onmessage=function(){if(H.ca(d.next)){d=d.next;var f=d.Qg;d.Qg=null;f()}};return function(f){e.next={Qg:f};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement(l)?function(f){var g=document.createElement(l);
g.onreadystatechange=function(){g.onreadystatechange=null;g.parentNode.removeChild(g);g=null;f();f=null};document.documentElement.appendChild(g)}:function(f){H.global.setTimeout(f,0)}};H.async.Na.tj=H.V.ai;H.debug.pa.register(function(b){H.async.Na.tj=b});H.async.gb=function(){this.be=this.nc=null};H.async.gb.ge=100;H.async.gb.Ec=new H.async.Wc(function(){return new H.async.re},function(b){b.reset()},H.async.gb.ge);H.async.gb.prototype.add=function(b,c){var d=H.async.gb.Ec.get();d.set(b,c);this.be?this.be.next=d:this.nc=d;this.be=d};H.async.gb.prototype.remove=function(){var b=null;this.nc&&(b=this.nc,this.nc=this.nc.next,this.nc||(this.be=null),b.next=null);return b};H.async.re=function(){this.next=this.scope=this.Je=null};
H.async.re.prototype.set=function(b,c){this.Je=b;this.scope=c;this.next=null};H.async.re.prototype.reset=function(){this.next=this.scope=this.Je=null};H.Dj=!1;H.async.X=function(b,c){H.async.X.Ud||H.async.X.Dm();H.async.X.ae||(H.async.X.Ud(),H.async.X.ae=!0);H.async.X.Jf.add(b,c)};H.async.X.Dm=function(){if(H.Dj||H.global.Promise&&H.global.Promise.resolve){var b=H.global.Promise.resolve(void 0);H.async.X.Ud=function(){b.then(H.async.X.Od)}}else H.async.X.Ud=function(){H.async.Na(H.async.X.Od)}};H.async.X.du=function(b){H.async.X.Ud=function(){H.async.Na(H.async.X.Od);b&&b(H.async.X.Od)}};H.async.X.ae=!1;H.async.X.Jf=new H.async.gb;
H.sa&&(H.async.X.xw=function(){H.async.X.ae=!1;H.async.X.Jf=new H.async.gb});H.async.X.Od=function(){for(var b;b=H.async.X.Jf.remove();){try{b.Je.call(b.scope)}catch(c){H.async.jj(c)}H.async.gb.Ec.put(b)}H.async.X.ae=!1};H.h.userAgent.platform={};H.h.userAgent.platform.gi=function(){return H.h.userAgent.F.T("Android")};H.h.userAgent.platform.ri=function(){return H.h.userAgent.F.T("iPod")};H.h.userAgent.platform.pi=function(){return H.h.userAgent.F.T("iPhone")&&!H.h.userAgent.F.T("iPod")&&!H.h.userAgent.F.T("iPad")};H.h.userAgent.platform.oi=function(){return H.h.userAgent.F.T("iPad")};H.h.userAgent.platform.ni=function(){return H.h.userAgent.platform.pi()||H.h.userAgent.platform.oi()||H.h.userAgent.platform.ri()};
H.h.userAgent.platform.ti=function(){return H.h.userAgent.F.T("Macintosh")};H.h.userAgent.platform.Om=function(){return H.h.userAgent.F.T("Linux")};H.h.userAgent.platform.Bi=function(){return H.h.userAgent.F.T("Windows")};H.h.userAgent.platform.ii=function(){return H.h.userAgent.F.T("CrOS")};H.h.userAgent.platform.iv=function(){return H.h.userAgent.F.T("CrKey")};H.h.userAgent.platform.si=function(){return H.h.userAgent.F.nf("KaiOS")};H.h.userAgent.platform.Km=function(){return H.h.userAgent.F.nf("GAFP")};
H.h.userAgent.platform.Hc=function(){var b=H.h.userAgent.F.cc(),c="";H.h.userAgent.platform.Bi()?(c=/Windows (?:NT|Phone) ([0-9.]+)/,c=(b=c.exec(b))?b[1]:"0.0"):H.h.userAgent.platform.ni()?(c=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,c=(b=c.exec(b))&&b[1].replace(/_/g,".")):H.h.userAgent.platform.ti()?(c=/Mac OS X ([0-9_.]+)/,c=(b=c.exec(b))?b[1].replace(/_/g,"."):"10"):H.h.userAgent.platform.si()?(c=/(?:KaiOS)\/(\S+)/i,c=(b=c.exec(b))&&b[1]):H.h.userAgent.platform.gi()?(c=/Android\s+([^\);]+)(\)|;)/,
c=(b=c.exec(b))&&b[1]):H.h.userAgent.platform.ii()&&(c=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,c=(b=c.exec(b))&&b[1]);return c||""};H.h.userAgent.platform.Xa=function(b){return 0<=H.c.Kb(H.h.userAgent.platform.Hc(),b)};H.ib={};H.ib.object=function(b,c){return c};H.ib.Af=function(b){H.ib.Af[" "](b);return b};H.ib.Af[" "]=H.Rb;H.ib.dt=function(b,c){try{return H.ib.Af(b[c]),!0}catch(d){}return!1};H.ib.cache=function(b,c,d,e){e=e?e(c):c;return Object.prototype.hasOwnProperty.call(b,e)?b[e]:b[e]=d(c)};H.userAgent={};H.userAgent.Pf=!1;H.userAgent.Nf=!1;H.userAgent.Of=!1;H.userAgent.Uf=!1;H.userAgent.fe=!1;H.userAgent.Sf=!1;H.userAgent.zj=!1;H.userAgent.pc=H.userAgent.Pf||H.userAgent.Nf||H.userAgent.Of||H.userAgent.fe||H.userAgent.Uf||H.userAgent.Sf;H.userAgent.pm=function(){return H.h.userAgent.F.cc()};H.userAgent.We=function(){return H.global.navigator||null};H.userAgent.Du=function(){return H.userAgent.We()};H.userAgent.og=H.userAgent.pc?H.userAgent.Sf:H.h.userAgent.B.ff();
H.userAgent.oa=H.userAgent.pc?H.userAgent.Pf:H.h.userAgent.B.Bd();H.userAgent.ag=H.userAgent.pc?H.userAgent.Nf:H.h.userAgent.ea.Ab();H.userAgent.Vp=H.userAgent.ag||H.userAgent.oa;H.userAgent.he=H.userAgent.pc?H.userAgent.Of:H.h.userAgent.ea.Jm();H.userAgent.sc=H.userAgent.pc?H.userAgent.Uf||H.userAgent.fe:H.h.userAgent.ea.yi();H.userAgent.Qm=function(){return H.userAgent.sc&&H.h.userAgent.F.T("Mobile")};H.userAgent.gr=H.userAgent.fe||H.userAgent.Qm();H.userAgent.Hr=H.userAgent.sc;
H.userAgent.Fl=function(){var b=H.userAgent.We();return b&&b.platform||""};H.userAgent.xr=H.userAgent.Fl();H.userAgent.Rf=!1;H.userAgent.Vf=!1;H.userAgent.Qf=!1;H.userAgent.Wf=!1;H.userAgent.Mf=!1;H.userAgent.de=!1;H.userAgent.ce=!1;H.userAgent.ee=!1;H.userAgent.Cj=!1;H.userAgent.Bj=!1;H.userAgent.Ra=H.userAgent.Rf||H.userAgent.Vf||H.userAgent.Qf||H.userAgent.Wf||H.userAgent.Mf||H.userAgent.de||H.userAgent.ce||H.userAgent.ee;H.userAgent.Xq=H.userAgent.Ra?H.userAgent.Rf:H.h.userAgent.platform.ti();
H.userAgent.ws=H.userAgent.Ra?H.userAgent.Vf:H.h.userAgent.platform.Bi();H.userAgent.Nm=function(){return H.h.userAgent.platform.Om()||H.h.userAgent.platform.ii()};H.userAgent.Vq=H.userAgent.Ra?H.userAgent.Qf:H.userAgent.Nm();H.userAgent.Zm=function(){var b=H.userAgent.We();return!!b&&H.c.contains(b.appVersion||"","X11")};H.userAgent.xs=H.userAgent.Ra?H.userAgent.Wf:H.userAgent.Zm();H.userAgent.ap=H.userAgent.Ra?H.userAgent.Mf:H.h.userAgent.platform.gi();
H.userAgent.Jq=H.userAgent.Ra?H.userAgent.de:H.h.userAgent.platform.pi();H.userAgent.Iq=H.userAgent.Ra?H.userAgent.ce:H.h.userAgent.platform.oi();H.userAgent.Kq=H.userAgent.Ra?H.userAgent.ee:H.h.userAgent.platform.ri();H.userAgent.Hq=H.userAgent.Ra?H.userAgent.de||H.userAgent.ce||H.userAgent.ee:H.h.userAgent.platform.ni();H.userAgent.Nq=H.userAgent.Ra?H.userAgent.Cj:H.h.userAgent.platform.si();H.userAgent.nq=H.userAgent.Ra?H.userAgent.Bj:H.h.userAgent.platform.Km();
H.userAgent.Gl=function(){var b="",c=H.userAgent.sm();c&&(b=c?c[1]:"");return H.userAgent.oa&&(c=H.userAgent.xh(),null!=c&&c>parseFloat(b))?String(c):b};H.userAgent.sm=function(){var b=H.userAgent.pm();if(H.userAgent.he)return/rv:([^\);]+)(\)|;)/.exec(b);if(H.userAgent.ag)return/Edge\/([\d\.]+)/.exec(b);if(H.userAgent.oa)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(H.userAgent.sc)return/WebKit\/(\S+)/.exec(b);if(H.userAgent.og)return/(?:Version)[ \/]?(\S+)/.exec(b)};
H.userAgent.xh=function(){var b=H.global.document;return b?b.documentMode:void 0};H.userAgent.VERSION=H.userAgent.Gl();H.userAgent.compare=function(b,c){return H.c.Kb(b,c)};H.userAgent.Xm={};H.userAgent.Xa=function(b){return H.userAgent.zj||H.ib.cache(H.userAgent.Xm,b,function(){return 0<=H.c.Kb(H.userAgent.VERSION,b)})};H.userAgent.Kv=H.userAgent.Xa;H.userAgent.Kc=function(b){return Number(H.userAgent.Xj)>=b};H.userAgent.lv=H.userAgent.Kc;var fa;
fa=H.global.document&&H.userAgent.oa?H.userAgent.xh():void 0;H.userAgent.Xj=fa;H.a.ha={};H.a.ha.Ej=!1;H.a.ha.Fj=!1;H.a.ha.El=function(){try{return!!(new self.OffscreenCanvas(0,0)).getContext("2d")}catch(b){}return!1};H.a.ha.pr=!H.a.ha.Ej&&(H.a.ha.Fj||H.a.ha.El());H.a.ha.Kj=!H.userAgent.oa||H.userAgent.Kc(9);H.a.ha.Lj=!H.userAgent.he&&!H.userAgent.oa||H.userAgent.oa&&H.userAgent.Kc(9)||H.userAgent.he&&H.userAgent.Xa("1.9.1");H.a.ha.Yf=H.userAgent.oa&&!H.userAgent.Xa("9");H.a.ha.Mj=H.userAgent.oa||H.userAgent.og||H.userAgent.sc;H.a.ha.ek=H.userAgent.oa;
H.a.ha.Rq=H.userAgent.oa&&!H.userAgent.Kc(9);H.C={};H.C.lw=function(b){return Math.floor(Math.random()*b)};H.C.Ex=function(b,c){return b+Math.random()*(c-b)};H.C.ht=function(b,c,d){return Math.min(Math.max(b,c),d)};H.C.Li=function(b,c){b%=c;return 0>b*c?b+c:b};H.C.Nv=function(b,c,d){return b+d*(c-b)};H.C.Yv=function(b,c,d){return Math.abs(b-c)<=(d||1E-6)};H.C.Df=function(b){return H.C.Li(b,360)};H.C.nx=function(b){return H.C.Li(b,2*Math.PI)};H.C.mj=function(b){return b*Math.PI/180};H.C.yo=function(b){return 180*b/Math.PI};
H.C.Es=function(b,c){return c*Math.cos(H.C.mj(b))};H.C.Fs=function(b,c){return c*Math.sin(H.C.mj(b))};H.C.angle=function(b,c,d,e){return H.C.Df(H.C.yo(Math.atan2(e-c,d-b)))};H.C.Ds=function(b,c){b=H.C.Df(c)-H.C.Df(b);180<b?b-=360:-180>=b&&(b=360+b);return b};H.C.sign=function(b){return 0<b?1:0>b?-1:b};
H.C.Rv=function(b,c,d,e){d=d||function(r,w){return r==w};e=e||function(r){return b[r]};for(var f=b.length,g=c.length,h=[],k=0;k<f+1;k++)h[k]=[],h[k][0]=0;for(var m=0;m<g+1;m++)h[0][m]=0;for(k=1;k<=f;k++)for(m=1;m<=g;m++)d(b[k-1],c[m-1])?h[k][m]=h[k-1][m-1]+1:h[k][m]=Math.max(h[k-1][m],h[k][m-1]);var n=[];k=f;for(m=g;0<k&&0<m;)d(b[k-1],c[m-1])?(n.unshift(e(k-1,m-1)),k--,m--):h[k-1][m]>h[k][m-1]?k--:m--;return n};H.C.Ff=function(b){return H.g.reduce(arguments,function(c,d){return c+d},0)};
H.C.fl=function(b){return H.C.Ff.apply(null,arguments)/arguments.length};H.C.ao=function(b){var c=arguments.length;if(2>c)return 0;var d=H.C.fl.apply(null,arguments);return H.C.Ff.apply(null,H.g.map(arguments,function(e){return Math.pow(e-d,2)}))/(c-1)};H.C.ox=function(b){return Math.sqrt(H.C.ao.apply(null,arguments))};H.C.rv=function(b){return isFinite(b)&&0==b%1};H.C.ov=function(b){return isFinite(b)};H.C.wv=function(b){return 0==b&&0>1/b};
H.C.Qv=function(b){if(0<b){var c=Math.round(Math.log(b)*Math.LOG10E);return c-(parseFloat("1e"+c)>b?1:0)}return 0==b?-Infinity:NaN};H.C.Aw=function(b,c){return Math.floor(b+(c||2E-15))};H.C.zw=function(b,c){return Math.ceil(b-(c||2E-15))};H.C.ia=function(b,c){this.x=H.ca(b)?b:0;this.y=H.ca(c)?c:0};H.C.ia.prototype.clone=function(){return new H.C.ia(this.x,this.y)};H.sa&&(H.C.ia.prototype.toString=function(){return"("+this.x+", "+this.y+")"});H.C.ia.prototype.Ob=function(b){return b instanceof H.C.ia&&H.C.ia.Ob(this,b)};H.C.ia.Ob=function(b,c){return b==c?!0:b&&c?b.x==c.x&&b.y==c.y:!1};H.C.ia.Mt=function(b,c){var d=b.x-c.x;b=b.y-c.y;return Math.sqrt(d*d+b*b)};H.C.ia.Sv=function(b){return Math.sqrt(b.x*b.x+b.y*b.y)};
H.C.ia.azimuth=function(b){return H.C.angle(0,0,b.x,b.y)};H.C.ia.lx=function(b,c){var d=b.x-c.x;b=b.y-c.y;return d*d+b*b};H.C.ia.Lt=function(b,c){return new H.C.ia(b.x-c.x,b.y-c.y)};H.C.ia.Ff=function(b,c){return new H.C.ia(b.x+c.x,b.y+c.y)};F=H.C.ia.prototype;F.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};F.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};F.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};
F.translate=function(b,c){b instanceof H.C.ia?(this.x+=b.x,this.y+=b.y):(this.x+=Number(b),H.Bb(c)&&(this.y+=c));return this};F.scale=function(b,c){c=H.Bb(c)?c:b;this.x*=b;this.y*=c;return this};H.C.Yb=function(b,c){this.width=b;this.height=c};H.C.Yb.Ob=function(b,c){return b==c?!0:b&&c?b.width==c.width&&b.height==c.height:!1};H.C.Yb.prototype.clone=function(){return new H.C.Yb(this.width,this.height)};H.sa&&(H.C.Yb.prototype.toString=function(){return"("+this.width+" x "+this.height+")"});F=H.C.Yb.prototype;F.aspectRatio=function(){return this.width/this.height};F.Ca=function(){return!(this.width*this.height)};
F.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};F.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};F.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};F.scale=function(b,c){c=H.Bb(c)?c:b;this.width*=b;this.height*=c;return this};H.a.Gj=!1;H.a.Tf=!1;H.a.Qj=H.a.Gj||H.a.Tf;H.a.Qe=function(b){return b?new H.a.Vb(H.a.xb(b)):H.a.Cl||(H.a.Cl=new H.a.Vb)};H.a.Zl=function(){return document};H.a.Re=function(b){return H.a.Ue(document,b)};H.a.Ue=function(b,c){return H.L(c)?b.getElementById(c):c};H.a.jm=function(b){return H.a.Rh(document,b)};H.a.Rh=function(b,c){return H.a.Ue(b,c)};H.a.vj=H.a.Re;H.a.getElementsByTagName=function(b,c){return(c||document).getElementsByTagName(String(b))};
H.a.Ve=function(b,c,d){return H.a.qd(document,b,c,d)};H.a.cm=function(b,c,d){return H.a.Te(document,b,c,d)};H.a.Ah=function(b,c){var d=c||document;return H.a.ze(d)?d.querySelectorAll("."+b):H.a.qd(document,"*",b,c)};H.a.Se=function(b,c){var d=c||document;return(d.getElementsByClassName?d.getElementsByClassName(b)[0]:H.a.Te(document,"*",b,c))||null};H.a.Qh=function(b,c){return H.a.Se(b,c)};H.a.ze=function(b){return!(!b.querySelectorAll||!b.querySelector)};
H.a.qd=function(b,c,d,e){b=e||b;c=c&&"*"!=c?String(c).toUpperCase():"";if(H.a.ze(b)&&(c||d))return b.querySelectorAll(c+(d?"."+d:""));if(d&&b.getElementsByClassName){b=b.getElementsByClassName(d);if(c){e={};for(var f=0,g=0,h;h=b[g];g++)c==h.nodeName&&(e[f++]=h);e.length=f;return e}return b}b=b.getElementsByTagName(c||"*");if(d){e={};for(g=f=0;h=b[g];g++)c=h.className,typeof c.split==t&&H.g.contains(c.split(/\s+/),d)&&(e[f++]=h);e.length=f;return e}return b};
H.a.Te=function(b,c,d,e){var f=e||b,g=c&&"*"!=c?String(c).toUpperCase():"";return H.a.ze(f)&&(g||d)?f.querySelector(g+(d?"."+d:"")):H.a.qd(b,c,d,e)[0]||null};H.a.wj=H.a.Ve;H.a.Wd=function(b,c){H.object.forEach(c,function(d,e){d&&typeof d==v&&d.Va&&(d=d.Ga());"style"==e?b.style.cssText=d:"class"==e?b.className=d:"for"==e?b.htmlFor=d:H.a.$f.hasOwnProperty(e)?b.setAttribute(H.a.$f[e],d):H.c.startsWith(e,"aria-")||H.c.startsWith(e,"data-")?b.setAttribute(e,d):b[e]=d})};
H.a.$f={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};H.a.Wh=function(b){return H.a.Xh(b||window)};H.a.Xh=function(b){b=b.document;b=H.a.Jc(b)?b.documentElement:b.body;return new H.C.Yb(b.clientWidth,b.clientHeight)};H.a.$l=function(){return H.a.Oe(window)};H.a.wu=function(b){return H.a.Oe(b)};
H.a.Oe=function(b){var c=b.document,d=0;if(c){d=c.body;var e=c.documentElement;if(!e||!d)return 0;b=H.a.Xh(b).height;if(H.a.Jc(c)&&e.scrollHeight)d=e.scrollHeight!=b?e.scrollHeight:e.offsetHeight;else{c=e.scrollHeight;var f=e.offsetHeight;e.clientHeight!=f&&(c=d.scrollHeight,f=d.offsetHeight);d=c>b?c>f?c:f:c<f?c:f}}return d};H.a.Fu=function(b){return H.a.Qe((b||H.global||window).document).yh()};H.a.yh=function(){return H.a.zh(document)};
H.a.zh=function(b){var c=H.a.Pe(b);b=H.a.ec(b);return H.userAgent.oa&&H.userAgent.Xa("10")&&b.pageYOffset!=c.scrollTop?new H.C.ia(c.scrollLeft,c.scrollTop):new H.C.ia(b.pageXOffset||c.scrollLeft,b.pageYOffset||c.scrollTop)};H.a.am=function(){return H.a.Pe(document)};H.a.Pe=function(b){return b.scrollingElement?b.scrollingElement:!H.userAgent.sc&&H.a.Jc(b)?b.documentElement:b.body||b.documentElement};H.a.dc=function(b){return b?H.a.ec(b):window};H.a.ec=function(b){return b.parentWindow||b.defaultView};
H.a.Ce=function(b,c,d){return H.a.Yg(document,arguments)};H.a.Yg=function(b,c){var d=String(c[0]),e=c[1];if(!H.a.ha.Kj&&e&&(e.name||e.type)){d=["<",d];e.name&&d.push(' name="',H.c.Ha(e.name),'"');if(e.type){d.push(' type="',H.c.Ha(e.type),'"');var f={};H.object.extend(f,e);delete f.type;e=f}d.push(">");d=d.join("")}d=b.createElement(d);e&&(H.L(e)?d.className=e:H.isArray(e)?d.className=e.join(" "):H.a.Wd(d,e));2<c.length&&H.a.Eg(b,d,c,2);return d};
H.a.Eg=function(b,c,d,e){function f(h){h&&c.appendChild(H.L(h)?b.createTextNode(h):h)}for(;e<d.length;e++){var g=d[e];H.ma(g)&&!H.a.df(g)?H.g.forEach(H.a.ef(g)?H.g.jb(g):g,f):f(g)}};H.a.xj=H.a.Ce;H.a.createElement=function(b){return H.a.rb(document,b)};H.a.rb=function(b,c){return b.createElement(String(c))};H.a.createTextNode=function(b){return document.createTextNode(String(b))};H.a.zl=function(b,c,d){return H.a.Zg(document,b,c,!!d)};
H.a.Zg=function(b,c,d,e){for(var f=H.a.rb(b,"TABLE"),g=f.appendChild(H.a.rb(b,"TBODY")),h=0;h<c;h++){for(var k=H.a.rb(b,"TR"),m=0;m<d;m++){var n=H.a.rb(b,"TD");e&&H.a.yf(n,H.c.yg.lg);k.appendChild(n)}g.appendChild(k)}return f};H.a.st=function(b){var c=H.g.map(arguments,H.c.M.K);c=H.b.kb.Si(H.c.M.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."),c.join(""));return H.a.Ti(c)};H.a.Ti=function(b){return H.a.Ui(document,b)};
H.a.Ui=function(b,c){var d=H.a.rb(b,"DIV");H.a.ha.ek?(H.a.O.xf(d,H.b.u.concat(H.b.u.Xf,c)),d.removeChild(d.firstChild)):H.a.O.xf(d,c);return H.a.tl(b,d)};H.a.tl=function(b,c){if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(b=b.createDocumentFragment();c.firstChild;)b.appendChild(c.firstChild);return b};H.a.Fm=function(){return H.a.Jc(document)};H.a.Jc=function(b){return H.a.Qj?H.a.Tf:"CSS1Compat"==b.compatMode};H.a.canHaveChildren=function(b){if(b.nodeType!=H.a.ua.mb)return!1;switch(b.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case l:case "SOURCE":case "STYLE":case "TRACK":case "WBR":return!1}return!0};
H.a.appendChild=function(b,c){b.appendChild(c)};H.a.append=function(b,c){H.a.Eg(H.a.xb(b),b,arguments,1)};H.a.tf=function(b){for(var c;c=b.firstChild;)b.removeChild(c)};H.a.ei=function(b,c){c.parentNode&&c.parentNode.insertBefore(b,c)};H.a.di=function(b,c){c.parentNode&&c.parentNode.insertBefore(b,c.nextSibling)};H.a.ci=function(b,c,d){b.insertBefore(c,b.childNodes[d]||null)};H.a.removeNode=function(b){return b&&b.parentNode?b.parentNode.removeChild(b):null};
H.a.Ri=function(b,c){var d=c.parentNode;d&&d.replaceChild(b,c)};H.a.oh=function(b){var c,d=b.parentNode;if(d&&d.nodeType!=H.a.ua.Wj){if(b.removeNode)return b.removeNode(!1);for(;c=b.firstChild;)d.insertBefore(c,b);return H.a.removeNode(b)}};H.a.vh=function(b){return H.a.ha.Lj&&void 0!=b.children?b.children:H.g.filter(b.childNodes,function(c){return c.nodeType==H.a.ua.mb})};H.a.Bh=function(b){return H.ca(b.firstElementChild)?b.firstElementChild:H.a.sd(b.firstChild,!0)};
H.a.Eh=function(b){return H.ca(b.lastElementChild)?b.lastElementChild:H.a.sd(b.lastChild,!1)};H.a.Gh=function(b){return H.ca(b.nextElementSibling)?b.nextElementSibling:H.a.sd(b.nextSibling,!0)};H.a.Nh=function(b){return H.ca(b.previousElementSibling)?b.previousElementSibling:H.a.sd(b.previousSibling,!1)};H.a.sd=function(b,c){for(;b&&b.nodeType!=H.a.ua.mb;)b=c?b.nextSibling:b.previousSibling;return b};
H.a.Hh=function(b){if(!b)return null;if(b.firstChild)return b.firstChild;for(;b&&!b.nextSibling;)b=b.parentNode;return b?b.nextSibling:null};H.a.Oh=function(b){if(!b)return null;if(!b.previousSibling)return b.parentNode;for(b=b.previousSibling;b&&b.lastChild;)b=b.lastChild;return b};H.a.df=function(b){return H.Da(b)&&0<b.nodeType};H.a.bf=function(b){return H.Da(b)&&b.nodeType==H.a.ua.mb};H.a.zi=function(b){return H.Da(b)&&b.window==b};
H.a.Mh=function(b){var c;if(H.a.ha.Mj&&!(H.userAgent.oa&&H.userAgent.Xa("9")&&!H.userAgent.Xa("10")&&H.global.SVGElement&&b instanceof H.global.SVGElement)&&(c=b.parentElement))return c;c=b.parentNode;return H.a.bf(c)?c:null};H.a.contains=function(b,c){if(!b||!c)return!1;if(b.contains&&c.nodeType==H.a.ua.mb)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||!!(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b};
H.a.Sg=function(b,c){if(b==c)return 0;if(b.compareDocumentPosition)return b.compareDocumentPosition(c)&2?1:-1;if(H.userAgent.oa&&!H.userAgent.Kc(9)){if(b.nodeType==H.a.ua.Uc)return-1;if(c.nodeType==H.a.ua.Uc)return 1}if("sourceIndex"in b||b.parentNode&&"sourceIndex"in b.parentNode){var d=b.nodeType==H.a.ua.mb,e=c.nodeType==H.a.ua.mb;if(d&&e)return b.sourceIndex-c.sourceIndex;var f=b.parentNode,g=c.parentNode;return f==g?H.a.Ug(b,c):!d&&H.a.contains(f,c)?-1*H.a.Tg(b,c):!e&&H.a.contains(g,b)?H.a.Tg(c,
b):(d?b.sourceIndex:f.sourceIndex)-(e?c.sourceIndex:g.sourceIndex)}e=H.a.xb(b);d=e.createRange();d.selectNode(b);d.collapse(!0);b=e.createRange();b.selectNode(c);b.collapse(!0);return d.compareBoundaryPoints(H.global.Range.START_TO_END,b)};H.a.Tg=function(b,c){var d=b.parentNode;if(d==c)return-1;for(;c.parentNode!=d;)c=c.parentNode;return H.a.Ug(c,b)};H.a.Ug=function(b,c){for(;c=c.previousSibling;)if(c==b)return-1;return 1};
H.a.kh=function(b){var c,d=arguments.length;if(!d)return null;if(1==d)return arguments[0];var e=[],f=Infinity;for(c=0;c<d;c++){for(var g=[],h=arguments[c];h;)g.unshift(h),h=h.parentNode;e.push(g);f=Math.min(f,g.length)}g=null;for(c=0;c<f;c++){h=e[0][c];for(var k=1;k<d;k++)if(h!=e[k][c])return g;g=h}return g};H.a.qv=function(b){return 16==(b.ownerDocument.compareDocumentPosition(b)&16)};H.a.xb=function(b){return b.nodeType==H.a.ua.Uc?b:b.ownerDocument||b.document};
H.a.Ch=function(b){return b.contentDocument||b.contentWindow.document};H.a.Dh=function(b){try{return b.contentWindow||(b.contentDocument?H.a.dc(b.contentDocument):null)}catch(c){}return null};H.a.yf=function(b,c){if("textContent"in b)b.textContent=c;else if(b.nodeType==H.a.ua.$c)b.data=String(c);else if(b.firstChild&&b.firstChild.nodeType==H.a.ua.$c){for(;b.lastChild!=b.firstChild;)b.removeChild(b.lastChild);b.firstChild.data=String(c)}else H.a.tf(b),b.appendChild(H.a.xb(b).createTextNode(String(c)))};
H.a.Lh=function(b){if("outerHTML"in b)return b.outerHTML;var c=H.a.rb(H.a.xb(b),"DIV");c.appendChild(b.cloneNode(!0));return c.innerHTML};H.a.lh=function(b,c){var d=[];return H.a.Ie(b,c,d,!0)?d[0]:void 0};H.a.mh=function(b,c){var d=[];H.a.Ie(b,c,d,!1);return d};H.a.Ie=function(b,c,d,e){if(null!=b)for(b=b.firstChild;b;){if(c(b)&&(d.push(b),e)||H.a.Ie(b,c,d,e))return!0;b=b.nextSibling}return!1};
H.a.Yt=function(b,c){for(b=H.a.wh(b);0<b.length;){var d=b.pop();if(c(d))return d;for(d=d.lastElementChild;d;d=d.previousElementSibling)b.push(d)}return null};H.a.Zt=function(b,c){var d=[];for(b=H.a.wh(b);0<b.length;){var e=b.pop();c(e)&&d.push(e);for(e=e.lastElementChild;e;e=e.previousElementSibling)b.push(e)}return d};H.a.wh=function(b){if(b.nodeType==H.a.ua.Uc)return[b.documentElement];var c=[];for(b=b.lastElementChild;b;b=b.previousElementSibling)c.push(b);return c};
H.a.vg={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1};H.a.Yc={IMG:" ",BR:"\n"};H.a.cf=function(b){return H.a.$h(b)&&H.a.xi(b)};H.a.Yi=function(b,c){c?b.tabIndex=0:(b.tabIndex=-1,b.removeAttribute("tabIndex"))};H.a.ji=function(b){var c;return(c=H.a.vn(b)?!b.disabled&&(!H.a.$h(b)||H.a.xi(b)):H.a.cf(b))&&H.userAgent.oa?H.a.xm(b):c};H.a.$h=function(b){return H.userAgent.oa&&!H.userAgent.Xa("9")?(b=b.getAttributeNode("tabindex"),H.zb(b)&&b.specified):b.hasAttribute("tabindex")};
H.a.xi=function(b){b=b.tabIndex;return H.Bb(b)&&0<=b&&32768>b};H.a.vn=function(b){return"A"==b.tagName&&b.hasAttribute("href")||"INPUT"==b.tagName||"TEXTAREA"==b.tagName||"SELECT"==b.tagName||"BUTTON"==b.tagName};H.a.xm=function(b){b=!H.Wa(b.getBoundingClientRect)||H.userAgent.oa&&null==b.parentElement?{height:b.offsetHeight,width:b.offsetWidth}:b.getBoundingClientRect();return H.zb(b)&&0<b.height&&0<b.width};
H.a.ud=function(b){if(H.a.ha.Yf&&null!==b&&"innerText"in b)b=H.c.rl(b.innerText);else{var c=[];H.a.Ye(b,c,!0);b=c.join("")}b=b.replace(/ \xAD /g," ").replace(/\xAD/g,"");b=b.replace(/\u200B/g,"");H.a.ha.Yf||(b=b.replace(/ +/g," "));" "!=b&&(b=b.replace(/^\s*/,""));return b};H.a.Ku=function(b){var c=[];H.a.Ye(b,c,!1);return c.join("")};
H.a.Ye=function(b,c,d){if(!(b.nodeName in H.a.vg))if(b.nodeType==H.a.ua.$c)d?c.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g,"")):c.push(b.nodeValue);else if(b.nodeName in H.a.Yc)c.push(H.a.Yc[b.nodeName]);else for(b=b.firstChild;b;)H.a.Ye(b,c,d),b=b.nextSibling};H.a.Jh=function(b){return H.a.ud(b).length};H.a.Kh=function(b,c){c=c||H.a.xb(b).body;for(var d=[];b&&b!=c;){for(var e=b;e=e.previousSibling;)d.unshift(H.a.ud(e));b=b.parentNode}return H.c.trimLeft(d.join("")).replace(/ +/g," ").length};
H.a.Ih=function(b,c,d){b=[b];for(var e=0,f=null;0<b.length&&e<c;)if(f=b.pop(),!(f.nodeName in H.a.vg))if(f.nodeType==H.a.ua.$c){var g=f.nodeValue.replace(/(\r\n|\r|\n)/g,"").replace(/ +/g," ");e+=g.length}else if(f.nodeName in H.a.Yc)e+=H.a.Yc[f.nodeName].length;else for(g=f.childNodes.length-1;0<=g;g--)b.push(f.childNodes[g]);H.Da(d)&&(d.nw=f?f.nodeValue.length+c-e-1:0,d.node=f);return f};
H.a.ef=function(b){if(b&&typeof b.length==u){if(H.Da(b))return typeof b.item==t||typeof b.item==y;if(H.Wa(b))return typeof b.item==t}return!1};H.a.Me=function(b,c,d,e){if(!c&&!d)return null;var f=c?String(c).toUpperCase():null;return H.a.Le(b,function(g){return(!f||g.nodeName==f)&&(!d||H.L(g.className)&&H.g.contains(g.className.split(/\s+/),d))},!0,e)};H.a.sh=function(b,c,d){return H.a.Me(b,null,c,d)};
H.a.Le=function(b,c,d,e){b&&!d&&(b=b.parentNode);for(d=0;b&&(null==e||d<=e);){if(c(b))return b;b=b.parentNode;d++}return null};H.a.rh=function(b){try{var c=b&&b.activeElement;return c&&c.nodeName?c:null}catch(d){return null}};H.a.Ju=function(){var b=H.a.dc();return H.ca(b.devicePixelRatio)?b.devicePixelRatio:b.matchMedia?H.a.Ed(3)||H.a.Ed(2)||H.a.Ed(1.5)||H.a.Ed(1)||.75:1};
H.a.Ed=function(b){return H.a.dc().matchMedia("(min-resolution: "+b+"dppx),(min--moz-device-pixel-ratio: "+b+"),(min-resolution: "+96*b+"dpi)").matches?b:0};H.a.uh=function(b){return b.getContext("2d")};H.a.Vb=function(b){this.ka=b||H.global.document||document};F=H.a.Vb.prototype;F.Qe=H.a.Qe;F.Zl=D("ka");F.Re=function(b){return H.a.Ue(this.ka,b)};F.jm=function(b){return H.a.Rh(this.ka,b)};F.vj=H.a.Vb.prototype.Re;F.getElementsByTagName=function(b,c){return(c||this.ka).getElementsByTagName(String(b))};
F.Ve=function(b,c,d){return H.a.qd(this.ka,b,c,d)};F.cm=function(b,c,d){return H.a.Te(this.ka,b,c,d)};F.Ah=function(b,c){return H.a.Ah(b,c||this.ka)};F.Se=function(b,c){return H.a.Se(b,c||this.ka)};F.Qh=function(b,c){return H.a.Qh(b,c||this.ka)};F.wj=H.a.Vb.prototype.Ve;F.Wd=H.a.Wd;F.Wh=function(b){return H.a.Wh(b||this.dc())};F.$l=function(){return H.a.Oe(this.dc())};F.Ce=function(b,c,d){return H.a.Yg(this.ka,arguments)};F.xj=H.a.Vb.prototype.Ce;
F.createElement=function(b){return H.a.rb(this.ka,b)};F.createTextNode=function(b){return this.ka.createTextNode(String(b))};F.zl=function(b,c,d){return H.a.Zg(this.ka,b,c,!!d)};F.Ti=function(b){return H.a.Ui(this.ka,b)};F.Fm=function(){return H.a.Jc(this.ka)};F.dc=function(){return H.a.ec(this.ka)};F.am=function(){return H.a.Pe(this.ka)};F.yh=function(){return H.a.zh(this.ka)};F.rh=function(b){return H.a.rh(b||this.ka)};F.appendChild=H.a.appendChild;F.append=H.a.append;F.canHaveChildren=H.a.canHaveChildren;
F.tf=H.a.tf;F.ei=H.a.ei;F.di=H.a.di;F.ci=H.a.ci;F.removeNode=H.a.removeNode;F.Ri=H.a.Ri;F.oh=H.a.oh;F.vh=H.a.vh;F.Bh=H.a.Bh;F.Eh=H.a.Eh;F.Gh=H.a.Gh;F.Nh=H.a.Nh;F.Hh=H.a.Hh;F.Oh=H.a.Oh;F.df=H.a.df;F.bf=H.a.bf;F.zi=H.a.zi;F.Mh=H.a.Mh;F.contains=H.a.contains;F.Sg=H.a.Sg;F.kh=H.a.kh;F.xb=H.a.xb;F.Ch=H.a.Ch;F.Dh=H.a.Dh;F.yf=H.a.yf;F.Lh=H.a.Lh;F.lh=H.a.lh;F.mh=H.a.mh;F.cf=H.a.cf;F.Yi=H.a.Yi;F.ji=H.a.ji;F.ud=H.a.ud;F.Jh=H.a.Jh;F.Kh=H.a.Kh;F.Ih=H.a.Ih;F.ef=H.a.ef;F.Me=H.a.Me;F.sh=H.a.sh;F.Le=H.a.Le;
F.uh=H.a.uh;H.o={};H.o.va="StopIteration"in H.global?H.global.StopIteration:{message:"StopIteration",stack:""};H.o.Iterator=B();H.o.Iterator.prototype.next=function(){throw H.o.va;};H.o.Iterator.prototype.se=function(){return this};H.o.fa=function(b){if(b instanceof H.o.Iterator)return b;if(typeof b.se==t)return b.se(!1);if(H.ma(b)){var c=0,d=new H.o.Iterator;d.next=function(){for(;;){if(c>=b.length)throw H.o.va;if(c in b)return b[c++];c++}};return d}throw Error("Not implemented");};
H.o.forEach=function(b,c,d){if(H.ma(b))try{H.g.forEach(b,c,d)}catch(e){if(e!==H.o.va)throw e;}else{b=H.o.fa(b);try{for(;;)c.call(d,b.next(),void 0,b)}catch(e){if(e!==H.o.va)throw e;}}};H.o.filter=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){for(;;){var f=e.next();if(c.call(d,f,void 0,e))return f}};return b};H.o.Xt=function(b,c,d){return H.o.filter(b,H.V.xn(c),d)};
H.o.Qd=function(b,c,d){var e=0,f=b,g=d||1;1<arguments.length&&(e=b,f=+c);if(0==g)throw Error("Range step argument must not be zero");var h=new H.o.Iterator;h.next=function(){if(0<g&&e>=f||0>g&&e<=f)throw H.o.va;var k=e;e+=g;return k};return h};H.o.join=function(b,c){return H.o.jb(b).join(c)};H.o.map=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=e.next();return c.call(d,f,void 0,e)};return b};
H.o.reduce=function(b,c,d,e){var f=d;H.o.forEach(b,function(g){f=c.call(e,f,g)});return f};H.o.some=function(b,c,d){b=H.o.fa(b);try{for(;;)if(c.call(d,b.next(),void 0,b))return!0}catch(e){if(e!==H.o.va)throw e;}return!1};H.o.every=function(b,c,d){b=H.o.fa(b);try{for(;;)if(!c.call(d,b.next(),void 0,b))return!1}catch(e){if(e!==H.o.va)throw e;}return!0};H.o.gt=function(b){return H.o.sl(arguments)};
H.o.sl=function(b){var c=H.o.fa(b);b=new H.o.Iterator;var d=null;b.next=function(){for(;;){if(null==d){var e=c.next();d=H.o.fa(e)}try{return d.next()}catch(f){if(f!==H.o.va)throw f;d=null}}};return b};H.o.Nt=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;var f=!0;b.next=function(){for(;;){var g=e.next();if(!f||!c.call(d,g,void 0,e))return f=!1,g}};return b};
H.o.ux=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=e.next();if(c.call(d,f,void 0,e))return f;throw H.o.va;};return b};H.o.jb=function(b){if(H.ma(b))return H.g.jb(b);b=H.o.fa(b);var c=[];H.o.forEach(b,function(d){c.push(d)});return c};H.o.Ob=function(b,c){b=H.o.To({},b,c);var d=H.g.eh;return H.o.every(b,function(e){return d(e[0],e[1])})};H.o.wn=function(b){try{H.o.fa(b).next()}catch(c){if(c!=H.o.va)throw c;}};
H.o.product=function(b){if(H.g.some(arguments,function(f){return!f.length})||!arguments.length)return new H.o.Iterator;var c=new H.o.Iterator,d=arguments,e=H.g.repeat(0,d.length);c.next=function(){if(e){for(var f=H.g.map(e,function(h,k){return d[k][h]}),g=e.length-1;0<=g;g--){if(e[g]<d[g].length-1){e[g]++;break}if(0==g){e=null;break}e[g]=0}return f}throw H.o.va;};return c};
H.o.Ht=function(b){var c=H.o.fa(b),d=[],e=0;b=new H.o.Iterator;var f=!1;b.next=function(){var g=null;if(!f)try{return g=c.next(),d.push(g),g}catch(h){if(h!=H.o.va||H.g.Ca(d))throw h;f=!0}g=d[e];e=(e+1)%d.length;return g};return b};H.o.count=function(b,c){var d=b||0,e=H.ca(c)?c:1;b=new H.o.Iterator;b.next=function(){var f=d;d+=e;return f};return b};H.o.repeat=function(b){var c=new H.o.Iterator;c.next=H.V.Vg(b);return c};
H.o.zs=function(b){var c=H.o.fa(b),d=0;b=new H.o.Iterator;b.next=function(){return d+=c.next()};return b};H.o.uj=function(b){var c=arguments,d=new H.o.Iterator;if(0<c.length){var e=H.g.map(c,H.o.fa);d.next=function(){return H.g.map(e,function(f){return f.next()})}}return d};
H.o.To=function(b,c){var d=H.g.slice(arguments,1),e=new H.o.Iterator;if(0<d.length){var f=H.g.map(d,H.o.fa);e.next=function(){var g=!1,h=H.g.map(f,function(k){try{var m=k.next();g=!0}catch(n){if(n!==H.o.va)throw n;m=b}return m});if(!g)throw H.o.va;return h}}return e};H.o.pt=function(b,c){var d=H.o.fa(c);return H.o.filter(b,function(){return!!d.next()})};H.o.ke=function(b,c){this.iterator=H.o.fa(b);this.Di=c||H.V.ai};H.yb(H.o.ke,H.o.Iterator);
H.o.ke.prototype.next=function(){for(;this.yc==this.hj;)this.kd=this.iterator.next(),this.yc=this.Di(this.kd);for(var b=this.hj=this.yc,c=this.hj,d=[];this.yc==c;){d.push(this.kd);try{this.kd=this.iterator.next()}catch(e){if(e!==H.o.va)throw e;break}this.yc=this.Di(this.kd)}return[b,d]};H.o.Ru=function(b,c){return new H.o.ke(b,c)};H.o.px=function(b,c,d){var e=H.o.fa(b);b=new H.o.Iterator;b.next=function(){var f=H.o.jb(e.next());return c.apply(d,H.g.concat(f,void 0,e))};return b};
H.o.tee=function(b,c){function d(){var g=e.next();H.g.forEach(f,function(h){h.push(g)})}var e=H.o.fa(b),f=H.g.map(H.g.Qd(H.Bb(c)?c:2),function(){return[]});return H.g.map(f,function(g){var h=new H.o.Iterator;h.next=function(){H.g.Ca(g)&&d();return g.shift()};return h})};H.o.Tt=function(b,c){return H.o.uj(H.o.count(c),b)};H.o.an=function(b,c){var d=H.o.fa(b);b=new H.o.Iterator;var e=c;b.next=function(){if(0<e--)return d.next();throw H.o.va;};return b};
H.o.vl=function(b,c){for(b=H.o.fa(b);0<c--;)H.o.wn(b);return b};H.o.slice=function(b,c,d){b=H.o.vl(b,c);H.Bb(d)&&(b=H.o.an(b,d-c));return b};H.o.wm=function(b){var c=[];H.g.Jn(b,c);return b.length!=c.length};H.o.An=function(b,c){b=H.o.jb(b);c=H.g.repeat(b,H.Bb(c)?c:b.length);c=H.o.product.apply(void 0,c);return H.o.filter(c,function(d){return!H.o.wm(d)})};
H.o.lt=function(b,c){function d(g){return e[g]}var e=H.o.jb(b);b=H.o.Qd(e.length);c=H.o.An(b,c);var f=H.o.filter(c,function(g){return H.g.wi(g)});c=new H.o.Iterator;c.next=function(){return H.g.map(f.next(),d)};return c};H.o.mt=function(b,c){function d(g){return e[g]}var e=H.o.jb(b);b=H.g.Qd(e.length);c=H.g.repeat(b,c);c=H.o.product.apply(void 0,c);var f=H.o.filter(c,function(g){return H.g.wi(g)});c=new H.o.Iterator;c.next=function(){return H.g.map(f.next(),d)};return c};H.Pd={};H.Pd.Fr=B();H.Thenable=B();H.Thenable.prototype.then=B();H.Thenable.hg="$goog_Thenable";H.Thenable.Cg=function(b){b.prototype[H.Thenable.hg]=!0};H.Thenable.ki=function(b){if(!b)return!1;try{return!!b[H.Thenable.hg]}catch(c){return!1}};H.Promise=function(b,c){this.qa=H.Promise.ba.$a;this.Ia=void 0;this.Zb=this.qb=this.ya=null;this.He=!1;0<H.Promise.Hb?this.Yd=0:0==H.Promise.Hb&&(this.wd=!1);H.Promise.eb&&(this.Cf=[],I(this,Error("created")),this.bh=0);if(b!=H.Rb)try{var d=this;b.call(c,function(e){J(d,H.Promise.ba.nb,e)},function(e){if(H.sa&&!(e instanceof H.Promise.Ub))try{if(e instanceof Error)throw e;throw Error("Promise rejected.");}catch(f){}J(d,H.Promise.ba.Ja,e)})}catch(e){J(this,H.Promise.ba.Ja,e)}};H.Promise.eb=!1;
H.Promise.Hb=0;H.Promise.ba={$a:0,Ij:1,nb:2,Ja:3};H.Promise.Zf=function(){this.next=this.context=this.hc=this.Oc=this.Jb=null;this.bd=!1};H.Promise.Zf.prototype.reset=function(){this.context=this.hc=this.Oc=this.Jb=null;this.bd=!1};H.Promise.ge=100;H.Promise.Ec=new H.async.Wc(function(){return new H.Promise.Zf},function(b){b.reset()},H.Promise.ge);H.Promise.th=function(b,c,d){var e=H.Promise.Ec.get();e.Oc=b;e.hc=c;e.context=d;return e};H.Promise.Rn=function(b){H.Promise.Ec.put(b)};
H.Promise.resolve=function(b){if(b instanceof H.Promise)return b;var c=new H.Promise(H.Rb);J(c,H.Promise.ba.nb,b);return c};H.Promise.reject=function(b){return new H.Promise(function(c,d){d(b)})};H.Promise.Rd=function(b,c,d){H.Promise.Ki(b,c,d,null)||H.async.X(H.Sb(c,b))};H.Promise.race=function(b){return new H.Promise(function(c,d){b.length||c(void 0);for(var e=0,f;e<b.length;e++)f=b[e],H.Promise.Rd(f,c,d)})};
H.Promise.all=function(b){return new H.Promise(function(c,d){var e=b.length,f=[];if(e)for(var g=function(n,r){e--;f[n]=r;0==e&&c(f)},h=function(n){d(n)},k=0,m;k<b.length;k++)m=b[k],H.Promise.Rd(m,H.Sb(g,k),h);else c(f)})};H.Promise.Cs=function(b){return new H.Promise(function(c){var d=b.length,e=[];if(d)for(var f=function(k,m,n){d--;e[k]=m?{Xl:!0,value:n}:{Xl:!1,reason:n};0==d&&c(e)},g=0,h;g<b.length;g++)h=b[g],H.Promise.Rd(h,H.Sb(f,g,!0),H.Sb(f,g,!1));else c(e)})};
H.Promise.cu=function(b){return new H.Promise(function(c,d){var e=b.length,f=[];if(e)for(var g=function(n){c(n)},h=function(n,r){e--;f[n]=r;0==e&&d(f)},k=0,m;k<b.length;k++)m=b[k],H.Promise.Rd(m,g,H.Sb(h,k));else c(void 0)})};H.Promise.Ix=function(){var b,c,d=new H.Promise(function(e,f){b=e;c=f});return new H.Promise.rk(d,b,c)};H.Promise.prototype.then=function(b,c,d){H.Promise.eb&&I(this,Error("then"));return ha(this,H.Wa(b)?b:null,H.Wa(c)?c:null,d)};H.Thenable.Cg(H.Promise);
H.Promise.prototype.cancel=function(b){this.qa==H.Promise.ba.$a&&H.async.X(function(){var c=new H.Promise.Ub(b);ia(this,c)},this)};function ia(b,c){if(b.qa==H.Promise.ba.$a)if(b.ya){var d=b.ya;if(d.qb){for(var e=0,f=null,g=null,h=d.qb;h&&(h.bd||(e++,h.Jb==b&&(f=h),!(f&&1<e)));h=h.next)f||(g=h);f&&(d.qa==H.Promise.ba.$a&&1==e?ia(d,c):(g?(e=g,e.next==d.Zb&&(d.Zb=e),e.next=e.next.next):ja(d),ka(d,f,H.Promise.ba.Ja,c)))}b.ya=null}else J(b,H.Promise.ba.Ja,c)}
function la(b,c){b.qb||b.qa!=H.Promise.ba.nb&&b.qa!=H.Promise.ba.Ja||ma(b);b.Zb?b.Zb.next=c:b.qb=c;b.Zb=c}function ha(b,c,d,e){var f=H.Promise.th(null,null,null);f.Jb=new H.Promise(function(g,h){f.Oc=c?function(k){try{var m=c.call(e,k);g(m)}catch(n){h(n)}}:g;f.hc=d?function(k){try{var m=d.call(e,k);!H.ca(m)&&k instanceof H.Promise.Ub?h(k):g(m)}catch(n){h(n)}}:h});f.Jb.ya=b;la(b,f);return f.Jb}H.Promise.prototype.Fo=function(b){this.qa=H.Promise.ba.$a;J(this,H.Promise.ba.nb,b)};
H.Promise.prototype.Go=function(b){this.qa=H.Promise.ba.$a;J(this,H.Promise.ba.Ja,b)};function J(b,c,d){b.qa==H.Promise.ba.$a&&(b===d&&(c=H.Promise.ba.Ja,d=new TypeError("Promise cannot resolve to itself")),b.qa=H.Promise.ba.Ij,H.Promise.Ki(d,b.Fo,b.Go,b)||(b.Ia=d,b.qa=c,b.ya=null,ma(b),c!=H.Promise.ba.Ja||d instanceof H.Promise.Ub||H.Promise.Ok(b,d)))}
H.Promise.Ki=function(b,c,d,e){if(b instanceof H.Promise)return H.Promise.eb&&I(b,Error("then")),la(b,H.Promise.th(c||H.Rb,d||null,e)),!0;if(H.Thenable.ki(b))return b.then(c,d,e),!0;if(H.Da(b))try{var f=b.then;if(H.Wa(f))return H.Promise.Do(b,f,c,d,e),!0}catch(g){return d.call(e,g),!0}return!1};H.Promise.Do=function(b,c,d,e,f){function g(m){k||(k=!0,e.call(f,m))}function h(m){k||(k=!0,d.call(f,m))}var k=!1;try{c.call(b,h,g)}catch(m){g(m)}};function ma(b){b.He||(b.He=!0,H.async.X(b.Pl,b))}
function ja(b){var c=null;b.qb&&(c=b.qb,b.qb=c.next,c.next=null);b.qb||(b.Zb=null);return c}H.Promise.prototype.Pl=function(){for(var b;b=ja(this);)H.Promise.eb&&this.bh++,ka(this,b,this.qa,this.Ia);this.He=!1};
function ka(b,c,d,e){if(d==H.Promise.ba.Ja&&c.hc&&!c.bd)if(0<H.Promise.Hb)for(;b&&b.Yd;b=b.ya)H.global.clearTimeout(b.Yd),b.Yd=0;else if(0==H.Promise.Hb)for(;b&&b.wd;b=b.ya)b.wd=!1;if(c.Jb)c.Jb.ya=null,H.Promise.fi(c,d,e);else try{c.bd?c.Oc.call(c.context):H.Promise.fi(c,d,e)}catch(f){H.Promise.xd.call(null,f)}H.Promise.Rn(c)}H.Promise.fi=function(b,c,d){c==H.Promise.ba.nb?b.Oc.call(b.context,d):b.hc&&b.hc.call(b.context,d)};
function I(b,c){if(H.Promise.eb&&H.L(c.stack)){var d=c.stack.split("\n",4)[3];c=c.message;c+=Array(11-c.length).join(" ");b.Cf.push(c+d)}}function na(b,c){if(H.Promise.eb&&c&&H.L(c.stack)&&b.Cf.length){for(var d=["Promise trace:"],e=b;e;e=e.ya){for(var f=b.bh;0<=f;f--)d.push(e.Cf[f]);d.push("Value: ["+(e.qa==H.Promise.ba.Ja?"REJECTED":"FULFILLED")+"] <"+String(e.Ia)+">")}c.stack+="\n\n"+d.join("\n")}}
H.Promise.Ok=function(b,c){0<H.Promise.Hb?b.Yd=H.global.setTimeout(function(){na(b,c);H.Promise.xd.call(null,c)},H.Promise.Hb):0==H.Promise.Hb&&(b.wd=!0,H.async.X(function(){b.wd&&(na(b,c),H.Promise.xd.call(null,c))}))};H.Promise.xd=H.async.jj;H.Promise.ex=function(b){H.Promise.xd=b};H.Promise.Ub=function(b){H.debug.Error.call(this,b)};H.yb(H.Promise.Ub,H.debug.Error);H.Promise.Ub.prototype.name="cancel";H.Promise.rk=function(b,c,d){this.Pd=b;this.resolve=c;this.reject=d};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
H.async.I=function(b,c){this.Vd=[];this.Oi=b;this.fh=c||null;this.fc=this.$b=!1;this.Ia=void 0;this.zf=this.kl=this.xe=!1;this.Xd=0;this.ya=null;this.cd=0;H.async.I.eb&&(this.Be=null,Error.captureStackTrace&&(b={stack:""},Error.captureStackTrace(b,H.async.I),typeof b.stack==y&&(this.Be=b.stack.replace(/^[^\n]*\n/,""))))};H.async.I.Bk=!1;H.async.I.eb=!1;F=H.async.I.prototype;
F.cancel=function(b){if(this.$b)this.Ia instanceof H.async.I&&this.Ia.cancel();else{if(this.ya){var c=this.ya;delete this.ya;b?c.cancel(b):(c.cd--,0>=c.cd&&c.cancel())}this.Oi?this.Oi.call(this.fh,this):this.zf=!0;this.$b||this.tb(new H.async.I.Tb(this))}};F.Xg=function(b,c){this.xe=!1;K(this,b,c)};function K(b,c,d){b.$b=!0;b.Ia=d;b.fc=!c;oa(b)}function pa(b){if(b.$b){if(!b.zf)throw new H.async.I.Tc(b);b.zf=!1}}F.tc=function(b){pa(this);K(this,!0,b)};
F.tb=function(b){pa(this);qa(this,b);K(this,!1,b)};function qa(b,c){H.async.I.eb&&b.Be&&H.Da(c)&&c.stack&&/^[^\n]+(\n   [^\n]+)+/.test(c.stack)&&(c.stack=c.stack+"\nDEFERRED OPERATION:\n"+b.Be)}function L(b,c,d){return M(b,c,null,d)}function ra(b,c){M(b,null,c,void 0)}function M(b,c,d,e){b.Vd.push([c,d,e]);b.$b&&oa(b);return b}F.then=function(b,c,d){var e,f,g=new H.Promise(function(h,k){e=h;f=k});M(this,e,function(h){h instanceof H.async.I.Tb?g.cancel():f(h)});return g.then(b,c,d)};H.Thenable.Cg(H.async.I);
H.async.I.prototype.ml=function(){var b=new H.async.I;M(this,b.tc,b.tb,b);b.ya=this;this.cd++;return b};function sa(b){return H.g.some(b.Vd,function(c){return H.Wa(c[1])})}
function oa(b){b.Xd&&b.$b&&sa(b)&&(H.async.I.Lo(b.Xd),b.Xd=0);b.ya&&(b.ya.cd--,delete b.ya);for(var c=b.Ia,d=!1,e=!1;b.Vd.length&&!b.xe;){var f=b.Vd.shift(),g=f[0],h=f[1];f=f[2];if(g=b.fc?h:g)try{var k=g.call(f||b.fh,c);H.ca(k)&&(b.fc=b.fc&&(k==c||k instanceof Error),b.Ia=c=k);if(H.Thenable.ki(c)||typeof H.global.Promise===t&&c instanceof H.global.Promise)e=!0,b.xe=!0}catch(m){c=m,b.fc=!0,qa(b,c),sa(b)||(d=!0)}}b.Ia=c;e?(e=H.bind(b.Xg,b,!0),k=H.bind(b.Xg,b,!1),c instanceof H.async.I?(M(c,e,k),c.kl=
!0):c.then(e,k)):H.async.I.Bk&&c instanceof Error&&!(c instanceof H.async.I.Tb)&&(d=b.fc=!0);d&&(b.Xd=H.async.I.eo(c))}H.async.I.fj=function(b){var c=new H.async.I;c.tc(b);return c};H.async.I.lu=function(b){var c=new H.async.I;b.then(function(d){c.tc(d)},function(d){c.tb(d)});return c};H.async.I.xa=function(b){var c=new H.async.I;c.tb(b);return c};H.async.I.et=function(){var b=new H.async.I;b.cancel();return b};
H.async.I.Hx=function(b,c,d){return b instanceof H.async.I?L(b.ml(),c,d):L(H.async.I.fj(b),c,d)};H.async.I.Tc=function(){H.debug.Error.call(this)};H.yb(H.async.I.Tc,H.debug.Error);H.async.I.Tc.prototype.message="Deferred has already fired";H.async.I.Tc.prototype.name="AlreadyCalledError";H.async.I.Tb=function(){H.debug.Error.call(this)};H.yb(H.async.I.Tb,H.debug.Error);H.async.I.Tb.prototype.message="Deferred was canceled";H.async.I.Tb.prototype.name="CanceledError";
H.async.I.cg=function(b){this.Ic=H.global.setTimeout(H.bind(this.ij,this),0);this.Nl=b};H.async.I.cg.prototype.ij=function(){delete H.async.I.Cc[this.Ic];throw this.Nl;};H.async.I.Cc={};H.async.I.eo=function(b){b=new H.async.I.cg(b);H.async.I.Cc[b.Ic]=b;return b.Ic};H.async.I.Lo=function(b){var c=H.async.I.Cc[b];c&&(H.global.clearTimeout(c.Ic),delete H.async.I.Cc[b])};H.async.I.Ss=function(){var b=H.async.I.Cc,c;for(c in b){var d=b[c];H.global.clearTimeout(d.Ic);d.ij()}};H.N={};H.N.P={};H.N.P.ie="closure_verification";H.N.P.Tj=5E3;H.N.P.vf=[];H.N.P.Zn=function(b,c){function d(){var f=b.shift();f=H.N.P.Sd(f,c);b.length&&M(f,d,d,void 0);return f}if(!b.length)return H.async.I.fj(null);var e=H.N.P.vf.length;H.g.extend(H.N.P.vf,b);if(e)return H.N.P.Wi;b=H.N.P.vf;H.N.P.Wi=d();return H.N.P.Wi};
H.N.P.Sd=function(b,c){var d=c||{};c=d.document||document;var e=H.b.H.K(b),f=H.a.createElement(l),g={Xi:f,lj:void 0},h=new H.async.I(H.N.P.ql,g),k=null,m=H.zb(d.timeout)?d.timeout:H.N.P.Tj;0<m&&(k=window.setTimeout(function(){H.N.P.gd(f,!0);h.tb(new H.N.P.Error(H.N.P.Vc.TIMEOUT,"Timeout reached for loading script "+e))},m),g.lj=k);f.onload=f.onreadystatechange=function(){f.readyState&&"loaded"!=f.readyState&&"complete"!=f.readyState||(H.N.P.gd(f,d.it||!1,k),h.tc(null))};f.onerror=function(){H.N.P.gd(f,
!0,k);h.tb(new H.N.P.Error(H.N.P.Vc.fk,"Error while loading script "+e))};g=d.attributes||{};H.object.extend(g,{type:da,charset:"UTF-8"});H.a.Wd(f,g);H.a.O.mo(f,b);H.N.P.lm(c).appendChild(f);return h};
H.N.P.Bw=function(b,c,d){H.global[H.N.P.ie]||(H.global[H.N.P.ie]={});var e=H.global[H.N.P.ie],f=H.b.H.K(b);if(H.ca(e[c]))return H.async.I.xa(new H.N.P.Error(H.N.P.Vc.Mk,"Verification object "+c+" already defined."));b=H.N.P.Sd(b,d);var g=new H.async.I(H.bind(b.cancel,b));L(b,function(){var h=e[c];H.ca(h)?(g.tc(h),delete e[c]):g.tb(new H.N.P.Error(H.N.P.Vc.Lk,"Script "+f+" loaded, but verification object "+c+" was not defined."))});ra(b,function(h){H.ca(e[c])&&delete e[c];g.tb(h)});return g};
H.N.P.lm=function(b){var c=H.a.getElementsByTagName("HEAD",b);return!c||H.g.Ca(c)?b.documentElement:c[0]};H.N.P.ql=function(){if(this&&this.Xi){var b=this.Xi;b&&b.tagName==l&&H.N.P.gd(b,!0,this.lj)}};H.N.P.gd=function(b,c,d){H.zb(d)&&H.global.clearTimeout(d);b.onload=H.Rb;b.onerror=H.Rb;b.onreadystatechange=H.Rb;c&&window.setTimeout(function(){H.a.removeNode(b)},0)};H.N.P.Vc={fk:0,TIMEOUT:1,Lk:2,Mk:3};
H.N.P.Error=function(b,c){var d="Jsloader error (code #"+b+")";c&&(d+=": "+c);H.debug.Error.call(this,d);this.code=b};H.yb(H.N.P.Error,H.debug.Error);H.R={};H.R.Map=function(b,c){this.Ea={};this.$=[];this.Sc=this.Z=0;var d=arguments.length;if(1<d){if(d%2)throw Error(p);for(var e=0;e<d;e+=2)this.set(arguments[e],arguments[e+1])}else b&&this.addAll(b)};F=H.R.Map.prototype;F.ub=D("Z");F.ga=function(){N(this);for(var b=[],c=0;c<this.$.length;c++)b.push(this.Ea[this.$[c]]);return b};F.la=function(){N(this);return this.$.concat()};F.Lb=function(b){return H.R.Map.Pb(this.Ea,b)};
F.Mb=function(b){for(var c=0;c<this.$.length;c++){var d=this.$[c];if(H.R.Map.Pb(this.Ea,d)&&this.Ea[d]==b)return!0}return!1};F.Ob=function(b,c){if(this===b)return!0;if(this.Z!=b.ub())return!1;c=c||H.R.Map.Dl;N(this);for(var d,e=0;d=this.$[e];e++)if(!c(this.get(d),b.get(d)))return!1;return!0};H.R.Map.Dl=function(b,c){return b===c};F=H.R.Map.prototype;F.Ca=function(){return 0==this.Z};F.clear=function(){this.Ea={};this.Sc=this.Z=this.$.length=0};
F.remove=function(b){return H.R.Map.Pb(this.Ea,b)?(delete this.Ea[b],this.Z--,this.Sc++,this.$.length>2*this.Z&&N(this),!0):!1};function N(b){if(b.Z!=b.$.length){for(var c=0,d=0;c<b.$.length;){var e=b.$[c];H.R.Map.Pb(b.Ea,e)&&(b.$[d++]=e);c++}b.$.length=d}if(b.Z!=b.$.length){var f={};for(d=c=0;c<b.$.length;)e=b.$[c],H.R.Map.Pb(f,e)||(b.$[d++]=e,f[e]=1),c++;b.$.length=d}}F.get=function(b,c){return H.R.Map.Pb(this.Ea,b)?this.Ea[b]:c};
F.set=function(b,c){H.R.Map.Pb(this.Ea,b)||(this.Z++,this.$.push(b),this.Sc++);this.Ea[b]=c};F.addAll=function(b){if(b instanceof H.R.Map)for(var c=b.la(),d=0;d<c.length;d++)this.set(c[d],b.get(c[d]));else for(c in b)this.set(c,b[c])};F.forEach=function(b,c){for(var d=this.la(),e=0;e<d.length;e++){var f=d[e],g=this.get(f);b.call(c,g,f,this)}};F.clone=function(){return new H.R.Map(this)};F.Co=function(){for(var b=new H.R.Map,c=0;c<this.$.length;c++){var d=this.$[c];b.set(this.Ea[d],d)}return b};
F.Ao=function(){N(this);for(var b={},c=0;c<this.$.length;c++){var d=this.$[c];b[d]=this.Ea[d]}return b};F.se=function(b){N(this);var c=0,d=this.Sc,e=this,f=new H.o.Iterator;f.next=function(){if(d!=e.Sc)throw Error("The map has changed since the iterator was created");if(c>=e.$.length)throw H.o.va;var g=e.$[c++];return b?g:e.Ea[g]};return f};H.R.Map.Pb=function(b,c){return Object.prototype.hasOwnProperty.call(b,c)};H.R.ub=function(b){return b.ub&&typeof b.ub==t?b.ub():H.ma(b)||H.L(b)?b.length:H.object.ub(b)};H.R.ga=function(b){if(b.ga&&typeof b.ga==t)return b.ga();if(H.L(b))return b.split("");if(H.ma(b)){for(var c=[],d=b.length,e=0;e<d;e++)c.push(b[e]);return c}return H.object.ga(b)};H.R.la=function(b){if(b.la&&typeof b.la==t)return b.la();if(!b.ga||typeof b.ga!=t){if(H.ma(b)||H.L(b)){var c=[];b=b.length;for(var d=0;d<b;d++)c.push(d);return c}return H.object.la(b)}};
H.R.contains=function(b,c){return b.contains&&typeof b.contains==t?b.contains(c):b.Mb&&typeof b.Mb==t?b.Mb(c):H.ma(b)||H.L(b)?H.g.contains(b,c):H.object.Mb(b,c)};H.R.Ca=function(b){return b.Ca&&typeof b.Ca==t?b.Ca():H.ma(b)||H.L(b)?H.g.Ca(b):H.object.Ca(b)};H.R.clear=function(b){b.clear&&typeof b.clear==t?b.clear():H.ma(b)?H.g.clear(b):H.object.clear(b)};
H.R.forEach=function(b,c,d){if(b.forEach&&typeof b.forEach==t)b.forEach(c,d);else if(H.ma(b)||H.L(b))H.g.forEach(b,c,d);else for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)c.call(d,f[h],e&&e[h],b)};H.R.filter=function(b,c,d){if(typeof b.filter==t)return b.filter(c,d);if(H.ma(b)||H.L(b))return H.g.filter(b,c,d);var e=H.R.la(b),f=H.R.ga(b),g=f.length;if(e){var h={};for(var k=0;k<g;k++)c.call(d,f[k],e[k],b)&&(h[e[k]]=f[k])}else for(h=[],k=0;k<g;k++)c.call(d,f[k],void 0,b)&&h.push(f[k]);return h};
H.R.map=function(b,c,d){if(typeof b.map==t)return b.map(c,d);if(H.ma(b)||H.L(b))return H.g.map(b,c,d);var e=H.R.la(b),f=H.R.ga(b),g=f.length;if(e){var h={};for(var k=0;k<g;k++)h[e[k]]=c.call(d,f[k],e[k],b)}else for(h=[],k=0;k<g;k++)h[k]=c.call(d,f[k],void 0,b);return h};H.R.some=function(b,c,d){if(typeof b.some==t)return b.some(c,d);if(H.ma(b)||H.L(b))return H.g.some(b,c,d);for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)if(c.call(d,f[h],e&&e[h],b))return!0;return!1};
H.R.every=function(b,c,d){if(typeof b.every==t)return b.every(c,d);if(H.ma(b)||H.L(b))return H.g.every(b,c,d);for(var e=H.R.la(b),f=H.R.ga(b),g=f.length,h=0;h<g;h++)if(!c.call(d,f[h],e&&e[h],b))return!1;return!0};H.uri={};H.uri.l={};H.uri.l.qc={Kf:38,EQUAL:61,ck:35,mk:63};H.uri.l.ye=function(b,c,d,e,f,g,h){var k="";b&&(k+=b+":");d&&(k+="//",c&&(k+=c+"@"),k+=d,e&&(k+=":"+e));f&&(k+=f);g&&(k+="?"+g);h&&(k+="#"+h);return k};H.uri.l.ro=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;H.uri.l.U={Xb:1,qe:2,lb:3,ob:4,le:5,me:6,dg:7};H.uri.l.split=function(b){return b.match(H.uri.l.ro)};
H.uri.l.ld=function(b,c){return b?c?decodeURI(b):decodeURIComponent(b):b};H.uri.l.ac=function(b,c){return H.uri.l.split(c)[b]||null};H.uri.l.Gc=function(b){return H.uri.l.ac(H.uri.l.U.Xb,b)};H.uri.l.xu=function(b){b=H.uri.l.Gc(b);!b&&H.global.self&&H.global.self.location&&(b=H.global.self.location.protocol,b=b.substr(0,b.length-1));return b?b.toLowerCase():""};H.uri.l.qm=function(){return H.uri.l.ac(H.uri.l.U.qe,void 0)};H.uri.l.vd=function(){return H.uri.l.ld(H.uri.l.qm())};
H.uri.l.bm=function(){return H.uri.l.ac(H.uri.l.U.lb,void 0)};H.uri.l.pd=function(){return H.uri.l.ld(H.uri.l.bm(),!0)};H.uri.l.td=function(){return Number(H.uri.l.ac(H.uri.l.U.ob,void 0))||null};H.uri.l.im=function(){return H.uri.l.ac(H.uri.l.U.le,void 0)};H.uri.l.bc=function(){return H.uri.l.ld(H.uri.l.im(),!0)};H.uri.l.Xe=function(){return H.uri.l.ac(H.uri.l.U.me,void 0)};H.uri.l.em=function(){var b=(void 0).indexOf("#");return 0>b?null:(void 0).substr(b+1)};
H.uri.l.Rw=function(b,c){return H.uri.l.Kn(b)+(c?"#"+c:"")};H.uri.l.rd=function(){return H.uri.l.ld(H.uri.l.em())};H.uri.l.zu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(b[H.uri.l.U.Xb],b[H.uri.l.U.qe],b[H.uri.l.U.lb],b[H.uri.l.U.ob])};H.uri.l.Eu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(b[H.uri.l.U.Xb],null,b[H.uri.l.U.lb],b[H.uri.l.U.ob])};H.uri.l.Iu=function(b){b=H.uri.l.split(b);return H.uri.l.ye(null,null,null,null,b[H.uri.l.U.le],b[H.uri.l.U.me],b[H.uri.l.U.dg])};
H.uri.l.Kn=function(b){var c=b.indexOf("#");return 0>c?b:b.substr(0,c)};H.uri.l.zm=function(b,c){b=H.uri.l.split(b);c=H.uri.l.split(c);return b[H.uri.l.U.lb]==c[H.uri.l.U.lb]&&b[H.uri.l.U.Xb]==c[H.uri.l.U.Xb]&&b[H.uri.l.U.ob]==c[H.uri.l.U.ob]};H.uri.l.Ts=B();H.uri.l.yn=function(b,c){if(b){b=b.split("&");for(var d=0;d<b.length;d++){var e=b[d].indexOf("="),f=null;if(0<=e){var g=b[d].substring(0,e);f=b[d].substring(e+1)}else g=b[d];c(g,f?H.c.$d(f):"")}}};
H.uri.l.bj=function(b){var c=b.indexOf("#");0>c&&(c=b.length);var d=b.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=b.substring(d+1,c);return[b.substr(0,d),e,b.substr(c)]};H.uri.l.Ci=function(b){return b[0]+(b[1]?"?"+b[1]:"")+b[2]};H.uri.l.Dg=function(b,c){return c?b?b+"&"+c:c:b};H.uri.l.ue=function(b,c){if(!c)return b;b=H.uri.l.bj(b);b[1]=H.uri.l.Dg(b[1],c);return H.uri.l.Ci(b)};
H.uri.l.te=function(b,c,d){if(H.isArray(c))for(var e=0;e<c.length;e++)H.uri.l.te(b,String(c[e]),d);else null!=c&&d.push(b+(""===c?"":"="+H.c.Rc(c)))};H.uri.l.Mg=function(b,c){var d=[];for(c=c||0;c<b.length;c+=2)H.uri.l.te(b[c],b[c+1],d);return d.join("&")};H.uri.l.Ng=function(b){var c=[],d;for(d in b)H.uri.l.te(d,b[d],c);return c.join("&")};H.uri.l.Gs=function(b,c){var d=2==arguments.length?H.uri.l.Mg(arguments[1],0):H.uri.l.Mg(arguments,1);return H.uri.l.ue(b,d)};
H.uri.l.Hs=function(b,c){c=H.uri.l.Ng(c);return H.uri.l.ue(b,c)};H.uri.l.Pk=function(b,c,d){d=H.zb(d)?"="+H.c.Rc(d):"";return H.uri.l.ue(b,c+d)};H.uri.l.od=function(b,c,d,e){for(var f=d.length;0<=(c=b.indexOf(d,c))&&c<e;){var g=b.charCodeAt(c-1);if(g==H.uri.l.qc.Kf||g==H.uri.l.qc.mk)if(g=b.charCodeAt(c+f),!g||g==H.uri.l.qc.EQUAL||g==H.uri.l.qc.Kf||g==H.uri.l.qc.ck)return c;c+=f+1}return-1};H.uri.l.yd=/#|$/;H.uri.l.Tu=function(b,c){return 0<=H.uri.l.od(b,0,c,b.search(H.uri.l.yd))};
H.uri.l.Gu=function(b,c){var d=b.search(H.uri.l.yd),e=H.uri.l.od(b,0,c,d);if(0>e)return null;var f=b.indexOf("&",e);if(0>f||f>d)f=d;e+=c.length+1;return H.c.$d(b.substr(e,f-e))};H.uri.l.Hu=function(b,c){for(var d=b.search(H.uri.l.yd),e=0,f,g=[];0<=(f=H.uri.l.od(b,e,c,d));){e=b.indexOf("&",f);if(0>e||e>d)e=d;f+=c.length+1;g.push(H.c.$d(b.substr(f,e-f)))}return g};H.uri.l.Bo=/[?&]($|#)/;
H.uri.l.Ln=function(b,c){for(var d=b.search(H.uri.l.yd),e=0,f,g=[];0<=(f=H.uri.l.od(b,e,c,d));)g.push(b.substring(e,f)),e=Math.min(b.indexOf("&",f)+1||d,d);g.push(b.substr(e));return g.join("").replace(H.uri.l.Bo,"$1")};H.uri.l.ko=function(b){var c=H.uri.l.ug.sg,d=H.c.Ph();return H.uri.l.Pk(H.uri.l.Ln(b,c),c,d)};
H.uri.l.$w=function(b,c){b=H.uri.l.bj(b);var d=b[1],e=[];d&&H.g.forEach(d.split("&"),function(f){var g=f.indexOf("=");c.hasOwnProperty(0<=g?f.substr(0,g):f)||e.push(f)});b[1]=H.uri.l.Dg(e.join("&"),H.uri.l.Ng(c));return H.uri.l.Ci(b)};H.uri.l.Is=function(b,c){H.c.endsWith(b,"/")&&(b=b.substr(0,b.length-1));H.c.startsWith(c,"/")&&(c=c.substr(1));return H.c.nl(b,"/",c)};H.uri.l.Qc=function(b){H.uri.l.split(b)};H.uri.l.ug={sg:"zx"};H.uri.l.pn=function(b){return H.uri.l.ko(b)};H.G=function(b,c){this.Ac=this.If=this.mc="";this.Hd=null;this.Ke=this.Gd="";this.Ma=this.Sm=!1;var d;b instanceof H.G?(this.Ma=H.ca(c)?c:b.Ma,O(this,b.Gc()),P(this,b.vd()),Q(this,b.pd()),R(this,b.td()),this.Qc(b.bc()),S(this,b.Xe().clone()),T(this,b.rd())):b&&(d=H.uri.l.split(String(b)))?(this.Ma=!!c,O(this,d[H.uri.l.U.Xb]||"",!0),P(this,d[H.uri.l.U.qe]||"",!0),Q(this,d[H.uri.l.U.lb]||"",!0),R(this,d[H.uri.l.U.ob]),this.Qc(d[H.uri.l.U.le]||"",!0),S(this,d[H.uri.l.U.me]||"",!0),T(this,d[H.uri.l.U.dg]||
"",!0)):(this.Ma=!!c,this.Oa=new H.G.bb(null,this.Ma))};H.G.nk=H.uri.l.ug.sg;F=H.G.prototype;
F.toString=function(){var b=[],c=this.Gc();c&&b.push(H.G.Bc(c,H.G.Pi,!0),":");var d=this.pd();if(d||"file"==c)b.push("//"),(c=this.vd())&&b.push(H.G.Bc(c,H.G.Pi,!0),"@"),b.push(H.G.Qi(H.c.Rc(d))),d=this.td(),null!=d&&b.push(":",String(d));if(d=this.bc())this.Ac&&"/"!=d.charAt(0)&&b.push("/"),b.push(H.G.Bc(d,"/"==d.charAt(0)?H.G.En:H.G.Hn,!0));(d=this.Oa.toString())&&b.push("?",d);(d=this.rd())&&b.push("#",H.G.Bc(d,H.G.Fn));return b.join("")};
F.resolve=function(b){var c=this.clone(),d=!!b.mc;d?O(c,b.Gc()):d=!!b.If;d?P(c,b.vd()):d=!!b.Ac;d?Q(c,b.pd()):d=null!=b.Hd;var e=b.bc();if(d)R(c,b.td());else if(d=!!b.Gd){if("/"!=e.charAt(0))if(this.Ac&&!this.Gd)e="/"+e;else{var f=c.bc().lastIndexOf("/");-1!=f&&(e=c.bc().substr(0,f+1)+e)}e=H.G.In(e)}d?c.Qc(e):d=""!==b.Oa.toString();d?S(c,b.Xe().clone()):d=!!b.Ke;d&&T(c,b.rd());return c};F.clone=function(){return new H.G(this)};F.Gc=D("mc");
function O(b,c,d){X(b);b.mc=d?H.G.zc(c,!0):c;b.mc&&(b.mc=b.mc.replace(/:$/,""))}F.vd=D("If");function P(b,c,d){X(b);b.If=d?H.G.zc(c):c}F.pd=D("Ac");function Q(b,c,d){X(b);b.Ac=d?H.G.zc(c,!0):c}F.td=D("Hd");function R(b,c){X(b);if(c){c=Number(c);if(isNaN(c)||0>c)throw Error("Bad port number "+c);b.Hd=c}else b.Hd=null}F.bc=D("Gd");F.Qc=function(b,c){X(this);this.Gd=c?H.G.zc(b,!0):b};function S(b,c,d){X(b);c instanceof H.G.bb?(b.Oa=c,b.Oa.wf(b.Ma)):(d||(c=H.G.Bc(c,H.G.Gn)),b.Oa=new H.G.bb(c,b.Ma))}
F.Xe=D("Oa");F.getQuery=function(){return this.Oa.toString()};F.rd=D("Ke");function T(b,c,d){X(b);b.Ke=d?H.G.zc(c):c}F.pn=function(){X(this);var b=H.G.nk,c=H.c.Ph();X(this);this.Oa.set(b,c);return this};F.removeParameter=function(b){X(this);this.Oa.remove(b);return this};function X(b){if(b.Sm)throw Error("Tried to modify a read-only Uri");}F.wf=function(b){this.Ma=b;this.Oa&&this.Oa.wf(b)};H.G.parse=function(b,c){return b instanceof H.G?b.clone():new H.G(b,c)};
H.G.create=function(b,c,d,e,f,g,h,k){k=new H.G(null,k);b&&O(k,b);c&&P(k,c);d&&Q(k,d);e&&R(k,e);f&&k.Qc(f);g&&S(k,g);h&&T(k,h);return k};H.G.resolve=function(b,c){b instanceof H.G||(b=H.G.parse(b));c instanceof H.G||(c=H.G.parse(c));return b.resolve(c)};
H.G.In=function(b){if(".."==b||"."==b)return"";if(H.c.contains(b,"./")||H.c.contains(b,"/.")){var c=H.c.startsWith(b,"/");b=b.split("/");for(var d=[],e=0;e<b.length;){var f=b[e++];"."==f?c&&e==b.length&&d.push(""):".."==f?((1<d.length||1==d.length&&""!=d[0])&&d.pop(),c&&e==b.length&&d.push("")):(d.push(f),c=!0)}return d.join("/")}return b};H.G.zc=function(b,c){return b?c?decodeURI(b.replace(/%25/g,"%2525")):decodeURIComponent(b):""};
H.G.Bc=function(b,c,d){return H.L(b)?(b=encodeURI(b).replace(c,H.G.Kl),d&&(b=H.G.Qi(b)),b):null};H.G.Kl=function(b){b=b.charCodeAt(0);return"%"+(b>>4&15).toString(16)+(b&15).toString(16)};H.G.Qi=function(b){return b.replace(/%25([0-9a-fA-F]{2})/g,"%$1")};H.G.Pi=/[#\/\?@]/g;H.G.Hn=/[#\?:]/g;H.G.En=/[#\?]/g;H.G.Gn=/[#\?@]/g;H.G.Fn=/#/g;H.G.zm=function(b,c){b=H.uri.l.split(b);c=H.uri.l.split(c);return b[H.uri.l.U.lb]==c[H.uri.l.U.lb]&&b[H.uri.l.U.ob]==c[H.uri.l.U.ob]};
H.G.bb=function(b,c){this.Z=this.da=null;this.Ka=b||null;this.Ma=!!c};function Y(b){b.da||(b.da=new H.R.Map,b.Z=0,b.Ka&&H.uri.l.yn(b.Ka,function(c,d){b.add(H.c.$d(c),d)}))}H.G.bb.wt=function(b,c,d){c=H.R.la(b);if("undefined"==typeof c)throw Error("Keys are undefined");d=new H.G.bb(null,d);b=H.R.ga(b);for(var e=0;e<c.length;e++){var f=c[e],g=b[e];H.isArray(g)?ta(d,f,g):d.add(f,g)}return d};
H.G.bb.vt=function(b,c,d,e){if(b.length!=c.length)throw Error("Mismatched lengths for keys/values");d=new H.G.bb(null,e);for(e=0;e<b.length;e++)d.add(b[e],c[e]);return d};F=H.G.bb.prototype;F.ub=function(){Y(this);return this.Z};F.add=function(b,c){Y(this);this.Ka=null;b=Z(this,b);var d=this.da.get(b);d||this.da.set(b,d=[]);d.push(c);this.Z+=1;return this};F.remove=function(b){Y(this);b=Z(this,b);return this.da.Lb(b)?(this.Ka=null,this.Z-=this.da.get(b).length,this.da.remove(b)):!1};
F.clear=function(){this.da=this.Ka=null;this.Z=0};F.Ca=function(){Y(this);return 0==this.Z};F.Lb=function(b){Y(this);b=Z(this,b);return this.da.Lb(b)};F.Mb=function(b){var c=this.ga();return H.g.contains(c,b)};F.forEach=function(b,c){Y(this);this.da.forEach(function(d,e){H.g.forEach(d,function(f){b.call(c,f,e,this)},this)},this)};F.la=function(){Y(this);for(var b=this.da.ga(),c=this.da.la(),d=[],e=0;e<c.length;e++)for(var f=b[e],g=0;g<f.length;g++)d.push(c[e]);return d};
F.ga=function(b){Y(this);var c=[];if(H.L(b))this.Lb(b)&&(c=H.g.concat(c,this.da.get(Z(this,b))));else{b=this.da.ga();for(var d=0;d<b.length;d++)c=H.g.concat(c,b[d])}return c};F.set=function(b,c){Y(this);this.Ka=null;b=Z(this,b);this.Lb(b)&&(this.Z-=this.da.get(b).length);this.da.set(b,[c]);this.Z+=1;return this};F.get=function(b,c){if(!b)return c;b=this.ga(b);return 0<b.length?String(b[0]):c};function ta(b,c,d){b.remove(c);0<d.length&&(b.Ka=null,b.da.set(Z(b,c),H.g.clone(d)),b.Z+=d.length)}
F.toString=function(){if(this.Ka)return this.Ka;if(!this.da)return"";for(var b=[],c=this.da.la(),d=0;d<c.length;d++){var e=c[d],f=H.c.Rc(e);e=this.ga(e);for(var g=0;g<e.length;g++){var h=f;""!==e[g]&&(h+="="+H.c.Rc(e[g]));b.push(h)}}return this.Ka=b.join("&")};F.clone=function(){var b=new H.G.bb;b.Ka=this.Ka;this.da&&(b.da=this.da.clone(),b.Z=this.Z);return b};function Z(b,c){c=String(c);b.Ma&&(c=c.toLowerCase());return c}
F.wf=function(b){b&&!this.Ma&&(Y(this),this.Ka=null,this.da.forEach(function(c,d){var e=d.toLowerCase();d!=e&&(this.remove(d),ta(this,e,c))},this));this.Ma=b};F.extend=function(b){for(var c=0;c<arguments.length;c++)H.R.forEach(arguments[c],function(d,e){this.add(e,d)},this)};var google={v:{}};google.v.w={};google.v.w.ja={};google.v.w.ja.Ai=function(){return new Promise(function(b){if("undefined"==typeof window||"complete"===document.readyState)b();else if(window.addEventListener)document.addEventListener("DOMContentLoaded",b,!0),window.addEventListener("load",b,!0);else if(window.attachEvent)window.attachEvent("onload",b);else{var c=window.onload;H.Wa(c)?window.onload=function(d){c(d);b()}:window.onload=b}})};H.Dc("google.charts.loader.Utils.isWindowLoaded",google.v.w.ja.Ai);
google.v.w.ja.hb={};google.v.w.ja.ww=function(){google.v.w.ja.hb={}};google.v.w.ja.Mu=function(b){return google.v.w.ja.hb[b]&&google.v.w.ja.hb[b].Pd};google.v.w.ja.Lu=function(b){return google.v.w.ja.hb[b]&&google.v.w.ja.hb[b].loaded};google.v.w.ja.ax=function(b,c){google.v.w.ja.hb[b]={Pd:c,loaded:!1}};google.v.w.ja.lo=function(b){google.v.w.ja.hb[b]||(google.v.w.ja.hb[b]={loaded:!1});google.v.w.ja.hb[b].loaded=!0};google.v.w.Qa={};google.v.w.Qa.kj=3E4;google.v.w.Qa.Tv=function(b,c){return{format:b,Qk:c}};google.v.w.Qa.om=function(b){return H.b.H.format(b.format,b.Qk)};google.v.w.Qa.load=function(b,c){var d=H.b.H.format(b,c),e=H.N.P.Sd(d,{timeout:google.v.w.Qa.kj,attributes:{async:!1,defer:!1}});return new Promise(function(f){google.v.w.ja.lo(d.toString());L(e,f)})};
google.v.w.Qa.Ov=function(b){b=H.g.map(b,google.v.w.Qa.om);if(H.g.Ca(b))return Promise.resolve();var c={timeout:google.v.w.Qa.kj,attributes:{async:!1,defer:!1}},d=[];!H.userAgent.oa||H.userAgent.Xa(11)?H.g.forEach(b,function(e){d.push(H.N.P.Sd(e,c))}):d.push(H.N.P.Zn(b,c));return Promise.all(H.g.map(d,function(e){return new Promise(function(f){return L(e,f)})}))};google.v.w.Bg={1:"1.0","1.0":"current","1.1":"upcoming",41:x,42:x,43:x,44:x,46:"46.1","46.1":"46.2",previous:"45.2",current:"46",upcoming:"46.2"};google.v.w.J={};google.v.w.J.Cm=function(){google.v.w.J.gf=null;google.v.w.J.jd=null;google.v.w.J.rj=null};H.wb(aa)?console.warn("Google Charts loader.js should only be loaded once."):google.v.w.J.Cm();google.v.w.J.qn=function(b){var c=b,d=b.match(/^testing-/);d&&(c=c.replace(/^testing-/,""));b=c;do{if(c===google.v.w.Bg[c])throw Error("Infinite loop in version mapping: "+c);var e=google.v.w.Bg[c];e&&(c=e)}while(e);d=(d?"testing-":"")+c;return{version:c==x?b:d,jn:d}};
google.v.w.J.hn=function(b){var c=google.v.w.J.qn(b),d=H.c.M.from("https://www.gstatic.com/charts/%{version}/loader.js");return google.v.w.Qa.load(d,{version:c.jn}).then(function(){var e=H.wb("google.charts.loader.VersionSpecific.load")||H.wb("google.charts.loader.publicLoad")||H.wb("google.charts.versionSpecific.load");if(!e)throw Error("Bad version: "+b);google.v.w.J.rj=function(f){f=e(c.version,f);if(null==f||null==f.then){var g=H.wb("google.charts.loader.publicSetOnLoadCallback")||H.wb("google.charts.versionSpecific.setOnLoadCallback");
f=new Promise(function(h){g(h)});f.then=g}return f}})};google.v.w.J.en=function(b,c){if(!google.v.w.J.gf){if(c.enableUrlSettings&&window.URLSearchParams)try{b=(new URLSearchParams(top.location.search)).get("charts-version")||b}catch(d){console.info("Failed to get charts-version from top URL",d)}google.v.w.J.gf=google.v.w.J.hn(b)}return google.v.w.J.jd=google.v.w.J.gf.then(function(){return google.v.w.J.rj(c)})};
google.v.w.J.jo=function(b){if(!google.v.w.J.jd)throw Error("Must call google.charts.load before google.charts.setOnLoadCallback");return b?google.v.w.J.jd.then(b):google.v.w.J.jd};google.v.load=function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];d=0;"visualization"===c[d]&&d++;var e="current";H.L(c[d])&&(e=c[d],d++);var f={};H.Da(c[d])&&(f=c[d]);return google.v.w.J.en(e,f)};H.Dc(aa,google.v.load);google.v.$i=google.v.w.J.jo;H.Dc("google.charts.setOnLoadCallback",google.v.$i);
google.v.w.J.ik=H.c.M.from("https://maps.googleapis.com/maps/api/js?jsapiRedirect=true&key=%{key}&v=%{version}&libraries=%{libraries}");google.v.w.J.jk=H.c.M.from("https://maps-api-ssl.google.com/maps?jsapiRedirect=true&file=googleapi&key=%{key}&v=%{version}&libraries=%{libraries}");
google.v.w.J.fn=function(b,c,d){console.warn("Loading Maps API with the jsapi loader is deprecated.");d=d||{};b=google.v.w.J.hf(d.callback);google.v.w.Qa.load("2"===c?google.v.w.J.jk:google.v.w.J.ik,{key:d.key||d.client||"",version:c||"",libraries:d.libraries||""}).then(b)};google.v.w.J.ig=H.c.M.from("https://www.gstatic.com/inputtools/js/ita/inputtools_3.js");
google.v.w.J.dn=function(b,c,d){H.Da(d)&&d.packages?(H.isArray(d.packages)?d.packages:[d.packages]).includes("inputtools")?(console.warn("Loading Input Tools with the jsapi loader is deprecated.\nPlease load "+google.v.w.J.ig+" directly."),b=google.v.w.J.hf(d.callback),google.v.w.Qa.load(google.v.w.J.ig,{}).then(b)):console.error("Loading elements other than inputtools with the jsapi loader is unsupported."):console.error("google.load of elements was invoked without specifying packages")};
google.v.w.J.hf=function(b){return function(){if(H.L(b)&&""!==b)try{H.wb(b)()}catch(c){throw Error("Callback failed with: "+c);}}};google.v.w.J.Yh=function(b){for(var c=[],d=0;d<arguments.length;++d)c[d-0]=arguments[d];switch(c[0]){case "maps":google.v.w.J.fn.apply(google.v.w.J,G.ve(c));return;case "elements":google.v.w.J.dn.apply(google.v.w.J,G.ve(c));return}if("visualization"!==c[0])throw Error('Module "'+c[0]+'" is not supported.');google.v.load.apply(google.v,G.ve(c))};
google.v.w.J.Cn=function(b){H.L(b)&&(b=google.v.w.J.hf(b),google.v.w.ja.Ai().then(b))};google.v.w.J.Bn=function(b){if(H.L(b))try{if(""!==b)for(var c=JSON.parse(b).modules,d=G.Dd(c),e=d.next();!e.done;e=d.next()){var f=e.value;google.v.w.J.Yh(f.name,f.version,f)}}catch(g){throw Error("Autoload failed with: "+g);}};google.v.w.J.Rl=function(){H.wb("google.load")||(H.Dc("google.load",google.v.w.J.Yh),H.Dc("google.setOnLoadCallback",google.v.$i))};
google.v.w.J.Dn=function(){google.v.w.J.Rl();var b=document.getElementsByTagName("script");b=b[b.length-1].getAttribute("src");b=(new H.G(b)).Oa.toString();b=new H.G.bb(b);google.v.w.J.Cn(b.get("callback"));google.v.w.J.Bn(b.get("autoload"))};google.v.w.J.Dn();}).call(this);
;
//# sourceMappingURL=scripts.js.map