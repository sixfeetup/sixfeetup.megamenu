/* The following line defines global variables defined elsewhere. */
/*globals $, jQuery*/

(function($) { $(function() {
    $('#portal-globalnav .noClick').click(function (e) {
        e.preventDefault();
    });

    $('ul.nav li.dropdown').hover(function() {
        $(this).closest('.dropdown-menu').stop(true, true).show();
        $(this).addClass('open');
    }, function() {
        $(this).closest('.dropdown-menu').stop(true, true).hide();
        $(this).removeClass('open');
    });
    
    var navActive = false;
    showNavTimeout = window.setTimeout(function(){}, 0);
    
    function showNav(nav) {
        showNavTimeout = window.setTimeout(function(){
            $("#visual-portal-wrapper").addClass("navactive");
            $(".hoverParent > a").removeClass("hoverParentLink");
            $("#portal-globalnav li").removeClass("hoverParent");
            $(nav).addClass("hoverParent");
            $(".hoverParent > a").addClass("hoverParentLink");
            $("#LSResult").hide();
        }, 300);
    }
    function hideNav() {
        if (navActive == false) {
            hideNavTimeout = window.setTimeout(function(){
                $(".hoverParent > a").removeClass("hoverParentLink");
                $("#portal-globalnav li").removeClass("hoverParent");
                $("#visual-portal-wrapper").removeClass("navactive");
            }, 500);
        }
    }
    
    if ($(window).width() > 1170) {
        // main navigation classes for styling
        $("#portal-globalnav ul.submenu li").hover(
           function () { $(this).addClass("hoverItem"); }, 
           function () { $(this).removeClass("hoverItem"); }
        );
        $("#portal-globalnav").hover(
            function () {
                navActive = true;
            }, 
            function () {
                navActive = false;
                hideNav();
            }
        );
        $("#portal-globalnav > li").hover(
            function () {
                if ($(this).find("ul").length > 0) {
                    navActive = true;
                    try {
                        clearTimeout(hideNavTimeout);
                    } catch(err) {
                        // continue
                    }
                    showNav(this);
                } else {
                    navActive = false;
                    hideNav();
                }
            }, 
            function () {
                clearTimeout(showNavTimeout);
            }
        );
        $("#portal-globalnav > li > a").hover(
            function () {
                $(this).parent("li").find("ul.submenu > li:eq(1):has(div)").addClass("hoverItem");
            }, 
            function () {
                // nothing
            }
        );
    }
    // display the second level nav in a grid if there is no tertiary nav
    var toplinksnum = $("#portal-globalnav > li").length;
    var split_at = 3;
    for(i = 0; i < toplinksnum; i++) {
        numlevels = $("#portal-globalnav > li").eq(i).find(".navTreeLevel1").length;
        numchildren = $("#portal-globalnav > li").eq(i).find(".submenu > li").length;
        if (numlevels == 0 && numchildren > 0) {
            $("#portal-globalnav > li").eq(i).addClass("displayGrid");
            var this_menu = $("#portal-globalnav > li").eq(i).find(".submenu")
            var links = $(this_menu).find("li").detach();
            var last_item = links[links.length - 1];
            var new_lists = links[0].outerHTML + "<li>";
            for(j = 1; j < links.length-1; j++) {
                new_lists = new_lists + links[j].innerHTML;
                if ((j % split_at == 0) && (j < links.length - 2)) {
                    new_lists = new_lists + "</li><li>";
                }
            }
            new_lists = new_lists + "</li>";
            new_lists = new_lists + last_item.outerHTML;
            $(this_menu).html(new_lists);
        }
    }

    // mobile nav
    $("#nav-toggle").click(function(){
        $(this).toggleClass("active");
        $("#visual-portal-wrapper").toggleClass("navactive");
        $("#portal-globalnav").toggleClass("displayMenu");
        $("#portal-globalnav li.displayMenu").removeClass("displayMenu")
        $(".subnavBase.topLevel").toggle();
    });
    $(".prevMenu .back").click(function() {
        $(this).closest(".displayMenu").removeClass("displayMenu");
        return false;
    });
    if ($(window).width() <= 1180) {
        $("a.hasDropDown").live("click", function() {
            $(this).parent("li").toggleClass("displayMenu");
            return false;
        });
    }
    // find tallest submenu, make sure the whole thing is scrollable
    // this requires the globalnav to be display: block to get the heights
    var tallestSubnav = 0;
    $(".mobileWrapper").each(function(){
        if ($(this).height() > tallestSubnav) {
            tallestSubnav = $(this).height();
        }
    });
    $("#subnav-wrapper").css("margin-bottom", tallestSubnav);
    $("#portal-globalnav").addClass("mobileReady");
}); })(jQuery);

