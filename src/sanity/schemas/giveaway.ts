import { defineField, defineType } from "sanity";

export default defineType({
  name: "giveaway",
  title: "Giveaway",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: "subtitle",
      title: "Page Tagline",
      type: "string",
      description: "Shown above the main title (e.g. \"Something Big Is Coming\")",
    }),
    defineField({
      name: "title",
      title: "Giveaway Headline",
      type: "string",
      description: "Main prize headline (e.g. \"Win a $5,000 Boatify Package\")",
    }),
    defineField({
      name: "description",
      title: "Giveaway Description",
      type: "text",
      rows: 4,
      description: "A few sentences describing the giveaway and how to enter.",
    }),
    defineField({
      name: "prizeDetails",
      title: "Prize Details",
      type: "text",
      rows: 4,
      description: "Describe exactly what the winner receives.",
    }),
    defineField({
      name: "endDate",
      title: "Giveaway End Date",
      type: "datetime",
      description: "Drives the countdown timer on the page. Leave blank to hide the timer.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Submit Button Label",
      type: "string",
      description: "Text on the entry form button (default: \"Enter to Win\")",
    }),
    defineField({
      name: "prizeImage",
      title: "Prize Image",
      type: "image",
      description: "Photo of the prize — displayed on the giveaway page.",
      options: { hotspot: true },
    }),
  ],
});
