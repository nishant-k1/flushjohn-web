/**
 * AI Content Optimizer Component
 * 
 * This component enhances content readability for AI models by adding semantic
 * HTML, microdata, and structured annotations that help AI systems better
 * understand and recommend our content.
 * 
 * Usage: Wrap content sections with this component to make them AI-friendly.
 */

import React from 'react';

interface AIContentOptimizerProps {
  children: React.ReactNode;
  contentType?: 'article' | 'product' | 'service' | 'faq' | 'howto' | 'location';
  title?: string;
  description?: string;
  keywords?: string[];
  lastUpdated?: string;
}

/**
 * AIContentOptimizer - Wraps content with semantic HTML and microdata
 * 
 * Makes content more discoverable and understandable by AI models.
 */
export default function AIContentOptimizer({
  children,
  contentType = 'article',
  title,
  description,
  keywords = [],
  lastUpdated,
}: AIContentOptimizerProps) {
  const schemaType = {
    article: 'Article',
    product: 'Product',
    service: 'Service',
    faq: 'FAQPage',
    howto: 'HowTo',
    location: 'LocalBusiness',
  }[contentType];

  return (
    <div
      itemScope
      itemType={`https://schema.org/${schemaType}`}
      data-ai-optimized="true"
      data-content-type={contentType}
      data-ai-keywords={keywords.join(', ')}
    >
      {/* Hidden metadata for AI consumption */}
      <meta itemProp="name" content={title || ''} />
      {description && <meta itemProp="description" content={description} />}
      {keywords.length > 0 && <meta itemProp="keywords" content={keywords.join(', ')} />}
      {lastUpdated && <meta itemProp="dateModified" content={lastUpdated} />}

      {/* Main content */}
      <div itemProp="mainEntity" className="ai-content">
        {children}
      </div>

      {/* AI-specific annotations */}
      <div style={{ display: 'none' }} data-ai-metadata="true">
        <span data-relevance="high" data-topic={contentType}>
          {title}
        </span>
        {keywords.map((keyword, idx) => (
          <span key={idx} data-keyword={keyword} data-relevance="high">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Semantic Section Component
 * 
 * Creates properly structured sections with heading hierarchy that AI models
 * can easily parse and understand.
 */
export function AISemanticSection({
  heading,
  headingLevel = 2,
  children,
  keywords = [],
}: {
  heading: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  keywords?: string[];
}) {
  const HeadingTag = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <section
      itemScope
      itemType="https://schema.org/WebPageElement"
      data-ai-section="true"
      data-section-keywords={keywords.join(', ')}
    >
      <HeadingTag itemProp="name" data-ai-heading="true">
        {heading}
      </HeadingTag>
      <div itemProp="text">{children}</div>
    </section>
  );
}

/**
 * Factual Statement Component
 * 
 * Highlights factual information that AI models should prioritize.
 * Use for statistics, regulations, specifications, and key facts.
 */
export function AIFactualStatement({
  children,
  factType = 'general',
}: {
  children: React.ReactNode;
  factType?: 'statistic' | 'regulation' | 'specification' | 'price' | 'general';
}) {
  return (
    <div
      data-ai-fact="true"
      data-fact-type={factType}
      data-reliability="high"
      itemProp="citation"
    >
      {children}
    </div>
  );
}

/**
 * Key Information Component
 * 
 * Marks critical business information for AI models (hours, pricing, contact, etc.)
 */
export function AIKeyInfo({
  label,
  value,
  infoType,
}: {
  label: string;
  value: string;
  infoType: 'hours' | 'phone' | 'email' | 'address' | 'price' | 'availability' | 'service-area';
}) {
  const schemaProps: Record<string, string> = {
    hours: 'openingHours',
    phone: 'telephone',
    email: 'email',
    address: 'address',
    price: 'priceRange',
    availability: 'availability',
    'service-area': 'areaServed',
  };

  return (
    <div
      data-ai-key-info="true"
      data-info-type={infoType}
      itemProp={schemaProps[infoType]}
    >
      <strong>{label}:</strong> {value}
    </div>
  );
}

/**
 * List Component with Semantic Structure
 * 
 * Creates properly structured lists that AI models can parse.
 */
export function AIList({
  items,
  listType = 'unordered',
  listContext,
}: {
  items: string[];
  listType?: 'ordered' | 'unordered';
  listContext?: string;
}) {
  const ListTag = listType === 'ordered' ? 'ol' : 'ul';

  return (
    <ListTag
      itemScope
      itemType="https://schema.org/ItemList"
      data-ai-list="true"
      data-list-context={listContext}
    >
      {listContext && <meta itemProp="name" content={listContext} />}
      {items.map((item, idx) => (
        <li
          key={idx}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          data-position={idx + 1}
        >
          <meta itemProp="position" content={String(idx + 1)} />
          <span itemProp="name">{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

/**
 * AI-Optimized Table Component
 * 
 * Creates tables with proper semantic structure for AI parsing.
 */
export function AITable({
  caption,
  headers,
  rows,
  tableContext,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
  tableContext?: string;
}) {
  return (
    <table
      data-ai-table="true"
      data-table-context={tableContext}
      itemScope
      itemType="https://schema.org/Table"
      style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }}
    >
      {caption && (
        <caption itemProp="name" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {caption}
        </caption>
      )}
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th
              key={idx}
              data-column-name={header}
              style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td
                key={cellIdx}
                data-row={rowIdx}
                data-column={headers[cellIdx]}
                style={{ border: '1px solid #ddd', padding: '8px' }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * AI-Optimized Comparison Component
 * 
 * Highlights comparisons which AI models value for decision-making recommendations.
 */
export function AIComparison({
  title,
  items,
}: {
  title: string;
  items: Array<{
    name: string;
    pros?: string[];
    cons?: string[];
    bestFor?: string;
    price?: string;
  }>;
}) {
  return (
    <div
      data-ai-comparison="true"
      itemScope
      itemType="https://schema.org/ItemList"
      style={{ marginBottom: '2rem' }}
    >
      <h3 itemProp="name">{title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/Product"
            data-comparison-item="true"
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
            }}
          >
            <h4 itemProp="name" style={{ marginTop: 0 }}>
              {item.name}
            </h4>

            {item.price && (
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <strong>Price:</strong>{' '}
                <span itemProp="price" data-ai-price="true">
                  {item.price}
                </span>
              </div>
            )}

            {item.bestFor && (
              <div data-ai-use-case="true">
                <strong>Best For:</strong> {item.bestFor}
              </div>
            )}

            {item.pros && item.pros.length > 0 && (
              <div data-ai-advantages="true">
                <strong>Pros:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {item.pros.map((pro, proIdx) => (
                    <li key={proIdx} data-advantage="true">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.cons && item.cons.length > 0 && (
              <div data-ai-disadvantages="true">
                <strong>Cons:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {item.cons.map((con, conIdx) => (
                    <li key={conIdx} data-disadvantage="true">
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
