import { defineField, defineType } from "sanity";

export default defineType({
  name: "boatRecommendation",
  title: "Boat Recommendation",
  type: "document",
  fields: [
    defineField({
      name: "modelName",
      title: "Boat Model",
      type: "string",
      description: "e.g. Ranger Z520L, Bennington QX Sport",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brandSlug",
      title: "Brand Slug",
      type: "string",
      description: "Lowercase brand identifier (e.g. ranger, bennington).",
    }),
    defineField({
      name: "boatType",
      title: "Boat Type",
      type: "string",
      options: {
        list: [
          { title: "Bass Boat", value: "bass" },
          { title: "Pontoon", value: "pontoon" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Boat Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "recommendedProducts",
      title: "Recommended Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            },
            { name: "note", title: "Why it fits", type: "text", rows: 2 },
            { name: "category", title: "Category Label", type: "string" },
          ],
          preview: {
            select: {
              title: "product.name",
              subtitle: "note",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "modelName", subtitle: "boatType", media: "image" },
  },
});
