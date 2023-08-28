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


    // Validate ID
    // const id = document.getElementById("id");
    // var idError = false;
	// id.addEventListener("blur", () => {
	// 	let regex = /^\d+$/;
	// 	let s = id.value;
	// 	if (regex.test(s)) {
	// 		id.classList.remove("is-invalid");
	// 		idError = true;
	// 	} else {
	// 		id.classList.add("is-invalid");
	// 		idError = false;
	// 	}
	// });

    // Validate description
    $("#descriptionCheck").hide();
    var descriptionError = true;
    $("#description").keyup(function () {
        validateDescription()
    });
    
    function validateDescription() {
        const description = document.getElementById('description');
        let descriptionValue = $("#description").val();
        if (descriptionValue.length == "") {
            $("#descriptionCheck").show();
            description.classList.add("is-invalid");
            descriptionError = false;
            return false;
        } else {
            $("#descriptionCheck").hide();
            description.classList.remove("is-invalid");
            descriptionError = true;
        }
    }

	const email = document.getElementById("email");
    var emailError = false;
	email.addEventListener("blur", () => {
		let regex =
		/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
		let s = email.value;
		if (regex.test(s)) {
			email.classList.remove("is-invalid");
			emailError = true;
		} else {
			email.classList.add("is-invalid");
			emailError = false;
		}
	});

	// Submit button
	$("#submitBtn").click(function () {
        validateName();
        validateDescription()
        let form = document.getElementById('company-form')
		if (
            nameError == true &&
			emailError == true &&
            descriptionError == true
            // idError == true
		) {
            form.submit();
		} else {
        }
	});
});