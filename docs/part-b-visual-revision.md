# Part B concept-visual revision

Reviewed Lecture 9 Classical ML Models page by page and inspected rendered slides and embedded image assets. Search across resource filenames and both HTML animations found no SVM adjustable-alpha animation. Only quantum animations are present; do not imply that the original SVM animation was recovered.

## Image placement

- Slide 18 embedded PNG → Lesson 12.2: input-space separator/margin illustration, caption credits supplied Lecture 9 slide 18.
- Slide 19 embedded PNG → Lesson 12.1: concentric input classes and lifted separating geometry, caption credits slide 19. The prose and live map use z=c−r², consistent with slide 20's formula.
- Slide 24 embedded PNG → Lesson 12.1: sample-pair to Gram-entry picture, caption credits slide 24.
- Slides 10/13 contain vector network diagrams, not an extractable standalone network bitmap (the embedded JPEG is the institutional logo). Draw an original editable network diagram and a live XOR representation instead of extracting the logo.
- Replace all nine former generic box-sequence SVGs with actual concept plots: pixel vectorization, residual/loss, generalization curve, regression fit, network, shrinkage, lifted rings, support-vector margin and kernel heatmap. The training/validation curve is explicitly illustrative.

## New interactions

12.2: a four-point SVM dual explorer, linked alpha pairs maintaining the equality constraint, C=1 bounds, rotated boundary, functional margin lines, alpha rings, primal/dual objectives and gap. Animated ascent moves within this two-parameter feasible family to its symmetric optimum. Bias is separate. Do not label arbitrary hand-adjusted coefficients an optimized classifier. The full dual can have nonunique optima; the displayed symmetric optimum is one valid solution.

12.1: input rings and a continuously projected feature lift; threshold controls show the sign-rule separation.

11.2: visible hidden activations in a fixed ReLU XOR network, including signed output weights. Distinguish a score from a calibrated probability and a specified network from a trained one.

11.3: polynomial degree/regularization controls fit fixed noisy observations, compare fitted curve with known sine reference, and display training/reference errors. Reference data are a teaching diagnostic, not an repeatedly queried real test set. Link this experiment from 10.3.

Chapter 9 remains deferred, consistent with the user's earlier instruction. Lecture 9 is a source deck, not a request to restore the deferred quantum-noise chapter.

## Validation

Numerical checks reconstruct normals from dual sums, verify feasibility, nonnegative gap and known optimum across a parameter grid, and solve polynomial models across degrees/penalties. Notebook checks compare an independently fitted scikit-learn SVM normal/margins and a symmetric dual solution. Build checks validate math, routes and image references. Browser checks exercise all four new activities and the alpha animation.
