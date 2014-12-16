$(document).ready(function () {
	$('#search').click(function (event) {
		event.preventDefault();
		var form = $('.search-form'),
			entity = 'Animal',
			attr = $('#attribute').val(),
			value = $('#value').val();
		$.ajax({
			type: 'GET',
			url: '/search?entity=' + entity + '&attr=' + attr + '&value=' + value,
			success: function (data) {
				window.location.href = '/search?entity=' + entity + '&attr=' + attr + '&value=' + value;
			}
		});
	});

	$('#view').click(function (event) {
		event.preventDefault();
		var zooId = $('#zoo').val();
		window.location.href = '/admin/dashboard/' + zooId;
	});
});