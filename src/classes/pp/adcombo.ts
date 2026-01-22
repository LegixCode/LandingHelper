import type { IPartner } from "@/types/Partner.ts";

export default {
    props: {
        api_key: "Ключ API",
        offer_id: "ID оффера",
        country_code: "Страна",
        price: "Цена на товара на лендинге",
    },
    subs: {
        subacc: "sub_id_1",
        subacc2: "sub_id_2",
        subacc3: "sub_id_3",
        subacc4: "sub_id_4",
        utm_campaign: "",
        utm_content: "",
        utm_medium: "",
        utm_source: "",
        utm_term: "",
        clickid: "click_id",
    },
    template: `
    $request_params = [
        'api_key' => $config->api_key,
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'offer_id' => $config->offer_id,
        'country_code' => $config->country_code,
        'price' => $config->price,
        'base_url' => $_SERVER["HTTP_HOST"],
        'ip' => $_SERVER['REMOTE_ADDR'],
        'referrer' => $_SERVER["HTTP_HOST"],
        'subacc' => {subacc},
        'subacc2' => {subacc2},
        'subacc3' => {subacc3},
        'subacc4' => {subacc4},
        'utm_campaign' => {utm_campaign},
        'utm_content' => {utm_content},
        'utm_medium' => {utm_medium},
        'utm_source' => {utm_source},
        'utm_term' => {utm_term},
        'clickid' => {clickid},
    ];
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.adcombo.com/api/v2/order/create/?".http_build_query($request_params),
        CURLOPT_RETURNTRANSFER => true
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    
    {write_log}
    
    $result = json_decode($result, true);
    
    if ($result['code'] == 'ok') {
        {success_page}
    } else {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
    } 
    `,
} as IPartner;
