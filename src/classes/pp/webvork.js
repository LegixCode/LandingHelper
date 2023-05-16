export default {
    props: {
        token: "Ключ API",
        offer_id: "ID оффера",
        country: "Страна"
    },
    subs: {
        utm_campaign: "sub_id_1",
        utm_medium: "sub_id_2",
        utm_content: "sub_id_3",
        utm_term: "sub_id_4",
    },
    template: `
    $request_params = array(
        "token" => $config->token,
        "offer_id" => $config->offer_id,
        "country" => $config->country,
        "name" => $_REQUEST["name"],
        "phone" => $_REQUEST["phone"],
        "ip" => $_SERVER["REMOTE_ADDR"],
        'utm_campaign' => {utm_campaign},
        'utm_medium' => {utm_medium},
        'utm_content' => {utm_content},
        'utm_term' => {utm_term},
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://api.webvork.com/v1/new-lead");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);
    $result = curl_exec($ch);
    curl_close($ch);
    
    {write_log}
    
    $result = json_decode($result);
    
    if ($result->status == "ok") {
        {success_page}
        exit;
    }
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    `,
};
