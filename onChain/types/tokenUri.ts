/** @format */

export type Attributes = {
  display_type?: string;
  trait_type: string;
  value: string | number | boolean;
};
export interface BlockTokenMeta {
  description: string;
  external_url: string;
  image: string;
  name: string;
  title: string;
  attributes: Attributes[];
}

export interface BAppTokenMeta {}
