// data/site.mjs: the single source of every word and fact on the Mondweep Chakravorty site.
// Written by writer.mondweep-chakravorty@AgentiCCells.dinis on 2026-11-18 from research/facts.json
// and research/sources.md (both read 2026-11-18). No imports. Every page and every design is generated from this file.
//
// Conventions
// - Every factual sentence is an object { text, src } where src is an array of ids in SOURCES.
// - Each SOURCES id maps to the facts in research/facts.json it backs (field `facts`), so the reviewer can check.
// - Prices are numbers in GBP excluding VAT, exactly as ruv.sgit.ai publishes them; `priceText` is how to print them.
// - People named: Mondweep Chakravorty, Dinis Cruz and rUv only. Organisations only as the sources name them.
// - The long bio in ruv.sgit.ai/data/providers.json (facts F09 to F12 and F14) is used in CAREER, HOME.career
//   and the /experience/ page, worded as that source gives it and cited to 'providers-data'. Dinis Cruz cleared
//   it for this site on 2026-11-18 at about 10:50 UTC ("Yes the site can use that longer bio from ruv.sgit",
//   team/WORKFLOW.md). F13 (the "vibe-cast" lab) and F15 (his own links) are NOT cleared and are not used.
// - `src: []` marks a sentence that comes from the team's own record (Dinis Cruz's words in team/WORKFLOW.md,
//   or the team/ files), not from a public source. Such sentences say where they come from in their words.
// - `labelOurs: true` (or a comment) marks framing that is this site's, not a source's: a heading, a grouping.
//
// Round 2 exports and fields (writer, 2026-11-18, for team/rounds/2/design/PROPOSAL.md):
// - PHOTO: { src, alt, width, height, credit }: the one headshot of him the site may use (Dinis Cruz,
//   about 10:46 UTC, team/WORKFLOW.md). Never shown above 200 CSS px.
// - HOME.hero: { eyebrow, line, lede } (each { text, src }) and actions [{ label, href, style }] for the
//   first screen (change 1). HOME.numbers: [{ value, label, text, src }], four sourced numbers (change 1).
// - POC.resultsNote { text, src } and POC.phasesNote: what is this site's reading in the run figure.
// - HOME.career: { kicker, heading, headingPlain, summary [{ text, src }], href, linkText } for the Career band and the
//   designs (changes 3 and 5). HOME.pullQuote: { text, by, cite, src }, Dinis Cruz's words only (change 3).
// - WORK: the "Work with him" block (change 4a): { heading, projectsHeading, projects, projectsSrc,
//   offersHeading, offers [{ group, line, status, src }], enquire { heading, email, label, subject,
//   providerLabel, providerPage }, nextHeading, next [{ text, src }], disclaimer }.
// - COLLAB.strip: the collaboration timeline strip for /collaboration/, 15 to 21 October 2026 (change 4b):
//   [{ date, dateText, items [{ text, src }] }], 16 to 21 October (the talk stays once on the page).
// - CAREER: the /experience/ career page (change 5), structure:
//   { kicker, heading, intro { text, src }, pathLabel,
//     path: [{ label, labelOurs?, orgs [string], text, src }]  ordered stops in the source's order (First, Then,
//                                                   After the MBA are ours; Later, Since September 2024 the
//                                                   source's); only September 2024 is a date the source gives,
//     cards: [{ kicker, title, text, src }]         programme (Mentoring) and keynote,
//     specialisms: { heading, items [string], src } the seven items as listed,
//     sectors: { text, src }                        the existing sectors line (F06),
//     note: [{ text, src }]                         where the bio comes from and who cleared it,
//     summary: HOME.career.summary }                the two-line summary for the home and the designs.
// - DESIGN_IDEAS: { <design id>: string }, the one-line idea of each design for the pop-up and /d/ (change 10a).
// - MADE: { title, text [string], linksLead, links [{ label, href }] }, the "How this was made" note on /behind-the-scenes/
//   (change 10c); from team/ files, not a public source.
// - SOURCES['newsroom-index'] (new): the newsroom's articles index, for this site's own count (F145).
// - COLLAB.articlesNote.kind: 'count by this site' when the number is ours, not the source's.
//
// Fields added to the shape in the brief (all optional for the developer):
// - SOURCES.<id>.facts: the facts.json ids this source backs. SOURCES.<id>.note: caveats on how it was read.
// - PERSON.contact.subject: the email subject ruv.sgit.ai's own "Enquire to book" button uses.
// - PERSON.status: what he has and has not approved yet (for the footer or the Sources page).
// - HOME.actions: the two buttons on the home's first screen.
// - POC.steps[].at: the time in the video where the article places the step. The article gives a time for
//   all twelve steps (F111 to F122); these are times in his video, not clock times.
// - POC.vaultSteps / POC.gatedSteps / POC.cliSteps: which steps touch the vault, pass the policy gate, or use
//   Ruflo's command line, as two later newsroom articles say (sources 'vault' and 'policy-door').
// - POC.limits: what the run did not show, in its own and the newsroom's words.
// - POC.policyRows[].capability: the ABP capability name for each row, from the pull request article.
// - POC.quote: Dinis Cruz's words on the run.
// - PR.commits, PR.pageTitle, PR.acceptance, PR.capabilities, PR.quote.
// - COLLAB.talk: Dinis Cruz's talk of 15 October 2026, only as how the marketplace began (no TALK export).
// - PHASES: the four phases of the run (also POC.phases); POC.fingerprint.line and .steps.
// - COLLAB.offersNote, COLLAB.engagement, COLLAB.disclaimer, COLLAB.articles[].short and .titleNote.
// - PAGES: title and description per page, for <title>, meta description and link previews.

export const SITE = {
  url: 'https://mondweep-chakravorty.agenticcells.site',
  name: 'Mondweep Chakravorty',
  read: '2026-11-18',
  locale: 'en_GB',
  licence: { code: 'Apache-2.0', text: 'CC BY 4.0' },
};

