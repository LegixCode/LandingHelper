export const trafficlight = {
    props: {
        apiKey: "Ключ API",
        offer_id: "ID оффера",
        stream_hid: "ID потока",
        country: "Страна",
    },
    subs: {
        sub1: "sub_id_1",
        sub2: "sub_id_2",
        sub3: "sub_id_3",
        sub4: "sub_id_4",
        sub5: "sub_id_5",
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        utm_term: "",
        click_id: "click_id"
    },
    template: `
    $request_params = array(
        'key' => $config->apiKey,
        'id' => strlen({click_id}) > 0 ? {click_id} : microtime(true),
        'offer_id' => $config->offer_id,
        'stream_hid' => $config->stream_hid,
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'sub1' => {sub1},
        'sub2' => {sub2},
        'sub3' => {sub3},
        'sub4' => {sub4},
        'sub5' => {sub5},
        'comments' => $_POST['comments'],
        'country' => $config->country, 
        'address' => $_POST['address'],
        'tz' => "", 
        'web_id' => '',
        'ip_address' => isset($_SERVER["HTTP_CF_CONNECTING_IP"]) ? $_SERVER["HTTP_CF_CONNECTING_IP"] : $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT'],
    );

    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($request_params),
            'ignore_errors' => true,
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents('http://api.cpa.tl/api/lead/send', false, $context);

    {write_log}

    $obj = json_decode($result);

    if (null === $obj || !empty($obj->errmsg)) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    }
    {success_page}
    `,
};
