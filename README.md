thrush.js
=========

thrush.js is a JavaScript implementation of the thrush combinator.

What the fork?
--------------

Thrush combines a variable number of functions into one function.
It is best explained by a simple example:

    function square(x) {
        return x*x;
    }

    var squareThreeTimes = thrush(square, square, square);

    squareThreeTimes(2)
    > 256

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

### Different ways to combine functions

Right now there are two implemented approaches:

- Reduce an array of functions using a wrap function
- Build a static chain of functions

New idea:

- Code generation: Read function’s source and concatenate to composite function. Inherently evil and predestined to break, but worth a try.

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

### Interesting concepts from other languages

Haskell

- http://www.haskell.org/haskellwiki/Continuation
- http://www.haskell.org/haskellwiki/Monad#Special_notation
- http://www.haskell.org/haskellwiki/Do\_notation\_considered_harmful

Clojure

- http://clojuredocs.org/clojure_core/clojure.core/-&gt;&gt;
- http://clojuredocs.org/clojure_core/clojure.core/-&gt;
