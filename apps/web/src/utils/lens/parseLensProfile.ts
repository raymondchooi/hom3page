export type parselensprofileSearch = "handle" | "image";

export default function parseLensProfile(
  profile,
  lookingFfor: parselensprofileSearch,
) {
  if (lookingFfor === "handle") return profile.handle?.localName;
  if (lookingFfor === "image") return profile.metadata.picture.optimized.uri;
}
