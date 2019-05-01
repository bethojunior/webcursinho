<?php

class HomeController extends View{


    function actionIndex(){
        $js  = ['modulos/home/init','modulos/authenticate/login' , 'controllers/UserController'];
        $css = ['home/init','preload'];
        $views = ['preload/index','home/index'];

        $seo = new stdClass();
        $seo->description   = '';
        $seo->title         = 'Web cursinho';

        $this->layoutBuilder($views, $js, $css, $seo);

    }

}