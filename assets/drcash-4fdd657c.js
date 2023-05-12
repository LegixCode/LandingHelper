const e={props:{api_key:"Ключ API",stream_code:"ID потока"},subs:{sub1:"sub_id_1",sub2:"sub_id_2",sub3:"sub_id_3",sub4:"sub_id_4",sub5:"sub_id_5"},template:`
    $request_params = [
        'stream_code'   => $config->stream_code,
        'client'        => [
            'name'      => $_POST['name'],
            'phone'     => $_POST['phone'],
            'ip'        => $_SERVER['REMOTE_ADDR'],
        ],
        'sub1' => {sub1},
        'sub2' => {sub2},
        'sub3' => {sub3},
        'sub4' => {sub4},
        'sub5' => {sub5},
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://order.drcash.sh/v1/order");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($request_params));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $config->api_key
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    
    {write_log}
    
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($httpcode != 200) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
	}
    {success_page}
    `};export{e as default};
