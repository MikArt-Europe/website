import {type CollectionConfig, Payload, PayloadRequest} from "payload";
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    livePreview: {
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/docs"
          : "https://fumadocs-payloadcms.vercel.app",
      breakpoints: [{label: "Mobile", name: "mobile", width: 320, height: 568}],
    },
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
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

export async function seedUsers(payload: Payload, req: PayloadRequest) {
  payload.logger.info("👤 Uploading user avatars & inserting users...");

  await Promise.all(
    [
      {
        name: "Test User",
        email: "test@gmail.com",
        mediaUrl: "https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg",
        roles: ["admin", "user"],
      },
      {
        name: "Demo User",
        email: "demo@gmail.com",
        mediaUrl: "https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg",
        roles: ["user"],
      },
    ].map(async (user) => {
      const fileExtension = user.mediaUrl.split('.').pop();
      const media = await getOrUploadMedia(
        payload,
        req,
        user.mediaUrl,
        `${user.name.replace(/ /g, "-").toLowerCase()}-avatar.${fileExtension}`,
        `${user.name}'s Avatar`
      );

      await payload.create({
        collection: "users",
        data: {
          name: user.name,
          email: user.email,
          password: user.name.split(" ")[0].toLowerCase() || "test",
          avatar: media?.id || null,
          roles: user.roles || ["user"],
        },
      });

      payload.logger.info(`✅ Inserted user: ${user.name}`);
    })
  );
}