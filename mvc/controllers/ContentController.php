<?php


class ContentController extends BaseController
{
    public function actionContentFile(){
        $content   = $_FILES['content'];
        $titulo    = $_POST['titleContent'];
        $descrição = $_POST['descriptionContent'];

        $dir = Host::getLocal()."files/";

        if (move_uploaded_file($content["tmp_name"], "$dir".$content["name"]))
        {
            echo "Arquivo enviado com sucesso!";
        }
        else
        {
            echo "Erro, o arquivo n�o pode ser enviado.";
        }

//        $nameImage = Image::setNameImage($content , 'content');
//        var_dump($nameImage);die();
    }

}