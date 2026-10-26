import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogType?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogImage?: string;
  twitterSite?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  author?: string;
  canonical?: string;
  robots?: string;
  publisher?: string;
  ogLocale?: string;
  schema?: Record<string, any>;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Ensures there is strictly ONE <title> tag in the entire document head.
 * Updates its textContent to match the desired page title and removes any duplicate title tags.
 */
function enforceSingleTitle(title: string) {
  if (typeof document === "undefined") return;

  document.title = title;
  const allTitles = Array.from(document.querySelectorAll("head title"));
  const primaryTitle = document.getElementById("metaTitle") || allTitles[0];

  if (primaryTitle) {
    if (primaryTitle.textContent !== title) {
      primaryTitle.textContent = title;
    }
    allTitles.forEach((t) => {
      if (t !== primaryTitle) {
        t.remove();
      }
    });
  } else {
    const newTitle = document.createElement("title");
    newTitle.id = "metaTitle";
    newTitle.textContent = title;
    document.head.prepend(newTitle);
  }
}

/**
 * Updates a meta tag by ID and selector, while strictly removing any duplicate tags.
 */
function setSingleMeta(
  id: string,
  queryAttr: { name?: string; property?: string },
  content: string
) {
  if (typeof document === "undefined") return;

  const selector = queryAttr.name
    ? `meta[name="${queryAttr.name}"]`
    : `meta[property="${queryAttr.property}"]`;

  const matching = Array.from(document.querySelectorAll(selector)) as HTMLMetaElement[];
  let el = (document.getElementById(id) as HTMLMetaElement | null) || matching[0];

  if (!el) {
    el = document.createElement("meta");
    el.id = id;
    if (queryAttr.name) el.setAttribute("name", queryAttr.name);
    if (queryAttr.property) el.setAttribute("property", queryAttr.property);
    const refNode = document.getElementById("metaTitle") || document.querySelector("title");
    if (refNode && refNode.nextSibling) {
      document.head.insertBefore(el, refNode.nextSibling);
    } else {
      document.head.appendChild(el);
    }
  } else if (!el.id) {
    el.id = id;
  }

  el.setAttribute("content", content);

  // Remove ALL duplicate tags matching selector or ID
  matching.forEach((m) => {
    if (m !== el) {
      m.remove();
    }
  });

  if (id) {
    const byId = Array.from(document.querySelectorAll(`#${id}`));
    byId.forEach((b) => {
      if (b !== el) {
        b.remove();
      }
    });
  }
}

/**
 * Updates canonical link, ensuring exactly ONE canonical tag exists.
 */
function setSingleCanonical(canonicalUrl: string) {
  if (typeof document === "undefined") return;

  const canonicalLinks = Array.from(
    document.querySelectorAll('link[rel="canonical"]')
  ) as HTMLLinkElement[];

  let canonEl =
    (document.getElementById("canonical") as HTMLLinkElement | null) ||
    canonicalLinks[0];

  if (!canonEl) {
    canonEl = document.createElement("link");
    canonEl.id = "canonical";
    canonEl.setAttribute("rel", "canonical");
    const refNode = document.getElementById("metaTitle") || document.querySelector("title");
    if (refNode && refNode.nextSibling) {
      document.head.insertBefore(canonEl, refNode.nextSibling);
    } else {
      document.head.appendChild(canonEl);
    }
  } else if (!canonEl.id) {
    canonEl.id = "canonical";
  }

  canonEl.setAttribute("href", canonicalUrl);

  // Prune any duplicate canonical links
  canonicalLinks.forEach((c) => {
    if (c !== canonEl) {
      c.remove();
    }
  });
}

/**
 * Updates og:locale, ensuring exactly ONE tag exists.
 */
function setSingleLocale(locale: string) {
  if (typeof document === "undefined") return;

  const localeMetas = Array.from(
    document.querySelectorAll('meta[property="og:locale"]')
  ) as HTMLMetaElement[];

  let localeEl = localeMetas[0];
  if (!localeEl) {
    localeEl = document.createElement("meta");
    localeEl.setAttribute("property", "og:locale");
    document.head.appendChild(localeEl);
  }
  localeEl.setAttribute("content", locale);

  localeMetas.forEach((l) => {
    if (l !== localeEl) {
      l.remove();
    }
  });
}