export const SOURCES = {
  provider: {
    title: 'Mondweep Chakravorty, founding provider',
    url: 'https://ruv.sgit.ai/providers/mondweep-chakravorty.html',
    publisher: 'ruv.sgit.ai',
    date: null,
    read: '2026-11-18',
    facts: ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F20', 'F98', 'F99', 'F100', 'F101'],
  },
  'providers-data': {
    title: 'Providers data file',
    url: 'https://ruv.sgit.ai/data/providers.json',
    publisher: 'ruv.sgit.ai',
    date: '2026-10-21',
    read: '2026-11-18',
    facts: ['F08', 'F09', 'F10', 'F11', 'F12', 'F14', 'F16', 'F17', 'F18'],
    note: 'Used for his role on the marketplace, his consent to be listed, and his career, programme, keynote and specialisms from the long bio. The file marks the bio as drafted for him to approve; Dinis Cruz cleared it for this site on 18 November 2026. One line of the bio and his own links are not used.',
  },
  offers: {
    title: 'Offers data file',
    url: 'https://ruv.sgit.ai/data/offers.json',
    publisher: 'ruv.sgit.ai',
    date: '2026-10-15',
    read: '2026-11-18',
    facts: ['F21', 'F22', 'F23', 'F24', 'F26', 'F94', 'F95', 'F96', 'F97'],
  },
  types: {
    title: 'Project types data file',
    url: 'https://ruv.sgit.ai/data/project-types.json',
    publisher: 'ruv.sgit.ai',
    date: '2026-10-21',
    read: '2026-11-18',
    facts: ['F27'],
  },
  'ruv-home': {
    title: 'ruv.sgit.ai home page',
    url: 'https://ruv.sgit.ai/',
    publisher: 'ruv.sgit.ai',
    date: null,
    read: '2026-11-18',
    facts: ['F19', 'F25', 'F40', 'F102', 'F103', 'F104', 'F106'],
  },
  'llms-ruv': {
    title: 'ruv.sgit.ai llms.txt',
    url: 'https://ruv.sgit.ai/llms.txt',
    publisher: 'ruv.sgit.ai',
    date: null,
    read: '2026-11-18',
    facts: ['F07', 'F16', 'F19', 'F25', 'F40', 'F105'],
  },
  'next-phase': {
    title: 'Article No. 9: the next phase',
    url: 'https://ruv.sgit.ai/articles/next-phase.md',
    publisher: 'ruv.sgit.ai',
    date: '2026-10-21',
    read: '2026-11-18',
    facts: ['F17', 'F107'],
    note: 'Records the decision of 21 October 2026 to change "register interest" to "enquire to book" (research/sources.md 1.7).',
  },
  talk: {
    title: 'Agentic Engineering Live: the talk page',
    url: 'https://ruv.sgit.ai/talk/index.html',
    publisher: 'ruv.sgit.ai',
    date: null,
    read: '2026-11-18',
    facts: ['F41'],
    note: 'Agenda from the organisers\' welcome deck. The page does not name Mondweep.',
  },
  london: {
    title: 'Agentics London',
    url: 'https://london.agentics.org/',
    publisher: 'Agentics Foundation, London chapter',
    date: '2026-10-23',
    read: '2026-11-18',
    facts: ['F30', 'F31', 'F32', 'F33', 'F34', 'F35', 'F36'],
    note: 'The date is the page\'s "Last updated".',
  },
  ready: {
    title: 'Agentics, ready to sell: what we showed at Agentic Engineering Live, who else is selling agentic services and at what price, the engagement path, and a marketplace for the consultants who deliver it',
    url: 'https://newsroom.sgit.ai/articles/agentics-ready-to-sell.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-16',
    read: '2026-11-18',
    facts: ['F42', 'F80', 'F81', 'F82', 'F131'],
  },
  poc: {
    title: 'What if an agent loses its workspace? Mondweep Chakravorty\'s SGit × Ruflo proof of concept, step by step: memory saved encrypted, the project deleted, the memory back in a fresh process, and three safeguards that held',
    url: 'https://newsroom.sgit.ai/articles/what-if-an-agent-loses-its-workspace.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F50', 'F51', 'F52', 'F53', 'F54', 'F55', 'F56', 'F57', 'F58', 'F59', 'F60', 'F61', 'F62',
      'F108', 'F109', 'F110', 'F111', 'F112', 'F113', 'F114', 'F115', 'F116', 'F117', 'F118', 'F119', 'F120',
      'F121', 'F122', 'F123', 'F124', 'F133'],
    note: 'The step texts and times quote this article as recorded in research/sources.md 3.2.',
  },
  vault: {
    title: 'When is the vault actually used? In Mondweep Chakravorty\'s SGit × Ruflo run, the encrypted vault is written or read in three steps of twelve, on one machine, inside the adapter, and why that is the honest shape of a recovery copy',
    url: 'https://newsroom.sgit.ai/articles/when-is-the-vault-actually-used.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F63', 'F64', 'F125', 'F134'],
  },
  'policy-door': {
    title: 'The policy guards the door; the command line uses the window: in the SGit × Ruflo run, the ABP is compiled into Ruflo\'s own rules and enforced on the adapter\'s tools, while Ruflo\'s command line reaches the same memory file without it, as the author\'s own README says',
    url: 'https://newsroom.sgit.ai/articles/the-policy-guards-the-door.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F65', 'F126', 'F127', 'F132'],
  },
  'pr-article': {
    title: 'Our first PR in Ruflo: an ABP-governed SGit page, merged into ruvnet/ruflo, and the four pieces that got it there',
    url: 'https://newsroom.sgit.ai/articles/our-first-pr-in-ruflo.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F53', 'F70', 'F71', 'F72', 'F73', 'F74', 'F75', 'F76', 'F77', 'F78', 'F79', 'F128', 'F136'],
  },
  decisions: {
    title: 'Three decisions, mapped: an agent\'s memory, this newsroom\'s release and a customer refund, through behaviour, decision and workflow',
    url: 'https://newsroom.sgit.ai/articles/three-decisions-mapped.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F83', 'F137'],
  },
  policies: {
    title: 'Three policies for an agent: behaviour says what it may do, decision says who chooses, workflow says in what order',
    url: 'https://newsroom.sgit.ai/articles/three-policies-for-an-agent.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F83', 'F138', 'F142'],
  },
  mess: {
    title: 'Who will fix your mess? An answer to HBR\'s "deployment gap" from what this site has already published: explorers, villagers and town planners, a record of what the agents built, and open source so the answer never depends on one partner',
    url: 'https://newsroom.sgit.ai/articles/who-will-fix-your-mess.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F84', 'F135'],
  },
  allowed: {
    title: 'Allowed is not right',
    url: 'https://newsroom.sgit.ai/articles/allowed-is-not-right.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-18',
    read: '2026-11-18',
    facts: ['F139', 'F143'],
    note: 'The opening words of the title; the rest names a person this site does not name.',
  },
  reach: {
    title: 'What can your agent reach? RiskMandate and the Agent Behaviour Policy, explained for the person who has to decide',
    url: 'https://newsroom.sgit.ai/articles/what-can-your-agent-reach.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-18',
    read: '2026-11-18',
    facts: ['F85', 'F140'],
  },
  librarian: {
    title: 'The Librarian\'s daily brief: everything that happened in my universe yesterday, the threads I left, and where my leverage is today',
    url: 'https://newsroom.sgit.ai/articles/the-librarians-daily-brief.md',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: '2026-10-18',
    read: '2026-11-18',
    facts: ['F141', 'F144'],
  },
  pr: {
    title: 'Pull request #4239: docs: ABP-governed SGit memory checkpoints and Ruflo CLI recovery validation',
    url: 'https://github.com/ruvnet/ruflo/pull/4239',
    publisher: 'GitHub (ruvnet/ruflo)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F90', 'F129'],
    note: 'The web page and the API returned 403 to this session. Checked with anonymous git: the pull request head is commit 6b49d58.',
  },
  'ruflo-git': {
    title: 'ruvnet/ruflo, main branch history',
    url: 'https://github.com/ruvnet/ruflo',
    publisher: 'GitHub (ruvnet/ruflo)',
    date: null,
    read: '2026-11-18',
    facts: ['F74', 'F90', 'F91', 'F129'],
    note: 'Read with anonymous git (ls-remote and a metadata-only clone).',
  },
  'pr-page': {
    title: 'External SGit memory checkpoints governed by an ABP',
    url: 'https://raw.githubusercontent.com/ruvnet/ruflo/main/docs/integrations/sgit-memory-checkpoints.md',
    publisher: 'GitHub (ruvnet/ruflo)',
    date: '2026-10-17',
    read: '2026-11-18',
    facts: ['F53', 'F92', 'F93', 'F130'],
  },
  'newsroom-index': {
    title: 'newsroom.sgit.ai: all articles',
    url: 'https://newsroom.sgit.ai/articles/',
    publisher: 'newsroom.sgit.ai (by Dinis Cruz)',
    date: null,
    read: '2026-11-18',
    facts: ['F145'],
    note: 'Used for one count by this site, not by the newsroom: on 18 November 2026 each article\'s text was searched for his name above its "Threads" heading.',
  },
};

export const PERSON = {
  name: 'Mondweep Chakravorty',
  headline: 'Enterprise AI leader and agentic systems builder; co-founder, Agentics Foundation London',
  headlineSrc: ['provider'],
  place: 'London, UK',
  placeSrc: ['provider'],
  monogram: 'MC',
  about: [
    { text: 'Mondweep Chakravorty is an enterprise AI leader and agentic systems builder based in London, and co-founder of the Agentics Foundation\'s London chapter.', src: ['provider'] },
    { text: 'Through DxSure Ltd he advises on and builds agentic AI systems.', src: ['provider'] },
    { text: 'This draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.', src: ['provider'] },
  ],
  contact: {
    email: 'agent@riskmandate.ai',
    label: 'Enquire to book',
    subject: 'Enquiry: a conversation with Mondweep Chakravorty',
    text: 'Enquiries for his work go to agent@riskmandate.ai, the address his provider page on ruv.sgit.ai gives. The site takes no payment: you enquire, and a person replies with dates and a quote.',
    src: ['provider'],
  },
  providerPage: 'https://ruv.sgit.ai/providers/mondweep-chakravorty.html',
  status: [
    { text: 'Mondweep agreed to this public site, as Dinis Cruz told the team on 18 November 2026. He has not yet reviewed any version of it.', src: [] },
    // From Dinis Cruz's words in team/WORKFLOW.md (about 10:46 UTC), not a public source.
    { text: 'The only photograph of him on this site is the headshot Dinis Cruz supplied with his agreement on 18 November 2026.', src: [] },
  ],
};

