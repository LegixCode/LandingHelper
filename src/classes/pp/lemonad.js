export default {
    props: {
        webmaster_token: "Ключ API",
        offer_id: "ID оффера",
    },
    subs: {
        utm_campaign: "sub_id_1",
        utm_content: "sub_id_2",
        utm_medium: "sub_id_3",
        utm_source: "sub_id_4",
        utm_term: "sub_id_5",
        clickid: "click_id",
        fbpxl: "pixel",
    },
    template: `
    $request_params = array(
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'offerId' => $config->offer_id,
        'domain' => "https://" . $_SERVER["HTTP_HOST"],
        'ip' => $_SERVER['REMOTE_ADDR'],
        'utm_campaign' => {utm_campaign},
        'utm_content' => {utm_content},
        'utm_medium' => {utm_medium},
        'utm_source' => {utm_source},
        'utm_term' => {utm_term},
        'clickid' => {clickid},
        'fbpxl' => {fbpxl},

    );

    $data = json_encode($request_params);
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://sendmelead.com/api/v3/lead/add",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data),
            'X-Token: ' . $config->webmaster_token,
        ),
    ));

    $result = curl_exec($curl);
    curl_close($curl);

    {write_log}

    $result = json_decode($result, true);

    if ($result === null) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    } 
        {success_page}
        exit;
    `,
};
