---
title: 'Computing the Greatest Common Divisor'
date: '2020-07-30'
draft: false
category: 'Mathematics'
tags: ['algorithms', 'Euclid', 'Rust']
---

The greatest common divisor (GCD) of two numbers is the largest integer that [divides](https://mathworld.wolfram.com/Divides.html) them both. By "divides" we mean "divides with no remainder". For example, 2 does not divide 3 (because the remainder is 1) but 2 **does** divide 4 (because the remainder is 0).

Here are a few examples of greatest common divisors:

```pseudocode
/* The factors of 5 are (1,5). The factors of 10 are (1,2,5,10). */
gcd(5, 10) = 5

/* The factors of 2 are (1,2). The factors of 9 are (1,9). */
gcd(2, 9) = 1

/* The factors of 32 are (1,2,4,8,16,32). The factors of 104 are (1,2,4,8,13,26,52,104). */
gcd(32, 104) = 8
```

Finding the GCD for **small** numbers is relatively easy to do by hand. Most of us were taught how to do that in school but if you want a quick refresher watch this short [Khan Academy video](https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables/cc-6th-gcf/v/greatest-common-divisor-factor-exercise).

## A Naïve Implementation

Finding the GCD for very large numbers is **much** more difficult to do by hand because the number of [prime factors](https://mathworld.wolfram.com/PrimeFactor.html) can be quite large &ndash; and time consuming to find. Programming to the rescue...

A naïve implementation in [Rust](https://www.rust-lang.org/) might look like this:

```rust
/// A simple GCD calculator that checks every possible divisor
pub fn gcd_naive(a: u128, b: u128) -> u128 {
    // The GCD can't be greater than the smallest input
    let max_gcd = if a < b { a } else { b };

    // We start with the divisor that always works
    let mut gcd = 1;

    // Now we check every number in our range of
    //    possible divisors and keep the largest
    for div in 2..max_gcd + 1 {
        if a % div == 0 && b % div == 0 {
            gcd = div;
        }
    }
    return gcd;
}
```

The `for` loop in this function will execute `min(a,b)` times. As you might expect, this will work well enough for small numbers, but will run for a very long time with extremely large values of `a` and `b`.

Let's see how this algorithm behaves as the number of digits in `a` and `b` increase. Rust's benchmark feature will run a test many times and compute averages. I wrote 8 different tests that executed the naïve algorithm with 1 - 8 digits. Rust's `cargo bench` gives us a nice way to benchmark each scenario.

```bash
running 8 tests
test tests::naive_1_digit  ... bench:           0 ns/iter (+/- 0)
test tests::naive_2_digit  ... bench:           0 ns/iter (+/- 0)
test tests::naive_3_digit  ... bench:         278 ns/iter (+/- 64)
test tests::naive_4_digit  ... bench:       8,279 ns/iter (+/- 1,971)
test tests::naive_5_digit  ... bench:      46,684 ns/iter (+/- 7,123)
test tests::naive_6_digit  ... bench:     761,656 ns/iter (+/- 118,619)
test tests::naive_7_digit  ... bench:   4,050,820 ns/iter (+/- 32,193)
test tests::naive_8_digit  ... bench:  39,972,420 ns/iter (+/- 13,088,906)

test result: ok. 0 passed; 0 failed; 0 ignored; 8 measured; 8 filtered out; finished in 21.91s
```

So our suspicions were correct. The runtime grows **dramatically** as the number of bits to process grows **linearly** (more digits means more bits to process). In fact, once we get to 4 digits, each successive test runs about an order of magnitude slower.

Here's a chart of the benchmark data (converted to milliseconds) to drive the point home.

![naive-gcd](C:\Users\Jeff\Code\jeff-mastry-blog\public\images\posts\computing-the-greatest-common-divisor\naive-gcd.png)

Let's see if we can do better.

## Euclid's Algorithm

Making a more efficient algorithm almost always involves discovering some key insight about the problem domain. Luckily someone has already done that for us. More than 2000 years ago the Greek mathematician [Euclid](https://en.wikipedia.org/wiki/Euclid) discovered [an efficient algorithm](https://mathworld.wolfram.com/EuclideanAlgorithm.html) for calculating the GCD of two integers. You can read the gory details in that Wolfram link but the process is very simple.

Suppose we have two integers $a$ and $b$. The process goes like this...

1. Divide $a$ by $b$ to get the remainder $r$.

2. If $r=0$ then the GCD is the **previous** value of $r$ and we're done.

3. If $r > 0$ then set $a = b$ and $b = r$ and repeat from step 1.

> Note that we're assuming $a >= b$ at the start of the process. If not, just swap them so this is true.

Let's walk through an example where we calculate the GCD of $32$ and $104$ .

$$
r = mod \left \lparen \frac{104}{32} \right \rparen = 8
$$

$$
r = mod \left \lparen \frac{32}{8} \right \rparen = 0
$$

That's it! We found the GCD (8) in just **two** steps. Compare that to the naïve implementation which calculated $mod$ (once or twice) for every number between 2 and 32 &ndash; a 15x improvement, at least.

Let's look at a larger example to make sure we're on the same page. This time we'll use $10,234$ and $38,545$ . The colors are used to show where numbers are carried forward from the previous calculation.

$$
r = mod \left \lparen \frac{38545}{\color{teal} 10234} \right \rparen = (38545 - 30702) = \color{red} 7843
$$

$$
r = mod \left \lparen \frac{\color{teal}10234}{\color{red}7843} \right \rparen = (10234 - 7843) = \color{violet}2391
$$

$$
r = mod \left \lparen \frac{\color{red}7843}{\color{violet}2391} \right \rparen = (7843 - 7173) = \color{teal}670
$$

$$
r = mod \left \lparen \frac{\color{violet}2391}{\color{teal}670} \right \rparen = (2391 - 2010) = \color{red}381
$$

$$
r = mod \left \lparen \frac{\color{teal}670}{\color{red}381} \right \rparen = (670 - 381) = \color{violet}289
$$

$$
r = mod \left \lparen \frac{\color{red}381}{\color{violet}289} \right \rparen = (381 - 289) = \color{teal}92
$$

$$
r = mod \left \lparen \frac{\color{violet}289}{\color{teal}92} \right \rparen = (289 - 276) = \color{red}13
$$

$$
r = mod \left \lparen \frac{\color{teal}92}{\color{red}13} \right \rparen = (92 - 91) = \color{violet}1
$$

$$
r = mod \left \lparen \frac{\color{teal}13}{\color{red}1} \right \rparen = 0
$$

That's only 9 steps, compare to the naïve algorithm which takes more than 10,234 steps to determine this GCD!

OK, enough math. Let's implement Euclid's Algorithm in Rust and run some actual benchmarks.

```rust
/// Calculates the GCD with Euclid's Algorithm
pub fn gcd(a: u128, b: u128) -> u128 {
    // x should be the larger of (a,b) and y the smaller
    let (mut x, mut y) = if a > b { (a, b) } else { (b, a) };

    // euclid's algorithm
    while y != 0 {
        let r = x % y;
        x = y;
        y = r;
    }

    return x;
}
```

This is a straightforward implementation of Euclid's Algorithm (very similar to the code in the Rust source). Let's run the benchmarks...

```sh
running 8 tests
test tests::euclid_1_digit ... bench:           5 ns/iter (+/- 0)
test tests::euclid_2_digit ... bench:           8 ns/iter (+/- 4)
test tests::euclid_3_digit ... bench:          15 ns/iter (+/- 0)
test tests::euclid_4_digit ... bench:          34 ns/iter (+/- 1)
test tests::euclid_5_digit ... bench:          23 ns/iter (+/- 0)
test tests::euclid_6_digit ... bench:          23 ns/iter (+/- 0)
test tests::euclid_7_digit ... bench:          43 ns/iter (+/- 0)
test tests::euclid_8_digit ... bench:          95 ns/iter (+/- 2)

test result: ok. 0 passed; 0 failed; 0 ignored; 8 measured; 8 filtered out; finished in 12.12s
```

That's a substantial improvement over the first algorithm! Let's take a look at the chart.

![euclid-gcd](C:\Users\Jeff\Code\jeff-mastry-blog\public\images\posts\computing-the-greatest-common-divisor\euclid-gcd.png)

At first glance, it might appear we have another algorithm that doesn't work for large numbers, but if you look closely at the y-axis you will see that the run times are not increasing by orders of magnitude like the naïve algorithm did. Also, note that this chart is in **nano**seconds. If we charted this at the millisecond level like we did for the naïve algorithm, everything would round to zero (keep that in mind when you are comparing the two).

## Resources

1. You can get the source code for both algorithms and the supporting benchmarks from my GitHub repository [euclids_algorithm](https://github.com/mastry/euclids_algorithm).

2. Take a look at a different GCD algorithm in the [Rust source code](https://docs.rs/gcd/2.0.1/src/gcd/lib.rs.html#35).
