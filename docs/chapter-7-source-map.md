# Chapter 7: source and validation map

## Teaching sources

- Personal transcript 6Quantum Machine Learning, paragraphs 226–230: target minus remains factored, function-dependent relative sign appears on the input, constant versus different function values, and Hadamard as recombiner. The chapter preserves this reasoning while making tensor order and global-phase equivalence explicit.
- Personal transcript 1Quantum Machine Learning (S1-26_AIMLZG545) (1), paragraph 410: combining component gates into one operation, with care about multiplication order.
- Lecture Slides - 1 to 7: register conventions, oracle basis action and the phase-kickback explanation already reviewed during earlier chapter preparation. The current chapter separates oracle foundations from Chapter 8's algorithm and query-complexity analysis.
- Official Qiskit bit-ordering and QuantumCircuit references checked for statevector indices, drawing-only reversal, measurement maps and controlled gate argument order.

## Content and conventions

Six lessons: registers; labels and classical records; reversible embedding and clean uncomputation; complete XOR-oracle specification; superposed queries; phase kickback. Six original editable SVG figures, six reader-controlled activities, twelve quiz IDs, eighteen worked problems and one Qiskit/NumPy notebook.

Use |XY> with Y as least-significant target bit. For two input bits use |x1 x0 y>=|q2 q1 q0>. Truth tables list f(00),f(01),f(10),f(11). Both target input values are specified. In the four-qubit uncomputation example use |x1 x0 T Y>, with T temporary and Y excluded from the inverse computation.

No claim that one oracle call reveals all function values. Distinguish simulator access, quantum measurement, oracle-query complexity and implementation cost. Contrast plus/minus/zero target preparations. Parity and AND supply different interference patterns; not every function yields a certain basis answer.

## Verification

Test all four one-input and sixteen two-input Boolean permutations; preservation of x; target-one behavior; bijection and involution; arbitrary complex amplitude kickback; plus-target invariance; Hadamard-layer involution; parity and AND input probabilities.

The notebook independently synthesizes each small oracle with controlled flips and compares every matrix column to a NumPy permutation. It verifies asymmetric ordering, measurement destinations, a clean compute-copy-uncompute example and the factored target state. All existing notebooks are run alongside it.

The browser comparison uses the declared known truth table; editing it is not a query to an unknown physical oracle. Original SVGs and paraphrased prose contain no student dialogue or repeated lecture attribution.
