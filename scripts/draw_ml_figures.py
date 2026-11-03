"""Regenerate the original Part B concept figures."""
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).with_name("draw_ml_concept_figures.py")),run_name="__main__")
