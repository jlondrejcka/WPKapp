temp=[];


$('.course_info_edit').live('click', function (e) {
	temp['course_info_price']=$('#course_info_price').val();
	temp['course_info_duration']=$('#course_info_duration').val();
	temp['course_info_description']=$('#course_info_description').val();
	$('.single_course_info input').prop('disabled',false);
	$('.single_course_info textarea').prop('disabled',false);
	$(this).parent().html("<button class='btn course_info_save' >Save</button> <button class='btn course_info_cancel' >Cancel</button>");
});
$('.course_info_cancel').live('click', function (e) {
	$('#course_info_price').val(temp['course_info_price']);
	$('#course_info_duration').val(temp['course_info_duration']);
	$('#course_info_description').val(temp['course_info_description']);
	$('.single_course_info input').prop('disabled',true);
	$('.single_course_info textarea').prop('disabled',true);
	$(this).parent().html("<button class='btn course_info_edit' >Edit</button>");
});
$('.course_info_save').live('click', function (e) {
	$(this).parent().html("<button class='btn course_info_edit' >Edit</button>");
	course_info_ajax_helper("api/service/course",{operation:'update_course',price:$('#course_info_price').val(),duration:$('#course_info_duration').val(),
		description:$('#course_info_description').val(),course_name:$('.single_course_info').attr('course_name'),course_id:$('.single_course_info').attr('course_id')});
});

$('.new_book').live('click', function (e) {
	e.preventDefault();
    var div1 = document.getElementById('unclickableDiv1');
/*	div.innerHTML='<div id="quiz_div"><a class="modalCloseImg" href="#"></a><iframe name="quiz_frame" id="quiz_frame" class="quiz_frame" src="'+base_url+'api/pageapi/quizbox/'+attach+'" '+
		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';*/

/*	$('.quiz_frame').load(function(e)
	{

	});*/
	div1.innerHTML='<div id="new_book_div"><a class="modalCloseImg" href="#"></a><div id="div_frame" class="div_frame"><h3 class="text_header center">New Book Reference</h3>'+
		'<div class="new_book_container"><div class="control-group"><label class="control-label">New Book Name</label><div class="controls">'+
		'<input type="text" id="new_book_name"/><span class="help-block"></span></div></div>'+
		'<div class="control-group"><label class="control-label">New Book URL</label><div class="controls">'+
		'<input type="text" id="new_book_url"/><span class="help-block"></span></div></div>'+
		'<div class="control-group submit_container"><div class="controls"><button class="btn new_book_submit">Submit</button></div></div>'+
		'</div></div></div>';
	div1.style.display = 'block';
/*	$.ajax({
	url: base_url+'api/pageapi/quizbox/'+attach,
	type: 'POST',
	success: function(msg)
	{
		$('.quiz_frame').html(msg);
		TableEditable_Quiz.init();
		$('.with_answer input[type=radio]').attr('disabled', 'true');
	}
	}).fail( function(msg)
	{
		alert('Failed Operation:'+JSON.stringify(msg));
	});*/
});

$('.new_book_submit').live('click', function (e) {
//	$(this).parent().html("<button class='btn course_info_edit' >Edit</button>");
	course_info_ajax_helper("api/service/course",{operation:'add_book',book_name:$('#new_book_name').val(),book_url:$('#new_book_url').val(),course_id:$('.single_course_info').attr('course_id')});
});

$('.book_delete').live('click', function (e) {
//	$(this).parent().html("<button class='btn course_info_edit' >Edit</button>");
	course_info_ajax_helper("api/service/course",{operation:'delete_book',book_id:$(this).closest('li').attr('book_id')});
});

function course_info_ajax_helper(url,form_data)
{
	$.ajax({
		url: base_url+url,
		type: 'POST',
		data: form_data,
		success: function(msg)
		{
			if(msg.success==1)
			{
				if(msg.from=='add_book')
				{
					var div = document.getElementById('unclickableDiv1');
					div.style.display = 'none';
					div.innerHTML = '';
					$('#book_list').append('<li book_id="'+msg.book.book_id+'"><a href="#" class="book_delete"><i class="icon-remove"></i></a> '+msg.book.book_name+'</li>');
				}
				else if(msg.from=='delete_book')
				{

					$('#book_list li[book_id='+msg.book_id+']').remove();
				}
				else if(msg.from=='update')//----------from update course info----------------------
				{
					$('#course_info_price').val(msg.course.price);
					$('#course_info_duration').val(msg.course.duration);
					$('#course_info_description').val(msg.course.description);
					$('.single_course_info input').prop('disabled',true);
					$('.single_course_info textarea').prop('disabled',true);
				}
			}
			else
			{
				if(msg.from=='update')
				{
					$('#course_info_price').val(temp['course_info_price']);
					$('#course_info_duration').val(temp['course_info_duration']);
					$('#course_info_description').val(temp['course_info_description']);
					$('.single_course_info input').prop('disabled',true);
					$('.single_course_info textarea').prop('disabled',true);
				}
				else if(msg.from=='add_book')
				{
					var div = document.getElementById('unclickableDiv1');
					div.style.display = 'none';
					div.innerHTML = '';
				}
				else
					alert("Error:"+JSON.stringify(msg));
			}
		}
	}).fail( function(msg)
	{
			alert('Failed Operation:'+JSON.stringify(msg));
	});
	return false;
}














