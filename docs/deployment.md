# GitHub Pages deployment

Repository: https://github.com/Ashutosh-Bhatia/quantum-machine-learning

Website: https://ashutosh-bhatia.github.io/quantum-machine-learning/

## Current setup: built-in branch publishing

GitHub Pages publishes `main` from the repository root. Root `index.html` forwards to the generated course in `site/`. A root `.nojekyll` disables Jekyll processing. All content uses relative links and supports the repository URL prefix.

After editing lessons or notebooks, run `python3 scripts/build.py`, review the site, commit all changed source and generated website files, and push to main. GitHub then publishes the committed website automatically. GitHub cannot watch resource folders on your laptop; adding new source PDFs does not automatically author lessons.

Direct Colab links are configured for this repository. Source PDFs and the classroom transcript are excluded from the repository.

## Optional future setup: build on GitHub

The initial upload was rejected because the current GitHub OAuth sign-in lacks the `workflow` permission. The proposed Actions workflow is retained at `templates/pages-workflow.yml` as an inactive template.

Once workflow access is available, move it to `.github/workflows/pages.yml`, select GitHub Actions in Settings → Pages, and push. It will build lesson JSON on GitHub, upload only `site/`, and deploy the course directly at the root Pages URL. At that point the committed build can be omitted in favor of the workflow.

Reference: [GitHub Pages publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
