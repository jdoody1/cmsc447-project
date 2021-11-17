-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2021 at 11:07 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `countycovid_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `counties`
--

CREATE TABLE `counties` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `infRate` int(3) NOT NULL,
  `vacRate` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `counties`
--

INSERT INTO `counties` (`id`, `name`, `infRate`, `vacRate`) VALUES
(24005, 'Baltimore County', 34, 78),
(24510, 'Baltimore City', 56, 68),
(24001, 'Allegany County', 45, 84),
(24003, 'Anne Arundel County', 23, 90),
(24009, 'Calvert County', 22, 87),
(24017, 'Charles County', 29, 76),
(24019, 'Dorchester County', 45, 55),
(24029, 'Kent County', 16, 88),
(24035, 'Queen Anne\'s County', 19, 66),
(24037, 'St. Mary\'s County', 44, 87),
(24039, 'Somerset County', 33, 71),
(24041, 'Talbot County', 67, 53),
(24011, 'Caroline County', 41, 82),
(24013, 'Carroll County', 22, 81),
(24021, 'Frederick County', 46, 79),
(24023, 'Garrett County', 49, 91),
(24031, 'Montgomery County', 43, 87),
(24033, 'Prince George\'s County', 13, 88),
(24043, 'Washington County', 28, 90),
(24047, 'Worcester County', 52, 63),
(24015, 'Cecil County', 42, 69),
(24027, 'Howard County', 12, 94),
(24045, 'Wicomico County', 36, 74),
(24025, 'Harford County', 49, 80);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
