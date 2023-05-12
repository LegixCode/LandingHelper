const _={props:{key:"ID пользователя",secret:"Токен",flow_url:"Трекинговая ссылка"},subs:{sub1:"sub_id_1",sub2:"sub_id_2",sub3:"sub_id_3",sub4:"sub_id_4",sub5:"sub_id_5"},template:`
    $request_params = [
        'flow_url' => $config->flow_url,
        'user_phone' => $_REQUEST['phone'],
        'user_name' => $_REQUEST['name'],
        'other' => $_REQUEST['other'],
        'ip' => $_SERVER['REMOTE_ADDR'],
        'ua' => $_SERVER['HTTP_USER_AGENT'],
        'api_key' => $config->key,
        'sub1' => {sub1},
        'sub2' => {sub2},
        'sub3' => {sub3},
        'sub4' => {sub4},
        'sub5' => {sub5},
        'ajax' => 1,
    ];
    $url = 'https://leadrock.com/api/v2/lead/save';

    $trackUrl = $config->flow_url . (strpos($config->flow_url, '?') === false ? '?' : '&') . http_build_query($request_params);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $trackUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    $request_params['track_id'] = curl_exec($ch);

    $request_params['sign'] = sha1(http_build_query($request_params) . $config->secret);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($request_params));
    $result = curl_exec($ch);
    curl_close($ch);
    
    {write_log}

    {success_page}
    `};export{_ as default};
