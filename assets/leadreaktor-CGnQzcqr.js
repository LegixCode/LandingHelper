const s={props:{api_key:"Ключ API",offer_id:"ID оффера",country:"Страна"},subs:{sub1:"sub_id_1",sub2:"sub_id_2",sub3:"sub_id_3",sub4:"sub_id_4",sub5:"sub_id_5",utm_source:"",utm_content:"",utm_term:"",utm_campaign:""},template:`
    $request_params = array(
        'goods_id' => $config->offer_id,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'msisdn' => $_POST['phone'],
        'name' => $_POST['name'],
        'country' => $config->country,
        'domain' => $_SERVER['SERVER_NAME'],
        'url_params[sub1]' => {sub1},
        'url_params[sub2]' => {sub2},
        'url_params[sub3]' => {sub3},
        'url_params[sub4]' => {sub4},
        'url_params[sub5]' => {sub5},
        'url_params[utm_source]' => {utm_source},
        'url_params[utm_content]' => {utm_content},
        'url_params[utm_term]' => {utm_term},
        'url_params[utm_campaign]' => {utm_campaign},
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api-new.leadreaktor.com/api/order/create.php?api_key=" . $config->api_key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);
    $result = curl_exec($ch);
    curl_close($ch);

    {write_log}

    $result = json_decode($result, true);
    if (!isset($result['response'], $result['response']['msg']) || $result['response']['msg'] != "success") {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    } 

    {success_page}
    `};export{s as default};