var TableEditable_SingleCourse = function () {
	return {

		//main function to initiate the module
		init_table:function()
		{
			var oTable = $('#dt_singlecourse').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],
				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					}          
				});
			alert('asdf');
		},
		init: function () {
/*			if(singledefined)
			{
				$('#dt_singlecourse').dataTable().fnDestroy();
				oTable = $('#dt_singlecourse').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],
				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					}          
				});
				return;
			}*/
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/unit",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								$(nEditing).attr('unit_id',msg.unit.unit_id);

														
								newunit='<li><a href="javascript:void(0)" unit_id="'+msg.unit.unit_id+'" class="unitlink">'+msg.unit.unit_name+'</a></li>';
								toaddplace=$('.accordion-group[course_id='+msg.unit.course_id+'] .nav-list');
								$(toaddplace).html($(toaddplace).html()+newunit);
								saveRow(oTable,nEditing);
//								tds=$(nEditing).find('td');
//								$(tds[1]).addClass('center');
//								$(tds[2]).addClass('center');
								nEditing = null;
							}
							else if(msg.from=='update')
							{
								$('#side_accordion a[unit_id='+msg.unit.unit_id+']').html(msg.unit.unit_name);
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
								$('#side_accordion a[unit_id='+msg.unit_id+']').closest('li').remove();
							}
						}
						else
						{
							if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								alert(msg.message);
							}
							else
								alert("Error:"+JSON.stringify(msg));
						}
					}
				}).fail( function(msg)
				{
						alert('Failed Operation:'+JSON.stringify(msg));
				});
				return false;
			}


			//		Restore Row
			function restoreRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);

				for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
					oTable.fnUpdate(aData[i], nRow, i, false);
				}
			}

			//		Edit Row

			function editRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + $(aData[0]).html() + '" id="unit_name">';
				jqTds[2].innerHTML = '<a class="edit" href="" stats="Save">Save</a>';
				jqTds[3].innerHTML ='<a class="cancel" href="">Cancel</a>';
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				oTable.fnUpdate('<a class="editunit">'+$('#unit_name').val()+'</a>', nRow, 0, false);
				oTable.fnUpdate('<a href="#" class="editquiz" title="Edit Quiz">Edit Quiz</a>', nRow, 1, false);
				oTable.fnUpdate('<a href="#" class="edit" title="Edit">Edit</a>', nRow, 2, false);
				oTable.fnUpdate('<a href="#" class="delete" title="Delete">Delete</a>', nRow, 3, false);
//							oTable.fnDraw();
			}

//******************Course Overview Form*****************************
			var oTable;
			if(singledefined)
			{
				$('.dt_singlecourse a.delete').die();
				$('.dt_singlecourse a.edit').die();
				$('.dt_singlecourse a.cancel').die();
//				oTable = $('#dt_singlecourse').dataTable();
			}
//			else
			oTable = $('.dt_singlecourse').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],"aaSorting": [],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					},
						"bDestroy": true, "bRetrieve":true
				}).rowReordering();
			var nEditing = null;
			singledefined=1;

			//			Adding a New course  !!!
			$('#btn_new_unit').click(function (e) {
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="unit_name">','',
					'<a class="edit" href="" stats="Save">Save</a>','<a class="cancel" data-mode="new" href="">Cancel</a>']);
				var nRow = oTable.fnGetNodes(aiNew[0]);
				nEditing = nRow;
			});

			//			Deleteing course

			$('.dt_singlecourse a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_unit','unit_id':$(nRow).attr('unit_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_singlecourse a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_singlecourse a.edit').live('click', function (e) {
				e.preventDefault();

				// Get the row as a parent of the link that was clicked on 
				var nRow = $(this).parents('tr')[0];

				if (nEditing !== null && nEditing != nRow) {
					// Currently editing - but not this row - restore the old before continuing to edit mode 
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						oTable.fnDeleteRow(nEditing);
					} else {
						restoreRow(oTable, nEditing);
					}
					editRow(oTable, nRow);
					nEditing = nRow;
				} else if (nEditing == nRow && $(this).attr("stats") == "Save") {

					if($("#unit_name").val()=="")
					{
						alert('Input Unit Name');
						return;
					}
//				Editing this row and want to save it 
					if($(nRow).attr('unit_id'))
						ajax_helper({'operation':'update_unit','unit_id':$(nEditing).attr('unit_id'),'unit_name':$("#unit_name").val()},nEditing);
					else
						ajax_helper({'operation':'add_unit','unit_name':$("#unit_name").val(),'course_id':$(this).closest('table').attr('course_id')},nEditing);
//						ajax_helper({'operation':'add_car_model','car_model_name':$("#car_model_name").val(),'car_manufacturer_id':$("#manufacturer").val()},nEditing);
				} else {
//								 No edit in progress - let's start one 
					editRow(oTable, nRow);
					nEditing = nRow;
				}
			});
		}
	};

}();

