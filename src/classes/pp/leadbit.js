export default {
    props: {
        token: "Ключ API",
        flow_hash: "Хеш потока",
        country: "Страна",
    },
    subs: {
        sub1: "sub_id_1",
        sub2: "sub_id_2",
        sub3: "sub_id_3",
        sub4: "sub_id_4",
        sub5: "sub_id_5",
    },
    template: `
    $request_params = [
        'flow_hash' => $config->flow_hash,
        'country' => $config->country,
        'phone' => $_POST["phone"],
        'name' => $_POST["name"],
        'referrer' => "https://" . $_SERVER["HTTP_HOST"],
        'ip' => $_SERVER["REMOTE_ADDR"],
        'sub1' => {sub1},
        'sub2' => {sub2},
        'sub3' => {sub3},
        'sub4' => {sub4},
        'sub5' => {sub5},
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://wapi.leadbit.com/api/pub/new-order/" . $config->token);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
    curl_setopt($ch, CURLOPT_REFERER, "https://" . $_SERVER["HTTP_HOST"]);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);

    $result = curl_exec($ch);
    
    {write_log}
    
    $result = json_decode($result);

    if ($result && isset($result->status) && $result->status == 'success') {
        {success_page}
        exit;
    }
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
    `,
};
