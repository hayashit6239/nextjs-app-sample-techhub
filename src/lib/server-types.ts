export type ProjectWithDepartmentName = {
  id: number;
  name: string;
  description: string;
  representativeName: string;
  representativeEmail: string;
  departmentName: string;
}

type Techtopic = {
  id: number;
  name: string;
  techcategoryName: string;
}

export type Adoption = {
  id: number;
  projectId: number;
  techtopic: Techtopic;
  version: string;
  purpose: string;
  // adopted_at: Date;
}

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
}
