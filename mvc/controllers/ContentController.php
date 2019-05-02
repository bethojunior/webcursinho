<?php


class ContentController extends BaseController
{
    public function actionContentFile(){
        $content   = $_FILES['content'];
        $titulo    = $_POST['titleContent'];
        $description = $_POST['descriptionContent'];
        $nameImage = Image::setNameImage($content , 'content' , false);
        $date = date('d-m-y-H-i-s');
        $return = $this->contentDao->insertContent($nameImage, $titulo, $description , $date , false);
        echo $return;
    }

    public function actionContentFileWithVideo(){
        $content   = $this->byPost['link'];
        $titulo    = $this->byPost['title'];
        $description = $this->byPost['description'];
        $date = date('d-m-y-H-i-s');
        $return = $this->contentDao->insertContent($content, $titulo, $description , $date , true);
        echo $return;
    }

    public function actionDeleteContent(){
        $id = $this->byPost['id'];
        echo $this->contentDao->deleteContent($id);
    }

    public function actionGetAll(){
        echo $this->baseDao->dbGetAll('files');
    }

}