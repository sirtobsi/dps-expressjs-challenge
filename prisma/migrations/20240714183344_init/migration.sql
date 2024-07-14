-- CreateTable
CREATE TABLE "ProjectDao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReportDao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ReportDao_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectDao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
