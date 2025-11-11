// Live2D 智能加载器 - 自动检测环境并选择合适的资源
(function() {
    function isLocalFile() {
        return window.location.protocol === 'file:';
    }

    function loadLive2D() {
        const isLocal = isLocalFile();
        console.log('Environment detected:', isLocal ? 'Local File' : 'HTTP Server');
        
        if (isLocal) {
            // 本地文件环境，使用 CDN 资源
            console.log('Using CDN resources for local file environment');
            const script = document.createElement('script');
            script.src = 'https://fastly.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
            script.onload = function() {
                L2Dwidget.init({
                    "model": {
                        "jsonPath": "https://fastly.jsdelivr.net/gh/xiazeyu/live2d-widget-models/packages/live2d-widget-model-hijiki/assets/hijiki.model.json",
                        "scale": 1.1
                    },
                    "display": {
                        "position": "right",
                        "width": 176,
                        "height": 308,
                        "hOffset": 35,
                        "vOffset": 10,
                        "superSample": 2
                    },
                    "mobile": {
                        "show": false,
                        "scale": 1.2
                    },
                    "react": {
                        "opacityDefault": 0.85,
                        "opacityOnHover": 1.0
                    }
                });
            };
            document.head.appendChild(script);
        } else {
            // HTTP 服务器环境，使用本地高分辨率资源
            console.log('Using local high-resolution resources');
            const script = document.createElement('script');
            script.src = 'assets/live2d/lib/L2Dwidget.min.js';
            script.onload = function() {
                L2Dwidget.init({
                    "model": {
                        "jsonPath": "assets/live2d/hijiki/hijiki.model.json",
                        "scale": 1.1
                    },
                    "display": {
                        "position": "right",
                        "width": 176,
                        "height": 308,
                        "hOffset": 35,
                        "vOffset": 10,
                        "superSample": 2
                    },
                    "mobile": {
                        "show": false,
                        "scale": 1.2
                    },
                    "react": {
                        "opacityDefault": 0.85,
                        "opacityOnHover": 1.0
                    }
                });
            };
            script.onerror = function() {
                console.error('Failed to load local Live2D library, falling back to CDN');
                // 如果本地资源加载失败，回退到 CDN
                const fallbackScript = document.createElement('script');
                fallbackScript.src = 'https://fastly.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
                fallbackScript.onload = function() {
                    L2Dwidget.init({
                        "model": {
                            "jsonPath": "https://fastly.jsdelivr.net/gh/xiazeyu/live2d-widget-models/packages/live2d-widget-model-hijiki/assets/hijiki.model.json",
                            "scale": 1.1
                        },
                        "display": {
                            "position": "right", 
                            "width": 176,
                            "height": 308,
                            "hOffset": 35,
                            "vOffset": 10,
                            "superSample": 2
                        },
                        "mobile": {
                            "show": false,
                            "scale": 1.2
                        },
                        "react": {
                            "opacityDefault": 0.85,
                            "opacityOnHover": 1.0
                        }
                    });
                };
                document.head.appendChild(fallbackScript);
            };
            document.head.appendChild(script);
        }
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLive2D);
    } else {
        loadLive2D();
    }
})();