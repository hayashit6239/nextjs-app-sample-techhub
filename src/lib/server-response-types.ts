export type ResTechtopic = {
    id: number
    name: string;
    version: string;
    purpose: string;
    techcategoryName: string;
    adoptionId: number;
}

export type ResProject = {
    id: number;
    name: string;
    description: string;
    representativeName: string;
    representativeEmail: string;
    departmentName: string;
    techtopics: ResTechtopic[];
}

export type ResUser = {
    id: number;
    name: string;
    projectIds: number[];
}
