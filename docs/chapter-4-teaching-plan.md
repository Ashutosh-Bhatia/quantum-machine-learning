# Chapter 4 preparation: Qubits and Measurement

Prepared 1 November 2026. This authoring blueprint now accompanies the implemented six-lesson Chapter 4; it is not displayed as lesson content.

## Teaching purpose

Turn Chapter 3’s mathematics into an operational description of a single qubit. Repeatedly ask: what was prepared, which measurement is performed, what can be recorded, and what state is available afterwards? Preserve the familiar predict → hand calculation → experiment → explanation approach. The theory remains the main path, supported by figures and activities.

## Prerequisites and boundaries

Prerequisites: Chapter 2’s probability/count distinction and Chapter 3’s complex squared magnitudes, normalized columns, bras, inner products and projectors. Recap these locally rather than re-teaching all of Chapter 3.

Chapter 4 covers pure single-qubit states and ideal projective measurements. Include a bounded mathematical X-basis comparison so relative-phase claims can be demonstrated. Chapter 5 will develop gates, interference sequences and physical/circuit realization of measurement bases. Introduce static Bloch state geometry here; rotations and gate paths belong in Chapter 5. Composite states, entanglement and partial measurement remain in Chapter 6; full density matrices, tomography and noise models remain in the later observables/statistics chapter.

## Proposed chapter structure

### 4.1 What is a qubit state?

**Learning outcomes**

- Interpret a normalized two-entry complex column as a pure-qubit state in a declared basis.
- Distinguish a basis state, a coherent superposition and a classical randomized preparation.

**Theory and derivation:** Use the on/off switch from Chapter 2, then ask what changes when our two entries are amplitudes rather than probabilities. Define the pure-state model and preparation; state the basis order (0,1). Avoid a hidden-value or rapidly alternating classical-bit explanation. Explain that a state description makes predictions for specified measurements.

**Worked example:** Start with |0>, |1>, |+> and |->. Normalize (1−i,2) by sqrt(6); its Z probabilities will be 1/3 and 2/3. Introduce this prediction as a bridge to 4.2, not an unexplained rule.

**Original academic figure:** Four aligned panels: classical probability column (1/2,1/2), pure amplitude column (1/sqrt(2),1/sqrt(2)), preparation procedure, measurement question. Explicitly label column type; equal numbers do not have equal meanings.

**Interactive activity:** State preparation explorer: select basis 0, basis 1, plus, minus or a custom complex column. Show the raw norm and require an explicit Normalize action for non-unit input. Disable measurement for invalid inputs and zero. The activity must not silently replace an invalid state.

**Assessment:** q4-state-valid, q4-preparation. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

### 4.2 The Born rule: amplitudes, probabilities and counts

**Learning outcomes**

- Calculate computational-basis outcome probabilities from complex amplitudes.
- Separate an exact probability, an expected count and one observed batch.

**Theory and derivation:** Derive P(0)=|alpha|² and P(1)=|beta|², then use normalization to show their sum is one. One shot produces one outcome. Estimating a distribution requires repeated known preparation and measurement. A statevector shown by a simulator is mathematical model information, not a physical readout of amplitudes.

**Worked example:** Use the slide state ((1+2i)/3,−2/3): squared magnitudes 5/9 and 4/9. For 90 fresh preparations the expected counts are 50 and 40, not guaranteed counts. Contrast alpha, P(0), E[N0] and N0 in one table.

**Original academic figure:** Preparation → one measurement → one classical record, repeated down the page. Alongside, compare an exact-probability bar chart and a labelled illustrative count histogram with its batch size.

**Interactive activity:** Prepare-and-sample: exact probabilities remain visible. Buttons for one fresh shot and batches of 10, 100 and 1000; distinguish last batch from cumulative totals, and provide Reset counts. Animate one record at a time only on request. Re-preparation is explicit. Seeded notebook results support reproducibility; website batches fluctuate.

**Assessment:** q4-born, q4-counts. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

### 4.3 Global phase and relative phase

**Learning outcomes**

- Distinguish equal coordinate vectors, global-phase-equivalent pure states and states with equal Z statistics.
- Use an X-basis overlap calculation to demonstrate a relative-phase difference.

**Theory and derivation:** For an arbitrary normalized measurement vector m, prove |<m|exp(i gamma)psi>|²=|<m|psi>|². Define relative phase only when both relevant components are nonzero. Compare plus, minus-plus and minus. Introduce the orthonormal pair plus/minus as a mathematical measurement choice, using Chapter 3 inner products; gate realization is deferred to Chapter 5.

**Worked example:** For psi_phi=(|0>+exp(i phi)|1>)/sqrt(2), PZ(0)=PZ(1)=1/2, while PX(+)=(1+cos(phi))/2. At phi=0, pi/2, pi these probabilities are 1, 1/2, 0. Plus and minus-plus are equivalent; minus is not equivalent to plus.

**Original academic figure:** Two comparison rows: common rotation of both amplitude arrows versus rotation of only one. Show Z and X probability columns. Caption distinguishes the complex-amplitude plane from the Bloch sphere.

