/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var ROS = {
    urls:{
       login:'http://192.168.1.78:8082/ROS/login', 
//       login:'http://wcu.unibook.az/ROS/login' 
    },
    lang: 'az',
    loadLanguagePack: function (lang) {
        $.getJSON('assets/js/i18n/' + lang + '.json', function (data) {
            $.each(data, function (i, v) {
                ROS.dictionary[lang][i] = v;
            });
        });
    },
    i18n: function () {
        // Hsis.initLanguageCookie('lang');
        var attr = '';

        $('[data-i18n]').each(function () {
            attr = $(this).attr('data-i18n');
            $(this).text(ROS.dictionary[ROS.lang][attr]);
            $(this).attr('placeholder', Hsis.dictionary[Hsis.lang][attr]);
        });
    },
    dictionary: {
        az: {},
        en: {},
        ru: {}
    },
    Validation: {
        validateRequiredFields: function (requiredAttr) {
            var required = $('[' + requiredAttr + ']');
            
            var requiredIsEmpty = false;

            required.each(function (i, v) {
                if (v.value.length === 0 || (v.value == 0 && $(this).is('select'))) {
                    $(v).addClass('blank-required-field');

                    if (!requiredIsEmpty) {

                        $.notify(ROS.dictionary[ROS.lang]['required_fields'], {
                            type: 'warning'
                        });
                        requiredIsEmpty = true;
                    }

                    $(v).on('focusout', function (e) {
                        if (v.value.length && $(v).hasClass('blank-required-field')) {
                            $(v).removeClass('blank-required-field');
                            $(v).off('focusout');
                        }
                    });
                }
            });

            return !requiredIsEmpty;
        },
    }
} 