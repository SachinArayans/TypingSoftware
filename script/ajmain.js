//-----

//-------------------addd active class of side menu-------------
$(".sidemenu-a").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
          lastproblem2[0].style.background = "#ffbf00";
            lastproblem2[1].style.fill = "#1F1A17";
});
//-----------------------------add active of top menu----------
$(".bottom-link").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});
  
//--------------------height of left side menu-----------------------
var hiet = 100 / window.innerHeight * (window.innerHeight - 40);
        document.getElementById("smenu").style.height = hiet+ "%";