-- CreateTable
CREATE TABLE "projects" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "representativeName" TEXT NOT NULL,
    "representativeEmail" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "projects_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "techcategories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "techtopics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "techcategoryId" INTEGER NOT NULL,
    CONSTRAINT "techtopics_techcategoryId_fkey" FOREIGN KEY ("techcategoryId") REFERENCES "techcategories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "adoptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "techtopicId" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    CONSTRAINT "adoptions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adoptions_techtopicId_fkey" FOREIGN KEY ("techtopicId") REFERENCES "techtopics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
