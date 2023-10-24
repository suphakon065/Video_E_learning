-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2023 at 07:35 PM
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
(172, 198, 'OOP-Quiz01-แบบฝึกหัดก่อนเรียน', 4, 0, 60, 180),
(173, 198, 'OOP-Quiz02-แบบฝึกหัดท้ายบท', 2, 180, 240, 180),
(174, 199, 'Quiz01-แบบฝึกหัดก่อนเรียน', 4, 0, 60, 180),
(175, 199, 'Quiz02-แบบฝึกหัดระหว่างเรียน', 2, 120, 180, 120),
(176, 200, 'Quiz01-แบบฝึกหัดก่อนเรียน', 2, 0, 60, 180),
(177, 200, 'Quiz02-แบบฝึกหัดระหว่างเรียน', 3, 120, 180, 300);

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
(200, '1204304', 'WebDev-Request form', 'https://youtu.be/PaVpX_HGz_8?si=QQlj-N-MA4EMAVCp', '2023-10-27', 'Web development สอนเรื่อง Request form', 1),
(201, '1204311', 'APD-EF Database Connection', 'https://youtu.be/BCNDSRsFBEc?si=YxB_WA8Xb7d-xDgz', '2023-10-26', 'Application Program Development สอนการใช้ EF Database Connection', 0),
(202, '1204311', 'APD-Read QR Code', 'https://youtu.be/AEvzyLOewdA?si=QE2JjXiuWGAa9OZk', '2023-10-26', 'Application Program Development สอนเกี่ยวกับการใช้งานฟังก์ชันอ่าน QR Code ', 1),
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
(636, 172, 'Class หนึ่งสามารถสร้างได้กี่ Object', NULL, 1, 'ไม่ได้', '1', 'กี่Objectก็ได้', '2', 'ถูกทุกข้อ', 'C'),
(637, 172, 'ข้อใดไม่ใช่ข้อมูลชนิดตัวเลข (Number)', NULL, 1, 'num = 10', 'grade = 3.5', 'result = -1', 'size = 2x', 'num = 10', 'C'),
(638, 172, 'ข้อใดไม่ใช่ข้อมูลชนิด Sequence', NULL, 1, 'string', 'tuple', 'list', 'set', 'boolean', 'D'),
(639, 172, 'ข้อใดไม่ใช่ข้อมูลขนิด String', NULL, 1, 'msg = \"Python Programming\"', 'grade = \'A\'', 'number = \'50\'', 'score = 10', 'boolean=\'true\'', 'D'),
(640, 172, 'str = [\"Oraya\",45,“Thungsong\",\'B\',\"\"]คือข้อมูลชนิดใด ', NULL, 1, 'list', 'set', 'tuple', 'string', 'number', 'A'),
(641, 174, 'การเขียนโปรแกรมด้วยภาษา HTML นั้นจะต้องขึ้นต้น และลงท้ายด้วยคำสั่งในข้อใด', NULL, 1, '<html>… </html>', '[title]… [/title]', '<begin>… </begin>', '[head]…. [/head]', 'ถูกทุกข้อ', 'A'),
(642, 174, 'คำสั่ง <Title> ... </Title> ใช้สำหรับระบุเกี่ยวกับเอกสาร HTMLในส่วนใด', NULL, 1, 'เนื้อหาของเอกสาร', 'ส่วนหัวหรือชื่อเรื่องของเอกสาร', 'ส่วนย่อหน้าของเอกสาร', 'ส่วนคำสั่งของเอกสาร', 'ผิดทุกข้อ', 'B'),
(643, 174, 'ข้อใดคือนามสกุลของไฟล์ข้อมูลเอกสารภาษา HTML ที่สามารถแสดงผลผ่านระบบเครือข่ายอินเทอร์เน็ต', NULL, 1, '.html', '.txt', '.doc', '.gif', '.jpg', 'A'),
(644, 174, 'ในภาษา HTMLคำสั่งใดที่เขียนเป็นบรรทัดแรก', NULL, 1, '<HTML>', '<TITLE>', '<BODY>', '<HEAD>', '</HTML>', 'A'),
(645, 174, 'คำสั่งในข้อใดเป็นคำสั่งที่ใช้สำหรับขึ้นบรรทัดใหม่ในการแสดงผลข้อมูล', NULL, 1, '<ins>', '<tr>', '<b>', '<br>', '<a>', 'D'),
(646, 175, 'การเขียนโปรแกรมด้วยภาษา HTML นั้นจะต้องขึ้นต้น และลงท้ายด้วยคำสั่งในข้อใด', NULL, 1, '<html>… </html>', '[title]… [/title]', '<begin>… </begin>', '[head]…. [/head]', 'ถูกทุกข้อ', 'A'),
(647, 175, 'คำสั่ง <Title> ... </Title> ใช้สำหรับระบุเกี่ยวกับเอกสาร HTMLในส่วนใด', NULL, 1, 'เนื้อหาของเอกสาร', 'ส่วนหัวหรือชื่อเรื่องของเอกสาร', 'ส่วนย่อหน้าของเอกสาร', 'ส่วนคำสั่งของเอกสาร', 'ผิดทุกข้อ', 'B'),
(648, 175, 'ข้อใดคือนามสกุลของไฟล์ข้อมูลเอกสารภาษา HTML ที่สามารถแสดงผลผ่านระบบเครือข่ายอินเทอร์เน็ต', NULL, 1, '.html', '.txt', '.doc', '.gif', '.jpg', 'A'),
(649, 175, 'ในภาษา HTMLคำสั่งใดที่เขียนเป็นบรรทัดแรก', NULL, 1, '<HTML>', '<TITLE>', '<BODY>', '<HEAD>', '</HTML>', 'A'),
(650, 175, 'คำสั่งในข้อใดเป็นคำสั่งที่ใช้สำหรับขึ้นบรรทัดใหม่ในการแสดงผลข้อมูล', NULL, 1, '<ins>', '<tr>', '<b>', '<br>', '<a>', 'D'),
(651, 176, 'การเขียนโปรแกรมด้วยภาษา HTML นั้นจะต้องขึ้นต้น และลงท้ายด้วยคำสั่งในข้อใด', NULL, 1, '<html>… </html>', '[title]… [/title]', '<begin>… </begin>', '[head]…. [/head]', 'ถูกทุกข้อ', 'A'),
(652, 176, 'คำสั่ง <Title> ... </Title> ใช้สำหรับระบุเกี่ยวกับเอกสาร HTMLในส่วนใด', NULL, 1, 'เนื้อหาของเอกสาร', 'ส่วนหัวหรือชื่อเรื่องของเอกสาร', 'ส่วนย่อหน้าของเอกสาร', 'ส่วนคำสั่งของเอกสาร', 'ผิดทุกข้อ', 'B'),
(653, 176, 'ข้อใดคือนามสกุลของไฟล์ข้อมูลเอกสารภาษา HTML ที่สามารถแสดงผลผ่านระบบเครือข่ายอินเทอร์เน็ต', NULL, 1, '.html', '.txt', '.doc', '.gif', '.jpg', 'A'),
(654, 176, 'ในภาษา HTMLคำสั่งใดที่เขียนเป็นบรรทัดแรก', NULL, 1, '<HTML>', '<TITLE>', '<BODY>', '<HEAD>', '</HTML>', 'A'),
(655, 176, 'คำสั่งในข้อใดเป็นคำสั่งที่ใช้สำหรับขึ้นบรรทัดใหม่ในการแสดงผลข้อมูล', NULL, 1, '<ins>', '<tr>', '<b>', '<br>', '<a>', 'D'),
(656, 177, 'การเขียนโปรแกรมด้วยภาษา HTML นั้นจะต้องขึ้นต้น และลงท้ายด้วยคำสั่งในข้อใด', NULL, 1, '<html>… </html>', '[title]… [/title]', '<begin>… </begin>', '[head]…. [/head]', 'ถูกทุกข้อ', 'A'),
(657, 177, 'คำสั่ง <Title> ... </Title> ใช้สำหรับระบุเกี่ยวกับเอกสาร HTMLในส่วนใด', NULL, 1, 'เนื้อหาของเอกสาร', 'ส่วนหัวหรือชื่อเรื่องของเอกสาร', 'ส่วนย่อหน้าของเอกสาร', 'ส่วนคำสั่งของเอกสาร', 'ผิดทุกข้อ', 'B'),
(658, 177, 'ข้อใดคือนามสกุลของไฟล์ข้อมูลเอกสารภาษา HTML ที่สามารถแสดงผลผ่านระบบเครือข่ายอินเทอร์เน็ต', NULL, 1, '.html', '.txt', '.doc', '.gif', '.jpg', 'A'),
(659, 177, 'ในภาษา HTMLคำสั่งใดที่เขียนเป็นบรรทัดแรก', NULL, 1, '<HTML>', '<TITLE>', '<BODY>', '<HEAD>', '</HTML>', 'A'),
(660, 177, 'คำสั่งในข้อใดเป็นคำสั่งที่ใช้สำหรับขึ้นบรรทัดใหม่ในการแสดงผลข้อมูล', NULL, 1, '<ins>', '<tr>', '<b>', '<br>', '<a>', 'D');

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
(224, '63011212056', 482, NULL),
(225, '63011212056', 612, 'Class name'),
(226, '63011212056', 614, 'attribute'),
(227, '63011212056', 611, 'สามารถถูกใช้งานได้โดยตรง'),
(228, '63011212056', 616, 'information hiding'),
(229, '63011212056', 617, 'encapsulation'),
(230, '63011212056', 615, '3'),
(231, '63011212056', 619, 'ลงทะเบียน'),
(232, '63011212056', 638, 'list'),
(233, '63011212056', 637, 'size = 2x'),
(234, '63011212056', 639, 'score = 10'),
(235, '63011212056', 636, 'กี่Objectก็ได้'),
(236, '63011212056', 643, NULL),
(237, '63011212056', 641, NULL),
(238, '63011212056', 645, NULL),
(239, '63011212056', 644, NULL),
(240, '63011212056', 649, NULL),
(241, '63011212056', 648, NULL),
(242, '63011212056', 655, '<br>'),
(243, '63011212056', 654, '<HTML>'),
(244, '63011212056', 657, 'ส่วนหัวหรือชื่อเรื่องของเอกสาร'),
(245, '63011212056', 656, '<html>… </html>'),
(246, '63011212056', 660, '<br>'),
(247, '63011212091', 652, NULL),
(248, '63011212091', 653, NULL),
(249, '63011212091', 657, 'เนื้อหาของเอกสาร'),
(250, '63011212091', 660, '<a>'),
(251, '63011212091', 658, '.html'),
(252, '63011212031', 655, '<br>'),
(253, '63011212031', 654, '<HTML>'),
(254, '63011212031', 657, 'ส่วนหัวหรือชื่อเรื่องของเอกสาร'),
(255, '63011212031', 660, '<br>'),
(256, '63011212031', 656, '<html>… </html>');

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
(80, '63011212099', 103, 3, '2023-10-17 13:43:18'),
(81, '63011212056', 168, 2, '2023-10-24 18:19:01'),
(82, '63011212056', 169, 3, '2023-10-24 18:24:40'),
(83, '63011212056', 172, 2, '2023-10-24 18:30:05'),
(84, '63011212056', 176, 2, '2023-10-24 18:52:37'),
(85, '63011212056', 177, 3, '2023-10-24 18:55:33'),
(86, '63011212091', 177, 1, '2023-10-24 19:03:02'),
(87, '63011212031', 176, 2, '2023-10-24 19:08:55'),
(88, '63011212031', 177, 3, '2023-10-24 19:11:14');

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
(71, '63011212056', 160, 30, '1'),
(72, '63011212056', 196, 0, '2'),
(73, '63011212056', 197, 87, '1'),
(74, '63011212056', 198, 48, '1'),
(75, '63011212056', 199, 0, '1'),
(76, '63011212056', 200, 177, '1'),
(77, '63011212091', 200, 48, '1'),
(78, '63011212031', 200, 0, '2');

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
(92, '63011212031', '1204311', '2023-10-24 18:10:46'),
(96, '63011212091', '1204208', '2023-10-24 18:13:15');

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
(107, '1203120', '63011212088', 1),
(108, '1203120', '63011212099', 1),
(109, '1204208', '63011212031', 1),
(110, '1204208', '63011212056', 1),
(111, '1204304', '63011212056', 1),
(112, '1204311', '63011212056', 1),
(113, '1204304', '63011212031', 1),
(114, '1204304', '63011212091', 1);

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
('1234', 'admin', '$2y$12$69kubGHqZ.n3FBzc9SGBw.OctCAu4r9yeQJiMYvObVd0X4wFYS1Cq', NULL, 1),
('30011212001', 'Student001', '$2y$12$yXluwBKUf4I7YCjc5/CMc.i1aD4Q921A3Fv9C1gRaVq.CXVccAcKW', '796-30011212001.jpg', 0),
('63011212000', 'Student0', '$2y$12$xsockFGvdXQNV8aulv24Jetn497fZ6kw1o3CV2gw8SsP7SGYcUSZO', NULL, 0),
('63011212005', 'Student05', '$2y$12$j/4MzxlmJsoQYDLYJ0LHpuI5c69C5D8kmUuqM/8XHmFUtPkmjcRi2', NULL, 0),
('63011212009', 'ก้าว ฐณกร', '$2y$12$pXsUoa0ZhWz5Z3zqY62N3O69rrzyaEQEqFsrSQktTI3vQJDHt2VsW', NULL, 0),
('63011212011', 'sniff kung', '$2y$12$hP1jhK27WOqaz3EkiSE2m.1vm4bajyeue92ZE0Mw9IZlVTRYlRvHO', NULL, 0),
('63011212012', 'tar gush', '$2y$12$Pp9AkgWhuE8JmPyUwGmR9uVScBTMjyNKzArwPm3qjOSjmsyQJ1HTm', NULL, 0),
('63011212018', 'kayn snif', 'utfyutfuygfgjyg', NULL, 0),
('63011212031', 'ฐณกร ทันโคกกรวด', '$2y$12$jUEHm4TrrZQDjjGFsaAi7eRGphAM38mvxQ3Eaa188.cRCW.tcu/Wq', NULL, 0),
('63011212032', 'Tanakon', '$2y$12$XRiu.pOsvc8H/wRzmMfeuuYKFM73TJdNgQ5LabIYxwnAgnGjWngHe', NULL, 0),
('63011212033', 'สมชาย ขุนทด', '$2y$12$aq6FDhMA9cf7ByZjxC.3n.mElxA0CpEULeYs3TR6ziaANhsTKPqti', NULL, 0),
('63011212034', 'สมชาย สุดขุนทด', '$2y$12$Tc/PCIdGBNlzdBasm0q7J..phujAs9OlAkPdDC4wYdc/4xipVAp3G', NULL, 0),
('63011212040', 'john doh', '1111121121212212121212', NULL, 0),
('63011212056', 'suphakon', '$2y$12$fGpfvsFjqdUZdMY1WEZjMOSHy5.tqjAjfq7yvMmjOFJlZyVWjh4T.', '4021-63011212056.png', 0),
('63011212088', 'Beatriz eric', '$2y$12$WWhnTeI.jKgWh9MW2yZZeuc0KbS6f4iwjQWKDJ8515982OztuHYdK', NULL, 0),
('63011212091', 'นราวิช สุขขุนทด', '$2y$12$CLc7LRZQiOIrP1TSw3lI3uMS/Baj84kgQNcFl1IyCq/KG4Q7D1aFi', '6578-63011212091.PNG', 0),
('63011212099', 'Gabriel Han', '$2y$12$2BWbf6LJVI1AiZEolkLaI.zcW2sTlqkFwx2nbIt2uKVs1C2Vyqdb.', NULL, 0),
('63011212118', 'Tanakon Tankokkurd', '$2y$12$mW1CIq29sC/T9IVORZJ5Beff3ol/R/H0ULdgRCO7/PPy2WBfR5x0O', NULL, 0),
('63011212131', 'สมหญิง แสงขุนทด', '$2y$12$HUA/uzbTTx6nVdsGcekdRutTOJkVZcHwpGzW.Pj2uqN5jpscdi4QK', NULL, 0),
('64011212000', 'Student006', '$2y$12$5Wj7mtCawpxiZlbduLfzTehR8/aksnolAcKWvXQx6x9PoCck1R8RW', NULL, 0),
('64011212123', 'Student0', '$2y$12$nUKOcj/L73mbqNpzL3A4Ve4ECIIOL6Ib5E2mix5ekEqgvULVJrjqu', NULL, 0),
('64011212125', 'Student001', '$2y$12$/Jz6BF.tyOEtliCUft4YCOKemZiAmL5qn8BPu1FJ0KfsonALGrvP6', NULL, 0),
('64011212126', 'Student001', '$2y$12$YebbfJAMd0GH/n1nosOhSu7UszE2lN08803GgjnkBAk6kyIz3tjwW', NULL, 0),
('65011212000', 'Student006', '$2y$12$kVkhjpveL9q.jXnpIjZSm.vU4vkDydrEisKv3vi5/g201RtvWys2u', NULL, 0),
('68011212001', 'สมชาย ขุนทด', '$2y$12$3CTWZoeoq4gMBCmKFJAFqONFbz2MLP2rReGcy4T9H.MlPDJFd5wny', NULL, 0);

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
  MODIFY `Aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `evideo`
--
ALTER TABLE `evideo`
  MODIFY `Vid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `Qid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=661;

--
-- AUTO_INCREMENT for table `student_answer`
--
ALTER TABLE `student_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `student_assignment`
--
ALTER TABLE `student_assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `student_evideo`
--
ALTER TABLE `student_evideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `student_request`
--
ALTER TABLE `student_request`
  MODIFY `Rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `student_subject`
--
ALTER TABLE `student_subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

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
