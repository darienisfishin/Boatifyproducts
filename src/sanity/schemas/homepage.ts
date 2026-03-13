import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "string" }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "heroCTALabel", title: "CTA Button Label", type: "string" }),
    defineField({ name: "heroCTALink", title: "CTA Button Link", type: "string" }),
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      description: "Up to 4 products shown in the homepage grid.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "partnerBrands",
      title: "Partner Brands Section",
      description: "Product brand cards shown on the homepage.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Brand Name", type: "string" },
            { name: "emoji", title: "Emoji", type: "string" },
            { name: "description", title: "Short Description", type: "string" },
            { name: "href", title: "Link (optional)", type: "string" },
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "boatBrandsDisplay",
      title: "Boat Brands Display",
      description: "Boat manufacturer logos/names shown in the brands section.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Brand Name", type: "string" },
            { name: "emoji", title: "Emoji", type: "string" },
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),
    defineField({
      name: "oemSavingsPercent",
      title: "OEM Savings % (shown in banner)",
      type: "string",
      initialValue: "30",
    }),
  ],
  preview: {
    select: { title: "heroTitle" },
    prepare: () => ({ title: "Homepage" }),
  },
});
