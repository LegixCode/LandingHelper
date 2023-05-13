export const simple = {
    name: "simple",
    preview: "previews/simple.jpg",
    style: `.simple_form .simple_form__button,.simple_form .simple_form__input{display:block;width:100%;padding:15px;outline:0;transition:.3s ease-out}.simple_form{max-width:360px;margin:30px auto;box-sizing:border-box}.simple_form *{box-sizing:border-box;margin:0}.simple_form .simple_form__product{text-align:center}.simple_form .simple_form__product img{max-height:300px;max-width:300px;margin:0 auto;}.simple_form .simple_form__product p.old_price{padding:0!important;text-align:center!important;font-size:20px;color:red;text-decoration:line-through}.simple_form .simple_form__product p.new_price{padding:0!important;text-align:center!important;font-size:32px;color:green;text-decoration:underline;font-weight:700}.simple_form form{width:100%;margin-top:30px}.simple_form .simple_form__label {width: 100%}.simple_form .simple_form__label b{font-weight:700}.simple_form .simple_form__input{font-size:16px;color:#757575;border:1px solid #ccc;border-radius:5px;background:#fff;margin-bottom:20px}.simple_form .simple_form__input:focus{border-color:#80bcb0;box-shadow:0 0 0 3px rgba(187,242,231,.4)}.simple_form .simple_form__button{margin-top:20px;border:none;font-weight:700;font-size:21px;text-align:center;text-transform:uppercase;color:#fff;background-color:#2d947e;border-radius:5px;cursor:pointer}.simple_form .simple_form__button:hover{background-color:#bd2c48}`,
    template: `
    <div class="simple_form" id="helper_form">
        <div class="simple_form__product">
            <img src="{image}">
            <p class="old_price">{old_price_value}</p>
            <p class="new_price">{new_price_value}</p>
        </div>
        <form action="order.php" method="POST">
            {form_inputs}
            <label class="simple_form__label">
                <b>{name}:</b>
                <input class="simple_form__input" required name="name" placeholder="{example_name}" type="text">
            </label>
            <label class="simple_form__label">
                <b>{phone}:</b>
                <input class="simple_form__input" required name="phone" placeholder="{example_phone}" type="tel" value="{phone_code}">
            </label>
            <button class="simple_form__button" type="submit">{order}</button>
        </form>
    </div>
    `,
};
