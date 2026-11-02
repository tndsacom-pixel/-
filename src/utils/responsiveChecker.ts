/**
 * Programmatic Responsive & Horizontal Overflow Auditor
 * Runs continuously in dev/preview to detect any elements exceeding viewport width
 */
export function checkHorizontalOverflow(): {
  hasOverflow: boolean;
  scrollWidth: number;
  innerWidth: number;
  overflowingElements: Array<{ tag: string; id: string; className: string; right: number; scrollWidth: number }>;
} {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { hasOverflow: false, scrollWidth: 0, innerWidth: 0, overflowingElements: [] };
  }

  const innerWidth = window.innerWidth;
  const docScrollWidth = document.documentElement.scrollWidth;
  const bodyScrollWidth = document.body ? document.body.scrollWidth : 0;
  const rootScrollWidth = document.getElementById('root')?.scrollWidth || 0;
  const maxScrollWidth = Math.max(docScrollWidth, bodyScrollWidth, rootScrollWidth);

  const overflowingElements: Array<{ tag: string; id: string; className: string; right: number; scrollWidth: number }> = [];

  // Inspect all meaningful elements in the DOM
  const allElements = document.querySelectorAll('div, section, main, header, footer, aside, nav, table, form, img, svg');
  allElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isOverflowingRight = rect.right > innerWidth + 1;
    const isWiderThanViewport = el.scrollWidth > innerWidth + 1;

    if (isOverflowingRight || isWiderThanViewport) {
      overflowingElements.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || 'no-id',
        className: (el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : '') || 'no-class',
        right: Math.round(rect.right),
        scrollWidth: el.scrollWidth
      });
    }
  });

  const hasOverflow = maxScrollWidth > innerWidth + 1;

  if (hasOverflow && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[Responsive Audit] Horizontal overflow detected! Viewport: ${innerWidth}px, Document ScrollWidth: ${maxScrollWidth}px. Found ${overflowingElements.length} exceeding elements.`,
      overflowingElements.slice(0, 5)
    );
  }

  return {
    hasOverflow,
    scrollWidth: maxScrollWidth,
    innerWidth,
    overflowingElements
  };
}
