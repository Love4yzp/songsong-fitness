import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

/** Rehype plugin: prepend Astro `base` to internal href/src attributes. */
export default function rehypeBaseUrl(options: { base: string }) {
  const base = options.base.replace(/\/$/, '');
  if (!base) return () => {};

  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      for (const attr of ['href', 'src'] as const) {
        const val = node.properties?.[attr];
        if (typeof val === 'string' && val.startsWith('/') && !val.startsWith('//')) {
          node.properties[attr] = `${base}${val}`;
        }
      }
    });
  };
}
