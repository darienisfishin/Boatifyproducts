import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 2 }),
    defineField({
      name: "storyContent",
      title: "Story Content",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text. Will be rendered as paragraphs on the about page.",
    }),
    defineField({
      name: "founders",
      title: "Founders / Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string" },
            { name: "title", title: "Title / Role", type: "string" },
            { name: "emoji", title: "Emoji", type: "string" },
            { name: "bio", title: "Bio", type: "text", rows: 3 },
            {
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "photo" },
          },
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Company Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Value", type: "string" },
            { name: "emoji", title: "Emoji", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
