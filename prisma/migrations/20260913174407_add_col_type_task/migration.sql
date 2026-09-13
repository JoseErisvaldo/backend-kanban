-- CreateEnum
CREATE TYPE "task_type" AS ENUM ('BUG', 'FEATURE', 'IMPROVEMENT', 'CHORE', 'RESEARCH', 'HOTFIX', 'DESIGN', 'TEST');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "type" "task_type" NOT NULL DEFAULT 'FEATURE';
