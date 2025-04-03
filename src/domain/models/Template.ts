export enum TemplateAlignment {
  Left = "LEFT",
  Center = "CENTER",
  Right = "RIGHT",
}

export interface Template {
  id: string;
  name: string;
  alignment: TemplateAlignment;
}
