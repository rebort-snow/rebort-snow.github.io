function aplayer1 () {
	var aplayer3 = document.getElementById('qq');
	aplayer3.disabled = false;
	var aplayer2 = document.getElementById('wyy');
	aplayer2.disabled = false;
	var aplayer1 = document.getElementById('kg');
	aplayer1.disabled = true;
	/* 如何获取酷狗歌单id？首先需要设置可见，然后打开抓包工具，随便添加一首歌曲到歌单
	 *  https://gateway.kugou.com/v4/add_song? 找到这个接口，在返回文本中找到specalidpgc即可
	*/
	/* 填写自己的id哦 */
	var old_data = get_music('kugou', '6222311');

    window.ap = new APlayer({
        container: document.getElementById('aplayer4'),
        mini: false,
        autoplay: false,
        loop: 'all',
        order: 'list',
        preload: 'none',
        volume: 1,
        mutex: true,
        listFolded: false,
        listMaxHeight: 600,
        lrcType: 3,
        audio: old_data
    });

}

function aplayer2 () {
	var aplayer3 = document.getElementById('qq');
	aplayer3.disabled = false;
	var aplayer2 = document.getElementById('wyy');
	aplayer2.disabled = true;
	var aplayer1 = document.getElementById('kg');
	aplayer1.disabled = false;
	/* 填写自己的id哦 */
	var old_data = get_music('netease', '7480897649');

    window.ap = new APlayer({
        container: document.getElementById('aplayer4'),
        mini: false,
        autoplay: false,
        loop: 'all',
        order: 'list',
        preload: 'none',
        volume: 1,
        mutex: true,
        listFolded: false,
        listMaxHeight: 600,
        lrcType: 3,
        audio: old_data
    });

}



function aplayer3 () {
    	var aplayer3 = document.getElementById('qq');
	aplayer3.disabled = true;
	var aplayer2 = document.getElementById('wyy');
	aplayer2.disabled = false;
	var aplayer1 = document.getElementById('kg');
	aplayer1.disabled = false;
	/* 填写自己的id哦 */
	var old_data = get_music('tencent', '8672698451');
	var new_data = get_music_json();
    var n_data = add_music(old_data, new_data);
    window.ap = new APlayer({
        container: document.getElementById('aplayer4'),
        mini: false,
        autoplay: false,
        loop: 'all',
        order: 'list',
        preload: 'none',
        volume: 1,
        mutex: true,
        listFolded: false,
        listMaxHeight: 600,
        lrcType: 3,
        audio: n_data
    });
}


function get_music_json() {
    /* 获取自定义音乐列表 */
    /* 这里url填写自己自定义的歌曲，格式可以参考add_music()里面的注释 */
    var url = 'https://qcloud.app966.cn/music_json/music_json.txt';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    var data = JSON.parse(xhr.responseText);
    return data;
}

function get_music(server, id) {
    /* 获取音乐列表，只支持列表 */
    var url = 'https://api.i-meto.com/meting/api?server=' + server + '&type=playlist&id=' + id;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    var obj = JSON.parse(xhr.responseText);
    var music_list = {};
    var data = [];
    for (var i = 0; i < obj.length; i++) {
        music_list = {
            'name': obj[i].title,
            'artist': obj[i].author,
            'url': obj[i].url,
            'cover': obj[i].pic,
            'lrc': obj[i].lrc,
            'theme': '#ad7a86'
        };
        data.push(music_list);
    }
    return data;
}


function add_music(old_data, new_data) {
    /* 自定义添加自己喜欢的音乐，如周杰伦的收费音乐 */
    /*    new_data =  [
            {
                "name": "最伟大的作品",
                "artist": "周杰伦",
                "url": "https://qcloud.app966.cn/music/最伟大的作品.mp3",
                "cover": "https://api.i-meto.com/meting/api?server=tencent&type=pic&id=0024bjiL2aocxT&auth=61e9f0faa8848fad7dcaf1896547cfc1d67530fe",
                "lrc": "https://api.i-meto.com/meting/api?server=tencent&type=lrc&id=003KtYhg4frNXC&auth=c25076612a8e246d85488dcfc4540cbef83d72b8",
                "theme": "#ad7a86"
            }
        ] */

    if (new_data.length > 0) {
        for (var i = 0; i < new_data.length; i++) {
            old_data.unshift(new_data[i]);
        };
    };
    return old_data;

}

function whenDOMReady() {
    if (location.pathname == "/music/" || location.pathname == "/music/index.html") {
        aplayer3();
    }
}
whenDOMReady();
