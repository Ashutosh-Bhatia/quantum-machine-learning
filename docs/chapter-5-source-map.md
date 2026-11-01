# Chapter 5 source and implementation map

## Teaching sequence

Six lessons: unitary action; Pauli gates; Hadamard recombination; phase-dependent interference; S/T and axis rotations; circuit order and basis readout. Single-qubit scope is intentional. Joint systems and controlled operations remain in Chapter 6.

## Material reviewed

- Lecture Slides - 1 to 7.pdf, PDF pages 23–27: Pauli matrices, Bloch half-turns, Hadamard matrix and basis actions. Pages 49–50: phase gates and the H/S/H/T worked circuit.
- Personal transcripts 4Quantum Machine Learning and 8Quantum Machine Learning, paragraphs 8 and 15: coordinate-to-Bloch interpretation; calculate unitarity; Hadamard as mixer and recombiner.
- Personal transcript 5Quantum Machine Learning, paragraph 190: H, S, H, T in time order corresponds to THSH in matrix order. Preserve intermediate columns rather than reverse the calculation accidentally.
- Additional Quantum-circuits deck: circuit ordering and unitary-operation foundations already reviewed for Chapter 4.
- Existing Pauli animation informed the need for selectable inputs and geometric interpretation; the chapter's activity and SVGs are newly authored and use the common site components.

## Corrections and extensions

- Source phase slide states T^4=I; correct to T^4=Z and T^8=I. This is not merely a global-phase distinction.
- State clearly that Pauli gates have the same Bloch action as axis half-turns but Rx(pi)=-iX (similarly Y/Z).
- Hadamard is not a generic randomizer or a y-axis quarter-turn. Include H^2=I, coherent signed sums and the measured intermediate-branch comparison.
- Explain P(phi) versus Rz(phi), degrees in UI versus radians in equations/code, and the controlled-phase caveat for future chapters.
- Add X/Y basis readout with correct time ordering and distinguish detector-frame conditional state from an input-frame projector update.

## Learning elements and validation

Six original SVG figures; six reader-controlled activities (including a phase-sweep animation and rotation map); twelve stable quiz IDs; eighteen worked practice problems; one Qiskit/NumPy notebook. Browser controls use a shared independently tested gate model, with no external simulation service or account required.

Validation includes gate identities, analytic Bloch rotation formulas across a state/angle grid, interference probabilities, readout overlaps and the exact worked THSH state. The notebook independently checks Qiskit matrices and evolved states against NumPy. All existing notebook companions and chapter mathematics checks are retained.

Public pages contain no transcript excerpts, private dialogue or repeated author attribution.
