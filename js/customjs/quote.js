// 定义回调函数
function handleQuoteResponse(data) {
    const quoteText = data.quoteText || "No quote available";
    const quoteAuthor = data.quoteAuthor || "Unknown";

    // 将名言插入到页面中
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.innerHTML = `
            <h4>${quoteText}</h4>
            <footer>— ${quoteAuthor}</footer>
    `;
}

// 动态创建 script 标签来发起 JSONP 请求
function fetchQuote() {
    const script = document.createElement("script");
    script.src = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=handleQuoteResponse";
    document.head.appendChild(script);
}

// 在页面加载时调用 fetchQuote 函数
document.addEventListener("DOMContentLoaded", fetchQuote);