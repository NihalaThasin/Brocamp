$(document).ready(function() {
    // Handle radio button change for email/phone field
    $('input[type=radio][name=fill]').change(function() {
        let isEmail = this.id === 'emailRadio';
        $('#inputField').attr('type', isEmail ? 'email' : 'tel')
                        .attr('placeholder', isEmail ? 'Enter your email' : 'Enter your phone')
                        .val(''); // Clear input field on change
        $("form").validate().resetForm(); // Reset validation messages
    });

    // Custom phone number validation rule
    $.validator.addMethod("phoneValidation", value => /^[6-9]\d{9}$/.test(value), "Invalid phone number");

    // Validate the form with custom message placement
    $("form").validate({
        rules: {
            contactInfo: {
                required: true,
                // Apply email validation only if email is selected
                email: {
                    depends: function() {
                        return $('#emailRadio').is(':checked');
                    }
                },
                // Apply phone validation only if phone is selected
                phoneValidation: {
                    depends: function() {
                        return $('#phoneRadio').is(':checked');
                    }
                }
            }
        },
        messages: {
            contactInfo: {
                required: "This field is required",
                email: "Please enter a valid email",
                phoneValidation: "Please enter a valid phone number"
            }
        },
        // Place the error message just below the input field
        errorPlacement: function(error, element) {
            error.insertAfter(element).css("color", "red");
        }
    });
});
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-bar').classList.toggle('active');
});
