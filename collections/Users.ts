import {type CollectionConfig, Payload, PayloadRequest} from "payload";
import { env } from '@/env.mjs'
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    livePreview: {
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/docs"
          : env.NEXT_PUBLIC_URL + "/docs",
      breakpoints: [{label: "Mobile", name: "mobile", width: 320, height: 568}],
    },
    useAsTitle: 'email',
  },
  fields: [
      {
        name: "roles",
        type: "select",
        defaultValue: ["user"],
        hasMany: true,
        options: [
          {label: "admin", value: "admin"},
          {label: "user", value: "user"},
        ],
        saveToJWT: true,
      },
      {name: "name", type: "text", label: "Name"},
      {
        name: "avatar",
        type: "upload",
        relationTo: "media",
        label: "Avatar",
      },
  ],
}

export async function getOrUploadMedia(
  payload: Payload,
  req: PayloadRequest,
  url: string | undefined,
  filename: string,
  alt: string
): Promise<File | null> {
  if (!url) return null;

  try {
    const existingMedia = await payload.find({
      collection: "media",
      where: {alt: {equals: alt}},
      limit: 1,
    });

    if (existingMedia.docs.length > 0) {
      payload.logger.info(
        `🔄 Reusing existing media: ${filename} (alt: ${alt})`
      );
      return existingMedia.docs[0];
    }

    payload.logger.info(`📥 Fetching image: ${url}`);
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Failed to fetch ${url}, status: ${res.status}`);

    const data = Buffer.from(await res.arrayBuffer());

    const contentType =
      res.headers.get("content-type") || "application/octet-stream";

    const uploadedFile = await payload.create({
      collection: "media",
      file: {
        name: filename,
        data,
        mimetype: contentType,
        size: data.length,
      },
      data: {alt},
    });

    payload.logger.info(`✅ Uploaded image: ${filename}`);
    return uploadedFile;
  } catch (error) {
    payload.logger.warn(
      `⚠ Error handling media (${filename}): ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}
