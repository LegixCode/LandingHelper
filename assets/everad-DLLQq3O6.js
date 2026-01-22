const _={props:{campaign_id:"ID потока"},subs:{sid1:"sub_id_1",sid2:"sub_id_2",sid3:"sub_id_3",sid4:"sub_id_4",sid5:"sub_id_5"},template:`
    $request_params = [
        "campaign_id" => $config->campaign_id,
        "name" => $_POST["name"],
        "phone" => $_POST["phone"],
        "ip" => isset($_SERVER["HTTP_CF_CONNECTING_IP"]) ? $_SERVER["HTTP_CF_CONNECTING_IP"] : $_SERVER["REMOTE_ADDR"],
        'sid1' => {sid1},
        'sid2' => {sid2},
        'sid3' => {sid3},
        'sid4' => {sid4},
        'sid5' => {sid5},
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://tracker.everad.com/conversion/new');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($request_params));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    {write_log}
    
    $result = json_decode($result);

    if ($httpCode == 200)
        {success_page}
    else
        header("Location: " . $_SERVER["HTTP_REFERER"]);
    `};export{_ as default};
