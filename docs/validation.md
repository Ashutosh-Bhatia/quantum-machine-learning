# Validation — 27 October 2026

Passed:
- Static build: 4 lesson files, 4 quizzes, 3 canonical notebooks copied into the site.
- JavaScript syntax check.
- All notebook code cells executed locally in a clean environment, excluding Colab's dependency-install magic. Dependencies installed separately with the same constraints.
- Validated versions: Qiskit 2.6.1, NumPy 2.5.4, Matplotlib 3.11.2; local Python 3.13. Tests include exact Born probabilities, HZH, phase interference, Bell amplitudes, bit order, reduced density matrix, Bell-vs-mixture X measurements, parameter-shift/finite-difference agreement and decreasing training loss.
- Seeded toy classifier: held-out accuracy 1.0; classical threshold baseline also 1.0. This is a deliberately easy synthetic task, not an advantage result.
- Browser: lesson renders, navigation works, correct quiz answer displays explanation, progress persists through reload, changing φ=0→π leaves Z probability at 0.5 and changes X+ from 1 to 0. Classifier x=0,w≈π shows P(1)=1 and Z expectation −1.
- Local HTTP preview returned 200. Desktop screenshot inspected.
- Resource scan reports no changes immediately after initial inventory.

Re-run build with `python3 scripts/build.py`. Re-run notebook calculations after installing dependencies with `python3 scripts/check_notebooks.py`.

Not yet verified: Google Colab execution itself, mobile browser layout, all imported animation mathematics/interactions, complete PDF diagram fidelity, full live browser interaction audit. Package ranges can resolve to later versions; the tested versions above provide a reproducibility reference.

Qiskit reference: [Statevector implementation and API](https://github.com/Qiskit/qiskit/blob/main/qiskit/quantum_info/states/statevector.py). No deprecated execute/Aer-provider APIs are used.

## Publication

Repository created and source pushed on 27 October 2026. GitHub Pages configured to publish main from the root; deployment initiated. The inactive Actions template is stored in templates/ because the current OAuth token lacks workflow scope. Colab links now point directly to the repository.
