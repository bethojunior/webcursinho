<?php


class Upload {

    public function uploadFile($file , $titulo , $dir){


        try {

            $new_name = ($titulo);
            $up = move_uploaded_file($file['tmp_name'], $dir.$new_name);

            if($up){
                return true;
            }else {
                return false;
            }

        }catch(Exception $e){
            return false;
        }

    }
}


