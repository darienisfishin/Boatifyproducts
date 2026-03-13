import { defineField, defineType } from "sanity";

export default defineType({
  name: "boatZone",
  title: "Boat Zone",
  type: "document",
  fields: [
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
      name: "zoneId",
      title: "Zone ID",
      type: "string",
      description: "Unique ID for this zone (e.g. bow, stern, helm).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Display name shown to users.",
    }),
    defineField({
      name: "x",
      title: "X Position (%)",
      type: "number",
      description: "Horizontal position of the hotspot on the boat diagram (0-100).",
    }),
    defineField({
      name: "y",
      title: "Y Position (%)",
      type: "number",
      description: "Vertical position of the hotspot on the boat diagram (0-100).",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "boatType" },
  },
});
