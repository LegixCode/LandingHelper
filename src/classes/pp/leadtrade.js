export const leadtrade = {
    props: {
        hash: "Хеш",
        country: "Страна",
    },
    subs: {
        subid1: "sub_id_1",
        subid2: "sub_id_2",
        subid3: "sub_id_3",
        subid4: "sub_id_4",
    },
    template: `
    $request_params = [
        'name' => $_REQUEST['name'],
        'hash' => $config->hash,
        'ip' => (isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : $_SERVER['REMOTE_ADDR']),
        'phone' => $_REQUEST['phone'],
        'country' => $config->country,
        'data' => [],
        'subid1' => {subid1},
        'subid2' => {subid2},
        'subid3' => {subid3},
        'subid4' => {subid4},
    ];
    
    if (!empty($_REQUEST['address'])) {
        $request_params['data']['address'] = $_REQUEST['address'];
    }
    
    $ch = curl_init("https://leadtrade.ru/api/send_lead");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($request_params));
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Referer: https://" . $_SERVER["HTTP_HOST"]
    ]);
    $result = curl_exec($ch);
    curl_close($ch);
    
    {write_log}

    $result = json_decode($result, 1);
    
    {success_page}
    `,
};
