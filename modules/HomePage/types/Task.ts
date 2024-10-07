export interface Task {
  id?: string;
  title: string;
  description: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  dueDate?: Date;
  completed: boolean;
}
