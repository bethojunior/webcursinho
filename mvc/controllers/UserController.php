<?php
/**
 * Created by PhpStorm.
 * User: Betho
 * Date: 16/03/2019
 * Time: 22:00
 */

class UserController extends BaseController
{
    public $log;

    public function actionAuthenticate(){
        $logC = new LogController();
        $login = $this->byPost['email'];
        $pass  = $this->byPost['password'];
        $userDao = new UserDao();
        $return = $userDao->getUser($login , $pass);
        $token = self::updateTokenUser($login , $pass ,base64_encode(rand(1 , 150)));

        if($return){
            if($token){
                //$logC->logHere($login , self::LEVEL_INFORMATION ,"Usuário logou");
                echo $token;
                return true;
            }
            echo $token;
        }
        echo $return;

    }

    public function actionInsertUser(){

        $token =  base64_encode(rand (1 , 150));

        $name     = $_POST['name'];
        $email    = $_POST['email'];
        $pass     = $_POST['pass'];

        if(!self::checkEmail($email)){
            $userDao = new UserDao();
            $return = $userDao->insertUser($name , $email , $pass , $token ,true);
            echo $return;
            return true;
        }

        echo ApiResponse::getResponse(false , "Email existe");
    }

    static private function updateTokenUser($email , $pass ,  $token){
        $userDao = new UserDao();
        return $userDao->updateTokenUser($email , $pass ,$token);
    }


}