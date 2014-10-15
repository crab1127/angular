angular.module('drag', [])
  .directive('draggable', function($document) {
    var startX = 0, startY = 0, x = 0, y = 0;
    console.log('docs');
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
  });
function Ctrl1($scope) {
  $scope.name = 'angular';
}
