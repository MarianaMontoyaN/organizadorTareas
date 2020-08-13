<?php

    include('database.php');

    $name = $_POST['name'];
    $description = $_POST['description'];
    $id = $_POST['id'];

    $query = "UPDATE tasks SET name = '$name', description = '$description' WHERE id = '$id'";
    $result = mysqli_query($connection, $query);

    if(!$result){
        die('Query Failed'.mysqli_error($connection));
    }

    echo "Update Task Successfully";

?>