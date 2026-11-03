import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { brandonCustomHomes as page, brandonCustomHomesSchema as schema } from '../src/content/brandonCustomHomes.js';

const source = fs.readFileSync(new URL('../src/pages/LandingBrandonCustomHomeBuilder.jsx', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../src/pages/brandon-custom-homes.css', import.meta.url), 'utf8');

test('retains the existing Brandon URL and category heading', () => {
  assert.equal(page.canonical, 'https://bradleybrowninc.com/custom-home-builder-brandon-ms');
  assert.equal(page.h1, 'Custom Home Builder in Brandon, MS');
  assert.ok(page.title.length <= 60);
  assert.ok(page.description.length <= 160);
  assert.equal((source.match(/<h1\b/g) || []).length, 1);
});

test('answers the service and supported region directly', () => {
  assert.match(page.opening, /^Bradley Brown Inc\. builds personalized custom homes and new-construction homes in Brandon, Rankin County, and Central Mississippi\./);
  assert.match(page.opening, /request an estimate/);
  assert.equal(schema['@graph'].find(n => n['@type'] === 'Service').areaServed, 'Brandon, Rankin County, and Central Mississippi');
});

test('uses only the two selected published portfolio examples', () => {
  assert.equal(page.projects.length, 2);
  assert.deepEqual(page.projects.map(p => [p.title, p.location, p.year, p.squareFeet]), [
    ['Custom Home Build', 'Brandon, MS', 2018, 2800],
    ['Custom Home Remodel and Addition', 'Brandon, MS', 2024, 3750]
  ]);
  page.projects.forEach(p => assert.equal(p.source, 'https://bradleybrowninc.com/portfolio'));
  assert.match(page.projects[0].description, /kitchen opening to a grand living room/);
  assert.match(page.projects[1].description, /existing home, not new construction/);
  assert.match(page.projects[1].type, /not a new-home build/);
});

test('does not treat stock or placeholder data as project evidence', () => {
  const published = JSON.stringify(page);
  ['unsplash', 'County Custom Built', 'Office Addition', 'Outdoor Oasis'].forEach(x => assert.ok(!published.includes(x)));
  assert.ok(!source.includes('placeholderProjects'));
  assert.ok(!source.includes('usePageImages'));
});

test('four factual FAQs create exactly one matching FAQPage', () => {
  const parsed = JSON.parse(JSON.stringify(schema));
  assert.equal(parsed['@context'], 'https://schema.org');
  const nodes = parsed['@graph'].filter(n => n['@type'] === 'FAQPage');
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0]['@id'], page.canonical + '#faq');
  assert.equal(nodes[0].mainEntity.length, 4);
  assert.equal(new Set(page.faqs.map(f => f.question)).size, 4);
  nodes[0].mainEntity.forEach((f, i) => {
    assert.equal(f['@type'], 'Question');
    assert.equal(f.name, page.faqs[i].question);
    assert.equal(f.acceptedAnswer['@type'], 'Answer');
    assert.equal(f.acceptedAnswer.text, page.faqs[i].answer);
    assert.ok(f.name.length > 0 && f.acceptedAnswer.text.length > 0);
  });
});

test('FAQ answers are always rendered from the same content source', () => {
  assert.match(source, /page\.faqs\.map/);
  assert.match(source, /<h3>\{question\}<\/h3>/);
  assert.match(source, /<p>\{answer\}<\/p>/);
  assert.ok(!source.includes('LandingFAQ'));
  assert.ok(!source.includes('useState'));
  assert.ok(!source.includes('<details'));
});

test('omits unsupported pricing, deadlines, Madison and process promises', () => {
  const copy = JSON.stringify(page);
  ['Madison', 'since 2005', '20+', 'licensed', 'insured', 'bonded', 'fixed written', '3D render', 'maintenance guide', 'on time', 'on budget', '500+'].forEach(x => assert.ok(!copy.toLowerCase().includes(x.toLowerCase()), x));
  assert.ok(!/\$\d|\d+\s*(?:months|weeks|days)/.test(copy));
  assert.ok(!source.includes('CustomHomeProcess'));
  assert.ok(!source.includes('BrandonReviewSection'));
  assert.ok(!JSON.stringify(schema).includes('priceRange'));
  assert.ok(!JSON.stringify(schema).includes('GeoCoordinates'));
});

test('preserves phone tracking, existing bottom conversion handler, and estimate route', () => {
  assert.match(source, /eventName: "phone_click"/);
  assert.match(source, /source: "brandon_custom_home_landing"/);
  assert.match(source, /onClick=\{handleCall\}/);
  assert.match(source, /<LandingCTABar headline=/);
  assert.match(source, /<StickyCallButton \/>/);
  assert.match(source, /to="\/estimate"/);
  assert.match(source, /to="\/reviews"/);
});

test('keeps source-linked review navigation without unverified review claims', () => {
  assert.match(source, /Customer reviews/);
  assert.match(source, /Remodeling feedback should not be treated as a new-home project description/);
  assert.ok(!JSON.stringify(schema).includes('AggregateRating'));
});

test('applies confirmed page-scoped brand and flexible mobile styles', () => {
  ['#003D82', '#002855', '#0066CC', "'Montserrat'", "'Open Sans'", 'focus-visible', 'overflow-wrap: anywhere', 'minmax(0, 1fr)', 'flex-direction: column'].forEach(x => assert.ok(css.includes(x), x));
  assert.ok(!/\{[^{}]*min-width:\s*\d{3,}px/.test(css));
});
