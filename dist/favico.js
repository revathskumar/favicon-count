'use strict';

/* global document */
(function () {
  var Favico = function () {
    var canvas = undefined;
    var img = undefined;
    var link = undefined;
    var ctx = undefined;

    var options = undefined;
    var isReady = false;
    var waitingCount = 0;

    var getPosX = function getPosX(count) {
      if (count > 99) {
        return 0;
      }
      if (count > 9) {
        return 5;
      }
      return 10;
    };

    var updateLink = function updateLink() {
      var oldLink = document.getElementById('favicon');
      if (oldLink) {
        document.head.removeChild(oldLink);
      }

      document.head.appendChild(link);
    };

    var update = function update(cnt) {
      if (!isReady) {
        waitingCount = cnt;
        return;
      }
      var posX = 10;

      var count = cnt || 0;
      console.log('count to update', cnt);
      ctx.clearRect(0, 0, 16, 16);
      ctx.drawImage(img, 0, 0);

      posX = getPosX(count);

      ctx.fillText(count, posX, 15);

      link.href = canvas.toDataURL('image/png');

      updateLink();
    };

    var ready = function ready() {
      isReady = true;
      update(waitingCount);
    };

    var createImg = function createImg() {
      var img = document.createElement('img');
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = ready;
      img.src = options.icon || '/favicon.ico';
      return img;
    };

    var createLink = function createLink() {
      var link = document.createElement('link');
      link.rel = 'icon';
      link.id = 'favicon';
      link.type = 'image/png';
      return link;
    };

    var setup = function setup(opts) {
      options = opts || {};
      canvas = document.createElement('canvas');
      link = createLink();
      img = createImg();

      if (canvas.getContext) {
        canvas.height = canvas.width = 16;
        ctx = canvas.getContext('2d');
        ctx.font = 'bold 10px "helvetica", sans-serif';
        ctx.fillStyle = 'black';
      }
    };

    return {
      setup: setup,
      update: update
    };
  }();

  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return Favico;
    });
  }
  // CommonJS
  else if (typeof module !== 'undefined' && module.exports) {
      module.exports = Favico;
    }
    // included directly via <script> tag
    else {
        this.Favico = Favico;
      }
})();
