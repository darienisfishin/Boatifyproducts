import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset, apiVersion } from "./src/sanity/env";

// Singletons — only one document of each type should exist
const singletonTypes = new Set(["homepage", "aboutPage"]);

export default defineConfig({
  name: "boatify-studio",
  title: "Boatify CMS",
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage")),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.divider(),
            // Collections
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("brand").title("Brands"),
            S.divider(),
            S.documentTypeListItem("boatBrand").title("Boat Brands"),
            S.documentTypeListItem("boatZone").title("Boat Zones"),
            S.documentTypeListItem("boatRecommendation").title("Boat Recommendations"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Filter out singletons from "New Document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
