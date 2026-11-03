# Part B teaching and verification review

## Scope

Strengthen Chapters 10–12 before Part C. Preserve existing lesson/quiz IDs, the white academic layout, source-image captions and both SVM activities. Chapter 9 remains deferred.

## Source alignment

Rechecked the Lecture 9 page-labelled text against the published sequence and revisited relevant passages in personal transcripts 12, 11 and the mixed-speaker practical transcript 10. Preserve data → model → cost → gradient → update and the distinction between fitting samples and learning a generalizable relationship. The new wearable-sensor chapter challenge follows the transcript's concern about new-subject evaluation without reproducing classroom dialogue or individual student details.

Lecture 9 mapping:
- Slides 3–7: 10.1–10.2 and 11.1, representation/objective/linear-model flow.
- Slides 8–13: 11.2, activations, hidden layers, matrix representation and chain rule. Added a numerical one-hidden-unit backward calculation and an original activation-curves figure. A sigmoid applied to an affine score alone retains a linear binary boundary; nonlinear hidden representations provide the XOR construction.
- Slides 14–18: 12.2, margin, primal/dual and support vectors. Preserve extracted slide 18 figure and supplied classroom animation; clarify soft-margin optimality and nonunique dual representations.
- Slides 19–27: 12.1–12.2, feature lifts, explicit polynomial map, Gram matrix, PSD and prediction. Preserve slide 19/24 images; add slide 25's three-vector numerical matrix and an original paired input/matrix figure. The PSD norm identity is given explicitly.
- Slides 28–34: 12.3, the QML bridge and which components change. Keep predictive evidence separate from quantum computational advantage.

Do not copy source transcription errors or broad claims about arbitrary activations/automatic advantage. Probability calibration, test-set isolation and precise SVM interpretation remain explicit. Official scikit-learn common-pitfalls and SVM pages were checked during this review.

## Reading experience

- Replace generic objectives in all nine lessons with concrete skills.
- Add prediction, investigation and expandable interpretation around each main experiment.
- Add a six-point SVM observation protocol that distinguishes dual feasibility from optimized fitting.
- Add nine application quizzes with targeted feedback and preserve all earlier quiz IDs.
- Add chapter handoffs and cumulative challenges with answer criteria and direct Colab links.
- Add three original vector figures: evaluation roles, activation curves and the worked Gram matrix; retain all existing course/slides figures and captions.

## Notebook changes

10: prediction prompts, held-out fit/residual plots and explicit confusion-count interpretation.
11: training/CV curves across degree and penalty, independent finite differences for the worked backpropagation calculation, exact first-step regression loss check.
12: distinguish one symmetric dual optimum from nonunique solver output; independently reproduce six-point classroom fitting before/after P1 movement, checking equality, zero slack, finite-C inactivity and separating width; plot canonical margin lines and support vectors.

These Part B notebooks use NumPy/scikit-learn. Qiskit circuit implementation belongs in Part C; the state-feature example here remains explicitly analytic.

## Verification

Build and book checks: 49 lessons, 115 concept checks, 516 math expressions and 75 embedded figures. ML/SVM checks passed. All 14 notebooks executed with no errors in the existing local environment; plots use a noninteractive backend in the checker, hence the expected display warnings. Local browser checks cover the rendered new math/figures, expanded interpretation, XOR input response and application-quiz feedback. Publication is to the existing GitHub Pages site.
