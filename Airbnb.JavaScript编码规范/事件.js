// 当给事件附加数据时（无论是 DOM 事件还是私有事件），传入一个哈希而不是原始值。
// 这样可以让后面的贡献者增加更多数据到事件数据而无需找出并更新事件的每一个处理器

// bad
$(this).trigger('listingUpdated', listing.id);

// ...

$(this).on('listingUpdated', function (e, listingId) {
	// do something with listingId
});

// good
$(this).trigger('listingUpdated', { listingId: listing.id });

// ...

$(this).on('listingUpdated', function (e, data) {
	// do something with data.listingId
});

// 使用 $ 作为存储 jQuery 对象的变量前缀
// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// 缓存 jQuery 查询
function setSidebar() {
	$('.sidebar').hide();

	// ...stuff...

	$('.sidebar').css({
		'background-color': 'pink'
	});
}

// good
function setSidebar() {
	const $sidebar = $('.sidebar');
	$sidebar.hide();

	// ...stuff...

	$sidebar.css({
		'background-color': 'pink'
	});
}

// 对 DOM 查询使用层叠 $('.sidebar ul') 或 父元素 > 子元素 $('.sidebar > ul')
// 对有作用域的 jQuery 对象查询使用 find
// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();