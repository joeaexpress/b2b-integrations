export interface IntegrationRecord {
  slug: string;                  // e.g., "airtable-to-webflow-integration"
  metaTitle: string;             // < 60 characters
  metaDescription: string;       // < 155 characters
  toolA: string;                 // Source tool
  toolACategory: string;         // e.g., "CRM"
  toolB: string;                 // Target tool
  toolBCategory: string;         // e.g., "CMS & Website Builder"
  nativeIntegration: boolean;    // Direct sync vs middleware required
  recommendedMiddleware: string; // e.g., "Make", "Zapier", "None"
  setupTimeMinutes: number;      // e.g., 35
  difficulty: "Easy" | "Intermediate" | "Advanced";
  topUseCases: string[];         // 3 bullet points
  stepByStepGuide: string[];     // 4-5 sequential setup steps
  commonPitfalls: string[];      // 2 common pitfalls
}
