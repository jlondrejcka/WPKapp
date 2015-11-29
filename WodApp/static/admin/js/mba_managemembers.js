singledefined=0;
overviewdefined=0;
unitdefined=0;
/*
$('.courselink').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).closest('.accordion-group').attr('course_id'),2,$(this).closest('.accordion-group').attr('category_id'),$(this).closest('.accordion-group').attr('course_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.courselink1').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).attr('course_id'),2,$(this).attr('category_id'),$(this).attr('course_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.editcourse').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).closest('tr').attr('course_id'),2,$(this).closest('table').attr('category_id'),$(this).closest('tr').attr('course_id'));
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.courseoverview').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/courseoverview",0,0);
});

$('.categoryoverview').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/categoryoverview/"+$(this).attr('category_id'),1,$(this).attr('category_id'),0);
});

//window.history.replaceState({ type: 1, course_id: 0, single:0, url_toload: "AAA" }, document.title, document.location.href);

window.addEventListener('popstate', function(event) {
  console.log('popstate fired!');
  if(event.state)
	{
	  $('.main_content').html(event.state.content);
		if(event.state.type==1)
			 TableEditable_CategoryOverview.init();
		else if(event.state.type==2)
			 TableEditable_SingleCourse.init();
		else if(event.state.type==3)
			 TableEditable_SingleUnit.init();
	}

//  updateContent(event.state);
});

    // Store the initial content so we can revisit it later
function load_single_course(url_toload,single,category_id,course_id,notsetstate)
{
//	stateObj = { type: 1, course_id: course_id, single:single, url_toload: url_toload };
	if(single==2)
	{
		$('#side_accordion .active').removeClass("active");
		$($('.accordion-group[course_id='+course_id+'] .accordion-body li')[0]).addClass('active');
		if($('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse.in').length==0)
		{
		$('#side_accordion .collapse.in').collapse('hide');
		$('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse').not('.in').collapse('show');//{parent:true});
		}
	}
	else
	{
		$('#side_accordion .active').removeClass("active");
		$('#side_accordion .collapse.in').collapse('hide');
	}
	$.ajax({
		url: url_toload,
		type: 'POST',
		success: function(msg)
		{
			$('.main_content').html(msg);
			if(single==2)
			{
//				if(singledefined==0)
				stateObj = { type: 2, content: $('.main_content').html()};
				TableEditable_SingleCourse.init();
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managecourses/'+category_id+"/"+course_id);
//				else
//					TableEditable_SingleCourse.init_table();
			}
			else if(single==1)
			{
				stateObj = { type: 1, content: $('.main_content').html()};
				TableEditable_CategoryOverview.init();
//				window.location.hash='';
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managecourses/'+category_id);
			}
			else
			{
				stateObj = { type: 0, content: $('.main_content').html()};
//				TableEditable_CourseOverview.init();
				window.location.hash='';
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managecourses');
			}
		}
		}).fail( function(msg)
		{
			alert('Failed Operation:'+JSON.stringify(msg));
		});
	return false;
}

$('.unitlink').live('click', function (e) {
	return load_single_unit($(this).attr('unit_id'),$(this).closest('.accordion-group').attr('category_id'),$(this).closest('.accordion-group').attr('course_id'));
});
$('.editunit').live('click', function (e) {
	if(singledefined)
	{
	}
	return load_single_unit($(this).closest('tr').attr('unit_id'),$(this).closest('table').attr('category_id'),$(this).closest('table').attr('course_id'));
});

function load_single_unit(unit_id,category_id,course_id,notsetstate)
{

	
	if($('#side_accordion a[unit_id='+unit_id+']').closest('.collapse.in').length==0)
	{
	$('#side_accordion .collapse.in').collapse('hide');
	$($('#side_accordion a[unit_id='+unit_id+']')[0]).closest('.collapse').not('.in').collapse('show');//{parent:true});//'show');
	}
	
	$('#side_accordion .active').removeClass("active");
	$($('#side_accordion a[unit_id='+unit_id+']')[0]).closest('li').addClass('active');
	$.ajax({
		url: base_url+"api/pageapi/singleunit/"+unit_id,
		type: 'POST',
		success: function(msg)
		{
			$('.main_content').html(msg);
			stateObj = { type: 3, content: $('.main_content').html()};
			TableEditable_SingleUnit.init();
		//	if(notsetstate!=1)
//			{
//				stateObj = { type: 2, course_id: course_id, unit_id:unit_id};
				window.history.pushState(stateObj, null, base_url+'admin/managecourses/'+category_id+"/"+course_id+'/'+unit_id);
//			}
		}
		}).fail( function(msg)
		{
			alert('Failed Operation:'+JSON.stringify(msg));
		});
	return false;
}*/

