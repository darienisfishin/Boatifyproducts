import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "price",
      title: "Retail Price ($)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "wholesalePrice",
      title: "Wholesale Price ($)",
      type: "number",
      description: "OEM/wholesale price. Leave blank for retail-only products.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "zone",
      title: "Boat Zone",
      type: "string",
      description: "Where on a boat this part is installed.",
      options: {
        list: [
          { title: "Bow", value: "bow" },
          { title: "Stern", value: "stern" },
          { title: "Deck", value: "deck" },
          { title: "Helm", value: "helm" },
          { title: "Hull", value: "hull" },
          { title: "Rail", value: "rail" },
          { title: "N/A", value: "n/a" },
        ],
      },
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Part", value: "part" },
          { title: "Apparel", value: "apparel" },
        ],
      },
      initialValue: "part",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Spec Name", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: {
            select: { title: "key", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "compatibility",
      title: "Compatible With",
      type: "array",
      of: [{ type: "string" }],
      description: "List of compatible device/brand names.",
    }),
    defineField({
      name: "variants",
      title: "Variants (Apparel)",
      type: "array",
      description: "Size and color options for apparel products.",
      of: [
        {
          type: "object",
          fields: [
            { name: "variantId", title: "Variant ID", type: "string" },
            {
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "OSFA"],
              },
            },
            { name: "color", title: "Color Name", type: "string" },
            { name: "colorHex", title: "Color Hex", type: "string", description: "e.g. #1e3a5f" },
            { name: "inStock", title: "In Stock", type: "boolean", initialValue: true },
          ],
          preview: {
            select: { title: "color", subtitle: "size" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "sku",
      media: "image",
    },
  },
  orderings: [
    { title: "Name A-Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Price Low-High", name: "priceAsc", by: [{ field: "price", direction: "asc" }] },
  ],
});