export function updateSEODOM(props: SEOProps) {
  if (typeof document === "undefined") return;

  const {
    title,
    description,
    keywords = "video production company, creative production agency, video production services, corporate video production, brand film production, video production company in bangalore, video production agency in bangalore",
    ogTitle = title,
    ogType = "website",
    ogDescription = description,
    ogUrl = typeof window !== "undefined" ? window.location.href : "https://viyana.productions",
    ogSiteName = "Viyana Productions",
    ogImage = "https://viyana.productions/logo-black.png",
    twitterSite = "https://twitter.com/",
    twitterTitle = ogTitle,
    twitterDescription = ogDescription,
    author = "Akshay",
    canonical = ogUrl,
    robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    publisher = "Viyana Productions",
    ogLocale = "en_US",
    schema,
  } = props;

  // 1. Maintain strictly ONE title tag in the DOM
  enforceSingleTitle(title);

  // 2. Update all core SEO tags (strictly 1 instance of each)
  setSingleMeta("metaDescription", { name: "description" }, description);
  if (keywords) setSingleMeta("metaKeywords", { name: "keywords" }, keywords);
  setSingleMeta("ogTitle", { property: "og:title" }, ogTitle);
  setSingleMeta("ogType", { property: "og:type" }, ogType);
  setSingleMeta("ogDescription", { property: "og:description" }, ogDescription);
  setSingleMeta("ogUrl", { property: "og:url" }, ogUrl);
  setSingleMeta("ogSiteName", { property: "og:site_name" }, ogSiteName);
  setSingleMeta("ogImage", { property: "og:image" }, ogImage);
  setSingleMeta("twitterSite", { name: "twitter:site" }, twitterSite);
  setSingleMeta("twitterTitle", { name: "twitter:title" }, twitterTitle);
  setSingleMeta("twitterDescription", { name: "twitter:description" }, twitterDescription);
  setSingleMeta("author", { name: "author" }, author);
  setSingleMeta("indexingStatus", { name: "robots" }, robots);
  setSingleMeta("Publisher", { property: "publisher" }, publisher);

  // 3. Update Canonical Link (strictly 1 instance)
  setSingleCanonical(canonical);

  // 4. Update og:locale (strictly 1 instance)
  setSingleLocale(ogLocale);

  // 5. Schema JSON-LD if provided
  if (schema) {
    let schemaEl = document.getElementById("pageSchema") as HTMLScriptElement | null;
    if (!schemaEl) {
      schemaEl = document.createElement("script");
      schemaEl.id = "pageSchema";
      schemaEl.type = "application/ld+json";
      document.head.appendChild(schemaEl);
    }
    schemaEl.textContent = JSON.stringify(schema);
  }
}

/**
 * HeadMetaSynchronizer:
 * Continuously monitors <head> to ensure:
 * 1. Strictly ONE <title> tag exists across all pages.
 * 2. Strictly ONE instance of each meta tag and canonical link exists.
 * 3. Immediately prunes any duplicate tags spawned by Helmet or React 19.
 */
export function HeadMetaSynchronizer() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pruneDuplicatesAndSync = () => {
      if (typeof document === "undefined") return;

      // 1. Enforce strictly ONE title
      const currentTitle = document.title;
      const allTitles = Array.from(document.querySelectorAll("head title"));
      if (allTitles.length > 0) {
        const primary = document.getElementById("metaTitle") || allTitles[0];
        if (currentTitle && primary.textContent !== currentTitle) {
          primary.textContent = currentTitle;
        }
        allTitles.forEach((t) => {
          if (t !== primary) {
            t.remove();
          }
        });
      }

      // 2. Prune duplicates for each standard SEO tag
      const metaSelectors = [
        'meta[name="description"]',
        'meta[name="keywords"]',
        'meta[property="og:title"]',
        'meta[property="og:type"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:site_name"]',
        'meta[property="og:image"]',
        'meta[name="twitter:site"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="author"]',
        'meta[name="robots"]',
        'meta[property="publisher"]',
        'meta[property="og:locale"]',
      ];

      metaSelectors.forEach((sel) => {
        const elements = Array.from(document.querySelectorAll(sel));
        if (elements.length > 1) {
          // Keep the first one (which has ID) and remove duplicates
          for (let i = 1; i < elements.length; i++) {
            elements[i].remove();
          }
        }
      });

      // 3. Prune duplicate canonical links
      const canons = Array.from(document.querySelectorAll('link[rel="canonical"]'));
      if (canons.length > 1) {
        for (let i = 1; i < canons.length; i++) {
          canons[i].remove();
        }
      }

      // 4. Prune any stray [data-rh="true"] duplicates that Helmet may have appended
      const rhTags = Array.from(document.querySelectorAll("head [data-rh='true']"));
      rhTags.forEach((rhEl) => {
        rhEl.remove();
      });
    };

    pruneDuplicatesAndSync();
    const t1 = setTimeout(pruneDuplicatesAndSync, 20);
    const t2 = setTimeout(pruneDuplicatesAndSync, 80);

    const observer = new MutationObserver(() => {
      pruneDuplicatesAndSync();
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

/**
 * SEO Component:
 * Synchronously manages the single canonical set of SEO tags in document.head.
 * Returns null to eliminate all duplicate tags created by Helmet or React 19 JSX hoisting.
 */
export default function SEO(props: SEOProps) {
  useIsomorphicLayoutEffect(() => {
    updateSEODOM(props);
  }, [
    props.title,
    props.description,
    props.keywords,
    props.ogTitle,
    props.ogDescription,
    props.ogUrl,
    props.ogImage,
    props.canonical,
    props.robots,
  ]);

  return null;
}
