const _={props:{api_key:"Ключ API",flow:"Поток",offer_id:"ID оффера"},subs:{sub1:"sub_id_1",sub2:"sub_id_2",sub3:"sub_id_3",sub4:"sub_id_4",sub5:"sub_id_5",subid:"click_id"},template:`
      $request_params = [
      "flow" => $config->flow,
      "offer" => $config->offer_id,
      "phone" => $_REQUEST["phone"],
      "name" => $_REQUEST["name"],
      "other" => $_REQUEST["other"],
      "ip" => $_SERVER["REMOTE_ADDR"],
      "ua" => $_SERVER["HTTP_USER_AGENT"],
      "sub1" => $_POST["sub_id_1"],
      "sub2" => $_POST["sub_id_2"],
      "sub3" => $_POST["sub_id_3"],
      "subid" => $_POST["click_id"],
      "sub5" => "",
      "ajax" => 1,
      ];
      $url = "https://api.offer.store/wm/push.json?id=" . $config->api_key;

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER["HTTP_USER_AGENT"]);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($request_params));
      $result = curl_exec($ch);
      curl_close($ch);

      {write_log}

      {success_page}
    `};export{_ as default};
