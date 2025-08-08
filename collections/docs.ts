import type {CollectionConfig, Payload} from "payload";

export const Docs: CollectionConfig = {
  slug: 'docs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};

export default Docs;
