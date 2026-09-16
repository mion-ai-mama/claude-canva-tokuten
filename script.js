/* ==========================================================================
   Claude×Canva連携 完全ガイド
   1. 画像が無いときのプレースホルダー表示
   2. 書き換える場所（〈　〉）の強調
   3. プロンプトのコピー
   4. ページ先頭へ戻るボタン
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

    // 拡大リンクで囲まれている場合は、リンクごと差し替える（画像が無いのでリンク先も無い）
    var target = img;
    if (img.parentNode.className === 'media__zoom') {
      target = img.parentNode;
      var caption = target.nextElementSibling;
      if (caption && caption.className === 'media__caption') {
        caption.parentNode.removeChild(caption);
      }
    }

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
    target.parentNode.replaceChild(box, target);
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
     2. 書き換える場所（〈　〉）を目立たせる
        文字そのものは変えないので、コピーされる内容は見た目と同じです。
     ------------------------------------------------------------------ */

  function highlightFillIns() {
    var prompts = document.querySelectorAll('.prompt');

    Array.prototype.forEach.call(prompts, function (el) {
      var text = el.textContent;
      if (text.indexOf('〈') === -1) {
        return;
      }

      var fragment = document.createDocumentFragment();
      var pattern = /〈[^〉]*〉/g;
      var last = 0;
      var match;

      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) {
          fragment.appendChild(document.createTextNode(text.slice(last, match.index)));
        }
        var mark = document.createElement('span');
        mark.className = 'fill';
        mark.textContent = match[0];
        fragment.appendChild(mark);
        last = pattern.lastIndex;
      }
      if (last < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(last)));
      }

      el.textContent = '';
      el.appendChild(fragment);
    });
  }

  /* ------------------------------------------------------------------
     3. プロンプトのコピー
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
     4. ページ先頭へ戻るボタン
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
  highlightFillIns();
  watchCopyButtons();
  watchToTop();
})();
