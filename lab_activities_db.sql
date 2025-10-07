-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2025 at 07:59 PM
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
-- Database: `lab_activities_db`
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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`) VALUES
(16, 'rey@gmail.com', '$2b$10$FGkCYoxDuewJEddF0aHhP./IIeeFtvuuU/mIVDqj/bz040XQAO3HK'),
(17, 'w@gmail.com', '$2b$10$MtWHJhlR8brUSHRnfEg2kOtaxhZ.rMIYN60kr9ZWW4A3.1488O/Ey'),
(18, 'ww@gmail.com', '$2b$10$da9t3aPqwcPSlHDaQz9Ife84E2XEB42q17uInyt8GcxLSE7PCf7Te'),
(19, 'hehe@gmail.com', '$2b$10$m/P9IhY3Ot/KfI/5NFh3U.sVLUDJTqrUyfdfMvCerELfAf5lfFuJW'),
(20, 'r@gmail.com', '$2b$10$F/CdRvILzxSLK94yI.cfbuAJS6/0T5gNR/uFVx4fM9WFHUL1AR91.'),
(24, 'gg@gmail.com', '$2b$10$FmH2tqssg5g.sL2N/0msJOjuk9tuvyZaXKhjmTgeM86ZKwN9SNy3a'),
(26, 'boy@gmail.com', '$2b$10$bJK1pR18ia/OI2AlYBwd3Os3gCr2i9868Ogl7tSmnqjoujP/4ykMG');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
