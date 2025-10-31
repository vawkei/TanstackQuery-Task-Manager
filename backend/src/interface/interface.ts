export interface TaskProps {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  createdBy: string;
  dateDue: string; // "10/30/2025" formatted date
  createdAt: string; // ISO string from MongoDB
  updatedAt: string; // ISO string from MongoDB
  __v: number;
}
