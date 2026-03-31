'use client';

import { useEffect, useMemo, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[（(].*?[）)]/g, '') // remove bracketed details
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function uniqueId(base: string, used: Set<string>) {
  let id = base || 'section';
  let i = 2;
  while (used.has(id)) {
    id = `${base || 'section'}-${i}`;
    i += 1;
  }
  used.add(id);
  return id;
}

export default function TableOfContents(props: { contentSelector?: string }) {
  const contentSelector = props.contentSelector ?? '.js-article-content';
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const hasItems = items.length > 0;
  const itemIds = useMemo(() => items.map((i) => i.id), [items]);
  const visibleItems = useMemo(() => (expanded ? items : items.slice(0, 2)), [expanded, items]);
  const canExpand = items.length > 2;

  useEffect(() => {
    const root = document.querySelector(contentSelector);
    if (!root) return;

    const used = new Set<string>();
    const headings = Array.from(root.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const nextItems: TocItem[] = [];

    for (const h of headings) {
      const level = h.tagName === 'H2' ? 2 : 3;
      const text = (h.textContent || '').trim();
      if (!text) continue;

      if (!h.id) {
        const base = slugify(text);
        h.id = uniqueId(base, used);
      } else {
        used.add(h.id);
      }

      nextItems.push({ id: h.id, text, level });
    }

    setItems(nextItems);
  }, [contentSelector]);

  useEffect(() => {
    if (itemIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]?.target && visible[0].target instanceof HTMLElement) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 1] },
    );

    for (const id of itemIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [itemIds]);

  if (!hasItems) return null;

  return (
    <div className="toc not-prose">
      <details className="toc__details" open>
        <summary className="toc__summary">目次</summary>
        <nav aria-label="目次" className="toc__nav">
          <ol className="toc__list">
            {visibleItems.map((item) => (
              <li key={item.id} className={`toc__item toc__item--h${item.level}`}>
                <a
                  className={`toc__link ${activeId === item.id ? 'toc__link--active' : ''}`}
                  href={`#${item.id}`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {canExpand ? (
          <div className="toc__more">
            <button
              type="button"
              className="toc__moreButton"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? '閉じる' : `残りを表示（${items.length - 2}）`}
            </button>
          </div>
        ) : null}
      </details>
    </div>
  );
}

