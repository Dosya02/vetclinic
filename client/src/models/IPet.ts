export interface IPet {
  id: string;
  name: string;
  type: 'dog' | 'rabbit' | 'lizard';
  imageUrl?: string;
}