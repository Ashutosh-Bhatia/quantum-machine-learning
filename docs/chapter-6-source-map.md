# Chapter 6 source and validation map

## Material and teaching decisions

- Other Lecture Slides/02-Multiple-systems-slides.pdf: joint states and ordering (pages 2–20), joint quantum vectors and product/entangled examples (40–50), partial measurement grouping and normalization (51–62), local and controlled operations (63–76).
- Personal transcript 5Quantum Machine Learning: joint operators, factorwise actions and CNOT discussion, including the explanation near paragraph 177. Retain the calculation-led approach; state explicitly that a controlled operation need not entangle every input and does not measure the control.
- Earlier mathematical-language lessons supply tensor and matrix prerequisites; Chapter 5 supplies local gates and basis readout. Do not repeat the entire prior chapter.

## Convention

The text and browser model use |AB> in order 00,01,10,11. The notebook maps A=q1 and B=q0, uses h(1) and cx(1,0) for Bell preparation, and tests an asymmetric product input so that a swapped convention cannot hide behind Bell-state symmetry.

## Sequence and extensions

Six lessons: joint columns and marginals; pure-state factorization; local unitary action; coherent control and Bell preparation; partial measurement with complex branches; comparison with classical randomized correlation. Original figures and activities accompany every lesson. Twelve quizzes and eighteen practice problems retain stable identifiers.

Partial measurement follows the slide grouping into unnormalized remote branches. Zero-probability branches have no normalized state; small nonzero probabilities are retained. Basis-changing detector frames are distinguished from the remote conditional state. Ignored-record marginals are tested across all Pauli bases.

The last lesson separates the two-model Bell/classical comparison, a trusted-measurement entanglement witness and the complete CHSH protocol. It does not claim a sampled histogram alone is a Bell certification or a computational advantage. Density operators and general mixed-state separability are deferred to their planned systematic treatment.

## Verification

Browser math: independent tensor-position tests, CNOT basis permutations/involution, product determinants, local-unitary preservation, Bell XX/YY/ZZ predictions, complex branches, impossible/rare branches and remote marginals after ignored local measurements.

Notebook: Qiskit operators versus independent NumPy matrices; asymmetric bit ordering and marginal qargs; Bell construction; partial measurement simulation; basis-conditioned remote states; Bell versus classical distributions and finite samples.

No private transcript excerpts, student dialogue or repeated instructor attribution are published. All six SVG diagrams are original editable assets.
