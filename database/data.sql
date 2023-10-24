-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2023 at 05:10 PM
-- Server version: 10.5.19-MariaDB-cll-lve
-- PHP Version: 8.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u528477660_vel063`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `Aid` int(11) NOT NULL,
  `Vid` int(11) NOT NULL,
  `Aname` varchar(100) DEFAULT NULL,
  `NumQuests` int(11) NOT NULL,
  `startTime` int(11) NOT NULL,
  `endTime` int(11) NOT NULL,
  `countdown` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`Aid`, `Vid`, `Aname`, `NumQuests`, `startTime`, `endTime`, `countdown`) VALUES
(103, 158, 'webDEV01', 2, 60, 120, 1800),
(104, 159, 'webDEV02', 2, 60, 120, 1800),
(105, 160, 'webDEV03', 4, 60, 120, 1800),
(168, 196, 'Quiz01-แบบฝึกหัดก่อนเรียน', 3, 0, 60, 300),
(169, 196, 'Quiz02-แบบฝึกหัดระหว่างเรียน', 4, 120, 180, 300),
(170, 203, 'test', 2, 60, 120, 240);

-- --------------------------------------------------------

--
-- Table structure for table `evideo`
--

CREATE TABLE `evideo` (
  `Vid` int(11) NOT NULL,
  `SJid` varchar(11) NOT NULL,
  `Vname` varchar(100) NOT NULL,
  `Vlink` varchar(255) NOT NULL,
  `Enddate` date DEFAULT NULL,
  `Vinfo` varchar(500) DEFAULT NULL,
  `Vtype` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evideo`
--

