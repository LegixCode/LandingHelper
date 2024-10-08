const s={props:{api_key:"Ключ API",offer_id:"ID оффера",country:"Страна",lang:"Язык (alpha2)"},subs:{sub1:"sub_id_1",sub2:"sub_id_2",sub3:"sub_id_3",sub4:"sub_id_4",sub5:"sub_id_5"},template:`
    $request_params = [
        "api_key" => $config->api_key,
        "name" => $_POST["name"],
        "phone" => $_POST["phone"],
        "offer_id" => $config->offer_id,
        "country" => $config->country,
        "lang" => $config->lang,
        "ip" => !empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
        "sub1" => {sub1},
        "sub2" => {sub2},
        "sub3" => {sub3},
        "sub4" => {sub4},
        "sub5" => {sub5},
    ];
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.cpagetti.com/order/register",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $request_params,
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    
    {write_log}
    
    $result = json_decode($result, true);
    
    if (isset($result['success']) && $result['success']) {
        {success_page}
    } else {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    } 
    `};export{s as default};
