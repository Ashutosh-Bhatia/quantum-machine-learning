# Resource audit and editorial plan

Inspected 27 October 2026. The machine-readable inventory records source-relative filenames, file sizes, SHA-256 fingerprints and PDF page counts. PDFs were text-extracted; diagrams have not yet received a full visual audit. PDF extraction emitted malformed-reference warnings but extracted text from every page. Page references below use PDF page positions, not printed slide numbers; repeated presentation overlays inflate page counts.

## Resources and gaps

| Material | Coverage observed | Editorial implications |
|---|---|---|
| Lecture 0 | Motivation, systems viewpoint, superposition, entanglement, CHSH, milestones | Create orientation and prerequisite diagnostic; verify date-sensitive hardware/history claims before publication. Some slides are image-heavy. |
| Lectures 1–7 (97 PDF pages) | Complex numbers, Dirac notation, states, Born rule, Bloch sphere, gates, tensor products, conditional measurement, circuits, query oracles, Deutsch, Deutsch–Jozsa, Simon | Strong foundation; reorganize by concept and remove overlay duplication. Add GF(2) postprocessing and examples connecting query advantage to its assumptions. |
| Lecture 8 | ML tasks, data, models, loss, optimization, generalization, bias/variance | Add loss-surface and data-split interactions, leakage examples and a classical baseline lab. |
| Lecture 9 (35 PDF pages) | Linear models, neural networks, backpropagation, SVMs, feature maps, kernel trick, Gram matrices | Build kernel geometry / PSD lab and an explicit bridge to quantum overlap kernels. |
| Lecture 10 (44 PDF pages) | NISQ/FT context, encoding, ansatz, readout, parameter shift, caveats about advantage | Add a full two-qubit classifier, preprocessing, multiple seeds, shot costs, noise and baseline comparisons. Four design questions should anchor the chapter. |
| Practice problems (3 pages) | 35 questions: Q1–5 states; Q6–10 gates/Bloch; Q11–15 tensor/entanglement; Q16–20 projection; Q21–25 circuits/order; Q26–30 oracles; Q31–35 Deutsch | Available through foundations/Deutsch only. Need worked solutions and later algorithm/ML/encoding/kernel/training exercises, with difficulty and prerequisite tags. |
| Pauli animation | Initial-state selection, X/Y/Z rotations, speed control, reset | Reuse as standalone lab; verify physical equivalence up to global phase and distinguish animation paths from endpoint gates. |
| Interactive companion | Gates, projection, tensor products, controlled gates, Bell states, oracle/query race, Deutsch | Reuse, then audit basis/oracle conventions, keyboard behavior, small-screen layout and every numeric example. Imported code is preserved; full correctness review is pending. |
| Introductory DOCX transcript | July 26 introductory session, systems-first explanations, assumes previous ML study; roughly 105k extracted characters | Use to preserve teaching voice and anticipate misconceptions. Do not publish raw classroom dialogue or names. More session transcripts will improve alignment. |

No existing Qiskit notebooks, reference website URL, research/survey papers or GitHub repository configuration were found in this resource directory. The sample website mentioned in the earlier conversation has not been supplied.

## Scalable chapter sequence

1. Orientation and prerequisites: vectors, complex arithmetic, probability, Python and ML refresher.
2. States and measurement: amplitudes, phase, Born rule, Bloch sphere.
3. Gates and circuits: unitary operations, interference, wire and ket conventions.
4. Composite systems: tensor products, partial measurement, entanglement.
5. Query algorithms: reversible oracles, phase kickback, Deutsch, Deutsch–Jozsa, Simon and GF(2).
6. Classical ML bridge: data splits, loss, optimization, generalization and baselines.
7. Features and kernels: feature maps, Gram matrices, SVMs, quantum overlap kernels.
8. Variational classifiers: basis/amplitude/angle encoding, ansatz, observables, parameter shift and training.
9. Evaluation: finite shots, noise, trainability, resource accounting and qualified advantage claims.

The initial four lessons are draft exemplars across this sequence, not evidence that intervening chapters are complete. Navigation identifies the classifier as part 04; a full chapter and prerequisite navigation system can replace the small initial lesson list as content grows.

## Lesson contract

Every lesson should include a stable ID, prerequisites, learning outcomes, source filename plus page range or transcript timestamp, an explanation, a worked example, a prediction prompt, an accessible interaction, a misconception takeaway, a quiz with rationale for each option, a Colab notebook where programming helps, exercises with hints/solutions, and an editorial status.

The initial JSON schema implements the core of this contract; prerequisite metadata, per-option rationales and multi-section chapter navigation are next additions. Keep reusable labs in `site/assets/`, author-controlled lesson content in `content/`, canonical code in `notebooks/`, and source provenance in `docs/`. For a much larger course, move prose into Markdown with math rendering while retaining stable lesson IDs and the interaction APIs.

## Next work in order

- Instructor review of the four drafts, mathematical notation and source-page alignment.
- Full mathematical and accessibility audit of both imported HTML companions.
- Complete query algorithms and classical ML chapters; add notebooks and problems.
- Extend the toy classifier to a two-qubit experiment and add a fair classical benchmark.
- Add kernel/noise/trainability modules once corresponding sources arrive.
- Adopt instructor-selected licensing, contributor guidance and review requirements; deploy to the selected repository.
