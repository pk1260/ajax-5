<?php
/**
 * Created by PhpStorm.
 * User: pascalkuiper
 * Date: 2019-06-07
 * Time: 11:41
 */

include "dbVars.php"; // inlog gegevens
$resultArray = array(); // array voor de query output
$search = $_GET['q']; // no sql protection
$type = $_GET['type']; // no sql protection
$con = mysqli_connect($servername, $uid, $pwd, $database); // bereid connectie
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}
$con->set_charset("utf8");
mysqli_select_db($con, "world"); // selecteer database
$sql = "SELECT * FROM country WHERE name LIKE '$search%' ";
if ($type == "list") {
    $result = mysqli_query($con, $sql);
    while ($row = mysqli_fetch_array($result)) {
        $resultArray[] = $row['Name'];
    }
    echo json_encode($resultArray);//maak van array een JSON gecodeerde string
}
if ($type == "answer") {

    $result = mysqli_query($con, $sql);
    //print_r($result);
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $resultArray[] = $row;
        //print_r($resultArray);//werkt
        echo json_encode($resultArray);//maak van array een JSON gecodeerde string
    }

}
mysqli_close($con);
?>