// The one image of Mondweep the site may use (Dinis Cruz, 2026-11-18, about 10:46 UTC, team/WORKFLOW.md:
// "Here is the profile pics"). Never shown above its own 200 px. The monogram MC (PERSON.monogram, as on his
// provider page, F100) stays for the designs and cards that are typographic.
export const PHOTO = {
  src: '/assets/photo/mondweep-chakravorty.png',
  alt: 'Mondweep Chakravorty',
  width: 200,
  height: 200,
  credit: 'Supplied by Dinis Cruz with Mondweep\'s agreement, 18 November 2026',
};

export const HOME = {
  lede: 'Enterprise AI leader and agentic systems builder in London.',
  intro: [
    { text: 'Through DxSure Ltd, Mondweep Chakravorty advises on and builds agentic AI systems. His work draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.', src: ['provider'] },
    { text: 'He is a co-founder of the Agentics Foundation\'s London chapter, a community of about 300 engineers, strategists and educators.', src: ['provider', 'london'] },
    { text: 'With Dinis Cruz, he is one of the two founding providers of ruv.sgit.ai, a small marketplace for agent work done under a written mandate per role.', src: ['llms-ruv', 'ruv-home'] },
  ],
  // The first screen (change 1). The eyebrow is from his headline and place (F02, F03); the line is F02's and
  // F05's own words, whole sentences (design review condition 1); the lede is F06's words.
  hero: {
    eyebrow: { text: 'London. Co-founder, Agentics Foundation London', src: ['provider'] },
    line: { text: 'Enterprise AI leader and agentic systems builder. Through DxSure Ltd he advises on and builds agentic AI systems.', src: ['provider'] },
    lede: { text: 'Two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.', src: ['provider'] },
    actions: [
      { label: 'See the proof of concept', href: '/proof-of-concept/', style: 'primary' },
      { label: 'Work with him', href: '#work', style: 'secondary' },
    ],
  },
  // Four numbers on the first screen (change 1). Each value is the source's number; the label is our wording
  // around it; `text` is the whole sentence (for a screen reader or a plain-text page). The third keeps F30's
  // own words, "a community of about 300 engineers, strategists and educators" (design review condition 2).
  numbers: [
    { value: '12', label: 'steps and 3 safeguards in his SGit × Ruflo run',
      text: 'His SGit × Ruflo run has 12 steps and 3 safeguards.', src: ['poc'] },
    { value: '#4239', label: 'his pull request, merged into Ruflo on 17 October 2026',
      text: 'His pull request #4239 was merged into Ruflo on 17 October 2026.', src: ['pr-article', 'pr-page'] },
    { value: 'About 300', label: 'engineers, strategists and educators: the community of the London chapter he co-founded, as its site gave it on 18 November 2026',
      text: 'He co-founded the Agentics Foundation\'s London chapter, a community of about 300 engineers, strategists and educators, as the chapter\'s site gave it on 18 November 2026.', src: ['provider', 'london'] },
    { value: '2', label: 'founding providers of ruv.sgit.ai: him and Dinis Cruz',
      text: 'ruv.sgit.ai has 2 founding providers: him and Dinis Cruz.', src: ['llms-ruv', 'ruv-home'] },
  ],
  // The Career band (changes 3 and 5). The heading names the source's own first and present stops (F10, F09),
  // as design review condition 14 sets it; the proposal's "From core banking to agentic AI" was rejected
  // because no source frames his career that way. Any other summary heading goes to Dinis first.
  career: {
    kicker: 'Career',
    heading: 'From HSBC Global Technology to DxSure Ltd',
    headingPlain: 'Career',
    summary: [
      { text: 'He began his career as a software engineer at HSBC Global Technology. After an MBA at London Business School, he led transformation and delivery work at Shell Energy, TalkTalk and Zafin, and later worked at Jaguar Land Rover and Lotus Technology.', src: ['providers-data'] },
      { text: 'Since September 2024 he has worked as an independent AI advisor through DxSure Ltd.', src: ['providers-data'] },
    ],
    href: '/experience/',
    linkText: 'His career, in full',
  },
  // The pull quote (change 3): Dinis Cruz's words, word for word (F61). No words are presented as Mondweep's.
  pullQuote: {
    text: 'This is the first time someone outside our own sessions has taken the two ideas we keep arguing for, an encrypted vault as an agent\'s memory and a behaviour policy beside the prompt, and run them together inside someone else\'s agent stack, on camera.',
    by: 'Dinis Cruz',
    cite: 'Dinis Cruz, in the newsroom article on the proof of concept, 17 October 2026',
    src: ['poc'],
  },
  highlights: [
    {
      title: 'SGit × Ruflo proof of concept',
      text: 'An agent\'s memory saved as an encrypted checkpoint, the project deleted, and the memory restored in a fresh process with the same SHA-256 fingerprint. Three safeguards held.',
      href: '/proof-of-concept/',
      src: ['poc'],
    },
    {
      title: 'Merged into Ruflo',
      text: 'Pull request #4239 adds an 83-line page documenting his adapter. rUv merged it into ruvnet/ruflo on 17 October 2026.',
      href: '/built/',
      src: ['pr-article', 'pr-page'],
    },
    {
      title: 'Agentics Foundation, London',
      text: 'He co-founded the London chapter in May 2025. It hosts online and in-person meetups every second Wednesday.',
      href: '/agentics-london/',
      src: ['london'],
    },
    {
      title: 'Working with Dinis Cruz',
      text: 'The two founding providers of ruv.sgit.ai. Both list the same four offers at the published prices.',
      href: '/collaboration/',
      src: ['llms-ruv', 'ruv-home'],
    },
  ],
  actions: [
    { label: 'Enquire to book', href: 'mailto:agent@riskmandate.ai?subject=Enquiry%3A%20a%20conversation%20with%20Mondweep%20Chakravorty', src: ['provider'] },
    { label: 'See the proof of concept', href: '/proof-of-concept/', src: [] },
  ],
};

// The four phases of the run, as the reviewer set them (team/rounds/1/review/DESIGN.md, condition 2).
// The grouping is ours, not the article's. Steps per phase: 3, 3, 4, 2.
export const PHASES = [
  { id: 'setup', label: 'Set up', steps: [1, 2, 3] },
  { id: 'save', label: 'Save under the policy', steps: [4, 5, 6] },
  { id: 'restore', label: 'Lose it and bring it back', steps: [7, 8, 9, 10] },
  { id: 'check', label: 'Check and conclude', steps: [11, 12] },
];

