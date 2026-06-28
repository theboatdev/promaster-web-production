export type Career = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  tags: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  sortOrder?: number;
  applyEmail?: string;
};
