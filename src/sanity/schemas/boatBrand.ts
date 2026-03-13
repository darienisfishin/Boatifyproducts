import { defineField, defineType } from "sanity";

export default defineType({
  name: "boatBrand",
  title: "Boat Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "models",
      title: "Models",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Model Name", type: "string" },
            {
              name: "years",
              title: "Years Available",
              type: "array",
              of: [{ type: "string" }],
            },
            { name: "description", title: "Description", type: "text", rows: 2 },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "boatType" },
  },
});
