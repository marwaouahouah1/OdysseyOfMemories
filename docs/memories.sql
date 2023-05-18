-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 13, 2023 at 11:26 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memories`
--

-- --------------------------------------------------------

--
-- Table structure for table `etapes_voyage`
--

CREATE TABLE `etapes_voyage` (
  `id_etape_voyage` int(11) NOT NULL,
  `id_voyage` int(11) NOT NULL,
  `nom_ville` varchar(50) NOT NULL,
  `description_souvenir` varchar(255) NOT NULL,
  `file_souvenir` varchar(100) NOT NULL,
  `numero_etape` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `etapes_voyage`
--

INSERT INTO `etapes_voyage` (`id_etape_voyage`, `id_voyage`, `nom_ville`, `description_souvenir`, `file_souvenir`, `numero_etape`) VALUES
(4, 1, 'Paris', 'La capitale de la France', 'europe1.jpg', 1),
(5, 1, 'Berlin', 'Capitale de l\'Allemagne', 'berlin.jpg', 2),
(6, 1, 'Londres', 'capitale de l\'angleterre', 'londres.jpg', 3),
(7, 2, 'Venise', 'Très belle ville', 'venise.jpg', 1),
(8, 2, 'Barcelone', 'FC Barca', 'barca.jpg', 2),
(9, 3, 'Oujda', 'oujda city', 'oujda.jpg', 1),
(10, 3, 'Abidjan', 'abidjan', 'abidjan.jpg', 4),
(11, 3, 'Alger', 'algerie', 'alger.jpg', 3),
(12, 3, 'Le cap', 'cap ou pas cap', 'cap.jpg', 5),
(13, 3, 'Rabat', 'rabat', 'rabat.jpg\r\n', 2),
(14, 4, 'Bangkok', 'bangkok', 'bangkok', 1),
(15, 4, 'Jakarta', 'indonesie', 'jakarta.jpg', 2),
(16, 4, 'Istanbul', 'turquie', 'istanbul.jpg', 3),
(17, 5, 'Alger', 'capitale', 'lancement_back.png', 1),
(18, 1, 'Oujda', 'oujda', 'Buffer_skell (1).java', 2),
(19, 1, 'Alger', 'alger', 'allocateur (1).java', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `theme`) VALUES
(1, 'Ines', 'ines@gmail.com', 'Cuisine,Sport,'),
(2, 'Maroua', 'maroua@gmail.com', ''),
(3, 'Ha Phuong', 'Haphuong@gmail.com', ''),
(4, 'Elodie', 'elodie@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `voyages`
--

CREATE TABLE `voyages` (
  `id_voyage` int(11) NOT NULL,
  `continent` varchar(50) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `date_debut` varchar(50) NOT NULL,
  `date_fin` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voyages`
--

INSERT INTO `voyages` (`id_voyage`, `continent`, `titre`, `date_debut`, `date_fin`, `id_user`) VALUES
(1, 'Europe', 'Mon premier voyage en Europe', '2023-03-12', '2023-03-15', 1),
(2, 'Europe', 'Mon plus grand voyage en Europe', '2023-03-22', '2023-03-23', 1),
(3, 'Afrique', 'Le plus beau continent du monde', '2023-03-15', '2023-03-17', 1),
(4, 'Asie', 'L\'Asie est magnifique', '2023-03-21', '2023-03-25', 1),
(5, 'Afrique', 'test', '2023-03-23', '2023-03-25', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `etapes_voyage`
--
ALTER TABLE `etapes_voyage`
  ADD PRIMARY KEY (`id_etape_voyage`),
  ADD KEY `idVoyage` (`id_voyage`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voyages`
--
ALTER TABLE `voyages`
  ADD PRIMARY KEY (`id_voyage`),
  ADD KEY `idOfUser` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `etapes_voyage`
--
ALTER TABLE `etapes_voyage`
  MODIFY `id_etape_voyage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `voyages`
--
ALTER TABLE `voyages`
  MODIFY `id_voyage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `etapes_voyage`
--
ALTER TABLE `etapes_voyage`
  ADD CONSTRAINT `idVoyage` FOREIGN KEY (`id_voyage`) REFERENCES `voyages` (`id_voyage`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `voyages`
--
ALTER TABLE `voyages`
  ADD CONSTRAINT `idOfUser` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
