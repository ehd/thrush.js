<link href="http://fonts.googleapis.com/css?family=OFL+Sorts+Mill+Goudy+TT" rel="stylesheet" type="text/css" />
<link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css" />
<style type="text/css">
body{text-rendering:optimizeLegibility;}
p,ol,ul,h1,h2,h3{margin: 27px;}
h1{font-size:36px;line-height:54px;font-weight:normal;}
h2{font-size:27px;line-height:1;font-weight:normal;}
h3{font-size:18px;line-height:1.5;font-weight:normal;text-transform:uppercase;}
body{color:#222;font:18px/1.5 'OFL Sorts Mill Goudy TT',georgia,serif;margin:48px auto;width:800px;}
code{font-family:'Inconsolata',monospace;display:inline;line-height:1;}
li{line-height:1.5;}
pre{background:#222;color:#fff;margin-left:0;margin-right:0;padding:27px;}
</style>

thrush.js
=========

thrush.js is a JavaScript implementation of the thrush combinator.

What the fork?
--------------

Thrush combines a variable number of functions into one function.
It is best explained by a simple example:

    function square(x) {
        return x*2;
    }

    var squareThreeTimes = thrush(square, square, square);

    squareThreeTimes(2)
    > 16

`squareThreeTimes`'s behavior is identical to the following definition:

    var classicSquareThreeTimes = function(x){
        return square(square(square(x)));
    }

    squareThreeTimes(2) == classicSquareThreeTimes(2)
    > true

Given `X = thrush(A, B)` and `x = X(p)`:

1. `A` is invoked with `p`
2. `B` is invoked with `A`'s return value
3. `B`'s return value will be assigned to `x`

Ideas
-----

### Asynchronicity with continuation-style functions

Thrush usually combines functions for immediate synchronous execution.
Instead of combining functions by immediately passing return values
as parameters they could be "combined for asynchronicity".

Given `Y = thrushAsync(C, D)` and `Y(p, c)`

1. `C` is invoked with `p, tD`
2. `tD` is invoked with `rC, c`
3. `c` is invoked with `rtD`

Note that:

- `tD` is a generated wrapper around `D` with its last argument set to `c`
- `rC` is the result of `C(p, td)`
- `rtD` is the result of `tD(rC, c)`.

### Unpacking

Usually each function returns exactly one value and consumes exactly
one argument.

What if `A` returned `[q, r]` and `thrushUnpack` invoked `B(q, r)`
instead of `B([q, r])`? Are there good reasons to do that?

This is probably most useful when provided as a wrapper so the library
user can decide when to unpack for each point in the chain.
