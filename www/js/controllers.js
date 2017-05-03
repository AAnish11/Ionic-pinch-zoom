angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
  $scope.sliderImages = [
    'https://cdn-images-1.medium.com/max/2000/1*J0RqnYvTY3CD3PnfGC0RZg.jpeg',
    'https://i1.wp.com/blog.wemanity.com/wp-content/uploads/2016/03/ionic-article-head1.png',
  ];
  function _updatePinchSlidesHandler(bool){
    $ionicSlideBoxDelegate.$getByHandle('pinch-zoom-slide').enableSlide(bool);
  }
  $scope.showPinchZoomView = function(index){
      $scope.currentInSlide = index;
      $ionicModal.fromTemplateUrl('pinch-zoom.html', {
          scope: $scope,
          animation: 'slide-in-up'
      }).then(function(modal) {
              $scope.imageModel = modal;
              $scope.imageModel.show().then(function(){
                _updatePinchSlidesHandler(true);
              });
      });
  }
  $scope.updateSlideStatus = function(slide) {      
      var handler = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide);
      var zoomFactor = handler.getScrollPosition().zoom;

      //prevent from go to next slide till pinch not zoom out
      
      if (zoomFactor <= 1.2) {
        _updatePinchSlidesHandler(true);
      } else {
        _updatePinchSlidesHandler(false);
      }
    };
   $scope.closeModal = function() {
      $scope.imageModel.hide();
      $scope.imageModel.remove();
   }
})
