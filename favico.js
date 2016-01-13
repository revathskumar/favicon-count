/* global document */
(function () {
  const Favico = (function () {
    let canvas;
    let img;
    let link;
    let ctx;

    let options;
    let isReady = false;
    let waitingCount = 0;

    const getPosX = function (count) {
      if (count > 99) {
        return 0;
      }
      if (count > 9) {
        return 5;
      }
      return 10;
    };

    const updateLink = function () {
      const oldLink = document.getElementById('favicon');
      if (oldLink) {
        document.head.removeChild(oldLink);
      }

      document.head.appendChild(link);
    };

    const update = function (cnt) {
      if (!isReady) {
        waitingCount = cnt;
        return;
      }
      let posX = 10;

      const count = cnt || 0;
      console.log('count to update', cnt);
      ctx.clearRect(0, 0, 16, 16);
      ctx.drawImage(img, 0, 0);

      posX = getPosX(count);

      ctx.fillText(count, posX, 15);

      link.href = canvas.toDataURL('image/png');

      updateLink();
    };

    const ready = function () {
      isReady = true;
      update(waitingCount);
    };

    const createImg = function () {
      const img = document.createElement('img');
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = ready;
      img.src = options.icon || 'favicon.ico';
      return img;
    };

    const createLink = function () {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.id = 'favicon';
      link.type = 'image/png';
      return link;
    };

    const setup = function (opts) {
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
      setup,
      update
    };
  })();

  module.exports = Favico;
})();
