<%-- 
    Document   : main
    Created on : Aug 24, 2016, 10:12:31 PM
    Author     : Nazrin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">        

        <title> Daxil ol </title>

        <link rel="stylesheet" href="<c:url value="/assets/css/app.min.css" />" />
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/ros.css" />" />
        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/notify.css" />" />
<!--        <link rel="stylesheet" type="text/css" href="<c:url value="/assets/css/pages.css" />" />-->
    </head>
    <body class="body-class">
        <div class="background-img"></div>
        <header>
            <nav class="navbar">


                <div class="container-fluid">
<!--                     <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                       <div class="unibook-logo">
                           <img class="img-responsive" src="assets/img/unibook-logo.svg" style="max-width: 200px;">
                       </div>
                    </div>

                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="#">Kömək</a></li>
                            <li><a href="#">Haqqında</a></li>
                            <li><a href="#">Əlaqə</a></li>
                        </ul>
                    </div> -->
                </div>
            </nav>
        </header>

        <section class="content1">
            <h1 class="login-title">Azərbaycan Təhsil İnformasiya Sistemi</h1>
            <div class="login">
                <div class="head">
                    <img src="assets/img/atislogo.svg" alt="">
                </div>

                <form:form modelAttribute="form">
                    <div class="loginbox_">
                        <form:errors path="*" element="div" cssClass="alert alert-danger" />
                        <c:if test="${not empty operCode and operCode eq 'invalid-credentials'}">
                            <div class="alert alert-danger">
                                İstifadəçi adı/şifrə düzgün deyil 
                            </div>
                        </c:if>
                        <c:if test="${not empty operCode and operCode eq 'user-blocked'}">
                            <div class="alert alert-danger">
                                Sizin hesabınız bağlıdır
                            </div>
                        </c:if>
                        <c:if test="${not empty operCode and operCode eq 'connection-problem'}">
                            <div class="alert alert-danger">
                                Əlaqədə problem var
                            </div>
                        </c:if>
                    </div>
                    <div class="inputs">
                        <form:input type="text" placeholder="İstifadəçi adı" path="username" data-required="data-required" />
                        <form:input type="password" placeholder="Şifrə" path="password" data-required="data-required" />

                        <!--                        <div class="recaptcha">
                                                    <div class="g-recaptcha" style="transform:scale(0.96);transform-origin:0 0" data-callback="recaptchaCallback"  data-sitekey="6Lcywh4UAAAAAMYXUQ09KFCC1fJbgmZA3sEfYtaD"></div>
                                                </div>-->
                        <div class="forget-password">
                            <a href="#">Şifrəni unutmusunuz?</a>
                        </div>
                    </div>
                    <button type="submit">Daxil ol</button>
                </form:form>
            </div>
        </section> 

        <footer>
            <div class="unibook-logo text-center">
                <img class="img-responsive" src="assets/img/unibook-logo.svg">
            </div>
        </footer>



        <script src='https://www.google.com/recaptcha/api.js'></script>
        <script src="assets/js/jquery-2.1.1.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/auth.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/require.js"></script>
        <script src="assets/js/ros.js"></script>
        <script src="assets/js/notify.js"></script>
        <script>
            $(function () {
                ROS.loadLanguagePack('az');
                ROS.i18n();
            });

            $("form").submit(function (event) {
                if (ROS.Validation.validateRequiredFields('data-required')) {
//                    var recaptcha = $("#g-recaptcha-response").val();
//                    if (recaptcha === "") {
//                        event.preventDefault();
//                        $('iframe').addClass('error-recaptcha');
//                    } else {
//                        $('iframe').removeClass('error-recaptcha');
//                    }
                }
                else {
                    return false;
                }

            });

        </script>
    </body>
</html>