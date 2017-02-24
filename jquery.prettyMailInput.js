(function ($, w, d) {

    var defaults = {
        theme: "blue"
    }

    var methods= {
        
        init: function(options)
        {
            return this.each(function () {
            var elem = $(this);
            var settings = $.extend(defaults,options);
            if (elem.is("div")) {

                elem.attr("contentEditable", "true");
                if (settings.theme == "blue")
                    elem.addClass("box bluebox");
                else if(settings.theme=="purple")
                    elem.addClass("box purplebox");
                
                //This is to prevent line break in input.
                elem.on("keypress", function (e) {
                    if(e.which == 13 || e.which == 32) //enter and space key prevent
                        return false;
                })
                elem.on("keyup", function (e) {
                    if (e.which == 13) {
                        e.preventDefault();
                        var input = elem.clone().children().remove().end().text();
                        CallEmailHandler(elem, input.trim());
                    }
                });
                } else {
                    $.error("prettyMailInput() is only applicable to a 'div' element");
                }
            });
        },
        getValue: function()
        {
            return $(this).text().split(";");
        }
    };

    $.fn.prettyMailInput = function (methodOrOptions) {
        
        if(methods[methodOrOptions])
            return methods[methodOrOptions].apply(this)
        else if(typeof methodOrOptions === "object" || !methodOrOptions)
            return methods.init.apply(this,arguments);
        
        
    }

    var CallEmailHandler = function (elem, inputVal) {
        if (inputVal === "" || inputVal === {}) {
            elem.addClass("error");
            return false;
        }
        if (!Validate(inputVal)) {
            elem.addClass("error");
            return false;
        }

        elem.removeClass("error");
        var $span = $("<a />");
        $span.addClass("mailInput").attr("contentEditable", false).text(inputVal);
        
        /* Remove the text inside input except span elements */
        elem.contents().filter(function () {
            return this.nodeType == 3
        }).each(function () {
            this.textContent = "";
        });

        elem.append($span).append("&nbsp;");
        placeCaretAtEnd(elem);

    }
    var Validate = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    var placeCaretAtEnd = function (el) {
        
        if (typeof window.getSelection != "undefined" &&
            typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.setStartAfter(el.children().get(-1));
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
        setTimeout(function(){el.get(0).focus();}); 
    }

}(jQuery, window, document));