**Interactive activity:** Phase explorer: separate global gamma and relative phi controls, with exact Z/X outputs. Global control may change coordinate arrows while leaving probabilities fixed. Relative control changes X probabilities at fixed Z probabilities. Explicit controls for plus, minus, plus-i, and a pole state; label relative phase undefined at a zero component.

**Assessment:** q4-global, q4-relative. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

### 4.4 What happens after a measurement?

**Learning outcomes**

- Calculate a branch vector, its probability and its conditional normalized state.
- Explain immediate repeatability and why remeasurement is different from fresh preparation.

**Theory and derivation:** Use Pa=|a><a|. Separate Pa psi, pa=||Pa psi||², and Pa psi/sqrt(pa) for pa>0. Retain any phase in the normalized vector and distinguish it from a physically equivalent canonical basis vector. State the ideal projective-measurement and no-intervening-operation assumptions. Do not present a projector as a unitary gate.

**Worked example:** For psi=(1/2,sqrt(3)/2), the outcome-0 branch is (1/2,0), p0=1/4, normalized state |0>. For the complex slide state, outcome 0 produces ((1+2i)/sqrt(5),0), which is globally equivalent to |0>. A zero-probability branch has no conditional normalized state.

**Original academic figure:** A three-stage branch diagram with labels: projected column → squared norm/probability → divide by sqrt(probability). A second flow compares fresh preparation before every measurement with remeasuring one already measured system.

**Interactive activity:** Measurement timeline: choose Fresh preparation each shot or Reuse post-measurement state. Step through Z measurements, then insert an X measurement. Begin with |0>: Z gives 0; X gives ± with probability 1/2; a subsequent Z gives 0/1 with probability 1/2. Do not imply an X result equals a computational bit label without an explicit displayed mapping.

**Assessment:** q4-branch, q4-repeat. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

### 4.5 The Bloch sphere as a map of pure-qubit states

**Learning outcomes**

- Translate between normalized amplitudes and a Bloch-sphere point, up to global phase.
- Distinguish Bloch coordinates, amplitudes and measurement probabilities.

**Theory and derivation:** Motivate two physical parameters by removing overall phase and imposing normalization. Derive alpha=cos(theta/2), beta=exp(i phi)sin(theta/2) in a chosen gauge, then x=sin(theta)cos(phi), y=sin(theta)sin(phi), z=cos(theta). Derive PZ(0)=(1+z)/2 and PZ(1)=(1−z)/2. Explain that coordinate gauge needs care when alpha=0.

**Worked example:** North/south poles give |0>/|1>; equator points at phi=0, pi, pi/2 give plus, minus and plus-i. For theta=2pi/3 and phi=pi/2, alpha=1/2, beta=i sqrt(3)/2, (x,y,z)=(0,sqrt(3)/2,−1/2), and Z probabilities are 1/4 and 3/4.

**Original academic figure:** Clean labelled sphere with theta as polar and phi as azimuthal angle. Place the amplitude column and Z probability bars alongside rather than labelling the sphere coordinates as amplitudes. Include pole and equator insets.

**Interactive activity:** User-controlled sphere with angle sliders, preset states and optional Play/Pause phase sweep. Show amplitudes, coordinates and exact Z/X probabilities; X probabilities use the measurement already defined in 4.3. Phi has no observable effect at either pole. Limit to pure states on the surface; do not put a pure-state arrow at the origin to represent classical uncertainty.

**Assessment:** q4-bloch, q4-pole. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

### 4.6 What can a measurement tell us?

**Learning outcomes**

- Explain what a single outcome and a single-basis histogram do not determine.
- Distinguish coherent superposition from a randomized preparation using a second measurement basis.

**Theory and derivation:** Consolidate the preparation/measurement distinction. A single result does not reveal a complete unknown state. Z probabilities do not reveal relative phase. Compare plus with an equal random choice of basis 0 or basis 1; predict by averaging the separate preparation probabilities. Do not introduce full density matrices or tomography reconstruction here.

**Worked example:** Both preparations give Z=(1/2,1/2). In X, plus gives (+,−)=(1,0), while the randomized preparation gives (1/2,1/2). This shows why matching statistics in one basis are insufficient; it is not a proof that every quantum problem has a computational advantage.

**Original academic figure:** Two explicit preparation procedures feeding the same Z detector and then alternative X detectors. Show theoretical probability bars separately from sampled frequencies. Add a short reading checklist: state, basis, outcome, repeats and assumption.

**Interactive activity:** Compare preparations in Z/X. Show pure plus versus an explicit per-shot classical preparation choice; every fresh trial prepares according to the selected procedure. Keep the random choice record distinct from the final measurement record. Allow exact and sampled views, with no claim that a finite histogram identifies a state with certainty.

**Assessment:** q4-mixture, q4-state-readout. Three practice problems with hints and complete worked solutions are in the companion assessment bank.

## Figures and presentation

