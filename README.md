Write turing machines for NU Theory of Comp in an simpler format so they're less confusing and easier to debug. Transpiles to
[tint](https://github.com/cjcodell1/tint)

## Usage

`npx dajinchu/tint-short INFILE OUTFILE` to compile short machine INFILE to OUTFILE

## Format

Everything is the same, except the transitions list looks like:
```yaml
transitions:
  state:
    # from state, if letter "in," transition to new_state, writing "out" and moving dir on the tape
    in: [new_state, out, dir] 

    # from state, if letter "in," transition to new_state, NOT writing and moving dir on the tape
    in: [new_state, dir] 

    # from state, if letter "in," accept
    in: accept 
```

**Letters that result in rejection do NOT need to be specified.**

## Example

A turing machine that decides whether strings over {a, b} have more a's than b's:

```yaml
start: start

accept: accept
reject: reject

transitions:
  start:
    a: [ find_b, _, R]
    b: [ find_a, _, R]
    x: [ start, _, R]
  find_a:
    a: [ return, x, L]
    b: [ find_a, R]
    x: [ find_a, R]
  find_b:
    _: accept
    a: [ find_b, R]
    b: [ return, x, L]
    x: [ find_b, R]
  return:
    _: [ start, R]
    a: [ return, L]
    b: [ return, L]
    x: [ return, L]
```

```yaml
start: start

accept: accept
reject: reject

transitions:
  - [start, _, reject, _, R]
  - [start, a, find_b, _, R]
  - [start, b, find_a, _, R]
  - [start, x, start, _, R]

  - [find_a, _, reject, _, R]
  - [find_a, a, return, x, L]
  - [find_a, b, find_a, b, R]
  - [find_a, x, find_a, x, R]

  - [find_b, _, accept, _, R]
  - [find_b, a, find_b, a, R]
  - [find_b, b, return, x, L]
  - [find_b, x, find_b, x, R]

  - [return, _, start, _, R]
  - [return, a, return, a, L]
  - [return, b, return, b, L]
  - [return, x, return, x, L]
```
