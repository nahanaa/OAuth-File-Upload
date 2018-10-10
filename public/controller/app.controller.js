"use strict";

angular.module("app.controller", []).controller("AppController", [
    "$scope",
    "$location",
    "AppService",
    function($scope, $location, AppService) {
        $scope.initialize = function() {
            var url = $location.url();

            if (url === "/login") {
                $scope.getOAuthUrl();
            }
        };

        // get authorization url from server
        $scope.getOAuthUrl = function() {
            AppService.getOAuthUrl().then(
                (data) => {
                    $scope.authUrl = data.url;
                },
                (err) => {
                    console.error(err);
                }
            );
        };

        $scope.file = "";
        $scope.message = { message: "", status: true };

        // upload image function
        $scope.upload = function() {
            var fileType = $scope.file.type;
            if (!(fileType == "image/png" || fileType == "image/jpg" || fileType == "image/jpeg")) {
                $scope.message = {
                    message: "Not an Image File!",
                    status: false
                };

                return;
            }

            console.log($scope.file);

            AppService.uploadImage($scope.file).then(
                (data) => {
                    $scope.file = "";
                    $scope.message = {
                        message: "Image uploaded to your google drive!",
                        status: true
                    };
                },
                (err) => {
                    $scope.file = "";
                    $scope.message = {
                        message: "Oopps! Try again",
                        status: false
                    };
                }
            );
        };

        // clear uploaded images
        $scope.clear = function() {
            $scope.file = "";
            $scope.reset();
        };

        $scope.reset = function() {
            $scope.message = {};
        };

        $scope.initialize();
    }
]);
