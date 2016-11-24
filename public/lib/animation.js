let animation = {
    eventDoneString: "webkitAnimationEnd oanimationend animationend",
    css: {
        win: [
            "tada"
        ],
        fail: [
            "wobble", "shake", "flash"
        ],
        leave: [
            "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp",
            "fadeOutDown", "fadeOutLeft", "fadeOutRight", "fadeOutUp",
            "flipOutX", "flipOutY",
            "lightSpeedOut",
            "slideOutDown", "slideOutLeft", "slideOutRight",
            "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"
        ]
    }
};

animation.removeAnimationString = animation.css.win
    .concat(animation.css.fail)
    .concat(animation.css.leave)
    .concat("animated").join(" ");
