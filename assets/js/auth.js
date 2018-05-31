$(function () {

	var images = [
		'background_img_4.jpg'
	];

	$('.background-img').css({'background-image': 'url(assets/img/' + images[Math.floor(Math.random() * images.length)] + ')'});

});




var loginFormData = {
    id : "form-login",
    action : "ls?action=login"
};
var registrationFormData = {id : "form-reg"};

jQuery.message = function (message, type) {

    type = (type == undefined) ? 'success' : type;
    if(type === 'error') { type = 'danger' }

    // Notification
    $.growl({
        message: message,
        url: ''
    },{
        element: 'body',
        type: type,
        allow_dismiss: true,
        offset: {
            x: 20,
            y: 85
        },
        spacing: 10,
        z_index: 1031,
        delay: 2500,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
            '<button type="button" class="close" data-growl="dismiss">' +
            '<span aria-hidden="true">&times;</span>' +
            '<span class="sr-only">Close</span>' +
            '</button>' +
            '<span data-growl="icon"></span>' +
            '<span data-growl="title"></span>' +
            '<span data-growl="message"></span>' +
            '<a href="#" data-growl="url"></a>' +
            '</div>'
    });
};

$.authService = function (method) {
    var methods = {
        init: function () {
            /*
            Logo
             */
            var logo = $('<img src="assets/img/logo.png">');

            /*
            Static objects
             */
            var form = $('<form class="p-t-15" method="POST"><div class="row"></div></form>');
            var input = $('<div class="form-group fg-line">'
                        +'<label>#</label>'
                        +'<div controls></div>'
                        +'</div>');

            var button = $('<button class="btn btn-warning m-t-20" type="submit">#</button>');
            var button2= $('<button class="btn btn-warning m-t-20" onclick="submitL(\'registration\')">#</button>');
            var changeLayoute = $('<p class="m-t-20 cursor">#</p>');



            /*
            Form for Login
             */
            var loginForm = form.clone();
            loginForm.attr('id', loginFormData.id);
            loginForm.attr('action', loginFormData.action);

            var loginInputLogin = input.clone();
            var passwordInputLogin = input.clone();
            var buttonLogin = button.clone();
            var changeLayouteLogin = changeLayoute.clone();

            loginInputLogin.find('label').html('İstifadəçi adı');
            loginInputLogin.find('[controls]').html('<input type="text" name="username" class="form-control" id="login" placeholder="İstifadəçi adı">');
            loginForm.append(loginInputLogin);

            passwordInputLogin.find('label').html('Şifrə');
            passwordInputLogin.find('[controls]').html('<input type="password"  class="form-control" id="passw" name="password" placeholder="Şifrə">');
            loginForm.append(passwordInputLogin);

            buttonLogin.html("Daxil ol");
            loginForm.append(buttonLogin);

            changeLayouteLogin.attr('onclick', "changeLayoute('registration')");
            changeLayouteLogin.html("Qeydiyyat");
            loginForm.append(changeLayouteLogin);

            $('#init').prepend(loginForm);


            /*
             Form for Registration
             */
            var registrationForm = form.clone();
            registrationForm.attr('id', registrationFormData.id);

            var loginInputReg = input.clone();
            var passwordInputReg = input.clone();
            var nameInputReg = input.clone();
            var lastNameInputReg = input.clone();
            var middleNameInputReg = input.clone();
            var genderInputReg = input.clone();
            var maritalInputReg = input.clone();
            var buttonReg = button2.clone();
            var changeLayouteReg = changeLayoute.clone();

            nameInputReg.find('label').html('Ad');
            nameInputReg.find('[controls]').html('<input class="form-control"  type="text" name="reg_name" id="reg_name" placeholder="Ad">');
            registrationForm.append(nameInputReg);

            lastNameInputReg.find('label').html('Soyad');
            lastNameInputReg.find('[controls]').html('<input class="form-control"  type="text" name="reg_lastname" id="reg_lastname" placeholder="Soyad">');
            registrationForm.append(lastNameInputReg);

            middleNameInputReg.find('label').html('Ata adı');
            middleNameInputReg.find('[controls]').html('<input class="form-control"  type="text" name="reg_middlename" id="reg_middlename" placeholder="Ata adı">');
            registrationForm.append(middleNameInputReg);

            genderInputReg.find('label').html('Cins');
            genderInputReg.find('[controls]').html('<select id="reg_gender" class="selectpicker"></select>')
            registrationForm.append(genderInputReg);

            maritalInputReg.find('label').html('Ailə vəziyyəti');
            maritalInputReg.find('[controls]').html('<select id="reg_marital" class="selectpicker"></select>')
            registrationForm.append(maritalInputReg);

            loginInputReg.find('label').html('İstifadəçi adı');
            loginInputReg.find('[controls]').html('<input  class="form-control" type="text" name="reg_login" id="reg_login" placeholder="İstifadəçi adı">');
            registrationForm.append(loginInputReg);

            passwordInputReg.find('label').html('Şifrə');
            passwordInputReg.find('[controls]').html('<input class="form-control"  type="password" id="reg_password" name="reg_password" placeholder="Şifrə">');
            registrationForm.append(passwordInputReg);

            buttonReg.html("Təsdiqlə");
            registrationForm.append(buttonReg);

            changeLayouteReg.attr('onclick', "changeLayoute('login')");
            changeLayouteReg.html("Daxil ol");
            registrationForm.append(changeLayouteReg);

            $('#init').prepend(registrationForm);


            var regGender = $("#reg_gender");
            regGender.getComboContent("1", {dicTypeId: 1005}, function () {
                regGender.selectpicker("refresh");
            });

            var regMarital = $("#reg_marital");
            regMarital.getComboContent("1", {dicTypeId: 1016}, function () {
                regMarital.selectpicker("refresh");
            });



            $('#init').prepend(logo);
        }
    };

    if (methods[method]) {
        return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        $.message('Method with name' + method + ' does not exist for jQuery.authService', 'error');
        return false;
    }
};