Prepare six original core figures, including the two-part measurement/re-preparation flow in 4.4. Use editable SVG for exact labels, columns and probability bars; retain the established white academic layout. Reuse the Bloch drawing framework where useful, but make the figure answer this chapter’s operational questions rather than repeat a decorative sphere. Every figure has descriptive alternative text and a substantive caption. Put figures beside the relevant derivation. No reader-facing draft/review notices or repeated lecture/author credits. External images, if later selected, require a source immediately below them; none is needed for the present original-diagram plan.

## Assessment placement

Place two concept checks within each lesson near the relevant explanation, not all at the chapter end. Wrong-answer feedback must identify the misconception and show the relevant rule. Offer hints separately from worked solutions for all three lesson exercises. The overview carries six cumulative problems. The bank contains exact proposed questions, correct choices and solutions: docs/chapter-4-assessment-bank.json. Existing checks and completion records in Chapters 1–3 must keep their IDs.

## Programming companion blueprint

Proposed notebook: 05-qubits-and-measurement.ipynb. Use NumPy first to check amplitudes, basis overlaps, branch probabilities and normalization. Add Qiskit Statevector examples for exact Z and X-basis probabilities, explicitly labelled simulator model access. Use seeded sample counts on known fresh preparations; never describe sample_counts as repeated measurement of the same collapsed physical qubit. Implement the measurement timeline as an explicit conditional-state update, independently checked by projection formulas. Include global/relative phase comparisons and pure-plus versus randomized-0/1 ensembles. No hardware login or cloud credit is required for the planned ideal-simulation companion. No new Qiskit APIs are selected or asserted here; verify the current official documentation and execute the notebook during implementation.

## Source coverage and editorial checks

| Topic | Source | Treatment |
|---|---|---|
| Pure states, normalization and plus/minus | Foundations PDF pp.16–17; August 8 transcript around 58:59 | Core 4.1; separate pure superposition from statistical mixture. |
| Born probabilities and complex example | PDF pp.19–20; August 8 around 1:25:47 | Core 4.2; emphasize one recorded outcome and fresh preparations. |
| Global phase and Bloch equivalence | PDF p.18; August 9 around 8:29 | Core 4.3/4.5; distinguish an overall state phase from a phase applied to one component/controlled branch. |
| Projection and conditional normalization | PDF pp.41–43; August 30 around 41:08 | Core 4.4; use squared magnitude for complex overlaps and sqrt(probability) for branch normalization. |
| Bloch parametrization | PDF p.18 | Core 4.5; explain half-angle, poles and gauge rather than only display formula. |
| Z/X comparison of coherent versus randomized preparation | Synthesized from source pure-state/measurement ideas plus Chapter 3 inner products | Added worked exposition in 4.3/4.6; not presented as a verbatim slide claim. |
| Practice normalization and overlap | Existing practice Q1–5, Q17, Q19–20 | Adapt single-qubit parts; multi-qubit Q16/Q18 are deferred. |

Private transcript filenames: 2Quantum Machine Learning (S1-26_AIMLZG545).docx (8 August); Quantum Machine Learning (S1-26_AIMLZG545) (1).docx (9 August); 5Quantum Machine Learning (S1-26_AIMLZG545).docx (30 August). Primary PDF: Lecture Slides - 1 to 7.pdf. Page references are PDF page numbers. Source-map timestamps were checked against the corresponding transcript passages; they support the teaching flow, not automatic validation of spoken formulas.

Editorial cautions: the transcript sometimes calls plus a “mixed state” or invokes a rotating coin. Preserve the question-led intuition while using “pure superposition” accurately and bounding the classical analogy. Replace a “signed projection length” explanation for general complex amplitudes with the complex inner product and squared modulus. Retain phases in calculated conditional columns before noting global equivalence. Explain preparation, measurement, conditioning and statistical inference as distinct steps. Raw dialogue, student names and personal anecdotes stay private.

## Validation and implementation order

1. Author 4.1 and 4.2 with complete theory, figures, activities and questions; check normalization and deterministic/zero boundary cases.
2. Add phase, conditional update and Bloch sections, independently checking overlap formulas and state equivalence.
3. Add the ensemble comparison and cumulative problems, then implement and execute the notebook.
4. Check every quiz answer and worked solution, mathematical rendering, figure labels, keyboard controls and simulation provenance. Distinguish exact probabilities from finite samples. Avoid tests that require a random batch to equal its expectation.
5. Verify all routes, the collapsible contents hierarchy, previous/next links and existing saved checks. Preserve the author credit and the absence of the prototype menu.
6. Publish only the completed chapter after verification; do not publish this preparation document as lesson content.

Preparation checks: central numerical examples were calculated independently using standard-library complex arithmetic. Report: work/chapter4-preparation/checks.txt (outside the website). Full browser, notebook and assessment verification remains part of implementation.


## Implementation record

Six lessons, six original SVG figures, six activities, 12 concept checks and 24 practice problems are implemented. Notebook: notebooks/05-qubits-and-measurement.ipynb. scripts/check_qubits.cjs independently checks Born probabilities, global phase, normalized branches including very small nonzero probabilities, repeated measurements, coordinate geometry and ensemble comparisons. All seven downloadable notebooks execute successfully in the local Qiskit/NumPy check environment. Browser and publication verification accompany the final deployment.
