-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2025 at 06:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `activity3_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `bio`, `name`) VALUES
(20, NULL, 'Ben Cheetham'),
(21, NULL, 'Gabriela Preotesco'),
(23, NULL, 'C.C. Phillips'),
(24, NULL, 'Jules Verne'),
(25, NULL, 'Ericka Clay'),
(26, NULL, 'Stephen Byrd'),
(28, NULL, 'H.P. Lovecraft'),
(29, NULL, 'Brandon McIntyre'),
(30, NULL, 'Stephanie Van Orman'),
(31, NULL, 'Tayin Machrie'),
(32, NULL, 'Ann Sepino'),
(33, NULL, 'Peter C. Byrnes'),
(34, NULL, 'Edgardo D. Holzman'),
(35, NULL, 'Susan Hill'),
(36, NULL, 'Zarema Rose');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `description` varchar(255) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `dateAdded` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `authorId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `genreId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`description`, `feedback`, `id`, `coverImage`, `dateAdded`, `authorId`, `categoryId`, `genreId`, `title`) VALUES
('Adam and Ella Piper, grieving the loss of their son, move to the eerie Fenton House hoping for a new start. But the house hides a dark past involving disappearances and death. As strange events unfold, Adam must face the horrifying truth that some secrets', '', 29, '/uploads/9d19c743e91ccb179243d88312773c39.jpg', '2025-10-25 20:15:29.165391', 20, 4, NULL, 'Don\'t Look Back'),
('A woman finds herself mysteriously connected to another soul across time and space. As their lives intertwine, she uncovers deep truths about love, destiny, and the power of connection beyond the physical world.', '', 30, '/uploads/732d4d21d482689bf4f419fb5b1285f8.jpg', '2025-10-25 20:18:46.717460', 21, 11, NULL, 'Parallel Souls'),
('Set in the rustic countryside, this story explores the intertwining lives of people facing change, regret, and redemption. Through unexpected events, they discover that life often grants second chances—if they’re brave enough to take them.', '', 32, '/uploads/6d724c9caa4f8b689a17691c4bd1fb66.jpg', '2025-10-25 20:24:57.386913', 23, 5, NULL, 'Twice Upon a Time'),
('Professor Otto Lidenbrock, his nephew Axel, and their guide Hans descend into an Icelandic volcano to discover a hidden world beneath the Earth\'s surface. They encounter prehistoric creatures, vast caverns, and wonders of nature in this thrilling journey ', 'GOOD!', 33, '/uploads/f22356fb011ee4609a4c9f40b981ee5d.jpg', '2025-10-25 20:25:42.809622', 24, 5, NULL, 'Journey to the Centre of the Earth'),
('A raw and emotional story about love, pain, and healing. Through intertwined lives and heartfelt letters, Dear Hearts captures the beauty and fragility of human relationships and the courage it takes to love again after loss.', '', 34, '/uploads/2c7c8ed531f276d4f527d3caf9b66567.jpg', '2025-10-25 20:27:39.252454', 25, 6, NULL, 'Dear Hearts'),
('A dark and gripping tale about obsession and toxic love. The story delves into the mind of a person consumed by dangerous passion, exploring how love can twist into madness when boundaries are crossed.', '', 35, '/uploads/9a2cffcd441605068d4b739103e8a1e79.jpg', '2025-10-25 20:29:23.620043', 26, 4, NULL, 'When Crazy Loves You'),
('A heartwarming summer love story about two people who find each other under the sunlit skies of the beach. What begins as a fleeting vacation romance blossoms into a deep connection that challenges time, distance, and expectations.', '', 36, '/uploads/d15810419831ee3daec68e2338c57147a.jpg', '2025-10-25 20:30:25.056903', 36, 11, NULL, 'Love Summer Story'),
('A man returns to his ancestral town to attend a mysterious winter festival, only to uncover that the celebration is a dark, ancient ritual involving unspeakable horrors. A chilling story of dread and cosmic terror typical of Lovecraft’s style.', '', 37, '/uploads/f7a86b5518e3f99ac062d6a78c8f95cc.jpg', '2025-10-25 20:30:53.731027', 28, 1, NULL, 'The Festival'),
('In the remote town of Dunwich, a monstrous creature born of dark rituals terrorizes the countryside. When scholars from Miskatonic University investigate, they uncover an ancient evil beyond human comprehension. A classic tale of occult horror and forbidd', '', 38, '/uploads/fa4e66410201058a34f8ff3cb693df732b.jpg', '2025-10-25 20:32:06.924222', 28, 1, NULL, 'The Dunwich Horror'),
('A gripping story about survival and self-discovery at sea. The main character becomes stranded in the vast ocean, battling nature’s fury while uncovering hidden truths about courage and freedom.', '', 39, '/uploads/661fa0e2b96665825306758a3fbb56106.jpg', '2025-10-25 20:36:14.875204', 29, 5, NULL, 'Captive of the Sea'),
('A whimsical fairy tale about a mysterious house divided into two magical halves. A young woman’s journey into this strange home leads her to uncover secrets of love, fate, and magic.', '', 40, '/uploads/ed9cfceb61013d4a3bf2629510c5b510e10.jpg', '2025-10-25 20:36:42.850109', 30, 3, NULL, 'The House with Two Halves'),
('Part of the Darkburn series, this book follows heroes facing dark forces as they attempt to defend the ancient gates of Kelvha. It’s filled with epic battles, mystical powers, and quests for honor and survival.', '', 41, '/uploads/5dba1041c734e59a885d031ac896eb52a.jpg', '2025-10-25 20:37:20.264736', 31, 3, NULL, 'Darkburn'),
('A lighthearted fantasy romance about secrets, love, and the healing power of nature. The story weaves magic and emotion, exploring how love can bloom even in mysterious and enchanted circumstances.', '', 42, '/uploads/9d43f275a2b613453019c9f461d6e772.jpg', '2025-10-25 20:37:55.666000', 32, 3, NULL, 'Gentle Green'),
('A tense detective story following Joseph Lind as he investigates the shocking death of a fellow officer. Twists, corruption, and betrayal lurk at every corner as he races to uncover the truth.', '', 43, '/uploads/a6b00f6f3d3c910da1507592448f193c5.jpg', '2025-10-25 20:38:47.579207', 33, 12, NULL, 'Officer Down'),
('A gripping legal and crime thriller where a man accused of murder pleads innocence. Detective Lind must navigate lies and hidden motives to find the real culprit before justice fails.', '', 44, '/uploads/65b9c38899719e11beaa5dbc61101037ee.jpg', '2025-10-25 20:39:26.323685', 33, 4, NULL, 'A Cry of Innocence'),
('Set in Argentina’s dark political era, the novel follows a woman caught in a web of power, loss, and resilience. It portrays the fight for truth and justice under a brutal dictatorship.', '', 45, '/uploads/6f9545c4c615f92826d2f31c8613bc1b.jpg', '2025-10-25 20:40:09.424752', 34, 6, NULL, 'Malena'),
('When a young boy disappears from a quiet English town, Detective Simon Serrailler investigates a case that shakes the community. As secrets surface, he must balance his duty with personal loss, revealing the hidden darkness behind ordinary lives.', '', 46, '/uploads/f10e109efd606385107b92da54fc42679e8.png', '2025-10-25 20:46:43.429995', 35, 4, NULL, 'The Pure in Heart');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Horror'),
(3, 'Fantasy'),
(4, 'Thriller / Crime'),
(5, 'Adventure'),
(6, 'Drama'),
(11, 'Romance'),
(12, 'Mystery');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_54f49efe2dd4d2850e736e9ab86` (`authorId`),
  ADD KEY `FK_a0f13454de3df36e337e01dbd55` (`categoryId`),
  ADD KEY `FK_331478ffd59f87a68b1255b2b6a` (`genreId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `FK_331478ffd59f87a68b1255b2b6a` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_54f49efe2dd4d2850e736e9ab86` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_a0f13454de3df36e337e01dbd55` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
