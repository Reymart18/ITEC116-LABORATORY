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
-- Database: `activity5_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `authorId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `mediaUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `content`, `createdAt`, `authorId`, `postId`, `parentId`, `mediaUrl`) VALUES
(68, 'eeeee', '2025-10-22 20:11:39.017289', 4, 27, NULL, NULL),
(69, 'eee', '2025-10-22 20:11:47.529396', 6, 27, NULL, NULL),
(70, '', '2025-10-22 20:22:21.323981', 4, 29, NULL, 'http://localhost:3001/uploads/file-1761135741321-170278607.png'),
(71, 'wxeqeqw', '2025-10-22 20:23:19.689876', 4, 29, NULL, NULL),
(72, 'xqeqewxqqw', '2025-10-22 20:23:32.649288', 4, 29, NULL, NULL),
(73, 'qxewewewee', '2025-10-22 20:23:59.356019', 4, 29, NULL, NULL),
(74, 'qwexqewq', '2025-10-22 20:24:41.492856', 4, 30, NULL, 'http://localhost:3001/uploads/file-1761135881489-298040513.png'),
(75, 'eweqeqwe', '2025-10-22 20:24:43.952026', 4, 30, NULL, NULL),
(76, 'weeqe', '2025-10-22 20:24:45.440504', 4, 30, NULL, NULL),
(77, 'qeqeqw', '2025-10-22 20:24:46.585031', 4, 30, NULL, NULL),
(78, 'qwexqeqw\r\n', '2025-10-22 20:24:50.368212', 4, 30, NULL, NULL),
(79, 'exeqxeqee', '2025-10-22 20:25:45.538007', 4, 30, NULL, NULL),
(80, 'xqexeq', '2025-10-22 20:25:47.392070', 4, 30, NULL, NULL),
(81, '', '2025-10-22 20:25:51.540686', 4, 30, NULL, 'http://localhost:3001/uploads/file-1761135951537-33783453.png'),
(82, 'xxxx', '2025-10-22 20:26:33.913722', 4, 29, NULL, NULL),
(83, 'wqxee', '2025-10-22 20:32:58.877461', 4, 30, 74, NULL),
(84, 'ewxqeqwexqeqeqqwxewewwqx', '2025-10-22 20:33:05.347956', 4, 30, 81, NULL),
(85, 'eee', '2025-10-22 20:33:14.716079', 4, 30, 84, NULL),
(86, 'xwe', '2025-10-22 20:33:52.524359', 4, 30, 85, NULL),
(87, 'e', '2025-10-22 20:33:56.132404', 4, 30, 85, NULL),
(88, 'e', '2025-10-22 20:37:17.949861', 4, 30, 87, NULL),
(89, 'dddd', '2025-10-22 20:40:16.881141', 4, 32, NULL, NULL),
(102, 'shety', '2025-10-22 20:59:22.771869', 6, 35, NULL, NULL),
(103, 'xqewew', '2025-10-22 20:59:41.052492', 6, 35, NULL, NULL),
(104, 'xeeqxqeq', '2025-10-22 21:01:28.074565', 6, 35, 103, NULL),
(105, 'qexeexexexeqeqqqw', '2025-10-22 21:03:11.989023', 6, 35, NULL, NULL),
(106, '', '2025-10-22 21:03:33.119359', 6, 35, NULL, 'http://localhost:3001/uploads/file-1761138213114-916783468.png'),
(107, 'wqxeqe', '2025-10-22 21:03:48.812757', 4, 35, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `authorId` int(11) DEFAULT NULL,
  `mediaUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `content`, `createdAt`, `authorId`, `mediaUrl`) VALUES
(27, 'qwe', 'qwxew', '2025-10-22 20:11:36.706639', 4, NULL),
(28, 'qwexqe', 'wqxeewq', '2025-10-22 20:12:16.857895', 4, NULL),
(29, 'wexq', 'x', '2025-10-22 20:21:58.381642', 4, 'http://localhost:3001/uploads/file-1761135718378-925352879.png'),
(30, 'qxe', 'qxqxeqwxxqw', '2025-10-22 20:24:35.643337', 4, 'http://localhost:3001/uploads/file-1761135875615-376852709.png'),
(31, 'xqw', 'xqeqqeqeqwxe', '2025-10-22 20:37:57.042063', 6, NULL),
(32, 'e', 'e', '2025-10-22 20:38:07.261021', 6, 'http://localhost:3001/uploads/file-1761136687257-348951234.png'),
(33, 'xeqwexqwe', 'xqeqwx', '2025-10-22 20:39:56.009864', 4, NULL),
(34, 'qxeqewqxe', 'xeqe', '2025-10-22 20:50:05.034767', 4, NULL),
(35, 'qxeqee', 'xeqwx', '2025-10-22 20:53:19.832555', 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isVerified` tinyint(4) NOT NULL DEFAULT 0,
  `verificationToken` text DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `isVerified`, `verificationToken`, `createdAt`, `updatedAt`) VALUES
(4, 'reymartomega18@gmail.com', '$2b$10$/I1CCV7LKvvuXHVuOF298O5oTzfc8KQYkhTfNZ9u9BOdeqik6p9uO', 1, NULL, '2025-10-22 16:35:08.337275', '2025-10-22 16:35:22.000000'),
(6, 'ic.reymart.omega@cvsu.edu.ph', '$2b$10$wjhnvoLaZG6NnTLruocNpussyhZetxUA5/cayym0VNxAwvQ67z57e', 1, NULL, '2025-10-22 16:55:13.089008', '2025-10-22 16:55:29.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_276779da446413a0d79598d4fbd` (`authorId`),
  ADD KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  ADD KEY `FK_e3aebe2bd1c53467a07109be596` (`parentId`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_c6fb082a3114f35d0cc27c518e0` (`authorId`);

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
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e3aebe2bd1c53467a07109be596` FOREIGN KEY (`parentId`) REFERENCES `comment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_c6fb082a3114f35d0cc27c518e0` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
