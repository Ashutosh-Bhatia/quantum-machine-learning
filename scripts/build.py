"""Build authored lessons into a self-contained static GitHub Pages site."""
from pathlib import Path
import json, shutil, re
ROOT=Path(__file__).resolve().parents[1]
course=json.loads((ROOT/'content/course.json').read_text())
def load(slug):
    lesson=json.loads((ROOT/f'content/lessons/{slug}.json').read_text())
    assert lesson['id']==slug
    if 'body_file' in lesson:
        path=(ROOT/'content'/lesson['body_file']).resolve()
        assert path.is_relative_to((ROOT/'content').resolve())
        lesson['body']=path.read_text()
    quizzes=lesson.get('quizzes',[lesson['quiz']] if 'quiz' in lesson else [])
    for quiz in quizzes:
        assert quiz['answer'] in range(len(quiz['options']))
        if 'feedback' in quiz: assert len(quiz['feedback'])==len(quiz['options'])
    placeholders=re.findall(r'data-quiz="([^"]+)"',lesson['body'])
    if 'quizzes' in lesson: assert sorted(placeholders)==sorted(q['id'] for q in quizzes),slug
    assert (ROOT/'notebooks'/lesson['notebook']).exists(),lesson['notebook']
    for image in re.findall(r'<img[^>]+src="([^"]+)"',lesson['body']):
        assert (ROOT/'site'/image).is_file(),image
    return lesson
lessons=[load(slug) for slug in course['lessons']]
legacy=[load(slug) for slug in course.get('legacy_lessons',[])]
chapter={**course['chapter']}
chapter['body']=(ROOT/'content'/chapter['body_file']).read_text()
ids=[l['id'] for l in lessons+legacy]
assert len(ids)==len(set(ids))
shutil.copytree(ROOT/'notebooks',ROOT/'site/notebooks',dirs_exist_ok=True)
data={'title':course['title'],'chapter':chapter,'lessons':lessons,'legacyLessons':legacy,'planned':course['planned']}
(ROOT/'site/course-data.js').write_text('window.COURSE = '+json.dumps(data,ensure_ascii=False)+';\n')
(ROOT/'site/.nojekyll').touch()
print(f'Built chapter overview, {len(lessons)} full lessons, {len(legacy)} archived prototypes and {len(list((ROOT/"notebooks").glob("*.ipynb")))} notebooks.')
