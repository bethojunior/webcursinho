<?php
/**
 * Created by PhpStorm.
 * User: Betho Junior
 * Date: 18/04/2018
 * Time: 20:27
 */
class Image{

    public static function setNameImage($file , $address = null){
        $dir = "../files/";

        if (move_uploaded_file($file["tmp_name"], "$dir".$file["name"]))
        {
            echo "Arquivo enviado com sucesso!";
        }
        else
        {
            echo "Erro, o arquivo n�o pode ser enviado.";
        }
//        $type = $file['type'];
//        $type = explode("/",$type);
//        $ext =  $type[1];
//        $date = date('d-m-y-H-i-s');
//        $title = ($date.".".$ext);
//        move_uploaded_file($file["tmp_name"],"/files/asd.jpg");
//
//        if($returnUp){
//            return $title;
//        }else {
//            return false;
//        }
    }

}