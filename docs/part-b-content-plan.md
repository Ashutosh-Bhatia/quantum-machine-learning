# Part B content and component plan

## Purpose and scope

Provide the classical learning concepts needed to reason about variational models and quantum kernels, without claiming to replace a complete ML curriculum. Preserve the instructor's data–model–cost–optimization framing. Chapter 9 is deferred; retain its number and begin Part B at Chapter 10. No quantum-noise prerequisite is required here.

## Flow and coverage

| Chapter | Reading sequence | Main source material | Interactive support |
|---|---|---|---|
| 10 From Data to Learning | features/tasks → loss/training → generalization/evaluation | Classical ML Foundation slides; transcript 12, generalization discussion in 11 | image-to-vector editor; slope/intercept error plot; threshold/confusion metrics |
| 11 Classical Models and Training | regression → logistic/neural representations → optimization/regularization | Classical ML Models slides; transcripts 11 and 10 demonstration | gradient stepper; sigmoid score controls; analytic regularization tradeoff |
| 12 Feature Maps, Kernels and the QML Bridge | explicit features → margins/SVM/kernel form → fair model comparison | Models slides; kernel discussion in transcripts 10/11; transcript 9 and classifier slides for transition | explicit polynomial-map equality; margin/RBF formula explorer; ideal Ry fidelity-kernel explorer |

All nine lessons contain lecture-note prose, equations where useful, a worked calculation, a captioned original editable SVG, an interactive calculation, two concept checks, two practice questions with hints and worked solutions, and a chapter Colab link. Eighteen new quiz IDs preserve existing browser progress. Part B has a separate collapsible navigation group.

## Pedagogical decisions

- Distinguish features, labels, parameters and hyperparameters.
- Introduce task categories briefly; concentrate programming on supervised regression/classification.
- Include cross-entropy, stable sigmoid/logit interpretation, nonlinear activations and chain-rule backpropagation conceptually; do not suggest a sigmoid display trains a neural network.
- Fit preprocessing only inside training partitions/folds. Discuss grouped and temporal data rather than prescribing a universal random split.
- Separate metrics and thresholds, bias/variance definitions, regularization conventions, and undefined precision from zero.
- Explain both primal margin and kernel dual. State PSD requirements and the polynomial map's sqrt(2) cross term.
- Link QML through explicit prediction/overlap definitions and fair complete-resource comparisons, without implying high dimension proves advantage.

## Notebook contracts

10: fixed synthetic regression, fitted-training scaler, dummy baseline, held-out metrics and threshold tradeoffs.
11: hand-coded simultaneous gradient updates checked against least squares; hand-derived XOR representation; predeclared small MLP classifier; polynomial/Ridge model selection entirely within CV.
12: explicit-map kernel identity and Gram PSD; analytic product-Ry fidelity kernel; dummy/linear/RBF/state-kernel comparison on identical features and partitions. State differing search budgets. No hardware or dataset-service dependency.

## Sources and gap filling

Primary sources: resources/Lecture Slides/Lecture 8 Classical ML Foundation.pdf; Lecture 9 Classical ML Models.pdf. Personal transcripts numbered 12 (foundations), 11 (models/generalization), 10 (practical demonstrations with a second speaker), 9 (QML transition). Earlier source inspection established topics and teaching examples; the notes paraphrase the teaching logic rather than publish classroom dialogue.

Fill gaps with precise split/preprocessing protocol, logistic loss/threshold distinction, numerical least squares, penalty-scaling caveats, kernel PSD and reproducibility controls. Official scikit-learn pipeline/common-pitfalls and SVM documentation support programming practice. Do not copy unverified transcript mathematics or equate generative learning with regression.

## Validation and future extensions

Independent finite-difference checks verify the browser gradient; gradient descent is checked against the known solution. Test threshold undefined denominators, sigmoid extremes, polynomial feature identities and Ry overlap. Execute all notebooks, build all math, validate routes/quiz counts/figure references, and inspect browser activity and Part B navigation before publication.

Dedicated treatment of trees/ensembles, unsupervised learning, generative models and reinforcement learning is optional future depth, not an undocumented prerequisite for the QML bridge. Formal statistical learning theory and broader benchmarking can likewise expand later.