export const POC = {
  title: 'SGit × Ruflo: a working proof of concept',
  summary: [
    { text: 'The question is simple: what if an agent loses its workspace? In his proof of concept, Mondweep saves a Ruflo agent\'s memory as an encrypted SGit checkpoint, deletes the project, and restores the memory in a brand-new process.', src: ['poc'] },
    { text: 'An Agent Behaviour Policy sets what the agent may do with its memory. It is compiled into Ruflo\'s own rules and checked by a pinned copy of Ruflo\'s policy evaluator, in enforce mode.', src: ['poc'] },
    { text: 'The restored database has the same SHA-256 fingerprint as the one saved, and Ruflo reads both facts back word for word. Along the way three safeguards are tested and hold.', src: ['poc'] },
    { text: 'His video replays a real terminal run in twelve steps, in 104.7 seconds. Each slide has the story on the left, for someone with no code knowledge, and the terminal on the right.', src: ['poc'] },
    { text: 'Dinis Cruz\'s newsroom cites it as an example of a prototype ready for handover: built with agents, but with its versions pinned, sixteen tests, a folder of evidence, a written behaviour policy, and a README that says plainly what it does not do yet.', src: ['mess'] },
  ],
  video: {
    title: 'SGit × Ruflo | Working Proof of Concept',
    url: 'https://youtu.be/rkh6BJiaIrQ',
    seconds: 104.7,
    date: '2026-10-17',
    note: 'Published on YouTube. The frames are his and are not covered by this site\'s licence.',
    src: ['poc'],
  },
  code: {
    name: 'mondweep/sgit-ruv-memory',
    url: 'https://github.com/mondweep/sgit-ruv-memory',
    licence: 'MIT',
    tests: 16,
    text: 'A local MCP server of four tools, a strict compiler that turns an Agent Behaviour Policy into Ruflo rules, 16 tests, and the evidence from each run.',
    src: ['poc', 'pr-page'],
  },
  phases: PHASES,
  steps: [
    { n: 1, title: 'A real, pinned runtime', at: '0:09', phase: 'setup', safeguard: null,
      text: 'The run uses a pinned version of Ruflo: ruflo --version returns v3.56.10.' },
    { n: 2, title: 'Define the mandate', at: '0:14', phase: 'setup', safeguard: null,
      text: 'The mandate is four Agent Behaviour Policy rows, all scoped to the project: write memory, yes; read memory, yes; read history, yes; delete memory, approval. Unsupported or ambiguous policies fail closed.' },
    { n: 3, title: 'Store two facts through Ruflo', at: '0:21', phase: 'setup', safeguard: null,
      text: 'Ruflo stores two synthetic facts about Kestrel, a test name: its vehicles may charge only between 01:00 and 04:00 UTC, and its checkpoints are retained for seven days.' },
    { n: 4, title: 'Try something outside its permission', at: '0:32', phase: 'save', safeguard: 1,
      text: 'A request outside the agent\'s permission is refused with a PermissionError, and no checkpoint file is written.' },
    { n: 5, title: 'Save an encrypted recovery point', at: '0:38', phase: 'save', safeguard: null,
      text: 'The memory is saved as an encrypted SGit checkpoint, with three fingerprints: of the database, of the policy and of the compiled policy. Only encrypted SGit objects enter the checkpoint store; private keys stay in a separate directory.' },
    { n: 6, title: 'Approval means stop', at: '0:45', phase: 'save', safeguard: 2,
      text: 'A deletion that needs approval stops with a PermissionError, and the checkpoint is retained.' },
    { n: 7, title: 'Remove the original workspace', at: '0:51', phase: 'restore', safeguard: null,
      text: 'The original project workspace is removed. The loss is real, not simulated.' },
    { n: 8, title: 'Restore in a fresh process', at: '0:58', phase: 'restore', safeguard: null,
      text: 'A brand-new process restores the checkpoint. The database\'s SHA-256 fingerprint is the same as in step 5.' },
    { n: 9, title: 'Ask Ruflo what it remembers', at: '1:04', phase: 'restore', safeguard: null,
      text: 'Ruflo reads both facts back. Both values match the facts written through its command line exactly.' },
    { n: 10, title: 'A missing fact stays missing', at: '1:14', phase: 'restore', safeguard: null,
      text: 'Asked for a key that was never stored, Ruflo replies: Key not found.' },
    { n: 11, title: 'Change the saved copy, try again', at: '1:20', phase: 'check', safeguard: 3,
      text: 'The saved copy is changed and the restore is tried again. It fails with a ValueError and no workspace is created from it: integrity fails closed.' },
    { n: 12, title: 'What this run proves', at: '1:26', phase: 'check', safeguard: null,
      text: 'Exact recall passes, the policy denial passes, the deletion and the tampered restore are blocked, and the fresh-process restore passes. Recall by meaning is not validated, because embeddings were off.' },
  ],
  stepsSrc: ['poc'],
  safeguards: [
    { n: 1, title: 'Out of scope refused', text: 'A request outside the agent\'s permission is refused.', step: 4, src: ['poc'] },
    { n: 2, title: 'Deletion without approval stopped', text: 'A deletion that needs approval is stopped.', step: 6, src: ['poc'] },
    { n: 3, title: 'Tampered copy rejected', text: 'A tampered checkpoint is rejected.', step: 11, src: ['poc'] },
  ],
  policyRows: [
    { action: 'write memory', scope: 'project', decision: 'yes', capability: 'write.memory.project' },
    { action: 'read memory', scope: 'project', decision: 'yes', capability: 'read.memory.project' },
    { action: 'read history', scope: 'project', decision: 'yes', capability: 'read.record.history' },
    { action: 'delete memory', scope: 'project', decision: 'approval', capability: 'delete.memory.project' },
  ],
  policyNote: { text: 'And one line that matters more than it looks: "No raw rule overrides. Unsupported or ambiguous policies fail closed."', src: ['poc'] },
  policySrc: ['poc', 'pr-article'],
  results: [
    { check: 'Exact recall', result: 'PASS 2/2' },
    { check: 'ABP denial', result: 'PASS' },
    { check: 'Deletion that needs approval', result: 'BLOCKED, checkpoint retained' },
    { check: 'Fresh-process restore', result: 'PASS' },
    { check: 'Tampered restore', result: 'BLOCKED' },
    { check: 'Semantic recall', result: 'NOT VALIDATED, because embeddings were off' },
  ],
  resultsSrc: ['poc'],
  // For the run figure's key and the Run log footer (design review condition 10), and the figure's <desc>
  // (condition 13). Both say what is this site's reading.
  resultsNote: { text: 'The results are the run\'s own summary (step 12); setting each beside a step is this site\'s reading.', src: ['poc'] },
  phasesNote: 'The four phases are this site\'s grouping, not the article\'s. Times are from his video.',
  fingerprint: {
    text: 'The restored database has the same SHA-256 fingerprint as the one saved.',
    line: 'SHA-256 of the database saved at step 5 = SHA-256 after the restore at step 8',
    steps: [5, 8],
    src: ['poc', 'vault'],
  },
  vaultSteps: [5, 8, 11],
  vaultText: { text: 'The encrypted vault is used in three steps of twelve: written in 5, read in 8, read and rejected in 11. A recovery copy should be touched when you save and when you restore, and otherwise left alone.', src: ['vault'] },
  gatedSteps: [4, 5, 6, 8, 11],
  cliSteps: [3, 9, 10],
  gateText: { text: 'The policy checks cover steps 4, 5, 6, 8 and 11, and every one behaved as the policy said. In steps 3, 9 and 10, Ruflo\'s own command line reaches the same memory file directly, without the gate, as his README says.', src: ['policy-door'] },
  limits: [
    { text: 'A proof of concept, not a product.', src: ['poc'] },
    { text: 'In the run\'s own summary, semantic recall is NOT VALIDATED, because embeddings were off.', src: ['poc'] },
    { text: 'Still to validate, in the video\'s own words: recall by meaning, real-world value, and installation and ongoing reliability.', src: ['poc'] },
    { text: 'The facts are synthetic. Kestrel is a test name, not a real fleet.', src: ['poc'] },
    { text: 'The vault stays on one machine: encrypted SGit objects in one folder, keys in another. The next step is the vault leaving the machine, so a lost machine is also recoverable.', src: ['vault'] },
    { text: 'The safeguards do not cover every step. Only the adapter\'s tools pass through the policy gate; in steps 3, 9 and 10 Ruflo\'s own command line reaches the same memory file without it. His README says so, and lists native plugin registration as a follow-up.', src: ['policy-door'] },
    { text: 'The newsroom read the code; it did not run it.', src: ['poc'] },
  ],
  quote: {
    text: 'This is the first time someone outside our own sessions has taken the two ideas we keep arguing for, an encrypted vault as an agent\'s memory and a behaviour policy beside the prompt, and run them together inside someone else\'s agent stack, on camera.',
    by: 'Dinis Cruz',
    src: ['poc'],
  },
  src: ['poc'],
};