var TableEditable_Members = function () {
	return {

		//main function to initiate the module
		init: function () {
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/users",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
							}
						}
						else
						{
							if(msg.from=='update')
							{
								alert(msg.message);
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
//							oTable.fnDraw();
			}

			//		Edit Row

			function editRow(oTable, nRow) {

				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + $(aData[0]).html() + '" id="email">';
				jqTds[1].innerHTML='<input type="text" class="span12" value="' + aData[1] + '" id="first_name">';
				jqTds[2].innerHTML = '<input type="text" class="span12" value="' + aData[2] + '" id="last_name">';
				jqTds[3].innerHTML = '<input type="text" class="span12" value="" id="password" placeholder="Blank for no change">';

//				jqTds[4].innerHTML = '0';
				jqTds[5].innerHTML ='<a class="edit" href="" stats="Save">Save</a>';
				jqTds[6].innerHTML ='<a class="cancel" href="">Cancel</a>';
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				oTable.fnUpdate('<a class="editcourse">'+$('#email').val()+'</a>', nRow, 0, false);
				oTable.fnUpdate($('#first_name').val(), nRow, 1, false);
				oTable.fnUpdate($('#last_name').val(), nRow, 2, false);
				oTable.fnUpdate("(hidden)", nRow, 3, false);
				oTable.fnUpdate('<a href="#" class="edit" title="Edit">Edit</a>', nRow, 5, false);
				oTable.fnUpdate('<a href="#" class="delete" title="Delete">Delete</a>', nRow, 6, false);
//							oTable.fnDraw();
			}

/*
			if(overviewdefined)
			{
				$('.dt_a a.delete').die();
				$('.dt_a a.edit').die();
				$('.dt_a a.cancel').die();
//				oTable = $('#dt_singlecourse').dataTable();
			}*/
//******************Course Overview Form*****************************
		   var oTable = $('.dt_a').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					} ,
						"bDestroy": true, "bRetrieve":true
				});
				overviewdefined=1;
			var nEditing = null;
			
			//			Adding a New course  !!!
			$('#btn_new').click(function (e) {
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="email">','<input type="text" class="span12" value="" id="first_name">',
					'<input type="text" class="span12" value="" id="last_name">','<input type="text" class="span12" value="" id="password">',
					'0','<a class="edit" href="" stats="Save">Save</a>','<a class="cancel" data-mode="new" href="">Cancel</a>']);
				var nRow = oTable.fnGetNodes(aiNew[0]);
				nEditing = nRow;
			});

			//			Deleteing course

			$('.dt_a a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_user','member_todelete':$(nRow).attr('user_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_a a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_a a.edit').live('click', function (e) {
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

					if(($("#email").val()=="")||($("#first_name").val()=="")||($("#last_name").val()==""))
					{
						alert('Input Correct Information');
						return;
					}
					else if((!$(nRow).attr('user_id')) && ($("#password").val()==""))
					{
						alert('Password has to be set');
						return;
					}
//								 Editing this row and want to save it 
					if($(nRow).attr('user_id'))
						ajax_helper({'operation':'update_user','user_id':$(nEditing).attr('user_id'),'email':$("#email").val(),
						'first_name':$("#first_name").val(),'last_name':$("#last_name").val(),'password':$("#password").val()},nEditing);
					else
						ajax_helper({'operation':'add_user','email':$("#email").val(),'first_name':$("#first_name").val(),'last_name':$("#last_name").val(),
						'password':$("#password").val(),'category_id':$(this).closest('table').attr('category_id'),'belong_to':cur_user_id,'user_type':IS_MEMBER},nEditing);
//									ajax_helper({'operation':'add_car_model','car_model_name':$("#car_model_name").val(),'car_manufacturer_id':$("#manufacturer").val()},nEditing);
				} else {
//								 No edit in progress - let's start one 
					editRow(oTable, nRow);
					nEditing = nRow;
				}
			});
		}
	};

}();

