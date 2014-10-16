angular.module('drag', [])
  .directive('draggable', function($document) {
    var startX = 0, startY = 0, x = 0, y = 0;
    return function($scope, $element, $attr) {
      $element.css({
        position: 'relative',
        border: '1px solid red',
        backgroundColor: 'lightgrey',
        cursor: 'pointer'
      });

      $element.bind('mousedown', function(event) {
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        $element.css({
          top: y + 'px',
          left: x + 'px'
        });
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mousemove', mouseup);
      }
    }
  })
  .directive('myCurrentTime', function($timeout, dateFilter) {
    console.log(1,$timeout);
    console.log(2,dateFilter);
    return function(scope, element, attrs) {
      console.log(3,scope);
      console.log(4,element);
      console.log(5,attrs);
      var format, //date format
          timeoutId; //
      //用于跟新ui
      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }

      //监听，
      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });

      function updateLater() {
        timeoutId = $timeout(function() {
          updateTime();
          updateLater();
        }, 1000)
      }

      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });

      updateLater();

    }
  });
function Ctrl1($scope) {
  $scope.name = 'angular';
}
function Ctrl2($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}
