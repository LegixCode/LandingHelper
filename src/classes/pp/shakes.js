export default {
    props: {
        api_key: "Ключ API",
        offer_id: "ID оффера",
        stream_code: "ID потока",
        country: "Страна",
    },
    subs: {
        sub1: "sub_id_1",
        sub2: "sub_id_2",
        sub3: "sub_id_3",
        sub4: "sub_id_4",
    },
    template: `
    $request_params = [
        'countryCode' => $config->country,
        'comment' => isset($_POST['comment']) ? $_POST['comment'] : '',
        'createdAt' => date('Y-m-d H:i:s'),
        'ip' => isset($_SERVER["HTTP_CF_CONNECTING_IP"]) ? $_SERVER["HTTP_CF_CONNECTING_IP"] : $_SERVER['REMOTE_ADDR'],
        'landingUrl' => "https://" . $_SERVER["HTTP_HOST"],
        'name' => $_POST['name'],
        'offerId' => $config->offer_id,
        'phone' => $_POST['phone'],
        'referrer' => "https://" . $_SERVER["HTTP_HOST"],
        'streamCode' => $config->stream_cpde,
        'sub1' => {sub1},
        'sub2' => {sub2},
        'sub3' => {sub3},
        'sub4' => {sub4},
        'userAgent' => (!empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '-'),
    ];
    
	$ch = curl_init("http://shakes.pro?r=/api/order/in&key=" . $config->api_key);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_USERAGENT, 'curl/' . (curl_version()['version'] ?? '7'));
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);
    $result = curl_exec($ch);
    curl_close($ch);

    {write_log}
    
    try {
        if (empty($result))
            throw new Exception('');
        
        $result = json_decode($result, true);

        if (empty($result) || $result['status'] !== 'ok')
            throw new Exception('');

        {success_page}
    } catch (Exception $e) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
	}
    `,
};
