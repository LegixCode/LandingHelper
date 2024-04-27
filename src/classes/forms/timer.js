export const timer = {
    name: "timer",
    preview: "previews/timer_form.jpg",
    scripts: ["simple_timer"],
    style: `.timer_form{max-width:360px;margin:30px auto;box-sizing:border-box;text-align:center;color:#808285}.timer_form *{box-sizing:border-box;margin:0}.timer_form .timer_form__product{text-align:center}.timer_form .timer_form__product img{max-height:300px;max-width:300px;margin: 0 auto;}.timer_form .time-block .time-title{text-align:center;border:0;font-weight:300;font-size:26px;line-height:1.2;overflow-wrap:break-word;margin-bottom:15px}.timer_form .time-block .time-remain{display:flex;justify-content:center;align-items:center;width:100%;margin:0 auto;font-weight:300;text-transform:uppercase;color:#f30010}.timer_form .time-block .time-remain .time-remain-items{position:relative;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:0 14px;font-size:32px}.timer_form .time-block .time-remain .time-remain-items .number{line-height:60px}.timer_form .time-block .time-remain .time-text{font-size:10px;font-weight:700}.timer_form .time-block .time-remain .time-dots{font-size:32px}.timer_form .price{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:20px;margin-top:30px;gap:20px}.timer_form .price .price_value{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;font-size:32px}.timer_form .price .price_value .price_text{font-size:12px;margin-bottom:6px}.timer_form .price .price_value .old_price-value{text-decoration:line-through}.timer_form .price .price_value .new_price-value{color:red}.timer_form form{width:100%;margin-top:20px}.timer_form .timer_form__label{width:100%}.timer_form .timer_form__label span{font-weight:300;line-height:30px;font-size:16px}.timer_form .timer_form__input{display:block;width:100%;padding:12px;font-size:16px;color:#666;border:1px solid #eaeaea;border-radius:2px;background:#fafafa;transition:.3s ease-out;outline:0;margin-bottom:20px}.timer_form .timer_form__input:focus{border-color:#80bcb0;box-shadow:0 0 0 3px rgba(187,242,231,.4)}.timer_form .timer_form__button{display:block;width:100%;margin-top:20px;padding:15px;border:none;font-weight:700;font-size:21px;text-align:center;text-transform:uppercase;color:#fff;background-color:#f30010;border-radius:5px;cursor:pointer;outline:0;transition:.3s ease-out}.timer_form .timer_form__button:hover{background-color:#bd2c48}.timer_form .pay_after_receive{margin-top:20px;font-size:16px}`,
    template: `
    <div class="timer_form" id="helper_form">
        <div class="timer_form__product">
            <img src="{image}">
        </div>
        <div class="time-block">
            <h1 class="time-title">{discount_end}:</h1>
            <div class="time-remain simple_timer">
                <div class="time-remain-items">
                    <span class="number hours">03</span>
                    <span class="time-text">{hours}</span>
                </div>
                <div class="time-dots">:</div>
                <div class="time-remain-items">
                    <span class="number minutes">44</span>
                    <span class="time-text">{minutes}</span>
                </div>
                <div class="time-dots">:</div>
                <div class="time-remain-items">
                    <span class="number seconds">28</span>
                    <span class="time-text">{seconds}</span>
                </div>
            </div>
        </div>
        <div class="price">
            <div class="old_price price_value">
                <span class="price_text">{old_price}:</span>
                <span class="old_price-value">{old_price_value}</span>
            </div>
            <div class="new_price price_value">
                <span class="price_text">{new_price}:</span>
                <span class="new_price-value">{new_price_value}</span>
            </div>
        </div>
        <form action="order.php" method="POST">
            {form_inputs}
            <label class="timer_form__label">
                <span> {name} </span>
                <input class="timer_form__input" name="name" placeholder="{example_name}" required type="text">
            </label>
            <label class="timer_form__label">
                <span> {phone} </span>
                <input class="timer_form__input" name="phone" placeholder="{example_phone}" required type="tel" value="{phone_code}">
            </label>
            <button class="timer_form__button" type="submit"> {order} </button>
        </form>
        <p class="pay_after_receive">{pay_after_receive}</p>
    </div>
    `,
};