INSERT INTO `evideo` (`Vid`, `SJid`, `Vname`, `Vlink`, `Enddate`, `Vinfo`, `Vtype`) VALUES
(158, '1203120', 'Lab0100', 'https://www.youtube.com/embed/rJZ2C3kxbHk?si=m94dV7YiHhZDBwbL', '2023-10-31', 'ติดตั้งโปรแกรม Visual Studio', 1),
(159, '1203120', 'Lab0101 01', 'https://www.youtube.com/embed/_E0aR0NsadI?si=aLHWQ32vmiX9WHBK', '2023-10-31', 'Debugging Step Over', 1),
(160, '1203120', 'Lab0101 02 ', 'https://www.youtube.com/embed/q0FRkHv2s40?si=78Cy6G5kVrGLTzx_', '2023-10-31', 'Debugging Step Into', 1),
(196, '1204208', 'OOP-Lec01-Class คืออะไร', 'https://youtu.be/vodBFc6oUOs?si=h0BMAG6cJaUPbmVZ', '2023-10-26', 'วิชา Object Oriented Programming Lecture 1 สอนเรื่อง Class คืออะไร', 1),
(197, '1204208', 'OOP-Lec01-Object คืออะไร', 'https://youtu.be/O74C1rl9J1s?si=Zj18F3Ck2BuMLsmB', '2023-10-26', 'Object Oriented Programming Lecture01 สอนเกี่ยวกับความหมายของ Object ว่าคืออะไร?', 0),
(198, '1204208', 'OOP-Lec01-ความสัมพันธ์ระหว่าง Class และ Object', 'https://youtu.be/phUUK380T1A?si=APEVYqPYwkuinyIx', '2023-10-26', 'Object Oriented Programming Lecture 1 สอนเกี่ยวกับ ความสัมพันธ์ระหว่าง Class และ Object', 1),
(199, '1204304', 'WebDev-Grid Bootstrap', 'https://youtu.be/L7MktCJwl5Q?si=248j3Yv6FsG0dZKu', '2023-10-26', 'Web development สอนการใช้งาน Grid ของ Bootstrap', 1),
(200, '1204304', 'WebDev-Request form', 'https://youtu.be/PaVpX_HGz_8?si=QQlj-N-MA4EMAVCp', '2023-10-26', 'Web development สอนเรื่อง Request form', 1),
(201, '1204311', 'APD-EF Database Connection', 'https://youtu.be/BCNDSRsFBEc?si=YxB_WA8Xb7d-xDgz', '2023-10-26', 'Application Program Development สอนการใช้ EF Database Connection', 1),
(202, '1204311', 'APD-Read QR Code', 'https://youtu.be/AEvzyLOewdA?si=QE2JjXiuWGAa9OZk', '2023-10-26', 'Application Program Development สอนเกี่ยวกับการใช้งานฟังก์ชันอ่าน QR Code ', 1),
(203, '1204304', 'test', 'https://www.youtube.com/watch?v=mVqOB3KcfoA', '2023-10-16', 'sdlkfjlashgoshgsdf', 1),
(204, '1203120', 'test', '', '2023-10-02', '', 0),
(205, '1203120', 'test', 'https://www.youtube.com/watch?v=mVqOB3KcfoA', '2023-10-02', '64948', 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `Qid` int(11) NOT NULL,
  `Aid` int(11) NOT NULL,
  `Question` varchar(500) NOT NULL,
  `PIC` varchar(255) DEFAULT NULL,
  `Qtype` tinyint(1) NOT NULL,
  `A` varchar(255) NOT NULL,
  `B` varchar(255) NOT NULL,
  `C` varchar(255) NOT NULL,
  `D` varchar(255) NOT NULL,
  `E` varchar(255) NOT NULL,
  `Answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`Qid`, `Aid`, `Question`, `PIC`, `Qtype`, `A`, `B`, `C`, `D`, `E`, `Answer`) VALUES
(473, 103, 'การออกแบบเว็บไซต์ที่เน้นการนำเสนอเนื้อหามากกว่ารูปภาพ เป็นรูปแบบการออกแบบเว็บไซต์แบบใด', NULL, 1, 'เน้นการนำเสนอเนื้อหา', 'เน้นภาพกราฟิก', 'มีทั้งภาพและเนื้อหา', 'เน้นความสวยงาม', '', 'C'),
(474, 103, 'การออกแบบเว็บไซต์ที่เน้นภาพกราฟิกที่สวยงาม ซึ่งอาจจะใช้โปรแกรม Photoshop สำหรับการตกแต่งภาพ เป็นรูปแบบการออกแบบเว็บไซต์แบบใด', NULL, 1, 'เน้นการนำเสนอเนื้อหา', 'เน้นภาพกราฟิก', 'มีทั้งภาพและเนื้อหา', 'เน้นความสวยงาม', '', 'B'),
(476, 104, 'อินเทอร์เน็ตมีความหมายตรงกับข้อใด', NULL, 1, 'การเชื่อมต่อกันระหว่างเครือข่าย', 'การเชื่อมต่อกันระหว่างบุคคลกับบุคคล', 'การเชื่อมต่อกันระหว่างบุคคลกับองค์กร', 'การเชื่อมต่อกันระหว่างองค์กรกับองค์กร', '', 'A'),
(477, 104, 'URL มีความส าคัญอย่างไรกับเว็บ', NULL, 1, 'ที่อยู่ของข้อมูลต่างๆบนอินเทอร์เน็ต', 'โปรแกรมคอมพิวเตอร์ที่จัดเก็บในหน้าเว็บ', 'หน้าแรกของเว็บไซต', 'ข้อมูลหรือสคริปต์ที่เขียนไว้ในเว็บเพจ', '', 'A'),
(478, 104, 'ข้อใดไม่ใช่ส่วนประกอบของ URL', NULL, 1, 'Protocol', 'Domino', 'Filename', 'Path', '', 'B'),
(480, 105, 'Web Site มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', ' โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'D'),
(481, 105, 'Web Page มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', ' เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'A'),
(482, 105, 'Home Page มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'C'),
(483, 105, 'Web Browser มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'B'),
(484, 105, ' ข้อใดไม่ใช่รูปแบบโครงสร้างของเว็บไซต์', NULL, 1, 'Hierarchical Structure', 'Portal Structure', 'Sequential Structure', 'Web Structure', '', 'B'),
(611, 168, 'ข้อใดไม่ใช่คุณสมบัติของ Class', NULL, 1, 'เป็นแหล่งรวมของ Object ทั้งหลาย', 'เปรียบเสมือนแบบพิมพ์ของวัตถุต่างๆ', 'มีส่วนประกอบเป็น attribute และ method', 'สามารถถูกใช้งานได้โดยตรง', 'ผิดทุกข้อ', 'D'),
(612, 168, 'จากภาพส่วนที่ลูกศรชี้คืออะไร?', '4278-OOP_Class_Quiz01_01.jpg', 1, 'Attribute', 'Method name', 'Class name', 'Parameter', 'Method', 'C'),
(613, 168, 'จากภาพส่วนที่อยู่ในสี่เหลี่ยม มีชื่อเรียกว่าอะไร?', '2610-OOP_Class_Quiz01_02.jpg', 0, 'Attribute', 'attribute', 'แอทริบิวต์', 'ATTRIBUTE', 'AttriBute', ''),
(614, 168, 'จากภาพส่วนที่อยู่ในสี่เหลี่ยม มีชื่อเรียกว่าอะไร?', '8779-OOP_Class_Quiz01_03.jpg', 0, 'Method', 'method', 'METHOD', 'เมธอด', 'เม็ดธอด', ''),
(615, 169, 'ในการเขียนโปรแกรมเชิงวัตถุการทำงานแบบ Information Hiding แบ่ง visibility ออกเป็นกี่ระดับ', NULL, 1, '1', '2', '3', '4', '5', 'C'),
(616, 169, 'ข้อใดคือหลักการทำงานแบบสืบทอดคุณสมบัติ', NULL, 1, 'information hiding', 'inheritance', 'polymorphism', 'encapsulation', 'ไม่มีข้อถูก', 'B'),
(617, 169, 'ข้อใดคือหลักการทำงานแบบห่อหุ้มข้อมูล', NULL, 1, 'information hiding', 'inheritance', 'polymorphism', 'encapsulation', 'ไม่มีข้อถูก', 'D'),
(618, 169, 'ข้อใดคือหลักการทำงานแบบพ้องรูป', NULL, 1, 'information hiding', 'polymorphism', 'inheritance', 'encapsulation', '', 'B'),
(619, 169, 'ข้อใดต่อไปนี้คือ method ของ นักศึกษา', NULL, 1, 'ลงทะเบียน', 'ชื่อนักศึกษา', 'รหัสนักศึกษา', 'สาขา', 'อายุนักศึกษา', 'A'),
(620, 169, 'ข้อใดต่อไปนี้ไม่ใช่ attribute ของพัดลม', NULL, 1, 'ใบพัด', 'มอเตอร์', 'ปุ่ม', 'สายไฟ', 'พัดลมสามารถเปิดได้', 'E'),
(621, 170, '11', NULL, 0, '11', '11', '11', '11', '11', ''),
(622, 170, '11', NULL, 1, '11', '11', '11', '11', '22', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `student_answer`
--

CREATE TABLE `student_answer` (
  `id` int(11) NOT NULL,
  `Sid` varchar(11) NOT NULL,
  `Qid` int(11) NOT NULL,
  `Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_answer`
--

INSERT INTO `student_answer` (`id`, `Sid`, `Qid`, `Answer`) VALUES
(213, '63011212056', 474, 'เน้นความสวยงาม'),
(214, '63011212056', 473, 'มีทั้งภาพและเนื้อหา'),
(216, '63011212088', 473, 'เน้นภาพกราฟิก'),
(217, '63011212088', 474, 'เน้นภาพกราฟิก'),
(218, '63011212099', 474, 'เน้นภาพกราฟิก'),
(220, '63011212099', 473, 'มีทั้งภาพและเนื้อหา'),
(221, '63011212056', 480, NULL),
(222, '63011212056', 483, NULL),
(223, '63011212056', 484, NULL),
(224, '63011212056', 482, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_assignment`
--

CREATE TABLE `student_assignment` (
  `id` int(11) NOT NULL,
  `Sid` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Aid` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_assignment`
--

INSERT INTO `student_assignment` (`id`, `Sid`, `Aid`, `score`, `Date`) VALUES
(78, '63011212056', 103, 2, '2023-10-17 13:31:30'),
(79, '63011212088', 103, 2, '2023-10-17 13:35:43'),
(80, '63011212099', 103, 3, '2023-10-17 13:43:18');

-- --------------------------------------------------------

--
-- Table structure for table `student_evideo`
--

CREATE TABLE `student_evideo` (
  `id` int(11) NOT NULL,
  `Sid` varchar(11) NOT NULL,
  `Vid` int(11) NOT NULL,
  `current` int(11) NOT NULL DEFAULT 0,
  `Status` varchar(50) NOT NULL DEFAULT 'not started yet'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_evideo`
--

INSERT INTO `student_evideo` (`id`, `Sid`, `Vid`, `current`, `Status`) VALUES
(64, '63011212056', 158, 0, '1'),
(65, '63011212056', 158, 0, '1'),
(66, '63011212088', 158, 87, '1'),
(67, '63011212088', 158, 0, '0'),
(68, '63011212099', 158, 0, '1'),
(69, '63011212056', 160, 30, '1'),
(70, '63011212056', 160, 30, '1'),
(71, '63011212056', 160, 30, '1');

-- --------------------------------------------------------

--
-- Table structure for table `student_request`
--

CREATE TABLE `student_request` (
  `Rid` int(11) NOT NULL,
  `Sid` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SJid` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_request`
--

INSERT INTO `student_request` (`Rid`, `Sid`, `SJid`, `Date`) VALUES
(73, '7302031', '1203120', '2023-10-13 04:37:40');

-- --------------------------------------------------------

--
-- Table structure for table `student_subject`
--

CREATE TABLE `student_subject` (
  `id` int(11) NOT NULL,
  `SJid` varchar(11) NOT NULL,
  `Sid` varchar(11) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_subject`
--

INSERT INTO `student_subject` (`id`, `SJid`, `Sid`, `Status`) VALUES
(98, '1203120', '63011212056', 1),
(103, '1203120', '63011212092', 1),
(107, '1203120', '63011212088', 1),
(108, '1203120', '63011212099', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `SJid` varchar(11) NOT NULL,
  `SJname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`SJid`, `SJname`) VALUES
('1203120', 'Computer Programming'),
('1204208', 'Object Oriented Programming'),
('1204304', 'Web development'),
('1204311', 'Application Program Development');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Uid` varchar(11) NOT NULL,
  `Sname` varchar(50) NOT NULL,
  `Spassword` varchar(255) NOT NULL,
  `User_PIC` varchar(255) DEFAULT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Uid`, `Sname`, `Spassword`, `User_PIC`, `role`) VALUES
('00012', 'Tanakon T', '$2y$12$z.AiYeiaxbal1zUJFMWdf.rb1zOk9yRshYX2AGRatpjL3PHPsA/c.', NULL, 0),
('00013', 'Tanakon T', '$2y$12$uvCVMH8NfInVR.bU3I6ice/Q9/0TQIaHMq2aSBJLZojlsCP3JxyYa', NULL, 0),
('1234', 'admin', '$2y$12$69kubGHqZ.n3FBzc9SGBw.OctCAu4r9yeQJiMYvObVd0X4wFYS1Cq', NULL, 1),
('30011212001', 'Student001', '$2y$12$yXluwBKUf4I7YCjc5/CMc.i1aD4Q921A3Fv9C1gRaVq.CXVccAcKW', '796-30011212001.jpg', 0),
('6011212000', 'Student006', '$2y$12$mGeU5dusxQDHhQttNQeiceKnbQ8m4QsMfp7aGUzgTlZNTfmwthRqe', NULL, 0),
('63011111111', 'Student555', '$2y$12$9PXQK6fRKPQisqU0cX1YFebr8liZ.dcqHxUFAHswGuq/pRnBLHcAa', '5413-63011111111.jpg', 0),
('6301121001', 'Tanakon T', '$2y$12$Tf0sIEaEfJEAP367sGXK7ezdi404iSVr0i9y2HeZWnM.mn8T5S9mu', '5670-6301121001.jpg', 0),
('63011211100', 'ฐณกร ทันโคกกรวด', '$2y$12$pevX8zKl6Ew8LXrWkDeBTuw4opu9DwWF0vFb0fptBH9LzTbG3hhLe', '9073-630112111001.jpg', 0),
('6301121200', 'ก้าว ฐณกร', '$2y$12$TLXEDzQrl6eIBXpbKGWGj.sPk8ULWXSCoLaeRcWztb/I6hEOdXOdy', NULL, 0),
('63011212000', 'Student0', '$2y$12$xsockFGvdXQNV8aulv24Jetn497fZ6kw1o3CV2gw8SsP7SGYcUSZO', NULL, 0),
('63011212005', 'Student05', '$2y$12$j/4MzxlmJsoQYDLYJ0LHpuI5c69C5D8kmUuqM/8XHmFUtPkmjcRi2', NULL, 0),
('63011212009', 'ก้าว ฐณกร', '$2y$12$pXsUoa0ZhWz5Z3zqY62N3O69rrzyaEQEqFsrSQktTI3vQJDHt2VsW', NULL, 0),
('63011212011', 'sniff kung', '$2y$12$hP1jhK27WOqaz3EkiSE2m.1vm4bajyeue92ZE0Mw9IZlVTRYlRvHO', NULL, 0),
('63011212012', 'tar gush', '$2y$12$Pp9AkgWhuE8JmPyUwGmR9uVScBTMjyNKzArwPm3qjOSjmsyQJ1HTm', NULL, 0),
('63011212018', 'kayn snif', 'utfyutfuygfgjyg', NULL, 0),
('63011212031', 'ฐณกร ทันโคกกรวด', '4321', NULL, 0),
('63011212032', 'Tanakon', '$2y$12$XRiu.pOsvc8H/wRzmMfeuuYKFM73TJdNgQ5LabIYxwnAgnGjWngHe', NULL, 0),
('63011212033', 'สมชาย ขุนทด', '$2y$12$aq6FDhMA9cf7ByZjxC.3n.mElxA0CpEULeYs3TR6ziaANhsTKPqti', NULL, 0),
('63011212034', 'สมชาย สุดขุนทด', '$2y$12$Tc/PCIdGBNlzdBasm0q7J..phujAs9OlAkPdDC4wYdc/4xipVAp3G', NULL, 0),
('63011212040', 'john doh', '1111121121212212121212', NULL, 0),
('63011212056', 'suphakon', '$2y$12$fGpfvsFjqdUZdMY1WEZjMOSHy5.tqjAjfq7yvMmjOFJlZyVWjh4T.', '4021-63011212056.png', 0),
('63011212088', 'Beatriz eric', '$2y$12$WWhnTeI.jKgWh9MW2yZZeuc0KbS6f4iwjQWKDJ8515982OztuHYdK', NULL, 0),
('63011212092', 'ฐณกร ทันโคกกรวด', '$2y$12$6xYBYidl1DKMZfVqT1jpGeE1weOoq2iW9pSkuroCxpQg2crcXZBf6', '296-63011212092.jpg', 0),
('63011212099', 'Gabriel Han', '$2y$12$2BWbf6LJVI1AiZEolkLaI.zcW2sTlqkFwx2nbIt2uKVs1C2Vyqdb.', NULL, 0),
('63011212100', 'ฐณกร ทันโคกกรวด', '$2y$12$IbH9qhK4pR/IgUl7sVOc1u7xp4BleOngvVExviLpTd3YNpiTHzFdy', '1732-630112121001.jpg', 0),
('63011212103', 'ธนกร ทันโคกกรวด', '$2y$12$hZK2hxBjNL7642r5qqCVCe4vLV6DJ2ONhgP3.n9m5D18zVoIgoR.u', '334-63011212103.jpg', 0),
('6301121211', 'Tanakon Tankokkurd', '$2y$12$TBy2P5jUjJ8G8Vihtpsvz.8BslS2s6/XJ/B3FytcG5yR4owzyeqiu', NULL, 0),
('63011212111', 'Tanakon Tankokkurd', '$2y$12$YiEo0bd2FOBEFepu5vyCuuSyodV3yK9ACDMtEf74LaH8508pLyNj2', NULL, 0),
('63011212117', 'Tanakon Tankokkurd', '$2y$12$Ao5kYprHZrGyKeSk0fW5eu0AH/hxPjJgPtaN6spb0oFfZsapouhVC', NULL, 0),
('63011212118', 'Tanakon Tankokkurd', '$2y$12$mW1CIq29sC/T9IVORZJ5Beff3ol/R/H0ULdgRCO7/PPy2WBfR5x0O', NULL, 0),
('63011212131', 'สมหญิง แสงขุนทด', '$2y$12$HUA/uzbTTx6nVdsGcekdRutTOJkVZcHwpGzW.Pj2uqN5jpscdi4QK', NULL, 0),
('6388', 'gggg gggg', '$2y$12$ndIXxMP3Zbq5SO3HT10orOW4BUqyNnnz374vIMZhhM7poooTdJtlO', 'sdd.jpg', 0),
('63884863', 'samson J drakes', '$2y$12$AcF2ZSaiULJGRU96BYxKTeImWZJjGeA3lfIwGDvGEz6PWvWPHDU96', '9341-63884863.jpg', 0),
('64011212000', 'Student006', '$2y$12$5Wj7mtCawpxiZlbduLfzTehR8/aksnolAcKWvXQx6x9PoCck1R8RW', NULL, 0),
('6401121212', 'Student001', '$2y$12$iNL3lfY9u6jzhDDaQTeeIu9hS7MzE.7XIdoGsEdAjjSuRj1zD2Vhe', NULL, 0),
('64011212123', 'Student0', '$2y$12$nUKOcj/L73mbqNpzL3A4Ve4ECIIOL6Ib5E2mix5ekEqgvULVJrjqu', NULL, 0),
('64011212125', 'Student001', '$2y$12$/Jz6BF.tyOEtliCUft4YCOKemZiAmL5qn8BPu1FJ0KfsonALGrvP6', NULL, 0),
('64011212126', 'Student001', '$2y$12$YebbfJAMd0GH/n1nosOhSu7UszE2lN08803GgjnkBAk6kyIz3tjwW', NULL, 0),
('6501', 'demo_student', '$2y$12$ovVDPm5cqPCUkd5ueXNOt.QoULpR5rZxtHT0Bw/uVIrmNc3VLEM26', NULL, 0),
('65011212000', 'Student006', '$2y$12$kVkhjpveL9q.jXnpIjZSm.vU4vkDydrEisKv3vi5/g201RtvWys2u', NULL, 0),
('68011212001', 'สมชาย ขุนทด', '$2y$12$3CTWZoeoq4gMBCmKFJAFqONFbz2MLP2rReGcy4T9H.MlPDJFd5wny', NULL, 0),
('70011212001', 'Student0', '$2y$12$ZMU/Kb9yYPEcGjuMGHgQJeGpp132UPmhQVK6hGNwEEU2z3FpdaENW', NULL, 0),
('7011212001', 'Student0', '$2y$12$T/q/NpkGgnql/K6Ux7fEYeUDf0kjXTnXFzda49FYvu0bY6yF294Ma', NULL, 0),
('71011212001', 'Student0', '$2y$12$ogYH79HrXFA3FATTRNrnl.2PZjiNNseXBry0l07mpAh3HzPlObLO.', NULL, 0),
('72011212031', 'ฐณกร ทันโคกกรวด', '$2y$12$sA0u0AAmbV9IM6HErO7US.VRbndsYwDCz6GYFThjSwGTcdDo8IL6C', NULL, 0),
('7302031', 'ธนกร ทันโคกกรวด', '$2y$12$T3VFxFX5yJ/a9GTN1NMTIeWjnufFBjdmrj5I.gd.c0o.5Ugswg50u', '2369-7302031.jpg', 0),
('7302032', 'ฐณกร ทันโคกกรวด', '$2y$12$qBQTwfleKhof7GXxa6q3U.lC1oNmF5UiVuEV8fr6xo1V6zi3uSvDW', '6921-7302032.png', 0),
('7302033', 'Tanakon T', '$2y$12$6PWPXdf1vpAgqVd..fNQiuW3mp.v43m5SUS7TG7GLwvXQ1yO7j3JS', NULL, 0),
('7302034', 'Tanakon T', '$2y$12$Ezlr/zg6uz6Bl8gGvYJFuesyU72XrXCeFAItvvHB4cMYoU/1g6jx.', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`Aid`),
  ADD KEY `assignment_ibfk_1` (`Vid`);

--
-- Indexes for table `evideo`
--
ALTER TABLE `evideo`
  ADD PRIMARY KEY (`Vid`),
  ADD KEY `evideo_ibfk_1` (`SJid`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`Qid`),
  ADD KEY `question_ibfk_1` (`Aid`);

--
-- Indexes for table `student_answer`
--
ALTER TABLE `student_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_answer_ibfk_1` (`Qid`),
  ADD KEY `student_answer_ibfk_2` (`Sid`);

--
-- Indexes for table `student_assignment`
--
ALTER TABLE `student_assignment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Aid` (`Aid`),
  ADD KEY `Sid` (`Sid`);

--
-- Indexes for table `student_evideo`
--
ALTER TABLE `student_evideo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student-evideo_ibfk_1` (`Sid`),
  ADD KEY `student-evideo_ibfk_2` (`Vid`);

--
-- Indexes for table `student_request`
--
ALTER TABLE `student_request`
  ADD PRIMARY KEY (`Rid`),
  ADD KEY `student_request_ibfk_1` (`Sid`),
  ADD KEY `student_request_ibfk_2` (`SJid`);

--
-- Indexes for table `student_subject`
--
ALTER TABLE `student_subject`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_subject_ibfk_1` (`Sid`),
  ADD KEY `student_subject_ibfk_2` (`SJid`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`SJid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `Aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `evideo`
--
ALTER TABLE `evideo`
  MODIFY `Vid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `Qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=636;

--
-- AUTO_INCREMENT for table `student_answer`
--
ALTER TABLE `student_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT for table `student_assignment`
--
ALTER TABLE `student_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `student_evideo`
--
ALTER TABLE `student_evideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `student_request`
--
ALTER TABLE `student_request`
  MODIFY `Rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `student_subject`
--
ALTER TABLE `student_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`Vid`) REFERENCES `evideo` (`Vid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `evideo`
--
ALTER TABLE `evideo`
  ADD CONSTRAINT `evideo_ibfk_1` FOREIGN KEY (`SJid`) REFERENCES `subject` (`SJid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`Aid`) REFERENCES `assignment` (`Aid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_answer`
--
ALTER TABLE `student_answer`
  ADD CONSTRAINT `student_answer_ibfk_1` FOREIGN KEY (`Qid`) REFERENCES `question` (`Qid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_answer_ibfk_2` FOREIGN KEY (`Sid`) REFERENCES `user` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_assignment`
--
ALTER TABLE `student_assignment`
  ADD CONSTRAINT `student_assignment_ibfk_1` FOREIGN KEY (`Aid`) REFERENCES `assignment` (`Aid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_assignment_ibfk_2` FOREIGN KEY (`Sid`) REFERENCES `user` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_evideo`
--
ALTER TABLE `student_evideo`
  ADD CONSTRAINT `student_evideo_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `user` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_evideo_ibfk_2` FOREIGN KEY (`Vid`) REFERENCES `evideo` (`Vid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_request`
--
ALTER TABLE `student_request`
  ADD CONSTRAINT `student_request_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `user` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_request_ibfk_2` FOREIGN KEY (`SJid`) REFERENCES `subject` (`SJid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_subject`
--
ALTER TABLE `student_subject`
  ADD CONSTRAINT `student_subject_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `user` (`Uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_subject_ibfk_2` FOREIGN KEY (`SJid`) REFERENCES `subject` (`SJid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
