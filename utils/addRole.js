$(document).ready(function () {

	// Validate name
    $("#nameCheck").hide();
    var nameError = true;
    $("#name").keyup(function () {
        validateName();
    });
    
    function validateName() {
        const name = document.getElementById('name');
        let nameValue = $("#name").val();
        if (nameValue.length == "") {
            $("#nameCheck").show();
            name.classList.add('is-invalid')
            nameError = false;
            return false;
        } else {
            $("#nameCheck").hide();
            name.classList.remove('is-invalid')
            nameError = true;
        }
    }

	// Submit button
	$("#submitBtn").click(function () {
        validateName();
        let form = document.getElementById('role-form')
		if (
            nameError == true
		) {
            form.submit();
		} else {
        }
	});
});