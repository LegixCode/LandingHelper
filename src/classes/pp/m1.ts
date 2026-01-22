import type { IPartner } from "@/types/Partner.ts";

export default {
    props: {
        ref: 'ID вебмастера',
        api_key: "Ключ API",
        product_id: "ID оффера",
        langCode: "Страна",
    },
    subs: {
        s: "sub_id_1",
        w: "sub_id_2",
        t: "sub_id_3",
        p: "sub_id_4",
        m: "sub_id_5",
    },
    template: `
    $request_params = [
        'ref' => $config->ref,
        'api_key' => $config->api_key,
        'product_id' => $config->product_id,
        'langCode' => $config->langCode,
        'phone' => $_POST['phone'],
        'name' => $_POST['name'],
        'ip' => $_SERVER['REMOTE_ADDR'],
        's' => {s},
        'w' => {w},
        't' => {t},
        'p' => {p},
        'm' => {m},
    ];

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_HEADER, 0);
    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 0);
    curl_setopt($curl, CURLOPT_TIMEOUT, 20);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $request_params);
    curl_setopt($curl, CURLOPT_URL, 'http://m1.top/send_order/');


    $result = curl_exec($curl);
    curl_close($curl);

    {write_log}

    $result = json_decode($result);

    if ($result && isset($result->result) && $result->result == 'ok') {
        {success_page}
        exit;
    }
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
    `,
} as IPartner;
