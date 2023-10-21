-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 19, 2023 at 08:46 AM
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
(103, 158, 'webDEV01', 3, 60, 120, 1800),
(104, 159, 'webDEV02', 4, 60, 120, 1800),
(105, 160, 'webDEV03', 4, 60, 120, 1800),
(106, 161, 'NodeJS and NPM', 3, 60, 120, 1800),
(107, 162, 'Create nodejs project', 3, 60, 120, 1800),
(110, 173, 'Quiz01', 1, 0, 10, 300),
(113, 175, 'Quiz01', 1, 60, 120, 300),
(121, 186, '', 2, 0, 60, 180),
(132, 190, 'Quiz01', 2, 0, 60, 180),
(133, 191, 'แบบฝึกหัดทดสอบก่อนเรียน', 2, 0, 60, 300),
(166, 194, 'แบบทดสอบก่อนเรียนเรื่อง Grid', 5, 0, 60, 180),
(167, 194, 'Quiz01', 3, 60, 120, 180);

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
(161, '1203421', '00 NodeJS and NPM', 'https://www.youtube.com/embed/AB7X6SdGZFg?si=oWGsIGtn4eHMeKI1', '2023-10-30', '', 1),
(162, '1203421', '01 Create nodejs project', 'https://www.youtube.com/embed/sEJ5iH203CI?si=whJyed4bko-AH1xe', '2023-10-30', '', 1),
(173, '1203421', 'แก้มน้องนางนั้นแดงกว่าใคร', 'https://youtu.be/ykRGStsDNgQ?si=ERWasbfWQsgeOgEe', '2023-10-08', 'เพลงของศิลปิน เขียนไขและวานิช', 1),
(175, '1203421', 'รอไม่มีกำหนดการ', 'https://youtu.be/ze65bySlmUk?si=CdZOMFRYm9Soamiv', '2023-10-08', 'รอไม่มีกำหนดการ', 0),
(186, '1203421', 'แก้มน้องนางนั้นแดงกว่าใคร', 'https://youtu.be/ykRGStsDNgQ?si=ERWasbfWQsgeOgEe', '2023-10-14', 'แก้มน้องนางนั้นแดงกว่าใคร', 1),
(190, '1203421', 'save your tears', 'https://youtu.be/ze65bySlmUk?si=CdZOMFRYm9Soamiv', '2023-10-14', 'save your tears', 1),
(191, '1204304', 'Grid Bootstrap', 'https://youtu.be/L7MktCJwl5Q?si=PzMC7LLC_kUw7_mI', '2023-10-16', 'สอนการใช้ Grid และ Bootstrap ในการตกแต่งและจัดตำแหน่งให้กับหน้าเว็บเพจ', 1),
(192, '1204304', 'Form Group', 'https://youtu.be/e5pglREk4oU?si=SsdaeXDkUPMGDlu6', '2023-10-16', 'Form Group คือการจัดการ Form ที่ใช้ในการส่งข้อมูลต่างๆภายในหน้าเว็บเพจ', 0),
(194, '1204304', 'Grid', 'https://youtu.be/L7MktCJwl5Q?si=PzMC7LLC_kUw7_mI', '2023-10-16', 'Grid เป็น Tag ที่ใช้ในการจัดการตำแหน่งต่างๆในหน้าเว็บเพจได้ง่ายขึ้นจากวิธีเก่าที่ต้องจัดเองเพื่อให้ง่ายต่อการเขียนเว็บไซต์', 1);

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
(475, 103, 'การออกแบบเว็บที่นิยมในปัจจุบันซึ่งประกอบด้วยข้อความ รูปภาพ โดยมีการจัดองค์ประกอบต่างๆ เพื่อให้เว็บน่าสนใจ เป็นรูปแบบการออกแบบเว็บไซต์แบบใด', NULL, 1, 'เน้นการนำเสนอเนื้อห', 'เน้นภาพกราฟิก', 'มีทั้งภาพและเนื้อหา', 'เน้นความสวยงาม', '', 'C'),
(476, 104, 'อินเทอร์เน็ตมีความหมายตรงกับข้อใด', NULL, 1, 'การเชื่อมต่อกันระหว่างเครือข่าย', 'การเชื่อมต่อกันระหว่างบุคคลกับบุคคล', 'การเชื่อมต่อกันระหว่างบุคคลกับองค์กร', 'การเชื่อมต่อกันระหว่างองค์กรกับองค์กร', '', 'A'),
(477, 104, 'URL มีความส าคัญอย่างไรกับเว็บ', NULL, 1, 'ที่อยู่ของข้อมูลต่างๆบนอินเทอร์เน็ต', 'โปรแกรมคอมพิวเตอร์ที่จัดเก็บในหน้าเว็บ', 'หน้าแรกของเว็บไซต', 'ข้อมูลหรือสคริปต์ที่เขียนไว้ในเว็บเพจ', '', 'A'),
(478, 104, 'ข้อใดไม่ใช่ส่วนประกอบของ URL', NULL, 1, 'Protocol', 'Domino', 'Filename', 'Path', '', 'B'),
(479, 104, 'หน่วยงานใดที่ท าให้เราสามารถเชื่อมต่อใช้งานอินเทอร์เน็ตได้', NULL, 1, 'W3C', 'ISP', 'Facebook', 'Microsoft', '', 'B'),
(480, 105, 'Web Site มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', ' โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'D'),
(481, 105, 'Web Page มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', ' เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'A'),
(482, 105, 'Home Page มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'C'),
(483, 105, 'Web Browser มีความหมายตรงกับข้อใด', NULL, 1, 'เอกสารข้อมูลในแต่ละหน้าซึ่งถูกเขียนขึ้นด้วยภาษา HTML', 'โปรแกรมส าหรับท าหน้าที่ในการแสดงผลเว็บเพจโดยเฉพาะ', 'หน้าแรกของเว็บไซต์', 'เครื่องที่ใช้ในการจัดเก็บเว็บเพจ', '', 'B'),
(484, 105, ' ข้อใดไม่ใช่รูปแบบโครงสร้างของเว็บไซต์', NULL, 1, 'Hierarchical Structure', 'Portal Structure', 'Sequential Structure', 'Web Structure', '', 'B'),
(485, 106, 'ข้อใดกล่าวถูกต้อง', NULL, 1, 'XHTML เป็นโปรแกรมส าเร็จรูปที่ใช้ในการสร้างเว็บ', 'Dreamweaver เป็นโปรแกรม CMS', 'HTML เป็นภาษาที่ใช้ในการสร้างเว็บ', 'Microsoft Word เป็นภาษาที่ใช้ในการสร้างเว็บ', '', 'C'),
(486, 106, 'CMS ย่อมาจากอะไรดังต่อไปนี้', NULL, 1, 'Content Management System', 'Content Management Stem', 'Color Management Support', 'Contact Management System', '', 'A'),
(487, 106, 'CMS เป็นโปรแกรมที่ถูกสร้างขึ้นมาเพื่อใช้ในวัตถุประสงค์ใดเป็นสำคัญ', NULL, 1, 'การจัดการเนื้อหา', 'การจัดการไฟล์เอกสารมัลติมีเดีย', 'การจัดการเกี่ยวกับเสียง', 'การจัดการเกี่ยวกับภาพเคลื่อนไหว', '', 'A'),
(488, 106, 'ข้อใดต่อไปนี้ให้ความหมายของคำว่า เว็บเพจ ได้ถูกต้องที่สุด', NULL, 1, 'แหล่งที่เก็บรวบรวมข้อมูลเอกสารและสื่อประสม', 'เว็บเพจหน้าแรกที่เป็นหน้าดัชนี', 'หน้าเว็บไซต์ที่มีการจดโดเมนเนมแล้ว', 'เป็นหน้าเอกสารเว็บที่สร้างขึ้นด้วยภาษา HTML', '', 'D'),
(489, 106, 'ข้อใดต่อไปนี้ให้ความหมายของคำว่า เว็บไซต์ ได้ถูกต้องที่สุด', NULL, 1, 'หน้าเว็บไซต์ที่มีการจดโดเมนเนมแล้ว', 'เป็นหน้าเอกสารเว็บที่สร้างขึ้นด้วยภาษา HTML', 'แหล่งที่เก็บรวบรวมข้อมูลเอกสารและสื่อประสม', 'เว็บเพจหน้าแรกที่เป็นหน้าดัชนี', '', 'A'),
(490, 107, 'ข้อใดต่อไปนี้ให้ความหมายของคำว่า โฮมเพจ ได้ถูกต้องที่สุด', NULL, 1, 'แหล่งที่เก็บรวบรวมข้อมูลเอกสารและสื่อประสม', 'เป็นหน้าเอกสารเว็บที่สร้างขึ้นด้วยภาษา HTML', 'เว็บเพจหน้าแรกที่เป็นหน้าดัชนี', 'หน้าเว็บไซต์ที่มีการจดโดเมนเนมแล้ว', '', 'C'),
(491, 107, 'ต่อไปนี้ให้ความหมายของคำว่า เครือข่ายอินเทอร์เน็ต ได้ถูกต้องที่สุด', NULL, 1, 'เครือข่ายขนาดใหญ่ที่มีการเชื่อมต่อหลายเครือข่ายเข้าด้วยกัน', 'เครือข่ายที่ใช้ในระดับภูมิภาค', 'เครือข่ายที่ใช้ในระดับประเทศ', 'เครือข่ายที่ใช้ภายในองค์กรหรือหน่วยงานเท่านั้น', '', 'A'),
(492, 107, 'ข้อใดต่อไปนี้ไม่ใช่ข้อดีของ CMS', NULL, 1, 'ผู้ใช้งานไม่จำเป็นต้องมีความรู้เรื่องการทำเว็บไซต์', 'ขั้นตอนการติดตั้งยุ่งยากซับซ้อน', 'ง่ายต่อการดูแล เพราะมีระบบจัดการทุกอย่างให้เราหมด', 'ไม่เสียเวลาในการพัฒนาเว็บไซต์ ไม่เสียเงินจำนวนมาก', '', 'B'),
(493, 107, 'โปรโตคอลที่ใช้ในการเรียกใช้งานเว็บไซต์คือโปรโตคอลใดต่อไปนี้', NULL, 1, 'ftp://www. google.co.th', 'Isp://www.google.co.th', 'Smtp://www. google.co.th', 'http://www.google.co.th', '', 'D'),
(494, 107, 'ข้อใดต่อไปนี้ไม่ใช่ภาษาคอมพิวเตอร์ที่ใช้ในการพัฒนา CMS', NULL, 1, 'ASP', 'JSP', 'Visual Basic', 'PHP', '', 'C'),
(497, 110, 'Question01', NULL, 1, 'A', 'B', 'C', 'D', 'E', 'B'),
(498, 110, 'Question02', '7573-Marin_Kitagawa.jpg', 1, 'A', 'B', 'C', 'D', 'E', 'E'),
(503, 113, 'Question01', '7908-334919961_783886279762262_5117511429638895150_n.jpg', 1, 'A', 'B', 'C', 'D', 'E', 'C'),
(504, 113, 'Question02', NULL, 1, 'A', 'B', 'C', 'D', 'E', 'E'),
(510, 121, 'Question01', NULL, 1, 'A', 'B', 'C', 'D', 'E', 'A'),
(511, 121, 'Question02', NULL, 0, 'A', 'B', 'C', 'D', 'E', ''),
(516, 132, 'Question01', '9268-63011212031.PNG', 1, 'A', 'B', 'C', 'D', 'E', 'B'),
(517, 132, 'Question02', '8645-discordpro.png', 0, 'A', 'AB', 'ABC', 'ABCD', 'ABCDE', ''),
(518, 133, 'จาก Code ภาพที่แสดงใช้ colume ไปทั้งหมดกี่ช่อง', '8975-Quest01.jpg', 1, '6', '8', '4', '12', '10', 'D'),
(595, 166, 'quest1', NULL, 1, 'A1', 'B1', 'C1', 'D1', 'E1', 'D'),
(596, 166, 'quest2', '3480-63011212031.PNG', 1, 'A2', 'B2', 'C2', 'D2', 'E2', 'E'),
(597, 166, 'quest3', NULL, 0, 'A3', 'B3', 'C3', 'D3', 'E3', ''),
(598, 166, 'quest4', NULL, 0, 'A4', 'B4', 'C4', 'D4', 'E4', ''),
(599, 166, 'quest5', '3833-334919961_783886279762262_5117511429638895150_n.jpg', 0, 'A5', 'B5', 'C5', 'D5', 'E5', ''),
(600, 166, 'quest6', NULL, 1, 'A6', 'B6', 'C6', 'D6', 'E6', 'A'),
(601, 166, 'quest7', '2908-anopana.png', 1, 'A7', 'B7', 'C7', 'D7', 'E7', 'B'),
(602, 166, 'quest8', '7868-profile.01jpg.jpg', 1, 'A8', 'B8', 'C8', 'D8', 'E8', 'B'),
(603, 166, 'quest99', NULL, 0, 'A99', 'B99', 'C99', 'D99', 'E99', ''),
(604, 166, 'quest10', '5490-discordpro.png', 1, 'A10', 'B10', 'C10', 'D10', 'E10', 'B'),
(605, 166, 'quest11', NULL, 1, 'A11', 'B11', 'C11', 'D11', 'E11', 'B'),
(606, 166, 'quest12', NULL, 1, 'A12', 'B12', 'C12', 'D12', 'E12', 'C'),
(607, 166, 'quest13', NULL, 1, 'A13', 'B13', 'C13', 'D13', 'E13', 'D'),
(610, 167, 'Question01', '1356-pic.jpg', 1, 'A', 'B', 'C', 'D', 'E', 'A');

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
(186, '63011212056', 498, 'E'),
(189, '63011212056', 504, NULL),
(190, '7302031', 498, 'E'),
(193, '63011212056', 488, NULL),
(194, '63011212056', 486, NULL),
(195, '63011212056', 485, NULL),
(196, '63011212056', 494, NULL),
(197, '63011212056', 490, NULL),
(198, '63011212056', 492, NULL),
(199, '63011212056', 511, 'A'),
(200, '63011212056', 510, 'C'),
(203, '63011212056', 517, 'AB'),
(204, '63011212056', 516, 'C'),
(206, '63011212056', 518, '12'),
(207, '63011212056', 601, 'B7'),
(208, '63011212056', 600, 'B6'),
(209, '63011212056', 607, 'A13'),
(210, '63011212056', 606, 'D12'),
(211, '63011212056', 604, 'C10'),
(212, '63011212056', 475, 'มีทั้งภาพและเนื้อหา'),
(213, '63011212056', 474, 'เน้นความสวยงาม'),
(214, '63011212056', 473, 'มีทั้งภาพและเนื้อหา'),
(215, '63011212088', 475, 'มีทั้งภาพและเนื้อหา'),
(216, '63011212088', 473, 'เน้นภาพกราฟิก'),
(217, '63011212088', 474, 'เน้นภาพกราฟิก'),
(218, '63011212099', 474, 'เน้นภาพกราฟิก'),
(219, '63011212099', 475, 'มีทั้งภาพและเนื้อหา'),
(220, '63011212099', 473, 'มีทั้งภาพและเนื้อหา');

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
(70, '63011212056', 110, 1, '2023-10-10 06:34:23'),
(72, '7302031', 110, 1, '2023-10-13 04:39:59'),
(74, '63011212056', 121, 1, '2023-10-15 11:50:36'),
(75, '63011212056', 132, 1, '2023-10-15 12:02:59'),
(76, '63011212056', 133, 2, '2023-10-15 13:34:33'),
(77, '63011212056', 166, 1, '2023-10-16 23:05:48'),
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
(41, '63011212056', 173, 0, '2'),
(42, '63011212056', 175, 0, '1'),
(43, '7302031', 173, 0, '2'),
(44, '63011212056', 161, 21, '1'),
(45, '63011212056', 162, 0, '1'),
(46, '63011212056', 162, 0, '1'),
(47, '63011212056', 162, 0, '1'),
(48, '63011212056', 162, 0, '1'),
(49, '63011212056', 162, 0, '1'),
(50, '63011212056', 162, 0, '1'),
(51, '63011212056', 162, 0, '1'),
(55, '63011212056', 186, 33, '1'),
(56, '63011212056', 190, 3, '1'),
(57, '63011212056', 192, 0, '1'),
(58, '63011212056', 191, 0, '1'),
(59, '63011212056', 191, 0, '1'),
(60, '63011212092', 192, 114, '1'),
(61, '63011212092', 192, 114, '1'),
(62, '63011212056', 194, 0, '2'),
(63, '63011212056', 194, 0, '2'),
(64, '63011212056', 158, 0, '1'),
(65, '63011212056', 158, 0, '1'),
(66, '63011212088', 158, 87, '1'),
(67, '63011212088', 158, 0, '0'),
(68, '63011212099', 158, 0, '1');

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
(73, '7302031', '1203120', '2023-10-13 04:37:40'),
(86, '63011212092', '1203421', '2023-10-16 23:00:36'),
(87, '63011212056', '1204304', '2023-10-17 09:57:03');

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
(97, '1203421', '63011212056', 1),
(98, '1203120', '63011212056', 1),
(102, '1204304', '63011212092', 1),
(103, '1203120', '63011212092', 1),
(106, '1203188', '63011212056', 1),
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
('1203188', 'Data Structure'),
('1203421', 'Cognitive Science'),
('1204304', 'Web Development');

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
('63011212056', 'suphakon', '$2y$12$suzoZ4K8u6WOraVgcrcxhevN2jWPwxFPFaB6S3jlusxelDI4CUtja', '4939-63011212056.jpg', 0),
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
  MODIFY `Aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `evideo`
--
ALTER TABLE `evideo`
  MODIFY `Vid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `Qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=611;

--
-- AUTO_INCREMENT for table `student_answer`
--
ALTER TABLE `student_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT for table `student_assignment`
--
ALTER TABLE `student_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `student_evideo`
--
ALTER TABLE `student_evideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

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
