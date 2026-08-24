import type { IntegrationRecord } from '../types/integration';
import defaultIntegrations from '../data/integrations.json';

/**
 * Standard URL slug generator for tools and categories.
 * Converts "CRM & Sales" -> "crm-sales", "Google Sheets" -> "google-sheets"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface ToolMetadata {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  integrations: IntegrationRecord[];
  nativeCount: number;
  middlewareCount: number;
  avgSetupTime: number;
}

export interface CategoryMetadata {
  name: string;
  slug: string;
  tools: string[];
  integrations: IntegrationRecord[];
  nativeCount: number;
  middlewareCount: number;
  avgSetupTime: number;
}

/**
 * Extracts and aggregates all unique tools from the integrations dataset.
 */
export function getAllTools(records: IntegrationRecord[] = defaultIntegrations as IntegrationRecord[]): ToolMetadata[] {
  const toolMap = new Map<string, { category: string; integrations: IntegrationRecord[] }>();

  records.forEach((record) => {
    // Tool A
    if (!toolMap.has(record.toolA)) {
      toolMap.set(record.toolA, { category: record.toolACategory, integrations: [] });
    }
    toolMap.get(record.toolA)!.integrations.push(record);

    // Tool B
    if (!toolMap.has(record.toolB)) {
      toolMap.set(record.toolB, { category: record.toolBCategory, integrations: [] });
    }
    toolMap.get(record.toolB)!.integrations.push(record);
  });

  return Array.from(toolMap.entries())
    .map(([name, data]) => {
      const integrations = data.integrations;
      const nativeCount = integrations.filter((i) => i.nativeIntegration).length;
      const middlewareCount = integrations.length - nativeCount;
      const totalTime = integrations.reduce((acc, curr) => acc + curr.setupTimeMinutes, 0);
      const avgSetupTime = Math.round(totalTime / (integrations.length || 1));

      return {
        name,
        slug: slugify(name),
        category: data.category,
        categorySlug: slugify(data.category),
        integrations,
        nativeCount,
        middlewareCount,
        avgSetupTime,
      };
    })
    .sort((a, b) => b.integrations.length - a.integrations.length || a.name.localeCompare(b.name));
}

/**
 * Extracts and aggregates all unique categories from the integrations dataset.
 */
export function getAllCategories(records: IntegrationRecord[] = defaultIntegrations as IntegrationRecord[]): CategoryMetadata[] {
  const categoryMap = new Map<
    string,
    { tools: Set<string>; integrations: Set<IntegrationRecord> }
  >();

  records.forEach((record) => {
    // Category A
    if (!categoryMap.has(record.toolACategory)) {
      categoryMap.set(record.toolACategory, { tools: new Set(), integrations: new Set() });
    }
    categoryMap.get(record.toolACategory)!.tools.add(record.toolA);
    categoryMap.get(record.toolACategory)!.integrations.add(record);

    // Category B
    if (!categoryMap.has(record.toolBCategory)) {
      categoryMap.set(record.toolBCategory, { tools: new Set(), integrations: new Set() });
    }
    categoryMap.get(record.toolBCategory)!.tools.add(record.toolB);
    categoryMap.get(record.toolBCategory)!.integrations.add(record);
  });

  return Array.from(categoryMap.entries())
    .map(([name, data]) => {
      const integrations = Array.from(data.integrations);
      const nativeCount = integrations.filter((i) => i.nativeIntegration).length;
      const middlewareCount = integrations.length - nativeCount;
      const totalTime = integrations.reduce((acc, curr) => acc + curr.setupTimeMinutes, 0);
      const avgSetupTime = Math.round(totalTime / (integrations.length || 1));

      return {
        name,
        slug: slugify(name),
        tools: Array.from(data.tools).sort(),
        integrations,
        nativeCount,
        middlewareCount,
        avgSetupTime,
      };
    })
    .sort((a, b) => b.integrations.length - a.integrations.length || a.name.localeCompare(b.name));
}
