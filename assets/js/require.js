/*
    * require version 1.1
    * Powered by Neuron Technologies 05/15/2015
    * all rights reserved
    *
*/
(function( $ ){

    var REQUIRED_CONSTANTS = {
        REQUIRED_ATTRIBUTE : "req_important",
        REQUIRED_TYPE_ATTRIBUTE : "req_type",
        REQUIRED_MAX_LENGTH_ATTRIBUTE : "req_max",
        REQUIRED_FIELD_ERROR : "required_field_error"

    };


    var req_type_validation = {
        number : function(){
            return true;
        },
        email : function(string){
            var  REGEX =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            return REGEX.test(string);
        }
    };
    
    var methods = {
        init : function( options ) {
            var settings = $.extend( {
                message: function(){

                    $.message('Vacib sahələrin hamısı doldurulmayıb',"error");
                }
            }, options );
            var t = $(this);
            var isTrue = true;
            t.find('input['+ REQUIRED_CONSTANTS.REQUIRED_ATTRIBUTE +'="true"],textarea['+REQUIRED_CONSTANTS.REQUIRED_ATTRIBUTE+'="true"]').each(function( i , x){
                var val = $(x).val().toString().trim();
                var ee = (val.length > 0);

                if ( !ee ){
                    $(x).attr( REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR );
                }


                isTrue = isTrue && ee ;
            });


            t.find('select[' + REQUIRED_CONSTANTS.REQUIRED_ATTRIBUTE + '="true"]').each(function( i , x){
                console.log('------------------------------0');
                if ($(x).find('option:selected').length > 0){
                    var sel = $(x).find('option:selected').val().toString().trim();
                    var ee = (sel != '-1' && sel != '0');
                    if ( !ee ){
                        $(x).attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                        if ( $(x).hasClass('selectpicker')){
                            //console.log($(x).next('.bootstrap-select'));
                            $(x).next('.bootstrap-select').find('.dropdown-toggle').attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR)
                        }
                    }
                    isTrue = isTrue && ee;
                } else {
                    $(x).attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                    if ( $(x).hasClass('selectpicker')){
                        $(x).next('.bootstrap-select').attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR)
                    }
                    isTrue = false;
                }
            });

            if ( !isTrue ){
                t.find('input['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+'],textarea['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').keyup(function(){
                    if ( $(this).val().toString().trim().length > 0 ){
                        $(this).removeAttr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                    }else{
                        $(this).attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR,REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                    }
                });

                t.find('select['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').change(function(){
                    var d = $(this).find('option:selected').val().toString().trim();
                    if ( d != '-1' && d != '0' ){
                        $(this).removeAttr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                        if ( $(this).hasClass('selectpicker')){
                            $(this).next('.bootstrap-select').find('.dropdown-toggle').removeAttr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                        }
                    }else{
                        $(this).attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR,REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                        if ( $(x).hasClass('selectpicker')){
                            $(x).next('.bootstrap-select').find('.dropdown-toggle').attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR , REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR)
                        }
                    }
                });
                settings.message();
            }else {

                t.find('['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').removeAttr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);


                t.find('input['+ REQUIRED_CONSTANTS.REQUIRED_TYPE_ATTRIBUTE + ']').each(function( i , x ){
                    var val = $(x).val().toString().trim();
                    var ee = (val.length > 0);

                    if ( ee ){

                        var r = $(x).attr(REQUIRED_CONSTANTS.REQUIRED_TYPE_ATTRIBUTE);
                        ee = ee && req_type_validation[r](val)
                        if ( !ee ){
                            $(x).attr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR, REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
                        }
                    } else {

                    }



                    isTrue = isTrue && ee ;
                });

                if ( !isTrue ){
                    $.message('Məlumatı düzgün daxil edin',"error");
                }


            }
            return isTrue;

        },
        unset : function() {
            var t = $(this);
            t.find('['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').unbind( "keyup" );
            t.find('['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').unbind( "change" );
            t.find('['+REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR+']').removeAttr(REQUIRED_CONSTANTS.REQUIRED_FIELD_ERROR);
        }
    };

    $.fn.require = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.message( 'Method with name' +  method + ' does not exist for jQuery.require' , 'error' );
            return false;
        }
    };


    /*$(document).on('keypress', 'input['+ REQUIRED_CONSTANTS.REQUIRED_TYPE_ATTRIBUTE +'="number"]', function( evt ){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var inp = $(this);
        console.log(inp);
        var str = inp.val().toString().trim().length > 0 ? inp.val().toString().trim() : '0';
        //var len = str.length;
        var max = inp.attr(REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE) == undefined ? str : inp.attr(REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE);
        return !(charCode > 31
            && (charCode < 48 || charCode > 57)
            && ( parseInt( str) > parseInt( max ) )
            && (charCode != 44)
            && (charCode != 46)
            && (charCode != 40)
            && (charCode != 41)
            && (charCode != 43)
            && (charCode != 45)
            && (charCode != 61)
            && (charCode != 95));
    })*/

    String.prototype.splice = function( idx, rem, s ) {
        return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
    };

    $(document).on('keypress', 'input['+ REQUIRED_CONSTANTS.REQUIRED_TYPE_ATTRIBUTE +'="number"]', function( evt ){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var inp = $(evt.target);
        var str = inp.val().toString().trim().length > 0 ? inp.val().toString().trim() : '0';

        var max = inp.attr(REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE) == undefined ? str + evt.key : inp.attr(REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE);
        var array = [ 48,49,50,51,52,53,54,55,56,57,8,9,13,16,17];

        return array.indexOf(charCode)!= -1 && ( parseInt( str + evt.key ) <= parseInt( max ) )
    });

    $(document).on('keypress', 'input['+ REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE + '],textarea['+ REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE + ']', function( evt ){
        var inp = $(this);

        var charCode = (evt.which) ? evt.which : evt.keyCode;
        var str = inp.val().toString().trim();
        var len = str.length;
        if ( inp.attr( REQUIRED_CONSTANTS.REQUIRED_TYPE_ATTRIBUTE ) == 'number' ){
            return true;
        }else {
            return ( [37,39,8].indexOf( charCode ) != -1 ) ? true : len <= parseInt( inp.attr(REQUIRED_CONSTANTS.REQUIRED_MAX_LENGTH_ATTRIBUTE) ) - 1
        }
    })

})(jQuery);