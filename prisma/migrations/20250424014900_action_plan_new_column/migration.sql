/*
  Warnings:

  - You are about to alter the column `client_id` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `status` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - A unique constraint covering the columns `[project_id]` on the table `action_plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `action_plan` DROP FOREIGN KEY `action_plan_ibfk_1`;

-- AlterTable
ALTER TABLE `action_plan` ADD COLUMN `companies_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `budget` DECIMAL(15, 2) NULL,
    ADD COLUMN `city` VARCHAR(100) NULL,
    ADD COLUMN `company_id` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `country` VARCHAR(50) NULL,
    ADD COLUMN `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deleted_at` TIMESTAMP(0) NULL,
    ADD COLUMN `location` VARCHAR(255) NULL,
    ADD COLUMN `neighborhood` VARCHAR(100) NULL,
    ADD COLUMN `number` VARCHAR(10) NULL,
    ADD COLUMN `stage` VARCHAR(255) NOT NULL,
    ADD COLUMN `state` VARCHAR(50) NULL,
    ADD COLUMN `street` VARCHAR(255) NULL,
    ADD COLUMN `type` VARCHAR(255) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `zip_code` VARCHAR(20) NULL,
    MODIFY `client_id` INTEGER NOT NULL,
    MODIFY `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `roles` ADD COLUMN `user_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `action_plan_target` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_plan_id` INTEGER NOT NULL,
    `target_id` INTEGER NOT NULL,
    `target_type` ENUM('item', 'subitem') NOT NULL,

    INDEX `action_plan_id`(`action_plan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invites` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER UNSIGNED NOT NULL,
    `inviter_id` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'pending',
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_invites_company`(`company_id`),
    INDEX `fk_invites_inviter`(`inviter_id`),
    UNIQUE INDEX `email`(`email`, `company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `action_plan_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `name_code` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rank` INTEGER NULL DEFAULT 0,
    `color` VARCHAR(100) NULL,

    INDEX `company_id`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `name_code` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `rank` INTEGER NULL DEFAULT 0,
    `color` VARCHAR(100) NULL,

    INDEX `company_id`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `approval_flow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_type` ENUM('project', 'budget', 'action_plan', 'action_item', 'sub_action_item') NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `parent_entity_id` INTEGER NULL,
    `current_status_id` INTEGER NOT NULL,
    `next_status_id` INTEGER NOT NULL,
    `approval_type` ENUM('individual', 'group') NOT NULL,
    `responsible_id` INTEGER NULL,
    `responsible_group_id` INTEGER NULL,
    `created_by` INTEGER NOT NULL,
    `approved_by` INTEGER NULL,
    `approved_date` DATETIME(0) NULL,
    `rejected_by` INTEGER NULL,
    `rejection_reason` TEXT NULL,
    `deadline` DATETIME(0) NULL,
    `approval_order` INTEGER NULL DEFAULT 1,
    `approval_priority` ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    `auto_approval` BOOLEAN NULL DEFAULT false,
    `last_reminder_sent_at` DATETIME(0) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `company_id` INTEGER UNSIGNED NULL,

    INDEX `fk_approved_by`(`approved_by`),
    INDEX `fk_company`(`company_id`),
    INDEX `fk_created_by`(`created_by`),
    INDEX `fk_rejected_by`(`rejected_by`),
    INDEX `fk_responsible`(`responsible_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `item_id` INTEGER NULL,
    `subitem_id` INTEGER NULL,
    `action_type` ENUM('create', 'update', 'approve', 'reject', 'delete', 'dependency_unlocked') NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `item_id`(`item_id`),
    INDEX `project_id`(`project_id`),
    INDEX `subitem_id`(`subitem_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dependencies` (
    `item_id` INTEGER NOT NULL,
    `depends_on` INTEGER NOT NULL,

    INDEX `depends_on`(`depends_on`),
    PRIMARY KEY (`item_id`, `depends_on`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `category` ENUM('materials', 'labor', 'equipment', 'other') NOT NULL,
    `status` ENUM('blocked', 'unlocked', 'in_progress', 'completed', 'pending', 'archived', 'cancel') NULL DEFAULT 'pending',
    `budget` DECIMAL(15, 2) NULL DEFAULT 0.00,
    `actual_cost` DECIMAL(15, 2) NULL DEFAULT 0.00,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `responsible_user_id` INTEGER NULL,
    `project_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `project_id`(`project_id`),
    INDEX `responsible_user_id`(`responsible_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `category` ENUM('materials', 'labor', 'equipment', 'other') NOT NULL,
    `status` ENUM('pending', 'in_progress', 'completed') NULL DEFAULT 'pending',
    `quantity` DECIMAL(10, 2) NULL DEFAULT 0.00,
    `unit` VARCHAR(50) NULL DEFAULT 'unit',
    `estimated_cost` DECIMAL(15, 2) NULL DEFAULT 0.00,
    `actual_cost` DECIMAL(15, 2) NULL DEFAULT 0.00,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `responsible_user_id` INTEGER NULL,
    `item_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `item_id`(`item_id`),
    INDEX `responsible_user_id`(`responsible_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_reactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `type` ENUM('like', 'dislike', 'save') NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_reactions_user`(`user_id`),
    UNIQUE INDEX `unique_reaction`(`comment_id`, `user_id`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,
    `target_type` ENUM('project', 'item', 'subitem') NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_comments_user`(`user_id`),
    INDEX `parent_id`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `action_plan_project_id_key` ON `action_plan`(`project_id`);

-- CreateIndex
CREATE INDEX `fk_projects_company` ON `projects`(`company_id`);

-- CreateIndex
CREATE INDEX `fk_projects_clients` ON `projects`(`client_id`);

-- CreateIndex
CREATE INDEX `fk_projects_status` ON `projects`(`status`);

-- CreateIndex
CREATE INDEX `fk_user` ON `roles`(`user_id`);

-- AddForeignKey
ALTER TABLE `action_plan` ADD CONSTRAINT `action_plan_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `action_plan` ADD CONSTRAINT `action_plan_companies_id_fkey` FOREIGN KEY (`companies_id`) REFERENCES `companies`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `action_plan_target` ADD CONSTRAINT `action_plan_target_ibfk_1` FOREIGN KEY (`action_plan_id`) REFERENCES `action_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `fk_projects_clients` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `fk_projects_company` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `fk_projects_status` FOREIGN KEY (`status`) REFERENCES `project_status`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `fk_invites_company` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `fk_invites_inviter` FOREIGN KEY (`inviter_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `action_plan_status` ADD CONSTRAINT `action_plan_status_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `project_status` ADD CONSTRAINT `project_status_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `approval_flow` ADD CONSTRAINT `fk_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `approval_flow` ADD CONSTRAINT `fk_company` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `approval_flow` ADD CONSTRAINT `fk_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `approval_flow` ADD CONSTRAINT `fk_rejected_by` FOREIGN KEY (`rejected_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `approval_flow` ADD CONSTRAINT `fk_responsible` FOREIGN KEY (`responsible_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `activity_logs` ADD CONSTRAINT `activity_logs_ibfk_4` FOREIGN KEY (`subitem_id`) REFERENCES `subitems`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dependencies` ADD CONSTRAINT `dependencies_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `dependencies` ADD CONSTRAINT `dependencies_ibfk_2` FOREIGN KEY (`depends_on`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`responsible_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subitems` ADD CONSTRAINT `subitems_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subitems` ADD CONSTRAINT `subitems_ibfk_2` FOREIGN KEY (`responsible_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `comment_reactions_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment_reactions` ADD CONSTRAINT `fk_reactions_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
