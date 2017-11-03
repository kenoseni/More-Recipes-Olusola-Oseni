$("#alert-target").click( () => {
    toastr["info"]("I was launched via jQuery!")
});

$( () => {
    $(".sticky").sticky({
        topSpacing: 90
        , zIndex: 2
        , stopper: "#YourStopperId"
    });
});




// SideNav Initialization
// Show sideNav
$('.button-collapse').sideNav('show');
// Hide sideNav
$('.button-collapse').sideNav('hide');
// gives the appearance that a button has been toggled
$().button('toggle')