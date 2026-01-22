import type { IPartner } from "@/types/Partner.ts";

export default {
    props: {
        api_key: "Ключ API",
        stream_id: "ID потока",
        country: "Страна",
    },
    subs: {
        data1: "sub_id_1",
        data2: "sub_id_2",
        data3: "sub_id_3",
        data4: "sub_id_4",
        data5: "sub_id_5",
    },
    template: `
    $request_params = [
        'channel' => $config->stream_id,
        'name' =>  $_POST['name'],
        'phone' => $_POST['phone'],
        'ip' => $_SERVER['REMOTE_ADDR'],
        'referer' => $_SERVER['HTTP_HOST'],
        'country' => $config->country,
        'data1' => {data1},
        'data2' => {data2},
        'data3' => {data3},
        'data4' => {data4},
        'data5' => {data5},
    ];
    
	$ch = curl_init('https://api.kma.biz/lead/add');
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 60);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch,CURLOPT_HTTPHEADER, ["Authorization: Bearer " . $config->api_key]);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $request_params);
    $result = curl_exec($ch);
    curl_close($ch);
    
    {write_log}
    
    $result = json_decode($result);

	if($result->message == 'OK' || $result->message == 'Duplicate of order!'){
        {success_page}
	} else {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
	}
    `,
} as IPartner;
