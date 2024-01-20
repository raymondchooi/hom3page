export type parselensprofileSearch = "handle" | "image";

export default function parseLensProfile(
  profile: { handle: { localName: any; }; metadata: { picture: { optimized: { uri: any; }; }; }; },
  lookingFor: parselensprofileSearch,
) {
  if (lookingFor === "handle") return profile?.handle?.localName;
  if (lookingFor === "image") return profile?.metadata?.picture?.optimized?.uri;
}
