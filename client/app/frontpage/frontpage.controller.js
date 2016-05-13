'use strict';

angular.module('tcgtournamentApp')
  .controller('FrontpageCtrl', function ($scope, $mdDialog) {
    $scope.message = 'Hello';


    var main = function() {
      /* Push the body and the nav over by 285px over */
      $('.icon-menu').click(function() {
        $('.menu').animate({
          right: "0px"
        }, 200);

        $('body').animate({
          right: "0px"
        }, 200);
      });

      /* Then push them back */
      $('.icon-close').click(function() {
        $('.menu').animate({
          right: "-500px"
        }, 200);

        $('body').animate({
          right: "0px"
        }, 200);
      });
    };


    $(document).ready(main);
  });
