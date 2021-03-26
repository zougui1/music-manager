"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1616264614250 = void 0;
class migration1616264614250 {
    constructor() {
        this.name = 'migration1616264614250';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `playlists` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `version` int NOT NULL, `name` varchar(50) NOT NULL, `order` int UNSIGNED NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `playlists_musics` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `version` int NOT NULL, `order` int UNSIGNED NOT NULL, `playlistId` int NOT NULL, `musicId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `musics` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `version` int NOT NULL, `title` varchar(80) NOT NULL, `link` varchar(255) NOT NULL, `thumbnail` varchar(255) NOT NULL, `artists` text NOT NULL DEFAULT '', `album` varchar(100) NOT NULL, `source` text NOT NULL, `tags` text NOT NULL DEFAULT '', `duration` int NOT NULL, `approved` tinyint NOT NULL, `correctness` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `version` int NOT NULL, `name` varchar(30) NOT NULL, `email` varchar(320) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `playing_musics` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `version` int NOT NULL, `platform` varchar(80) NOT NULL, `startedAt` datetime NOT NULL, `steps` text NOT NULL DEFAULT '', PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `playlists` ADD CONSTRAINT `FK_708a919e9aa49019000d9e9b68e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlists_musics` ADD CONSTRAINT `FK_8391891c711a5cb2afffdfbcca6` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlists_musics` ADD CONSTRAINT `FK_a7e34146f7cb09d5f91acdb02e7` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `musics` ADD CONSTRAINT `FK_9fb57037efb737c2dc88d8612a0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `musics` DROP FOREIGN KEY `FK_9fb57037efb737c2dc88d8612a0`");
        await queryRunner.query("ALTER TABLE `playlists_musics` DROP FOREIGN KEY `FK_a7e34146f7cb09d5f91acdb02e7`");
        await queryRunner.query("ALTER TABLE `playlists_musics` DROP FOREIGN KEY `FK_8391891c711a5cb2afffdfbcca6`");
        await queryRunner.query("ALTER TABLE `playlists` DROP FOREIGN KEY `FK_708a919e9aa49019000d9e9b68e`");
        await queryRunner.query("DROP TABLE `playing_musics`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `musics`");
        await queryRunner.query("DROP TABLE `playlists_musics`");
        await queryRunner.query("DROP TABLE `playlists`");
    }
}
exports.migration1616264614250 = migration1616264614250;
//# sourceMappingURL=1616264614250-migration.js.map