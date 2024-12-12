<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$to = 'your@email.com'; /* enter your email (receiver email)*/

if ( isset( $_POST['submit'] ) && 'contact' === $_POST['submit'] ) {
	$firstname = $_POST['firstname'];
	$lastname  = $_POST['lastname'];
	$email     = $_POST['email'];
	$message   = $_POST['message'];
	$phone     = $_POST['phone'];

	$text = "FirstName : ".$firstname."\r\n". "Lastname : ".$lastname."\r\n". "Email : ".$email."\r\n". "Phone No. : ".$phone."\r\n". "Message :".$message;
	$subject = "You have receive message from " . ucfirst( $firstname ) . ' ' . ucfirst( $lastname );
	$txt = $text;
	$headers = "From: " . $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text\r\n";
	$mail = mail( $to, $subject, $txt, $headers );
	
	if( $mail ) {
		$json['success'] = true;
		$json['message'] = 'Your message submitted successfully!';
	} else {
		$json['success'] = false;

		$json['message'] = 'Oops! Something went wrong';
	}
	echo json_encode( $json );
	exit();
}
?>