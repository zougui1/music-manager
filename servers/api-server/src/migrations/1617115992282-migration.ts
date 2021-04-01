import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1617115992282 implements MigrationInterface {
    name = 'migration1617115992282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `playlist_to_musics` DROP FOREIGN KEY `FK_a3e972d519e1b425a7ce19e261e`");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` DROP FOREIGN KEY `FK_7e083a31cefed5467e033cf9101`");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `playlistId` `playlistId` int NULL");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `musicId` `musicId` int NULL");
        await queryRunner.query("ALTER TABLE `playlists` DROP FOREIGN KEY `FK_708a919e9aa49019000d9e9b68e`");
        await queryRunner.query("ALTER TABLE `playlists` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `playlists` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `musics` DROP FOREIGN KEY `FK_9fb57037efb737c2dc88d8612a0`");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `title` `title` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `link` `link` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `artists` `artists` text NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `album` `album` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `thumbnail` `thumbnail` varchar(500) NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `tags` `tags` text NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `duration` `duration` float UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `approved` `approved` tinyint NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `correctness` `correctness` float NULL");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `music_playings` DROP FOREIGN KEY `FK_3cca3333a13cb6f62cf8a90a7f9`");
        await queryRunner.query("ALTER TABLE `music_playings` CHANGE `deletedAt` `deletedAt` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `music_playings` CHANGE `musicId` `musicId` int NULL");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` ADD CONSTRAINT `FK_a3e972d519e1b425a7ce19e261e` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` ADD CONSTRAINT `FK_7e083a31cefed5467e033cf9101` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlists` ADD CONSTRAINT `FK_708a919e9aa49019000d9e9b68e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `musics` ADD CONSTRAINT `FK_9fb57037efb737c2dc88d8612a0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `music_playings` ADD CONSTRAINT `FK_3cca3333a13cb6f62cf8a90a7f9` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `music_playings` DROP FOREIGN KEY `FK_3cca3333a13cb6f62cf8a90a7f9`");
        await queryRunner.query("ALTER TABLE `musics` DROP FOREIGN KEY `FK_9fb57037efb737c2dc88d8612a0`");
        await queryRunner.query("ALTER TABLE `playlists` DROP FOREIGN KEY `FK_708a919e9aa49019000d9e9b68e`");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` DROP FOREIGN KEY `FK_7e083a31cefed5467e033cf9101`");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` DROP FOREIGN KEY `FK_a3e972d519e1b425a7ce19e261e`");
        await queryRunner.query("ALTER TABLE `music_playings` CHANGE `musicId` `musicId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `music_playings` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `music_playings` ADD CONSTRAINT `FK_3cca3333a13cb6f62cf8a90a7f9` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `correctness` `correctness` float(12) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `approved` `approved` tinyint NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `duration` `duration` float(12) UNSIGNED NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `tags` `tags` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `thumbnail` `thumbnail` varchar(500) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `album` `album` varchar(500) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `artists` `artists` text NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `link` `link` varchar(500) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `title` `title` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `musics` ADD CONSTRAINT `FK_9fb57037efb737c2dc88d8612a0` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlists` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlists` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlists` ADD CONSTRAINT `FK_708a919e9aa49019000d9e9b68e` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `musicId` `musicId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `playlistId` `playlistId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` CHANGE `deletedAt` `deletedAt` datetime(6) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` ADD CONSTRAINT `FK_7e083a31cefed5467e033cf9101` FOREIGN KEY (`musicId`) REFERENCES `musics`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `playlist_to_musics` ADD CONSTRAINT `FK_a3e972d519e1b425a7ce19e261e` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
