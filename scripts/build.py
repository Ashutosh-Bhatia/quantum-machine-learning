"""Build authored pages and lessons into a self-contained static book."""
from pathlib import Path
import json, shutil, re
ROOT=Path(__file__).resolve().parents[1]
CONTENT=(ROOT/'content').resolve()
course=json.loads((CONTENT/'course.json').read_text())
def prepare(page):
    page=dict(page)
    if 'body_file' in page:
        path=(CONTENT/page['body_file']).resolve()
        assert path.is_relative_to(CONTENT)
        page['body']=path.read_text()
    assert page.get('id') and page.get('title') and page.get('body')
    quizzes=page.get('quizzes',[page['quiz']] if 'quiz' in page else [])
    for quiz in quizzes:
        assert quiz['answer'] in range(len(quiz['options']))
        if 'feedback' in quiz:assert len(quiz['feedback'])==len(quiz['options'])
    placeholders=re.findall(r'data-quiz="([^"]+)"',page['body'])
    if 'quizzes' in page:assert sorted(placeholders)==sorted(q['id'] for q in quizzes),page['id']
    else:assert not placeholders,page['id']
    if page.get('notebook'):assert (ROOT/'notebooks'/page['notebook']).is_file()
    for image in re.findall(r'<img[^>]+src="([^"]+)"',page['body']):
        assert (ROOT/'site'/image).is_file(),image
    return page
def load(slug):
    page=prepare(json.loads((CONTENT/f'lessons/{slug}.json').read_text()))
    assert page['id']==slug
    return page
lessons=[load(slug) for slug in course['lessons']]
legacy=[load(slug) for slug in course.get('legacy_lessons',[])]
preface=prepare(course['preface'])
chapters=[prepare(ch) for ch in course['chapters']]
pages=[preface,*chapters,*lessons]
ids=[p['id'] for p in pages+legacy]
assert len(ids)==len(set(ids))
assert len(course['reading_order'])==len(set(course['reading_order']))
assert set(course['reading_order'])=={p['id'] for p in pages}
quiz_ids=[q['id'] for p in pages for q in p.get('quizzes',[])]
assert len(quiz_ids)==len(set(quiz_ids))
for chapter in chapters:
    assert all(slug in course['lessons'] for slug in chapter.get('lessons',[]))
for lesson in lessons:
    assert any(ch['id']==lesson['chapter_id'] and lesson['id'] in ch['lessons'] for ch in chapters)
for page in pages:
    for href in re.findall(r'href="#([^"]+)"',page['body']):
        assert href.split('/')[0] in ids,href
shutil.copytree(ROOT/'notebooks',ROOT/'site/notebooks',dirs_exist_ok=True,ignore=shutil.ignore_patterns('Icon*'))
data={'title':course['title'],'preface':preface,'chapters':chapters,'readingOrder':course['reading_order'],'lessons':lessons,'legacyLessons':legacy,'planned':course['planned']}
(ROOT/'site/course-data.js').write_text('window.COURSE = '+json.dumps(data,ensure_ascii=False)+';\n')
(ROOT/'site/.nojekyll').touch()
print(f'Built Preface, {len(chapters)} chapters, {len(lessons)} full lessons, {len(quiz_ids)} concept checks and {len(legacy)} archived prototypes.')
