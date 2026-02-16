const CACHE_NAME = 'gridmemo-pro-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    // アイコンファイルがある場合はここに追加
    // './icon-192.png',
    // './icon-512.png'
];

// インストール時：キャッシュを作成
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

// 有効化時：古いキャッシュを削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
});

// フェッチ時：キャッシュがあればそれを返す（オフライン対応）
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // キャッシュヒットならそれを返す
                if (response) return response;
                // なければネットワークへ
                return fetch(event.request);
            })
    );
});
