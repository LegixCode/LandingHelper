export const first = {
    name: "first",
    preview: "previews/first.jpg",
    translates: {
        ar: {
            t1: "شكرًا لك!",
            t2: "تم قبول طلبك!",
            t3: "سيتصل بك أحد المتخصصين ويؤكد تفاصيل الطلب.",
        },
        es: {
            t1: "¡GRACIAS!",
            t2: "¡Su pedido ha sido aceptado!",
            t3: "Un especialista se pondrá en contacto con usted y confirmará los datos del pedido.",
        },
        en: {
            t1: "Thank you!",
            t2: "Your order has been accepted!",
            t3: "A specialist will contact you and confirm the order details.",
        },
        cs: {
            t1: "Děkuji!",
            t2: "Vaše objednávka byla přijata!",
            t3: "Specialista vás bude kontaktovat a potvrdí podrobnosti objednávky.",
        },
        de: {
            t1: "Danke!",
            t2: "Ihre Bestellung wurde angenommen!",
            t3: "Ein Spezialist wird sich mit Ihnen in Verbindung setzen und die Bestelldetails bestätigen.",
        },
        fl: {
            t1: "Salamat!",
            t2: "Ang iyong order ay tinanggap!",
            t3: "Makikipag-ugnayan sa iyo ang isang espesyalista at kumpirmahin ang mga detalye ng order.",
        },
        fr: {
            t1: "Merci!",
            t2: "Votre commande a été acceptée!",
            t3: "Un spécialiste vous contactera et confirmera les détails de la commande.",
        },
        hi: {
            t1: "आपको धन्यवाद!",
            t2: "आपका आदेश स्वीकार कर लिया गया है!",
            t3: "एक विशेषज्ञ आपसे संपर्क करेगा और ऑर्डर विवरण की पुष्टि करेगा।",
        },
        hu: {
            t1: "Köszönöm!",
            t2: "Megrendelését elfogadtuk!",
            t3: "Egy szakember felveszi Önnel a kapcsolatot és megerősíti a megrendelés részleteit.",
        },
        id: {
            t1: "Terima kasih!",
            t2: "Pesanan Anda telah diterima!",
            t3: "Seorang spesialis akan menghubungi Anda dan mengonfirmasi detail pesanan.",
        },
        it: {
            t1: "Grazie a te!",
            t2: "Il tuo ordine è stato accettato!",
            t3: "Uno specialista ti contatterà e confermerà i dettagli dell'ordine.",
        },
        ms: {
            t1: "Terima kasih awak!",
            t2: "Pesanan anda telah diterima!",
            t3: "Pakar akan menghubungi anda dan mengesahkan butiran pesanan.",
        },
        ne: {
            t1: "धन्यवाद!",
            t2: "तपाईको अर्डर स्वीकार गरिएको छ!",
            t3: "एक विशेषज्ञले तपाईंलाई अर्डर विवरणहरू पुष्टि गर्न सम्पर्क गर्नेछ।",
        },
        pl: {
            t1: "Dziękuję!",
            t2: "Twoje zamówienie zostało przyjęte!",
            t3: "Specjalista skontaktuje się z Tobą i potwierdzi szczegóły zamówienia.",
        },
        pt: {
            t1: "Obrigado!",
            t2: "Seu pedido foi aceito!",
            t3: "Um especialista entrará em contato com você e confirmará os detalhes do pedido.",
        },
        ro: {
            t1: "Mulțumesc!",
            t2: "Comanda dumneavoastră a fost acceptată!",
            t3: "Un specialist vă va contacta și vă va confirma detaliile comenzii.",
        },
        tr: {
            t1: "Teşekkürler!",
            t2: "Siparişiniz kabul edilmiştir!",
            t3: "Bir uzman sizinle iletişime geçecek ve sipariş detaylarını teyit edecek.",
        },
        sq: {
            t1: "Хвал!",
            t2: "Ваша наруџбина је прихваћена!",
            t3: "Наш оператер ће вас контактирати да би потврдио наруџбину.",
        },
    },
    template: `
    <!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta name="description" content="" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<title>{t1}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
	<style>
		body,h1,h2,p,ul{margin:0}.mk-wrapper,.title{display:-webkit-box;display:-ms-flexbox}.content,.mk-wrapper{max-width:4.8rem;margin:0 auto}.card,.mk-wrapper,.title{-webkit-box-orient:horizontal;-webkit-box-direction:normal}.card__icon svg,.title__icon svg{display:block;width:100%}html{line-height:1.15;-webkit-text-size-adjust:100%}h1{font-size:2em}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}*,:after,:before{-webkit-box-sizing:border-box;box-sizing:border-box}html{font-size:625%}body{font-family:Montserrat,sans-serif;font-size:.18rem;font-weight:400;line-height:1.17;color:#333;background:#fff;min-height:100vh}ul{list-style-type:none;padding:0}.mk-wrapper{display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100vh;padding:.88rem .3rem;overflow:hidden}.content{width:100%}.content__cards{margin:.48rem 0}.card,.title__main{margin-bottom:.16rem}.title{display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.title__main{font-size:.46rem;font-weight:700}.title__subtitle{font-size:.24rem;font-weight:500}.title__icon{width:.74rem;height:.57rem;-ms-flex-negative:0;flex-shrink:0;margin-right:.14rem}.card{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:.16rem;background-color:#fff;-webkit-box-shadow:0 .04rem .21rem #e9e9e9;box-shadow:0 .04rem .21rem #e9e9e9;border-radius:.08rem}.card__icon{width:.64rem;height:auto;margin:0 auto .16rem;-ms-flex-negative:0;flex-shrink:0}.card__text{font-weight:500;padding-left:.16rem}@media (max-width:479px){html{font-size:21vw}}
	</style>
</head>

<body>
{pixel}
	<div class="mk-wrapper">
		<div class="content">
			<div class="content__title title">
				<div class="title__text">
					<h1 class="title__main">{t1}</h1>
					<h2 class="title__subtitle">{t2}</h2>
				</div>
				<div class="title__icon">
					<svg width="74" height="57" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M23.5 44.4999L6.00002 26.9999L0.166687 32.8332L23.5 56.1666L73.5 6.16658L67.6667 0.333252L23.5 44.4999Z"
							fill="#0085FF" fill-opacity="0.87" />
					</svg>
				</div>
			</div>
			<ul class="content__cards cards">
				<li class="card">
					<div class="card__icon">
						<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M29.5798 0.118879C23.5632 0.734793 17.9488 3.53983 13.9213 7.94216C9.95805 12.2743 7.74024 17.6102 7.44054 23.5343L7.35355 25.2537H6.18501C4.79839 25.2537 4.61069 25.3839 4.54655 26.3899L4.5042 27.0533L2.4874 27.7714C1.2835 28.2002 0.375798 28.6025 0.235294 28.7697C0.0168067 29.0297 0 29.6417 0 37.3594C0 45.0771 0.0168067 45.6891 0.235294 45.9492C0.375798 46.1163 1.28363 46.5188 2.4874 46.9475L4.5042 47.6658L4.54427 48.3488C4.61271 49.5122 4.49694 49.4832 8.89116 49.4375C12.2571 49.4027 12.7636 49.3692 13.1966 49.1537C13.8674 48.8197 14.59 48.0691 14.9557 47.3265L15.2605 46.7078L15.3006 37.9721C15.3253 32.5563 15.289 28.9054 15.205 28.3654C14.9935 27.0058 14.0879 25.8789 12.8554 25.4415L12.437 25.2928L12.4582 23.8946C12.4983 21.2469 13.1987 18.4732 14.4633 15.9532C17.1864 10.5274 22.0492 6.79104 28.1049 5.47178C30.1088 5.03516 33.8543 5.02844 35.8572 5.45792C44.7804 7.37117 51.0678 14.7022 51.5882 23.7995L51.6709 25.2449L51.2808 25.3866C50.2049 25.7773 49.4698 26.4314 49.0249 27.3938C48.7426 28.0042 48.7395 28.1145 48.7395 37.3594V46.7078L49.0443 47.3265C49.4123 48.0739 50.1376 48.8244 50.8034 49.1471C51.0733 49.278 51.7026 49.4099 52.2017 49.4403L53.1092 49.4956V52.7708C53.1092 55.7346 53.0833 56.1156 52.8359 56.7771C52.4877 57.708 51.7221 58.5784 50.804 59.0871L50.084 59.4861L43.4779 59.5246L36.8719 59.5629L36.7852 59.2176C36.7376 59.0278 36.4129 58.5776 36.0636 58.2173C35.1804 57.306 34.5296 57.1322 32 57.1322C29.5082 57.1322 28.8269 57.3099 27.9477 58.1896C27.3371 58.8004 26.8908 59.8023 26.8908 60.5622C26.8908 61.8896 28.0278 63.3967 29.3189 63.7803C30.2832 64.0668 33.6886 64.0751 34.6369 63.7935C35.4771 63.5438 36.3266 62.8257 36.7037 62.0462L36.9942 61.446L43.6735 61.4075L50.3529 61.3692L51.399 60.8695C52.7899 60.205 53.7607 59.2339 54.4249 57.8424L54.9244 56.7959L54.9916 53.1642L55.0588 49.5325L57.0021 49.4949C59.2842 49.451 59.3939 49.3997 59.4557 48.3488L59.4958 47.6658L61.5126 46.9506C62.7425 46.5145 63.6212 46.125 63.7647 45.9522C63.9832 45.6894 64 45.0759 64 37.3594C64 29.643 63.9832 29.0295 63.7647 28.7666C63.6212 28.5939 62.7425 28.2044 61.5126 27.7683L59.4958 27.0533L59.4534 26.3899C59.3893 25.3839 59.2016 25.2537 57.815 25.2537H56.6465L56.5595 23.5343C56.1519 15.4797 52.1029 8.39236 45.3782 3.963C40.8511 0.981213 35.0188 -0.437987 29.5798 0.118879ZM34.0362 1.98532C42.5878 2.82102 49.8038 8.16303 53.0208 16.0398C54.0121 18.4669 54.5267 20.8199 54.6756 23.6059L54.7637 25.2537H54.1381H53.5126L53.5115 24.413C53.5059 20.1156 51.8794 15.3334 49.2171 11.7861C48.0022 10.1675 45.9769 8.17836 44.386 7.04149C43.024 6.06805 40.3882 4.72068 38.8683 4.22098C36.1097 3.31386 32.9663 2.92742 30.3529 3.1741C27.1956 3.47204 25.162 4.04545 22.3836 5.42147C17.394 7.89253 13.3788 12.5035 11.6307 17.7698C10.9275 19.888 10.4912 22.4263 10.4885 24.413L10.4874 25.2537H9.88235H9.27731L9.27839 24.3457C9.28175 21.5984 10.0128 18.2064 11.1844 15.5018C15.0202 6.64752 24.4811 1.05156 34.0362 1.98532ZM30.1176 23.7204C25.1025 24.6388 21.6319 27.2375 19.5509 31.6322C18.7724 33.2763 18.416 34.7687 18.3277 36.7542C18.2173 39.2357 18.5722 40.9834 19.6581 43.3036L20.2052 44.4727L19.2452 47.2044C18.717 48.7067 18.2852 50.0721 18.2853 50.2386C18.2858 50.6279 18.7372 51.0793 19.1261 51.0793C19.2924 51.0793 20.6629 50.6471 22.1714 50.1189L24.9143 49.1584L25.8017 49.5982C31.1878 52.2685 37.4869 51.26 41.6909 47.0543C42.9088 45.8359 43.6655 44.7456 44.4405 43.0926C45.253 41.3596 45.5863 39.9342 45.6711 37.8302C45.73 36.3688 45.6938 35.8503 45.4504 34.6726C44.3827 29.508 40.6442 25.4955 35.5972 24.0969C34.5896 23.8177 33.9823 23.7433 32.4034 23.7055C31.3311 23.6799 30.3025 23.6867 30.1176 23.7204ZM34.958 25.8619C38.3642 26.7561 41.2523 29.1827 42.7438 32.4036C43.4364 33.8992 43.6996 34.9827 43.7925 36.7177C44.0481 41.4937 41.541 45.8379 37.3109 47.9489C33.8011 49.7005 29.7263 49.6144 26.2681 47.7155C25.7302 47.4203 25.1911 47.1786 25.0701 47.1786C24.9492 47.1786 23.9738 47.4867 22.9025 47.8633C21.831 48.24 20.9233 48.5169 20.8851 48.4789C20.8471 48.4407 21.1239 47.5326 21.5004 46.4607C21.8768 45.3889 22.1849 44.4205 22.1849 44.3087C22.1849 44.1969 21.9431 43.6571 21.6476 43.1091C19.0471 38.2861 19.922 32.5187 23.8166 28.8105C25.5203 27.1883 27.3572 26.2254 29.7143 25.7191C30.8687 25.471 33.77 25.5501 34.958 25.8619ZM12.5086 27.3408C12.7255 27.453 13.0099 27.7406 13.1406 27.9798C13.3609 28.3832 13.3782 29.0616 13.3782 37.3594C13.3782 45.6573 13.3609 46.3357 13.1406 46.7391C12.714 47.5199 12.4298 47.5821 9.28403 47.5821H6.45378V37.3594V27.1368H9.28403C11.5508 27.1368 12.1927 27.1774 12.5086 27.3408ZM57.5462 37.3594V47.5821H54.716C51.5702 47.5821 51.2861 47.5199 50.8594 46.7391C50.6391 46.3359 50.6219 45.6601 50.6219 37.4267C50.6219 27.6946 50.6068 27.8852 51.4178 27.3903C51.7886 27.1642 52.131 27.1377 54.6891 27.1373L57.5462 27.1368V37.3594ZM4.57143 37.3594C4.57143 43.7653 4.53513 45.5645 4.40592 45.5645C4.31489 45.5645 3.70985 45.3745 3.06138 45.1425L1.88235 44.7206V37.3594V29.9982L2.9916 29.5882C3.60175 29.3626 4.20679 29.1727 4.33613 29.1663C4.55785 29.1551 4.57143 29.6303 4.57143 37.3594ZM60.9611 29.5758L62.1176 29.9974V37.3594V44.7215L60.9611 45.143C60.325 45.3748 59.7199 45.5645 59.6165 45.5645C59.4576 45.5645 59.4286 44.2979 59.4286 37.3594C59.4286 30.421 59.4576 29.1544 59.6165 29.1544C59.7199 29.1544 60.325 29.3441 60.9611 29.5758ZM24.1862 34.7133C22.3222 35.4069 21.6686 37.3646 22.7599 38.9848C23.3432 39.8505 24.6346 40.3314 25.6452 40.0592C27.5989 39.5328 28.3876 37.4134 27.2555 35.732C26.6491 34.8314 25.1797 34.3436 24.1862 34.7133ZM31.1339 34.7283C29.9236 35.1758 29.248 36.1218 29.2545 37.3594C29.2617 38.7322 30.2416 39.8878 31.5919 40.1161C33.4561 40.4312 35.1878 38.5395 34.6986 36.7224C34.2705 35.1317 32.588 34.1907 31.1339 34.7283ZM38.1255 34.7283C37.0844 35.1133 36.4118 35.9104 36.2326 36.9718C35.9211 38.8166 37.8228 40.5455 39.6284 40.0592C41.5821 39.5328 42.3708 37.4134 41.2387 35.732C40.62 34.8129 39.1652 34.3439 38.1255 34.7283ZM25.6195 36.7481C25.801 36.9297 25.9496 37.2048 25.9496 37.3594C25.9496 37.7223 25.3712 38.301 25.0084 38.301C24.6456 38.301 24.0672 37.7223 24.0672 37.3594C24.0672 36.9965 24.6456 36.4179 25.0084 36.4179C25.163 36.4179 25.438 36.5665 25.6195 36.7481ZM32.6111 36.7481C32.7926 36.9297 32.9412 37.2048 32.9412 37.3594C32.9412 37.5141 32.7926 37.7892 32.6111 37.9708C32.4296 38.1524 32.1546 38.301 32 38.301C31.6372 38.301 31.0588 37.7223 31.0588 37.3594C31.0588 36.9965 31.6372 36.4179 32 36.4179C32.1546 36.4179 32.4296 36.5665 32.6111 36.7481ZM39.6027 36.7481C39.7842 36.9297 39.9328 37.2048 39.9328 37.3594C39.9328 37.5141 39.7842 37.7892 39.6027 37.9708C39.4212 38.1524 39.1462 38.301 38.9916 38.301C38.837 38.301 38.562 38.1524 38.3805 37.9708C38.199 37.7892 38.0504 37.5141 38.0504 37.3594C38.0504 37.2048 38.199 36.9297 38.3805 36.7481C38.7992 36.3291 39.184 36.3291 39.6027 36.7481ZM34.691 59.4928C35.2571 60.0596 35.3414 60.6942 34.9312 61.2999C34.4354 62.0322 34.1704 62.1051 32 62.1051C29.8296 62.1051 29.5646 62.0322 29.0688 61.2999C28.8313 60.9494 28.7696 60.716 28.8241 60.3748C28.9012 59.8911 29.3347 59.3315 29.7815 59.1389C29.9294 59.0752 31.0024 59.0364 32.1658 59.0528L34.2813 59.0826L34.691 59.4928Z"
								fill="#0085FF" />
						</svg>
					</div>
					<p class="card__text">{t3}</p>
				</li>
			</ul>
		</div>
	</div>
</body>

</html>
    `,
};