/*--------------------------*/
/*
function initRegistration() {
    $('input').val('');
    $('#reg_birthDate').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#reg_gender').getComboContent('1', { dicTypeId: 1005 }, function () {
        $('#reg_gender').selectpicker('refresh');

    });
    $('#reg_userType').getComboContent('2', { dicTypeId: 1011 }, function () {
        $('#reg_userType').change();
        $('#reg_userType').selectpicker('refresh');
    });

    //$('#confirm').click(regAccept());

}*/
/*

    function regAccept() {
        if ( $('#init').require()){
            console.log($("input[name='reg_contact']").val());
            var regInfo = {
                'id': 0,
                'user': {
                    'person': {
                        'firstName': $("input[name='reg_name']").val(),
                        'lastName': $("input[name='reg_lastname']").val(),
                        'middleName': $("input[name='reg_middlename']").val(),
                        'birthDate': $("input[name='reg_birthDate']").val(),
                        'gender': { id : $('#reg_gender').find('option:selected').val()}
                    },
                    'userType':{ id : $('#reg_userType').find('option:selected').val() },
                    'userName': $("input[name='reg_login']").val(),
                    'password': $("input[name='reg_password']").val()
                },
                'contact': { 'value': $("input[name='reg_contact']").val()},
                'confirmPassword' : $("input[name='reg_password_confirm']").val()
            };

            if($('#reg_password_confirm').val()== $('#reg_password').val()) {
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: 'ls?action=reg',
                    data: {
                        registration: JSON.stringify(regInfo)
                    },
                    success: function (data) {
                        console.log(data.messageType);
                        $.message(data.message, data.messageType);
                        if (data.messageType == 'success') {
                            initRegistration();
                        }
                    }
                });
            }
            else {
                $.message('Zəhmət olmazsa, şifrə təkrarını düzgün daxil edin.', 'error');  }
        };

    }
*/

/*

function regContact(){
    if($('#reg_userType').val() == '105') {
        $('#reg_mobile').show();
        $('#reg_mobile').attr('req_important', 'true');
        $('#reg_mail').hide();
        $('#reg_mail').removeAttr('req_important');
    }
    else if ($('#reg_userType').val() == '1000664') {
        $('#reg_mail').show();
        $('#reg_mail').attr('req_important', 'true');
        $('#reg_mobile').hide();
        $('#reg_mobile').removeAttr('req_important');
    }
}

*/

