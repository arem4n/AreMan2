export interface ModalData {
  title: string;
  body: string;
}

export type Period = {
  id: string;
  year: string;
  label: string;
  description: string;
  newSkills: string[];
  newStack: string[];
  newSectors: string[];
  isDashboard?: boolean;
};
