export default {
    props: {
        api_key: "Ключ API",
        flow: "ID потока",
        offer: "ID оффера",
    },
    subs: {
        utm_source: "sub_id_1",
        utm_campaign: "sub_id_2",
        utm_content: "sub_id_3",
        utm_term: "sub_id_4",
        utm_medium: "sub_id_5",
        subid: "click_id",
    },
    template: `
    $request_params = array(
        "flow" => $config->flow,
        "offer" => $config->offer,
        "name" => $_REQUEST["name"],
        "phone" => $_REQUEST["phone"],
        "ip" => $_SERVER["REMOTE_ADDR"],
        "ua" => $_SERVER["HTTP_USER_AGENT"],
        "subid" => {subid},
        "utm_source" => {utm_source},
        "utm_campaign" => {utm_campaign},
        "utm_content" => {utm_content},
        "utm_term" => {utm_term},
        "utm_medium" => {utm_medium},
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.skylead.pro/wm/push.json?id=" . $config->api_key);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);
    $result = curl_exec($ch);
    curl_close($ch);

    {write_log}

    $result = json_decode($result, true);
    if (isset($result['status']) && $result['status'] == 'ok') {
        {success_page}
    } else {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    }
    `,
};
