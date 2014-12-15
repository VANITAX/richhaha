(function() {
  window.onload = function() {
    var DrawingThing, SIZE, TWO_PI, c, canvas, clear, createCanvas, ct, drawingThings, quarterSize, threQuarters, trails;
    SIZE = 400;
    quarterSize = SIZE / 4;
    threQuarters = SIZE - quarterSize;
    TWO_PI = Math.PI * 2;
    createCanvas = function() {
      var canvas;
      canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      return canvas;
    };
    canvas = createCanvas();
    document.body.appendChild(canvas);
    c = canvas.getContext("2d");
    trails = createCanvas();
    ct = trails.getContext("2d");
    clear = function() {
      c.fillStyle = "black";
      c.fillRect(0, 0, SIZE, SIZE);
      ct.fillStyle = "black";
      ct.fillRect(0, 0, SIZE, SIZE);
    };
    clear();
    document.getElementById("erase").onclick = clear;
    DrawingThing = (function() {
      function DrawingThing(x, y) {
        this.x = x;
        this.y = y;
        this.radii = [30, 60, 90];
        this.num = this.radii.length;
        this.thetas = [Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI];
        this.thetasInc = [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1];
      }

      DrawingThing.prototype.draw = function() {
        var i, x, y, _i, _ref;
        ct.strokeStyle = "rgba(255,0,0,0.1)";
        for (i = _i = 0, _ref = this.num; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          x = this.x + this.radii[i] * Math.cos(this.thetas[i]);
          y = this.y + this.radii[i] * Math.sin(this.thetas[i]);
          if (i === 0) {
            ct.beginPath();
            ct.moveTo(x, y);
          } else {
            ct.lineTo(x, y);
          }
          c.strokeStyle = "rgba(0,255,255,0.5)";
          c.fillStyle = "white";
          c.beginPath();
          c.arc(this.x, this.y, this.radii[i], 0, TWO_PI, false);
          c.stroke();
          c.beginPath();
          c.arc(x, y, 2, 0, TWO_PI, false);
          c.fill();
          this.thetas[i] += this.thetasInc[i];
        }
        ct.closePath();
        ct.stroke();
      };

      return DrawingThing;

    })();
    drawingThings = [new DrawingThing(quarterSize, quarterSize), new DrawingThing(threQuarters, quarterSize), new DrawingThing(threQuarters, threQuarters), new DrawingThing(quarterSize, threQuarters)];
    return setInterval(function() {
      var drawThing, _i, _len, _results;
      c.drawImage(trails, 0, 0);
      _results = [];
      for (_i = 0, _len = drawingThings.length; _i < _len; _i++) {
        drawThing = drawingThings[_i];
        _results.push(drawThing.draw());
      }
      return _results;
    }, 20);
  };

  return;

}).call(this);
