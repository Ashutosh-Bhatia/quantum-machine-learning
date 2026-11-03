# Chapter 8: sources, content decisions and validation

## Sources and teaching flow

- Personal transcript 6Quantum Machine Learning, paragraphs 210/216: expand the tensor products and simplify explicitly; paragraphs 226–230: minus target, common versus relative signs, constant versus balanced, Hadamard recombination; paragraph 395: begin with two input bits before the n-bit Hadamard formula.
- Previously extracted Lecture Slides - 1 to 7 material: the Deutsch preparation/oracle/readout sequence; PDF page 85 on the uniform two-bit preparation and page 87 on the general signed Hadamard sum and f=x0 example.
- Official IBM Quantum Learning pages for Deutsch and Deutsch–Jozsa checked for query-model context. Distinguish exact deterministic and bounded-error randomized comparisons explicitly.

The manuscript reasoning is paraphrased; no classroom dialogue or repeated instructor attribution is published. Slide register order is adapted consistently to the book's input-first, target-last convention rather than silently mixed with it.

## Sequence

Five lessons: the property and classical information; full Deutsch state sequence; signed interference and inserted measurement; two-bit then n-bit Deutsch–Jozsa; promises, query guarantees and practical resource costs.

Five original SVG diagrams, five reader-controlled activities, ten stable concept-check IDs, fifteen worked practice problems and one executable Qiskit/NumPy companion. Simon is left as a future extension; Chapter 9 remains the next core chapter.

## Accuracy decisions

- One-bit target is q0, input q1. Two-bit input is q2q1 and target q0. Keep common negative phases in vector derivations until probabilities are interpreted.
- The query model supplies coherent XOR access on both target values. One oracle call does not imply one elementary gate or practical wall-clock advantage.
- For Deutsch–Jozsa, the zero-versus-nonzero rule requires a constant-or-balanced promise. The editable activity includes AND to show the limitation.
- Two-input balanced Boolean functions are all affine; use a three-input majority function in the notebook to show that a balanced case can have multiple nonzero outputs.
- Classical exact deterministic worst case is N/2+1. Independent uniform sampling with replacement has balanced-case error 2^(1-k). This is conditional error, not a posterior probability over functions. Without replacement use the hypergeometric expression and reject budgets exceeding the domain.

## Verification

JavaScript checks every Boolean truth table on one, two and three input bits: normalization, all-zero amplitude formula, promised-class guarantees, complement global sign, complete small Deutsch state predictions, majority's multi-output distribution and randomized error by direct enumeration.

Notebook compares Qiskit gate-oracle circuits and complete evolved columns with independent NumPy calculations for every one/two-input table. A separately constructed three-input majority circuit verifies multiple possible nonzero outputs. Exact classical sampling errors are independently enumerated with and without replacement. Existing notebook companions are executed alongside the new one.

Browser verification covers classical compatible-table updates, circuit stepping, early-measurement comparison, edited invalid-promise tables, query-budget boundaries and concept-check feedback. Public routes and prior progress IDs are retained.
