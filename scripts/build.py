"""Build reviewed content into a portable static GitHub Pages site."""
from pathlib import Path
import json, shutil, html
ROOT=Path(__file__).resolve().parents[1]
course=json.loads((ROOT/'content/course.json').read_text())
lessons=[json.loads((ROOT/f'content/lessons/{slug}.json').read_text()) for slug in course['lessons']]
for l in lessons:
 assert l['id'] and l['quiz']['answer'] in range(len(l['quiz']['options']))
 assert (ROOT/'notebooks'/l['notebook']).exists(), l['notebook']
shutil.copytree(ROOT/'notebooks',ROOT/'site/notebooks',dirs_exist_ok=True)
(ROOT/'site/course-data.js').write_text('window.COURSE = '+json.dumps({'lessons':lessons,'planned':course['planned']},ensure_ascii=False)+';\n')
(ROOT/'site/.nojekyll').touch()
print(f'Built {len(lessons)} lessons and {len(list((ROOT/"notebooks").glob("*.ipynb")))} notebooks.')
