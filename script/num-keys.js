

    //---------------------------------------frontendtiming-------------------------------------------------------
var ft = "";
 function ftime() {
         fs = 0;
         fm = 0;
        fms = 0;

        ft = setInterval(function () {
            fs++;
            fms++;
            document.getElementById("sec").innerHTML = check(fs);
            if (fs >= 60) {
                fm++;
                fms++;
                document.getElementById("min").innerHTML = check(fm);

                fs = 0;

            }


        }, 1000);
    }

    function check(d) {
            if (d < 10) { d = "0" + d; }
            else if (d == 60) { d = "00"; }
            return d;
        }
    function clr(){
        clearInterval(ft);
        document.getElementById("min").innerHTML = "00";
        document.getElementById("sec").innerHTML = "00";
    }
    //-------------------------------------load doc ajax
    var testname="";
function loadDoc(url,type) {
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              if(type==0||type==1){
                keys(xhttp.responseText, type);
                  clr();
                ftime();
                removeh(lastproblem);
                document.getElementById("d").style.background = "#fff";
                }
                if(type==2||type==3){
                    sentence(xhttp.responseText, type);
                      clr();
                ftime();
                }
                 
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        testname = url;
        restarturl = url;
        restarttype = type;
    }
    //--------------------------------restart function---------------------------
    var rst=document.getElementById("restartbutton");
    rst.addEventListener("click", function() {
    loadDoc(restarturl,restarttype)
});


    //---------------------------------------------------main function----------------------------------------------------


    function keys(str,type) {
        document.getElementById("type01").style.display = "block";
        var i = 0;
        var rightwords = 0;
        var wrongwords = 0;
        var totalwords = 0;
        var gross = 0;
        var net = 0; 
        document.getElementById("d").innerHTML= str.charAt(); ;
        document.getElementById("dem").innerHTML=str.slice(i+1);
        document.getElementById("type23").style.display = "none";
        //only for basic practice
        if(type == 0){
            var  key = document.getElementsByClassName(str.charCodeAt());
            key[0].style.background = "#0432F7";
            key[1].style.fill = "#0432F7";
            lastproblem2 = key;
             document.getElementById("help").innerHTML="You need to press indicated character, indicated as blue color & underlined,  here "+str.charAt()+"  is indicated to press. For more information <a href='manual.html'>Click here(Manual)</a>.";        
                    }
                    if (type == 1) { document.getElementById("help").innerHTML = "Good luck! Let's Start"; }
         //------------------------for ns gs monitor---------------
         document.getElementById("ns").innerHTML = monitorcheck(0);
         document.getElementById("gs").innerHTML = monitorcheck(0);
        //------------------------------
         window.onkeypress = function (event) {
             var y = str.charCodeAt(i);
             var x = event.charCode || event.keyCode;
             if (x == 32) { event.preventDefault(); }
             removeh(y);
             removec(x);
             rst.blur();
             if (x == y) {
                 i++;
                 document.getElementById("help").innerHTML = "<span style='color:green;'><i class='fa fa-check'style='font-size:30px;'></i>Good</span>";
                 rightwords++;
                 if (type == 1) { right(x); }
                 if (str.charCodeAt(i) == 32) { document.getElementById("d").innerHTML = "&nbsp;"; }
                 else { document.getElementById("d").innerHTML = str.charAt(i); ; }
             } else {
                 indicate2(str, i);
                 wrongwords++;
                 wrong(x);
                 if (type == 1) { indicate(y); }
                 if (str.charCodeAt(i) == 32) { document.getElementById("d").innerHTML = "&nbsp;"; }
                 else { document.getElementById("d").innerHTML = str.charAt(i); ; }
             }
             if (str.length == i) { alert("YEEE! Finished.\n Click Result Button to See Your Performance. "); }
             // this 2nd indicator is only for basic ----------
             if (type == 0) { indicate2(str, i); }
             totalwords = rightwords + wrongwords;
             gross = (totalwords * 12) / fms;
             gross = gross.toFixed();
             document.getElementById("gs").innerHTML = monitorcheck(gross);
             net = (rightwords * 12) / fms;
             net = net.toFixed();
             document.getElementById("ns").innerHTML = monitorcheck(net);
             netpos = netposition(net);
             var accuracy;
             accuracy = net / gross * 100;
             accuracy = accuracy.toFixed();
             accuracypos = accuracyposition(accuracy);
             testnameo = testinfo(testname);
             var issuedate = Date();
             //------------------------------------result button--------------------------------
             var timemin, timesec;
             timemin = check(fm);
             timesec = check(fs);
             var rslt = document.getElementById("resultbutton");
             rslt.onclick = function resultbutton() {
                 var myWindow = window.open('', '', '');
                 myWindow.document.write("  <!DOCTYPE html><html lang='en'><head><meta charset='utf-8' /><title> Your Result </title><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/><link rel='stylesheet' href='css/font-awesome.css'><link rel='icon'href='img\favicon.ico' type='image/x-icon'><script src='script/analytics.js'></script><style>body{font-family: Arial; margin: 0px;background-color: #f1eff1;}a:link{color: none;                 text-decoration: none;             }         .main{                 background-color: #fff;                 margin: auto;                 margin-top: 20px;                 width: 50%;                 height: fit-content;                 padding: 20px;                 box-shadow: 0px 0px 0px;                 border-radius: 5px;             }             h2{                 text-align: center;             }              .table1{             font-size: 25px;             width:100%;             border-left: 5px solid #071543;             }             td{             padding: 5px;             margin:5px;             }             p{                 text-align: center;             }                                                 ul#level-one {     width: fill-available;     height: 36px;     position: relative;     list-style: none;     line-height: 36px;     }            ul#level-one li{ 	 width:80px; 	 float: left; 	 font-weight: bold; 	font-family: Arial; 	 padding-left: 0px;       }  button{cursor:pointer;}  #wrapper {     clear: both;     margin: 0px auto;     border: 0px solid #000;     font-size: 12px;     font-family: verdana;     margin-top: 120px; }             @media print {     .printbtn {display:none;}     #wrapper{display: none;}     .main{margin: 10px;}             body{     background: #fff url('img/resultbg.png'); }                    .main{width:100%;} }         </style>     </head>     <body>         <div id='wrapper'>  <ul id='level-one'>  <li style='float: right;'onclick='window.close();'title='Close'><button><span class='bottom-link fa fa-close 'style='font-size:30px;line-height:40px;'></span></button></li>  <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-thumbs-o-up 'style='font-size:30px;line-height:40px;display:none;'></span></button> 	</li> <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-facebook 'style='font-size:30px;line-height:40px;display:none;'></span></button> 	</li> <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-twitter 'style='font-size:30px;line-height:40px;display:none;'></span></button> </li> <li title='Print Result'><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-print 'style='font-size:30px;line-height:40px;'></span></button></li> </ul> </div>         <div id='main' class='main'>             <img src='img/result-header.png'style='height: 80px;width: 100%'alt='header'>             <h2>YOUR PERFORMANCE</h2>             <table class='table1'>             <tr>             <td>Test Name</td><td>:</td><td>" + testnameo + "</td>             </tr><tr>             <td>Gross Speed</td><td>" + gross + "</td><td>WPM</td><td></td>             </tr><tr>             <td>Net Speed</td><td>" + net + "</td><td>WPM</td><td>" + netpos + "</td>             </tr><tr>             <td>Accuracy</td><td>" + accuracy + "%</td><td></td><td>" + accuracypos + "</td>             </tr><tr>             <td>Duration</td><td>" + timemin + ":" + timesec + "</td><td>Minute</td><td></td>             </tr><tr>             <td>Error hits</td><td>" + wrongwords + "</td><td>Keys</td><td></td>             </tr>             </table>                 <p>Issued  By <b><a href='http://thetypers.com/'><span style='color:#0C5DA3;'>The<span style='color:#03AAAC;'>Typers</span>.com</span></a></b>         On " + issuedate + "</p>                  </div>     </body> </html> ");
             }
             rslt.blur();


             document.getElementById("dem").innerHTML = str.slice(i + 1);
         }
        
    }     
    //----------------------mainfunction for paragraph------------------
     function sentence(str,type) {
         document.getElementById("type23").style.display = "block";
        var right = 0;
        var wrong = 0;
        var i = 0;
        var grosswords = 0;
        var networds = 0;
        var outputwords = "";
        var isfunctionrunning = false;
        str = str.split("|");
        document.getElementById("highlighted").innerHTML = str[i].charAt(); ;
        document.getElementById("unhighlighted").innerHTML = str[i].slice(right + 1);
        document.getElementById("typedhighlighted").innerHTML = "";
        document.getElementById("outputwords").innerHTML = "";
        document.getElementById("help").innerHTML="Let's Start!"; 
            document.getElementById("type01").style.display = "none";
        if (type == 3) { document.getElementById("outputwords").style.display = "block";
        document.getElementById("help").innerHTML="";
        document.getElementById("helpfulimg").style.display = "none";
         }
        if (type == 2) { document.getElementById("outputwords").style.display = "none";
        document.getElementById("helpfulimg").style.display = "block"; }

        //------------------------for ns gs monitor---------------
         document.getElementById("ns").innerHTML = monitorcheck(0);
         document.getElementById("gs").innerHTML = monitorcheck(0);


         window.onkeypress = function myf(event) {
             if (str.length == i) { alert("YEEE! Finished.\n Click Result Button to See Your Performance. "); }
             var y = str[i].charCodeAt(right);
             var x = event.charCode || event.keyCode;
             if (x == 32) { event.preventDefault(); }
             rst.blur();
             if (x == y) {
                 grosswords++;
                 networds++;
                 right++;
                 outputwords = outputwords + String.fromCharCode(x);
                 if (type == 2) { document.getElementById("help").innerHTML = "<span style='color: green;'><i class='fa fa-check'style='font-size:30px;'></i>Good</span>"; }
                 if (str[i].charCodeAt(right) == 32) { document.getElementById("highlighted").innerHTML = "&nbsp;"; }
                 else {
                     document.getElementById("highlighted").innerHTML = str[i].charAt(right); ;
                 }
             }
             else {

                 grosswords++;
                 if (type == 3) {
                     right++;
                     if (isfunctionrunning != true) {
                         if (x == 32) {
                             outputwords = outputwords + "<span style='color:red'>_</span>";
                         } else {
                             outputwords = outputwords + "<span style='color:red'>" + String.fromCharCode(x) + "</span>";
                         }
                     }
                 }
                 if (isfunctionrunning != true) {

                     wrong++;
                     if (type == 2) {
                         if (y == 32) {
                             document.getElementById("help").innerHTML = "<span style='color:red;'>Press <span style='font-size:15px;'> spacebar</span></span>";
                         }
                         else {
                             document.getElementById("help").innerHTML = "<span style='color:red;'>Press &nbsp;  " + String.fromCharCode(y) + "</span>";
                         }
                     }
                 }
                 isfunctionrunning = false;
                 if (str[i].charCodeAt(right) == 32) { document.getElementById("highlighted").innerHTML = "&nbsp;"; }
                 else {
                     document.getElementById("highlighted").innerHTML = str[i].charAt(right); ;
                 }
             }

             document.getElementById("typedhighlighted").innerHTML = str[i].substr(0, right);
             document.getElementById("unhighlighted").innerHTML = str[i].slice(right + 1);

             gross = (grosswords * 12) / fms;
             gross = gross.toFixed();
             document.getElementById("gs").innerHTML = monitorcheck(gross);
             net = (networds * 12) / fms;
             net = net.toFixed();
             document.getElementById("ns").innerHTML = monitorcheck(net);
             netpos = netposition(net);
             var accuracy;
             accuracy = net / gross * 100;
             accuracy = accuracy.toFixed();
             accuracypos = accuracyposition(accuracy);
             testnameo = testinfo(testname);
             var issuedate = Date();
             //------------------------------------result button--------------------------------
             var timemin, timesec;
             timemin = check(fm);
             timesec = check(fs);
             var rslt = document.getElementById("resultbutton");
             rslt.onclick = function resultbutton() {
                 var myWindow = window.open('', '', '');
                 myWindow.document.write("  <!DOCTYPE html><html lang='en'><head><meta charset='utf-8' /><title> Your Result </title><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/><link rel='stylesheet' href='css/font-awesome.css'><link rel='icon'href='img\favicon.ico' type='image/x-icon'><script src='script/analytics.js'></script><style>body{font-family: Arial; margin: 0px;background-color: #f1eff1;}a:link{color: none;                 text-decoration: none;             }         .main{                 background-color: #fff;                 margin: auto;                 margin-top: 20px;                 width: 50%;                 height: fit-content;                 padding: 20px;                 box-shadow: 0px 0px 0px;                 border-radius: 5px;             }       button{cursor:pointer;}      h2{                 text-align: center;             }              .table1{             font-size: 25px;             width:100%;             border-left: 5px solid #071543;             }             td{             padding: 5px;             margin:5px;             }             p{                 text-align: center;             }                                                 ul#level-one {     width: fill-available;     height: 36px;     position: relative;     list-style: none;     line-height: 36px;     }            ul#level-one li{ 	 width:80px; 	 float: left; 	 font-weight: bold; 	font-family: Arial; 	 padding-left: 0px;  }    #wrapper {     clear: both;     margin: 0px auto;     border: 0px solid #000;     font-size: 12px;     font-family: verdana;     margin-top: 120px; }             @media print {     .printbtn {display:none;}     #wrapper{display: none;}     .main{margin: 10px;}             body{     background: #fff url('img/resultbg.png'); }                    .main{width:100%;} }         </style>     </head>     <body>         <div id='wrapper'>  <ul id='level-one'>  <li style='float: right;'onclick='window.close();'title='Close'><button><span class='bottom-link fa fa-close 'style='font-size:30px;line-height:40px;'></span></button></li>  <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-thumbs-o-up 'style='font-size:30px;line-height:40px;display:none;'></span></button> 	</li> <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-facebook 'style='font-size:30px;line-height:40px;display:none;'></span></button> 	</li> <li><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-twitter 'style='font-size:30px;line-height:40px;display:none;'></span></button> </li> <li title='Print Result'><button class='printbtn' onclick='window.print()'><span class='bottom-link fa fa-print 'style='font-size:30px;line-height:40px;'></span></button></li> </ul> </div>         <div id='main' class='main'>             <img src='img/result-header.png'style='height: 80px;width: 100%'alt='header'>             <h2>YOUR PERFORMANCE</h2>             <table class='table1'>             <tr>             <td>Test Name</td><td>:</td><td>" + testnameo + "</td>             </tr><tr>             <td>Gross Speed</td><td>" + gross + "</td><td>WPM</td><td></td>             </tr><tr>             <td>Net Speed</td><td>" + net + "</td><td>WPM</td><td>" + netpos + "</td>             </tr><tr>             <td>Accuracy</td><td>" + accuracy + "%</td><td></td><td>" + accuracypos + "</td>             </tr><tr>             <td>Duration</td><td>" + timemin + ":" + timesec + "</td><td>Minute</td><td></td>             </tr><tr>             <td>Error hits</td><td>" + wrong + "</td><td>Keys</td><td></td>             </tr>             </table>                 <p>Issued  By <b><a href='http://thetypers.com/'><span style='color:#0C5DA3;'>The<span style='color:#03AAAC;'>Typers</span>.com</span></a></b>  On " + issuedate + "</p>                  </div>     </body> </html>   ");
             }
             rslt.blur();

             if (type == 3) {
                 document.getElementById("outputwords").innerHTML = outputwords;
             }

             if (right == str[i].length) {
                 i++;
                 right = 0;
                 grosswords--;
                 if (type == 3) { right--; }
                 isfunctionrunning = true;
                 myf(event);

             }
             scrol("outputwords");
         }

        

    }
    //-----------------------------test name=----------------------
    function testinfo(name){
       
        var  dot, slash;
        dot = name.lastIndexOf(".");
        slash = name.lastIndexOf("/");
        name = name.slice(slash+1, dot);
        name = name.replace(/-/g, " ");
        return name;
    }
    //---------------------------------------accuracy position---------------
    function accuracyposition(a){
        var accuracypos;
        if (a > 96) {
                 accuracypos = "Excellent";
             }
             else if (a > 93) {
                 accuracypos = "Very Good";
             }
             else if (a > 87) {
                 accuracypos = "Good";
             }
             else if (a > 80) {
                  accuracypos = "OK";
             }
             else if (a<80){
             accuracypos = "<span style='color:red;'><b>!</b></span>";
             }
     return accuracypos;        
    }
    //-----------------------------net speed position---------------------------
    function netposition(a){
        var accuracypos;
        if (a > 39) {
                 accuracypos = "Excellent";
             }
             else if (a > 29) {
                 accuracypos = "Very Good";
             }
             else if (a > 19) {
                 accuracypos = "Good";
             }
             else if (a > 9) {
                  accuracypos = "OK";
             }
             else if (a<9){
             accuracypos = "<span style='color:red;'><b>!</b></span>";
             }
     return accuracypos;        
    }
    //--------------------------------------------------------monitor check function ----------------
   function monitorcheck(d) {
            if (d < 10) { d = "0" + d; }
            else if ( d == NaN || d == Infinity ) { d = "00"; }
            return d;
        }


    //--------------------------------------------------------wrong function-------------------------------------------------------


    function wrong(a) {
        var wrongClass = document.getElementsByClassName(a);
        wrongClass[0].style.background = "#D92226";
        //wrongClass[1].style.background="#D92226";
        document.getElementById("d").style.background = "#D92222";
        window.setTimeout(function s() { wrongClass[0].style.background = "#ffbf00"; wrongClass[1].style.background = "#ffbf00";  }, 500);

    }
    //  removec function for remove wrong color
    function removec(a){
        var wrongClass = document.getElementsByClassName(a);
        wrongClass[0].style.background = "#ffbf00";
        wrongClass[1].style.background = "#ffbf00"; 
        document.getElementById("d").style.background = "none";
        
    }
    //-----------------scrolling automatically downward in typed box---------------------------------------------
    function scrol(id) {
        var h = document.getElementById(id);
        h.scrollTop = h.scrollHeight - h.clientHeight;
    }

    //----------------------------------------------------------right function------------------------------------------------------------


    function right(a) {
        var rightClass = document.getElementsByClassName(a);
        rightClass[0].style.background = "#1EE204";
        //rightClass[1].style.background="#1EE204";
        
        window.setTimeout(function () { rightClass[0].style.background = "#ffbf00"; rightClass[1].style.background = "#ffbf00";  }, 300);

    }


    //--------------------------------------------------------indicate function-----------------------------------------------------------

    function indicate(a) {
        var key = document.getElementsByClassName(a);
        key[0].style.background = "#0432F7";
        key[1].style.fill = "#0432F7";
        lastproblem = a;
        if (a == 65 || a == 66 || a == 67 || a == 68 || a == 69 || a == 70 || a == 71 || a == 81 || a == 82 || a == 83 || a == 84 || a == 86 || a == 87 || a == 88 || a == 90 || a == 126 || a == 33 || a == 64 || a == 35 || a == 36 || a == 37) {
            document.getElementsByClassName("shiftright")[0].style.background = "#0432F7";
            document.getElementsByClassName("shiftright")[1].style.fill = "#0432F7";          
        }
        if (a == 72 || a == 73 || a == 74 || a == 75 || a == 76 || a == 77 || a == 78 || a == 79 || a == 80 || a == 85 || a == 89 || a == 58 || a == 60 || a == 62 || a == 63 || a == 94 || a == 38 || a == 42 || a == 40 || a == 41 || a == 95 || a == 124 || a == 123 || a == 125 || a == 58 || a == 34) {
            document.getElementsByClassName("shiftleft")[0].style.background = "#0432F7";
            document.getElementsByClassName("shiftleft")[1].style.fill = "#0432F7";       
        }
            
        
    // window.setTimeout(function () { key[1].style.fill = "#1F1A17"; }, 1000);

    }
    function removeh(a){
        var key = document.getElementsByClassName(a);
        key[0].style.background = "#ffbf00";
         key[1].style.fill = "#1F1A17";
    
    }

    function indicate2(a, b) {
        var y = a.charCodeAt(b);
        var press = document.getElementById("help");
        indicate(y);
        switch(y){
            case 55:
            case 52:
            case 49:
         
                finger = "Right Index Finger.";
                break;
            case 56:
            case 53:
            case 50:
                finger = "Right Middle Finger.";
                break;
            case 57:
            case 54:
            case 51:
            case 46:
                finger = "Right Ring Finger.";
                break;
            case 43:
            case 13:
                finger = "Right Baby Finger.";
                break;
            case 48:
                finger = "Right Thumb";
                break;
            
        }
        
       
        if (y == 65 || y == 66 || y == 67 || y == 68 || y == 69 || y == 70 || y == 71 || y == 81 || y == 82 || y == 83 || y == 84 || y == 86 || y == 87 || y == 88 || y == 90 || y == 126 || y == 33 || y == 64 || y == 35 || y == 36 || y == 37) {
             press.innerHTML = "<span style='font-size:15px;'>First Press <table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;width:100px;'>Shift</td></tr></table> With Right Baby finger then</span><table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;'> "  + String.fromCharCode(y).toUpperCase()  +  "</td></tr></table><span style='font-size:15px;'> with  " +  finger+"</span>";  
        }
       else if (y == 72 || y == 73 || y == 74 || y == 75 || y == 76 || y == 77 || y == 78 || y == 79 || y == 80 || y == 85 || y == 89 || y == 58 || y == 60 || y == 62 || y == 63 || y == 94 || y == 38 || y == 42 || y == 40 || y == 41 || y == 95 || y == 124 || y == 123 || y == 125 || y == 58 || y == 34) {
            press.innerHTML = "<span style='font-size:15px;'>First Press <table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;width:100px;'>Shift</td></tr></table> With Left Baby finger then</span> <table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;'>" + String.fromCharCode(y).toUpperCase() + "</td></tr></table><span style='font-size:15px;'> with" + finger+"</span>";  
        }


       else if (y == 32) {
                             press.innerHTML = "Press <span style='font-size:15px;'> <table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;width:200px;'> &nbsp;&nbsp;&nbsp; Spacebar &nbsp;&nbsp;&nbsp;</td></tr></table> with any left finger.</span>";
                         }
     else{ 
       press.innerHTML = "Press <table id='buttons'leftmargin='50'style='display:inline-block;'><tr><td id='a3' style='opacity:1.2;'>"+ String.fromCharCode(y)+ "</td></tr></table> With "+finger;
     }   
                
         
    }

   