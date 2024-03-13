-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: ticket_ti
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Administrators`
--

DROP TABLE IF EXISTS `Administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Administrators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `privilege` tinyint(1) NOT NULL,
  `allPrivileges` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PersonId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PersonId` (`PersonId`),
  CONSTRAINT `Administrators_ibfk_1` FOREIGN KEY (`PersonId`) REFERENCES `People` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administrators`
--

LOCK TABLES `Administrators` WRITE;
/*!40000 ALTER TABLE `Administrators` DISABLE KEYS */;
INSERT INTO `Administrators` VALUES (2,'admin','$2a$10$9tZIQKf.HmGy0HYaowSIaOBIUG8ALUKUWk2dzain0MkuWTDyg9AQ6',1,1,'2024-02-06 14:21:12','2024-03-13 13:33:12',2);
/*!40000 ALTER TABLE `Administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Departaments`
--

DROP TABLE IF EXISTS `Departaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Departaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departaments`
--

LOCK TABLES `Departaments` WRITE;
/*!40000 ALTER TABLE `Departaments` DISABLE KEYS */;
INSERT INTO `Departaments` VALUES (1,'TI','2023-07-10 00:00:00','2024-03-13 13:34:11');
/*!40000 ALTER TABLE `Departaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `reference` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ReferenceTypeId` int DEFAULT NULL,
  `DepartamentId` int DEFAULT NULL,
  `PersonId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ReferenceTypeId` (`ReferenceTypeId`),
  KEY `DepartamentId` (`DepartamentId`),
  KEY `PersonId` (`PersonId`),
  CONSTRAINT `Equipment_ibfk_1` FOREIGN KEY (`ReferenceTypeId`) REFERENCES `ReferenceTypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Equipment_ibfk_2` FOREIGN KEY (`DepartamentId`) REFERENCES `Departaments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Equipment_ibfk_3` FOREIGN KEY (`PersonId`) REFERENCES `People` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
INSERT INTO `Equipment` VALUES (5,'Desktop Novo OptiPlex Micro','00523','2024-03-13 13:39:59','2024-03-13 13:39:59',1,1,2);
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Institutions`
--

DROP TABLE IF EXISTS `Institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Institutions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Institutions`
--

LOCK TABLES `Institutions` WRITE;
/*!40000 ALTER TABLE `Institutions` DISABLE KEYS */;
INSERT INTO `Institutions` VALUES (61,'Empresa A','2024-02-17 14:38:06','2024-03-13 13:37:17');
/*!40000 ALTER TABLE `Institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `People`
--

DROP TABLE IF EXISTS `People`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `People` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `InstitutionId` int DEFAULT NULL,
  `DepartamentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `InstitutionId` (`InstitutionId`),
  KEY `DepartamentId` (`DepartamentId`),
  CONSTRAINT `People_ibfk_1` FOREIGN KEY (`InstitutionId`) REFERENCES `Institutions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `People_ibfk_2` FOREIGN KEY (`DepartamentId`) REFERENCES `Departaments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `People`
--

LOCK TABLES `People` WRITE;
/*!40000 ALTER TABLE `People` DISABLE KEYS */;
INSERT INTO `People` VALUES (2,'Admin','Developer','2024-02-06 13:56:05','2024-03-13 13:33:57',61,1);
/*!40000 ALTER TABLE `People` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReferenceTypes`
--

DROP TABLE IF EXISTS `ReferenceTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReferenceTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReferenceTypes`
--

LOCK TABLES `ReferenceTypes` WRITE;
/*!40000 ALTER TABLE `ReferenceTypes` DISABLE KEYS */;
INSERT INTO `ReferenceTypes` VALUES (1,'Número de patrimônio','2023-07-10 00:00:00','2024-02-28 21:49:18');
/*!40000 ALTER TABLE `ReferenceTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tickets` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `solution` text NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DepartamentId` int DEFAULT NULL,
  `PersonId` int DEFAULT NULL,
  `AdministratorId` int DEFAULT NULL,
  `EquipmentId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DepartamentId` (`DepartamentId`),
  KEY `PersonId` (`PersonId`),
  KEY `AdministratorId` (`AdministratorId`),
  KEY `EquipmentId` (`EquipmentId`),
  CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`DepartamentId`) REFERENCES `Departaments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Tickets_ibfk_2` FOREIGN KEY (`PersonId`) REFERENCES `People` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Tickets_ibfk_3` FOREIGN KEY (`AdministratorId`) REFERENCES `Administrators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Tickets_ibfk_4` FOREIGN KEY (`EquipmentId`) REFERENCES `Equipment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (13,'Desktop Novo OptiPlex Micro estão superaquecendo durante o uso prolongado','Desktop está superaquecendo durante o uso prolongado, levando a desligamentos automáticos e redução no desempenho do sistema. O usuário relatara uma queda significativa no desempenho durante tarefas intensivas, como jogos ou renderização de vídeos, devido ao superaquecimento do hardware.','Foi realizada uma limpeza completa dos ventiladores internos e das entradas de ar do gabinete.','2024-03-13','09:03:00','09:28:00','2024-03-13 13:48:47','2024-03-13 13:48:47',1,2,2,5);
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 10:50:33
