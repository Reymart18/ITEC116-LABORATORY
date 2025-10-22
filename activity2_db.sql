-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2025 at 06:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `activity2_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `title`, `userId`, `content`, `created_at`, `updated_at`) VALUES
(36, 'rqrqrq', 20, 'qrqrxwe', '2025-10-07 17:53:35.459191', '2025-10-07 17:53:35.738694'),
(37, 'xqeqwex', 20, 'qwxeq', '2025-10-07 17:53:35.459191', '2025-10-07 17:53:35.738694'),
(38, 'xewqx', 20, 'xweqw', '2025-10-07 17:53:35.459191', '2025-10-07 17:53:35.738694'),
(39, 'xewqexw', 20, 'xwewqxwq\n', '2025-10-07 17:53:35.459191', '2025-10-07 17:53:35.738694'),
(102, 'hey', 24, 'hey\n\n[Created: 10/8/2025, 1:37:18 AM]', '2025-10-07 17:53:35.459191', '2025-10-07 17:53:35.738694'),
(110, 'wxewxexq', 16, 'wxe', '2025-10-07 17:54:26.453789', '2025-10-07 17:54:26.453789'),
(111, 'rereeereddddddd', 16, 'xwewxewq', '2025-10-07 17:56:48.822013', '2025-10-07 17:57:01.000000'),
(112, 'qwxeqe', 16, 'xqeeewq', '2025-10-07 17:57:12.437489', '2025-10-07 17:57:12.437489'),
(113, 'boys', 26, 'boyet\n', '2025-10-07 17:58:01.917808', '2025-10-07 17:58:19.000000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `verificationToken` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `isVerified`, `verificationToken`) VALUES
(16, 'rey@gmail.com', '$2b$10$FGkCYoxDuewJEddF0aHhP./IIeeFtvuuU/mIVDqj/bz040XQAO3HK', 0, NULL),
(17, 'w@gmail.com', '$2b$10$MtWHJhlR8brUSHRnfEg2kOtaxhZ.rMIYN60kr9ZWW4A3.1488O/Ey', 0, NULL),
(18, 'ww@gmail.com', '$2b$10$da9t3aPqwcPSlHDaQz9Ife84E2XEB42q17uInyt8GcxLSE7PCf7Te', 0, NULL),
(19, 'hehe@gmail.com', '$2b$10$m/P9IhY3Ot/KfI/5NFh3U.sVLUDJTqrUyfdfMvCerELfAf5lfFuJW', 0, NULL),
(20, 'r@gmail.com', '$2b$10$F/CdRvILzxSLK94yI.cfbuAJS6/0T5gNR/uFVx4fM9WFHUL1AR91.', 0, NULL),
(24, 'gg@gmail.com', '$2b$10$FmH2tqssg5g.sL2N/0msJOjuk9tuvyZaXKhjmTgeM86ZKwN9SNy3a', 0, NULL),
(26, 'boy@gmail.com', '$2b$10$bJK1pR18ia/OI2AlYBwd3Os3gCr2i9868Ogl7tSmnqjoujP/4ykMG', 0, NULL),
(42, 'reymartomega18@gmail.com', '$2b$10$/yGq79ihyqGcFEStneRoK.Ah4AB10SkNyXG.5EhpIDj9A8KgBwX0G', 1, NULL),
(43, 'reymartomega10@gmail.com', '$2b$10$dwAvDQaTAtyVfzkOpaYxNuvD36KqdJWpyUSofbM/m/MI.JSscaUNu', 0, 'cb2f785c00037adf979947aa69773d3824899d8739d71a76fe3f86d6e1c7c361'),
(45, 'reymartomega19@gmail.com', '$2b$10$/c.ehH4hxNL3ArgDb9d8ruwONgnU3KweeZCr7r08vb5BJqjFeMKLW', 0, 'd9148cf762158e8b666bf5041a459992a5b82bb2e6b594475041b9236531c6bb'),
(47, 'reymartomegs@gmail.com', '$2b$10$9lW3qpapbpzQxdQpCBWgFuHzFPmsh87AMmHocr1l1noaecMiL3qEC', 0, 'ab11bc6de39cde2b424bdc7681f6cb1c7276acf70b8cdd6c7457083ca1502020'),
(48, 'reymartomega08@gmail.com', '$2b$10$T4maoGb7uQlA7jj1mbniWO5cWLkhSY2Ae1PqKyhXTGvjHRZxywyK2', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5b87d9d19127bd5d92026017a7b` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `FK_5b87d9d19127bd5d92026017a7b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