export const PR = {
  number: 4239,
  repo: 'ruvnet/ruflo',
  url: 'https://github.com/ruvnet/ruflo/pull/4239',
  title: 'docs: ABP-governed SGit memory checkpoints and Ruflo CLI recovery validation',
  opened: '2026-10-16',
  openedText: 'at 23:02 on 16 October 2026, London time',
  merged: '2026-10-17T14:59:00+01:00',
  mergedText: '17 October 2026 at 14:59 London time',
  mergedBy: 'rUv (per the newsroom)',
  file: 'docs/integrations/sgit-memory-checkpoints.md',
  fileUrl: 'https://raw.githubusercontent.com/ruvnet/ruflo/main/docs/integrations/sgit-memory-checkpoints.md',
  pageTitle: 'External SGit memory checkpoints governed by an ABP',
  lines: 83,
  commit: '332f22e',
  commits: [
    { sha: '81e3697', time: '2026-10-16T23:02:02+01:00', subject: 'Document external SGit memory checkpoint MCP example' },
    { sha: '269b9fc', time: '2026-10-16T23:35:31+01:00', subject: 'Document ABP compilation and enforced memory adapter operations' },
    { sha: '6b49d58', time: '2026-10-16T23:59:52+01:00', subject: 'Document passing Ruflo CLI recovery and unresolved embedding persistence' },
  ],
  commitsSrc: ['pr-article', 'ruflo-git'],
  capabilities: ['write.memory.project', 'read.memory.project', 'delete.memory.project'],
  summary: [
    { text: 'Mondweep opened pull request #4239 in ruvnet/ruflo at 23:02 on 16 October 2026, London time. Its three commits are timed between 23:02 and 23:59.', src: ['pr-article', 'ruflo-git'] },
    { text: 'It adds one page, docs/integrations/sgit-memory-checkpoints.md: 83 lines that document his adapter. The page describes an opt-in community example that connects an Agent Behaviour Policy to a local memory adapter.', src: ['pr-article', 'pr-page'] },
    { text: 'It changes documentation only. It adds no Ruflo runtime dependencies or defaults.', src: ['pr-page', 'pr-article'] },
    { text: 'rUv merged it into Ruflo\'s main branch on 17 October 2026 at 14:59 London time, squashed into one commit, 332f22e, authored by Mondweep.', src: ['pr-article'] },
    { text: 'Per the newsroom, it is the first commit on Ruflo\'s main branch to mention SGit or an ABP.', src: ['pr-article'] },
    { text: 'It proposes three memory capabilities for the Agent Behaviour Policy: write.memory.project, read.memory.project and delete.memory.project. The newsroom calls them the first memory vocabulary it has seen proposed from outside its team.', src: ['pr-article'] },
  ],
  acceptance: { text: 'A review was requested from rUv as code owner; no formal approval was recorded and no checks ran.', src: ['pr-article'] },
  quote: { text: 'Thank you, Mondweep, for the code, the video and the page, and rUv for merging it.', by: 'Dinis Cruz', src: ['pr-article'] },
  src: ['pr-article', 'ruflo-git', 'pr-page', 'pr'],
};

// The talk is Dinis Cruz's, not Mondweep's work. It appears only inside COLLAB, as how the marketplace began
// (reviewer condition 15). Not exported on its own.
const TALK = {
  title: 'Autonomy with a mandate and a memory',
  speaker: 'Dinis Cruz',
  event: 'Agentic Engineering Live',
  host: 'Agentics Foundation, London chapter',
  date: '2026-10-15',
  dateText: 'Thursday 15 October 2026',
  time: '7:00 pm',
  minutes: 10,
  venue: 'Westminster Room, Whitehall House, 41 Whitehall, London SW1A 2BX',
  url: 'https://ruv.sgit.ai/talk/index.html',
  text: [
    { text: 'The marketplace began after a talk by Dinis Cruz, "Autonomy with a mandate and a memory", at Agentic Engineering Live on Thursday 15 October 2026, an Agentics Foundation London event.', src: ['talk', 'ready', 'ruv-home'] },
    { text: 'It was a ten-minute talk at 7:00 pm, after a keynote by rUv, and showed a Ruflo hive, sgit vaults and Agent Behaviour Policies as one workflow, ruv.sgit: "a hive, a memory and a mandate".', src: ['talk', 'ruv-home', 'ready'] },
    { text: 'The London chapter Mondweep co-founded runs the meetups where all of this was shown. The next day, Dinis Cruz\'s newsroom article on the evening named the marketplace\'s first two providers: Mondweep and Dinis.', src: ['ready'] },
  ],
  note: 'No source says Mondweep spoke at the event.',
  src: ['talk', 'ready', 'ruv-home'],
};

export const EXPERIENCE = {
  intro: [
    { text: 'Mondweep Chakravorty is an enterprise AI leader and agentic systems builder based in London.', src: ['provider'] },
    { text: 'His work draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.', src: ['provider'] },
  ],
  sectors: ['financial services', 'automotive', 'energy', 'technology'],
  examples: ['HSBC', 'Jaguar Land Rover'],
  examplesText: 'from HSBC to Jaguar Land Rover',
  dxsure: { text: 'Through DxSure Ltd he advises on and builds agentic AI systems.', src: ['provider'] },
  src: ['provider'],
};

// The /experience/ career page (change 5), from the long bio in ruv.sgit.ai/data/providers.json (F09 to F12,
// F14), cleared by Dinis Cruz on 2026-11-18. Worded as the source gives it. The source gives an order and one
// date (September 2024), so the path is ordered stops, not a dated timeline; the labels follow the source's own
// order words ("began", "After an MBA", "Later", "Since September 2024"). Not used: F13 and F15.
export const CAREER = {
  kicker: 'Career',
  heading: HOME.career.heading, // the source's first and present stops (see HOME.career)
  intro: { text: 'He began his career as a software engineer at HSBC Global Technology. Since September 2024 he has worked as an independent AI advisor through DxSure Ltd.', src: ['providers-data'] },
  pathLabel: 'In the order the source gives',
  // labelOurs: the label is this site's word for the source's order ("began", "After an MBA"); "Later" and
  // "Since September 2024" are the source's own (design review condition 22).
  path: [
    { label: 'First', labelOurs: true, orgs: ['HSBC Global Technology'],
      text: 'He began his career as a software engineer at HSBC Global Technology, working on payments and core banking integration.', src: ['providers-data'] },
    { label: 'Then', labelOurs: true, orgs: ['London Business School'],
      text: 'An MBA at London Business School.', src: ['providers-data'] },
    { label: 'After the MBA', labelOurs: true, orgs: ['Shell Energy', 'TalkTalk', 'Zafin'],
      text: 'He led transformation and delivery work at Shell Energy, TalkTalk and Zafin, the last on core banking SaaS for major banks.', src: ['providers-data'] },
    { label: 'Later', orgs: ['Jaguar Land Rover', 'Lotus Technology'],
      text: 'He worked at Jaguar Land Rover and Lotus Technology on portfolio rationalisation, cloud foundations and connected experiences.', src: ['providers-data'] },
    { label: 'Since September 2024', orgs: ['DxSure Ltd'],
      text: 'He has worked as an independent AI advisor through DxSure Ltd. His work there combines advisory, solution architecture and hands-on agentic builds: multi-agent orchestration, RAG, MCP and AI security.', src: ['providers-data'] },
  ],
  cards: [
    { kicker: 'Mentoring', title: 'Johns Hopkins Agentic AI programme', text: 'He mentors on the Johns Hopkins Agentic AI programme.', src: ['providers-data'] },
    { kicker: 'Keynote', title: 'CISO London Summit 2025', text: 'At the CISO London Summit 2025 he co-presented the keynote "Securing the Agentic Frontier", applying the OWASP MAESTRO threat-modelling framework to an agentic AI codebase.', src: ['providers-data'] },
  ],
  specialisms: {
    heading: 'Specialisms, as listed',
    items: [
      'Agentic AI architecture (multi-agent, RAG, MCP)',
      'Agentic AI security and threat modelling (MAESTRO)',
      'Enterprise programme delivery and C-suite advisory',
      'Financial services, core banking and payments',
      'Automotive and digital transformation',
      'Cloud platforms (AWS, GCP, Azure)',
      'Agentic AI community building',
    ],
    src: ['providers-data'],
  },
  sectors: { text: 'His work draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.', src: ['provider'] },
  // Where the bio comes from: the drafting status is public (F16); the clearance is Dinis Cruz's word in
  // team/WORKFLOW.md, so the second sentence names its source in its words.
  note: [
    { text: 'From the bio on ruv.sgit.ai, drafted there for him to approve.', src: ['providers-data'] },
    { text: 'Dinis Cruz cleared it for this site on 18 November 2026.', src: [] },
  ],
  summary: HOME.career.summary,
  src: ['providers-data', 'provider'],
};

