# Chapter 1 transcript revision

27 October 2026 · Instructor-review edition

[Open the chapter](https://ashutosh-bhatia.github.io/quantum-machine-learning/site/#classical-information).

The four existing lesson routes now follow the instructor's motivating questions, familiar examples and step-by-step calculations more closely. The written theory remains the main reading path. Approximately 5,800 whitespace-separated words across the four lesson sources include explanation, mathematics and exercise solutions; this is a descriptive count, not a length requirement.

## What changed

- **States:** the main example is the lecture's four-setting switch, with explicit separation of labels, coordinate positions and fixed binary codes. The three-setting example remains an added extension for unused codes. A die-label/array-index question addresses the classroom confusion directly.
- **Probability:** the sealed pass/fail envelope motivates the probability vector and the distinction between information update and physical intervention. The changing-team example questions a historical probability estimate's assumptions. A complete joint table develops marginal and conditional probabilities before the later quantum partial-measurement lesson.
- **Operations:** the lecture's asymmetric rule is tested on both definite inputs before an uncertain input is used. Its decomposition A=(I+R0)/2 distinguishes a random choice of actions from their temporal composition. Symmetric random flip remains a comparison. The update derivation, normalization proof and inverse discussion are retained.
- **Composition:** connected devices and intermediate states motivate the matrix product. The function-composition analogy, reset/flip counterexample and stochastic-closure proof remain, with an exercise returning to the asymmetric operation.

The chapter has five interactive experiments and eight concept checks. The new joint-table experiment compares the worked example, independent fair bits, perfect classical correlation and a zero-probability conditioning event. Calculation disclosures let readers predict before revealing results. Navigation remains open regardless of quiz results.

The revised envelope and asymmetric-operation checks use new IDs; unchanged checks retain their browser-local records. Progress remains a study aid, not a mastery score.

## Lecture provenance

The main source is the 26 July 2026 recording: 4:32 (systems and switch settings), 11:02 (historical team outcomes), 17:40 (basis notation), 20:49–23:55 (envelope), 1:07:05 (asymmetric operation), 1:16:27 (weighted simpler operations) and 1:32:56–1:35:38 (composition). The 8 August recap motivates the classical-to-complex transition. The conditioning connection draws on 16 August, 35:58–48:29, and 30 August, 24:36. The later circuit-order connection is discussed on 30 August, 1:39:47.

The foundations slides, PDF pp.3–13, remain supporting sources. The complete joint table and additional derivations are newly authored supporting exposition. Recording offsets are not a certification of literal speech-recognition text or a substitute for mathematical checking. Raw transcripts, classroom names and administrative discussion are not included in the website or notebook.

## Figures and notebook

Figure 1 now shows four switch settings, four-component columns and all four two-bit codes. It remains an instructor-review draft, as do the two retained figures. The edited SVG was rasterized and visually checked for clipping and legibility; its generator remains editable.

The canonical [Python companion](https://colab.research.google.com/github/Ashutosh-Bhatia/quantum-machine-learning/blob/main/notebooks/00-classical-information.ipynb) uses the same examples and the sequence predict, calculate by hand, run, compare and explain. It contains 26 cells. Qiskit is reserved for the quantum-circuit chapters.

## Verification

- Static build and JavaScript syntax checks passed.
- All 195 mathematical expressions in the authored HTML passed KaTeX parsing.
- Numerical checks passed for the asymmetric decomposition, both basis inputs, both asymmetric/flip orders, all 36 operation pairs, rectangular composition, stochastic validity, invalid inputs and sampling boundaries.
- Joint-table checks passed for marginalization, both conditioning rows, independence, perfect classical correlation and rejection of zero-probability events and invalid tables.
- All 12 scientific Python code cells executed in order with NumPy 2.5.4 and Matplotlib 3.11.2. The dependency-install cell was skipped because the local environment already met its version ranges. The notebook has not been executed in a hosted Colab session.
- Browser checks covered all five experiments, incorrect/correct envelope feedback, preserved sample state when using a section link, invalid probability input, collapsible calculations and operation swapping. No browser console errors or warnings were observed during the checked interactions.
- All four lessons were checked at a 390 CSS-pixel viewport: no page-level horizontal overflow or math-rendering errors. Menus collapsed as intended, keyboard Enter opened disclosures, selecting a lesson closed the mobile menu, and the wide academic figure could be panned using the keyboard. Desktop layout was also checked. This is targeted browser QA, not a full screen-reader/device certification.

Later chapters remain planned. The roadmap identifies Simon as optional and places readout/statistical prerequisites near QML use. Publishing continues through the existing GitHub Pages main-branch configuration.
