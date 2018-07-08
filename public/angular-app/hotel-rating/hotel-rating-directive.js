// angular.module('meanhotel').directive('hotelRating', hotelRating);
// //the camel of hotelRating meaning in angular, when we using hotelRating we have to type like 'hotel-rating'
//
// function hotelRating(){
//     return {
//         restrict: 'E',
//         template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star"> {{ star }} </span>',
//         bindController: true,
//         controller: 'HotelController',
//         controllerAs: 'vm',
//         scope: {
//             stars: '@'
//         }
//     }
// }

angular.module('meanhotel').component('hotelRating',{
    bindings: {
        stars: '='
    },
    template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star"> {{ 1 }} </span>',
    controller: 'HotelController',
    controllerAs: 'vm',
})