export const LONDON = {
  role: 'Chapter Co-Founder',
  name: 'Agentics Foundation, London chapter',
  text: [
    { text: 'Mondweep Chakravorty is a co-founder of the Agentics Foundation\'s London chapter, which its site lists as Agentics London.', src: ['london', 'provider'] },
    { text: 'He co-founded the chapter in May 2025 as a UK ambassador, with five other chapter leaders. The chapter\'s site lists him as Chapter Co-Founder.', src: ['london'] },
    { text: 'Agentics London is the official UK chapter of the global Agentics Foundation, which rUv founded in 2024. It is a community of about 300 engineers, strategists and educators, focused on hands-on agentic AI education through free meetups and paid workshops across London.', src: ['london'] },
    { text: 'He is one of the two contacts the chapter lists for workshop, talk and partnership enquiries.', src: ['london'] },
  ],
  facts: [
    { label: 'Founded', value: 'May 2025', src: ['london'] },
    { label: 'First meetup', value: '21 May 2025', src: ['london'] },
    { label: 'Members', value: 'about 300', src: ['london'] },
    { label: 'Meetups', value: 'every second Wednesday, online and in person', src: ['london'] },
    { label: 'His role', value: 'Chapter Co-Founder', src: ['london'] },
  ],
  url: 'https://london.agentics.org/',
  src: ['london'],
};

export const COLLAB = {
  intro: [
    { text: 'Mondweep Chakravorty and Dinis Cruz are the two founding providers of ruv.sgit.ai, a small marketplace for agent work done under a written mandate per role.', src: ['llms-ruv', 'ruv-home'] },
    { text: 'Each lists the same four offers at the published prices. Every job is a ruv.sgit run: a written mandate per agent, an encrypted vault per run, a person watching, and the vault handed to the client.', src: ['ruv-home', 'provider'] },
  ],
  founding: { text: 'Dinis Cruz\'s newsroom introduced the marketplace on 16 October 2026 and named its first two providers: Mondweep, co-founder of the Agentics Foundation\'s London chapter, and Dinis. Mondweep agreed to be listed the same day.', src: ['ready', 'providers-data'] },
  talk: TALK,
  roles: [
    { text: 'With Dinis Cruz, he matches enquiries to providers and reviews applications to join, until there are five providers.', src: ['providers-data'] },
  ],
  engagement: { text: 'Most clients start small and stop at any step.', src: ['provider'] },
  offersNote: [
    { text: 'Prices in GBP, excluding VAT. The site takes no payment: you enquire, and a person replies with dates and a quote.', src: ['provider'] },
    { text: 'Runs are not automated end to end yet: a person on their side starts, watches and hands over every run.', src: ['offers'] },
  ],
  offers: [
    {
      group: 'Task runs',
      unit: 'per run',
      note: 'On shared infrastructure. Less with your own model key.',
      items: [
        { name: 'Small run', price: 10, priceText: '£10', unit: 'per run', ownKey: 9, ownKeyText: '£9', summary: 'A queen and up to 5 workers for a focused task.' },
        { name: 'Team run', price: 20, priceText: '£20', unit: 'per run', ownKey: 17, ownKeyText: '£17', summary: 'A queen and up to 10 workers: the size of our own site-building runs.' },
        { name: 'Large run', price: 50, priceText: '£50', unit: 'per run', ownKey: 40, ownKeyText: '£40', summary: 'A queen and up to 20 workers for a big task.' },
      ],
      src: ['offers', 'llms-ruv'],
    },
    {
      group: 'Dedicated compute',
      unit: 'per 8-hour block',
      status: 'not built yet',
      note: 'Not built yet. Price = £20 platform fee + twice the EC2 cost.',
      items: [
        { name: 'Small instance', price: 21, priceText: '£21', unit: 'per 8-hour block', summary: 't3.medium: 2 vCPU, 4 GiB memory.' },
        { name: 'Medium instance', price: 23, priceText: '£23', unit: 'per 8-hour block', summary: 'm7i.xlarge: 4 vCPU, 16 GiB memory.' },
        { name: 'GPU instance', price: 36, priceText: '£36', unit: 'per 8-hour block', summary: 'g5.xlarge: 4 vCPU, 16 GiB memory, 1 NVIDIA A10G.' },
      ],
      src: ['offers', 'llms-ruv'],
    },
    {
      group: 'Maintained repository',
      unit: 'per month',
      note: null,
      items: [
        { name: 'Individual', price: 149, priceText: '£149', unit: 'per month', summary: 'One private repository for one person, kept current.' },
        { name: 'Team', price: 499, priceText: '£499', unit: 'per month', summary: 'One repository for a team, with your branding and a better UI.' },
        { name: 'White-label ready', price: 1500, priceText: '£1,500', unit: 'per month', summary: 'Ready to offer to your own clients under your name.' },
      ],
      src: ['offers', 'llms-ruv'],
    },
    {
      group: 'Expert time',
      unit: null,
      note: null,
      items: [
        { name: 'A couple of hours', price: 500, priceText: '£500', unit: 'per session', summary: 'About 2 hours: scope a task, steer a few runs, review what came back.' },
        { name: 'A day', price: 1500, priceText: '£1,500', unit: 'per day', summary: 'A working day: design a run pipeline, a behaviour policy, or a pilot.' },
        { name: 'Several days', price: 5000, priceText: '£5,000', unit: 'per engagement', summary: 'Four working days: set ruv.sgit up in your environment and hand it over.' },
      ],
      src: ['offers', 'llms-ruv'],
    },
  ],
  projectsNote: { text: 'Five kinds of project, each a package of the offers above. The offers under each are a suggested starting combination, agreed in the first conversation.', src: ['provider', 'types'] },
  projects: [
    'A first run with a guide',
    'A behaviour policy for one team\'s agents',
    'A four-day pilot',
    'A talk or workshop built the way ours was',
    'A review of an agent that is already running',
  ],
  projectsSrc: ['types'],
  disclaimer: { text: 'ruv.sgit.ai says of itself: this is not rUv\'s offer, and it does not speak for him or for the Agentics Foundation.', src: ['ruv-home'] },
  articles: [
    { no: 142, date: '2026-10-16', short: 'Agentics, ready to sell', title: SOURCES.ready.title, url: SOURCES.ready.url,
      why: 'Introduces the marketplace and names Mondweep and Dinis Cruz as its first two providers.' },
    { no: 163, date: '2026-10-17', short: 'The policy guards the door', title: SOURCES['policy-door'].title, url: SOURCES['policy-door'].url,
      why: 'Shows which steps of his run pass the policy gate, and which reach memory through Ruflo\'s command line.' },
    { no: 164, date: '2026-10-17', short: 'What if an agent loses its workspace?', title: SOURCES.poc.title, url: SOURCES.poc.url,
      why: 'Walks through his proof of concept: twelve steps and three safeguards.' },
    { no: 165, date: '2026-10-17', short: 'When is the vault actually used?', title: SOURCES.vault.title, url: SOURCES.vault.url,
      why: 'Shows where the encrypted vault is used in his run: written in step 5, read in 8, read and rejected in 11.' },
    { no: 166, date: '2026-10-17', short: 'Who will fix your mess?', title: SOURCES.mess.title, url: SOURCES.mess.url,
      why: 'Cites his proof of concept as an example of a prototype ready for handover.' },
    { no: 169, date: '2026-10-17', short: 'Our first PR in Ruflo', title: SOURCES['pr-article'].title, url: SOURCES['pr-article'].url,
      why: 'Records his pull request #4239, merged into Ruflo by rUv.' },
    { no: 172, date: '2026-10-17', short: 'Three decisions, mapped', title: SOURCES.decisions.title, url: SOURCES.decisions.url,
      why: 'Uses the approval row for deleting memory in his adapter as the first of three decisions mapped.' },
    { no: 173, date: '2026-10-17', short: 'Three policies for an agent', title: SOURCES.policies.title, url: SOURCES.policies.url,
      why: 'Uses his Agent Behaviour Policy for SGit memory checkpoints as an example.' },
    { no: 175, date: '2026-10-18', short: 'Allowed is not right', title: SOURCES.allowed.title, url: SOURCES.allowed.url, titleNote: 'the opening words of the title; the rest names a person this site does not name',
      why: 'Notes that he compiled an Agent Behaviour Policy into Ruflo\'s own rules and checked them in enforce mode, outside the agent.' },
    { no: 178, date: '2026-10-18', short: 'What can your agent reach?', title: SOURCES.reach.title, url: SOURCES.reach.url,
      why: 'Describes how he enforced a compiled policy, in real time, on the memory operations of an external adapter.' },
    { no: 193, date: '2026-10-18', short: 'The Librarian\'s daily brief', title: SOURCES.librarian.title, url: SOURCES.librarian.url,
      why: 'Names his pull request to Ruflo as the kind of outside contribution the newsroom wants to see.' },
  ],
  articlesNote: { text: 'By this site\'s count of the newsroom on 18 November 2026, eleven of its 470 articles name Mondweep in their text, all by Dinis Cruz and dated 16 to 18 October 2026.', src: ['newsroom-index'], kind: 'count by this site' },
  timeline: [
    { date: '2025-05', text: 'The Agentics Foundation\'s London chapter is founded, with Mondweep as a co-founder. Its first meetup is on 21 May 2025.', src: ['london'] },
    { date: '2026-10-15', text: 'Dinis Cruz gives the talk "Autonomy with a mandate and a memory" at Agentic Engineering Live, an evening of the London chapter.', src: ['talk', 'ready'] },
    { date: '2026-10-16', text: 'The newsroom introduces the marketplace and names Mondweep and Dinis Cruz as its first two providers. Mondweep agrees to be listed.', src: ['ready', 'providers-data'] },
    { date: '2026-10-16', text: 'From 23:02 to 23:59 London time, Mondweep makes the three commits of pull request #4239 in ruvnet/ruflo.', src: ['pr-article', 'ruflo-git'] },
    { date: '2026-10-17', text: 'His video "SGit × Ruflo | Working Proof of Concept" is published on YouTube, and the newsroom walks through it step by step.', src: ['poc'] },
    { date: '2026-10-17', text: 'At 14:59 London time, rUv merges pull request #4239 into Ruflo\'s main branch.', src: ['pr-article'] },
    { date: '2026-10-21', text: 'ruv.sgit.ai changes "register interest" to "enquire to book", and his provider page goes live with a bio drafted for him to approve.', src: ['next-phase', 'llms-ruv', 'providers-data'] },
  ],
  // The timeline strip on /collaboration/ (change 4b): 16 to 21 October 2026. It starts on 16 October so the
  // talk appears once on the page (round 1 condition 15; design review condition 20). Times are London time.
  // The full timeline above stays and keeps the May 2025 entry.
  strip: [
    { date: '2026-10-16', dateText: '16 Oct',
      items: [
        { text: 'The marketplace is introduced; he and Dinis Cruz are named its first two providers.', src: ['ready', 'providers-data'] },
        { text: 'He opens pull request #4239 at 23:02 London time; its commits run to 23:59.', src: ['pr-article', 'ruflo-git'] },
      ] },
    { date: '2026-10-17', dateText: '17 Oct',
      items: [
        { text: 'His video is published, and the newsroom walks through it step by step.', src: ['poc'] },
        { text: 'rUv merges pull request #4239 at 14:59 London time.', src: ['pr-article'] },
      ] },
    { date: '2026-10-21', dateText: '21 Oct',
      items: [
        { text: '"Register interest" becomes "enquire to book", and his provider page goes live.', src: ['next-phase'] },
      ] },
  ],
  src: ['llms-ruv', 'ruv-home', 'provider', 'offers', 'types', 'ready'],
};

