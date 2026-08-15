// 1. 定义 API 池（含 UAPI 接口）
const apiPool = [
    {
        url: 'https://uapis.cn/api/v1/saying',
        parser: (data) => ({ text: data.text, author: '' })
    }
];

// 2. 定义默认名言池（本地备用）
const defaultQuotes = [
    { text: '人生就像骑自行车。要保持平衡，你必须不断前进。', author: '爱因斯坦' },
    { text: '不要等待机会，而要创造机会。', author: '乔治·伯纳德·肖' },
    { text: '成功的秘诀在于坚持自己的目标。', author: '本杰明·迪斯雷利' },
    { text: '生活中最重要的不是你所处的位置，而是你所朝的方向。', author: '奥利弗·温德尔·霍姆斯' },
    { text: '一瞥便是惊鸿，芳华乱了浮生。', author: '' },
    { text: '慕然回首，那人却在灯火阑珊处。', author: '辛弃疾' },
    { text: '不经一番寒彻骨，怎得梅花扑鼻香。', author: '陆游' },
    { text: '路漫漫其修远兮，吾将上下而求索。', author: '屈原' },
    { text: '海内存知己，天涯若比邻。', author: '王勃' },
    { text: '长风破浪会有时，直挂云帆济沧海。', author: '李白' },
    { text: '千里之行，始于足下。', author: '老子' },
    { text: '学而不思则罔，思而不学则殆。', author: '孔子' },
    { text: '知之者不如好之者，好之者不如乐之者。', author: '孔子' },
];

// 3. 从默认池中随机取一条
function getRandomDefaultQuote() {
    const index = Math.floor(Math.random() * defaultQuotes.length);
    return defaultQuotes[index];
}

// 4. 从 API 池顺序获取名言
async function fetchQuoteFromPool() {
    for (const api of apiPool) {
        try {
            const response = await fetch(api.url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const parsed = api.parser(data);
            if (parsed.text && parsed.text.length > 0) {
                return parsed; // 成功获取
            }
        } catch (error) {
            console.warn(`API ${api.url} 失败:`, error);
            // 继续尝试下一个
        }
    }
    // 所有 API 均失败 → 返回随机默认名言
    return getRandomDefaultQuote();
}

// 5. 更新页面
function displayQuote({ text, author }) {
    const container = document.getElementById('quote-container');
    container.innerHTML = `
        <h4>${text || 'Unknown'}</h4>
        <footer> ${author || ''}</footer>
    `;
}

// 6. 主流程
async function fetchQuote() {
    const quote = await fetchQuoteFromPool();
    displayQuote(quote);
}

// 7. 页面加载后执行
document.addEventListener('DOMContentLoaded', fetchQuote);