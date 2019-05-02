<?php 
    
function registerMailChimp($email) {
           
    if(!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        // MailChimp API credentials
        $apiKey = '9a31bcd68c79c2bb9a9af398e3acacd9-us19';
        $listID = '3918e0f03b';
        
        // MailChimp API URL
        $memberID = md5(strtolower($email));
        $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
        $url = "https://{$dataCenter}.api.mailchimp.com/3.0/lists/{$listID}/members/{$memberID}";
        
        // member information
        $json = json_encode([
            'email_address' => $email,
            'status'        => 'subscribed',
        ]);
        
        // send a HTTP POST request with curl
        $ch = curl_init($url);
        
        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        $result = curl_exec($ch);

        

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        // store the status message based on response code
        if ($httpCode == 200) {
            
            return true;
        
        } else {
            switch ($httpCode) {
                case 214:
                    return false;
                    break;
                default:
                    return false;
                    break;
            }
        }
    }
        
    return false;
}
?>