// "Work with him" (change 4a): what to ask for, what it costs, how to start, in one place, on the home,
// on /collaboration/ and in each design. Prices exactly as ruv.sgit.ai publishes them (COLLAB.offers);
// "What happens next" holds only the sources' words (design review condition 17); the sources give no
// order for its items, so the developer shows them as a bulleted list (condition 18).
export const WORK = {
  heading: 'Work with him',
  projectsHeading: 'Five kinds of project',
  projects: COLLAB.projects,
  projectsSrc: COLLAB.projectsSrc,
  offersHeading: 'The four offers, as published (GBP, excluding VAT)',
  offers: [
    { group: 'Task runs', line: '£10, £20 or £50 a run; £9, £17 or £40 with your own model key.', status: null, src: ['offers', 'llms-ruv'] },
    { group: 'Dedicated compute', line: '£21, £23 or £36 per 8-hour block.', status: 'Not built yet', src: ['offers', 'llms-ruv'] },
    { group: 'Maintained repository', line: '£149, £499 or £1,500 a month.', status: null, src: ['offers', 'llms-ruv'] },
    { group: 'Expert time', line: '£500 for about 2 hours, £1,500 for a working day, £5,000 for four working days.', status: null, src: ['offers', 'llms-ruv'] },
  ],
  enquire: {
    heading: 'How to enquire',
    email: PERSON.contact.email,
    label: PERSON.contact.label,
    subject: PERSON.contact.subject,
    providerLabel: 'His provider page',
    providerPage: PERSON.providerPage,
    src: ['provider'],
  },
  nextHeading: 'What happens next',
  next: [
    { text: 'A person replies with dates and a quote. The site takes no payment.', src: ['provider'] },
    { text: 'The offers under each kind of project are a suggested starting combination, agreed in the first conversation.', src: ['provider'] },
    { text: 'Most clients start small and stop at any step.', src: ['provider'] },
    { text: 'Runs are not automated end to end yet: a person starts, watches and hands over every run.', src: ['offers'] },
  ],
  disclaimer: COLLAB.disclaimer,
};

