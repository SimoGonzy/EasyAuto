-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 24, 2026 alle 14:43
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `easyauto`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `auto`
--

CREATE TABLE `auto` (
  `id_Auto` int(11) NOT NULL,
  `modello` varchar(100) NOT NULL,
  `anno_Di_Produzione` int(11) NOT NULL,
  `volume_Serbatoio` int(11) NOT NULL,
  `velocità_Massima_km_h` int(11) DEFAULT NULL,
  `accelerazione_s` float DEFAULT NULL,
  `n_Posti` int(11) NOT NULL,
  `massa_Totale_kg` int(11) NOT NULL,
  `standard_Ambientali` varchar(50) NOT NULL,
  `autonomia_km` int(11) DEFAULT NULL,
  `id_freni_dietro` int(11) NOT NULL,
  `id_freni_davanti` int(11) NOT NULL,
  `id_marca` int(11) NOT NULL,
  `id_carrozzeria` int(11) NOT NULL,
  `id_motore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `auto`
--

INSERT INTO `auto` (`id_Auto`, `modello`, `anno_Di_Produzione`, `volume_Serbatoio`, `velocità_Massima_km_h`, `accelerazione_s`, `n_Posti`, `massa_Totale_kg`, `standard_Ambientali`, `autonomia_km`, `id_freni_dietro`, `id_freni_davanti`, `id_marca`, `id_carrozzeria`, `id_motore`) VALUES
(1, 'Panda Hybrid', 2024, 38, 164, 13.9, 4, 1055, 'Euro 6D', 700, 1, 2, 1, 1, 1),
(2, '500 1.2 Fire', 2024, 35, 160, 12.9, 4, 940, 'Euro 6D', 600, 1, 2, 1, 1, 2),
(3, 'Tipo Station Wagon', 2023, 50, 200, 10.1, 5, 1380, 'Euro 6D', 900, 2, 3, 1, 5, 3),
(4, '500X Hybrid', 2023, 48, 194, 9.4, 5, 1405, 'Euro 6D', 750, 2, 3, 1, 6, 4),
(5, 'Polo 1.0 TSI', 2024, 40, 187, 10.8, 5, 1172, 'Euro 6D', 750, 1, 3, 2, 2, 5),
(6, 'Golf 1.5 eTSI', 2024, 50, 224, 8.5, 5, 1365, 'Euro 6D', 800, 2, 3, 2, 3, 6),
(7, 'Tiguan 2.0 TDI 4Motion', 2023, 58, 200, 9.3, 5, 1715, 'Euro 6D', 900, 2, 3, 2, 7, 7),
(8, 'T-Roc 2.0 TDI', 2024, 50, 187, 10.4, 5, 1410, 'Euro 6D', 950, 2, 3, 2, 6, 8),
(9, 'Passat Variant 2.0 TDI', 2024, 66, 223, 8.9, 5, 1580, 'Euro 6D', 1100, 2, 3, 2, 5, 9),
(10, 'Aygo X', 2024, 35, 158, 14.8, 4, 1015, 'Euro 6D', 650, 1, 2, 3, 1, 10),
(11, 'Yaris Hybrid', 2024, 36, 175, 9.7, 5, 1160, 'Euro 6D', 850, 2, 3, 3, 2, 11),
(12, 'Yaris Cross AWD-i', 2024, 36, 170, 11.8, 5, 1260, 'Euro 6D', 750, 2, 3, 3, 6, 12),
(13, 'Corolla Touring Sports', 2023, 43, 180, 9.2, 5, 1445, 'Euro 6D', 800, 2, 3, 3, 5, 13),
(14, 'RAV4 Hybrid AWD-i', 2023, 55, 180, 8.1, 5, 1720, 'Euro 6D', 850, 2, 3, 3, 7, 14),
(15, 'Puma 1.0 EcoBoost', 2024, 42, 191, 9.8, 5, 1280, 'Euro 6D', 750, 1, 3, 4, 6, 15),
(16, 'Focus 1.0 EcoBoost MHEV', 2024, 52, 208, 8.4, 5, 1349, 'Euro 6D', 850, 2, 3, 4, 3, 16),
(17, 'Kuga 1.5 EcoBlue', 2023, 54, 190, 11.3, 5, 1576, 'Euro 6D', 1000, 2, 3, 4, 7, 17),
(18, 'Kuga PHEV', 2024, 45, 200, 9.2, 5, 1844, 'Euro 6D', 600, 2, 3, 4, 7, 18),
(19, '208 PureTech 100', 2024, 44, 188, 10.9, 5, 1165, 'Euro 6D', 800, 2, 3, 5, 2, 19),
(20, '2008 1.2 PureTech', 2024, 44, 196, 9.1, 5, 1205, 'Euro 6D', 750, 2, 3, 5, 6, 20),
(21, '308 BlueHDi 130', 2023, 53, 207, 10.6, 5, 1415, 'Euro 6D', 1100, 2, 3, 5, 3, 21),
(22, '3008 PHEV 225', 2024, 43, 225, 8.7, 5, 1835, 'Euro 6D', 550, 2, 3, 5, 7, 22),
(23, 'Clio TCe 90', 2024, 42, 180, 12.2, 5, 1174, 'Euro 6D', 750, 1, 3, 6, 2, 23),
(24, 'Captur E-Tech Full Hybrid', 2024, 39, 170, 10.6, 5, 1436, 'Euro 6D', 750, 2, 3, 6, 6, 24),
(25, 'Captur TCe 100 GPL', 2023, 48, 173, 13, 5, 1316, 'Euro 6D', 1000, 1, 3, 6, 6, 25),
(26, 'Austral E-Tech 200', 2024, 55, 175, 8.4, 5, 1618, 'Euro 6D', 900, 2, 3, 6, 7, 26),
(27, 'Sandero Stepway ECO-G', 2024, 50, 177, 11.9, 5, 1134, 'Euro 6D', 1200, 1, 2, 7, 6, 27),
(28, 'Duster 1.5 Blue dCi 4x4', 2024, 50, 175, 10.2, 5, 1414, 'Euro 6D', 900, 1, 3, 7, 7, 28),
(29, 'Jogger Hybrid 140', 2024, 50, 167, 9.8, 7, 1432, 'Euro 6D', 850, 1, 3, 7, 5, 29),
(30, 'Tonale 1.5 Hybrid', 2024, 55, 195, 9.9, 5, 1600, 'Euro 6D', 800, 2, 3, 8, 7, 30),
(31, 'Stelvio 2.2 Turbo Diesel', 2023, 64, 215, 6.6, 5, 1820, 'Euro 6D', 1000, 3, 3, 8, 7, 31),
(32, 'Giulia 2.0 Turbo Q4', 2024, 58, 240, 5.2, 5, 1620, 'Euro 6D', 700, 3, 3, 8, 4, 32),
(33, 'Serie 1 (118i)', 2024, 42, 213, 8.8, 5, 1395, 'Euro 6D', 700, 2, 3, 9, 3, 33),
(34, 'Serie 3 (320d)', 2023, 59, 235, 6.9, 5, 1615, 'Euro 6D', 1100, 3, 3, 9, 4, 34),
(35, 'X1 (sDrive18d)', 2024, 45, 210, 8.9, 5, 1650, 'Euro 6D', 850, 2, 3, 9, 7, 35),
(36, 'X3 (xDrive30e PHEV)', 2024, 50, 210, 6.1, 5, 2065, 'Euro 6D', 650, 3, 3, 9, 7, 36),
(37, 'A1 Sportback 30 TFSI', 2023, 40, 203, 10.5, 5, 1180, 'Euro 6D', 700, 2, 3, 10, 2, 37),
(38, 'A3 Sportback 35 TDI', 2024, 50, 222, 8.4, 5, 1485, 'Euro 6D', 950, 2, 3, 10, 3, 38),
(39, 'Q3 35 TFSI MHEV', 2024, 58, 206, 9.4, 5, 1605, 'Euro 6D', 800, 2, 3, 10, 7, 39),
(40, 'Q5 40 TDI quattro', 2023, 65, 222, 7.6, 5, 1900, 'Euro 6D', 900, 3, 3, 10, 7, 40),
(41, 'Classe A 200 d', 2024, 43, 220, 8.3, 5, 1540, 'Euro 6D', 900, 2, 3, 11, 3, 41),
(42, 'GLA 250 e PHEV', 2024, 35, 220, 7.1, 5, 1775, 'Euro 6D', 500, 2, 3, 11, 7, 42),
(43, 'Classe C 220 d MHEV', 2023, 66, 245, 7.3, 5, 1755, 'Euro 6D', 1200, 3, 3, 11, 4, 43),
(44, 'i10 1.0 MPI', 2024, 36, 156, 14.8, 4, 999, 'Euro 6D', 650, 1, 2, 12, 1, 44),
(45, 'i20 1.0 T-GDI 48V', 2024, 40, 188, 10.4, 5, 1165, 'Euro 6D', 750, 2, 3, 12, 2, 45),
(46, 'Tucson 1.6 HEV 4WD', 2023, 52, 193, 8.3, 5, 1685, 'Euro 6D', 800, 2, 3, 12, 7, 46),
(47, 'Picanto 1.0 DPi', 2024, 35, 161, 14.6, 5, 974, 'Euro 6D', 650, 1, 2, 13, 1, 47),
(48, 'Sportage 1.6 CRDi MHEV', 2024, 54, 180, 11.4, 5, 1600, 'Euro 6D', 950, 2, 3, 13, 7, 48),
(49, 'Qashqai e-POWER', 2024, 55, 170, 7.9, 5, 1685, 'Euro 6D', 900, 2, 3, 14, 7, 49),
(50, 'Compass 4xe PHEV', 2024, 36, 200, 7.3, 5, 1935, 'Euro 6D', 550, 2, 3, 15, 7, 50);

-- --------------------------------------------------------

--
-- Struttura della tabella `carrozzeria`
--

CREATE TABLE `carrozzeria` (
  `id_Carrozzeria` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `carrozzeria`
--

INSERT INTO `carrozzeria` (`id_Carrozzeria`, `nome`) VALUES
(1, 'City Car'),
(2, 'Utilitaria (Segmento B)'),
(3, 'Berlina Compatta (Segmento C)'),
(4, 'Berlina 3 Volumi'),
(5, 'Station Wagon'),
(6, 'Crossover'),
(7, 'SUV'),
(8, 'Fuoristrada');

-- --------------------------------------------------------

--
-- Struttura della tabella `consumi_100km`
--

CREATE TABLE `consumi_100km` (
  `id_auto` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `consumo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `consumi_100km`
--

INSERT INTO `consumi_100km` (`id_auto`, `tipo`, `consumo`) VALUES
(1, 'Extraurbano', 4.1),
(1, 'Misto', 4.9),
(1, 'Urbano', 6),
(2, 'Extraurbano', 4.2),
(2, 'Misto', 4.9),
(2, 'Urbano', 6.2),
(3, 'Extraurbano', 4),
(3, 'Misto', 4.5),
(3, 'Urbano', 5.5),
(4, 'Extraurbano', 5.1),
(4, 'Misto', 5.8),
(4, 'Urbano', 6.8),
(5, 'Extraurbano', 4.5),
(5, 'Misto', 5.3),
(5, 'Urbano', 6.5),
(6, 'Extraurbano', 4.8),
(6, 'Misto', 5.6),
(6, 'Urbano', 6.8),
(7, 'Extraurbano', 4.9),
(7, 'Misto', 5.5),
(7, 'Urbano', 6.5),
(8, 'Extraurbano', 4.2),
(8, 'Misto', 4.7),
(8, 'Urbano', 5.5),
(9, 'Extraurbano', 4.1),
(9, 'Misto', 4.8),
(9, 'Urbano', 5.8),
(10, 'Extraurbano', 4.2),
(10, 'Misto', 4.8),
(10, 'Urbano', 5.6),
(11, 'Extraurbano', 4.1),
(11, 'Misto', 3.9),
(11, 'Urbano', 3.5),
(12, 'Extraurbano', 4.8),
(12, 'Misto', 4.5),
(12, 'Urbano', 4.1),
(13, 'Extraurbano', 4.9),
(13, 'Misto', 4.6),
(13, 'Urbano', 4.2),
(14, 'Extraurbano', 6.1),
(14, 'Misto', 5.8),
(14, 'Urbano', 5.5),
(15, 'Extraurbano', 4.7),
(15, 'Misto', 5.4),
(15, 'Urbano', 6.6),
(16, 'Extraurbano', 4.6),
(16, 'Misto', 5.3),
(16, 'Urbano', 6.5),
(17, 'Extraurbano', 4.3),
(17, 'Misto', 4.8),
(17, 'Urbano', 5.6),
(18, 'Extraurbano', 5.5),
(18, 'Misto', 1.4),
(18, 'Urbano', 1.2),
(19, 'Extraurbano', 4.3),
(19, 'Misto', 5.1),
(19, 'Urbano', 6.4),
(20, 'Extraurbano', 4.7),
(20, 'Misto', 5.4),
(20, 'Urbano', 6.8),
(21, 'Extraurbano', 3.8),
(21, 'Misto', 4.3),
(21, 'Urbano', 5.1),
(22, 'Extraurbano', 6.2),
(22, 'Misto', 1.5),
(22, 'Urbano', 1.3),
(23, 'Extraurbano', 4.4),
(23, 'Misto', 5.2),
(23, 'Urbano', 6.5),
(24, 'Extraurbano', 5.1),
(24, 'Misto', 4.7),
(24, 'Urbano', 4.2),
(25, 'Extraurbano', 6.5),
(25, 'Misto', 7.4),
(25, 'Urbano', 8.5),
(26, 'Extraurbano', 5.3),
(26, 'Misto', 4.8),
(26, 'Urbano', 4.5),
(27, 'Extraurbano', 6.2),
(27, 'Misto', 7),
(27, 'Urbano', 8.2),
(28, 'Extraurbano', 4.5),
(28, 'Misto', 5),
(28, 'Urbano', 5.8),
(29, 'Extraurbano', 5.4),
(29, 'Misto', 4.9),
(29, 'Urbano', 4.6),
(30, 'Extraurbano', 5.3),
(30, 'Misto', 5.9),
(30, 'Urbano', 7),
(31, 'Extraurbano', 5.4),
(31, 'Misto', 6.1),
(31, 'Urbano', 7.2),
(32, 'Extraurbano', 6.8),
(32, 'Misto', 8.1),
(32, 'Urbano', 10.5),
(33, 'Extraurbano', 5.1),
(33, 'Misto', 5.9),
(33, 'Urbano', 7.4),
(34, 'Extraurbano', 4.2),
(34, 'Misto', 4.8),
(34, 'Urbano', 5.8),
(35, 'Extraurbano', 4.6),
(35, 'Misto', 5.1),
(35, 'Urbano', 6.1),
(36, 'Extraurbano', 7.5),
(36, 'Misto', 2.3),
(36, 'Urbano', 2),
(37, 'Extraurbano', 4.5),
(37, 'Misto', 5.3),
(37, 'Urbano', 6.6),
(38, 'Extraurbano', 4.1),
(38, 'Misto', 4.7),
(38, 'Urbano', 5.7),
(39, 'Extraurbano', 5.6),
(39, 'Misto', 6.4),
(39, 'Urbano', 7.8),
(40, 'Extraurbano', 5.5),
(40, 'Misto', 6.3),
(40, 'Urbano', 7.6),
(41, 'Extraurbano', 4),
(41, 'Misto', 4.7),
(41, 'Urbano', 5.9),
(42, 'Extraurbano', 6.5),
(42, 'Misto', 1.6),
(42, 'Urbano', 1.4),
(43, 'Extraurbano', 3.9),
(43, 'Misto', 4.6),
(43, 'Urbano', 5.8),
(44, 'Extraurbano', 4.3),
(44, 'Misto', 4.9),
(44, 'Urbano', 5.9),
(45, 'Extraurbano', 4.6),
(45, 'Misto', 5.2),
(45, 'Urbano', 6.3),
(46, 'Extraurbano', 6.2),
(46, 'Misto', 5.9),
(46, 'Urbano', 5.6),
(47, 'Extraurbano', 4.2),
(47, 'Misto', 4.8),
(47, 'Urbano', 5.8),
(48, 'Extraurbano', 4.7),
(48, 'Misto', 5.2),
(48, 'Urbano', 6),
(49, 'Extraurbano', 5.5),
(49, 'Misto', 5.3),
(49, 'Urbano', 5.1),
(50, 'Extraurbano', 7.2),
(50, 'Misto', 2.1),
(50, 'Urbano', 1.9);

-- --------------------------------------------------------

--
-- Struttura della tabella `consumi_tipo`
--

CREATE TABLE `consumi_tipo` (
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `consumi_tipo`
--

INSERT INTO `consumi_tipo` (`tipo`) VALUES
('Extraurbano'),
('Misto'),
('Urbano');

-- --------------------------------------------------------

--
-- Struttura della tabella `costi_mantenimento`
--

CREATE TABLE `costi_mantenimento` (
  `id_modulo` int(11) NOT NULL,
  `modulo` varchar(100) NOT NULL,
  `prezzo_min` float NOT NULL,
  `prezzo_max` float NOT NULL,
  `chilometraggio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `costi_regione`
--

CREATE TABLE `costi_regione` (
  `Regione` varchar(50) NOT NULL,
  `benzina` float NOT NULL,
  `diesel` float NOT NULL,
  `gpl` float NOT NULL,
  `metano` float NOT NULL,
  `euro0` float NOT NULL,
  `euro1` float NOT NULL,
  `euro2` float NOT NULL,
  `euro3` float NOT NULL,
  `euro4` float NOT NULL,
  `euro5` float NOT NULL,
  `euro6` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `costi_regione`
--

INSERT INTO `costi_regione` (`Regione`, `benzina`, `diesel`, `gpl`, `metano`, `euro0`, `euro1`, `euro2`, `euro3`, `euro4`, `euro5`, `euro6`) VALUES
('Abruzzo', 1.737, 2.062, 0.794, 1.511, 0, 0, 0, 0, 0, 0, 0),
('Basilicata', 1.765, 2.08, 0.765, 1.567, 0, 0, 0, 0, 0, 0, 0),
('Bolzano', 1.767, 2.084, 0.857, 1.757, 0, 0, 0, 0, 0, 0, 0),
('Calabria', 1.753, 2.073, 0.831, 1.645, 0, 0, 0, 0, 0, 0, 0),
('Campania', 1.742, 2.059, 0.777, 1.541, 0, 0, 0, 0, 0, 0, 0),
('Emilia Romagna', 1.734, 2.063, 0.794, 1.549, 0, 0, 0, 0, 0, 0, 0),
('Friuli Venezia Giulia', 1.745, 2.078, 0.791, 1.544, 0, 0, 0, 0, 0, 0, 0),
('Lazio', 1.731, 2.051, 0.788, 1.695, 0, 0, 0, 0, 0, 0, 0),
('Liguria', 1.737, 2.062, 0.871, 1.555, 0, 0, 0, 0, 0, 0, 0),
('Lombardia', 1.726, 2.058, 0.79, 1.559, 0, 0, 0, 0, 0, 0, 0),
('Marche', 1.726, 2.051, 0.808, 1.529, 0, 0, 0, 0, 0, 0, 0),
('Molise', 1.759, 2.072, 0.811, 1.481, 0, 0, 0, 0, 0, 0, 0),
('Piemonte', 1.724, 2.061, 0.79, 1.566, 0, 0, 0, 0, 0, 0, 0),
('Puglia', 1.748, 2.067, 0.775, 1.639, 0, 0, 0, 0, 0, 0, 0),
('Sardegna', 1.74, 2.079, 0.859, 0, 0, 0, 0, 0, 0, 0, 0),
('Sicilia', 1.752, 2.075, 0.82, 1.816, 0, 0, 0, 0, 0, 0, 0),
('Toscana', 1.733, 2.067, 0.8, 1.601, 0, 0, 0, 0, 0, 0, 0),
('Trento', 1.745, 2.075, 0.807, 1.554, 0, 0, 0, 0, 0, 0, 0),
('Umbria', 1.739, 2.059, 0.798, 1.546, 0, 0, 0, 0, 0, 0, 0),
('Valle d\'Aosta', 1.742, 2.069, 0.874, 0, 0, 0, 0, 0, 0, 0, 0),
('Veneto', 1.728, 2.05, 0.796, 1.515, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `freni`
--

CREATE TABLE `freni` (
  `id_Freno` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `freni`
--

INSERT INTO `freni` (`id_Freno`, `tipo`) VALUES
(1, 'Tamburo'),
(2, 'Disco Solid'),
(3, 'Disco Ventilato'),
(4, 'Carboceramici');

-- --------------------------------------------------------

--
-- Struttura della tabella `marca`
--

CREATE TABLE `marca` (
  `id_Marca` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descrizione` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `marca`
--

INSERT INTO `marca` (`id_Marca`, `nome`, `descrizione`) VALUES
(1, 'Fiat', 'Storico marchio italiano, leader nelle city car.'),
(2, 'Volkswagen', 'Colosso tedesco, auto solide e razionali.'),
(3, 'Toyota', 'Pioniere dell ibrido e marchio più venduto al mondo.'),
(4, 'Ford', 'Marchio americano con forte presenza europea.'),
(5, 'Peugeot', 'Design francese audace e motori efficienti.'),
(6, 'Renault', 'Innovazione francese e ampia gamma di modelli.'),
(7, 'Dacia', 'Il re del rapporto qualità-prezzo.'),
(8, 'Alfa Romeo', 'Sportività e dinamica di guida italiana.'),
(9, 'BMW', 'Premium tedesco votato al piacere di guida.'),
(10, 'Audi', 'Tecnologia, trazione quattro e finiture premium.'),
(11, 'Mercedes-Benz', 'Lusso, comfort e innovazione tecnologica.'),
(12, 'Hyundai', 'Tecnologia coreana e design all avanguardia.'),
(13, 'Kia', 'Design moderno e 7 anni di garanzia.'),
(14, 'Nissan', 'Pionieri nei crossover con Qashqai e Juke.'),
(15, 'Jeep', 'Il riferimento per i SUV e l off-road.');

-- --------------------------------------------------------

--
-- Struttura della tabella `motore`
--

CREATE TABLE `motore` (
  `id_Motore` int(11) NOT NULL,
  `alimentazione` varchar(50) NOT NULL,
  `cilindrata_CC` int(11) NOT NULL,
  `cavalli` int(11) NOT NULL,
  `n_Cilindri` int(11) NOT NULL,
  `cambio` varchar(50) DEFAULT NULL,
  `trazione` varchar(50) DEFAULT NULL,
  `id_sov` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `motore`
--

INSERT INTO `motore` (`id_Motore`, `alimentazione`, `cilindrata_CC`, `cavalli`, `n_Cilindri`, `cambio`, `trazione`, `id_sov`) VALUES
(1, 'Benzina (Mild)', 999, 70, 3, 'Manuale', 'Anteriore', 1),
(2, 'Benzina', 1242, 69, 4, 'Manuale', 'Anteriore', 1),
(3, 'Diesel', 1598, 130, 4, 'Manuale', 'Anteriore', 2),
(4, 'Benzina (Mild)', 1469, 130, 4, 'Automatico', 'Anteriore', 2),
(5, 'Benzina', 999, 95, 3, 'Manuale', 'Anteriore', 2),
(6, 'Benzina (Mild)', 1498, 150, 4, 'Automatico', 'Anteriore', 2),
(7, 'Diesel', 1968, 150, 4, 'Automatico', 'Integrale', 2),
(8, 'Diesel', 1968, 115, 4, 'Manuale', 'Anteriore', 2),
(9, 'Diesel', 1968, 150, 4, 'Automatico', 'Anteriore', 2),
(10, 'Benzina', 998, 72, 3, 'Manuale', 'Anteriore', 1),
(11, 'Benzina (Full)', 1490, 116, 3, 'Automatico', 'Anteriore', 1),
(12, 'Benzina (Full)', 1490, 116, 3, 'Automatico', 'Integrale', 1),
(13, 'Benzina (Full)', 1798, 140, 4, 'Automatico', 'Anteriore', 1),
(14, 'Benzina (Full)', 2487, 222, 4, 'Automatico', 'Integrale', 1),
(15, 'Benzina (Mild)', 999, 125, 3, 'Manuale', 'Anteriore', 2),
(16, 'Benzina (Mild)', 999, 155, 3, 'Automatico', 'Anteriore', 2),
(17, 'Diesel', 1499, 120, 4, 'Automatico', 'Anteriore', 2),
(18, 'Benzina (Plug-in)', 2488, 225, 4, 'Automatico', 'Anteriore', 1),
(19, 'Benzina', 1199, 100, 3, 'Manuale', 'Anteriore', 2),
(20, 'Benzina', 1199, 130, 3, 'Automatico', 'Anteriore', 2),
(21, 'Diesel', 1499, 130, 4, 'Automatico', 'Anteriore', 2),
(22, 'Benzina (Plug-in)', 1598, 225, 4, 'Automatico', 'Anteriore', 2),
(23, 'Benzina', 999, 90, 3, 'Manuale', 'Anteriore', 2),
(24, 'Benzina (Full)', 1598, 145, 4, 'Automatico', 'Anteriore', 1),
(25, 'GPL', 999, 100, 3, 'Manuale', 'Anteriore', 2),
(26, 'Benzina (Full)', 1199, 200, 3, 'Automatico', 'Anteriore', 2),
(27, 'GPL', 999, 100, 3, 'Manuale', 'Anteriore', 2),
(28, 'Diesel', 1461, 115, 4, 'Manuale', 'Integrale', 2),
(29, 'Benzina (Full)', 1598, 140, 4, 'Automatico', 'Anteriore', 1),
(30, 'Benzina (Mild)', 1469, 130, 4, 'Automatico', 'Anteriore', 2),
(31, 'Diesel', 2143, 210, 4, 'Automatico', 'Integrale', 2),
(32, 'Benzina', 1995, 280, 4, 'Automatico', 'Integrale', 2),
(33, 'Benzina', 1499, 136, 3, 'Automatico', 'Anteriore', 2),
(34, 'Diesel (Mild)', 1995, 190, 4, 'Automatico', 'Posteriore', 2),
(35, 'Diesel (Mild)', 1995, 150, 4, 'Automatico', 'Anteriore', 2),
(36, 'Benzina (Plug-in)', 1998, 292, 4, 'Automatico', 'Integrale', 2),
(37, 'Benzina', 999, 110, 3, 'Manuale', 'Anteriore', 2),
(38, 'Diesel', 1968, 150, 4, 'Automatico', 'Anteriore', 2),
(39, 'Benzina (Mild)', 1498, 150, 4, 'Automatico', 'Anteriore', 2),
(40, 'Diesel (Mild)', 1968, 204, 4, 'Automatico', 'Integrale', 2),
(41, 'Diesel', 1950, 150, 4, 'Automatico', 'Anteriore', 2),
(42, 'Benzina (Plug-in)', 1332, 218, 4, 'Automatico', 'Anteriore', 2),
(43, 'Diesel (Mild)', 1993, 200, 4, 'Automatico', 'Posteriore', 2),
(44, 'Benzina', 998, 67, 3, 'Manuale', 'Anteriore', 1),
(45, 'Benzina (Mild)', 998, 100, 3, 'Manuale', 'Anteriore', 2),
(46, 'Benzina (Full)', 1598, 230, 4, 'Automatico', 'Integrale', 2),
(47, 'Benzina', 998, 67, 3, 'Manuale', 'Anteriore', 1),
(48, 'Diesel (Mild)', 1598, 136, 4, 'Automatico', 'Anteriore', 2),
(49, 'Benzina (Full)', 1497, 190, 3, 'Automatico', 'Anteriore', 2),
(50, 'Benzina (Plug-in)', 1332, 240, 4, 'Automatico', 'Integrale', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `sovralimentazione`
--

CREATE TABLE `sovralimentazione` (
  `id_Sov` int(11) NOT NULL,
  `descrizione` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `sovralimentazione`
--

INSERT INTO `sovralimentazione` (`id_Sov`, `descrizione`) VALUES
(1, 'Aspirato'),
(2, 'Turbocompressore'),
(3, 'Biturbo'),
(4, 'Compressore Volumetrico');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id_Auto`),
  ADD KEY `id_carrozzeria` (`id_carrozzeria`),
  ADD KEY `id_marca` (`id_marca`),
  ADD KEY `id_freni_dietro` (`id_freni_dietro`),
  ADD KEY `id_freni_davanti` (`id_freni_davanti`),
  ADD KEY `id_motore` (`id_motore`);

--
-- Indici per le tabelle `carrozzeria`
--
ALTER TABLE `carrozzeria`
  ADD PRIMARY KEY (`id_Carrozzeria`);

--
-- Indici per le tabelle `consumi_100km`
--
ALTER TABLE `consumi_100km`
  ADD PRIMARY KEY (`id_auto`,`tipo`),
  ADD KEY `tipo` (`tipo`);

--
-- Indici per le tabelle `consumi_tipo`
--
ALTER TABLE `consumi_tipo`
  ADD PRIMARY KEY (`tipo`);

--
-- Indici per le tabelle `costi_mantenimento`
--
ALTER TABLE `costi_mantenimento`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indici per le tabelle `costi_regione`
--
ALTER TABLE `costi_regione`
  ADD PRIMARY KEY (`Regione`);

--
-- Indici per le tabelle `freni`
--
ALTER TABLE `freni`
  ADD PRIMARY KEY (`id_Freno`);

--
-- Indici per le tabelle `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_Marca`);

--
-- Indici per le tabelle `motore`
--
ALTER TABLE `motore`
  ADD PRIMARY KEY (`id_Motore`),
  ADD KEY `id_sov` (`id_sov`);

--
-- Indici per le tabelle `sovralimentazione`
--
ALTER TABLE `sovralimentazione`
  ADD PRIMARY KEY (`id_Sov`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `auto`
--
ALTER TABLE `auto`
  MODIFY `id_Auto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT per la tabella `carrozzeria`
--
ALTER TABLE `carrozzeria`
  MODIFY `id_Carrozzeria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `costi_mantenimento`
--
ALTER TABLE `costi_mantenimento`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `freni`
--
ALTER TABLE `freni`
  MODIFY `id_Freno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `marca`
--
ALTER TABLE `marca`
  MODIFY `id_Marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `motore`
--
ALTER TABLE `motore`
  MODIFY `id_Motore` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT per la tabella `sovralimentazione`
--
ALTER TABLE `sovralimentazione`
  MODIFY `id_Sov` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_ibfk_1` FOREIGN KEY (`id_carrozzeria`) REFERENCES `carrozzeria` (`id_Carrozzeria`),
  ADD CONSTRAINT `auto_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_Marca`),
  ADD CONSTRAINT `auto_ibfk_3` FOREIGN KEY (`id_freni_dietro`) REFERENCES `freni` (`id_Freno`),
  ADD CONSTRAINT `auto_ibfk_4` FOREIGN KEY (`id_freni_davanti`) REFERENCES `freni` (`id_Freno`),
  ADD CONSTRAINT `auto_ibfk_5` FOREIGN KEY (`id_motore`) REFERENCES `motore` (`id_Motore`);

--
-- Limiti per la tabella `consumi_100km`
--
ALTER TABLE `consumi_100km`
  ADD CONSTRAINT `consumi_100km_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `consumi_tipo` (`tipo`),
  ADD CONSTRAINT `consumi_100km_ibfk_2` FOREIGN KEY (`id_auto`) REFERENCES `auto` (`id_Auto`);

--
-- Limiti per la tabella `motore`
--
ALTER TABLE `motore`
  ADD CONSTRAINT `motore_ibfk_1` FOREIGN KEY (`id_sov`) REFERENCES `sovralimentazione` (`id_Sov`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
