
$('#btn_enroll_courses').live('click', function (e) {

	selected_items=$('.available_course_table .course_row input[type=checkbox]:checked').closest('tr');
	course_length=selected_items.length;
	items=new Array(selected_items.length+$('.available_course_table .package_row input[type=checkbox]:checked').length);
	for(i=0;i<selected_items.length;i++)
	{
		tds=$(selected_items[i]).find('td');
		price=$(tds[4]).html(); price=price.replace('$',''); price=price.replace(' ','');
		items[i]={item_type:'0',item_id:$(selected_items[i]).attr('course_id'),price:price};
	}

	selected_items=$('.available_course_table .package_row input[type=checkbox]:checked').closest('tr');
//	items=new Array(selected_items1.length);
	for(i=0;i<selected_items.length;i++)
	{
		tds=$(selected_items[i]).find('td');
		price=$(tds[4]).html(); price=price.replace('$',''); price=price.replace(' ','');
		items[course_length+i]={item_type:'1',item_id:$(selected_items[i]).attr('package_id'),price:price};
	}


	form_data={user_id:$('#user_id_div').html(),items:items};
	$.ajax({
		url: base_url+"api/service/payment",
		type: 'POST',
		data: form_data,
		success: function(msg)
		{
			if(msg.success==1)
			{
				alert('success');
			}
			else
			{
				alert(JSON.stringify(msg));
			}
		}
	}).fail( function(msg)
	{
			alert('Failed Operation:'+JSON.stringify(msg));
	});
	return false;

});
var TableEditable_AvailableCourse = function () {
	return {

		init: function () {
/*			function ajax_helper(form_data,nRow)
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
			}*/
//			else
			oTable = $('.available_course_table').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],"aaSorting": [],            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					},
						"bDestroy": true, "bRetrieve":true
				});
//			var nEditing = null;
//			singledefined=1;

			//			Adding a New course  !!!
/*			$('#btn_new_unit').click(function (e) {
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
			});*/
		}
	};

}();

