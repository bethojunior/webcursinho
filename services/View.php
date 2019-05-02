<?php
/**
* Created by PhpStorm.
* User: Emerson
* Date: 08/04/2018
* Time: 07:42
*/

class View extends Controller
{

   public $clientData = [];
   public $user;
   public $permissions = [];
   public $filesJs;
   public $filesCss;
   protected $seo = null;

   /**
    * @param array $views
    * @param array $filesJs
    * @param array $filesCss
    * @param string $description
    * @param bool $infoClient
    */
   public function layoutBuilder($views = [],$filesJs = [],$filesCss = [], $seoObj = null)
   {
       $this->filesJs = $filesJs;
       $this->filesCss = $filesCss;
       $this->titlePage = ($seoObj->title != null) ? $seoObj->title : "Web cursinho";

       if(!is_null($seoObj)) {
        $this->seo = new Seo($seoObj);
       }

       $this->renderView("import/head");


       foreach ($views as $view) {
           $this->renderView($view);
       }

       $this->renderView("import/jsImport");

   }


    protected function addEvents($events){
        $event = explode("/",$_SERVER['REQUEST_URI']);

        $event = $event[count($event) - 1];

        if(isset($events[$event])){
            $action = ($events[$event]);
            call_user_func(array($this, $action));
            return true;
        }

        return false;
    }



}
