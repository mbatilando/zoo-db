$(document).ready(function () {

	$('.update-form').submit(function (event) {
		event.preventDefault();
		var form = $(this),
			entity = $('.update-form input[name="_entity"]').val(),
			id = $('.update-form input[name="_id"]').val();
		$.ajax({
			type: 'PUT',
			url: '/animal/' + id,
			data: form.serialize(),
			success: function (data) {
				window.location.href = '/' + entity + '/';
			}
		});
	});

	$('#delete').click(function () {
		var id = $('.update-form input[name="_id"]').val(),
			entity = $('.update-form input[name="_entity"]').val();
		$.ajax({
			type: 'DELETE',
			url: '/animal/' + id,
			success: function (data) {
				window.location.href = '/' + entity + '/';
			}
		});
	});
});