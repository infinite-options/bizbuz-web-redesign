import Highcharts from "highcharts";
import networkgraph from "highcharts/modules/networkgraph";

if (typeof Highcharts === "object") {
  networkgraph(Highcharts);
  (function (H) {
    H.wrap(
      H.seriesTypes.networkgraph.prototype.pointClass.prototype,
      "getLinkPath",
      function (p) {
        var left = this.fromNode,
          right = this.toNode;
        var angle = Math.atan(
          (left.plotX - right.plotX) / (left.plotY - right.plotY)
        );
        if (angle) {
          let path = ["M", left.plotX, left.plotY, right.plotX, right.plotY],
            // lastPoint = left,
            nextLastPoint = right,
            pointRadius = 25,
            arrowLength = 8,
            arrowWidth = 8;

          if (left.plotY < right.plotY) {
            path.push(
              nextLastPoint.plotX - pointRadius * Math.sin(angle),
              nextLastPoint.plotY - pointRadius * Math.cos(angle)
            );
            path.push(
              nextLastPoint.plotX -
                pointRadius * Math.sin(angle) -
                arrowLength * Math.sin(angle) -
                arrowWidth * Math.cos(angle),
              nextLastPoint.plotY -
                pointRadius * Math.cos(angle) -
                arrowLength * Math.cos(angle) +
                arrowWidth * Math.sin(angle)
            );
            path.push(
              nextLastPoint.plotX - pointRadius * Math.sin(angle),
              nextLastPoint.plotY - pointRadius * Math.cos(angle)
            );
            path.push(
              nextLastPoint.plotX -
                pointRadius * Math.sin(angle) -
                arrowLength * Math.sin(angle) +
                arrowWidth * Math.cos(angle),
              nextLastPoint.plotY -
                pointRadius * Math.cos(angle) -
                arrowLength * Math.cos(angle) -
                arrowWidth * Math.sin(angle)
            );
          } else {
            path.push(
              nextLastPoint.plotX + pointRadius * Math.sin(angle),
              nextLastPoint.plotY + pointRadius * Math.cos(angle)
            );
            path.push(
              nextLastPoint.plotX +
                pointRadius * Math.sin(angle) +
                arrowLength * Math.sin(angle) -
                arrowWidth * Math.cos(angle),
              nextLastPoint.plotY +
                pointRadius * Math.cos(angle) +
                arrowLength * Math.cos(angle) +
                arrowWidth * Math.sin(angle)
            );
            path.push(
              nextLastPoint.plotX + pointRadius * Math.sin(angle),
              nextLastPoint.plotY + pointRadius * Math.cos(angle)
            );
            path.push(
              nextLastPoint.plotX +
                pointRadius * Math.sin(angle) +
                arrowLength * Math.sin(angle) +
                arrowWidth * Math.cos(angle),
              nextLastPoint.plotY +
                pointRadius * Math.cos(angle) +
                arrowLength * Math.cos(angle) -
                arrowWidth * Math.sin(angle)
            );
          }
          return path;
        }
        return [
          ["M", left.plotX || 0, left.plotY || 0],
          ["L", right.plotX || 0, right.plotY || 0],
        ];
      }
    );
  })(Highcharts);
}

export default Highcharts;
