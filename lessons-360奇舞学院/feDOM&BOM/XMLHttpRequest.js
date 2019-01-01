let xhr = new XMLHttpRequest(), method = 'GET', url = "http://teach.h5jun.com/";;
xhr.open(method, url, true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status ===200) {
        console.log(xhr.responseText)
    }
};

xhr.send();


//更换可以访问的url
let xhr = new XMLHttpRequest(),
method = 'GET',
url = 'http://211.140.7.179:8143/store-api/?method=com.wondertek.store.api.GoodsSearchApi.queryGoodsShareMessageByGoodsId&goodsId=110000000000000009&time=1518318067153';

xhr.open(method, url, true);

xhr.onreadystatechange = function() {
if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
}
};

xhr.send();
