#!/usr/bin/env node

/**
 * SEO Verification Script
 * 
 * This script verifies that your SEO elements are properly rendered
 * in the HTML that search engines receive.
 * 
 * Usage:
 *   1. Build your site: npm run build
 *   2. Start production server: npm start
 *   3. Run this script: node scripts/verify-seo.js
 * 
 * Or test a deployed URL:
 *   node scripts/verify-seo.js https://your-domain.com
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const DEFAULT_URL = 'http://localhost:3000';
const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

function checkSEO(html, url) {
  const checks = [];
  
  log('\n🔍 SEO Verification Results', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`Testing: ${url}\n`, 'blue');

  // 1. Meta Description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (metaDescMatch) {
    const desc = metaDescMatch[1];
    checks.push({
      name: 'Meta Description',
      status: '✅',
      found: true,
      value: desc,
      length: desc.length,
      note: desc.length >= 120 && desc.length <= 160 ? 'Optimal length' : 
            desc.length < 120 ? 'Too short (aim for 120-160 chars)' : 
            'Too long (aim for 120-160 chars)',
    });
  } else {
    checks.push({
      name: 'Meta Description',
      status: '❌',
      found: false,
      note: 'Meta description not found',
    });
  }

  // 2. Title Tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    checks.push({
      name: 'Title Tag',
      status: '✅',
      found: true,
      value: title,
      length: title.length,
      note: title.length >= 30 && title.length <= 60 ? 'Optimal length' : 
            title.length < 30 ? 'Too short (aim for 30-60 chars)' : 
            'Too long (aim for 30-60 chars)',
    });
  } else {
    checks.push({
      name: 'Title Tag',
      status: '❌',
      found: false,
      note: 'Title tag not found',
    });
  }

  // 3. Open Graph Tags
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const ogUrl = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
  
  const ogCount = [ogTitle, ogDesc, ogImage, ogUrl].filter(Boolean).length;
  checks.push({
    name: 'Open Graph Tags',
    status: ogCount >= 3 ? '✅' : '⚠️',
    found: ogCount > 0,
    value: `${ogCount}/4 tags found`,
    note: ogCount >= 3 ? 'Good coverage' : `Missing ${4 - ogCount} recommended tags`,
  });

  // 4. Twitter Card Tags
  const twitterCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i);
  const twitterTitle = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i);
  const twitterCount = [twitterCard, twitterTitle].filter(Boolean).length;
  checks.push({
    name: 'Twitter Card Tags',
    status: twitterCount >= 2 ? '✅' : '⚠️',
    found: twitterCount > 0,
    value: `${twitterCount}/2 tags found`,
    note: twitterCount >= 2 ? 'Good coverage' : 'Consider adding Twitter Card tags',
  });

  // 5. Structured Data (JSON-LD)
  const jsonLdMatches = html.match(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches && jsonLdMatches.length > 0) {
    const schemaTypes = [];
    jsonLdMatches.forEach((match) => {
      const contentMatch = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (contentMatch) {
        try {
          const json = JSON.parse(contentMatch[1]);
          if (json['@type']) {
            schemaTypes.push(json['@type']);
          }
        } catch (e) {
          // Invalid JSON, skip
        }
      }
    });
    
    checks.push({
      name: 'Structured Data (JSON-LD)',
      status: '✅',
      found: true,
      value: `${jsonLdMatches.length} schema block(s) found`,
      schemas: schemaTypes,
      note: schemaTypes.length > 0 ? `Types: ${schemaTypes.join(', ')}` : 'No @type found',
    });
  } else {
    checks.push({
      name: 'Structured Data (JSON-LD)',
      status: '❌',
      found: false,
      note: 'No JSON-LD structured data found',
    });
  }

  // 6. Canonical URL
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  checks.push({
    name: 'Canonical URL',
    status: canonical ? '✅' : '⚠️',
    found: !!canonical,
    value: canonical ? canonical[1] : 'Not found',
    note: canonical ? 'Canonical URL set' : 'Consider adding canonical URL',
  });

  // 7. H1 Tag
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  const h1Count = h1Matches ? h1Matches.length : 0;
  checks.push({
    name: 'H1 Heading',
    status: h1Count === 1 ? '✅' : h1Count > 1 ? '⚠️' : '❌',
    found: h1Count > 0,
    value: `${h1Count} H1 tag(s) found`,
    note: h1Count === 1 ? 'Perfect (one H1 per page)' : 
          h1Count > 1 ? 'Multiple H1s - consider using only one' : 
          'No H1 tag found',
  });

  // 8. Image Alt Text (sample check)
  const images = html.match(/<img[^>]+>/gi) || [];
  const imagesWithAlt = images.filter(img => /alt=["'][^"']+["']/i.test(img));
  const altPercentage = images.length > 0 ? Math.round((imagesWithAlt.length / images.length) * 100) : 100;
  checks.push({
    name: 'Image Alt Text',
    status: altPercentage >= 80 ? '✅' : altPercentage >= 50 ? '⚠️' : '❌',
    found: imagesWithAlt.length > 0,
    value: `${imagesWithAlt.length}/${images.length} images have alt text (${altPercentage}%)`,
    note: altPercentage >= 80 ? 'Good coverage' : 'Consider adding alt text to more images',
  });

  // 9. Robots Meta Tag
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  checks.push({
    name: 'Robots Meta Tag',
    status: robots ? '✅' : '⚠️',
    found: !!robots,
    value: robots ? robots[1] : 'Not found (defaults to index, follow)',
    note: robots ? 'Robots directive set' : 'Using default (index, follow)',
  });

  // 10. Language Tag
  const lang = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  checks.push({
    name: 'Language Tag',
    status: lang ? '✅' : '⚠️',
    found: !!lang,
    value: lang ? lang[1] : 'Not found',
    note: lang ? 'Language specified' : 'Consider adding lang attribute to <html>',
  });

  return checks;
}

function displayResults(checks) {
  checks.forEach((check) => {
    log(`\n${check.status} ${check.name}`, check.status.includes('✅') ? 'green' : 
        check.status.includes('⚠️') ? 'yellow' : 'red');
    
    if (check.found) {
      if (check.value) {
        log(`   Value: ${check.value}`, 'reset');
      }
      if (check.length) {
        log(`   Length: ${check.length} characters`, 'reset');
      }
      if (check.schemas) {
        log(`   Schemas: ${check.schemas.join(', ')}`, 'reset');
      }
    }
    
    log(`   ${check.note}`, 'reset');
  });

  const passed = checks.filter(c => c.status.includes('✅')).length;
  const warnings = checks.filter(c => c.status.includes('⚠️')).length;
  const failed = checks.filter(c => c.status.includes('❌')).length;

  log('\n' + '='.repeat(60), 'cyan');
  log('\n📊 Summary', 'cyan');
  log(`   ✅ Passed: ${passed}/${checks.length}`, 'green');
  log(`   ⚠️  Warnings: ${warnings}/${checks.length}`, 'yellow');
  log(`   ❌ Failed: ${failed}/${checks.length}`, 'red');
  
  if (passed === checks.length) {
    log('\n🎉 Excellent! All SEO checks passed!', 'green');
  } else if (failed === 0) {
    log('\n✨ Good! Minor improvements recommended.', 'yellow');
  } else {
    log('\n⚠️  Some SEO elements need attention.', 'yellow');
  }
}

async function main() {
  const url = process.argv[2] || DEFAULT_URL;
  
  log('\n🚀 SEO Verification Tool', 'cyan');
  log('='.repeat(60), 'cyan');
  
  try {
    log(`\n📡 Fetching HTML from ${url}...`, 'blue');
    const html = await fetchHTML(url);
    log(`✅ Successfully fetched ${html.length} characters`, 'green');
    
    const checks = checkSEO(html, url);
    displayResults(checks);
    
    log('\n💡 Tip: View the raw HTML in your browser (View Page Source)', 'blue');
    log('   to see exactly what search engines receive.\n', 'blue');
    
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    
    if (url === DEFAULT_URL) {
      log('\n💡 Make sure your Next.js server is running:', 'yellow');
      log('   1. Run: npm run build', 'reset');
      log('   2. Run: npm start', 'reset');
      log('   3. Then run this script again\n', 'reset');
    } else {
      log('\n💡 Make sure the URL is correct and accessible.\n', 'yellow');
    }
    
    process.exit(1);
  }
}

main();