export const AI = {
  summary: 'Mondweep Chakravorty is an enterprise AI leader and agentic systems builder based in London. Through DxSure Ltd he advises on and builds agentic AI systems, drawing on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover. He is a co-founder of the Agentics Foundation\'s London chapter (Agentics London), founded in May 2025, a community of about 300 engineers, strategists and educators that meets every second Wednesday. In October 2026 he built and published the SGit × Ruflo proof of concept: a Ruflo agent\'s memory saved as an encrypted SGit checkpoint under an Agent Behaviour Policy, the project deleted, and the memory restored in a fresh process with the same SHA-256 fingerprint. Three safeguards held: a request outside the agent\'s permission was refused, a deletion that needed approval was stopped, and a tampered checkpoint was rejected. Recall by meaning was not validated. His code is public as mondweep/sgit-ruv-memory under the MIT licence, with 16 tests. His pull request #4239, an 83-line documentation page for this adapter, was merged into ruvnet/ruflo by rUv on 17 October 2026. With Dinis Cruz he is one of the two founding providers of ruv.sgit.ai, where both list the same four offers (task runs, dedicated compute, a maintained repository and expert time) at published prices in GBP excluding VAT. Enquiries go to agent@riskmandate.ai.',
  summarySrc: ['provider', 'london', 'poc', 'pr-article', 'ruflo-git', 'llms-ruv', 'offers'],
  howToCite: 'Mondweep Chakravorty, https://mondweep-chakravorty.agenticcells.site (facts read from public sources on 18 November 2026). Please cite the original source listed against each fact on /sources/.',
  questions: [
    { q: 'Who is Mondweep Chakravorty?',
      a: 'An enterprise AI leader and agentic systems builder based in London, and co-founder of the Agentics Foundation\'s London chapter. Through DxSure Ltd he advises on and builds agentic AI systems.',
      src: ['provider'] },
    { q: 'What is his background?',
      a: 'His public provider page says his work draws on two decades in financial services, automotive, energy and technology, from HSBC to Jaguar Land Rover.',
      src: ['provider'] },
    { q: 'What is the SGit × Ruflo proof of concept?',
      a: 'A run in twelve steps in which a Ruflo agent\'s memory is saved as an encrypted SGit checkpoint under an Agent Behaviour Policy, the project is deleted, and the memory is restored in a fresh process. The restored database has the same SHA-256 fingerprint as the one saved, and Ruflo reads both facts back word for word.',
      src: ['poc'] },
    { q: 'Which safeguards were tested in the proof of concept?',
      a: 'Three, and all held: a request outside the agent\'s permission was refused, a deletion that needed approval was stopped, and a tampered checkpoint was rejected.',
      src: ['poc'] },
    { q: 'What did the proof of concept not show?',
      a: 'Recall by meaning was not validated, because embeddings were off. Real-world value, installation and ongoing reliability are still to validate. The facts were synthetic, and the vault stayed on one machine.',
      src: ['poc', 'vault'] },
    { q: 'Where is his code?',
      a: 'At mondweep/sgit-ruv-memory on GitHub, under the MIT licence: a local MCP server of four tools, a strict compiler from an Agent Behaviour Policy to Ruflo rules, 16 tests, and the evidence from each run.',
      src: ['poc'] },
    { q: 'What did he contribute to Ruflo?',
      a: 'Pull request #4239 in ruvnet/ruflo, an 83-line documentation page, docs/integrations/sgit-memory-checkpoints.md, for his adapter. rUv merged it on 17 October 2026, squashed into commit 332f22e. It changes documentation only.',
      src: ['pr-article', 'ruflo-git', 'pr-page'] },
    { q: 'Did he give the talk at Agentic Engineering Live?',
      a: 'No source says so. The talk "Autonomy with a mandate and a memory" on 15 October 2026 was given by Dinis Cruz. Mondweep co-founded the London chapter, which runs the meetups where the work was shown.',
      src: ['talk', 'ready'] },
    { q: 'How does he work with Dinis Cruz?',
      a: 'They are the two founding providers of ruv.sgit.ai. Each lists the same four offers at the published prices, and together they match enquiries to providers and review applications to join, until there are five providers.',
      src: ['llms-ruv', 'providers-data'] },
    { q: 'What does it cost to work with him?',
      a: 'ruv.sgit.ai publishes prices in GBP, excluding VAT: task runs at £10, £20 or £50 a run (£9, £17 or £40 with your own model key); dedicated compute at £21, £23 or £36 per 8-hour block (not built yet); a maintained repository at £149, £499 or £1,500 a month; and expert time at £500 for about two hours, £1,500 for a day or £5,000 for four days. A person replies to each enquiry with dates and a quote.',
      src: ['offers', 'llms-ruv', 'provider'] },
    { q: 'How do I contact him?',
      a: 'Enquire to book by email to agent@riskmandate.ai, as his provider page on ruv.sgit.ai gives.',
      src: ['provider'] },
    { q: 'What is Agentics London?',
      a: 'The official UK chapter of the global Agentics Foundation, founded in May 2025, with about 300 members. It hosts online and in-person meetups every second Wednesday. Mondweep is listed as a Chapter Co-Founder.',
      src: ['london'] },
  ],
};

export const PAGES = {
  '/': { title: 'Mondweep Chakravorty', description: 'Enterprise AI leader and agentic systems builder in London; co-founder of the Agentics Foundation\'s London chapter.' },
  '/built/': { title: 'What he has built', description: 'The SGit × Ruflo proof of concept, its code under the MIT licence, and Ruflo PR #4239.' },
  '/proof-of-concept/': { title: 'SGit × Ruflo proof of concept', description: 'Memory saved encrypted, the project deleted, the memory back in a fresh process: twelve steps and three safeguards.' },
  '/experience/': { title: 'Career', description: 'From software engineer at HSBC Global Technology to independent AI advisor through DxSure Ltd: his career, a programme, a keynote and his specialisms.' },
  '/agentics-london/': { title: 'Agentics Foundation, London', description: 'The London chapter he co-founded in May 2025: about 300 members, meetups every second Wednesday.' },
  '/collaboration/': { title: 'With Dinis Cruz', description: 'The two founding providers of ruv.sgit.ai: how it began, the four offers as published, the five kinds of project, and the articles.' },
  '/sources/': { title: 'Sources', description: 'Every source used on this site, with its address and the date it was read.' },
  '/ai/': { title: 'Use with AI', description: 'Plain-text copies of every page, a summary and answers to common questions, for AI tools.' },
  '/behind-the-scenes/': { title: 'Behind the scenes', description: 'The team of agents that made this site, their policies, and how each round ran.' },
  '/d/': { title: 'Designs', description: 'The same facts and sources, five ways.' },
};

// The one-line idea of each design (change 10a), for the Designs pop-up, /d/ and each design's description.
// Descriptions of our own designs, not facts about him.
export const DESIGN_IDEAS = {
  ledger: 'A colour field, his photograph and the run drawn on the home page.',
  broadsheet: 'A newspaper front page: the run as Plate 1, with a caption column.',
  runlog: 'Story on the left, the run\'s log on the right, with video times and results.',
  blueprint: 'One drawn sheet: the phases as zones, the safeguards as balloons.',
  vault: 'The run as four checkpoint doors, with the vault steps marked.',
};

// "How this was made" (change 10c), a short note at the top of /behind-the-scenes/. From team/WORKFLOW.md,
// team/*/ROLE.md and scripts/release.sh, not from a public source. Says nothing about either linked site
// beyond its address.
export const MADE = {
  title: 'The team behind this site',
  // Design review condition 31: not a near-copy of the existing "How it is made" heading.
  text: [
    'Six AI agents made this site: a conductor, which briefs the others and is the only one that publishes, and a researcher, designer, writer, developer and reviewer, which the conductor runs as sub-agents in one Claude Code session. Each has a role file and an Agent Behaviour Policy.',
    'They work in rounds: research, design, a review of the design, copy, build, release, a review of the live site, and a report. Every release passes gates first: the validator, the leak scan, the commit check and the check of which files each agent may change.',
    'Dinis Cruz instructs the team, and Mondweep Chakravorty approves every change about him through Dinis.',
  ],
  linksLead: 'More about AgentiCCells:',
  links: [
    { label: 'agenticcells.ai', href: 'https://agenticcells.ai' },
    { label: 'hub.agenticcells.site', href: 'https://hub.agenticcells.site' },
  ],
  src: [],
};

export const OPEN = [
  'Dinis Cruz cleared the long bio from ruv.sgit.ai on 18 November 2026, and the career page uses it as the source words it. The bio is still marked there as drafted for Mondweep to approve: is he content with the wording? One line of it (F13, not cleared) is not used.',
  'The headshot is on the home and the Ledger link-preview card. Should the /collaboration/ card and the Broadsheet and Vault designs carry it too?',
  'Is he content with the talk shown only on the collaboration page, as Dinis Cruz\'s talk after which the marketplace began, at an event of the chapter he co-founded?',
  'The newsroom gives the start and end of the fingerprint at step 8. The reviewer ruled hash values off the site for now; does he want them shown?',
  'How does he want the collaboration described? The site says "founding providers" and "matches enquiries and reviews applications with Dinis Cruz", as ruv.sgit.ai does. Should it say "partner"?',
  'Should the site show ruv.sgit.ai\'s published rules (an equal split of revenue after direct costs; whoever has the client bills)? They are left out for now.',
  'Should the site link his own pages (mondweep.net, github.com/mondweep) as listed in ruv.sgit.ai\'s data file? Only the sgit-ruv-memory repository is linked now.',
  'Is DxSure Ltd the name he wants shown, and should the site say what DxSure does beyond "advises on and builds agentic AI systems"?',
  'Can the site embed or show frames of his video? The newsroom says the frames are his and not covered by its licence; the site only links to it.',
  'One newsroom article title (No. 175) is cut to its opening words, "Allowed is not right", because the rest names another person. Is that acceptable?',
];
