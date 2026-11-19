import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { bathroomRemodelingPage as page } from '../src/content/bathroomRemodelingPage.js';

const pageSource = fs.readFileSync(new URL('../src/pages/services/BathroomRemodeling.jsx', import.meta.url), 'utf8');
const layoutSource = fs.readFileSync(new URL('../src/components/services/ServicePageLayout.jsx', import.meta.url), 'utf8');

test('retains the existing URL, title and category heading', () => {
  assert.equal(page.canonical, 'https://bradleybrowninc.com/services/bathroom-remodeling');
  assert.equal(page.h1, 'Bathroom Remodeling in Brandon, MS');
  assert.equal(page.title, 'Bathroom Remodeling in Brandon, MS | Bradley Brown Inc');
  assert.ok(page.title.length <= 60);
  assert.ok(page.description.length <= 160, `description is ${page.description.length} chars`);
  assert.match(page.description, /Brandon, MS/);
});

test('opens with a direct answer to the target query and a next step', () => {
  assert.match(page.opening, /^Bradley Brown Inc\. remodels bathrooms for homeowners in Brandon, MS and Central Mississippi\./);
  assert.match(page.opening, /request a bathroom-remodel estimate/);
  assert.ok(page.opening.split(/\s+/).length <= 80);
});

test('links to the existing /estimate path in context', () => {
  assert.equal(page.openingCta.to, '/estimate');
  const sectionEstimateLinks = page.sections.flatMap(s => s.links || []).filter(l => l.to === '/estimate');
  assert.ok(sectionEstimateLinks.length >= 1);
  const allLinks = [page.openingCta, ...page.sections.flatMap(s => s.links || [])];
  allLinks.forEach(l => assert.ok(['/estimate', '/portfolio'].includes(l.to), `unexpected link ${l.to}`));
  assert.match(pageSource, /answerFirstCta=\{page\.openingCta\}/);
});

test('does not carry unsupported pricing, timeline, proof, credential or process claims', () => {
  const published = JSON.stringify(page);
  const banned = [
    /20\s*years/i, /20\+/, /since 2005/i, /hundreds/i, /\b500\+/, /\b200\+/,
    /2\s*[–-]\s*4\s*weeks/i, /\$\s?\d/, /60\s*[–-]\s*80/, /highest-ROI/i, /\bROI\b/,
    /licensed/i, /insured/i, /permits (&|and) inspections handled/i, /on staff/i,
    /waterproof/i, /no leaks/i, /guarantee/i, /fixed (written )?price/i, /bulletproof/i,
    /5\.0/, /David K\./, /Flowood/, /within 24 hours/i, /free in-home/i, /dedicated project manager/i,
  ];
  banned.forEach(rx => assert.ok(!rx.test(published), `unsupported claim matched ${rx}`));
  assert.deepEqual(page.sections.flatMap(s => s.links || []).filter(l => !l.to.startsWith('/')), []);
});

test('uses only the two portfolio records as project evidence', () => {
  assert.deepEqual(page.projects.map(p => [p.title, p.location, p.year, p.squareFeet]), [
    ['Pelahatchie Master Bath Remodel', 'Pelahatchie, MS', 2024, 400],
    ['Custom Home Remodel and Addition', 'Brandon, MS', 2024, 3750],
  ]);
  page.projects.forEach(p => assert.equal(p.source, 'https://bradleybrowninc.com/portfolio'));
  assert.match(page.projects[0].description, /new walk-in shower and freestanding tub/i);
  assert.match(page.projects[1].description, /kitchen and bathrooms were completely gutted/);
  assert.equal(page.images.length, 2);
  page.images.forEach(i => {
    assert.ok(i.alt.length > 20 && i.caption);
    assert.ok(!/unsplash/i.test(i.url));
  });
});

test('the page component uses the verified content and drops unverified modules', () => {
  assert.match(pageSource, /features=\{\[\]\}/);
  assert.match(pageSource, /testimonials=\{\[\]\}/);
  assert.match(pageSource, /showTrustBar=\{false\}/);
  assert.ok(!/serviceAnswerFirstContent/.test(pageSource));
});

test('shared layout changes are optional and keep other service pages unchanged by default', () => {
  assert.match(layoutSource, /showTrustBar = true/);
  assert.match(layoutSource, /\{ctaBody \|\| "Join 500\+ Mississippi homeowners/);
  assert.match(layoutSource, /answerFirstCta &&/);
  assert.match(layoutSource, /section\.links && section\.links\.length > 0/);
});

test('FAQs are bathroom-specific, answer cost without a number, and keep one H1 source', () => {
  assert.ok(page.faqs.length >= 4);
  const cost = page.faqs.find(f => /cost/i.test(f.question));
  assert.ok(cost && !/\d/.test(cost.answer.replace('(844) 351-4154', '')));
  assert.equal((layoutSource.match(/<h1\b/g) || []).length, 1);
});
