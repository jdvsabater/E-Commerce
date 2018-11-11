function isNumber(event){
    var keycode = event.keyCode;
    if(keycode >47 && keycode< 58){
        return true;
    }
    return false;
}
$(document).ready(function (){
    validate();
    $('#form-first-name, #form-last-name, #form-email,#form-username,#form-password,#form-number,#form-address').keyup(validate);
});

function validate(){
    if ($('#form-first-name').val().length   >   0   &&
        $('#form-last-name').val().length  >   0   &&
        $('#form-email').val().length   >   0   &&
        $('#form-username').val().length  >   0   &&
        $('#form-password').val().length   >   0   &&
        $('#form-number').val().length  >   0   &&
        $('#form-address').val().length   >   0   ) {
        $("#register").prop("disabled", false);
    }
    else {
        $("#register").prop("disabled", true);
    }
}
$(document).ready(function (){
    validate1();
    $('#form-usernameL, #form-passwordL').keyup(validate1);
    
});

function validate1(){
    if (
        $('#form-usernameL').val().length  >   0   &&
        $('#form-passwordL').val().length   >   0 ) {
        $("#login").prop("disabled", false);
    }
    else {
        $("#login").prop("disabled", true);
    }
}

jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    /*
        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });
    
    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });
    
    
});
