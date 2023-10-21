<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Access-Control-Allow-Methods: *");
	class database {

        private $db_host = "db";
        private $db_name = "MYSQL_DATABASE";
        private $db_user = "MYSQL_USER";
        private $db_password = "MYSQL_PASSWORD";

		public $domain = 'http://php-apache';

		public $GetAllUser;
		public $GetLastVideo;
		public $GetLastAssignment;
		public $GetAssignment;
		public $GetAllVideoAssignment;
		public $GetStudentSubject;
		public $GetStudentRequest;
		public $GetAllAnswerAssignment;
		public $Getrandom;

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->db_host .';dbname=' . $this->db_name, $this->db_user, $this->db_password);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
		public function __construct() {
			$this->GetAllUser = $this->domain . '/api/user.php/';

			$this->GetLastVideo = $this->domain . '/api/video.php/lastVid';

			$this->GetLastAssignment = $this->domain . '/api/assignment.php/lastAid';
			$this->GetAssignment = $this->domain . '/api/assignment.php/getassignment/';
			$this->GetAllVideoAssignment = $this->domain . '/api/assignment.php/getvideoassignment/';

			$this->GetStudentSubject = $this->domain . '/api/studentSUBJECT.php/getStudentSJ/';

			$this->GetStudentRequest = $this->domain . '/api/studentREQUEST.php/getStudentRQ/';

			$this->GetAllAnswerAssignment = $this->domain . '/api/studentANSWER.php/videoAssignment/';

			$this->Getrandom = $this->domain . '/api/random.php/';
		}
		
        
	}
    $objDb = new database;
    $conn = $objDb->connect();
?>
