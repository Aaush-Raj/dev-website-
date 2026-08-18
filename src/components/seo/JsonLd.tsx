/**
 * JSON-LD
 * ---------------------------------------------------------------------------
 * Injects a schema.org graph as a <script type="application/ld+json"> tag.
 *
 * React does not escape the contents of a script tag, so we must serialise
 * carefully. `<` is escaped to its unicode form to close off the
 * `</script>`-injection vector — standard practice for embedded JSON-LD.
 *
 * Rendered from a Server Component, so this ships no client JavaScript; the
 * markup is present in the initial HTML where crawlers can see it.
 */

interface JsonLdProps {
  /** One schema object, or several to emit as separate tags. */
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
