<?php
/**
 * Created by PhpStorm.
 * User: Betho
 * Date: 10/02/2019
 * Time: 15:48
 */

class BaseController {

    private $validate;
    public $byPost;

    const LEVEL_CRITICAL    = 1;
    const LEVEL_MEDIUM      = 2;
    const LEVEL_LIGHT       = 3;
    const LEVEL_INFORMATION = 4;

    function __construct(){
        $initValidate   = new ValidateRequest();
        $this->validate = $initValidate->checkPermission();

        if(!$initValidate->checkPermission()){
            throw new Exception(ValidateRequest::AccessDenied());
        }

        $this->byPost = $_POST['data'];
    }


}