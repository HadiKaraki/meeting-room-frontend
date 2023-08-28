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


    // // Validate ID
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

     // Validate Capacity
     const capacity = document.getElementById("capacity");
     var capacityError = false;
     capacity.addEventListener("blur", () => {
         let regex = /^\d+$/;
         let s = capacity.value;
         if (regex.test(s)) {
             capacity.classList.remove("is-invalid");
             capacityError = true;
         } else {
             capacity.classList.add("is-invalid");
             capacityError = false;
         }
     });

     // Validate location
    $("#locationCheck").hide();
    var descriptionError = true;
    $("#location").keyup(function () {
        validateLocation();
    });
    
    function validateLocation() {
        const location = document.getElementById('location');
        let locationValue = $("#location").val();
        if (locationValue.length == "") {
            $("#locationCheck").show();
            location.classList.add("is-invalid");
            locationError = false;
            return false;
        } else {
            $("#locationCheck").hide();
            location.classList.remove("is-invalid");
            locationError = true;
        }
    }

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

	// Submit button
	$("#submitBtn").click(function () {
        validateName();
        validateDescription();
        validateLocation();
        let form = document.getElementById('room-form')
		if (
            nameError == true &&
            descriptionError == true &&
            // idError == true &&
            capacityError == true &&
            locationError == true
		) {
            form.submit();
		} else {
        }
	});
});