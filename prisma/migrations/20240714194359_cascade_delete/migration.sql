-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReportDao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ReportDao_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectDao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ReportDao" ("id", "projectId", "text") SELECT "id", "projectId", "text" FROM "ReportDao";
DROP TABLE "ReportDao";
ALTER TABLE "new_ReportDao" RENAME TO "ReportDao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
