/* ==========================================================================
   Claude×Canva連携 完全ガイド
   1. 画像が無いときのプレースホルダー表示
   2. プロンプトのコピー
   3. ページ先頭へ戻るボタン
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. 画像が無いときのプレースホルダー表示
        assets/ に同名ファイルを置けば、そのまま画像が表示されます。
     ------------------------------------------------------------------ */

  function showPlaceholder(img) {
    if (!img.parentNode || img.dataset.replaced === '1') {
      return;
    }
    img.dataset.replaced = '1';

    var box = document.createElement('div');
    box.className = 'media__placeholder';

    var icon = document.createElement('span');
    icon.className = 'ph-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '🖼';

    var text = document.createElement('p');
    text.className = 'ph-text';
    text.textContent = img.dataset.placeholder || 'ここに画像を入れてください';

    var file = document.createElement('p');
    file.className = 'ph-file';
    file.textContent = img.getAttribute('src');

    box.appendChild(icon);
    box.appendChild(text);
    box.appendChild(file);
    img.parentNode.replaceChild(box, img);
  }

  function watchImages() {
    var images = document.querySelectorAll('img[data-placeholder]');

    Array.prototype.forEach.call(images, function (img) {
      img.addEventListener('error', function () {
        showPlaceholder(img);
      });

      // このスクリプトが動く前に読み込みが終わっていた場合の確認
      if (img.complete && img.naturalWidth === 0) {
        showPlaceholder(img);
      }
    });
  }

  /* ------------------------------------------------------------------
     2. プロンプトのコピー
     ------------------------------------------------------------------ */

  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) {
      return;
    }
    toast.textContent = message;
    toast.hidden = false;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 2200);
  }

  // navigator.clipboard が使えない環境（file:// で開いた場合など）の控え
  function copyByTextarea(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '0';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, area.value.length);

    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function markCopied(button) {
    var original = button.dataset.originalLabel;
    if (!original) {
      original = button.textContent;
      button.dataset.originalLabel = original;
    }
    button.classList.add('is-copied');
    button.textContent = 'コピーしました！';
    showToast('コピーしました！');

    setTimeout(function () {
      button.classList.remove('is-copied');
      button.textContent = original;
    }, 2200);
  }

  function handleCopy(button) {
    var target = document.getElementById(button.dataset.copy);
    if (!target) {
      return;
    }
    var text = target.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          markCopied(button);
        },
        function () {
          if (copyByTextarea(text)) {
            markCopied(button);
          } else {
            showToast('コピーできませんでした。長押しで選択してください');
          }
        }
      );
      return;
    }

    if (copyByTextarea(text)) {
      markCopied(button);
    } else {
      showToast('コピーできませんでした。長押しで選択してください');
    }
  }

  function watchCopyButtons() {
    var buttons = document.querySelectorAll('[data-copy]');

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function () {
        handleCopy(button);
      });
    });
  }

  /* ------------------------------------------------------------------
     3. ページ先頭へ戻るボタン
     ------------------------------------------------------------------ */

  function watchToTop() {
    var toTop = document.getElementById('to-top');
    if (!toTop) {
      return;
    }

    function update() {
      toTop.hidden = window.pageYOffset < 600;
    }

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------- */

  watchImages();
  watchCopyButtons();
  watchToTop();
})();
