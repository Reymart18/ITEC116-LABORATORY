-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2025 at 01:09 PM
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
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `title`, `userId`, `content`) VALUES
(36, 'rqrqrq', 20, 'qrqrxwe'),
(37, 'xqeqwex', 20, 'qwxeq'),
(38, 'xewqx', 20, 'xweqw'),
(39, 'xewqexw', 20, 'xwewqxwq\n'),
(99, 'xeqewqxewq', 16, 'wqxewqexxwewqe\n\n[Updated: 10/5/2025, 6:52:45 PM]');

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
(20, 'r@gmail.com', '$2b$10$F/CdRvILzxSLK94yI.cfbuAJS6/0T5gNR/uFVx4fM9WFHUL1AR91.');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
