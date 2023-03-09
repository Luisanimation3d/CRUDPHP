<?php


// Se crea el array de datos


if(session_status() == PHP_SESSION_NONE){
    session_start();
}
if(!isset($_SESSION["datos"])){
    $_SESSION["datos"] = array();
    echo "ingresa aqui";
}

if(isset($_POST["datos"])){
    $opcion = json_decode($_POST["datos"]);
    switch($opcion[0]){
        case 1:{
            $registro = get_object_vars($opcion[1]);
            $datos = $_SESSION["datos"];
            $newRegister = array('id'=> sizeof($datos) ,'name'=>$registro['name'],'price'=>$registro['price']);
            array_push($datos, $newRegister);
            $_SESSION["datos"] = $datos;
            echo json_encode($_SESSION["datos"]);
            break;
        }
        case 2:{
            $datos = $_SESSION["datos"];
            echo json_encode($datos);
            break;
        }
        case 3:{
            $editar = json_decode($_POST['datos'], true);
            $datos = $_SESSION["datos"];
            echo json_encode($datos[$editar[1]]);
            break;
        }
        case 4:{
            $datosEditados = get_object_vars($opcion[1]);
            $datos = $_SESSION['datos'];
            $datos[$datosEditados['id']] = $datosEditados;
            $_SESSION['datos'] = $datos;
            echo json_encode($_SESSION['datos']);
        }
        case 5:{
            $eliminar = json_decode($_POST['datos'], true);
            $datos = $_SESSION["datos"];
            foreach($datos as $key => $registro) {
                if($registro['id'] == $eliminar[1]) {
                    array_splice($datos, $key, 1);
                    break;
                }
            }
            $_SESSION['datos'] = $datos;
            echo json_encode($_SESSION['datos']);
            break;
        }
    }
}

?>