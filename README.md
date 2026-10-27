# Interactive Quantum Machine Learning

An initial, instructor-reviewable course based on Dr. Ashutosh Bhatia's AIML ZG545 material. Four draft lessons, two new interactive explorers, four feedback quizzes, three Qiskit notebooks, and two retained HTML animations.

## Preview

Python 3 is the only site-build dependency:

```sh
python3 scripts/build.py
python3 -m http.server 8000 --directory site
```

Open http://localhost:8000. Download notebooks from a lesson and upload them through Google Colab's File → Upload notebook menu. Each notebook installs its Python dependencies in its first code cell. No IBM account is needed.

## Structure

- `content/course.json`: ordered lesson IDs and future chapters.
- `content/lessons/*.json`: objectives, authored HTML, source references, quiz, exercise and notebook mapping. Trusted editor content only; do not insert untrusted HTML.
- `notebooks/`: canonical notebooks, copied into the public site by the build.
- `site/assets/`: responsive styling and browser interactions.
- `site/animations/`: supplied animations, preserved as standalone labs.
- `scripts/build.py`: deterministic static build, with no external dependencies.
- `scripts/inventory.py`: compare new local resources against the recorded inventory.
- `docs/`: resource audit, editorial plan, deployment steps and validation.
- `templates/pages-workflow.yml`: optional Actions workflow for future use once workflow permissions are available.

Source PDFs and the classroom transcript stay in the original local resource directory. The transcript contains participant names; it is not part of this repository or deployment. Only `site/` is uploaded by the workflow.

## Add material as it arrives

1. Keep adding slides, transcripts, problems and references to the original resource folders.
2. Run `python3 scripts/inventory.py "/absolute/path/to/Quantum Machine Learning"`. This reports additions/changes/removals without changing existing files. Use `--update` to accept the new inventory after reviewing it.
3. Map new material to learning outcomes using `docs/content-plan.md`. Transcripts guide explanation and pacing; verify formulas against slides and authoritative references.
4. Add or edit lesson JSON and notebooks. Add new lesson IDs to `content/course.json`.
5. Build, review the local page, run changed notebooks, then commit and push. GitHub Pages publishes the committed website automatically after each push.

Adding a source file does not automatically create reviewed course prose. This editorial step prevents accidental publication of incomplete material or classroom conversation.

## Current limits

This is an initial implementation, not a completed course. Lessons and imported labs need instructor review. Quizzes are learning aids with browser-local progress; they are not secure graded assessments. Direct Colab links point to Ashutosh-Bhatia/quantum-machine-learning. See `docs/deployment.md`.
