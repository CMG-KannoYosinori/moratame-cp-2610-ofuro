//--------------------------------------------------------------------------
// ▼ スクロールしたらクラスを付与 ▼

$(window).scroll(function () {           /* スクロールされた時 */
  var pos = $('#main_contents').offset();          /* mvを過ぎたmainタグの高さを取得して変数[pos]に格納 */
  if ($(this).scrollTop() > pos.top) {   /* 変数[pos]より、スクロールされていたら */
    $('body').addClass("nav_active");                /* ヘッダーをふわっと表示 */
  } else {                               /* それ以外の場合 */
    $('body').removeClass("nav_active");               /* ヘッダーをふわっと非表示 */
  }
});

// ▲ スクロールしたらクラスを付与 ▲
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// ▼ ハンバーガーメニュー ▼

$(function () {
  // ハンバーガーボタンをクリックしたらページを開く
  $('.toggle_btn').on('click', function () {
    $('body').toggleClass('open');
  });
  // ハンバーガーボタン内のリンクをクリックしたらページを閉じる
  $('.gloval-nav a').on('click', function () {
    $('body').removeClass('open');
  });
  // グローバルナビメニューのリンクをクリックしたらページを閉じる
  $('.gloval-nav ul li a').on('click', function () {
    $('body').removeClass('open');
  });
  // 背景をクリックしたらページを閉じる
  $('#dark_bg').on('click', function () {
    $('body').removeClass('open');
  });
});

// ▲ ハンバーガーメニュー ▲
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// ▼ メガメニュー ▼

$(function() {
  $('#mega_menu').on('click', function() {
    $("body").toggleClass("mega_open");
  });
  $('.megamenu_box a').on('click', function() {
    $("body").removeClass("mega_open");
  });
  $('#dark_bg').on('click', function() {
    $("body").removeClass("mega_open");
  });
});

// ▲ メガメニュー ▲
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// ▼ 固定ヘッダー対応 滑らかなアンカーリンク機能 ▼

$(function() {
  // 設定値
  const SCROLL_SPEED = 800; // スクロール速度（ミリ秒）
  const HEADER_OFFSET = 20; // ヘッダーの高さに追加するオフセット（px）
  
  // ヘッダーの高さを動的に取得する関数
  function getHeaderHeight() {
    const header = $('header');
    if (header.length) {
      return header.outerHeight() + HEADER_OFFSET;
    }
    return HEADER_OFFSET; // ヘッダーがない場合のデフォルト値
  }
  
  // 滑らかなスクロール関数
  function smoothScroll(target, speed = SCROLL_SPEED) {
    const headerHeight = getHeaderHeight();
    let position;
    
    if (target === '#' || target === '' || target === '#top') {
      // ページトップへのスクロール
      position = 0;
    } else {
      const targetElement = $(target);
      if (targetElement.length) {
        position = targetElement.offset().top - headerHeight;
      } else {
        return false; // 対象要素が見つからない場合は何もしない
      }
    }
    
    $('html, body').stop().animate({
      scrollTop: position
    }, speed, 'swing');
    
    return false;
  }
  
  // ページ内アンカーリンクのクリックイベント
  $(document).on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();
    const href = $(this).attr('href');
    
    // 外部リンクや特殊なリンクを除外
    if (href === '#' || href.length <= 1) {
      smoothScroll('#top');
      return false;
    }
    
    smoothScroll(href);
    
    // ハンバーガーメニューが開いている場合は閉じる
    if ($('body').hasClass('open')) {
      $('body').removeClass('open');
    }
    
    return false;
  });
  
  // ページ読み込み時のアンカーリンク処理（別ページからのアンカーリンク対応）
  $(window).on('load', function() {
    // URLにハッシュが含まれている場合の処理
    const hash = window.location.hash;
    
    if (hash && hash.length > 1) {
      // 少し遅延させてからスクロール（ページの読み込み完了を待つ）
      setTimeout(function() {
        const targetElement = $(hash);
        if (targetElement.length) {
          const headerHeight = getHeaderHeight();
          const position = targetElement.offset().top - headerHeight;
          
          // 初期位置を調整してからアニメーション
          $('html, body').scrollTop(0);
          $('html, body').animate({
            scrollTop: position
          }, SCROLL_SPEED, 'swing');
        }
      }, 100);
    }
  });
  
  // URL変更時の処理（ブラウザの戻る/進むボタン対応）
  $(window).on('hashchange', function() {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      smoothScroll(hash);
    }
  });
  
  // ヘッダーの高さが変わった時の対応（リサイズ時など）
  $(window).on('resize', function() {
    // リサイズ時に必要に応じて現在位置を調整
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      const targetElement = $(hash);
      if (targetElement.length) {
        const headerHeight = getHeaderHeight();
        const currentScroll = $(window).scrollTop();
        const targetPosition = targetElement.offset().top - headerHeight;
        
        // 現在のスクロール位置がターゲット要素の近くにある場合のみ調整
        if (Math.abs(currentScroll - targetPosition) < 100) {
          $('html, body').scrollTop(targetPosition);
        }
      }
    }
  });
});

// ▲ 固定ヘッダー対応 滑らかなアンカーリンク機能 ▲
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// ▼ ハンバーガー内アコーディオン ▼

$(".ac_btn").on("click",function() {
  const question = $(this);
  const answer = $(this).next();

  question.toggleClass("active");
  answer.slideToggle(500);
});

// ▲ ハンバーガー内アコーディオン ▲
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
// ▼ ちらつき対策ローディング機能 ▼

$(function() {
  // ページの完全な読み込み完了まで待つローディング機能
  
  // ローディングを非表示にする関数
  function hideLoading() {
    const loadingElement = $('.loading');
    if (loadingElement.length) {
      // フェードアウト効果を追加
      loadingElement.css({
        'transition': 'opacity 0.3s ease-out',
        'opacity': '0'
      });
      
      // アニメーション完了後に要素を完全に削除
      setTimeout(function() {
        loadingElement.css({
          'display': 'none',
          'pointer-events': 'none'
        });
      }, 300);
    }
  }
  
  // DOM読み込み完了時の処理
  $(document).ready(function() {
    // 画像やその他のリソースも含めてページが完全に読み込まれるまで待つ
    if (document.readyState === 'loading') {
      // まだ読み込み中の場合は、window.onloadを待つ
      $(window).on('load', function() {
        hideLoading();
      });
    } else {
      // すでに読み込み完了している場合は即座に非表示
      hideLoading();
    }
  });
  
  // 長時間読み込みが続く場合の保険（10秒後に強制的にローディングを非表示）
  setTimeout(function() {
    const loadingElement = $('.loading');
    if (loadingElement.length && loadingElement.css('opacity') !== '0') {
      console.log('ローディングタイムアウト: 強制的に非表示にします');
      hideLoading();
    }
  }, 10000);
});

// ▲ ちらつき対策ローディング機能 ▲
//--------------------------------------------------------------------------