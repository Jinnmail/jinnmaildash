$(document).ready(function () {

    $(".create-mail").click(function () {
        if ($('#user-mail-address').val().length != 0) {
            var data = $("#user-mail-address").val();
            $(".appent_element").append('<li class="position-relative"><a class="" href="#">' + data + '<span class="delete-btn">×</span></a></li>');
            $("#addNewMail .close").click();
        }
    });


    $(document).on('click', '.mailbox-list li a', function () {
        $(".empty-mail-section").hide();
        $(".mail-content-wrapper").show();
        $(this).addClass("active");
    });

    $(".plan-list-item").click(function(){
        $(".plan-list-item").removeClass("is-active");
        $(this).addClass("is-active");
    })
    
    $(document).on('click', '.delete-btn', function () {
        var result = confirm("Are you sure!!");
        if (result == true) {
            $(this).closest("li").remove();
        }
    });

    $(".add-new").click(function () {
        var mails_list = $(".mailbox-list li").length;
        if (mails_list < 1) {
            $(this).attr('data-target', '#addNewMail');
        }
        else {
            $(this).attr('data-target', '#premiumModal');
        }
    })


    $(".close-overlay-email, .dark-overlay").click(function(){
        $(".overlay-email-container").removeClass("active")
        $(".dark-overlay").removeClass("active")
    });

    $(".email-details").click(function(){
        $(".overlay-email-container").addClass("active");
        $(".dark-overlay").addClass("active");
    })

})