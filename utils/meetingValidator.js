$(document).ready(function () {

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

     // Validate Number of attendees
     const nbOfAttendees = document.getElementById("nb-of-attendees");
     var nbOfAttendeesError = false;
     nbOfAttendees.addEventListener("blur", () => {
         let regex = /^\d+$/;
         let s = nbOfAttendees.value;
         if (regex.test(s)) {
            nbOfAttendees.classList.remove("is-invalid");
            nbOfAttendeesError = true;
         } else {
            nbOfAttendees.classList.add("is-invalid");
            nbOfAttendeesError = false;
         }
     });

     // Validate Date of meeting
     const dateOfMeeting = document.getElementById("date-of-meeting");
     var dateOfMeetingError = false;
     dateOfMeeting.addEventListener("blur", () => {
         let regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
         let s = dateOfMeeting.value;
         if (regex.test(s)) {
            dateOfMeeting.classList.remove("is-invalid");
            dateOfMeetingError = true;
         } else {
            dateOfMeeting.classList.add("is-invalid");
            dateOfMeetingError = false;
         }
     });

     // Validate Start time
     const startTime = document.getElementById("start-time");
     var startTimeError = false;
     startTime.addEventListener("blur", () => {
        let regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
         let s = startTime.value;
         if (regex.test(s)) {
            startTime.classList.remove("is-invalid");
            startTimeError = true;
         } else {
            startTime.classList.add("is-invalid");
            startTimeError = false;
         }
     });

     // Validate End time
     const endTime = document.getElementById("end-time");
     var endTimeError = false;
     endTime.addEventListener("blur", () => {
         let regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
         let s = endTime.value;
         if (regex.test(s)) {
            endTime.classList.remove("is-invalid");
            endTimeError = true;
         } else {
            endTime.classList.add("is-invalid");
            endTimeError = false;
         }
     });

    // Validate end time > start time
    const startTimeSubValid = $('#startTimeSubValid');
    const endTimeSubValid = $('#endTimeSubValid');
    startTimeSubValid.hide();
    endTimeSubValid.hide();
    var dateSubError = true;
    $("#start-time").keyup(function () {
        validateDateSubtraction();
    });
    $("#end-time").keyup(function () {
        validateDateSubtraction();
    });

    function validateDateSubtraction() {
        const startTimeDate = new Date(dateOfMeeting.value+'T'+startTime.value);
        const endTimeDate = new Date(dateOfMeeting.value+'T'+endTime.value);
        if(startTimeDate>endTimeDate){
            startTimeSubValid.show();
            dateSubError = false;
        }
        else if(endTimeDate<startTimeDate){
            endTimeSubValid.show();
            dateSubError = false;
        }
        dateSubError = true;
    }

     // Validate title
    $("#titleCheck").hide();
    var nameError = true;
    $("#title").keyup(function () {
      validateTitle();
    });
    
    function validateTitle() {
        const title = document.getElementById('title');
        let titleValue = $("#title").val();
        if (titleValue.length == "") {
            $("#titleCheck").show();
            title.classList.add('is-invalid')
            titleError = false;
            return false;
        } else {
            $("#titleCheck").hide();
            title.classList.remove('is-invalid')
            titleError = true;
        }
    }

	// Submit button
	$("#submitBtn").click(function () {
         validateTitle();
         validateDateSubtraction();
        let form = document.getElementById('meeting-form')
		if (
            //idError == true &&
            nbOfAttendeesError == true &&
            dateOfMeetingError == true &&
            titleError == true &&
            dateSubError == true
		) {
            form.submit();
		} else {
        }
	});
});